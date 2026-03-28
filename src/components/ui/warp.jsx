import { useEffect, useRef } from "react"

const declarePI = `
#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846
`

const proceduralHash11 = `
  float hash11(float p) {
    p = fract(p * 0.3183099) + 0.1;
    p *= p + 19.19;
    return fract(p * p);
  }
`

const proceduralHash21 = `
  float hash21(vec2 p) {
    p = fract(p * vec2(0.3183099, 0.3678794)) + 0.1;
    p += dot(p, p + 19.19);
    return fract(p.x * p.y);
  }
`

const simplexNoise = `
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
    -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
`

const vertexShaderSource = `#version 300 es
precision mediump float;
layout(location = 0) in vec4 a_position;
void main() {
  gl_Position = a_position;
}
`

const fragmentShaderSource = `#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2  u_resolution;
uniform vec4  u_colorBack;
uniform vec4  u_colorFront;
uniform float u_shape;
uniform float u_type;
uniform float u_pxSize;

out vec4 fragColor;

${simplexNoise}
${declarePI}
${proceduralHash11}
${proceduralHash21}

float getSimplexNoise(vec2 uv, float t) {
  float noise = .5 * snoise(uv - vec2(0., .3 * t));
  noise += .5 * snoise(2. * uv + vec2(0., .32 * t));
  return noise;
}

const int bayer4x4[16] = int[16](
  0,  8,  2, 10,
 12,  4, 14,  6,
  3, 11,  1,  9,
 15,  7, 13,  5
);

float getBayerValue(vec2 uv, int size) {
  ivec2 pos = ivec2(mod(uv, float(size)));
  int index = pos.y * size + pos.x;
  if (size == 4) return float(bayer4x4[index]) / 16.0;
  return 0.0;
}

void main() {
  float t = .5 * u_time;
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv -= .5;

  float pxSize = u_pxSize;
  vec2 pxSizeUv = gl_FragCoord.xy;
  pxSizeUv -= .5 * u_resolution;
  pxSizeUv /= pxSize;
  vec2 pixelizedUv = floor(pxSizeUv) * pxSize / u_resolution.xy;
  pixelizedUv += .5;
  pixelizedUv -= .5;

  vec2 shape_uv = pixelizedUv;
  vec2 dithering_uv = pxSizeUv;
  vec2 ditheringNoise_uv = uv * u_resolution;

  // Warp shape
  shape_uv *= .003;
  for (float i = 1.0; i < 6.0; i++) {
    shape_uv.x += 0.6 / i * cos(i * 2.5 * shape_uv.y + t);
    shape_uv.y += 0.6 / i * cos(i * 1.5 * shape_uv.x + t);
  }
  float shape = .15 / abs(sin(t - shape_uv.y - shape_uv.x));
  shape = smoothstep(0.02, 1., shape);

  // 4x4 Bayer dither
  float dithering = getBayerValue(dithering_uv, 4);
  dithering -= .5;
  float res = step(.5, shape + dithering);

  vec3 fgColor   = u_colorFront.rgb * u_colorFront.a;
  float fgOpacity = u_colorFront.a;
  vec3 bgColor   = u_colorBack.rgb * u_colorBack.a;
  float bgOpacity = u_colorBack.a;

  vec3 color = fgColor * res;
  float opacity = fgOpacity * res;
  color   += bgColor   * (1. - opacity);
  opacity += bgOpacity * (1. - opacity);

  fragColor = vec4(color, opacity);
}
`

function hexToRgba(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!r) return [0, 0, 0, 1]
  return [
    parseInt(r[1], 16) / 255,
    parseInt(r[2], 16) / 255,
    parseInt(r[3], 16) / 255,
    1,
  ]
}

function createShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function createProgram(gl, vert, frag) {
  const vs = createShader(gl, gl.VERTEX_SHADER, vert)
  const fs = createShader(gl, gl.FRAGMENT_SHADER, frag)
  if (!vs || !fs) return null
  const prog = gl.createProgram()
  gl.attachShader(prog, vs)
  gl.attachShader(prog, fs)
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(prog))
    return null
  }
  return prog
}

export function DitheringShader({
  width = 800,
  height = 800,
  colorBack  = "#000000",
  colorFront = "#FFD700",
  pxSize = 4,
  speed  = 1,
  className = "",
  style = {},
}) {
  const canvasRef    = useRef(null)
  const rafRef       = useRef(null)
  const startTimeRef = useRef(Date.now())

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl2")
    if (!gl) { console.error("WebGL2 not supported"); return }

    const program = createProgram(gl, vertexShaderSource, fragmentShaderSource)
    if (!program) return

    const posLoc = gl.getAttribLocation(program, "a_position")
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]),
      gl.STATIC_DRAW
    )
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    canvas.width  = width
    canvas.height = height
    gl.viewport(0, 0, width, height)

    const loc = {
      time:       gl.getUniformLocation(program, "u_time"),
      resolution: gl.getUniformLocation(program, "u_resolution"),
      colorBack:  gl.getUniformLocation(program, "u_colorBack"),
      colorFront: gl.getUniformLocation(program, "u_colorFront"),
      shape:      gl.getUniformLocation(program, "u_shape"),
      type:       gl.getUniformLocation(program, "u_type"),
      pxSize:     gl.getUniformLocation(program, "u_pxSize"),
    }

    const render = () => {
      const t = (Date.now() - startTimeRef.current) * 0.001 * speed
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.useProgram(program)
      gl.uniform1f(loc.time, t)
      gl.uniform2f(loc.resolution, width, height)
      gl.uniform4fv(loc.colorBack,  hexToRgba(colorBack))
      gl.uniform4fv(loc.colorFront, hexToRgba(colorFront))
      gl.uniform1f(loc.shape,  2.0) // warp
      gl.uniform1f(loc.type,   3.0) // 4x4 bayer
      gl.uniform1f(loc.pxSize, pxSize)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      rafRef.current = requestAnimationFrame(render)
    }

    rafRef.current = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafRef.current)
      gl.deleteProgram(program)
    }
  }, [width, height, colorBack, colorFront, pxSize, speed])

  return (
    <div className={className} style={{ position: "relative", width, height, ...style }}>
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  )
}

// Default export alias for Hero.jsx import
export default DitheringShader

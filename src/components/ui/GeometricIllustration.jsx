function DotsCircle({ size = 80, color = 'currentColor', opacity = 1, strokeWidth = 1.5 }) {
  const cx = size / 2
  const cy = size / 2
  const outerR   = size * 0.40
  const dotR     = size * 0.028
  const orbitR   = size * 0.30

  const dots = Array.from({ length: 16 }, (_, i) => {
    const angle = (i * Math.PI * 2) / 16
    return { x: cx + orbitR * Math.cos(angle), y: cy + orbitR * Math.sin(angle) }
  })

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <circle cx={cx} cy={cy} r={outerR} stroke={color} strokeWidth={strokeWidth} opacity={opacity} />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={dotR} fill={color} opacity={opacity} />
      ))}
    </svg>
  )
}

function PeaceCircle({ size = 80, color = 'currentColor', opacity = 1, strokeWidth = 1.5 }) {
  const cx = size / 2
  const cy = size / 2
  const r  = size * 0.40

  const topY   = cy - r
  const botY   = cy + r
  const leftX  = cx + r * Math.cos((210 * Math.PI) / 180)
  const leftY  = cy + r * Math.sin((210 * Math.PI) / 180)
  const rightX = cx + r * Math.cos((330 * Math.PI) / 180)
  const rightY = cy + r * Math.sin((330 * Math.PI) / 180)

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <circle cx={cx} cy={cy} r={r} stroke={color} strokeWidth={strokeWidth} opacity={opacity} />
      <line x1={cx} y1={topY}  x2={cx}     y2={botY}   stroke={color} strokeWidth={strokeWidth} opacity={opacity} strokeLinecap="round" />
      <line x1={cx} y1={cy}   x2={leftX}  y2={leftY}  stroke={color} strokeWidth={strokeWidth} opacity={opacity} strokeLinecap="round" />
      <line x1={cx} y1={cy}   x2={rightX} y2={rightY} stroke={color} strokeWidth={strokeWidth} opacity={opacity} strokeLinecap="round" />
    </svg>
  )
}

function TargetCircle({ size = 80, color = 'currentColor', opacity = 1, strokeWidth = 1.5 }) {
  const cx = size / 2
  const cy = size / 2
  const r1 = size * 0.12
  const r2 = size * 0.25
  const r3 = size * 0.40

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <circle cx={cx} cy={cy} r={r1} stroke={color} strokeWidth={strokeWidth} opacity={opacity} />
      <circle cx={cx} cy={cy} r={r2} stroke={color} strokeWidth={strokeWidth} opacity={opacity} />
      <circle cx={cx} cy={cy} r={r3} stroke={color} strokeWidth={strokeWidth} opacity={opacity} />
      <line x1={cx - r3} y1={cy}      x2={cx + r3} y2={cy}      stroke={color} strokeWidth={strokeWidth} opacity={opacity} strokeLinecap="round" />
      <line x1={cx}      y1={cy - r3} x2={cx}      y2={cy + r3} stroke={color} strokeWidth={strokeWidth} opacity={opacity} strokeLinecap="round" />
    </svg>
  )
}

function PlusSquare({ size = 80, color = 'currentColor', opacity = 1, strokeWidth = 1.5 }) {
  const pad = size * 0.08
  const arm = size * 0.22
  const cx  = size / 2
  const cy  = size / 2

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <rect
        x={pad} y={pad}
        width={size - pad * 2} height={size - pad * 2}
        stroke={color} strokeWidth={strokeWidth} opacity={opacity}
        rx={size * 0.04}
      />
      <line x1={cx - arm} y1={cy}      x2={cx + arm} y2={cy}      stroke={color} strokeWidth={strokeWidth} opacity={opacity} strokeLinecap="round" />
      <line x1={cx}       y1={cy - arm} x2={cx}      y2={cy + arm} stroke={color} strokeWidth={strokeWidth} opacity={opacity} strokeLinecap="round" />
    </svg>
  )
}

export { DotsCircle, PeaceCircle, TargetCircle, PlusSquare }

export default function GeometricIllustration({
  name        = 'dots',
  size        = 80,
  color       = 'currentColor',
  opacity     = 1,
  strokeWidth = 1.5,
}) {
  const shapes = {
    dots:   DotsCircle,
    peace:  PeaceCircle,
    target: TargetCircle,
    plus:   PlusSquare,
  }
  const Shape = shapes[name] || DotsCircle
  return <Shape size={size} color={color} opacity={opacity} strokeWidth={strokeWidth} />
}

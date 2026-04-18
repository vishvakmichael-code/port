import { useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'

/*
  Scatter configs — positions are ratios of viewport dimensions.
  Image center lands at: (50vw + xRatio*vw, 50vh + yRatio*vh).
  All images verified to stay within viewport at 1440×900.
*/
const IMG_CONFIGS = [
  { xRatio: -0.30, yRatio: -0.17, rotate: -8,  scale: 0.90, width: 200 },
  { xRatio:  0.17, yRatio: -0.23, rotate:  5,  scale: 1.00, width: 180 },
  { xRatio: -0.32, yRatio:  0.10, rotate: -4,  scale: 0.95, width: 220 },
  { xRatio:  0.19, yRatio:  0.16, rotate:  9,  scale: 0.88, width: 190 },
  { xRatio: -0.04, yRatio: -0.27, rotate:  3,  scale: 1.05, width: 170 },
  { xRatio:  0.08, yRatio:  0.21, rotate: -6,  scale: 0.92, width: 210 },
  { xRatio:  0.25, yRatio: -0.05, rotate:  7,  scale: 0.85, width: 160 },
]

const IMG_CONFIGS_MOBILE = [
  { xRatio: -0.14, yRatio: -0.20, rotate: -6,  scale: 0.85, width: 120 },
  { xRatio:  0.10, yRatio: -0.26, rotate:  4,  scale: 0.90, width: 110 },
  { xRatio: -0.16, yRatio:  0.12, rotate: -3,  scale: 0.88, width: 130 },
  { xRatio:  0.12, yRatio:  0.18, rotate:  7,  scale: 0.82, width: 115 },
  { xRatio: -0.02, yRatio: -0.30, rotate:  2,  scale: 0.92, width: 105 },
  { xRatio:  0.04, yRatio:  0.24, rotate: -5,  scale: 0.86, width: 125 },
  { xRatio:  0.18, yRatio: -0.04, rotate:  6,  scale: 0.80, width: 100 },
]

/* ── Single draggable + tiltable image ── */
function TiltImage({ src, config, index }) {
  const imgRef = useRef(null)

  const w = window.innerWidth
  const h = window.innerHeight
  // Target center of image in screen space
  const targetX = Math.round(config.xRatio * w)
  const targetY = Math.round(config.yRatio * h)
  const imgW = config.width
  const imgH = Math.round(imgW * (4 / 3))

  // 3D tilt — driven by mouse position within the card
  const rotateXRaw = useMotionValue(0)
  const rotateYRaw = useMotionValue(0)
  const rotateX = useSpring(rotateXRaw, { stiffness: 350, damping: 28 })
  const rotateY = useSpring(rotateYRaw, { stiffness: 350, damping: 28 })

  const onMouseMove = (e) => {
    const rect = imgRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    rotateXRaw.set(-((e.clientY - cy) / (rect.height / 2)) * 14)
    rotateYRaw.set(((e.clientX - cx) / (rect.width / 2)) * 14)
  }

  const onMouseLeave = () => {
    rotateXRaw.set(0)
    rotateYRaw.set(0)
  }

  return (
    <motion.div
      ref={imgRef}
      drag
      dragMomentum={false}
      // Scatter in from center, collapse back on exit
      initial={{ opacity: 0, x: 0, y: 0, scale: 0, rotate: 0 }}
      animate={{
        opacity: 1,
        x: targetX,
        y: targetY,
        scale: config.scale,
        rotate: config.rotate,
      }}
      exit={{ opacity: 0, x: 0, y: 0, scale: 0, rotate: 0 }}
      transition={{ duration: 0.65, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileDrag={{ scale: config.scale * 1.08, zIndex: 1010 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        // Center the image at the screen midpoint, then let x/y offset it
        position: 'fixed',
        left: '50%',
        top: '50%',
        marginLeft: `-${imgW / 2}px`,
        marginTop: `-${imgH / 2}px`,
        width: imgW,
        height: imgH,
        // 3D tilt via springs
        rotateX,
        rotateY,
        transformPerspective: 900,
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 24px 64px rgba(0,0,0,0.55)',
        zIndex: 1001,
        cursor: 'grab',
        touchAction: 'none',
        userSelect: 'none',
      }}
    >
      <img
        src={src}
        alt={`sketch ${index + 1}`}
        draggable={false}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  )
}

/* ── Overlay ── */
export default function ScatterGallery({ isOpen, onClose, title, images }) {
  const isMobile = window.innerWidth < 768
  const configs = isMobile ? IMG_CONFIGS_MOBILE : IMG_CONFIGS

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.90)',
              backdropFilter: 'blur(14px)',
              zIndex: 1000,
            }}
          />

          {/* Center title — plain div for centering, motion.p for animation */}
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1002,
            textAlign: 'center',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}>
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              style={{
                fontFamily: 'var(--font-itim)',
                fontSize: 'clamp(28px, 4vw, 56px)',
                fontWeight: 400,
                color: '#FFFFFF',
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              {title}
            </motion.p>
          </div>

          {/* Close button */}
          <motion.button
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: '24px',
              right: '24px',
              zIndex: 1003,
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#FFFFFF',
              fontSize: '20px',
              lineHeight: 1,
            }}
          >
            ×
          </motion.button>

          {/* Draggable tilt images */}
          {images.map((src, i) => (
            <TiltImage
              key={i}
              src={src}
              config={configs[i % configs.length]}
              index={i}
            />
          ))}
        </>
      )}
    </AnimatePresence>
  )
}

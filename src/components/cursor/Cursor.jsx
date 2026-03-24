import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useCursor } from './CursorContext'
import { useIsTouch } from '../../hooks/useMediaQuery'

export default function Cursor() {
  const isTouch = useIsTouch()
  const { spec } = useCursor()

  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)

  // Dot — instant follow
  const dotX = useSpring(rawX, { stiffness: 1000, damping: 50, mass: 0.1 })
  const dotY = useSpring(rawY, { stiffness: 1000, damping: 50, mass: 0.1 })

  // Ring — lagged follow
  const ringX = useSpring(rawX, { stiffness: 200, damping: 30, mass: 0.5 })
  const ringY = useSpring(rawY, { stiffness: 200, damping: 30, mass: 0.5 })

  useEffect(() => {
    const move = (e) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [rawX, rawY])

  useEffect(() => {
    document.documentElement.classList.toggle('cursor-native', spec.showNative)
  }, [spec.showNative])

  if (isTouch) return null

  const isTextState = spec.label === null && spec.dotSize === 2

  return (
    <>
      {/* DOT */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          borderRadius: '50%',
          backgroundColor: 'var(--color-primary)',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
        }}
        animate={{
          width: spec.dotSize,
          height: spec.dotSize,
          opacity: spec.dotOpacity,
        }}
        transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
      />

      {/* RING */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          border: '1.5px solid var(--color-fg)',
          pointerEvents: 'none',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        animate={{
          width: isTextState ? 2 : spec.ringSize,
          height: isTextState ? 28 : spec.ringSize,
          opacity: spec.ringOpacity,
          borderRadius: isTextState ? '2px' : '50%',
        }}
        transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
      >
        {spec.label && (
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            letterSpacing: 'var(--tracking-label)',
            color: 'var(--color-fg)',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}>
            {spec.label}
          </span>
        )}
      </motion.div>
    </>
  )
}

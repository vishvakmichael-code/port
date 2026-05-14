import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useCursor } from './CursorContext'
import { useIsTouch } from '../../hooks/useMediaQuery'

const IDLE_MS = 1500

export default function Cursor() {
  const isTouch = useIsTouch()
  const { spec } = useCursor()
  const [visible, setVisible] = useState(false)
  const idleTimer = useRef(null)

  const rawX = useMotionValue(-200)
  const rawY = useMotionValue(-200)

  const x = useSpring(rawX, { stiffness: 900, damping: 45, mass: 0.08 })
  const y = useSpring(rawY, { stiffness: 900, damping: 45, mass: 0.08 })

  useEffect(() => {
    const onMove = (e) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      setVisible(true)
      clearTimeout(idleTimer.current)
      idleTimer.current = setTimeout(() => setVisible(false), IDLE_MS)
    }
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      clearTimeout(idleTimer.current)
    }
  }, [rawX, rawY])

  useEffect(() => {
    document.documentElement.classList.toggle('cursor-native', spec.showNative)
  }, [spec.showNative])

  if (isTouch) return null

  /* Grow the dot when context signals an interactive element */
  const isActive = spec.ringOpacity > 0 || spec.label !== null

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        borderRadius: '50%',
        backgroundColor: 'var(--color-primary)',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
      }}
      animate={{
        width:   isActive ? 10 : 4,
        height:  isActive ? 10 : 4,
        opacity: visible  ? 1  : 0,
      }}
      transition={{ duration: 0.18, ease: [0.25, 1, 0.5, 1] }}
    />
  )
}

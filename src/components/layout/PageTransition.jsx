import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'

export default function PageTransition({ children }) {
  const location = useLocation()
  const curtainRef = useRef(null)
  const isFirst = useRef(true)

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }

    window.scrollTo(0, 0)

    const curtain = curtainRef.current
    if (!curtain) return

    const tl = gsap.timeline()

    tl.set(curtain, { scaleY: 0, transformOrigin: 'bottom' })
    tl.to(curtain, { scaleY: 1, duration: 0.5, ease: 'power3.inOut' })
    tl.to(curtain, { duration: 0.1 })
    tl.set(curtain, { transformOrigin: 'top' })
    tl.to(curtain, { scaleY: 0, duration: 0.5, ease: 'power3.inOut' })

    return () => tl.kill()
  }, [location.pathname])

  return (
    <>
      {children}
      <div
        ref={curtainRef}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'var(--color-black)',
          zIndex: 'var(--z-transition)',
          pointerEvents: 'none',
          transform: 'scaleY(0)',
          transformOrigin: 'bottom',
        }}
      />
    </>
  )
}

import { useEffect, useRef, useState, useCallback } from 'react'
import { flushSync } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

export function AnimatedThemeToggler({ className }) {
  const buttonRef = useRef(null)
  const [darkMode, setDarkMode] = useState(() =>
    typeof window !== 'undefined'
      ? !document.documentElement.classList.contains('light')
      : true
  )

  useEffect(() => {
    const syncTheme = () =>
      setDarkMode(!document.documentElement.classList.contains('light'))
    const observer = new MutationObserver(syncTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    return () => observer.disconnect()
  }, [])

  const onToggle = useCallback(async () => {
    if (!buttonRef.current) return
    const toggled = !darkMode

    if (document.startViewTransition) {
      await document.startViewTransition(() => {
        flushSync(() => {
          setDarkMode(toggled)
          document.documentElement.classList.toggle('light', !toggled)
          localStorage.setItem('theme', toggled ? 'dark' : 'light')
        })
      }).ready

      const { left, top, width, height } =
        buttonRef.current.getBoundingClientRect()
      const centerX = left + width / 2
      const centerY = top + height / 2
      const maxDistance = Math.hypot(
        Math.max(centerX, window.innerWidth - centerX),
        Math.max(centerY, window.innerHeight - centerY)
      )

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${centerX}px ${centerY}px)`,
            `circle(${maxDistance}px at ${centerX}px ${centerY}px)`,
          ],
        },
        {
          duration: 700,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        }
      )
    } else {
      setDarkMode(toggled)
      document.documentElement.classList.toggle('light', !toggled)
      localStorage.setItem('theme', toggled ? 'dark' : 'light')
    }
  }, [darkMode])

  return (
    <button
      ref={buttonRef}
      onClick={onToggle}
      aria-label="Switch theme"
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px',
        borderRadius: '50%',
        background: 'transparent',
        border: 'none',
        cursor: 'none',
        color: 'var(--color-fg)',
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {darkMode ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, scale: 0.55, rotate: 25 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.33 }}
            style={{ display: 'flex', color: 'var(--color-fg)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24"
              fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, scale: 0.55, rotate: -25 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.33 }}
            style={{ display: 'flex', color: 'var(--color-fg)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24"
              fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

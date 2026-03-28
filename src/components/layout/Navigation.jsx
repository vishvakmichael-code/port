import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCursorState } from '../../hooks/useCursorState'

const NAV_LINKS = [
  { label: 'work',  href: '/work'    },
  { label: 'about', href: '/about'   },
  { label: 'play',  href: '/play'    },
  { label: 'talk',  href: '/contact' },
]

/* ── Split-text flip link ──────────────────────────────────── */
function FlipLink({ label, href, isActive, onClick }) {
  const ref = useRef(null)
  useCursorState(ref, 'link')

  return (
    <Link
      ref={ref}
      to={href}
      onClick={onClick}
      style={{
        display: 'block',
        overflow: 'hidden',
        fontFamily: 'var(--font-body)',
        fontSize: '13px',
        textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-wide)',
        color: isActive ? 'var(--color-fg)' : 'var(--color-muted)',
        textDecoration: 'none',
        position: 'relative',
        lineHeight: 1,
        paddingBottom: '2px',
      }}
    >
      <motion.span
        style={{ display: 'block' }}
        initial={false}
        whileHover="hover"
      >
        {/* Default text — slides up on hover */}
        <motion.span
          style={{ display: 'block' }}
          variants={{
            hover: { y: '-100%', transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] } },
          }}
        >
          {label}
        </motion.span>

        {/* Duplicate — slides in from below on hover */}
        <motion.span
          aria-hidden
          style={{
            display: 'block',
            position: 'absolute',
            top: '100%',
            left: 0,
            color: 'var(--color-fg)',
          }}
          variants={{
            hover: { y: '-100%', transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] } },
          }}
        >
          {label}
        </motion.span>
      </motion.span>

      {/* Active underline */}
      {isActive && (
        <span style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '1px',
          background: 'var(--color-primary)',
        }} />
      )}
    </Link>
  )
}

/* ── Mobile overlay ────────────────────────────────────────── */
function MobileOverlay({ isOpen, onClose }) {
  const location = useLocation()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--color-bg)',
            zIndex: 'calc(var(--z-nav) - 1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingInline: 'var(--page-padding-x)',
          }}
        >
          <nav>
            {NAV_LINKS.map(({ label, href }, i) => (
              <motion.div
                key={href}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={href}
                  onClick={onClose}
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--t-h1)',
                    fontWeight: 600,
                    letterSpacing: 'var(--tracking-tight)',
                    color: location.pathname === href
                      ? 'var(--color-primary)'
                      : 'var(--color-fg)',
                    textDecoration: 'none',
                    paddingBlock: 'var(--space-2)',
                    borderBottom: '1px solid var(--color-subtle)',
                  }}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── Navigation ────────────────────────────────────────────── */
export default function Navigation() {
  const location = useLocation()
  const [scrolled, setScrolled]   = useState(false)
  const [progress, setProgress]   = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const logoRef = useRef(null)
  useCursorState(logoRef, 'link')

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  useEffect(() => {
    const onScroll = () => {
      const scrollTop  = window.scrollY
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(scrollTop > 80)
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 'var(--nav-height)',
          paddingInline: 'var(--page-padding-x)',
          zIndex: 'var(--z-nav)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        animate={{
          background: scrolled ? 'var(--nav-bg-scrolled)' : 'var(--nav-bg-default)',
          backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        {/* Logo */}
        <Link
          ref={logoRef}
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
          }}
        >
          <img
            src="/images/logo.svg"
            alt="Vishvak Rajendran"
            style={{
              width: '28px',
              height: '28px',
              objectFit: 'contain',
              filter: 'invert(1)',
            }}
          />
        </Link>

        {/* Desktop links + theme toggler */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-6)',
            alignItems: 'center',
          }}
          className="nav-desktop"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <FlipLink
              key={href}
              label={label}
              href={href}
              isActive={location.pathname === href}
            />
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(v => !v)}
          className="nav-hamburger"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          style={{
            background: 'none',
            border: 'none',
            padding: 'var(--space-1)',
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            cursor: 'none',
          }}
        >
          <motion.span
            style={{ display: 'block', width: '22px', height: '1px', background: 'var(--color-fg)' }}
            animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            style={{ display: 'block', width: '22px', height: '1px', background: 'var(--color-fg)' }}
            animate={{ opacity: mobileOpen ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            style={{ display: 'block', width: '22px', height: '1px', background: 'var(--color-fg)' }}
            animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>

        {/* Scroll progress bar */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'var(--color-subtle)',
        }}>
          <motion.div
            style={{
              width: '100%',
              height: '100%',
              background: 'var(--color-fg)',
              transformOrigin: 'left',
              scaleX: progress,
            }}
          />
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <MobileOverlay isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 767px) {
          .nav-desktop   { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}

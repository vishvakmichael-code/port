import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCursorState } from '../../hooks/useCursorState'
import { useIsMobile } from '../../hooks/useMediaQuery'

const FOOTER_DATA = {
  email:    'vishvakmichael@gmail.com',
  linkedin: 'https://www.linkedin.com/in/vishvakr/',
  youtube:  'https://www.youtube.com/@vishvakmichael',
  cv:       '/cv/vishvak-rajendran-cv.pdf',
  year:     '2026',
}

function FooterNavLink({ label, href, to, download }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const navigate = useNavigate()
  useCursorState(ref, 'link')

  const baseStyle = {
    fontFamily: 'var(--font-itim)',
    fontSize: 'clamp(14px, 1.2vw, 16px)',
    color: hovered ? '#F5F5F5' : '#888888',
    textDecoration: 'none',
    cursor: 'none',
    transition: 'color 0.2s ease',
    background: 'none',
    border: 'none',
    padding: 0,
    textAlign: 'left',
    display: 'block',
    width: 'fit-content',
  }

  if (to) {
    return (
      <button
        ref={ref}
        onClick={() => navigate(to)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={baseStyle}
      >
        {label}
      </button>
    )
  }

  return (
    <a
      ref={ref}
      href={href}
      download={download || undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={baseStyle}
    >
      {label}
    </a>
  )
}

function SocialButton({ href, label, iconSrc }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  useCursorState(ref, 'link')

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '44px',
        height: '44px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid #333333',
        background: hovered ? '#1A1A1A' : 'transparent',
        transition: 'all 0.2s ease',
        cursor: 'none',
        textDecoration: 'none',
        overflow: 'hidden',
        padding: '8px',
      }}
    >
      <img
        src={iconSrc}
        alt={label}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          opacity: hovered ? 1 : 0.6,
          transition: 'opacity 0.2s ease',
          filter: 'brightness(0) invert(1)',
        }}
      />
    </a>
  )
}

export default function Footer() {
  const isMobile = useIsMobile()

  return (
    <footer style={{
      background: '#000000',
      position: 'relative',
      zIndex: 2,
      borderTop: '1px solid #222222',
    }}>

      {/* CTA headline */}
      <div style={{
        paddingTop: 'var(--space-12)',
        paddingBottom: 'var(--space-8)',
        paddingInline: 'var(--page-padding-x)',
        borderBottom: '1px solid #222222',
      }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(20px, 2.5vw, 32px)',
            fontWeight: 600,
            letterSpacing: 'var(--tracking-heading)',
            color: 'var(--color-primary)',
            margin: 0,
          }}
        >
          You are here, might as well say hi!
        </motion.p>
      </div>

      {/* Main footer row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr auto auto',
        gap: isMobile ? 'var(--space-8)' : 'var(--space-16)',
        alignItems: 'start',
        paddingBlock: 'var(--space-8)',
        paddingInline: 'var(--page-padding-x)',
      }}>

        {/* Left — name + logo mark */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-4)',
        }}>
          <p style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(22px, 2.5vw, 32px)',
            fontWeight: 700,
            letterSpacing: 'var(--tracking-heading)',
            lineHeight: 1.1,
            color: '#F5F5F5',
            margin: 0,
          }}>
            Vishvak<br />Rajendran
          </p>
          <img
            src="/images/logo.svg"
            alt="logo mark"
            style={{
              width: 'clamp(48px, 5vw, 64px)',
              height: 'clamp(48px, 5vw, 64px)',
              objectFit: 'contain',
              filter: 'invert(1)',
              opacity: 0.85,
            }}
          />
        </div>

        {/* Center — nav links */}
        <nav style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
          minWidth: '220px',
        }}>
          <FooterNavLink label="Send email"                 href={`mailto:${FOOTER_DATA.email}`} />
          <FooterNavLink label="Download Resume"            href={FOOTER_DATA.cv} download />
          <FooterNavLink label="See all works"              to="/work" />
          <FooterNavLink label="Interested in reading more" to="/about" />
        </nav>

        {/* Right — socials */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'row' : 'column',
          gap: isMobile ? 'var(--space-3)' : 'var(--space-2)',
          alignItems: 'flex-start',
        }}>
          {!isMobile && (
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--t-label)',
              letterSpacing: 'var(--tracking-label)',
              color: '#666666',
              textTransform: 'uppercase',
              margin: '0 0 var(--space-2) 0',
            }}>
              Socials
            </p>
          )}
          <SocialButton
            href={FOOTER_DATA.linkedin}
            label="LinkedIn"
            iconSrc="/images/illustrations/linkedinlogo.svg"
          />
          <SocialButton
            href={FOOTER_DATA.youtube}
            label="YouTube"
            iconSrc="/images/illustrations/youtubelogo.svg"
          />
        </div>

      </div>

      {/* Copyright bar */}
      <div style={{
        borderTop: '1px solid #222222',
        paddingBlock: 'var(--space-3)',
        paddingInline: 'var(--page-padding-x)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 'var(--space-2)',
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--t-label)',
          color: '#444444',
          margin: 0,
          letterSpacing: '0.06em',
        }}>
          © {FOOTER_DATA.year} Vishvak Rajendran
        </p>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--t-label)',
          color: '#444444',
          margin: 0,
          letterSpacing: '0.06em',
        }}>
          Service Designer · Systems Thinker
        </p>
      </div>

    </footer>
  )
}

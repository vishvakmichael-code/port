import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { caseStudies } from '../data/case-studies'
import { useIsMobile } from '../hooks/useMediaQuery'
import ProblemSolutionMap from '../components/case-study/ProblemSolutionMap'
import ServiceExplorer from '../components/case-study/ServiceExplorer'

/* ─── font constants ───────────────────────────────────────────────────────── */
const PLAYFAIR = "'Playfair Display', serif"
const DM_SANS  = "'DM Sans', sans-serif"

/* ─── size / spacing constants ─────────────────────────────────────────────── */
const BODY    = '14px'
const BODY_LG = '15px'
const LABEL   = '11px'
const TRACK   = '-0.01em'

const FG_PRIMARY = 'var(--color-fg)'
const FG_MUTED   = 'var(--color-muted)'

/* ─── helpers ───────────────────────────────────────────────────────────────── */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
})

function renderBold(text) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1
      ? <strong key={i} style={{ fontWeight: 700 }}>{part}</strong>
      : part
  )
}


/* ─── TOC ────────────────────────────────────────────────────────────────────── */

const TABS = ['Decisions', 'Process', 'Challenges']

const TOC_ITEMS = [
  { id: 'cs-intro',     label: 'Intro' },
  { id: 'cs-challenge', label: 'Opportunity' },
  { id: 'cs-diagnosis', label: 'Diagnosis' },
  { id: 'cs-solution',  label: 'Solution' },
  { id: 'cs-outcomes',  label: 'Outcomes' },
]

const TAB_TOC_ITEMS = [
  { index: 0, label: 'Decisions' },
  { index: 1, label: 'Process' },
  { index: 2, label: 'Challenges' },
]

/* ─── sub-components ─────────────────────────────────────────────────────────── */

function TableOfContents({ activeId, accent, visible, activeTab, onTabChange, onOpen, thinkingRef }) {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleTabClick = (index) => {
    onOpen()
    onTabChange(index)
    setTimeout(() => {
      thinkingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  return (
    <nav style={{
      position: 'fixed',
      left: 'max(16px, calc(50vw - 650px))',
      top: 'calc(var(--nav-height) + 3.5rem)',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      zIndex: 5,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateX(0)' : 'translateX(-14px)',
      pointerEvents: visible ? 'auto' : 'none',
      transition: 'opacity 0.55s ease, transform 0.55s ease',
      width: '160px',
    }}>
      {TOC_ITEMS.map(({ id, label }) => {
        const isActive = activeId === id
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            style={{
              fontFamily: DM_SANS,
              fontSize: LABEL,
              fontWeight: isActive ? 700 : 400,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: isActive ? accent : FG_MUTED,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              textAlign: 'left',
              transition: 'color 0.25s',
              opacity: isActive ? 1 : 0.55,
            }}
          >
            {label}
          </button>
        )
      })}

      <div style={{ borderTop: '1px solid var(--color-subtle)', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {TAB_TOC_ITEMS.map(({ index, label }) => {
          const isActive = activeTab === index
          return (
            <button
              key={label}
              onClick={() => handleTabClick(index)}
              style={{
                fontFamily: DM_SANS,
                fontSize: LABEL,
                fontWeight: isActive ? 700 : 400,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: isActive ? accent : FG_MUTED,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                textAlign: 'left',
                transition: 'color 0.25s',
                opacity: isActive ? 1 : 0.4,
              }}
            >
              {label}
            </button>
          )
        })}
      </div>

    </nav>
  )
}

function SectionLabel({ children, accent }) {
  return (
    <p style={{
      fontFamily: DM_SANS,
      fontSize: '0.78rem',
      fontWeight: 700,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: accent || FG_MUTED,
      margin: '0 0 20px 0',
    }}>
      {children}
    </p>
  )
}

function DecisionsTab({ decisions, accent, isMobile }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {decisions.map((d, i) => (
        <motion.div
          key={i}
          {...fadeUp(i * 0.08)}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '2.5rem 1fr' : '2.5rem 1fr 45%',
            gap: '2rem',
            paddingBlock: '2.5rem',
            borderBottom: '1px solid var(--color-subtle)',
            alignItems: 'start',
          }}
        >
          {/* Col 1 — faint number */}
          <div style={{
            fontFamily: PLAYFAIR,
            fontSize: '3rem',
            fontWeight: 700,
            color: accent,
            opacity: 0.1,
            lineHeight: 1,
            userSelect: 'none',
            paddingTop: '2px',
          }}>
            {d.number}
          </div>

          {/* Col 2 — text */}
          <div>
            <p style={{
              fontFamily: DM_SANS,
              fontSize: LABEL,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: FG_MUTED,
              margin: '0 0 12px 0',
            }}>
              Decision {d.number}
            </p>
            <h3 style={{
              fontFamily: PLAYFAIR,
              fontSize: '1.4rem',
              fontWeight: 700,
              letterSpacing: TRACK,
              color: FG_PRIMARY,
              margin: '0 0 16px 0',
              lineHeight: 1.2,
            }}>
              {d.title}
            </h3>
            <p style={{
              fontFamily: DM_SANS,
              fontSize: BODY_LG,
              letterSpacing: TRACK,
              lineHeight: 1.7,
              color: FG_PRIMARY,
              margin: 0,
              opacity: 0.85,
            }}>
              {d.body}
            </p>
            {d.note && (
              <p style={{
                fontFamily: DM_SANS,
                fontSize: '13px',
                fontWeight: 400,
                letterSpacing: TRACK,
                lineHeight: 1.65,
                color: '#888888',
                margin: 0,
                marginTop: '16px',
                paddingTop: '12px',
                borderTop: '1px solid #eeeeee',
              }}>
                {d.note}
              </p>
            )}
          </div>

          {/* Col 3 — artifact image (hides on mobile) */}
          {!isMobile && d.image && (
            <img
              src={d.image}
              alt={d.artifact}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                objectPosition: 'top center',
                display: 'block',
                borderRadius: '8px',
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}

function ChallengesTab({ challenges, challengeReflection }) {
  return (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '3rem',
        marginBottom: '4rem',
      }}>
        {challenges.map((c, i) => (
          <motion.div key={i} {...fadeUp(i * 0.08)}>
            <p style={{
              fontFamily: DM_SANS,
              fontSize: LABEL,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: FG_MUTED,
              opacity: 0.5,
              margin: '0 0 10px 0',
            }}>
              {c.number}
            </p>
            <h4 style={{
              fontFamily: PLAYFAIR,
              fontSize: '1.3rem',
              fontWeight: 700,
              letterSpacing: TRACK,
              color: FG_PRIMARY,
              margin: '0 0 12px 0',
              lineHeight: 1.25,
            }}>
              {c.title}
            </h4>
            <p style={{
              fontFamily: DM_SANS,
              fontSize: BODY_LG,
              letterSpacing: TRACK,
              lineHeight: 1.7,
              color: FG_PRIMARY,
              opacity: 0.7,
              margin: 0,
            }}>
              {c.body}
            </p>
          </motion.div>
        ))}
      </div>

      {challengeReflection && (
        <motion.div
          {...fadeUp(0.3)}
          style={{ paddingTop: '3rem', borderTop: '1px solid var(--color-subtle)' }}
        >
          <p style={{
            fontFamily: DM_SANS,
            fontSize: LABEL,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: FG_MUTED,
            margin: '0 0 20px 0',
          }}>
            Personal reflection
          </p>
          <p style={{
            fontFamily: PLAYFAIR,
            fontStyle: 'italic',
            fontSize: '1.2rem',
            fontWeight: 600,
            letterSpacing: TRACK,
            lineHeight: 1.7,
            color: FG_PRIMARY,
            opacity: 0.85,
            margin: 0,
            maxWidth: '640px',
          }}>
            {challengeReflection}
          </p>
        </motion.div>
      )}
    </div>
  )
}

function ProcessTab({ process, accent, isMobile }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: '1px',
      background: 'var(--color-subtle)',
    }}>
      {process.map((p, i) => (
        <motion.div
          key={i}
          {...fadeUp(i * 0.08)}
          style={{ background: 'var(--color-bg)', display: 'flex', flexDirection: 'column' }}
        >
          {/* Large photo */}
          {p.image && (
            <div style={{ height: '280px', overflow: 'hidden', flexShrink: 0 }}>
              <img
                src={p.image}
                alt={p.stage}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          )}
          {/* Text */}
          <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{
                fontFamily: DM_SANS,
                fontSize: LABEL,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: accent,
                opacity: 0.6,
              }}>
                {p.number}
              </span>
              <span style={{
                fontFamily: DM_SANS,
                fontSize: '0.9rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: FG_PRIMARY,
              }}>
                {p.stage}
              </span>
            </div>
            <p style={{
              fontFamily: PLAYFAIR,
              fontStyle: 'italic',
              fontSize: '1rem',
              fontWeight: 600,
              letterSpacing: TRACK,
              color: FG_PRIMARY,
              margin: 0,
              lineHeight: 1.3,
            }}>
              {p.oneLiner}
            </p>
            <p style={{
              fontFamily: DM_SANS,
              fontSize: BODY,
              letterSpacing: TRACK,
              lineHeight: 1.7,
              color: FG_PRIMARY,
              margin: 0,
              opacity: 0.7,
            }}>
              {p.detail}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/* ─── CTA reveal ─────────────────────────────────────────────────────────────── */

function CTAReveal({ isMobile, onReveal }) {
  const [arrowHovered, setArrowHovered] = useState(false)

  return (
    <motion.section
      {...fadeUp(0)}
      style={{
        maxWidth: '1100px',
        marginInline: 'auto',
        paddingInline: isMobile ? '24px' : '3rem',
        paddingBlock: '48px',
        borderTop: '1px solid #eeeeee',
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'center',
        gap: isMobile ? '2rem' : '4rem',
      }}>
        {/* Left */}
        <div style={{ flex: 1 }}>
          <p style={{
            fontFamily: DM_SANS,
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#888888',
            margin: '0 0 10px 0',
          }}>
            There is more to this
          </p>
          <p style={{
            fontFamily: DM_SANS,
            fontSize: '22px',
            fontWeight: 500,
            color: '#1a1a6e',
            lineHeight: 1.5,
            margin: '0 0 10px 0',
          }}>
            Curious how we got here?
          </p>
          <p style={{
            fontFamily: DM_SANS,
            fontSize: '14px',
            color: '#888888',
            lineHeight: 1.6,
            margin: 0,
            maxWidth: '400px',
          }}>
            The decisions we debated, the research that surprised us, and the things that almost didn't make it.
          </p>
        </div>

        {/* Right — clickable */}
        <div
          role="button"
          tabIndex={0}
          onClick={onReveal}
          onKeyDown={e => e.key === 'Enter' && onReveal()}
          onMouseEnter={() => setArrowHovered(true)}
          onMouseLeave={() => setArrowHovered(false)}
          style={{ cursor: 'pointer', flexShrink: 0 }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '8px',
          }}>
            <span style={{
              fontFamily: DM_SANS,
              fontSize: '15px',
              fontWeight: 500,
              color: '#1a1a6e',
              textDecoration: arrowHovered ? 'underline' : 'none',
              textUnderlineOffset: '3px',
              transition: 'text-decoration 0.2s ease',
            }}>
              Read the thinking behind it
            </span>
            <i
              className="ti ti-arrow-right"
              style={{
                fontSize: '16px',
                color: '#1a1a6e',
                lineHeight: 1,
                transform: arrowHovered ? 'translateX(4px)' : 'translateX(0)',
                transition: 'transform 0.2s ease',
                display: 'inline-block',
              }}
            />
          </div>
          <p style={{
            fontFamily: DM_SANS,
            fontSize: '11px',
            color: '#aaaaaa',
            margin: 0,
            letterSpacing: '0.02em',
          }}>
            Decisions · Process · Challenges
          </p>
        </div>
      </div>
    </motion.section>
  )
}

/* ─── LinkedIn post card ─────────────────────────────────────────────────────── */

const POST_URL = 'https://www.linkedin.com/feed/update/urn:li:activity:7400820680533061633/'

function LinkedInCard() {
  const [hov, setHov] = useState(false)
  const META = { fontFamily: DM_SANS, fontSize: '12px', color: '#888888', margin: 0, lineHeight: 1.4 }

  return (
    <div>
      <a
        href={POST_URL}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: 'block',
          background: '#ffffff',
          border: `1px solid ${hov ? '#1a1a6e' : '#e0e0e0'}`,
          borderRadius: '8px',
          padding: '16px',
          textDecoration: 'none',
          transition: 'border-color 0.2s ease',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        {/* LinkedIn logo */}
        <i className="ti ti-brand-linkedin" style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '16px', color: '#0077b5' }} />

        {/* Vishvak header */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#eef2fb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontFamily: DM_SANS, fontSize: '13px', fontWeight: 600, color: '#1a1a6e' }}>VR</span>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
              <span style={{ fontFamily: DM_SANS, fontSize: '14px', fontWeight: 500, color: '#1a1a6e' }}>Vishvak R</span>
              <i className="ti ti-circle-check" style={{ fontSize: '14px', color: '#0077b5', lineHeight: 1 }} />
            </div>
            <p style={META}>Service Designer · I help organisations untangle messy systems</p>
            <p style={META}>5mo</p>
          </div>
        </div>

        {/* Post text */}
        <p style={{ fontFamily: DM_SANS, fontSize: '14px', color: '#333333', lineHeight: 1.6, margin: '0 0 14px 0' }}>
          We pitched our solution to Getliņi EKO! The best part? We didn't just share an idea but the whole value proposition that is tested, validated, user-driven hybrid ecosystem built from weeks of research, field visits, interviews, workshops, and rapid prototyping. We learned how people actually repair, donate, and discard items and used those insights to design a system with both application and service flow in the Getliņi physical space that makes circular behaviour easier, more accessible, and more rewarding.
        </p>

        {/* Presentation photo */}
        <img
          src="/images/projects/getlini/Presentation-to-client.JPG"
          alt="Presenting Reboot to Getliņi"
          style={{ width: '100%', display: 'block', borderRadius: '4px', marginBottom: '14px', maxHeight: '300px', objectFit: 'cover' }}
        />

        {/* Linda's reshare */}
        <div style={{ background: '#f9f9f9', border: '1px solid #e0e0e0', borderRadius: '6px', padding: '12px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#eef2fb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontFamily: DM_SANS, fontSize: '11px', fontWeight: 600, color: '#1a1a6e' }}>LP</span>
            </div>
            <div>
              <p style={{ fontFamily: DM_SANS, fontSize: '13px', fontWeight: 500, color: '#1a1a6e', margin: '0 0 2px 0' }}>Linda Paulauska</p>
              <p style={{ ...META, fontSize: '11px' }}>Service Designer · Independent Researcher · UX/CX Researcher</p>
              <p style={{ ...META, fontSize: '11px' }}>5mo · Edited</p>
            </div>
          </div>
          <p style={{ fontFamily: DM_SANS, fontSize: '13px', color: '#333333', lineHeight: 1.6, margin: 0 }}>
            Yesterday I rearranged everything to attend the final presentations at my former study program SDSI, where students shared their Service Design process and solutions developed over...
          </p>
        </div>
      </a>

      {/* View on LinkedIn */}
      <a
        href={POST_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'inline-block', marginTop: '8px', fontFamily: DM_SANS, fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888888', textDecoration: 'none' }}
      >
        View on LinkedIn →
      </a>
    </div>
  )
}

/* ─── main component ──────────────────────────────────────────────────────────── */

export default function CaseStudy() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const cs = caseStudies[slug]

  const [activeTab, setActiveTab] = useState(0)
  const [activeSection, setActiveSection] = useState('cs-intro')
  const [tocVisible, setTocVisible] = useState(true)
  const [heroGone, setHeroGone] = useState(false)
  const [thinkingOpen, setThinkingOpen] = useState(false)
  const thinkingRef = useRef(null)
  const footerRef   = useRef(null)
  const heroRef     = useRef(null)

  useEffect(() => {
    const observers = []
    TOC_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-20% 0px -70% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [cs])

  useEffect(() => {
    const el = footerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setTocVisible(!entry.isIntersecting),
      { rootMargin: '0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  /* Show sidebar only after hero scrolls out of view */
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setHeroGone(!entry.isIntersecting),
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  if (!cs) return (
    <main style={{ padding: '80px 24px' }}>
      <p>Case study not found.</p>
      <button onClick={() => navigate('/work')}>← Back to work</button>
    </main>
  )

  const PX = isMobile ? '24px' : '3rem'

  const proseStyle = { maxWidth: '700px',  marginInline: 'auto', paddingInline: PX }
  const mediaStyle = { maxWidth: '900px',  marginInline: 'auto', paddingInline: PX }
  const wideStyle  = { maxWidth: '1100px', marginInline: 'auto', paddingInline: PX }

  /* Partition opportunity: prose vs bold stat paragraphs */
  const oppProse = cs.opportunity.filter(p => !(p.startsWith('**') && p.endsWith('**')))

  return (
    <main
      data-case-study={cs.slug}
      style={{ background: 'var(--color-bg)' }}
    >

      {/* TOC + metadata sidebar — fixed left, desktop only */}
      {!isMobile && (
        <TableOfContents
          activeId={activeSection}
          accent={cs.accent}
          visible={heroGone && tocVisible}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onOpen={() => setThinkingOpen(true)}
          thinkingRef={thinkingRef}
        />
      )}


      {/* ══════════════════════════════════════
          LAYER 1 — FULL-SCREEN HERO
          Zone A (top): title + subtitle, full width
          Zone B (below): left metadata · right lead text
          Everything fits in 100svh
      ══════════════════════════════════════ */}
      <section
        id="cs-intro"
        ref={heroRef}
        style={{
          height: isMobile ? 'auto' : '100svh',
          minHeight: isMobile ? 0 : '100svh',
          paddingTop: 'var(--nav-height)',
          borderBottom: '1px solid var(--color-subtle)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Inner wrapper — fills remaining height below nav */}
        <div style={{
          flex: 1,
          maxWidth: '1200px',
          marginInline: 'auto',
          width: '100%',
          paddingInline: isMobile ? '24px' : '3rem',
          display: 'flex',
          flexDirection: 'column',
        }}>

          {/* ── Zone A: title + subtitle ── */}
          <div style={{ paddingTop: isMobile ? '2.5rem' : '3rem', paddingBottom: isMobile ? '1.5rem' : '2rem' }}>
            <motion.h1
              {...fadeUp(0)}
              style={{
                fontFamily: PLAYFAIR,
                fontSize: isMobile ? 'clamp(2.5rem, 10vw, 3.5rem)' : 'clamp(3.75rem, 5.5vw, 4.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.025em',
                lineHeight: 1.06,
                color: FG_PRIMARY,
                margin: '0 0 0.65rem 0',
                maxWidth: '14ch',
              }}
            >
              {cs.title}
            </motion.h1>

            <motion.p
              {...fadeUp(0.05)}
              style={{
                fontFamily: DM_SANS,
                fontSize: '13px',
                letterSpacing: '0.01em',
                lineHeight: 1.5,
                color: FG_PRIMARY,
                opacity: 0.45,
                margin: 0,
              }}
            >
              {cs.subtitle}
            </motion.p>
          </div>

          {/* ── Divider ── */}
          <div style={{ height: '1px', background: 'var(--color-subtle)', flexShrink: 0 }} />

          {/* ── Zone B: metadata (left) + lead text (right) ── */}
          <div style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '220px 1fr',
            gap: isMobile ? '2rem' : '5rem',
            alignItems: 'start',
            paddingTop: isMobile ? '1.75rem' : '2.25rem',
            paddingBottom: isMobile ? '2.5rem' : '2rem',
            overflowY: isMobile ? 'visible' : 'hidden',
          }}>

            {/* LEFT — metadata stacked */}
            <motion.div {...fadeUp(0.08)} style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '1rem' : '1.4rem' }}>
              {[
                { label: 'Client', value: cs.meta.client },
                { label: 'Year',   value: cs.meta.year },
                { label: 'Role',   value: cs.meta.role },
                { label: 'Status', value: cs.meta.status },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ fontFamily: DM_SANS, fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: FG_MUTED, margin: '0 0 4px 0' }}>
                    {label}
                  </p>
                  <p style={{ fontFamily: DM_SANS, fontSize: '13px', fontWeight: 400, letterSpacing: TRACK, color: FG_PRIMARY, margin: 0, lineHeight: 1.45 }}>
                    {value}
                  </p>
                </div>
              ))}

              {/* Team — each name links to LinkedIn */}
              <div>
                <p style={{ fontFamily: DM_SANS, fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: FG_MUTED, margin: '0 0 4px 0' }}>
                  Team
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {[
                    { name: 'Inda',      href: 'https://www.linkedin.com/in/indaintiar/' },
                    { name: 'Qamar',     href: 'https://www.linkedin.com/in/qamar-a-343b9813a/' },
                    { name: 'Catherine', href: 'https://www.linkedin.com/in/catherine-priyadharshini/' },
                    { name: 'Kathlene',  href: 'https://www.linkedin.com/in/annabelle-kathleen-207765205/' },
                    { name: 'Aisho',     href: 'https://www.linkedin.com/in/aisha-orynaly-b450112b0/' },
                  ].map(({ name, href }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: DM_SANS, fontSize: '13px', fontWeight: 400,
                        letterSpacing: TRACK, color: '#1a1a6e',
                        textDecoration: 'none',
                        borderBottom: '1px solid transparent',
                        transition: 'border-color 0.2s ease',
                        lineHeight: 1.55,
                        cursor: 'pointer',
                      }}
                      onMouseEnter={e => e.currentTarget.style.borderBottomColor = '#1a1a6e'}
                      onMouseLeave={e => e.currentTarget.style.borderBottomColor = 'transparent'}
                    >
                      {name}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* RIGHT — challenge lead text */}
            <motion.div {...fadeUp(0.1)}>
              {cs.challenge.map((para, i) => (
                <p key={i} style={{
                  fontFamily: PLAYFAIR,
                  fontSize: '1rem',
                  fontWeight: 400,
                  letterSpacing: TRACK,
                  lineHeight: 1.8,
                  color: FG_PRIMARY,
                  opacity: i === 0 ? 1 : 0.72,
                  margin: i < cs.challenge.length - 1 ? '0 0 1rem 0' : 0,
                }}>
                  {renderBold(para)}
                </p>
              ))}
            </motion.div>

          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          SITE VISIT PHOTO STRIP
      ══════════════════════════════════════ */}
      {cs.siteVisitImages && (
        <section style={{ ...mediaStyle, paddingBlock: '3rem', borderBottom: '1px solid var(--color-subtle)' }}>
          <SectionLabel>Site visit · Getliņi, Latvia</SectionLabel>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: '8px',
          }}>
            {cs.siteVisitImages.map((src, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.06)}
                style={{ aspectRatio: '4/3', borderRadius: '8px', overflow: 'hidden' }}
              >
                <img
                  src={src}
                  alt={`Site visit ${i + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}


      {/* ══════════════════════════════════════
          LAYER 2 — OPPORTUNITY
      ══════════════════════════════════════ */}
      <section id="cs-challenge" style={{
        ...proseStyle,
        paddingBlock: '5rem',
        borderBottom: '1px solid var(--color-subtle)',
      }}>
        <motion.div {...fadeUp(0)}>
          <h2 style={{ fontFamily: DM_SANS, fontSize: '32px', fontWeight: 600, color: '#1a1a6e', margin: '0 0 24px 0', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
            The Opportunity
          </h2>

          {/* Prose intro */}
          {oppProse.slice(0, -1).map((para, i) => (
            <p key={i} style={{
              fontFamily: DM_SANS, fontSize: '15px', letterSpacing: TRACK,
              lineHeight: 1.7, color: '#333333',
              margin: i === 0 ? '1.5rem 0 1rem 0' : '0 0 1rem 0',
            }}>
              {renderBold(para)}
            </p>
          ))}

          {/* HMW centrepiece */}
          <div style={{
            borderLeft: '2px solid var(--color-primary)',
            paddingLeft: '1.75rem',
            paddingTop: '0.25rem',
            paddingBottom: '0.25rem',
            marginTop: '2.5rem',
          }}>
            <p style={{
              fontFamily: DM_SANS, fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#888888', margin: '0 0 0.9rem 0',
            }}>
              How might we
            </p>
            <p style={{
              fontFamily: DM_SANS, fontSize: '21px', fontWeight: 500,
              lineHeight: 1.6, color: '#1a1a6e', margin: 0,
              letterSpacing: '-0.01em',
            }}>
              create a hybrid ecosystem that provides all users a physically interactive and emotionally engaging experience that influences their perception about the value of waste?
            </p>
          </div>
        </motion.div>
      </section>


      {/* ══════════════════════════════════════
          LAYER 4 — PROBLEM / SOLUTION MAP
      ══════════════════════════════════════ */}
      <section id="cs-diagnosis" style={{
        ...wideStyle,
        paddingBlock: '5rem',
        borderBottom: '1px solid var(--color-subtle)',
        paddingLeft: isMobile ? '24px' : 'max(3rem, 200px)',
      }}>
        <h2 style={{ fontFamily: DM_SANS, fontSize: '32px', fontWeight: 600, color: '#1a1a6e', margin: '0 0 24px 0', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
          Diagnosis
        </h2>
        <ProblemSolutionMap
          pairs={[
            { problem: { ...cs.diagnosis.problems[0], icon: 'ti-map-pin'   }, solution: { ...cs.diagnosis.solutions[1], icon: 'ti-truck'              } },
            { problem: { ...cs.diagnosis.problems[1], icon: 'ti-users'     }, solution: { ...cs.diagnosis.solutions[4], icon: 'ti-building-community'  } },
            { problem: { ...cs.diagnosis.problems[2], icon: 'ti-tool'      }, solution: { ...cs.diagnosis.solutions[3], icon: 'ti-device-mobile-check' } },
            { problem: { ...cs.diagnosis.problems[3], icon: 'ti-leaf'      }, solution: { ...cs.diagnosis.solutions[2], icon: 'ti-message-2-heart'     } },
            { problem: { ...cs.diagnosis.problems[4], icon: 'ti-recycle'   }, solution: { ...cs.diagnosis.solutions[0], icon: 'ti-refresh'             } },
          ]}
        />

        <motion.div
          {...fadeUp(0.3)}
          style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-subtle)', display: 'flex', flexDirection: 'column', gap: '6px' }}
        >
          <p style={{ fontFamily: DM_SANS, fontSize: LABEL, fontWeight: 400, letterSpacing: '0.06em', color: FG_MUTED, margin: 0 }}>{cs.diagnosis.collaborativeCredit}</p>
          <p style={{ fontFamily: DM_SANS, fontSize: LABEL, fontWeight: 400, letterSpacing: '0.06em', color: FG_MUTED, margin: 0, opacity: 0.7 }}>{cs.diagnosis.contribution}</p>
        </motion.div>
      </section>


      {/* ══════════════════════════════════════
          LAYER 4.5 — SOLUTION: SERVICE EXPLORER
      ══════════════════════════════════════ */}
      <section id="cs-solution" style={{
        paddingBlock: '5rem',
        borderBottom: '1px solid var(--color-subtle)',
        background: '#ffffff',
      }}>
        <div style={{ ...wideStyle }}>
          <h2 style={{ fontFamily: DM_SANS, fontSize: '32px', fontWeight: 600, color: '#1a1a6e', margin: '0 0 24px 0', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
            The Solution
          </h2>

          {/* Wordmark */}
          <motion.div {...fadeUp(0)} style={{ marginBottom: '3rem' }}>
            <img
              src="/images/projects/getlini/Reboot.png"
              alt="Reboot"
              style={{ maxWidth: '220px', display: 'block' }}
            />
          </motion.div>

          {/* Five service features */}
          <ServiceExplorer isMobile={isMobile} />

          {/* Journey + pillars images */}
          <motion.div {...fadeUp(0.06)} style={{ overflow: 'hidden', marginTop: '3rem', marginBottom: '12px' }}>
            <img
              src="/images/projects/getlini/Solution journey.png"
              alt="Reboot service user journey"
              style={{ width: '100%', display: 'block' }}
            />
          </motion.div>

          <motion.div {...fadeUp(0.1)} style={{ overflow: 'hidden', marginBottom: '12px' }}>
            <img
              src="/images/projects/getlini/4-parts of the solution.png"
              alt="The four pillars of Reboot"
              style={{ width: '100%', display: 'block' }}
            />
          </motion.div>

          {/* Figma prototype links — Figma blocks iframe embeds from third-party origins */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '24px' }}>
            {[
              {
                label: 'Exchange Flow',
                desc: 'Interactive prototype — how a user exchanges an item through the Reboot service.',
                url: 'https://www.figma.com/proto/LcHOICQykm6FXOzfUBSMyh/Reboot-repair-app?node-id=112-3588&t=hJB4ITnx428ibmSb-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=112%3A3588&show-proto-sidebar=1',
              },
              {
                label: 'Repair Flow',
                desc: 'Interactive prototype — how a user submits an item for repair through the pre-check flow.',
                url: 'https://www.figma.com/proto/LcHOICQykm6FXOzfUBSMyh/Reboot-repair-app?node-id=112-5190&t=BYttFK5H8j2NrrBj-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=112%3A5190&show-proto-sidebar=1',
              },
            ].map(({ label, desc, url }) => (
              <div key={label}>
                <p style={{ fontFamily: DM_SANS, fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#888888', margin: '0 0 10px 0' }}>
                  {label}
                </p>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <div
                    style={{
                      border: '1px solid #eeeeee',
                      borderRadius: '8px',
                      padding: '2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
                      background: '#fafafa',
                      transition: 'border-color 0.2s ease, background 0.2s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#1a1a6e'; e.currentTarget.style.background = '#f5f7ff' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#eeeeee'; e.currentTarget.style.background = '#fafafa' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className="ti ti-brand-figma" style={{ fontSize: '18px', color: '#1a1a6e', lineHeight: 1 }} />
                      <span style={{ fontFamily: DM_SANS, fontSize: '14px', fontWeight: 500, color: '#1a1a6e' }}>
                        Open {label}
                      </span>
                      <span style={{ fontFamily: DM_SANS, fontSize: '12px', color: '#888888', marginLeft: 'auto' }}>↗</span>
                    </div>
                    <p style={{ fontFamily: DM_SANS, fontSize: '13px', color: '#555555', lineHeight: 1.6, margin: 0 }}>
                      {desc}
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>




      {/* ══════════════════════════════════════
          LAYER 6 — KEY OUTCOMES
      ══════════════════════════════════════ */}
      <section id="cs-outcomes" style={{
        ...wideStyle,
        paddingBlock: '5rem',
        borderBottom: '1px solid var(--color-subtle)',
      }}>
        <h2 style={{ fontFamily: DM_SANS, fontSize: '32px', fontWeight: 600, color: '#1a1a6e', margin: '0 0 24px 0', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
          Key Outcomes
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.6fr', gap: isMobile ? 0 : '4rem', alignItems: 'start' }}>

          {/* Compact metric rows */}
          <div>
            {cs.outcomes.stats.map((stat, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.06)}
                style={{
                  display: 'flex', alignItems: 'baseline', gap: '1rem',
                  paddingBlock: '14px',
                  borderBottom: '1px solid #eeeeee',
                }}
              >
                <p style={{ fontFamily: DM_SANS, fontSize: '18px', fontWeight: 500, color: '#1a1a6e', margin: 0, lineHeight: 1, flexShrink: 0, minWidth: '42px' }}>
                  {stat.value}
                </p>
                <p style={{ fontFamily: DM_SANS, fontSize: '14px', fontWeight: 400, color: '#333333', margin: 0, lineHeight: 1.5 }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Narrative hero */}
          <motion.div
            {...fadeUp(0.1)}
            style={{
              paddingTop: isMobile ? '2.5rem' : 0,
              borderTop: isMobile ? '1px solid #eeeeee' : 'none',
              display: 'flex', flexDirection: 'column', gap: '1.25rem',
            }}
          >
            {cs.outcomes.narrative.map((para, i) => (
              <p key={i} style={{
                fontFamily: DM_SANS, fontSize: '16px', lineHeight: 1.75,
                color: i === 0 ? '#1a1a6e' : '#333333',
                fontWeight: i === 0 ? 500 : 400,
                margin: 0,
              }}>
                {para}
              </p>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          LAYER 7 — PRESENTATION TO CLIENT
      ══════════════════════════════════════ */}
      <section style={{ ...mediaStyle, paddingBlock: '3rem', borderBottom: '1px solid var(--color-subtle)' }}>
        <SectionLabel>Presenting to the client</SectionLabel>
        <motion.div {...fadeUp(0)}>
          <LinkedInCard />
        </motion.div>
      </section>


      {/* ══════════════════════════════════════
          CTA — PROCESS REVEAL
      ══════════════════════════════════════ */}
      {!thinkingOpen && (
        <CTAReveal
          isMobile={isMobile}
          onReveal={() => {
            setThinkingOpen(true)
            setTimeout(() => thinkingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
          }}
        />
      )}


      {/* ══════════════════════════════════════
          LAYER 8 — THINKING TABS
      ══════════════════════════════════════ */}
      <AnimatePresence>
      {thinkingOpen && (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
      <section
        id="cs-thinking"
        ref={thinkingRef}
        style={{ borderTop: '1px solid var(--color-subtle)' }}
      >
        {/* Sticky tab bar */}
        <div style={{
          position: 'sticky',
          top: 'var(--nav-height)',
          zIndex: 10,
          background: 'var(--color-bg)',
          borderBottom: '1px solid var(--color-subtle)',
        }}>
          <div style={{ ...wideStyle, paddingBlock: 0 }}>
            <div style={{ display: 'flex' }}>
              {TABS.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  style={{
                    fontFamily: DM_SANS,
                    fontSize: LABEL,
                    fontWeight: activeTab === i ? 700 : 400,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: activeTab === i ? FG_PRIMARY : FG_MUTED,
                    background: 'none',
                    border: 'none',
                    borderBottom: activeTab === i ? `2px solid ${cs.accent}` : '2px solid transparent',
                    padding: '1rem 1.5rem 1rem 0',
                    cursor: 'pointer',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab panels */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
          >
            {activeTab === 0 && (
              <div style={{ ...mediaStyle, paddingBlock: '5rem' }}>
                <DecisionsTab decisions={cs.decisions} accent={cs.accent} isMobile={isMobile} />
              </div>
            )}

            {activeTab === 1 && (
              <div style={{ ...wideStyle, paddingBlock: '5rem' }}>
                <ProcessTab process={cs.process} accent={cs.accent} isMobile={isMobile} />
              </div>
            )}

            {activeTab === 2 && (
              <div style={{ ...wideStyle, paddingBlock: '5rem' }}>
                <ChallengesTab challenges={cs.challenges} challengeReflection={cs.challengeReflection} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>
      </motion.div>
      )}
      </AnimatePresence>


      {/* ══════════════════════════════════════
          LAYER 9 — CLOSING FOOTER
      ══════════════════════════════════════ */}
      <section ref={footerRef} style={{
        ...proseStyle,
        paddingBlock: '4rem',
        borderTop: '1px solid var(--color-subtle)',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'center',
        gap: '1.5rem',
      }}>
        <p style={{ fontFamily: DM_SANS, fontSize: BODY, fontWeight: 700, letterSpacing: TRACK, color: FG_PRIMARY, margin: 0 }}>
          Vishvak Rajendran
        </p>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <motion.button
            onClick={() => navigate('/work')}
            whileHover={{ x: -3 }}
            transition={{ duration: 0.2 }}
            style={{ fontFamily: DM_SANS, fontSize: LABEL, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: FG_MUTED, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            ← All work
          </motion.button>
          <a href="mailto:hello@vishvak.com" style={{ fontFamily: DM_SANS, fontSize: LABEL, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: cs.accent, textDecoration: 'none' }}>
            You are here, might as well say hi →
          </a>
        </div>
      </section>

    </main>
  )
}

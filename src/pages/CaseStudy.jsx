import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { caseStudies } from '../data/case-studies'
import { useIsMobile } from '../hooks/useMediaQuery'

const ARIAL   = "'Arial', sans-serif"
const CRIMSON = 'var(--font-crimson)'
const ITIM    = 'var(--font-itim)'

const BODY    = '14px'
const BODY_LG = '15px'
const LABEL   = '11px'
const TRACK   = '-0.01em'

const FG_PRIMARY = 'var(--color-fg)'
const FG_MUTED   = 'var(--color-muted)'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
})

const TABS = ['Decisions', 'Process', 'Challenges']

const TOC_ITEMS = [
  { id: 'cs-intro',     label: 'Intro' },
  { id: 'cs-challenge', label: 'Challenge' },
  { id: 'cs-diagnosis', label: 'Diagnosis' },
  { id: 'cs-solution',  label: 'Solution' },
  { id: 'cs-research',  label: 'Research' },
  { id: 'cs-outcomes',  label: 'Outcomes' },
]

const TAB_TOC_ITEMS = [
  { index: 0, label: 'Decisions' },
  { index: 1, label: 'Process' },
  { index: 2, label: 'Challenges' },
]

// ─── sub-components ────────────────────────────────────────────────────────

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
      pointerEvents: visible ? 'auto' : 'none',
      transition: 'opacity 0.3s ease',
    }}>
      {TOC_ITEMS.map(({ id, label }) => {
        const isActive = activeId === id
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            style={{
              fontFamily: CRIMSON,
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
                fontFamily: CRIMSON,
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

function MetaCell({ label, value }) {
  return (
    <div>
      <p style={{
        fontFamily: CRIMSON,
        fontSize: LABEL,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: FG_MUTED,
        margin: '0 0 4px 0',
      }}>
        {label}
      </p>
      <p style={{
        fontFamily: ARIAL,
        fontSize: BODY,
        fontWeight: 500,
        letterSpacing: TRACK,
        color: FG_PRIMARY,
        margin: 0,
        lineHeight: 1.4,
      }}>
        {value}
      </p>
    </div>
  )
}

function SectionLabel({ children, accent }) {
  return (
    <p style={{
      fontFamily: CRIMSON,
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
            gridTemplateColumns: isMobile ? '2.5rem 1fr' : '2.5rem 1fr 1fr',
            gap: '2rem',
            paddingBlock: '2.5rem',
            borderBottom: '1px solid var(--color-subtle)',
            alignItems: 'start',
          }}
        >
          {/* Col 1 — faint number */}
          <div style={{
            fontFamily: CRIMSON,
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
              fontFamily: CRIMSON,
              fontSize: LABEL,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: FG_MUTED,
              margin: '0 0 12px 0',
            }}>
              Decision {d.number}
            </p>
            <h3 style={{
              fontFamily: CRIMSON,
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
              fontFamily: ITIM,
              fontSize: BODY_LG,
              letterSpacing: TRACK,
              lineHeight: 1.7,
              color: FG_PRIMARY,
              margin: 0,
              opacity: 0.85,
            }}>
              {d.body}
            </p>
          </div>

          {/* Col 3 — artifact image (hides on mobile) */}
          {!isMobile && (
            <div style={{
              aspectRatio: '4 / 3',
              borderRadius: '8px',
              overflow: 'hidden',
              background: 'var(--color-bg-3)',
            }}>
              {d.image ? (
                <img
                  src={d.image}
                  alt={d.artifact}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <p style={{ fontFamily: CRIMSON, fontSize: LABEL, letterSpacing: '0.06em', textTransform: 'uppercase', color: FG_MUTED, margin: 0, textAlign: 'center', padding: '24px', opacity: 0.6 }}>
                    {d.artifact}
                  </p>
                </div>
              )}
            </div>
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
              fontFamily: CRIMSON,
              fontSize: LABEL,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: FG_MUTED,
              opacity: 0.5,
              margin: '0 0 10px 0',
            }}>
              {c.number}
            </p>
            <h4 style={{
              fontFamily: CRIMSON,
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
              fontFamily: ITIM,
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
            fontFamily: CRIMSON,
            fontSize: LABEL,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: FG_MUTED,
            margin: '0 0 20px 0',
          }}>
            Personal reflection
          </p>
          <p style={{
            fontFamily: CRIMSON,
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
                fontFamily: CRIMSON,
                fontSize: LABEL,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: accent,
                opacity: 0.6,
              }}>
                {p.number}
              </span>
              <span style={{
                fontFamily: CRIMSON,
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
              fontFamily: CRIMSON,
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
              fontFamily: ITIM,
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

// ─── main component ────────────────────────────────────────────────────────

export default function CaseStudy() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const cs = caseStudies[slug]

  const [activeTab, setActiveTab] = useState(0)
  const [activeSection, setActiveSection] = useState('cs-intro')
  const [tocVisible, setTocVisible] = useState(true)
  const [thinkingOpen, setThinkingOpen] = useState(false)
  const thinkingRef = useRef(null)
  const footerRef   = useRef(null)

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

  const accentTint = `${cs.accent}0d`

  return (
    <main
      data-case-study={cs.slug}
      style={{ background: 'var(--color-bg)', paddingTop: 'var(--nav-height)' }}
    >

      {/* TOC — fixed left, desktop only */}
      {!isMobile && (
        <TableOfContents
          activeId={activeSection}
          accent={cs.accent}
          visible={tocVisible}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onOpen={() => setThinkingOpen(true)}
          thinkingRef={thinkingRef}
        />
      )}


      {/* ══════════════════════════════════════
          LAYER 1 — PAGE HEADER
      ══════════════════════════════════════ */}
      <section id="cs-intro" style={{
        ...proseStyle,
        paddingTop: isMobile ? '3rem' : '5rem',
        paddingBottom: '3rem',
        borderBottom: '1px solid var(--color-subtle)',
      }}>

        <motion.button
          {...fadeUp(0)}
          onClick={() => navigate('/work')}
          whileHover={{ x: -3 }}
          transition={{ duration: 0.2 }}
          style={{
            fontFamily: CRIMSON, fontSize: LABEL, fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: FG_MUTED, background: 'none', border: 'none',
            cursor: 'pointer', display: 'inline-flex', alignItems: 'center',
            gap: '6px', padding: 0, marginBottom: '2rem',
          }}
        >
          ← Work
        </motion.button>

        <motion.div
          {...fadeUp(0.04)}
          style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '1.5rem' }}
        >
          {cs.tags.map((tag) => (
            <span key={tag} style={{
              fontFamily: CRIMSON, fontSize: LABEL, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.08em',
              color: cs.accent, padding: '3px 10px',
              border: `1px solid ${cs.accent}`, borderRadius: '100px',
            }}>
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.h1
          {...fadeUp(0.06)}
          style={{
            fontFamily: ARIAL,
            fontSize: isMobile ? 'clamp(2.5rem, 12vw, 4rem)' : 'clamp(3rem, 6vw, 5rem)',
            fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 0.92,
            color: FG_PRIMARY, margin: '0 0 2rem 0',
          }}
        >
          {cs.title}
        </motion.h1>

        <motion.p
          {...fadeUp(0.08)}
          style={{
            fontFamily: ITIM, fontSize: BODY_LG, letterSpacing: TRACK,
            lineHeight: 1.6, color: FG_PRIMARY, opacity: 0.6, margin: '0 0 2.5rem 0',
          }}
        >
          {cs.subtitle}
        </motion.p>

        <motion.div
          {...fadeUp(0.1)}
          style={{
            paddingTop: '1.5rem', borderTop: '1px solid var(--color-subtle)',
            display: 'flex', gap: isMobile ? '1.5rem' : '2.5rem', flexWrap: 'wrap',
          }}
        >
          <MetaCell label="Client" value={cs.meta.client} />
          <MetaCell label="Year"   value={cs.meta.year} />
          <MetaCell label="Team"   value={cs.meta.teamSize} />
          <MetaCell label="Role"   value={cs.meta.role} />
          <MetaCell label="Status" value={cs.meta.status} />
        </motion.div>
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
          LAYER 2 — CHALLENGE + OPPORTUNITY
      ══════════════════════════════════════ */}
      <section id="cs-challenge" style={{
        ...proseStyle,
        paddingBlock: '5rem',
        borderBottom: '1px solid var(--color-subtle)',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>

          <motion.div {...fadeUp(0)}>
            <SectionLabel>The Challenge</SectionLabel>
            {cs.challenge.map((para, i) => (
              <p key={i} style={{
                fontFamily: ITIM, fontSize: BODY_LG, letterSpacing: TRACK,
                lineHeight: 1.75, color: FG_PRIMARY,
                opacity: i === 0 ? 1 : 0.75,
                margin: i < cs.challenge.length - 1 ? '0 0 1rem 0' : 0,
              }}>
                {para}
              </p>
            ))}
          </motion.div>

          <div style={{ borderTop: '1px solid var(--color-subtle)' }} />

          <motion.div {...fadeUp(0.06)}>
            <SectionLabel>The Opportunity</SectionLabel>
            {cs.opportunity.map((para, i) => (
              <p key={i} style={{
                fontFamily: ITIM, fontSize: BODY_LG, letterSpacing: TRACK,
                lineHeight: 1.75, color: FG_PRIMARY,
                opacity: i === 0 ? 1 : 0.75,
                margin: i < cs.opportunity.length - 1 ? '0 0 1rem 0' : 0,
              }}>
                {para}
              </p>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          LAYER 3 — RESEARCH QUOTE
      ══════════════════════════════════════ */}
      <section style={{
        ...proseStyle,
        paddingBlock: '5rem',
        borderBottom: '1px solid var(--color-subtle)',
      }}>
        <motion.blockquote
          {...fadeUp(0)}
          style={{
            margin: 0,
            borderLeft: `3px solid ${cs.accent}`,
            background: accentTint,
            padding: '1.5rem 2rem',
            borderRadius: '0 8px 8px 0',
          }}
        >
          <p style={{
            fontFamily: CRIMSON, fontStyle: 'italic', fontSize: '1.2rem',
            fontWeight: 600, letterSpacing: TRACK, lineHeight: 1.65,
            color: FG_PRIMARY, margin: '0 0 1rem 0',
          }}>
            {cs.pullQuote}
          </p>
          <p style={{
            fontFamily: CRIMSON, fontSize: LABEL, fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: FG_MUTED, margin: 0,
          }}>
            — {cs.pullQuoteSource}
          </p>
        </motion.blockquote>
      </section>


      {/* ══════════════════════════════════════
          LAYER 4 — PROBLEM / SOLUTION GRID
      ══════════════════════════════════════ */}
      <section id="cs-diagnosis" style={{
        ...wideStyle,
        paddingBlock: '5rem',
        borderBottom: '1px solid var(--color-subtle)',
      }}>
        <SectionLabel>Diagnosis</SectionLabel>

        {isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {['problems', 'solutions'].map((type) => (
              <div key={type}>
                <h3 style={{ fontFamily: CRIMSON, fontSize: '1.5rem', fontWeight: 700, letterSpacing: TRACK, color: FG_PRIMARY, margin: '0 0 1rem 0' }}>
                  {type === 'problems' ? 'Problem' : 'Solution'}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {cs.diagnosis[type].map((item, i) => (
                    <div key={i} style={{
                      background: type === 'problems' ? 'rgba(200,50,30,0.06)' : 'rgba(0,30,187,0.08)',
                      border: `1px solid ${type === 'problems' ? 'rgba(200,50,30,0.18)' : 'rgba(0,30,187,0.28)'}`,
                      borderRadius: '8px',
                      padding: '1rem 1.25rem',
                    }}>
                      <p style={{ fontFamily: CRIMSON, fontSize: '0.9rem', fontWeight: 700, letterSpacing: TRACK, color: type === 'problems' ? 'rgba(255,110,90,0.95)' : 'rgba(100,130,255,0.95)', margin: '0 0 4px 0', lineHeight: 1.3 }}>{item.title}</p>
                      <p style={{ fontFamily: ITIM, fontSize: BODY, letterSpacing: TRACK, lineHeight: 1.55, color: FG_PRIMARY, opacity: 0.75, margin: 0 }}>{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 1fr', alignItems: 'start' }}>
            <div>
              <h3 style={{ fontFamily: CRIMSON, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 700, letterSpacing: TRACK, color: FG_PRIMARY, margin: '0 0 1rem 0' }}>
                Problem
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {cs.diagnosis.problems.map((item, i) => (
                  <motion.div key={i} {...fadeUp(i * 0.06)} style={{ background: 'rgba(200,50,30,0.06)', border: '1px solid rgba(200,50,30,0.18)', borderRadius: '8px', padding: '1rem 1.25rem' }}>
                    <p style={{ fontFamily: CRIMSON, fontSize: '0.9rem', fontWeight: 700, letterSpacing: TRACK, color: 'rgba(255,110,90,0.95)', margin: '0 0 4px 0', lineHeight: 1.3 }}>{item.title}</p>
                    <p style={{ fontFamily: ITIM, fontSize: BODY, letterSpacing: TRACK, lineHeight: 1.6, color: FG_PRIMARY, opacity: 0.75, margin: 0 }}>{item.body}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch', position: 'relative' }}>
              <div style={{ width: '1px', position: 'absolute', top: 0, bottom: 0, background: 'var(--color-subtle)' }} />
              <span style={{ position: 'relative', zIndex: 1, fontFamily: ARIAL, fontSize: '1rem', color: FG_MUTED, background: 'var(--color-bg)', padding: '6px 0', userSelect: 'none' }}>→</span>
            </div>

            <div>
              <h3 style={{ fontFamily: CRIMSON, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 700, letterSpacing: TRACK, color: FG_PRIMARY, margin: '0 0 1rem 0' }}>
                Solution
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {cs.diagnosis.solutions.map((item, i) => (
                  <motion.div key={i} {...fadeUp(i * 0.06)} style={{ background: 'rgba(0,30,187,0.08)', border: '1px solid rgba(0,30,187,0.28)', borderRadius: '8px', padding: '1rem 1.25rem' }}>
                    <p style={{ fontFamily: CRIMSON, fontSize: '0.9rem', fontWeight: 700, letterSpacing: TRACK, color: 'rgba(100,130,255,0.95)', margin: '0 0 4px 0', lineHeight: 1.3 }}>{item.title}</p>
                    <p style={{ fontFamily: ITIM, fontSize: BODY, letterSpacing: TRACK, lineHeight: 1.6, color: FG_PRIMARY, opacity: 0.75, margin: 0 }}>{item.body}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        <motion.div
          {...fadeUp(0.3)}
          style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-subtle)', display: 'flex', flexDirection: 'column', gap: '6px' }}
        >
          <p style={{ fontFamily: CRIMSON, fontSize: LABEL, fontWeight: 400, letterSpacing: '0.06em', color: FG_MUTED, margin: 0 }}>{cs.diagnosis.collaborativeCredit}</p>
          <p style={{ fontFamily: CRIMSON, fontSize: LABEL, fontWeight: 400, letterSpacing: '0.06em', color: FG_MUTED, margin: 0, opacity: 0.7 }}>{cs.diagnosis.contribution}</p>
        </motion.div>
      </section>


      {/* ══════════════════════════════════════
          LAYER 4.5 — REBOOT SOLUTION SHOWCASE
      ══════════════════════════════════════ */}
      <section id="cs-solution" style={{
        paddingBlock: '5rem',
        borderBottom: '1px solid var(--color-subtle)',
      }}>
        <div style={{ ...wideStyle }}>
          <SectionLabel accent={cs.accent}>The solution — Reboot</SectionLabel>

          {/* Brand hero banner */}
          <motion.div {...fadeUp(0)} style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '12px' }}>
            <img
              src="/images/projects/getlini/Reboot.png"
              alt="Reboot — hybrid exchange and repair service"
              style={{ width: '100%', display: 'block' }}
            />
          </motion.div>

          {/* Solution journey (full width) */}
          <motion.div {...fadeUp(0.06)} style={{ borderRadius: '8px', overflow: 'hidden', marginBottom: '12px' }}>
            <img
              src="/images/projects/getlini/Solution journey.png"
              alt="Reboot service user journey"
              style={{ width: '100%', display: 'block' }}
            />
          </motion.div>

          {/* 4-part solution breakdown (full width) */}
          <motion.div {...fadeUp(0.1)} style={{ borderRadius: '8px', overflow: 'hidden', marginBottom: '12px' }}>
            <img
              src="/images/projects/getlini/4-parts of the solution.png"
              alt="The four pillars of Reboot"
              style={{ width: '100%', display: 'block' }}
            />
          </motion.div>

          {/* Campaign poster trio */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '12px',
          }}>
            <motion.div {...fadeUp(0.14)} style={{ borderRadius: '8px', overflow: 'hidden' }}>
              <img
                src="/images/projects/getlini/repair as an act of love.png"
                alt="Repair is an act of love — campaign poster"
                style={{ width: '100%', display: 'block' }}
              />
            </motion.div>
            <motion.div {...fadeUp(0.17)} style={{ borderRadius: '8px', overflow: 'hidden' }}>
              <img
                src="/images/projects/getlini/community as glue.png"
                alt="Community as glue — campaign poster"
                style={{ width: '100%', display: 'block' }}
              />
            </motion.div>
            <motion.div {...fadeUp(0.20)} style={{ borderRadius: '8px', overflow: 'hidden' }}>
              <img
                src="/images/projects/getlini/swap before you shop.png"
                alt="Swap before you shop — campaign poster"
                style={{ width: '100%', display: 'block' }}
              />
            </motion.div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          LAYER 5 — RESEARCH STATISTICS
      ══════════════════════════════════════ */}
      <section id="cs-research" style={{
        ...wideStyle,
        paddingBlock: '5rem',
        borderBottom: '1px solid var(--color-subtle)',
      }}>
        <SectionLabel>Research findings</SectionLabel>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: '1px',
          background: 'var(--color-subtle)',
        }}>
          {cs.stats.map((stat, i) => (
            <motion.div key={i} {...fadeUp(i * 0.08)} style={{ background: 'var(--color-bg)', padding: '1.75rem 1.5rem' }}>
              <p style={{ fontFamily: CRIMSON, fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.02em', color: cs.accent, margin: '0 0 10px 0', lineHeight: 1 }}>
                {stat.value}
              </p>
              <p style={{ fontFamily: ARIAL, fontSize: BODY, letterSpacing: TRACK, lineHeight: 1.5, color: FG_MUTED, margin: 0 }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
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
        <SectionLabel>Key outcomes</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {cs.outcomes.stats.map((stat, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.08)}
                style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', paddingBlock: '1.75rem', borderBottom: '1px solid var(--color-subtle)' }}
              >
                <p style={{ fontFamily: CRIMSON, fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1, color: FG_PRIMARY, margin: 0, minWidth: '72px', flexShrink: 0 }}>
                  {stat.value}
                </p>
                <p style={{ fontFamily: ARIAL, fontSize: BODY, letterSpacing: TRACK, lineHeight: 1.55, color: FG_MUTED, margin: 0 }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
          <motion.div
            {...fadeUp(0.12)}
            style={{
              display: 'flex', flexDirection: 'column', gap: '1.25rem',
              paddingLeft: isMobile ? 0 : '3rem',
              paddingTop: isMobile ? '2.5rem' : 0,
              borderLeft: isMobile ? 'none' : '1px solid var(--color-subtle)',
              borderTop: isMobile ? '1px solid var(--color-subtle)' : 'none',
            }}
          >
            {cs.outcomes.narrative.map((para, i) => (
              <p key={i} style={{ fontFamily: ITIM, fontSize: BODY_LG, letterSpacing: TRACK, lineHeight: 1.75, color: FG_PRIMARY, opacity: i === 0 ? 0.9 : 0.7, margin: 0 }}>
                {para}
              </p>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          LAYER 7 — PRESENTATION PHOTO
      ══════════════════════════════════════ */}
      <section style={{ ...mediaStyle, paddingBlock: '3rem', borderBottom: '1px solid var(--color-subtle)' }}>
        <SectionLabel>Presenting to the client</SectionLabel>
        <motion.div {...fadeUp(0)} style={{ borderRadius: '8px', overflow: 'hidden' }}>
          <img
            src="/images/projects/getlini/Presentation-to-client.JPG"
            alt="Presenting Reboot to Getliņi"
            style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: '520px' }}
          />
        </motion.div>
      </section>


      {/* ══════════════════════════════════════
          CTA — READ THE THINKING
      ══════════════════════════════════════ */}
      {!thinkingOpen && (
        <section style={{
          ...proseStyle,
          paddingBlock: '5rem',
          borderTop: '1px solid var(--color-subtle)',
        }}>
          <motion.div {...fadeUp(0)}>
            <p style={{
              fontFamily: CRIMSON,
              fontSize: LABEL,
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: FG_MUTED,
              margin: '0 0 1.25rem 0',
            }}>
              Behind the design
            </p>
            <button
              onClick={() => {
                setThinkingOpen(true)
                setTimeout(() => thinkingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontFamily: CRIMSON,
                fontStyle: 'italic',
                fontSize: isMobile ? '1.6rem' : '2rem',
                fontWeight: 700,
                letterSpacing: TRACK,
                color: FG_PRIMARY,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                lineHeight: 1.2,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = 0.7}
              onMouseLeave={e => e.currentTarget.style.opacity = 1}
            >
              Read the thinking behind it
              <span style={{ color: cs.accent, fontStyle: 'normal', fontSize: '1.4rem' }}>→</span>
            </button>
          </motion.div>
        </section>
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
                    fontFamily: CRIMSON,
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
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
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
        <p style={{ fontFamily: ARIAL, fontSize: BODY, fontWeight: 700, letterSpacing: TRACK, color: FG_PRIMARY, margin: 0 }}>
          Vishvak Rajendran
        </p>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <motion.button
            onClick={() => navigate('/work')}
            whileHover={{ x: -3 }}
            transition={{ duration: 0.2 }}
            style={{ fontFamily: CRIMSON, fontSize: LABEL, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: FG_MUTED, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            ← All work
          </motion.button>
          <a href="mailto:hello@vishvak.com" style={{ fontFamily: CRIMSON, fontSize: LABEL, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: cs.accent, textDecoration: 'none' }}>
            Get in touch →
          </a>
        </div>
      </section>

    </main>
  )
}

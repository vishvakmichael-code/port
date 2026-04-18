import { useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { caseStudies } from '../data/case-studies'
import { useIsMobile } from '../hooks/useMediaQuery'

const ARIAL = "'Arial', sans-serif"
const MONO  = 'var(--font-mono)'
const SERIF = 'var(--font-serif)'
const ITIM  = 'var(--font-itim)'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
})

const TABS = ['Decisions', 'Challenges', 'Process']

// ─── sub-components ────────────────────────────────────────────────────────

function MetaCell({ label, value }) {
  return (
    <div>
      <p style={{
        fontFamily: MONO,
        fontSize: '0.62rem',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: 'var(--color-muted)',
        margin: '0 0 5px 0',
      }}>
        {label}
      </p>
      <p style={{
        fontFamily: ARIAL,
        fontSize: 'var(--t-body)',
        fontWeight: 500,
        color: 'var(--color-fg)',
        margin: 0,
        lineHeight: 1.3,
      }}>
        {value}
      </p>
    </div>
  )
}

function SectionLabel({ children, accent }) {
  return (
    <p style={{
      fontFamily: MONO,
      fontSize: '0.62rem',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: accent || 'var(--color-muted)',
      margin: '0 0 var(--space-3) 0',
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
          {...fadeUp(i * 0.1)}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '3rem 1fr' : '3rem 1fr 1fr',
            gap: '2rem',
            paddingBlock: '2.5rem',
            borderBottom: '1px solid var(--color-subtle)',
            alignItems: 'start',
          }}
        >
          {/* Column 1 — large background number */}
          <div style={{
            fontFamily: SERIF,
            fontSize: '3rem',
            fontWeight: 900,
            color: accent,
            opacity: 0.08,
            lineHeight: 1,
            userSelect: 'none',
            paddingTop: '2px',
          }}>
            {d.number}
          </div>

          {/* Column 2 — decision content */}
          <div>
            <p style={{
              fontFamily: MONO,
              fontSize: '0.62rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-muted)',
              margin: '0 0 var(--space-3) 0',
            }}>
              Decision {d.number}
            </p>
            <h3 style={{
              fontFamily: SERIF,
              fontSize: '1.3rem',
              fontWeight: 700,
              color: 'var(--color-fg)',
              margin: '0 0 var(--space-4) 0',
              lineHeight: 1.2,
            }}>
              {d.title}
            </h3>
            <p style={{
              fontFamily: ITIM,
              fontSize: '0.97rem',
              lineHeight: 'var(--leading-relaxed)',
              color: 'var(--color-fg)',
              margin: 0,
            }}>
              {d.body}
            </p>
          </div>

          {/* Column 3 — artifact placeholder (hides on mobile) */}
          {!isMobile && (
            <div style={{
              aspectRatio: '4 / 3',
              background: 'var(--color-bg-3)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {d.artifact && (
                <p style={{
                  fontFamily: MONO,
                  fontSize: '0.62rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-muted)',
                  margin: 0,
                  textAlign: 'center',
                  padding: 'var(--space-4)',
                }}>
                  {d.artifact}
                </p>
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
      {/* 2×2 grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '3rem',
        marginBottom: 'var(--space-8)',
      }}>
        {challenges.map((c, i) => (
          <motion.div key={i} {...fadeUp(i * 0.08)}>
            <p style={{
              fontFamily: MONO,
              fontSize: '0.62rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(245,245,245,0.35)',
              margin: '0 0 var(--space-2) 0',
            }}>
              {c.number}
            </p>
            <h4 style={{
              fontFamily: SERIF,
              fontSize: 'clamp(1.1rem, 1.8vw, 1.375rem)',
              fontWeight: 700,
              color: '#F5F5F5',
              margin: '0 0 var(--space-3) 0',
              lineHeight: 1.25,
            }}>
              {c.title}
            </h4>
            <p style={{
              fontFamily: ITIM,
              fontSize: '0.88rem',
              lineHeight: 'var(--leading-relaxed)',
              color: 'rgba(245,245,245,0.6)',
              margin: 0,
            }}>
              {c.body}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Personal reflection — full width, spans both columns */}
      {challengeReflection && (
        <motion.div
          {...fadeUp(0.3)}
          style={{
            paddingTop: 'var(--space-8)',
            borderTop: '1px solid rgba(245,245,245,0.1)',
          }}
        >
          <p style={{
            fontFamily: MONO,
            fontSize: '0.62rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(245,245,245,0.35)',
            margin: '0 0 var(--space-4) 0',
          }}>
            Personal reflection
          </p>
          <p style={{
            fontFamily: SERIF,
            fontStyle: 'italic',
            fontSize: '1.15rem',
            lineHeight: 'var(--leading-relaxed)',
            color: 'rgba(245,245,245,0.8)',
            margin: 0,
            maxWidth: '720px',
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
    <div>
      {/* Horizontal timeline */}
      <div style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        marginBottom: '2.5rem',
        rowGap: isMobile ? 'var(--space-8)' : 0,
      }}>
        {/* Connecting line behind dots (desktop only) */}
        {!isMobile && (
          <div style={{
            position: 'absolute',
            top: '1.5rem',
            left: '10%',
            right: '10%',
            height: '1px',
            background: 'var(--color-subtle)',
            zIndex: 0,
          }} />
        )}

        {process.map((p, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              paddingInline: 'var(--space-2)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Bordered circle dot */}
            <div style={{
              width: '3rem',
              height: '3rem',
              borderRadius: '50%',
              border: '1px solid var(--color-subtle)',
              background: 'var(--color-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 'var(--space-3)',
              flexShrink: 0,
            }}>
              <span style={{
                fontFamily: MONO,
                fontSize: '0.62rem',
                textTransform: 'uppercase',
                color: 'var(--color-muted)',
              }}>
                {p.number}
              </span>
            </div>
            <p style={{
              fontFamily: ARIAL,
              fontSize: 'clamp(14px, 1.6vw, 18px)',
              fontWeight: 700,
              color: 'var(--color-fg)',
              margin: '0 0 4px 0',
            }}>
              {p.stage}
            </p>
            <p style={{
              fontFamily: ITIM,
              fontSize: '0.88rem',
              color: 'var(--color-muted)',
              margin: 0,
              lineHeight: 1.5,
            }}>
              {p.oneLiner}
            </p>
          </div>
        ))}
      </div>

      {/* Detail grid — 1px gap separator technique */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        gap: '1px',
        background: 'var(--color-subtle)',
      }}>
        {process.map((p, i) => (
          <motion.div
            key={i}
            {...fadeUp(i * 0.08)}
            style={{
              background: 'var(--color-bg)',
              padding: '1.5rem',
            }}
          >
            <p style={{
              fontFamily: MONO,
              fontSize: '0.62rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: accent,
              margin: '0 0 var(--space-3) 0',
            }}>
              {p.stage}
            </p>
            <p style={{
              fontFamily: ITIM,
              fontSize: '0.88rem',
              lineHeight: 'var(--leading-relaxed)',
              color: 'var(--color-fg)',
              margin: 0,
            }}>
              {p.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─── main component ────────────────────────────────────────────────────────

export default function CaseStudy() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const cs = caseStudies[slug]

  const [thinkingOpen, setThinkingOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const thinkingRef = useRef(null)

  if (!cs) return (
    <main style={{ padding: 'var(--section-padding-top) var(--page-padding-x)', paddingTop: 'var(--nav-height)' }}>
      <p>Case study not found.</p>
      <button onClick={() => navigate('/work')}>← Back to work</button>
    </main>
  )

  const handleReadMore = () => {
    setThinkingOpen(true)
    setTimeout(() => {
      thinkingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
  }

  const PX = isMobile ? '1.5rem' : '3rem'
  const innerStyle = {
    maxWidth: '1100px',
    marginInline: 'auto',
    paddingInline: PX,
  }

  // ~5% opacity accent tint for quote background
  const accentTint = `${cs.accent}0d`

  return (
    <main
      data-case-study={cs.slug}
      style={{
        background: 'var(--color-bg)',
        backgroundImage: `
          linear-gradient(var(--grid-line) 1px, transparent 1px),
          linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        paddingTop: 'var(--nav-height)',
      }}
    >

      {/* ══════════════════════════════════════
          LAYER 1 — PAGE HEADER
      ══════════════════════════════════════ */}
      <section style={{
        ...innerStyle,
        paddingTop: 'var(--space-6)',
        paddingBottom: 'var(--space-8)',
        borderBottom: '1px solid var(--color-subtle)',
      }}>

        {/* Back nav */}
        <motion.button
          {...fadeUp(0)}
          onClick={() => navigate('/work')}
          whileHover={{ x: -3 }}
          transition={{ duration: 0.2 }}
          style={{
            fontFamily: MONO,
            fontSize: '0.62rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-muted)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: 0,
            marginBottom: 'var(--space-5)',
          }}
        >
          ← Work
        </motion.button>

        {/* Category tags */}
        <motion.div
          {...fadeUp(0.04)}
          style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: 'var(--space-5)' }}
        >
          {cs.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: MONO,
                fontSize: '0.62rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: cs.accent,
                padding: '3px 10px',
                border: `1px solid ${cs.accent}`,
                borderRadius: 'var(--radius-pill)',
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Large display title */}
        <motion.h1
          {...fadeUp(0.06)}
          style={{
            fontFamily: ARIAL,
            fontSize: 'clamp(3rem, 6vw, 5.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            lineHeight: 0.92,
            color: 'var(--color-fg)',
            margin: '0 0 var(--space-8) 0',
          }}
        >
          {cs.title}
        </motion.h1>

        {/* Meta row — top border separator */}
        <motion.div
          {...fadeUp(0.1)}
          style={{
            paddingTop: 'var(--space-5)',
            borderTop: '1px solid var(--color-subtle)',
            display: 'flex',
            gap: '3rem',
            flexWrap: 'wrap',
          }}
        >
          <MetaCell label="Client" value={cs.meta.client} />
          <MetaCell label="Year" value={cs.meta.year} />
          <MetaCell label="Team size" value={cs.meta.teamSize} />
          <MetaCell label="My role" value={cs.meta.role} />
          <MetaCell label="Status" value={cs.meta.status} />
        </motion.div>
      </section>


      {/* ══════════════════════════════════════
          LAYER 2 — CHALLENGE + OPPORTUNITY
      ══════════════════════════════════════ */}
      <section style={{
        ...innerStyle,
        paddingBlock: 'var(--space-10)',
        borderBottom: '1px solid var(--color-subtle)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 'var(--space-10)' : '4rem',
          alignItems: 'start',
        }}>

          {/* Challenge */}
          <div>
            <motion.div {...fadeUp(0)} style={{ marginBottom: 'var(--space-4)' }}>
              <SectionLabel>The Challenge</SectionLabel>
            </motion.div>
            {cs.challenge.map((para, i) => (
              <motion.p
                key={i}
                {...fadeUp(0.06 + i * 0.05)}
                style={{
                  fontFamily: ITIM,
                  fontSize: '0.97rem',
                  lineHeight: 'var(--leading-relaxed)',
                  color: 'var(--color-fg)',
                  maxWidth: '62ch',
                  margin: i < cs.challenge.length - 1 ? '0 0 var(--space-4) 0' : 0,
                }}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Opportunity */}
          <div>
            <motion.div {...fadeUp(0.05)} style={{ marginBottom: 'var(--space-4)' }}>
              <SectionLabel>The Opportunity</SectionLabel>
            </motion.div>
            {cs.opportunity.map((para, i) => (
              <motion.p
                key={i}
                {...fadeUp(0.1 + i * 0.05)}
                style={{
                  fontFamily: ITIM,
                  fontSize: '0.97rem',
                  lineHeight: 'var(--leading-relaxed)',
                  color: 'var(--color-fg)',
                  maxWidth: '62ch',
                  margin: i < cs.opportunity.length - 1 ? '0 0 var(--space-4) 0' : 0,
                }}
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          LAYER 3 — RESEARCH QUOTE
      ══════════════════════════════════════ */}
      <section style={{
        ...innerStyle,
        paddingBlock: 'var(--space-10)',
        borderBottom: '1px solid var(--color-subtle)',
      }}>
        <motion.blockquote
          {...fadeUp(0)}
          style={{
            margin: 0,
            borderLeft: `3px solid ${cs.accent}`,
            background: accentTint,
            padding: '1.5rem 2rem',
          }}
        >
          <p style={{
            fontFamily: SERIF,
            fontStyle: 'italic',
            fontSize: '1.15rem',
            lineHeight: 1.6,
            color: 'var(--color-fg)',
            margin: '0 0 var(--space-3) 0',
          }}>
            {cs.pullQuote}
          </p>
          <p style={{
            fontFamily: MONO,
            fontSize: '0.62rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-muted)',
            margin: 0,
          }}>
            — {cs.pullQuoteSource}
          </p>
        </motion.blockquote>
      </section>


      {/* ══════════════════════════════════════
          LAYER 4 — PROBLEM / SOLUTION GRID
      ══════════════════════════════════════ */}
      <section style={{
        ...innerStyle,
        paddingBlock: 'var(--space-10)',
        borderBottom: '1px solid var(--color-subtle)',
      }}>
        <SectionLabel>Diagnosis</SectionLabel>

        {isMobile ? (
          /* Mobile: stacked columns */
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
            {['problems', 'solutions'].map((type) => (
              <div key={type}>
                <h3 style={{
                  fontFamily: SERIF,
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                  fontWeight: 700,
                  color: 'var(--color-fg)',
                  margin: '0 0 var(--space-4) 0',
                }}>
                  {type === 'problems' ? 'Problem' : 'Solution'}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {cs.diagnosis[type].map((item, i) => (
                    <div key={i} style={{
                      background: type === 'problems' ? '#FADDD8' : '#BEE4E8',
                      borderRadius: 'var(--radius-md)',
                      padding: '1rem 1.25rem',
                    }}>
                      <p style={{ fontFamily: ARIAL, fontSize: '0.82rem', fontWeight: 700, color: '#1a1a1a', margin: '0 0 6px 0', lineHeight: 1.3 }}>
                        {item.title}
                      </p>
                      <p style={{ fontFamily: ITIM, fontSize: '0.82rem', lineHeight: 1.55, color: '#333', margin: 0 }}>
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Desktop: three-column (problems | divider | solutions) */
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 80px 1fr',
            alignItems: 'start',
          }}>
            {/* Problems column */}
            <div>
              <h3 style={{
                fontFamily: SERIF,
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                fontWeight: 700,
                color: 'var(--color-fg)',
                margin: '0 0 var(--space-4) 0',
              }}>
                Problem
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {cs.diagnosis.problems.map((item, i) => (
                  <motion.div
                    key={i}
                    {...fadeUp(i * 0.07)}
                    style={{
                      background: '#FADDD8',
                      borderRadius: 'var(--radius-md)',
                      padding: '1rem 1.25rem',
                    }}
                  >
                    <p style={{ fontFamily: ARIAL, fontSize: '0.82rem', fontWeight: 700, color: '#1a1a1a', margin: '0 0 6px 0', lineHeight: 1.3 }}>
                      {item.title}
                    </p>
                    <p style={{ fontFamily: ITIM, fontSize: '0.82rem', lineHeight: 1.55, color: '#333', margin: 0 }}>
                      {item.body}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Centre divider — vertical line with arrow */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'stretch',
              position: 'relative',
            }}>
              <div style={{
                width: '1px',
                position: 'absolute',
                top: 0,
                bottom: 0,
                background: 'var(--color-subtle)',
              }} />
              <span style={{
                position: 'relative',
                zIndex: 1,
                fontFamily: ARIAL,
                fontSize: '1.1rem',
                color: 'var(--color-muted)',
                background: 'var(--color-bg)',
                padding: '6px 0',
                userSelect: 'none',
              }}>
                →
              </span>
            </div>

            {/* Solutions column */}
            <div>
              <h3 style={{
                fontFamily: SERIF,
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                fontWeight: 700,
                color: 'var(--color-fg)',
                margin: '0 0 var(--space-4) 0',
              }}>
                Solution
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {cs.diagnosis.solutions.map((item, i) => (
                  <motion.div
                    key={i}
                    {...fadeUp(i * 0.07)}
                    style={{
                      background: '#BEE4E8',
                      borderRadius: 'var(--radius-md)',
                      padding: '1rem 1.25rem',
                    }}
                  >
                    <p style={{ fontFamily: ARIAL, fontSize: '0.82rem', fontWeight: 700, color: '#1a1a1a', margin: '0 0 6px 0', lineHeight: 1.3 }}>
                      {item.title}
                    </p>
                    <p style={{ fontFamily: ITIM, fontSize: '0.82rem', lineHeight: 1.55, color: '#333', margin: 0 }}>
                      {item.body}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Collaborative credit */}
        <motion.div
          {...fadeUp(0.3)}
          style={{
            marginTop: 'var(--space-8)',
            paddingTop: 'var(--space-4)',
            borderTop: '1px solid var(--color-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-1)',
          }}
        >
          <p style={{ fontFamily: MONO, fontSize: '0.62rem', letterSpacing: '0.08em', color: 'var(--color-muted)', margin: 0 }}>
            {cs.diagnosis.collaborativeCredit}
          </p>
          <p style={{ fontFamily: MONO, fontSize: '0.62rem', letterSpacing: '0.08em', color: 'var(--color-muted)', margin: 0 }}>
            {cs.diagnosis.contribution}
          </p>
        </motion.div>
      </section>


      {/* ══════════════════════════════════════
          LAYER 5 — RESEARCH STATISTICS
      ══════════════════════════════════════ */}
      <section style={{
        ...innerStyle,
        paddingBlock: 'var(--space-10)',
        borderBottom: '1px solid var(--color-subtle)',
      }}>
        <SectionLabel>Research findings</SectionLabel>

        {/* 1px gap separator technique */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: '1px',
          background: 'var(--color-subtle)',
        }}>
          {cs.stats.map((stat, i) => (
            <motion.div
              key={i}
              {...fadeUp(i * 0.1)}
              style={{
                background: 'var(--color-bg)',
                padding: '1.75rem 1.5rem',
              }}
            >
              <p style={{
                fontFamily: SERIF,
                fontSize: '2.5rem',
                fontWeight: 900,
                color: cs.accent,
                margin: '0 0 var(--space-2) 0',
                lineHeight: 1,
              }}>
                {stat.value}
              </p>
              <p style={{
                fontFamily: ARIAL,
                fontSize: '0.88rem',
                lineHeight: 1.5,
                color: 'var(--color-muted)',
                margin: 0,
              }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>


      {/* ══════════════════════════════════════
          LAYER 6 — KEY OUTCOMES
      ══════════════════════════════════════ */}
      <section style={{
        ...innerStyle,
        paddingBlock: 'var(--space-10)',
        borderBottom: '1px solid var(--color-subtle)',
      }}>
        <SectionLabel>Key outcomes</SectionLabel>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          alignItems: 'start',
        }}>

          {/* Left — outcome stat rows */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {cs.outcomes.stats.map((stat, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-5)',
                  paddingBlock: 'var(--space-7)',
                  borderBottom: '1px solid var(--color-subtle)',
                }}
              >
                <p style={{
                  fontFamily: SERIF,
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  lineHeight: 1,
                  color: 'var(--color-fg)',
                  margin: 0,
                  minWidth: '80px',
                  flexShrink: 0,
                }}>
                  {stat.value}
                </p>
                <p style={{
                  fontFamily: ARIAL,
                  fontSize: '0.88rem',
                  lineHeight: 1.55,
                  color: 'var(--color-muted)',
                  margin: 0,
                }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right — narrative, separated by left border */}
          <motion.div
            {...fadeUp(0.15)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-5)',
              paddingLeft: isMobile ? 0 : '3rem',
              paddingTop: isMobile ? 'var(--space-8)' : 0,
              borderLeft: isMobile ? 'none' : '1px solid var(--color-subtle)',
              borderTop: isMobile ? '1px solid var(--color-subtle)' : 'none',
            }}
          >
            {cs.outcomes.narrative.map((para, i) => (
              <p key={i} style={{
                fontFamily: ITIM,
                fontSize: '0.97rem',
                lineHeight: 'var(--leading-relaxed)',
                color: 'var(--color-fg)',
                margin: 0,
              }}>
                {para}
              </p>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          LAYER 7 — CTA
      ══════════════════════════════════════ */}
      {!thinkingOpen && (
        <section style={{
          ...innerStyle,
          paddingBlock: '4rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-4)',
        }}>
          <motion.p
            {...fadeUp(0)}
            style={{
              fontFamily: MONO,
              fontSize: '0.62rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-muted)',
              margin: 0,
            }}
          >
            Want to go deeper?
          </motion.p>
          <motion.button
            {...fadeUp(0.06)}
            onClick={handleReadMore}
            whileHover={{ opacity: 0.8 }}
            transition={{ duration: 0.25 }}
            style={{
              fontFamily: MONO,
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--color-bg)',
              background: 'var(--color-fg)',
              border: 'none',
              borderRadius: 'var(--radius-pill)',
              padding: '14px 40px',
              cursor: 'pointer',
            }}
          >
            Read the thinking behind it ↓
          </motion.button>
        </section>
      )}


      {/* ══════════════════════════════════════
          LAYER 8 — EXPANDABLE THINKING
      ══════════════════════════════════════ */}
      <AnimatePresence>
        {thinkingOpen && (
          <motion.section
            ref={thinkingRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
              <div style={{ ...innerStyle, paddingBlock: 0 }}>
                <div style={{ display: 'flex', gap: 0 }}>
                  {TABS.map((tab, i) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(i)}
                      style={{
                        fontFamily: MONO,
                        fontSize: '0.62rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: activeTab === i ? 'var(--color-fg)' : 'var(--color-muted)',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === i
                          ? `2px solid ${cs.accent}`
                          : '2px solid transparent',
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
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              >
                {activeTab === 0 && (
                  <div style={{ ...innerStyle, paddingBlock: 'var(--space-10)' }}>
                    <DecisionsTab
                      decisions={cs.decisions}
                      accent={cs.accent}
                      isMobile={isMobile}
                    />
                  </div>
                )}

                {activeTab === 1 && (
                  /* Full viewport-width dark background */
                  <div style={{ background: '#111111', width: '100%' }}>
                    <div style={{ ...innerStyle, paddingBlock: 'var(--space-10)' }}>
                      <ChallengesTab
                        challenges={cs.challenges}
                        challengeReflection={cs.challengeReflection}
                      />
                    </div>
                  </div>
                )}

                {activeTab === 2 && (
                  <div style={{ ...innerStyle, paddingBlock: 'var(--space-10)' }}>
                    <ProcessTab
                      process={cs.process}
                      accent={cs.accent}
                      isMobile={isMobile}
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.section>
        )}
      </AnimatePresence>


      {/* ══════════════════════════════════════
          LAYER 9 — CLOSING FOOTER
      ══════════════════════════════════════ */}
      <section style={{
        ...innerStyle,
        paddingBlock: 'var(--space-10)',
        borderTop: '1px solid var(--color-subtle)',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'center',
        gap: 'var(--space-6)',
      }}>
        <p style={{
          fontFamily: ARIAL,
          fontSize: 'clamp(16px, 2vw, 22px)',
          fontWeight: 700,
          color: 'var(--color-fg)',
          margin: 0,
          letterSpacing: '-0.01em',
        }}>
          Vishvak Rajendran
        </p>

        <div style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'center' }}>
          <motion.button
            onClick={() => navigate('/work')}
            whileHover={{ x: -3 }}
            transition={{ duration: 0.2 }}
            style={{
              fontFamily: MONO,
              fontSize: '0.62rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-muted)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            ← All work
          </motion.button>
          <a
            href="mailto:hello@vishvak.com"
            style={{
              fontFamily: MONO,
              fontSize: '0.62rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: cs.accent,
              textDecoration: 'none',
            }}
          >
            Get in touch →
          </a>
        </div>
      </section>

    </main>
  )
}

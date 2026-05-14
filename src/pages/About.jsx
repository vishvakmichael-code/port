import { useState } from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useMediaQuery'
import { trajectory } from '../data/about-data'

const DM_SANS = "'DM Sans', sans-serif"

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function About() {
  const isMobile = useIsMobile()
  const [linkHovered, setLinkHovered] = useState(false)
  const [hoveredDot, setHoveredDot] = useState(null)

  const chronological = [...trajectory].reverse()

  return (
    <main style={{ background: 'var(--color-bg)', paddingTop: 'var(--nav-height)' }}>

      {/* PAGE HEADER */}
      <section style={{
        paddingTop: 'var(--section-padding-top)',
        paddingBottom: 'var(--space-8)',
        paddingInline: isMobile ? '24px' : '3rem',
        borderBottom: '1px solid var(--color-subtle)',
      }}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: DM_SANS,
            fontSize: '32px',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            color: '#1a1a6e',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          About
        </motion.h1>
      </section>

      {/* HERO — THREE COLUMN */}
      <section style={{
        paddingBlock: '5rem',
        paddingInline: isMobile ? '24px' : '3rem',
        maxWidth: '1100px',
        marginInline: 'auto',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '25% 45% 30%',
          gap: isMobile ? '2rem' : '0',
          alignItems: 'flex-start',
        }}>

          {/* Col 1 — Portrait */}
          <motion.div {...fadeUp(0.05)}>
            <img
              src="/images/about/profile2.jpg"
              alt="Vishvak Rajendran"
              style={{
                width: '100%',
                aspectRatio: '3 / 4',
                objectFit: 'cover',
                objectPosition: 'top center',
                borderRadius: '6px',
                display: 'block',
              }}
            />
          </motion.div>

          {/* Col 2 — Bio */}
          <motion.div
            {...fadeUp(0.1)}
            style={{ padding: isMobile ? 0 : '0 40px' }}
          >
            <p style={{
              fontFamily: DM_SANS,
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#888888',
              margin: '0 0 16px 0',
            }}>
              Service Designer &amp; Facilitator
            </p>

            <p style={{
              fontFamily: DM_SANS,
              fontSize: '20px',
              fontWeight: 500,
              color: '#1a1a6e',
              lineHeight: 1.5,
              margin: '0 0 24px 0',
            }}>
              I am a service designer and facilitator. I have always needed to get inside something before I could say anything useful about it. Service design gave that instinct a methodology.
            </p>

            <p style={{
              fontFamily: DM_SANS,
              fontSize: '15px',
              color: '#333333',
              lineHeight: 1.7,
              margin: '0 0 24px 0',
            }}>
              I never knew service design was a thing before I found it. When I did, I realised I had been doing it my whole life without a name for it. As a kid I was always taking things apart to see how they worked. Asking why until people got tired of answering. My parents included. I tried everything, sports, art, competitions, physics, not because I had a plan but because I needed to get inside something before I could say anything useful about it. I ended up in marketing, then education, then training. Partly because I love talking to people. Partly because figuring out what someone actually needs, not what they say they need, kept pulling me in. Service design gave a name to something I had already been doing.
            </p>

            <p style={{
              fontFamily: DM_SANS,
              fontSize: '15px',
              color: '#888888',
              fontStyle: 'italic',
              lineHeight: 1.7,
              margin: '0 0 32px 0',
            }}>
              Sometimes I slow down by sketching. It keeps something loose that design work tends to tighten.
            </p>

            <a
              href="https://www.linkedin.com/in/vishvak-rajendran"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setLinkHovered(true)}
              onMouseLeave={() => setLinkHovered(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: DM_SANS,
                fontSize: '13px',
                fontWeight: 500,
                color: '#1a1a6e',
                textDecoration: 'none',
                borderBottom: linkHovered ? '1px solid #1a1a6e' : '1px solid transparent',
                transition: 'border-color 0.2s ease',
                cursor: 'pointer',
                marginTop: '8px',
                paddingBottom: '2px',
              }}
            >
              <i className="ti ti-brand-linkedin" style={{ fontSize: '16px', lineHeight: 1 }} />
              Connect with me on LinkedIn
            </a>
          </motion.div>

          {/* Col 3 — Landscape photo */}
          <motion.div {...fadeUp(0.15)}>
            <img
              src="/images/about/profile.JPG"
              alt="Vishvak Rajendran"
              style={{
                width: '100%',
                aspectRatio: '16 / 9',
                objectFit: 'cover',
                objectPosition: 'top center',
                borderRadius: '6px',
                display: 'block',
              }}
            />
          </motion.div>

        </div>
      </section>

      {/* TRAJECTORY */}
      <section style={{
        paddingBlock: '5rem',
        paddingInline: isMobile ? '24px' : '3rem',
        maxWidth: '1100px',
        marginInline: 'auto',
        borderTop: '1px solid var(--color-subtle)',
      }}>
        {/* Section label */}
        <p style={{
          fontFamily: DM_SANS,
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#888888',
          margin: '0 0 40px 0',
        }}>
          Trajectory
        </p>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {chronological.map((item, i) => (
            <motion.div
              key={i}
              {...fadeUp(i * 0.06)}
              style={{
                display: 'flex',
                gap: '0',
              }}
            >
              {/* Left column — dot + line */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '20px',
                flexShrink: 0,
              }}>
                <div
                  onMouseEnter={() => setHoveredDot(i)}
                  onMouseLeave={() => setHoveredDot(null)}
                  style={{
                    width: hoveredDot === i ? '10px' : '6px',
                    height: hoveredDot === i ? '10px' : '6px',
                    borderRadius: '50%',
                    background: '#1a1a6e',
                    flexShrink: 0,
                    marginTop: '8px',
                    transition: 'width 0.2s ease, height 0.2s ease',
                    cursor: 'default',
                  }}
                />
                {i < chronological.length - 1 && (
                  <div style={{
                    width: '1px',
                    flex: 1,
                    background: '#eeeeee',
                    marginTop: '8px',
                  }} />
                )}
              </div>

              {/* Right column — content */}
              <div style={{
                flex: 1,
                paddingLeft: '28px',
                paddingBottom: i < chronological.length - 1 ? '64px' : 0,
              }}>
                <p style={{
                  fontFamily: DM_SANS,
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#888888',
                  margin: 0,
                }}>
                  {item.year}
                </p>
                <p style={{
                  fontFamily: DM_SANS,
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#1a1a6e',
                  margin: '4px 0 0 0',
                  lineHeight: 1.4,
                }}>
                  {item.title}
                </p>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    display: 'block',
                    width: '100%',
                    maxWidth: '320px',
                    borderRadius: '6px',
                    objectFit: 'cover',
                    marginTop: '16px',
                  }}
                />
                <p style={{
                  fontFamily: DM_SANS,
                  fontSize: '14px',
                  color: '#333333',
                  lineHeight: 1.6,
                  margin: '12px 0 0 0',
                  maxWidth: '420px',
                }}>
                  {item.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </main>
  )
}

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { disciplines } from '../../data/disciplines'
import { useIsTouch } from '../../hooks/useMediaQuery'

function HighlightedText({ text, highlight }) {
  if (!highlight || !text.includes(highlight)) return text
  const [before, after] = text.split(highlight)
  return (
    <>
      {before}
      <span style={{
        background: 'var(--color-primary)',
        color: '#000000',
        padding: '2px 10px 4px',
        borderRadius: '4px',
        display: 'inline',
      }}>
        {highlight}
      </span>
      {after}
    </>
  )
}

function SkillItem({ item }) {
  const ref = useRef(null)
  const isTouch = useIsTouch()

  const isInView = useInView(ref, {
    once: false,
    margin: '-15% 0px -15% 0px',
  })

  const isLeft      = item.textAlign === 'left'
  const slideOffset = isTouch
    ? (item.slideFrom === 'right' ? '60px' : '-60px')
    : (item.slideFrom === 'right' ? '120px' : '-120px')

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        padding: 'var(--space-12) 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isLeft ? 'flex-start' : 'flex-end',
        overflow: 'hidden',
        minHeight: '180px',
      }}
    >
      {/* Background illustration — covers full row */}
      {item.backgroundIllustration && (
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          overflow: 'hidden',
        }}>
          <img
            src={item.backgroundIllustration.src}
            alt=""
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: item.backgroundIllustration.opacity ?? 0.15,
            }}
          />
        </div>
      )}

      {/* Left-side illustration */}
      {!isTouch && item.illustration.position === 'left' && (
        <div style={{
          position: 'absolute',
          left: 'var(--page-padding-x)',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}>
          <img
            src={item.illustration.src}
            alt=""
            style={{
              width: item.illustration.size + 'px',
              height: item.illustration.size + 'px',
              objectFit: 'contain',
              filter: item.illustration.filter,
            }}
          />
        </div>
      )}

      {/* Text — slides in/out with scroll */}
      <motion.h3
        animate={{
          x: isInView ? 0 : slideOffset,
          opacity: isInView ? 1 : 0,
        }}
        transition={{
          x:       { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 0.5, ease: 'easeOut' },
        }}
        style={{
          position: 'relative',
          zIndex: 2,
          fontFamily: 'var(--font-itim)',
          fontSize: isTouch ? 'clamp(24px, 5vw, 32px)' : '35px',
          fontWeight: 700,
          letterSpacing: 'var(--tracking-heading)',
          lineHeight: 1.3,
          color: 'var(--color-fg)',
          margin: 0,
          maxWidth: '65%',
          textAlign: isTouch ? 'left' : (isLeft ? 'left' : 'right'),
          paddingLeft:  isLeft ? 'var(--page-padding-x)' : '0',
          paddingRight: isLeft ? '0' : 'var(--page-padding-x)',
        }}
      >
        <HighlightedText text={item.text} highlight={item.highlight} />
      </motion.h3>

      {/* Right-side illustration */}
      {!isTouch && item.illustration.position === 'right' && (
        <div style={{
          position: 'absolute',
          right: 'var(--page-padding-x)',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}>
          <img
            src={item.illustration.src}
            alt=""
            style={{
              width: item.illustration.size + 'px',
              height: item.illustration.size + 'px',
              objectFit: 'contain',
              filter: item.illustration.filter,
            }}
          />
        </div>
      )}
    </div>
  )
}

export default function WhatIDo() {
  return (
    <section
      id="sec-skills"
      style={{
        background: 'var(--color-bg)',
        paddingTop: 'var(--section-padding-top)',
        paddingBottom: 'var(--section-padding-bottom)',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden',
      }}
    >
      <motion.h2
        className="section-heading"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          paddingInline: 'var(--page-padding-x)',
          marginBottom: 'var(--space-6)',
          fontFamily: 'var(--font-itim)',
          color: 'var(--color-primary)',
        }}
      >
        Oh and I am really good at these
      </motion.h2>

      {disciplines.map((item) => (
        <SkillItem key={item.id} item={item} />
      ))}
    </section>
  )
}

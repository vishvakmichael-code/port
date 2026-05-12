import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { bio, trajectory, beyondDesign, sketchImages } from '../data/about-data'
import { useIsMobile } from '../hooks/useMediaQuery'
import ScatterGallery from '../components/ui/ScatterGallery'
import { useCursorState } from '../hooks/useCursorState'


const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

/* ── Trajectory image / placeholder ── */
function TrajectoryImage({ src, year }) {
  if (!src) return null

  return (
    <div style={{
      width: '100%',
      maxWidth: '240px',
      aspectRatio: '4/3',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      background: 'var(--color-bg-3)',
      position: 'relative',
      flexShrink: 0,
    }}>
      <img
        src={src}
        alt={year}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        onError={(e) => { e.target.style.display = 'none' }}
      />
    </div>
  )
}

/* ── Trajectory item content block ── */
function TrajectoryContent({ item, align }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      alignItems: align === 'right' ? 'flex-end' : 'flex-start',
      textAlign: align === 'right' ? 'right' : 'left',
    }}>
      <div>
        {/* CHANGE 1 — year in blue */}
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--t-label)',
          letterSpacing: 'var(--tracking-label)',
          color: '#001EBB',
          margin: '0 0 4px 0',
          textTransform: 'uppercase',
        }}>
          {item.year}
        </p>
        {/* CHANGE 1 — location in blue at 0.6 opacity */}
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--t-label)',
          letterSpacing: 'var(--tracking-label)',
          color: '#001EBB',
          opacity: 0.6,
          margin: 0,
          textTransform: 'uppercase',
        }}>
          {item.location}
        </p>
      </div>

      <TrajectoryImage src={item.image} year={item.year} />

      <p style={{
        fontFamily: 'var(--font-itim)',
        fontSize: 'var(--t-body)',
        lineHeight: 'var(--leading-relaxed)',
        color: 'var(--color-fg)',
        margin: 0,
        maxWidth: '360px',
      }}>
        {item.content}
      </p>
    </div>
  )
}

/* ── Trajectory item row ── */
function TrajectoryItem({ item, isMobile }) {
  const isLeft = item.side === 'left'

  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
          paddingBottom: 'var(--space-8)',
          borderBottom: '1px solid var(--color-subtle)',
          marginBottom: 'var(--space-8)',
        }}
      >
        <TrajectoryContent item={item} align="left" />
      </motion.div>
    )
  }

  return (
    /* CHANGE 2 — slide from correct side, updated values */
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 48px 1fr',
        gap: 0,
        marginBottom: 'var(--space-12)',
        alignItems: 'start',
      }}
    >
      {/* Left column */}
      <div style={{
        paddingRight: 'var(--space-8)',
        visibility: isLeft ? 'visible' : 'hidden',
      }}>
        {isLeft && <TrajectoryContent item={item} align="right" />}
      </div>

      {/* Center column — empty, dot is now scroll-driven on the wrapper */}
      <div />

      {/* Right column */}
      <div style={{
        paddingLeft: 'var(--space-8)',
        visibility: isLeft ? 'hidden' : 'visible',
      }}>
        {!isLeft && <TrajectoryContent item={item} align="left" />}
      </div>
    </motion.div>
  )
}

/* ── Beyond Design card ── */
function BeyondCard({ item, index, onOpen }) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef(null)
  useCursorState(cardRef, 'project')

  return (
    <motion.div
      ref={cardRef}
      onClick={onOpen}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      animate={{
        y: hovered ? -8 : 0,
        boxShadow: hovered
          ? '0 24px 60px rgba(0,0,0,0.18)'
          : '0 2px 12px rgba(0,0,0,0.06)',
      }}
      style={{
        background: item.bg,
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-8)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
        cursor: 'none',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '280px',
        border: 'none',
      }}
    >
      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'var(--t-h3)',
        fontWeight: 600,
        letterSpacing: 'var(--tracking-heading)',
        color: item.titleColor,
        margin: 0,
      }}>
        {item.label}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: 'var(--font-itim)',
        fontSize: 'var(--t-body-lg)',
        lineHeight: 'var(--leading-relaxed)',
        color: item.textColor,
        margin: 0,
        flex: 1,
        opacity: 0.92,
      }}>
        {item.description}
      </p>

      {/* Instagram link — only for sketches */}
      {item.link && (
        <a
          href={item.link.href}
          target={item.link.external ? '_blank' : undefined}
          rel={item.link.external ? 'noopener noreferrer' : undefined}
          onClick={(e) => e.stopPropagation()}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--t-label)',
            letterSpacing: 'var(--tracking-label)',
            color: item.linkColor,
            textDecoration: 'none',
          }}
        >
          {item.link.text}
        </a>
      )}

      {/* Bottom CTA — appears on hover */}
      <motion.div
        animate={{
          opacity: hovered ? 1 : 0,
          y: hovered ? 0 : 8,
        }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'absolute',
          bottom: 'var(--space-6)',
          right: 'var(--space-6)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--t-label)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: item.textColor,
          opacity: 0.7,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(255,255,255,0.15)',
          padding: '6px 14px',
          borderRadius: 'var(--radius-pill)',
          backdropFilter: 'blur(4px)',
          pointerEvents: 'none',
        }}
      >
        {item.cta}
      </motion.div>

      {/* Decorative circles — top right corner */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        right: '-40px',
        width: '160px',
        height: '160px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.06)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        top: '-20px',
        right: '-20px',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.04)',
        pointerEvents: 'none',
      }} />
    </motion.div>
  )
}

/* ── Page ── */
export default function About() {
  const isMobile = useIsMobile()
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryData, setGalleryData] = useState({ title: '', images: [] })

  /* CHANGE 3 — scroll-driven dot */
  const trajectoryRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: trajectoryRef,
    offset: ['start center', 'end center'],
  })
  const dotY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <main style={{ background: 'var(--color-bg)', paddingTop: 'var(--nav-height)' }}>

      {/* PAGE HEADER */}
      <section style={{
        paddingTop: 'var(--section-padding-top)',
        paddingBottom: 'var(--space-8)',
        paddingInline: 'var(--page-padding-x)',
        borderBottom: '1px solid var(--color-subtle)',
      }}>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--t-h1)',
            fontWeight: 700,
            letterSpacing: 'var(--tracking-heading)',
            color: 'var(--color-primary)',
            margin: 0,
          }}
        >
          About
        </motion.h1>
      </section>

      {/* BIO + PORTRAIT */}
      <section style={{
        paddingBlock: 'var(--section-padding-top)',
        paddingInline: 'var(--page-padding-x)',
        maxWidth: 'var(--content-max-width)',
        marginInline: 'auto',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 320px',
          gap: isMobile ? 'var(--space-8)' : 'var(--space-16)',
          alignItems: 'flex-start',
        }}>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              fontFamily: 'var(--font-itim)',
              fontSize: 'var(--t-body-lg)',
              lineHeight: 'var(--leading-relaxed)',
              color: 'var(--color-fg)',
              margin: 0,
              order: isMobile ? 2 : 1,
            }}
          >
            {bio}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              width: '100%',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              order: isMobile ? 1 : 2,
            }}
          >
            <img
              src="/images/about/vishvak-portrait.png"
              alt="Vishvak Rajendran"
              style={{
                width: '100%',
                maxWidth: '320px',
                height: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
              draggable={false}
            />
          </motion.div>
        </div>
      </section>

      {/* TRAJECTORY */}
      <section style={{
        paddingBlock: 'var(--section-padding-top)',
        paddingInline: 'var(--page-padding-x)',
        maxWidth: 'var(--content-max-width)',
        marginInline: 'auto',
        borderTop: '1px solid var(--color-subtle)',
      }}>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--t-h2)',
            fontWeight: 600,
            letterSpacing: 'var(--tracking-heading)',
            color: 'var(--color-fg)',
            marginBottom: 'var(--space-12)',
          }}
        >
          Trajectory
        </motion.h2>

        {/* CHANGE 3 — scroll-driven dot container */}
        <div ref={trajectoryRef} style={{ position: 'relative' }}>
          {!isMobile && (
            <>
              {/* Static center line */}
              <div style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 0,
                width: '1px',
                background: 'var(--color-subtle)',
                transform: 'translateX(-50%)',
              }} />

              {/* Scroll-driven yellow dot */}
              <motion.div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: dotY,
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: 'var(--color-primary)',
                  x: '-50%',
                  y: '-50%',
                  zIndex: 2,
                  boxShadow: '0 0 0 3px white, 0 0 0 5px var(--color-primary)',
                }}
              />
            </>
          )}

          {trajectory.map((item, i) => (
            <TrajectoryItem key={i} item={item} isMobile={isMobile} />
          ))}
        </div>
      </section>

      {/* BEYOND DESIGN */}
      <section style={{
        paddingBlock: 'var(--section-padding-top)',
        paddingInline: 'var(--page-padding-x)',
        maxWidth: 'var(--content-max-width)',
        marginInline: 'auto',
        borderTop: '1px solid var(--color-subtle)',
      }}>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--t-h2)',
            fontWeight: 600,
            letterSpacing: 'var(--tracking-heading)',
            color: 'var(--color-fg)',
            marginBottom: 'var(--space-12)',
          }}
        >
          When I am not designing
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: 'var(--space-8)',
        }}>
          {beyondDesign.map((item, i) => (
            <BeyondCard
              key={i}
              item={item}
              index={i}
              onOpen={() => {
                if (item.galleryType === 'sketches') {
                  setGalleryData({ title: 'Portraits & Sketching', images: sketchImages })
                  setGalleryOpen(true)
                }
              }}
            />
          ))}
        </div>
      </section>

      {/* CHANGE 4 — scatter gallery */}
      <ScatterGallery
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        title={galleryData.title}
        images={galleryData.images}
      />

    </main>
  )
}

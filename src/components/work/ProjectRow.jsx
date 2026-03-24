import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCursor } from '../cursor/CursorContext'
import './project-row.css'

const PLACEHOLDER = {
  video: 'Add video URL to projects.js',
  image: 'Add image to /public/images/',
}

function ProjectMedia({ project, hovered }) {
  const hasMedia = project.mediaType === 'video'
    ? Boolean(project.videoUrl)
    : Boolean(project.image)

  return (
    <div className="project-image-wrap">
      {/* CS tag sits above everything */}
      <div className="cs-tag" style={{ background: project.accentColor }}>
        Case Study
      </div>

      {/* Media or placeholder */}
      {!hasMedia && (
        <div className="project-placeholder">
          {PLACEHOLDER[project.mediaType]}
        </div>
      )}

      {hasMedia && project.mediaType === 'video' && (
        <motion.div
          style={{ position: 'absolute', inset: 0 }}
          animate={{
            scale: hovered ? 1.0 : 1.04,
            filter: hovered
              ? 'grayscale(0%) brightness(1)'
              : 'grayscale(15%) brightness(0.9)',
          }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        >
          <iframe
            src={`${project.videoUrl}?autoplay=1&loop=1&muted=1&background=1`}
            allow="autoplay; fullscreen"
            frameBorder="0"
            style={{ width: '100%', height: '100%', display: 'block', border: 'none' }}
            title={project.title}
          />
        </motion.div>
      )}

      {hasMedia && project.mediaType === 'image' && (
        <motion.img
          src={project.image}
          alt={project.title}
          className="project-image"
          style={{ position: 'absolute', inset: 0 }}
          animate={{
            scale: hovered ? 1.0 : 1.04,
            filter: hovered
              ? 'grayscale(0%) brightness(1)'
              : 'grayscale(15%) brightness(0.9)',
          }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        />
      )}
    </div>
  )
}

export default function ProjectRow({ project, index = 0 }) {
  const [hovered, setHovered] = useState(false)
  const [btnHovered, setBtnHovered] = useState(false)
  const navigate = useNavigate()
  const { pushCursorState, popCursorState } = useCursor()

  return (
    <motion.div
      className="project-row"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => { setHovered(true); pushCursorState('project') }}
      onMouseLeave={() => { setHovered(false); popCursorState() }}
      onClick={() => navigate(`/work/${project.slug}`)}
    >
      {/* Rule line draws left → right on hover */}
      <motion.div
        className="project-rule"
        style={{ background: project.accentColor }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="row-inner">
        <ProjectMedia project={project} hovered={hovered} />

        <div className="project-text">
          <span className="project-number" style={{ color: project.accentColor }}>
            {project.number}
          </span>

          <motion.h3
            className="project-title"
            animate={{
              x: hovered ? 6 : 0,
              color: hovered ? project.accentColor : 'var(--color-fg)',
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {project.title}
          </motion.h3>

          <p className="project-subtitle">{project.subtitle}</p>

          <div className="project-tags">
            {project.tags.map((tag, i) => (
              <motion.span
                key={i}
                className="project-tag"
                animate={{ opacity: hovered ? 1 : 0.4 }}
                whileHover={{ color: project.accentColor }}
                transition={{ duration: 0.2 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Enter button — direct child of .project-row, absolute bottom-right */}
      <motion.button
        className="enter-btn"
        onHoverStart={() => setBtnHovered(true)}
        onHoverEnd={() => setBtnHovered(false)}
        onClick={(e) => { e.stopPropagation(); navigate('/work/' + project.slug) }}
        animate={{
          width: btnHovered ? 80 : 48,
          background: btnHovered ? project.accentColor : 'transparent',
          borderColor: btnHovered ? project.accentColor : 'var(--color-subtle)',
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <AnimatePresence mode="wait">
          {btnHovered ? (
            <motion.span
              key="text"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-black)',
                whiteSpace: 'nowrap',
                padding: '0 var(--space-2)',
              }}
            >
              Enter
            </motion.span>
          ) : (
            <motion.span
              key="arrow"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              style={{
                fontSize: '16px',
                color: 'var(--color-fg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ↗
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  )
}

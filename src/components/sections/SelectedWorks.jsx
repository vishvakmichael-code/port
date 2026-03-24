import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { projects } from '../../data/projects'
import ProjectRow from '../work/ProjectRow'
import { useCursorState } from '../../hooks/useCursorState'
import './selected-works.css'

function ViewAllButton() {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()
  const btnRef = useRef(null)
  useCursorState(btnRef, 'cta')

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: 'var(--space-12)',
    }}>
      <motion.button
        ref={btnRef}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={() => navigate('/work')}
        animate={{
          background: hovered ? 'var(--color-primary)' : 'transparent',
          borderColor: hovered ? 'var(--color-primary)' : 'var(--color-subtle)',
          paddingLeft: hovered ? '32px' : '28px',
          paddingRight: hovered ? '32px' : '28px',
        }}
        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
        style={{
          border: '2.5px solid var(--color-white)',
          borderRadius: 'var(--radius-pill)',
          paddingTop: '14px',
          paddingBottom: '14px',
          paddingLeft: '28px',
          paddingRight: '28px',
          cursor: 'none',
          background: 'transparent',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '180px',
          height: '52px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <AnimatePresence mode="wait">
          {hovered ? (
            <motion.span
              key="hover"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                fontWeight: 600,
                letterSpacing: '0.02em',
                color: 'var(--color-black)',
                whiteSpace: 'nowrap',
              }}
            >
              Yes, there's more
            </motion.span>
          ) : (
            <motion.span
              key="default"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                fontWeight: 600,
                letterSpacing: '0.02em',
                color: 'var(--color-fg)',
                whiteSpace: 'nowrap',
              }}
            >
              View all work
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}

export default function SelectedWorks() {
  return (
    <section className="selected-works">
      <div className="works-header">
        <span className="works-heading">Selected Works</span>
        <span className="works-count">0{projects.length} Projects</span>
      </div>

      <div className="works-list">
        {projects.map((project, i) => (
          <ProjectRow key={project.id} project={project} index={i} />
        ))}
      </div>

      <ViewAllButton />
    </section>
  )
}

import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import ProjectRow from '../components/work/ProjectRow'

export default function Work() {
  return (
    <main style={{ minHeight: '100vh', paddingTop: 'var(--nav-height)', background: 'var(--color-bg)' }}>

      {/* Page header */}
      <div style={{
        paddingInline: 'var(--page-padding-x)',
        paddingTop: 'clamp(3rem, 6vw, 5rem)',
        paddingBottom: '2rem',
        maxWidth: 'var(--content-max-width)',
        marginInline: 'auto',
        borderBottom: '1px solid var(--color-subtle)',
      }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--t-label)',
            letterSpacing: 'var(--tracking-label)',
            textTransform: 'uppercase',
            color: 'var(--color-muted)',
            margin: '0 0 1rem 0',
          }}
        >
          Selected work
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 600,
            letterSpacing: 'var(--tracking-tight)',
            lineHeight: 0.92,
            color: 'var(--color-fg)',
            margin: 0,
          }}
        >
          Work
        </motion.h1>
      </div>

      {/* Projects list */}
      <div style={{
        maxWidth: 'var(--content-max-width)',
        marginInline: 'auto',
      }}>
        {projects.map((project, i) => (
          <ProjectRow key={project.id} project={project} index={i} />
        ))}
      </div>

    </main>
  )
}

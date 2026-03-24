import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './who-i-am.css'

const paragraph1 = "Vishvak Rajendran is a service designer and systems thinker who blends qualitative research, service blueprinting, facilitation, and content strategy into experiences that work for the people living through them."

const paragraph2 = "He leads projects from discovery to delivery — running workshops, mapping ecosystems, and writing the words people actually read, with a deep instinct for finding where everyday services quietly stop making sense."

const wordVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.02,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export default function WhoIAm() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60])
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -40])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={sectionRef} className="who-i-am">
      <div className="who-i-am-inner">
        <motion.div style={{ y: y1, opacity }}>
          <p className="who-i-am-p1" style={{ color: 'var(--color-white)' }}>
            {paragraph1.split(' ').map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                style={{
                  display: 'inline-block',
                  marginRight: '0.28em',
                  marginBottom: '0.1em',
                }}
              >
                {word}
              </motion.span>
            ))}
          </p>
        </motion.div>

        <motion.p
          className="who-i-am-p2"
          style={{ y: y2, color: 'var(--color-fg)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {paragraph2}
        </motion.p>
      </div>
    </section>
  )
}

import { useScroll, useTransform, motion } from 'framer-motion'

export default function ScrollPath() {
  const { scrollYProgress } = useScroll()

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-content)',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: '100%', height: '100%', opacity: 0.35 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="
            M 320 0
            C 1100 40,  -80 110,  580 185
            C 1380 260,  60 310,  240 390
            C 420  470, 1350 490, 950 570
            C 550  650, -60 680,  780 750
            C 1420 820, 180 840,  420 880
            C 660  920, 1300 890, 1100 960
            C 900  1030, 200 1010, 650 1060
            C 1100 1110, 1350 1080, 1440 1100
          "
          fill="none"
          stroke="#42A5F5"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ pathLength }}
        />
      </svg>
    </div>
  )
}

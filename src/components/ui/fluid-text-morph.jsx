import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function FluidTextMorph({
  wordPairs,
  className,
  animationProps = {},
  onEnter,
  onLeave,
}) {
  const [index, setIndex] = useState(0)
  const [word, setWord] = useState(wordPairs[index][0])

  const {
    initialColor = 'var(--color-fg)',
    animateColor = 'var(--color-fg)',
    exitColor = 'var(--color-fg)',
  } = animationProps

  useEffect(() => {
    if (wordPairs && wordPairs.length > 0) {
      setWord(wordPairs[index][0])
    }
  }, [index, wordPairs])

  const handleHover = () => {
    onEnter?.()
    setIndex((prev) => (prev + 1) % wordPairs.length)
  }

  const handleHoverEnd = () => {
    onLeave?.()
  }

  const handleClick = () => {
    setIndex((prev) => (prev + 1) % wordPairs.length)
  }

  const letters = word.split("")

  return (
    <span
      className={cn(
        "relative inline-flex cursor-none items-baseline justify-start",
        className
      )}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverEnd}
      onClick={handleClick}
    >
      <AnimatePresence>
        {letters.map((letter, i) => (
          <motion.span
            key={`letter-${i}`}
            layoutId={`letter-${i}`}
            initial={{ opacity: 0, y: 30, scale: 0.8, color: initialColor }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              color: animateColor,
              transition: {
                type: "spring",
                damping: 15,
                stiffness: 200,
                delay: i * 0.05,
              },
            }}
            exit={{
              opacity: 0,
              y: -30,
              scale: 0.8,
              color: exitColor,
              transition: {
                type: "spring",
                damping: 15,
                stiffness: 200,
                delay: (letters.length - 1 - i) * 0.05,
              },
            }}
            style={{ display: 'inline-block' }}
          >
            {letter}
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  )
}

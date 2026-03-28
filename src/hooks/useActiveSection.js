import { useState, useEffect } from 'react'

export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const observers = sectionIds.map(id => {
      const el = document.getElementById(id)
      if (!el) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { threshold: 0.3 }
      )
      observer.observe(el)
      return observer
    })

    return () => observers.forEach(obs => obs?.disconnect())
  }, [sectionIds])

  return activeSection
}

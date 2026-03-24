import { useState, useEffect } from 'react'

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  )

  useEffect(() => {
    const media = window.matchMedia(query)
    const listener = (e) => setMatches(e.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

export const useIsMobile      = () => useMediaQuery('(max-width: 767px)')
export const useIsTablet      = () => useMediaQuery('(max-width: 1023px)')
export const useIsTouch       = () => useMediaQuery('(pointer: coarse)')
export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')

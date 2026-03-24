import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useGSAP(callback, deps = []) {
  useEffect(() => {
    const ctx = gsap.context(callback)
    return () => ctx.revert()
  }, deps)
}

export { gsap, ScrollTrigger }

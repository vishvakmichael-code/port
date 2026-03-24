import { useEffect } from 'react'
import { useCursor } from '../components/cursor/CursorContext'

/**
 * Attach a cursor state to a DOM element ref.
 * Pushes state on mouseenter, pops on mouseleave.
 *
 * Usage:
 *   const ref = useRef(null)
 *   useCursorState(ref, 'link')
 */
export function useCursorState(ref, state) {
  const { pushCursorState, popCursorState } = useCursor()

  useEffect(() => {
    const el = ref?.current
    if (!el) return

    const enter = () => pushCursorState(state)
    const leave = () => popCursorState()

    el.addEventListener('mouseenter', enter)
    el.addEventListener('mouseleave', leave)

    return () => {
      el.removeEventListener('mouseenter', enter)
      el.removeEventListener('mouseleave', leave)
    }
  }, [ref, state, pushCursorState, popCursorState])
}

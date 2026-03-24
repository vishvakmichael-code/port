import { createContext, useContext, useState, useCallback } from 'react'

const CursorContext = createContext(null)

// All possible cursor states
export const CURSOR_STATES = {
  DEFAULT:     'default',
  HERO_IDLE:   'hero-idle',
  WORD_REVEAL: 'word-reveal',
  LINK:        'link',
  PROJECT:     'project',
  CTA:         'cta',
  TEXT:        'text',
}

// Visual spec per state
export const CURSOR_SPECS = {
  'default':     { dotSize: 10, dotOpacity: 1.0, ringSize: 40, ringOpacity: 0,   showNative: false, label: null },
  'hero-idle':   { dotSize: 8,  dotOpacity: 0.5, ringSize: 40, ringOpacity: 0,   showNative: false, label: null },
  'word-reveal': { dotSize: 18, dotOpacity: 0.85,ringSize: 36, ringOpacity: 1,   showNative: false, label: null },
  'link':        { dotSize: 8,  dotOpacity: 0,   ringSize: 40, ringOpacity: 0,   showNative: true,  label: null },
  'project':     { dotSize: 8,  dotOpacity: 0,   ringSize: 88, ringOpacity: 1,   showNative: false, label: 'View' },
  'cta':         { dotSize: 8,  dotOpacity: 0,   ringSize: 40, ringOpacity: 0,   showNative: true,  label: null },
  'text':        { dotSize: 2,  dotOpacity: 0.6, ringSize: 28, ringOpacity: 1,   showNative: false, label: null },
}

export function CursorProvider({ children }) {
  const [cursorState, setCursorStateRaw] = useState(CURSOR_STATES.DEFAULT)
  const [stateStack, setStateStack] = useState([CURSOR_STATES.DEFAULT])

  const setCursorState = useCallback((newState) => {
    setCursorStateRaw(newState)
  }, [])

  const pushCursorState = useCallback((newState) => {
    setStateStack(prev => [...prev, newState])
    setCursorStateRaw(newState)
  }, [])

  const popCursorState = useCallback(() => {
    setStateStack(prev => {
      const next = prev.length > 1 ? prev.slice(0, -1) : prev
      setCursorStateRaw(next[next.length - 1])
      return next
    })
  }, [])

  return (
    <CursorContext.Provider value={{
      cursorState,
      setCursorState,
      pushCursorState,
      popCursorState,
      spec: CURSOR_SPECS[cursorState] ?? CURSOR_SPECS['default'],
    }}>
      {children}
    </CursorContext.Provider>
  )
}

export function useCursor() {
  const ctx = useContext(CursorContext)
  if (!ctx) throw new Error('useCursor must be used inside CursorProvider')
  return ctx
}

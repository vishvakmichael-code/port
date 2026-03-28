import { useState } from 'react'

export default function TextHighlightTool({ text, label }) {
  const words = text.split(' ')
  const [states, setStates] = useState(
    Object.fromEntries(words.map((_, i) => [i, 'normal']))
  )

  const cycle = (i) => {
    console.log('clicked word', i, states[i])
    setStates(prev => ({
      ...prev,
      [i]: prev[i] === 'normal' ? 'bold'
         : prev[i] === 'bold'   ? 'highlight'
         : 'normal'
    }))
  }

  const isLight = document.documentElement.classList.contains('light')

  const getStyle = (state) => ({
    normal: {
      color: 'var(--color-muted)',
      fontWeight: 400,
    },
    bold: {
      color: 'var(--color-fg)',
      fontWeight: 700,
    },
    highlight: {
      color: isLight ? 'var(--color-tertiary)' : 'var(--color-primary)',
      fontWeight: 700,
      textDecoration: 'underline',
      textDecorationColor: isLight ? 'var(--color-tertiary)' : 'var(--color-primary)',
    },
  })[state]

  const exportData = () => {
    const result = words.map((word, i) => ({ word, state: states[i] }))
    console.log('TextHighlight export:', JSON.stringify(result))
    navigator.clipboard.writeText(JSON.stringify(result, null, 2))
    alert('Copied to clipboard — paste to Claude!')
  }

  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        color: 'var(--color-primary)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        marginBottom: 'var(--space-2)',
      }}>
        {label && <span style={{ marginRight: 8 }}>{label} —</span>}
        Click words: once = bold · twice = highlight · three times = reset
      </div>

      <p style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'var(--t-h2)',
        lineHeight: 'var(--leading-relaxed)',
        letterSpacing: 'var(--tracking-heading)',
        display: 'block',
      }}>
        {words.map((word, i) => (
          <span
            key={i}
            onClick={() => cycle(i)}
            style={{
              ...getStyle(states[i]),
              cursor: 'pointer',
              marginRight: '0.28em',
              display: 'inline',
              transition: 'all 0.2s ease',
              userSelect: 'none',
            }}
          >
            {word}
          </span>
        ))}
      </p>

      <button
        onClick={exportData}
        style={{
          marginTop: 'var(--space-4)',
          padding: '8px 16px',
          background: 'rgba(255,215,0,0.1)',
          border: '1px solid rgba(255,215,0,0.3)',
          borderRadius: 'var(--radius-pill)',
          color: 'var(--color-primary)',
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          cursor: 'pointer',
        }}
      >
        Copy marked text → Claude
      </button>
    </div>
  )
}

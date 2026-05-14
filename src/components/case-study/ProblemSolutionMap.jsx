import { useState } from 'react'

const DM_SANS = "'DM Sans', sans-serif"

const ACTIVE_COLOR = '#1a1aee'
const ACTIVE_TINT  = '#eef2fb'
const LINE_COLOR   = '#e0e0e0'
const DOT_INACTIVE = '#cccccc'
const TEXT_BODY    = '#333333'
const TEXT_MUTED   = '#888888'
const SEPARATOR    = '#eeeeee'

const LABEL = {
  fontFamily: DM_SANS,
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: TEXT_MUTED,
  margin: 0,
}

function Cell({ icon, title, body, isActive, onClick, side }) {
  const color = isActive ? ACTIVE_COLOR : TEXT_BODY
  const pad = side === 'left'
    ? '18px 28px 18px 0'
    : '18px 0 18px 28px'

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      style={{
        background: isActive ? ACTIVE_TINT : 'transparent',
        cursor: 'pointer',
        padding: pad,
        transition: 'background 0.25s ease',
        border: 'none',
        textAlign: 'left',
        outline: 'none',
      }}
    >
      {/* Title row — icon + label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <i
          className={`ti ${icon}`}
          style={{
            fontSize: '18px',
            lineHeight: '1',
            color,
            transition: 'color 0.25s ease',
            flexShrink: 0,
            display: 'inline-block',
          }}
        />
        <span style={{
          fontFamily: DM_SANS,
          fontSize: '16px',
          fontWeight: 500,
          color,
          lineHeight: 1.35,
          transition: 'color 0.25s ease',
        }}>
          {title}
        </span>
      </div>

      {/* Description — max-height reveal */}
      <div style={{
        maxHeight: isActive ? '200px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.3s ease',
      }}>
        <p style={{
          fontFamily: DM_SANS,
          fontSize: '14px',
          fontWeight: 400,
          color: TEXT_MUTED,
          lineHeight: 1.65,
          margin: '8px 0 0',
          paddingLeft: '28px',
        }}>
          {body}
        </p>
      </div>
    </div>
  )
}

export default function ProblemSolutionMap({ pairs }) {
  const [active, setActive] = useState(null)
  const toggle = i => setActive(prev => (prev === i ? null : i))

  return (
    <div>
      {/* Column headers */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 48px 1fr',
        borderBottom: `1px solid ${SEPARATOR}`,
        paddingBottom: '12px',
        marginBottom: 0,
      }}>
        <span style={LABEL}>Problem</span>
        <span />
        <span style={LABEL}>Solution</span>
      </div>

      {/* Rows */}
      {pairs.map((pair, i) => {
        const isActive = active === i
        return (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 48px 1fr',
              borderBottom: `1px solid ${SEPARATOR}`,
            }}
          >
            <Cell
              icon={pair.problem.icon}
              title={pair.problem.title}
              body={pair.problem.body}
              isActive={isActive}
              onClick={() => toggle(i)}
              side="left"
            />

            {/* Connector — vertical line + dot */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pointerEvents: 'none',
            }}>
              <div style={{ width: '0.5px', flex: 1, background: LINE_COLOR }} />
              <div style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: isActive ? ACTIVE_COLOR : DOT_INACTIVE,
                transition: 'background 0.25s ease',
                flexShrink: 0,
              }} />
              <div style={{ width: '0.5px', flex: 1, background: LINE_COLOR }} />
            </div>

            <Cell
              icon={pair.solution.icon}
              title={pair.solution.title}
              body={pair.solution.body}
              isActive={isActive}
              onClick={() => toggle(i)}
              side="right"
            />
          </div>
        )
      })}

      {/* Reset */}
      {active !== null && (
        <button
          onClick={() => setActive(null)}
          style={{
            fontFamily: DM_SANS,
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.05em',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: TEXT_MUTED,
            padding: '14px 0 0',
            textDecoration: 'underline',
            display: 'block',
          }}
        >
          Reset
        </button>
      )}
    </div>
  )
}

import { useState } from 'react'

const DM_SANS = "'DM Sans', sans-serif"

const ACTIVE_COLOR = '#1a1a6e'
const ACTIVE_TINT  = '#f5f7ff'
const LINE_COLOR   = '#e0e0e0'
const DOT_INACTIVE = '#cccccc'
const TEXT_BODY    = '#333333'
const TEXT_MUTED   = '#888888'
const SEPARATOR    = '#eeeeee'

const PLUS_CURSOR = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cline x1='10' y1='4' x2='10' y2='16' stroke='%231a1a6e' stroke-width='2' stroke-linecap='round'/%3E%3Cline x1='4' y1='10' x2='16' y2='10' stroke='%231a1a6e' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E") 10 10, auto`

const LABEL_STYLE = {
  fontFamily: DM_SANS,
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: TEXT_MUTED,
  margin: 0,
}

function Cell({ icon, title, body, isActive, side }) {
  const color = isActive ? ACTIVE_COLOR : TEXT_BODY
  const pad = side === 'left'
    ? '18px 28px 18px 0'
    : '18px 0 18px 28px'

  return (
    <div style={{ padding: pad }}>
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
  const [hovered, setHovered] = useState(null)
  const toggle = i => setActive(prev => (prev === i ? null : i))

  return (
    <div>
      {/* Column headers */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 48px 1fr 32px',
        borderBottom: `1px solid ${SEPARATOR}`,
        paddingBottom: '12px',
        marginBottom: 0,
      }}>
        <span style={LABEL_STYLE}>Problem</span>
        <span />
        <span style={LABEL_STYLE}>Solution</span>
        <span />
      </div>

      {/* Rows */}
      {pairs.map((pair, i) => {
        const isActive = active === i
        const isHovered = hovered === i
        return (
          <div
            key={i}
            role="button"
            tabIndex={0}
            onClick={() => toggle(i)}
            onKeyDown={e => e.key === 'Enter' && toggle(i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 48px 1fr 32px',
              borderBottom: `1px solid ${SEPARATOR}`,
              background: isActive ? ACTIVE_TINT : 'transparent',
              transition: 'background 0.25s ease',
              cursor: PLUS_CURSOR,
              outline: 'none',
            }}
          >
            <Cell
              icon={pair.problem.icon}
              title={pair.problem.title}
              body={pair.problem.body}
              isActive={isActive}
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
              side="right"
            />

            {/* Toggle icon */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              paddingRight: '4px',
            }}>
              <span style={{
                display: 'inline-block',
                fontSize: '16px',
                lineHeight: 1,
                color: isActive || isHovered ? ACTIVE_COLOR : TEXT_MUTED,
                transform: isActive ? 'rotate(45deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease, color 0.2s ease',
                userSelect: 'none',
                fontWeight: 400,
              }}>
                +
              </span>
            </div>
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

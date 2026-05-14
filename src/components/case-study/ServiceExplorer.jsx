import { useState, useEffect, useRef } from 'react'

const DM_SANS = "'DM Sans', sans-serif"

const PLUS_CURSOR = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cline x1='10' y1='4' x2='10' y2='16' stroke='%231a1a6e' stroke-width='2' stroke-linecap='round'/%3E%3Cline x1='4' y1='10' x2='16' y2='10' stroke='%231a1a6e' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E") 10 10, auto`

const FEATURES = [
  {
    icon: 'ti-truck',
    name: 'Mobile Collection Van',
    insight: '86% of people would skip a service if travel was inconvenient. We attached a Reboot van to existing Tuesday garbage collection trucks so objects are assessed at home before anything else happens.',
  },
  {
    icon: 'ti-device-mobile-check',
    name: 'Digital Pre-check',
    insight: 'Uncertainty at the entry point stops people before they even try. A photo submission gets an eligibility response before anyone travels anywhere.',
  },
  {
    icon: 'ti-message-2-heart',
    name: 'Storytelling Before Donating',
    insight: '61% kept objects they no longer used because of the memories attached. The app lets people add a short story or care tip before passing an object on.',
  },
  {
    icon: 'ti-building-community',
    name: 'Community Anchors',
    insight: 'Trust takes time and the centre does not open until 2029. University partnerships, neighbourhood exchange boxes and café drop-points bring the service to where people already are.',
  },
  {
    icon: 'ti-refresh',
    name: 'Reboot Membership',
    insight: 'Sustainability feels abstract until it becomes personal. Membership connects people to a local repair and exchange community over time.',
  },
]

export default function ServiceExplorer({ isMobile }) {
  const [open, setOpen] = useState(null)
  const [hovered, setHovered] = useState(null)
  const panelRef = useRef(null)

  useEffect(() => {
    if (open === null) return
    const handleClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)',
        gap: '1px',
        background: '#eeeeee',
        border: '1px solid #eeeeee',
      }}>
        {FEATURES.map((f, i) => {
          const isOpen = open === i
          const isHovered = hovered === i
          return (
            <button
              key={i}
              onClick={() => setOpen(open === i ? null : i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'relative',
                background: isOpen ? '#f5f7ff' : '#ffffff',
                border: 'none',
                cursor: PLUS_CURSOR,
                padding: '1.5rem 1.25rem',
                textAlign: 'left',
                transition: 'background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: isHovered ? 'inset 0 0 0 1px #1a1a6e' : 'none',
              }}
            >
              <i
                className={`ti ${f.icon}`}
                style={{
                  fontSize: '18px',
                  color: isOpen ? '#1a1a6e' : '#555555',
                  transition: 'color 0.2s ease',
                  lineHeight: 1,
                }}
              />
              <span style={{
                fontFamily: DM_SANS,
                fontSize: '14px',
                fontWeight: 500,
                color: isOpen ? '#1a1a6e' : '#333333',
                lineHeight: 1.35,
                transition: 'color 0.2s ease',
              }}>
                {f.name}
              </span>
            </button>
          )
        })}
      </div>

      {/* Insight panel */}
      {open !== null && (
        <div
          ref={panelRef}
          style={{
            marginTop: '1px',
            background: '#ffffff',
            border: '1px solid #eeeeee',
            borderRadius: '8px',
            padding: '1.25rem 1.5rem',
          }}
        >
          <p style={{
            fontFamily: DM_SANS,
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#888888',
            margin: '0 0 0.6rem 0',
          }}>
            Key insight
          </p>
          <p style={{
            fontFamily: DM_SANS,
            fontSize: '13px',
            fontWeight: 400,
            color: '#333333',
            lineHeight: 1.65,
            margin: 0,
          }}>
            {FEATURES[open].insight}
          </p>
        </div>
      )}
    </div>
  )
}

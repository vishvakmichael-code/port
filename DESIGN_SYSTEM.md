# Vishvak Rajendran — Design System
## Single source of truth for all visual decisions

### Color Tokens
| Token | Value | Usage |
|---|---|---|
| --color-bg | #000000 | Primary background — pure black |
| --color-bg-2 | #0A0A0A | Elevated surface, cards |
| --color-bg-3 | #141414 | Hover states on dark |
| --color-fg | #F5F5F5 | Primary text |
| --color-muted | #666666 | Secondary text, labels |
| --color-subtle | #222222 | Borders, dividers |
| --color-primary | #FFD700 | Yellow — dominant accent |
| --color-secondary | #FF9EEA | Pink — CS2, hover state 2 |
| --color-tertiary | #42A5F5 | Blue — CS1, hover state 1 |
| --color-accent | var(--color-primary) | Alias → yellow by default |
| --color-cs-accent | per page | Overridden per case study |
| --color-white | #FFFFFF | High emphasis |
| --color-black | #000000 | Transitions, wipes |

### Accent Color Rules

| Color | Hex | Role |
|---|---|---|
| Primary Yellow | #FFD700 | Section headings · cursor dot · particles · active states |
| Secondary Pink | #FF9EEA | Case Study 2 (Surfboard) · project row 2 hover · CTA hover |
| Tertiary Blue | #42A5F5 | Case Study 1 (Getliņi) · project row 1 hover · WhatIDo rows |

### Color Restraint Rules
- Yellow appears on: headings, cursor, particles, active nav indicator
- Pink appears on: CS2 page accent, row 2 hover lines, testimonial arrows hover
- Blue appears on: CS1 page accent, row 1 hover lines, WhatIDo row accents
- All three NEVER appear simultaneously in the same section
- Body text, labels, numbers: always neutral (#666666 or #F5F5F5)
- Backgrounds: always #000000 — no colored backgrounds anywhere

### Typography Tokens
| Token | Value | Usage |
|---|---|---|
| --font-display | 'Neue Haas Grotesk Display Pro', 'Helvetica Neue', sans-serif | Hero headline |
| --font-body | 'Suisse Int\'l', 'Inter', sans-serif | Navigation, labels, UI |
| --font-serif | 'Editorial New', Georgia, serif | Descriptors, pull quotes |
| --font-mono | 'IBM Plex Mono', monospace | Numbers, tags, metadata |
| --t-display | clamp(48px, 6.5vw, 92px) | Line 1 of hero |
| --t-display-md | clamp(64px, 9vw, 128px) | Line 2 of hero |
| --t-display-lg | clamp(88px, 15vw, 210px) | Line 3 of hero (dominant) |
| --t-h1 | clamp(32px, 4vw, 52px) | Section headings |
| --t-h2 | clamp(22px, 2.5vw, 32px) | Sub-section headings |
| --t-body-lg | clamp(16px, 1.6vw, 20px) | Lead body text |
| --t-body | clamp(14px, 1.2vw, 16px) | Body copy |
| --t-label | 11px | Uppercase labels, section numbers |
| --t-mono | 11px | Monospace metadata |

### Spacing Tokens (base-8 grid)
| Token | Value |
|---|---|
| --space-1 | 8px |
| --space-2 | 16px |
| --space-3 | 24px |
| --space-4 | 32px |
| --space-6 | 48px |
| --space-8 | 64px |
| --space-12 | 96px |
| --space-16 | 128px |
| --space-24 | 192px |

### Section Spacing
| Token | Value |
|---|---|
| --section-padding | clamp(80px, 12vw, 160px) |
| --page-padding-x | clamp(24px, 5vw, 80px) |
| --content-max-width | 1400px |
| --grid-gutter | 32px |

### Animation Tokens
| Token | Value | Usage |
|---|---|---|
| --ease-expo-out | cubic-bezier(0.16, 1, 0.3, 1) | Text reveals, hero entry |
| --ease-smooth | cubic-bezier(0.25, 1, 0.5, 1) | Section entries, reveals |
| --ease-sharp | cubic-bezier(0.76, 0, 0.24, 1) | Nav flips, fast UI |
| --duration-fast | 0.3s | Hover states |
| --duration-mid | 0.5s | Reveals, transitions |
| --duration-slow | 0.8s | Page-level animations |

### Breakpoints
| Name | Value |
|---|---|
| Mobile S | 320px |
| Mobile L | 480px |
| Tablet | 768px |
| Desktop | 1024px |
| Wide | 1440px |

### Component Rules
- All buttons: sourced from 21st.dev, pasted into `src/components/ui/`
- All cards: sourced from 21st.dev, pasted into `src/components/ui/`
- No hardcoded hex values anywhere outside `tokens.css`
- No hardcoded px values for spacing outside `tokens.css`
- All font sizes use CSS custom properties

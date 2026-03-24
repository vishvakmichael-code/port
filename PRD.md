# Vishvak Rajendran — Product Requirement Document
## Version 1.0

### Project Brief
Personal portfolio for Vishvak Rajendran, Service Designer and Systems Thinker.
Audience: Recruiters, startup founders, freelance brand clients.
Feeling in 5 seconds: Inspired by creative vision.
Reference: makemepulse.com

### Site Map
| Route | Page |
|---|---|
| / | Home — full scroll experience |
| /work | Work index — case study grid |
| /work/getlini-eco | Case study 1 |
| /work/surfboard-payments | Case study 2 |
| /about | About |
| /contact | Contact |

### Home Page — Block Structure
| Block | Section |
|---|---|
| 01 | HERO — Headline + cloud particles + cursor system |
| 02 | WHO I AM — Identity paragraph, word illumination |
| 03 | SELECTED WORKS — Two project rows, image reveal |
| 04 | WHAT I DO — Accordion rows, cursor-follow image |
| 05 | TESTIMONIALS — Quote carousel |
| 06 | CONNECT — Inverted section, CTA |

### Color System
- Background: #000000 pure black throughout
- Primary accent: #FFD700 yellow — dominant, used sparingly
- Secondary accent: #FF9EEA pink — Case Study 2, hover state 2
- Tertiary accent: #42A5F5 blue — Case Study 1, hover state 1
- Text: #F5F5F5 primary, #666666 secondary
- Rule: one accent color per section — never mix two accents in same view

### Design Decisions Locked
- Pure black palette: #000000 / #F5F5F5 / three accents
- Yellow (#FFD700) on: cursor dot, particles, section headings only
- Hero headline: three staggered lines, left-to-right diagonal cascade
- "invisible." → "felt." word morph on hover (toggle)
- Cloud particle system (Three.js, 4000 particles, cursor collision)
- Custom cursor: context-aware, 7 states
- Page transitions: GSAP curtain wipe
- Smooth scroll: Lenis

### Excluded in v1
- Blender / 3D objects (added in v2 if needed)
- Ghost trail images (removed — too distracting from cloud particles)
- Dotted background lines

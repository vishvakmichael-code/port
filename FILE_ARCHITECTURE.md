# File Architecture

src/
├── components/
│   ├── ui/                    # 21st.dev components pasted here
│   │   ├── Button.jsx         # from 21st.dev
│   │   ├── Card.jsx           # from 21st.dev
│   │   └── [others as needed]
│   ├── layout/
│   │   ├── Navigation.jsx
│   │   ├── Footer.jsx
│   │   └── PageTransition.jsx
│   ├── cursor/
│   │   ├── Cursor.jsx         # custom cursor component
│   │   └── CursorContext.jsx  # cursor state management
│   ├── hero/
│   │   ├── Hero.jsx           # hero section wrapper
│   │   ├── HeroHeadline.jsx   # three-line diagonal headline
│   │   ├── WordMorph.jsx      # invisible → felt morph
│   │   ├── HeroSignature.jsx  # name + descriptor bottom-left
│   │   └── CloudParticles.jsx # Three.js particle system
│   ├── sections/
│   │   ├── WhoIAm.jsx
│   │   ├── SelectedWorks.jsx
│   │   ├── WhatIDo.jsx
│   │   ├── Testimonials.jsx
│   │   └── Connect.jsx
│   └── work/
│       ├── ProjectRow.jsx     # used in SelectedWorks
│       ├── CaseStudyHero.jsx  # case study page hero
│       └── CaseStudyLayout.jsx
├── pages/
│   ├── Home.jsx
│   ├── Work.jsx
│   ├── CaseStudy.jsx          # template for both case studies
│   ├── About.jsx
│   └── Contact.jsx
├── hooks/
│   ├── useLenis.js            # Lenis smooth scroll setup
│   ├── useGSAP.js             # GSAP + ScrollTrigger init
│   └── useMediaQuery.js       # responsive breakpoint detection
├── styles/
│   ├── tokens.css             # ALL design tokens — source of truth
│   ├── global.css             # resets, base styles, font imports
│   └── animations.css        # keyframe animations
├── data/
│   ├── projects.js            # project data (titles, slugs, tags, images)
│   ├── testimonials.js        # quote data
│   └── disciplines.js        # what I do data with images
├── assets/
│   ├── fonts/                 # self-hosted fonts if licensed
│   └── images/
│       ├── projects/          # project thumbnails
│       └── disciplines/       # what I do hover images
├── App.jsx                    # router, providers
├── main.jsx                   # entry point
└── index.html

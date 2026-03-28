export const disciplines = [
  {
    id: 1,
    text: 'Design sprint workshop facilitation',
    highlight: 'workshop facilitation',
    textAlign: 'left',
    slideFrom: 'right',
    illustration: {
      src: '/images/illustrations/illustration-flower.svg',
      position: 'right',
      size: 200,
      filter: 'brightness(0) saturate(100%) invert(85%) sepia(50%) saturate(500%) hue-rotate(5deg) brightness(105%)',
    },
    accent: 'var(--color-primary)',
  },
  {
    id: 2,
    text: 'Synthesising across methods and turning it into decisions',
    highlight: 'decisions',
    textAlign: 'right',
    slideFrom: 'left',
    illustration: {
      src: '/images/illustrations/illustration-halflines.svg',
      position: 'left',
      size: 180,
      filter: 'brightness(0) saturate(100%) invert(20%) sepia(80%) saturate(600%) hue-rotate(210deg) brightness(110%)',
    },
    backgroundIllustration: {
      src: '/images/illustrations/illustration-bg.svg',
      opacity: 0.22,
    },
    accent: 'var(--color-tertiary)',
  },
  {
    id: 3,
    text: 'Service concept prototypes & implementation roadmaps',
    highlight: 'implementation roadmaps',
    textAlign: 'left',
    slideFrom: 'right',
    illustration: {
      src: '/images/illustrations/illustration-star.svg',
      position: 'right',
      size: 180,
      filter: 'brightness(0) saturate(100%) invert(20%) sepia(80%) saturate(600%) hue-rotate(210deg) brightness(110%)',
    },
    accent: 'var(--color-tertiary)',
  },
]

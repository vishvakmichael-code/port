import HeroHeadline from './HeroHeadline'
import HeroSignature from './HeroSignature'

export default function Hero() {
  return (
    <section
      id="sec-hero"
      className="hero-section"
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh',
        paddingTop: 'var(--nav-height)',
        paddingBottom: 'var(--space-16)',
        background: 'var(--color-bg)',
      }}
    >
      <HeroHeadline />
      <HeroSignature />
    </section>
  )
}

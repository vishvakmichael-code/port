import './hero-headline.css'
import WordMorph from './WordMorph'

export default function HeroHeadline() {
  return (
    <div className="hero-headline" style={{ paddingTop: 'var(--space-8)' }}>
      <span className="annotation annotation-top" style={{ fontSize: 'var(--size-designing)', transform: 'translate(var(--x-designing), var(--y-designing))' }}>
        Designing
      </span>
      <span className="line line-1" style={{ fontSize: 'var(--size-line1)', transform: 'translateX(var(--x-line1))' }}>
        Good services
      </span>
      <div className="line-2-row">
        <span className="annotation" style={{ fontSize: 'var(--size-that)', transform: 'translate(var(--x-that), var(--y-that))' }}>
          that
        </span>
        <span className="line line-2" style={{ fontSize: 'var(--size-line2)', transform: 'translateX(var(--x-line2))' }}>
          are
        </span>
      </div>
      <span className="line line-3" style={{ fontSize: 'var(--size-line3)', transform: 'translateX(var(--x-line3))', fontStyle: 'italic' }}>
        <WordMorph />
      </span>
    </div>
  )
}

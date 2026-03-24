import { Link } from 'react-router-dom'
import { useCursor } from '../cursor/CursorContext'
import './footer.css'

export default function Footer() {
  const { setCursor, resetCursor } = useCursor()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__inner">
        <span className="footer__copy">
          © {year} Vishvak Rajendran
        </span>
        <nav className="footer__nav">
          {['/work', '/about', '/contact'].map((href) => (
            <Link
              key={href}
              to={href}
              className="footer__link"
              onMouseEnter={() => setCursor('link')}
              onMouseLeave={resetCursor}
            >
              {href.slice(1)}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}

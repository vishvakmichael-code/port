import { useParams } from 'react-router-dom'

export default function CaseStudy() {
  const { slug } = useParams()

  return (
    <main data-case-study={slug} style={{ minHeight: '100vh', paddingTop: 'var(--nav-height)' }}>
      <p style={{ color: 'var(--color-muted)', padding: 'var(--page-padding-x)' }}>
        Case study: {slug} — content builds here
      </p>
    </main>
  )
}

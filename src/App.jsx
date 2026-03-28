import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CursorProvider } from './components/cursor/CursorContext'
import Cursor from './components/cursor/Cursor'
import Navigation from './components/layout/Navigation'
import PageTransition from './components/layout/PageTransition'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Work from './pages/Work'
import CaseStudy from './pages/CaseStudy'
import About from './pages/About'
import Contact from './pages/Contact'
import PageLoader from './components/layout/PageLoader'
import { useLenis } from './hooks/useLenis'

function AppInner() {
  useLenis()

  return (
    <PageLoader>
      <Cursor />
      <Navigation />
      <PageTransition>
        <Routes>
          <Route path="/"           element={<Home />}      />
          <Route path="/work"       element={<Work />}      />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="/about"      element={<About />}     />
          <Route path="/contact"    element={<Contact />}   />
        </Routes>
      </PageTransition>
      <Footer />
    </PageLoader>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CursorProvider>
        <AppInner />
      </CursorProvider>
    </BrowserRouter>
  )
}

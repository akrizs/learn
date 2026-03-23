import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Brain, BookOpen, Presentation, Layers, Github } from 'lucide-react'
import { useComplexity } from '../context/ComplexityContext'
import './MainLayout.css'

interface MainLayoutProps {
  children: ReactNode
  showNav?: boolean
}

export default function MainLayout({ children, showNav = true }: MainLayoutProps) {
  const { complexity, toggleComplexity } = useComplexity()
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="layout">
      <header className="layout-header">
        <div className="header-content">
          <Link to="/" className="header-logo">
            <Brain size={24} />
            <span>AI Learn</span>
          </Link>

          {showNav && !isHome && (
            <nav className="header-nav">
              <Link to="/gpt" className={`nav-link ${location.pathname.startsWith('/gpt') ? 'active' : ''}`}>
                <BookOpen size={16} />
                Learn
              </Link>
              <Link to="/gpt/slides" className={`nav-link ${location.pathname === '/gpt/slides' ? 'active' : ''}`}>
                <Presentation size={16} />
                Slides
              </Link>
            </nav>
          )}

          <div className="header-actions">
            <button
              className={`complexity-toggle ${complexity === 'advanced' ? 'advanced' : ''}`}
              onClick={toggleComplexity}
              aria-label="Toggle complexity"
            >
              <Layers size={18} />
              <span className="toggle-label">
                {complexity === 'simple' ? 'Simple' : 'Advanced'}
              </span>
              <span className="toggle-indicator" />
            </button>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="header-github"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </header>

      <main className="layout-main">
        {children}
      </main>

      <footer className="layout-footer">
        <p>Built with care for learning AI concepts</p>
      </footer>
    </div>
  )
}

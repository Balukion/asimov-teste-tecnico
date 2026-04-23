'use client'

import { useEffect, useRef, useState } from 'react'

const navItems = [
  ['Formações', '#formacoes'],
  ['Trilhas', '#trilhas'],
  ['Cursos', '#cursos'],
  ['Projetos', '#projetos'],
] as const

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isMenuOpen) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isMenuOpen])

  return (
    <nav
      aria-label="Navegação principal"
      className="nav-wrap"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 48px',
        height: '64px',
        borderBottom: '1px solid var(--border)',
        background: 'rgba(7,8,15,0.88)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <a
        href="#hero"
        className="focus-ring"
        style={{
          fontFamily: 'var(--font-jetbrains-mono), JetBrains Mono, monospace',
          fontSize: '18px',
          fontWeight: 600,
          color: 'white',
          textDecoration: 'none',
        }}
      >
        <span style={{ color: 'var(--cyan)' }}>asimov</span>.academy
      </a>

      <ul
        className="nav-links"
        style={{
          display: 'flex',
          gap: '32px',
          listStyle: 'none',
        }}
      >
        {navItems.map(([item, href]) => (
          <li key={item}>
            <a
              href={href}
              className="nav-link focus-ring"
              style={{
                fontSize: '14px',
                color: 'var(--muted)',
                textDecoration: 'none',
                transition: 'color .2s',
              }}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-actions" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <a
          href="https://asimov.academy"
          className="btn-ghost focus-ring"
          style={{
            fontFamily: 'inherit',
            fontSize: '14px',
            color: 'var(--muted)',
            textDecoration: 'none',
            transition: 'color .2s',
          }}
        >
          Entrar
        </a>
        <a
          href="https://asimov.academy"
          className="btn-nav focus-ring"
          style={{
            fontFamily: 'inherit',
            fontSize: '14px',
            color: 'white',
            background: 'none',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '8px 16px',
            textDecoration: 'none',
            transition: 'border-color .2s, background .2s',
          }}
        >
          Matricule-se
        </a>
      </div>

      <button
        ref={buttonRef}
        type="button"
        className="nav-menu-button focus-ring"
        aria-label={isMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsMenuOpen((value) => !value)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      <div
        id="mobile-navigation"
        className={`mobile-menu ${isMenuOpen ? 'is-open' : ''}`}
        hidden={!isMenuOpen}
      >
        {navItems.map(([item, href]) => (
          <a
            key={item}
            href={href}
            className="focus-ring"
            onClick={() => setIsMenuOpen(false)}
          >
            {item}
          </a>
        ))}
        <div className="mobile-menu-actions">
          <a
            href="https://asimov.academy"
            className="focus-ring"
            onClick={() => setIsMenuOpen(false)}
          >
            Entrar
          </a>
          <a
            href="https://asimov.academy"
            className="focus-ring"
            onClick={() => setIsMenuOpen(false)}
          >
            Matricule-se
          </a>
        </div>
      </div>
    </nav>
  )
}

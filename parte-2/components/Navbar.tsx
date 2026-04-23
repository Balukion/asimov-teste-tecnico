export default function Navbar() {
  return (
    <nav
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
        href="#"
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
        {['Formações', 'Trilhas', 'Cursos', 'Projetos'].map((item) => (
          <li key={item}>
            <a
              href="#"
              className="nav-link"
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

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <button
          className="btn-ghost"
          style={{
            fontFamily: 'inherit',
            fontSize: '14px',
            color: 'var(--muted)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            transition: 'color .2s',
          }}
        >
          Entrar
        </button>
        <button
          className="btn-nav"
          style={{
            fontFamily: 'inherit',
            fontSize: '14px',
            color: 'white',
            background: 'none',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '8px 16px',
            cursor: 'pointer',
            transition: 'border-color .2s, background .2s',
          }}
        >
          Matricule-se
        </button>
      </div>
    </nav>
  )
}

'use client'

import { useEffect, useRef } from 'react'
import ChatCard from './ChatCard'

// ── Design tokens ──────────────────────────────────────────────────────────────
const ORB_SIZE      = 335
const ORB_INTENSITY = 1.0
const ORB_ROT_SPEED = 2
const ACCENT: [number, number, number] = [0, 229, 160]

const AURORA_PALETTE: [number, number, number][] = [
  [0, 229, 160],
  [0, 200, 220],
  [80, 120, 255],
  [139, 92, 246],
  [180, 60, 220],
]

type Particle = {
  x: number; y: number
  driftVx: number; driftVy: number
  r: number; brightness: number
  ci: number; cPhase: number
}

const BULLETS = [
  '+40 horas de conteúdo direto ao ponto',
  'Projetos com Python + IA desde o módulo 1',
  'Suporte da comunidade com +20.000 alunos',
  'Certificado reconhecido pelo mercado',
]

// ── Component ──────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const pCanvasRef = useRef<HTMLCanvasElement>(null)
  const oCanvasRef = useRef<HTMLCanvasElement>(null)
  const mouse      = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const pCanvas = pCanvasRef.current
    const oCanvas = oCanvasRef.current
    if (!pCanvas || !oCanvas) return

    const pCtx = pCanvas.getContext('2d')!
    const oCtx = oCanvas.getContext('2d')!
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let pW = 0, pH = 0
    let oW = 0, oH = 0
    let particles: Particle[] = []
    let rotAngle = 0
    let pRafId   = 0
    let oRafId   = 0

    const isMobile = window.innerWidth < 768
    const FRAME_MS = 1000 / (isMobile ? 30 : 60)
    let lastFrame  = 0
    let isRunning = false

    if (prefersReducedMotion) {
      const particleCanvas = pCanvas
      const orbCanvas = oCanvas

      function drawStaticScene() {
        pW = particleCanvas.width = particleCanvas.offsetWidth
        pH = particleCanvas.height = particleCanvas.offsetHeight
        oW = orbCanvas.width = orbCanvas.offsetWidth
        oH = orbCanvas.height = orbCanvas.offsetHeight

        pCtx.clearRect(0, 0, pW, pH)
        oCtx.clearRect(0, 0, oW, oH)

        const cx = oW / 2
        const cy = oH - ORB_SIZE * 0.25
        const gradient = oCtx.createRadialGradient(cx, cy, 0, cx, cy, ORB_SIZE)
        gradient.addColorStop(0, 'rgba(0,229,160,0.18)')
        gradient.addColorStop(0.55, 'rgba(139,92,246,0.12)')
        gradient.addColorStop(1, 'rgba(7,8,15,0)')
        oCtx.fillStyle = gradient
        oCtx.beginPath()
        oCtx.arc(cx, cy, ORB_SIZE, 0, Math.PI * 2)
        oCtx.fill()
      }

      const staticObserver = new ResizeObserver(drawStaticScene)
      staticObserver.observe(particleCanvas)
      staticObserver.observe(orbCanvas)
      drawStaticScene()

      return () => staticObserver.disconnect()
    }

    // ── Mouse tracking ──
    const onMouseMove = (e: MouseEvent) => { mouse.current.x = e.clientX; mouse.current.y = e.clientY }
    window.addEventListener('mousemove', onMouseMove)

    // ── Particles ──────────────────────────────────────────────────────────────
    function spawnParticles() {
      const density = isMobile ? 12000 : 5000
      const count   = Math.floor((pW * pH) / density)
      const orbCx   = pW / 2
      const orbCy   = pH - ORB_SIZE * 0.25
      const safeR   = ORB_SIZE * 1.1

      particles = Array.from({ length: count }, () => {
        let hx = 0, hy = 0, attempts = 0
        do {
          hx = Math.random() * pW
          hy = Math.random() * pH
          const ox = hx - orbCx, oy = hy - orbCy
          if (Math.sqrt(ox * ox + oy * oy) > safeR) break
        } while (++attempts < 20)

        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 0.25 + 0.05
        const ci    = Math.floor(Math.random() * AURORA_PALETTE.length)
        return {
          x: hx, y: hy,
          driftVx: Math.cos(angle) * speed,
          driftVy: Math.sin(angle) * speed,
          r: Math.random() * 1.4 + 0.3,
          brightness: Math.random() * 0.6 + 0.1,
          ci, cPhase: Math.random() * Math.PI * 2,
        }
      })
    }

    function drawParticles(ts = 0) {
      if (!isRunning) return
      pRafId = requestAnimationFrame(drawParticles)
      if (ts - lastFrame < FRAME_MS) return
      lastFrame = ts

      pCtx.clearRect(0, 0, pW, pH)
      const t  = ts * 0.0004
      const mx = mouse.current.x
      const my = mouse.current.y
      const orbCx = pW / 2
      const orbCy = pH - ORB_SIZE * 0.25
      const FLEE_R = 140, FLEE_F = 0.8, CONN_D = 90

      for (const p of particles) {
        p.x += p.driftVx
        p.y += p.driftVy

        // mouse flee
        const dx = p.x - mx, dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < FLEE_R && dist > 0) {
          const force = (1 - dist / FLEE_R) * FLEE_F
          p.x += (dx / dist) * force
          p.y += (dy / dist) * force
        }

        // orb repulsion
        const odx = p.x - orbCx, ody = p.y - orbCy
        const od = Math.sqrt(odx * odx + ody * ody)
        const repelR = ORB_SIZE * 1.15
        if (od < repelR && od > 0) {
          const push = Math.pow(1 - od / repelR, 1.8) * 3.5
          p.x += (odx / od) * push
          p.y += (ody / od) * push
        }

        // wrap
        if (p.x < -4) p.x = pW + 4
        if (p.x > pW + 4) p.x = -4
        if (p.y < -4) p.y = pH + 4
        if (p.y > pH + 4) p.y = -4

        // occlusion fade inside orb
        const dOrb = Math.sqrt((p.x - orbCx) ** 2 + (p.y - orbCy) ** 2)
        const fade = dOrb < ORB_SIZE
          ? Math.max(0, (dOrb - ORB_SIZE * 0.7) / (ORB_SIZE * 0.3))
          : 1
        if (fade <= 0) continue

        // aurora shimmer — blend between adjacent palette colours
        const shimmer = (Math.sin(t + p.cPhase) + 1) / 2
        const [r1, g1, b1] = AURORA_PALETTE[p.ci]
        const [r2, g2, b2] = AURORA_PALETTE[(p.ci + 1) % AURORA_PALETTE.length]
        const r = Math.round(r1 + (r2 - r1) * shimmer)
        const g = Math.round(g1 + (g2 - g1) * shimmer)
        const b = Math.round(b1 + (b2 - b1) * shimmer)

        const mdist = Math.sqrt((p.x - mx) ** 2 + (p.y - my) ** 2)
        const glow  = Math.max(0, 1 - mdist / (FLEE_R * 2))
        const alpha = (p.brightness + glow * 0.6) * fade

        pCtx.beginPath()
        pCtx.arc(p.x, p.y, p.r + glow * 1.8, 0, Math.PI * 2)
        pCtx.fillStyle = `rgba(${r},${g},${b},${alpha})`
        pCtx.fill()
      }

      // sparse connections (max 2 per particle, 90px range)
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        const adx = a.x - orbCx, ady = a.y - orbCy
        if (Math.sqrt(adx * adx + ady * ady) < ORB_SIZE * 0.7) continue
        let conns = 0
        for (let j = i + 1; j < particles.length; j++) {
          if (conns >= 2) break
          const q  = particles[j]
          const dx = a.x - q.x, dy = a.y - q.y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d >= CONN_D) continue
          const qdx = q.x - orbCx, qdy = q.y - orbCy
          if (Math.sqrt(qdx * qdx + qdy * qdy) < ORB_SIZE * 0.85) continue
          const sh  = (Math.sin(t + a.cPhase) + 1) / 2
          const [r1, g1, b1] = AURORA_PALETTE[a.ci]
          const [r2, g2, b2] = AURORA_PALETTE[(a.ci + 1) % AURORA_PALETTE.length]
          const cr = Math.round(r1 + (r2 - r1) * sh)
          const cg = Math.round(g1 + (g2 - g1) * sh)
          const cb = Math.round(b1 + (b2 - b1) * sh)
          pCtx.beginPath()
          pCtx.moveTo(a.x, a.y)
          pCtx.lineTo(q.x, q.y)
          pCtx.strokeStyle = `rgba(${cr},${cg},${cb},${(1 - d / CONN_D) * 0.15})`
          pCtx.lineWidth = 0.5
          pCtx.stroke()
          conns++
        }
      }
    }

    function resizeP() {
      if (!pCanvas) return
      pW = pCanvas.width  = pCanvas.offsetWidth
      pH = pCanvas.height = pCanvas.offsetHeight
      spawnParticles()
    }

    const pObs = new ResizeObserver(resizeP)
    pObs.observe(pCanvas)
    resizeP()

    // ── Rotating orb ───────────────────────────────────────────────────────────
    function drawOrb() {
      if (!isRunning) return
      oRafId = requestAnimationFrame(drawOrb)
      oCtx.clearRect(0, 0, oW, oH)

      const [r, g, b] = ACCENT
      const R  = ORB_SIZE
      const cx = oW / 2
      const cy = oH - R * 0.25
      const mx = mouse.current.x
      const my = mouse.current.y

      rotAngle += (ORB_ROT_SPEED / 1000) * 0.4

      const ROWS = 28, COLS = 56

      for (let row = 0; row < ROWS; row++) {
        const phi    = (row / (ROWS - 1)) * Math.PI
        const sinPhi = Math.sin(phi)
        const cosPhi = Math.cos(phi)
        const rowR   = R * sinPhi
        const rowCols = Math.max(1, Math.round(COLS * sinPhi))

        for (let col = 0; col < rowCols; col++) {
          const theta = (col / rowCols) * Math.PI * 2 + rotAngle
          const x3 = Math.cos(theta) * rowR
          const y3 = cosPhi * R
          const z3 = Math.sin(theta) * rowR
          const px = cx + x3
          const py = cy + y3 * 0.9 - z3 * 0.05

          if (py > oH + 4) continue

          const facing  = (Math.cos(theta) * sinPhi + 1) / 2
          const base    = 0.05 + facing * 0.22

          const dx   = px - mx, dy = py - my
          const dist = Math.sqrt(dx * dx + dy * dy)
          const glow = Math.max(0, 1 - dist / (R * 0.65))
          const boost = glow * glow * ORB_INTENSITY
          const alpha  = Math.min(1, base + boost)
          const dotR   = 1.2 + glow * 2.5

          // blend accent → violet on dark side
          const mix = glow
          const rr = Math.round(r * (0.5 + 0.5 * mix) + 139 * (0.5 - 0.5 * mix))
          const gg = Math.round(g * (0.5 + 0.5 * mix) +  92 * (0.5 - 0.5 * mix))
          const bb = Math.round(b * (0.5 + 0.5 * mix) + 246 * (0.5 - 0.5 * mix))

          oCtx.beginPath()
          oCtx.arc(px, py, dotR, 0, Math.PI * 2)
          oCtx.fillStyle = `rgba(${rr},${gg},${bb},${alpha})`
          oCtx.fill()

          if (glow > 0.45) {
            const gr = oCtx.createRadialGradient(px, py, 0, px, py, dotR * 6)
            gr.addColorStop(0, `rgba(${r},${g},${b},${glow * 0.14})`)
            gr.addColorStop(1, 'rgba(0,0,0,0)')
            oCtx.beginPath()
            oCtx.arc(px, py, dotR * 6, 0, Math.PI * 2)
            oCtx.fillStyle = gr
            oCtx.fill()
          }
        }
      }
    }

    function resizeO() {
      if (!oCanvas) return
      oW = oCanvas.width  = oCanvas.offsetWidth
      oH = oCanvas.height = oCanvas.offsetHeight
    }

    const oObs = new ResizeObserver(resizeO)
    oObs.observe(oCanvas)
    resizeO()

    function startAnimations() {
      if (isRunning || document.hidden) return
      isRunning = true
      pRafId = requestAnimationFrame(drawParticles)
      oRafId = requestAnimationFrame(drawOrb)
    }

    function stopAnimations() {
      isRunning = false
      cancelAnimationFrame(pRafId)
      cancelAnimationFrame(oRafId)
    }

    function onVisibilityChange() {
      if (document.hidden) stopAnimations()
      else startAnimations()
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    startAnimations()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      stopAnimations()
      pObs.disconnect()
      oObs.disconnect()
    }
  }, [])

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="hero-section"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '700px',
        paddingTop: '64px',
        overflow: 'hidden',
        background: '#07080f',
      }}
    >
      {/* Layer 1 — aurora particles */}
      <canvas
        ref={pCanvasRef}
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}
      />

      {/* Layer 2 — rotating orb */}
      <canvas
        ref={oCanvasRef}
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }}
      />

      {/* Layer 3 — bottom fade */}
      <div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '140px',
          background: 'linear-gradient(to bottom, transparent, #07080f)',
          zIndex: 3, pointerEvents: 'none',
        }}
      />

      {/* Layer 4 — two-column content grid */}
      <div
        className="hero-grid"
        style={{
          position: 'absolute',
          top: '64px', left: 0, right: 0,
          zIndex: 4,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          alignItems: 'start',
          maxWidth: '1160px',
          margin: '0 auto',
          padding: '40px 48px 0',
          width: '100%',
        }}
      >
        {/* Left column — copy */}
        <div
          className="hero-copy"
          style={{
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(135deg, rgba(7,8,15,0.72) 0%, rgba(7,8,15,0.45) 100%)',
            backdropFilter: 'blur(2px)',
            borderRadius: '16px',
            padding: '32px',
            border: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(0,229,160,.08)',
              border: '1px solid rgba(0,229,160,.22)',
              borderRadius: '100px',
              padding: '6px 14px',
              fontSize: '13px',
              color: 'var(--cyan)',
              marginBottom: '26px',
              alignSelf: 'flex-start',
              letterSpacing: '.01em',
            }}
          >
            <div className="badge-dot" aria-hidden="true" />
            Python + IA · Curso mais prático do Brasil
          </div>

          {/* Headline */}
          <h1
            id="hero-title"
            style={{
              fontSize: 'clamp(30px, 3.6vw, 54px)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-.03em',
              marginBottom: '18px',
              textShadow: '0 2px 24px rgba(0,0,0,.8)',
            }}
          >
            Aprenda Python do zero e construa projetos reais{' '}
            <em
              style={{
                fontStyle: 'normal',
                background: 'linear-gradient(135deg, var(--cyan) 0%, var(--violet) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              com IA
            </em>
          </h1>

          {/* Subheadline */}
          <p
            style={{
              fontSize: 'clamp(14px, 1.4vw, 17px)',
              color: 'var(--muted)',
              lineHeight: 1.65,
              marginBottom: '32px',
              fontWeight: 500,
              maxWidth: '420px',
              textShadow: '0 1px 12px rgba(0,0,0,.9)',
            }}
          >
            O curso mais prático do Brasil para quem quer entrar em tecnologia sem enrolação.
          </p>

          {/* Bullets */}
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '13px', listStyle: 'none' }}>
            {BULLETS.map((text) => (
              <li
                key={text}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '11px',
                  fontSize: '14.5px',
                  color: '#d8deef',
                  textShadow: '0 1px 10px rgba(0,0,0,.9)',
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    flexShrink: 0,
                    background: 'rgba(0,229,160,.10)',
                    border: '1px solid rgba(0,229,160,.30)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg viewBox="0 0 11 11" fill="none" width={10} height={10} aria-hidden="true" focusable="false">
                    <polyline
                      points="2,6 4.5,8.5 9,3"
                      stroke="var(--cyan)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* Right column — chat mock */}
        <div
          className="hero-right"
          style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' }}
        >
          <ChatCard />
        </div>
      </div>

      {/* Layer 5 — CTAs over the orb */}
      <div
        className="hero-ctas"
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: '10%',
          zIndex: 5,
          display: 'flex',
          gap: '14px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        <a
          href="https://asimov.academy"
          className="btn-primary focus-ring"
          style={{
            fontFamily: 'inherit',
            fontSize: '15px',
            fontWeight: 600,
            color: '#07080f',
            background: 'var(--cyan)',
            border: 'none',
            borderRadius: '10px',
            padding: '14px 28px',
            textDecoration: 'none',
            transition: 'transform .15s, box-shadow .2s',
            boxShadow: '0 0 28px rgba(0,229,160,.4)',
          }}
        >
          Quero começar agora
        </a>
        <a
          href="#cursos"
          className="btn-secondary focus-ring"
          style={{
            fontFamily: 'inherit',
            fontSize: '15px',
            fontWeight: 500,
            color: 'white',
            background: 'rgba(255,255,255,.06)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            padding: '14px 28px',
            textDecoration: 'none',
            backdropFilter: 'blur(8px)',
            transition: 'background .2s, border-color .2s',
          }}
        >
          Ver o que vou aprender →
        </a>
      </div>
    </section>
  )
}

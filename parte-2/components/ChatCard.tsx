'use client'

import { useEffect, useRef } from 'react'

const CHAT_SEQUENCE = [
  { type: 'show', id: 'ctx-1',    delay: 300  },
  { type: 'show', id: 'ctx-2',    delay: 200  },
  { type: 'show', id: 'msg-1',    delay: 500  },
  { type: 'show', id: 'typing-1', delay: 900  },
  { type: 'hide', id: 'typing-1', delay: 1700 },
  { type: 'show', id: 'msg-2',    delay: 0    },
  { type: 'show', id: 'msg-3',    delay: 1400 },
  { type: 'show', id: 'typing-2', delay: 800  },
  { type: 'hide', id: 'typing-2', delay: 1500 },
  { type: 'show', id: 'msg-4',    delay: 0    },
] as const

const ALL_IDS = ['ctx-1', 'ctx-2', 'msg-1', 'msg-2', 'msg-3', 'msg-4', 'typing-1', 'typing-2']

export default function ChatCard() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      ALL_IDS.forEach((id) => {
        if (!id.startsWith('typing')) {
          root.querySelector(`[data-cid="${id}"]`)?.classList.add('visible')
        }
      })
      return
    }

    const timeouts: ReturnType<typeof setTimeout>[] = []
    let interval: ReturnType<typeof setInterval> | undefined

    function runChat() {
      timeouts.splice(0).forEach(clearTimeout)
      ALL_IDS.forEach((id) => root?.querySelector(`[data-cid="${id}"]`)?.classList.remove('visible'))

      let t = 0
      CHAT_SEQUENCE.forEach((step) => {
        t += step.delay
        const h = setTimeout(() => {
          const el = root?.querySelector(`[data-cid="${step.id}"]`)
          if (step.type === 'show') el?.classList.add('visible')
          else el?.classList.remove('visible')
        }, t)
        timeouts.push(h)
      })
    }

    runChat()
    interval = setInterval(runChat, 18000)

    return () => {
      timeouts.splice(0).forEach(clearTimeout)
      if (interval) clearInterval(interval)
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className="chat-card"
      aria-label="Exemplo de conversa com a assistente Asimov AI"
      style={{
        width: '100%',
        maxWidth: '380px',
        background: '#0c0d18',
        border: '1px solid var(--border)',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 20px 56px rgba(0,0,0,.7), 0 0 40px rgba(0,229,160,.04)',
        fontFamily: 'var(--font-jetbrains-mono), JetBrains Mono, monospace',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '58vh',
      }}
    >
      {/* Titlebar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '9px 14px',
          borderBottom: '1px solid var(--border)',
          background: '#0a0b16',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#ff5f57', display: 'block' }} />
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#febc2e', display: 'block' }} />
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#28c840', display: 'block' }} />
          </div>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--muted)',
              letterSpacing: '.1em',
              textTransform: 'uppercase',
            }}
          >
            Chat
          </span>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".4">
            <line x1="7" y1="2" x2="7" y2="12" /><line x1="2" y1="7" x2="12" y2="7" />
          </svg>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".4">
            <circle cx="7" cy="7" r="5" /><path d="M7 5v2l1.5 1.5" />
          </svg>
        </div>
      </div>

      {/* Context pills */}
      <div
        style={{
          display: 'flex',
          gap: '6px',
          padding: '8px 12px',
          borderBottom: '1px solid var(--border)',
          background: '#0a0b16',
          flexWrap: 'wrap',
          flexShrink: 0,
        }}
      >
        <CtxPill cid="ctx-1" label="main.py" />
        <CtxPill cid="ctx-2" label="requirements.txt" />
      </div>

      {/* Messages */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
        <Msg cid="msg-1" who="user">Como conecto uma API ao meu projeto Python?</Msg>

        <Typing cid="typing-1" />

        <Msg cid="msg-2" who="ai">
          <>
            Use a biblioteca{' '}
            <InlineCode>requests</InlineCode>. Já está no seu{' '}
            <InlineCode>requirements.txt</InlineCode>:
            <CodeBlock />
          </>
        </Msg>

        <Msg cid="msg-3" who="user">Como processo esses dados com IA?</Msg>

        <Typing cid="typing-2" />

        <Msg cid="msg-4" who="ai">
          No módulo 3 usamos OpenAI com seus próprios dados. Você já está no caminho certo.
        </Msg>
      </div>

      {/* Input bar */}
      <div
        style={{
          padding: '10px 12px',
          borderTop: '1px solid var(--border)',
          background: '#0a0b16',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', gap: '5px' }}>
          <InputPill label="main.py" />
          <InputPill label="módulo-3" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif', fontSize: '12px', color: '#8b94bd' }}>
            Ask followup…
          </span>
          <span style={{ fontSize: '10px', color: '#818bb3' }}>↵ enviar</span>
        </div>
      </div>
    </div>
  )
}

function CtxPill({ cid, label }: { cid: string; label: string }) {
  return (
    <div
      data-cid={cid}
      className="ctx-pill"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        background: 'rgba(0,229,160,.07)',
        border: '1px solid rgba(0,229,160,.18)',
        borderRadius: '5px',
        padding: '3px 8px',
        fontSize: '10.5px',
        color: 'var(--cyan)',
      }}
    >
      <span style={{ fontSize: '9px', opacity: 0.7 }}>⊞</span>
      {label}
    </div>
  )
}

function Msg({ cid, who, children }: { cid: string; who: 'user' | 'ai'; children: React.ReactNode }) {
  return (
    <div
      data-cid={cid}
      className="chat-msg"
      style={{
        padding: '12px 14px',
        borderBottom: '1px solid rgba(30,35,64,.4)',
      }}
    >
      <div
        style={{
          fontSize: '10.5px',
          fontWeight: 600,
          letterSpacing: '.06em',
          textTransform: 'uppercase',
          marginBottom: '6px',
          color: who === 'user' ? 'var(--violet)' : 'var(--cyan)',
        }}
      >
        {who === 'user' ? 'Você' : 'Asimov AI'}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif',
          fontSize: '12.5px',
          color: '#b8c0de',
          lineHeight: 1.65,
        }}
      >
        {children}
      </div>
    </div>
  )
}

function Typing({ cid }: { cid: string }) {
  return (
    <div
      data-cid={cid}
      className="chat-typing"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        padding: '10px 14px',
        fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif',
        fontSize: '12px',
        color: 'var(--muted)',
      }}
    >
      <span className="typing-dot" />
      <span className="typing-dot" />
      <span className="typing-dot" />
    </div>
  )
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code
      style={{
        background: '#07080f',
        padding: '1px 5px',
        borderRadius: '3px',
        color: 'var(--cyan)',
        fontFamily: 'var(--font-jetbrains-mono), JetBrains Mono, monospace',
        fontSize: '11px',
      }}
    >
      {children}
    </code>
  )
}

function CodeBlock() {
  return (
    <div
      style={{
        fontFamily: 'var(--font-jetbrains-mono), JetBrains Mono, monospace',
        fontSize: '11px',
        background: '#07080f',
        border: '1px solid #1a1d30',
        borderRadius: '6px',
        padding: '10px 12px',
        marginTop: '8px',
        lineHeight: 1.75,
      }}
    >
      <span style={{ color: '#ff79c6' }}>import</span>{' '}
      <span style={{ color: '#8be9fd' }}>requests</span>
      <br />
      <span style={{ color: '#7f8aaa' }}># requisição GET</span>
      <br />
      {'r = requests.'}
      <span style={{ color: '#50fa7b' }}>get</span>
      {'('}
      <span style={{ color: '#f1fa8c' }}>&quot;https://api.exemplo.com&quot;</span>
      {')'}
      <br />
      <span style={{ color: '#50fa7b' }}>print</span>
      {'(r.'}
      <span style={{ color: '#50fa7b' }}>json</span>
      {'())'}
    </div>
  )
}

function InputPill({ label }: { label: string }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '10px',
        color: 'var(--muted)',
        background: 'rgba(255,255,255,.04)',
        border: '1px solid var(--border)',
        borderRadius: '4px',
        padding: '2px 6px',
      }}
    >
      <span style={{ color: 'rgba(0,229,160,.7)' }}>⊞</span>
      {label}
    </div>
  )
}

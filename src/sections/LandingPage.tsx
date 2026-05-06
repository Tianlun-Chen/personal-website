import { useEffect, useRef, useState } from 'react'

interface TerminalLine {
  type: 'cmd' | 'output' | 'blank'
  text?: string
  html?: string
}

const terminalLines: TerminalLine[] = [
  { type: 'cmd', text: '$ whoami' },
  { type: 'output', html: '<span class="t-name">Tianlun Chen</span>' },
  { type: 'blank' },
  { type: 'cmd', text: '$ cat about.txt' },
  { type: 'output', html: '<span class="t-line-text">Informatics: Data Science</span>' },
  { type: 'output', html: '<span class="t-line-text">Exploring the intersection of AI,</span>' },
  { type: 'output', html: '<span class="t-line-text">data, and human-centered technology</span>' },
  { type: 'output', html: '<span class="t-line-text">Building meaningful user experiences</span>' },
  { type: 'blank' },
  { type: 'cmd', text: '$ ls skills/' },
  { type: 'output', html: '<span class="t-skills">python  machine-learning  data-viz  PM</span>' },
  { type: 'blank' },
  { type: 'cmd', text: '$ echo "1 person + AI = 1 team"' },
  { type: 'output', html: '<span class="t-echo">1 person + AI = 1 team</span>' },
]

interface LandingPageProps {
  onEnter: () => void
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const lineElsRef = useRef<{ el: HTMLDivElement; data: TerminalLine }[]>([])
  const lineIdxRef = useRef(0)
  const isTypingRef = useRef(false)
  const [terminalReady, setTerminalReady] = useState(false)
  const [typingDone, setTypingDone] = useState(false)

  // Typewriter effect
  useEffect(() => {
    if (!bodyRef.current) return
    if (isTypingRef.current) return
    isTypingRef.current = true

    const body = bodyRef.current
    body.innerHTML = ''
    lineElsRef.current = []
    lineIdxRef.current = 0

    terminalLines.forEach((line) => {
      const div = document.createElement('div')
      div.className = 't-line'
      if (line.type === 'blank') div.innerHTML = '&nbsp;'
      lineElsRef.current.push({ el: div, data: line })
      body.appendChild(div)
    })

    const cursorLine = document.createElement('div')
    cursorLine.className = 't-line visible'
    cursorLine.innerHTML = '<span class="t-cursor"></span>'
    cursorLine.style.opacity = '0'
    body.appendChild(cursorLine)

    const typeText = (el: HTMLDivElement, text: string, speed: number, cb: () => void) => {
      const parts = text.match(/^(\$\s)(.*)/)
      if (parts) {
        el.innerHTML = '<span class="t-dollar">$ </span>'
        const rest = parts[2]
        let i = 0
        const tc = () => {
          if (i < rest.length) {
            el.innerHTML = '<span class="t-dollar">$ </span><span class="t-cmd-text">' + rest.substring(0, i + 1) + '</span>'
            i++
            setTimeout(tc, speed + Math.random() * 30)
          } else cb()
        }
        tc()
      } else {
        let i = 0
        el.textContent = ''
        const tc = () => {
          if (i < text.length) {
            el.textContent += text[i]
            i++
            setTimeout(tc, speed)
          } else cb()
        }
        tc()
      }
    }

    const nextLine = () => {
      if (lineIdxRef.current >= lineElsRef.current.length) {
        cursorLine.style.opacity = '1'
        setTypingDone(true)
        return
      }
      const { el, data } = lineElsRef.current[lineIdxRef.current]
      el.classList.add('visible')
      lineIdxRef.current++
      if (data.type === 'blank') {
        setTimeout(nextLine, 200)
      } else if (data.type === 'cmd') {
        typeText(el, data.text!, 45, () => setTimeout(nextLine, 350))
      } else if (data.type === 'output') {
        el.innerHTML = '<span class="t-prompt">&gt; </span>'
        setTimeout(() => {
          el.innerHTML = '<span class="t-prompt">&gt; </span>' + data.html!
          setTimeout(nextLine, 250)
        }, 120)
      }
    }

    const timer = setTimeout(nextLine, 500)
    return () => clearTimeout(timer)
  }, [])

  // Keyboard listener
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && typingDone) onEnter()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [typingDone, onEnter])

  useEffect(() => {
    const t = setTimeout(() => setTerminalReady(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center relative"
      style={{ background: '#0f0f0f', padding: '2rem' }}
    >
      {/* MacBook container */}
      <div
        className="w-full flex flex-col items-center"
        style={{
          maxWidth: '960px',
          opacity: terminalReady ? 1 : 0,
          transform: terminalReady ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* MacBook top lid (silver frame) */}
        <div
          className="w-full relative"
          style={{
            background: '#e8e8e8',
            borderRadius: '24px 24px 0 0',
            padding: '8px 8px 0',
            boxShadow: `
              0 0 0 1px rgba(0,0,0,0.08),
              0 0 0 2px rgba(255,255,255,0.3) inset,
              0 40px 120px rgba(0,0,0,0.5)
            `,
          }}
        >
          {/* Inner bezel */}
          <div
            className="relative"
            style={{
              background: '#1a1a1a',
              borderRadius: '16px 16px 0 0',
              padding: '10px 10px 0',
            }}
          >
            {/* Webcam */}
            <div className="flex justify-center" style={{ marginBottom: '6px' }}>
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#0a0a0a',
                  border: '1px solid #222',
                }}
              />
            </div>

            {/* SCREEN — fixed height with generous bottom breathing room */}
            <div
              className="relative"
              style={{
                background: '#0f0f0f',
                borderRadius: '4px 4px 0 0',
                height: '560px',
                overflow: 'hidden',
              }}
            >
              {/* Terminal content */}
              <div
                ref={bodyRef}
                className="font-mono"
                style={{
                  padding: '28px 36px 60px',
                  fontSize: 'clamp(13px, 1.4vw, 15px)',
                  lineHeight: 1.75,
                  color: '#fafaf8',
                  minHeight: '100%',
                }}
              />

              {/* Cartoon Avatar — inside the screen, bottom-right */}
              <div
                className="hidden md:block"
                style={{
                  position: 'absolute',
                  right: '24px',
                  bottom: '40px',
                  width: '130px',
                  animation: 'avatarBob 3s ease-in-out infinite',
                }}
              >
                <img
                  src="/avatar-cartoon.png"
                  alt="Tianlun's cartoon avatar"
                  className="w-full h-auto"
                  style={{
                    borderRadius: '16px',
                    filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.5))',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* MacBook bottom lip */}
        <div
          className="w-full relative"
          style={{
            height: '28px',
            background: 'linear-gradient(to bottom, #d0d0d0 0%, #c0c0c0 30%, #e0e0e0 50%, #b8b8b8 80%, #a8a8a8 100%)',
            borderRadius: '0 0 4px 4px',
            boxShadow: '0 2px 0 rgba(255,255,255,0.3) inset',
          }}
        >
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              top: '0',
              width: '100px',
              height: '8px',
              background: 'linear-gradient(to bottom, #a0a0a0, #888)',
              borderRadius: '0 0 10px 10px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.15) inset',
            }}
          />
        </div>

        {/* MacBook base */}
        <div
          style={{
            height: '10px',
            background: 'linear-gradient(to bottom, #999, #777)',
            borderRadius: '0 0 20px 20px',
            width: 'calc(100% - 20px)',
            margin: '0 auto',
          }}
        />

        {/* Shadow */}
        <div
          style={{
            width: '85%',
            height: '20px',
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.35) 0%, transparent 70%)',
            margin: '-4px auto 0',
            filter: 'blur(8px)',
          }}
        />
      </div>

      {/* Press Enter prompt */}
      <div
        className="mt-8 flex flex-col items-center gap-3"
        style={{
          opacity: typingDone ? 1 : 0,
          transform: typingDone ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        <div
          className="font-mono text-sm flex items-center gap-3"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          <span style={{ animation: 'blink 2s ease-in-out infinite' }}>
            Press Enter to continue
          </span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '3px 10px',
              borderRadius: '5px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.4)',
              fontSize: '11px',
            }}
          >
            Enter
          </span>
        </div>
      </div>

      {/* Click overlay */}
      {typingDone && (
        <button
          onClick={onEnter}
          className="absolute inset-0 w-full h-full cursor-default"
          style={{ background: 'transparent', zIndex: 1 }}
          aria-label="Press Enter to continue"
        />
      )}

      <style>{`
        .t-line {
          opacity: 0;
          white-space: pre-wrap;
          word-break: break-all;
          transition: opacity 0.1s ease;
          margin-bottom: 2px;
        }
        .t-line.visible { opacity: 1; }
        .t-dollar { color: #FF6B6B; }
        .t-cmd-text { color: #8b949e; }
        .t-prompt { color: #666; }
        .t-name {
          color: #fafaf8;
          font-weight: 600;
          font-size: 1.1em;
        }
        .t-line-text { color: #8b949e; }
        .t-skills {
          color: #FF6B6B;
          font-weight: 500;
          letter-spacing: 0.02em;
        }
        .t-echo {
          color: #FF6B6B;
          font-weight: 600;
          font-size: 1.05em;
        }
        .t-cursor {
          display: inline-block;
          width: 0.6em;
          height: 1.15em;
          background: #FF6B6B;
          vertical-align: text-bottom;
          animation: cursor-blink 1s step-end infinite;
        }
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes avatarBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  )
}

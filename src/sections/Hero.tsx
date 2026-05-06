import { useEffect, useRef, useState } from 'react'

interface TerminalLine {
  type: 'cmd' | 'output' | 'blank'
  text?: string
  html?: string
}

const terminalLines: TerminalLine[] = [
  { type: 'cmd', text: '$ whoami' },
  { type: 'output', html: '<span class="terminal-output">Tianlun Chen</span>' },
  { type: 'blank' },
  { type: 'cmd', text: '$ cat about.txt' },
  { type: 'output', html: '<span class="terminal-output">UW Informatics \u00b7 Sophomore \u00b7 INTJ</span>' },
  { type: 'output', html: '<span class="terminal-output">Passionate about design, technology, and meaningful user experiences</span>' },
  { type: 'output', html: '<span class="terminal-link">\ud83d\udc9a About me below</span>' },
  { type: 'blank' },
  { type: 'cmd', text: '$ echo "Design + Code = \u2665"' },
  { type: 'output', html: '<span class="terminal-highlight">\u2728</span>' },
]

export default function Hero() {
  const bodyRef = useRef<HTMLDivElement>(null)
  const cursorLineRef = useRef<HTMLDivElement | null>(null)
  const lineElsRef = useRef<{ el: HTMLDivElement; data: TerminalLine }[]>([])
  const lineIdxRef = useRef(0)
  const isTypingRef = useRef(false)
  const [terminalVisible, setTerminalVisible] = useState(false)
  const [showScroll, setShowScroll] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Entrance animation for terminal window
    const timer = setTimeout(() => {
      setTerminalVisible(true)
    }, 200)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!terminalVisible) return
    if (!bodyRef.current) return
    if (isTypingRef.current) return

    isTypingRef.current = true
    lineIdxRef.current = 0
    const body = bodyRef.current
    body.innerHTML = ''
    lineElsRef.current = []

    // Create line elements
    terminalLines.forEach((line) => {
      const div = document.createElement('div')
      div.className = 'terminal-line'
      if (line.type === 'blank') {
        div.innerHTML = '&nbsp;'
      }
      lineElsRef.current.push({ el: div, data: line })
      body.appendChild(div)
    })

    // Create cursor line
    const cursorLine = document.createElement('div')
    cursorLine.className = 'terminal-line visible'
    cursorLine.innerHTML = '<span class="terminal-cursor"></span>'
    cursorLine.style.opacity = '0'
    cursorLineRef.current = cursorLine
    body.appendChild(cursorLine)

    const typeText = (el: HTMLDivElement, text: string, speed: number, callback: () => void) => {
      const parts = text.match(/^(\$\s)(.*)/)
      if (parts) {
        el.innerHTML = '<span class="terminal-dollar">$ </span>'
        const restText = parts[2]
        let charIdx = 0

        const typeChar = () => {
          if (charIdx < restText.length) {
            el.innerHTML = '<span class="terminal-dollar">$ </span><span class="terminal-cmd-text">' + restText.substring(0, charIdx + 1) + '</span>'
            charIdx++
            setTimeout(typeChar, speed + Math.random() * 30)
          } else {
            if (callback) callback()
          }
        }
        typeChar()
      } else {
        el.textContent = ''
        let charIdx = 0
        const typeChar = () => {
          if (charIdx < text.length) {
            el.textContent += text[charIdx]
            charIdx++
            setTimeout(typeChar, speed)
          } else {
            if (callback) callback()
          }
        }
        typeChar()
      }
    }

    const typeNextLine = () => {
      if (lineIdxRef.current >= lineElsRef.current.length) {
        setTimeout(() => {
          setShowScroll(true)
        }, 200)
        return
      }

      const { el, data } = lineElsRef.current[lineIdxRef.current]
      el.classList.add('visible')
      lineIdxRef.current++

      if (data.type === 'blank') {
        setTimeout(typeNextLine, 200)
        return
      }

      if (data.type === 'cmd') {
        typeText(el, data.text!, 50, () => {
          setTimeout(typeNextLine, 400)
        })
      } else if (data.type === 'output') {
        el.innerHTML = '<span class="terminal-prompt">> </span>'
        setTimeout(() => {
          el.innerHTML = '<span class="terminal-prompt">> </span>' + data.html!
          setTimeout(typeNextLine, 250)
        }, 150)
      }
    }

    const startDelay = setTimeout(typeNextLine, 600)

    return () => {
      clearTimeout(startDelay)
    }
  }, [terminalVisible])

  // Parallax on scroll
  useEffect(() => {
    const terminal = terminalRef.current
    if (!terminal) return

    const handleScroll = () => {
      const st = window.pageYOffset
      if (st < window.innerHeight) {
        const ratio = st / window.innerHeight
        terminal.style.transform = `translateY(${st * 0.3}px)`
        terminal.style.opacity = String(1 - ratio * 0.5)
      } else {
        terminal.style.opacity = '0.5'
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        height: '100vh',
        background: '#2D3436',
        padding: '2rem',
      }}
    >
      <div
        ref={terminalRef}
        className="w-full transition-all duration-800"
        style={{
          maxWidth: '720px',
          opacity: terminalVisible ? 1 : 0,
          transform: terminalVisible ? 'translateY(0)' : 'translateY(30px)',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          transitionDuration: '0.8s',
        }}
      >
        <div
          style={{
            background: 'rgba(26, 26, 26, 0.9)',
            borderRadius: '12px',
            boxShadow: '0 20px 80px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.06)',
            overflow: 'hidden',
          }}
        >
          {/* Terminal header */}
          <div
            className="flex items-center gap-2 px-4"
            style={{
              height: '44px',
              background: '#1c2129',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <div className="flex gap-2">
              <span className="block w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
              <span className="block w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
              <span className="block w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
            </div>
            <div
              className="flex-1 text-center font-mono text-xs"
              style={{ color: 'rgba(255, 255, 255, 0.35)', marginRight: '52px' }}
            >
              tianlun@portfolio ~ %
            </div>
          </div>

          {/* Terminal body */}
          <div
            ref={bodyRef}
            className="font-mono"
            style={{
              padding: '32px 36px 40px',
              fontSize: 'clamp(13px, 1.2vw, 15px)',
              lineHeight: 1.8,
              color: '#FFFDF8',
              minHeight: '280px',
            }}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{
          opacity: showScroll ? 1 : 0,
          transform: showScroll ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(10px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
      >
        <span
          className="text-xs uppercase tracking-[0.2em] font-light"
          style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '12px' }}
        >
          Scroll
        </span>
        <div
          className="animate-scroll-pulse"
          style={{
            width: '1px',
            height: '40px',
            background: '#FF6B6B',
            opacity: 0.4,
          }}
        />
      </div>
    </section>
  )
}

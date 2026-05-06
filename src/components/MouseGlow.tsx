import { useEffect, useRef } from 'react'

export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const rafRef = useRef<number>(0)
  const isTouch = useRef(false)

  useEffect(() => {
    isTouch.current = window.matchMedia('(hover: none)').matches
    if (isTouch.current) return

    const glow = glowRef.current
    if (!glow) return

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.targetX = e.clientX
      posRef.current.targetY = e.clientY
      glow.style.opacity = '1'
    }

    const animate = () => {
      posRef.current.x += (posRef.current.targetX - posRef.current.x) * 0.08
      posRef.current.y += (posRef.current.targetY - posRef.current.y) * 0.08
      glow.style.left = posRef.current.x + 'px'
      glow.style.top = posRef.current.y + 'px'
      rafRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', handleMouseMove)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null
  }

  return (
    <div
      ref={glowRef}
      style={{
        position: 'fixed',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 107, 107, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%, -50%)',
        transition: 'opacity 0.3s ease',
        opacity: 0,
        left: 0,
        top: 0,
      }}
    />
  )
}

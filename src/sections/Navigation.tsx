import { useEffect, useState, useRef } from 'react'
import type Lenis from 'lenis'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Courses', href: '#courses' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

interface NavigationProps {
  lenis: React.RefObject<Lenis | null>
}

export default function Navigation({ lenis }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.pageYOffset > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection('#' + entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: '-64px 0px 0px 0px' }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileOpen(false)
    if (lenis.current) {
      lenis.current.scrollTo(href, { offset: -64 })
    } else {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ease-out"
      style={{
        height: '64px',
        background: scrolled ? 'rgba(255, 253, 248, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
      }}
    >
      <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between px-6">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            if (lenis.current) lenis.current.scrollTo(0)
            else window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="font-semibold text-base transition-colors duration-300"
          style={{ color: scrolled ? '#2D3436' : '#FFFDF8' }}
        >
          Tianlun Chen
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="relative text-sm font-normal transition-all duration-300"
              style={{
                color: scrolled ? '#2D3436' : '#FFFDF8',
                paddingLeft: activeSection === link.href ? '14px' : '0',
              }}
            >
              {activeSection === link.href && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-coral transition-all duration-300"
                />
              )}
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-5 h-0.5 transition-all duration-300"
            style={{
              background: scrolled ? '#2D3436' : '#FFFDF8',
              transform: mobileOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
            }}
          />
          <span
            className="block w-5 h-0.5 transition-all duration-300"
            style={{
              background: scrolled ? '#2D3436' : '#FFFDF8',
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-5 h-0.5 transition-all duration-300"
            style={{
              background: scrolled ? '#2D3436' : '#FFFDF8',
              transform: mobileOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 py-4 px-6 flex flex-col gap-4"
          style={{
            background: 'rgba(255, 253, 248, 0.98)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-normal text-graphite py-2"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

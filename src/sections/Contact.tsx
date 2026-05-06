import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const contactLinks = [
  { label: 'Email', href: 'mailto:tianlun@example.com' },
  { label: 'GitHub', href: '#' },
  { label: 'LinkedIn', href: '#' },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current

    if (!section || !content) return

    const ctx = gsap.context(() => {
      const children = content.querySelectorAll('.animate-item')
      gsap.from(children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: content,
          start: 'top 75%',
          once: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative"
      style={{
        background: '#2D3436',
        padding: 'clamp(80px, 10vw, 120px) 2rem',
      }}
    >
      <div ref={contentRef} className="max-w-[800px] mx-auto text-center">
        <h2
          className="animate-item font-extrabold"
          style={{
            color: '#FFFDF8',
            fontSize: 'clamp(36px, 5vw, 56px)',
            lineHeight: 1.1,
          }}
        >
          Let's Connect
        </h2>
        <p
          className="animate-item font-light mt-4"
          style={{
            color: 'rgba(255, 253, 248, 0.6)',
            fontSize: '18px',
          }}
        >
          I'm always open to interesting conversations.
        </p>

        {/* Contact links */}
        <div className="animate-item flex flex-wrap items-center justify-center gap-8 mt-12">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-base font-normal transition-colors duration-300 hover:text-coral"
              style={{
                color: 'rgba(255, 253, 248, 0.7)',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div
          className="animate-item mx-auto mt-16"
          style={{
            width: '60px',
            height: '1px',
            background: 'rgba(255, 255, 255, 0.1)',
          }}
        />

        {/* Quote */}
        <p
          className="animate-item font-light italic mt-10"
          style={{
            color: 'rgba(255, 253, 248, 0.35)',
            fontSize: '16px',
            lineHeight: 1.8,
          }}
        >
          &ldquo;The best way to predict the future is to invent it.&rdquo;
          <br />
          <span className="not-italic">&mdash; Alan Kay</span>
        </p>
      </div>
    </section>
  )
}

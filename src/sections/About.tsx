import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const tags = ['UX Design', 'Web Development', 'Data Visualization', 'Human-Computer Interaction']

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const borderRef = useRef<HTMLSpanElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const border = borderRef.current
    const leftCol = leftColRef.current
    const rightCol = rightColRef.current

    if (!section || !border || !leftCol || !rightCol) return

    const ctx = gsap.context(() => {
      // Hairline border draw
      gsap.to(border, {
        scaleX: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 90%',
          once: true,
        },
      })

      // Left column content stagger
      const leftChildren = leftCol.querySelectorAll('.animate-item')
      gsap.from(leftChildren, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: leftCol,
          start: 'top 80%',
          once: true,
        },
      })

      // Right column image
      gsap.from(rightCol, {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rightCol,
          start: 'top 80%',
          once: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative"
      style={{
        background: '#FFFDF8',
        padding: 'clamp(80px, 10vw, 120px) 2rem',
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section heading */}
        <div ref={headingRef} className="section-heading">
          <span
            ref={borderRef}
            className="heading-border block"
            style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
          />
          <span
            className="animate-item font-semibold uppercase tracking-[0.15em]"
            style={{ color: '#636E72', fontSize: '14px' }}
          >
            ABOUT
          </span>
          <h2
            className="animate-item font-extrabold mt-6"
            style={{
              color: '#2D3436',
              fontSize: 'clamp(36px, 5vw, 64px)',
              lineHeight: 1.1,
            }}
          >
            你好，我是天纶
          </h2>
        </div>

        {/* Two-column layout */}
        <div
          className="grid gap-10 mt-16"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          }}
        >
          {/* Left column - Bio */}
          <div ref={leftColRef} className="flex flex-col gap-6">
            <div className="animate-item" style={{ fontSize: '18px', lineHeight: 1.7, color: '#2D3436' }}>
              <p>
                我是陈天纶（Tianlun Chen），<span style={{ color: '#FF6B6B', fontWeight: 600 }}>华盛顿大学</span>信息学专业（Informatics）的大二学生。我对设计与技术的交叉领域充满热情，致力于创造有意义、有温度的用户体验。
              </p>
              <p className="mt-4">
                我相信原型开发的力量——通过动手构建来思考，而不仅仅是思考后再构建。我的方法结合扎实的技术功底与敏锐的设计直觉，让我能够在工程与设计之间架起桥梁。
              </p>
              <p className="mt-4">
                在课堂之外，我喜欢探索新工具、参与项目实践，并不断挑战自己学习新事物。
              </p>
            </div>

            {/* Tags */}
            <div className="animate-item flex flex-wrap gap-3 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono uppercase"
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.05em',
                    border: '1px solid rgba(255, 107, 107, 0.3)',
                    borderRadius: '4px',
                    padding: '4px 10px',
                    color: '#FF6B6B',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right column - Portrait */}
          <div ref={rightColRef}>
            <img
              src="/portrait.jpg"
              alt="Tianlun Chen portrait"
              className="w-full"
              style={{
                borderRadius: '16px',
                boxShadow: '0 8px 40px rgba(0, 0, 0, 0.08)',
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

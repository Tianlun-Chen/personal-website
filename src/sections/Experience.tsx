import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    year: '2024 - Now',
    title: '华盛顿大学 \u00b7 信息学专业',
    description: '主修信息学，深入学习用户体验设计、数据可视化、前端开发和人机交互。GPA 3.8/4.0',
    dotColor: '#FF6B6B',
  },
  {
    year: '2024',
    title: 'UX 设计实习 \u00b7 某科技公司',
    description: '参与产品用户研究，设计交互原型，协助完成从调研到高保真原型的完整设计流程',
    dotColor: '#E85555',
  },
  {
    year: '2023',
    title: '个人项目探索期',
    description: '自学前端开发，完成多个小型 Web 项目，建立对设计与技术交汇的深入理解',
    dotColor: '#636E72',
  },
  {
    year: '2023',
    title: '进入华盛顿大学',
    description: '从社区大学转入 UW，开始信息学专业的系统学习，确定了 UX Engineering 的方向',
    dotColor: 'rgba(45, 52, 54, 0.4)',
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const borderRef = useRef<HTMLSpanElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const border = borderRef.current
    const items = itemsRef.current

    if (!section || !border || !items) return

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

      // Timeline items stagger in from left
      const itemEls = items.querySelectorAll('.timeline-item')
      gsap.from(itemEls, {
        x: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: items,
          start: 'top 80%',
          once: true,
        },
      })

      // Dots spring animation
      const dots = items.querySelectorAll('.timeline-dot')
      gsap.from(dots, {
        scale: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: items,
          start: 'top 80%',
          once: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="experience"
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
            className="font-semibold uppercase tracking-[0.15em]"
            style={{ color: '#636E72', fontSize: '14px' }}
          >
            EXPERIENCE
          </span>
          <h2
            className="font-extrabold mt-4"
            style={{
              color: '#2D3436',
              fontSize: 'clamp(32px, 4vw, 48px)',
              lineHeight: 1.1,
            }}
          >
            经历与成长
          </h2>
          <p
            className="font-light mt-3"
            style={{ color: '#636E72', fontSize: '20px' }}
          >
            从探索到专注，每一步都算数
          </p>
        </div>

        {/* Timeline */}
        <div ref={itemsRef} className="relative mt-16" style={{ paddingLeft: '3rem' }}>
          {/* Timeline line */}
          <div
            className="absolute top-0 bottom-0"
            style={{
              left: '6px',
              width: '2px',
              background: 'linear-gradient(to bottom, #FF6B6B, #636E72)',
            }}
          />

          {/* Timeline items */}
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="timeline-item relative"
              style={{ marginBottom: index < experiences.length - 1 ? '3rem' : 0 }}
            >
              {/* Dot */}
              <div
                className="timeline-dot absolute"
                style={{
                  left: '-3rem',
                  top: '0.5rem',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  border: `3px solid ${exp.dotColor}`,
                  background: '#FFFDF8',
                  zIndex: 1,
                }}
              />

              {/* Content */}
              <div className="font-mono text-sm" style={{ color: '#636E72', marginBottom: '4px', letterSpacing: '0.05em' }}>
                {exp.year}
              </div>
              <h3 className="font-semibold" style={{ color: '#2D3436', fontSize: '22px', lineHeight: 1.3 }}>
                {exp.title}
              </h3>
              <p
                className="font-normal mt-2"
                style={{ color: '#636E72', fontSize: '16px', lineHeight: 1.6 }}
              >
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

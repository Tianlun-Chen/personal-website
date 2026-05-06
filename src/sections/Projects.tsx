import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    name: 'Personal Portfolio Website',
    description: '设计并开发了这个个人作品集网站，使用 React + TypeScript + Tailwind CSS，包含终端动画和滚动动效',
    accent: '#FF6B6B',
    emoji: '\u2728',
    tags: ['React', 'TypeScript', 'Tailwind'],
  },
  {
    name: 'UW Course Explorer',
    description: '一个课程探索工具，帮助 UW 学生发现和规划课程，提供课程评价和时间表可视化',
    accent: '#4ECDC4',
    emoji: '\ud83d\udcda',
    tags: ['React', 'API', 'Data Viz'],
  },
  {
    name: 'Habit Tracker App',
    description: '习惯追踪应用，通过数据可视化帮助用户建立和维持良好习惯，包含 streak 统计和提醒功能',
    accent: '#FFE66D',
    emoji: '\ud83c\udfaf',
    tags: ['UX Design', 'Mobile'],
  },
  {
    name: 'Weather Dashboard',
    description: '交互式天气仪表盘，实时展示天气数据，支持多城市切换和图表可视化',
    accent: '#A8E6CF',
    emoji: '\u26c5',
    tags: ['JavaScript', 'Chart.js'],
  },
  {
    name: 'Redesign Concept \u00b7 Campus App',
    description: '对校园应用进行重新设计的概念项目，包括用户研究、信息架构和高保真原型',
    accent: '#FF8B94',
    emoji: '\ud83c\udfa8',
    tags: ['Figma', 'User Research'],
  },
  {
    name: 'Data Visualization Project',
    description: '将复杂数据集转化为直观的可视化图表，探索不同的视觉编码方式',
    accent: '#FF6B6B',
    emoji: '\ud83d\udcca',
    tags: ['D3.js', 'Data Viz'],
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const borderRef = useRef<HTMLSpanElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const border = borderRef.current
    const grid = gridRef.current

    if (!section || !border || !grid) return

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

      // Cards stagger in from bottom
      const cards = grid.querySelectorAll('.project-card')
      gsap.from(cards, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 80%',
          once: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="projects"
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
            PROJECTS
          </span>
          <h2
            className="font-extrabold mt-4"
            style={{
              color: '#2D3436',
              fontSize: 'clamp(32px, 4vw, 48px)',
              lineHeight: 1.1,
            }}
          >
            项目作品
          </h2>
          <p
            className="font-light mt-3"
            style={{ color: '#636E72', fontSize: '20px' }}
          >
            用代码和设计解决问题
          </p>
        </div>

        {/* Project cards grid */}
        <div
          ref={gridRef}
          className="grid gap-8 mt-16"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 480px), 1fr))',
          }}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card overflow-hidden transition-all duration-400"
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDuration: '0.4s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.transform = 'translateY(-6px)'
                el.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.1)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.06)'
              }}
            >
              {/* Accent block */}
              <div
                className="flex items-center justify-center"
                style={{
                  height: '160px',
                  background: project.accent,
                  fontSize: '64px',
                }}
              >
                {project.emoji}
              </div>

              {/* Content */}
              <div style={{ padding: '28px' }}>
                <h3
                  className="font-bold"
                  style={{ color: '#2D3436', fontSize: '24px', lineHeight: 1.2 }}
                >
                  {project.name}
                </h3>
                <p
                  className="font-normal mt-3"
                  style={{ color: '#636E72', fontSize: '15px', lineHeight: 1.6 }}
                >
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono uppercase"
                      style={{
                        fontSize: '10px',
                        border: '1px solid rgba(45, 52, 54, 0.15)',
                        borderRadius: '4px',
                        padding: '4px 10px',
                        color: '#636E72',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

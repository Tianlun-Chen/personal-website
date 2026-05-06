import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const courses = [
  {
    code: 'INFO 200',
    name: 'Intellectual Foundations of Informatics',
    description: '信息学的理论基础，学习信息、技术与社会之间的相互关系',
    tags: ['Core', 'Theory'],
  },
  {
    code: 'INFO 201',
    name: 'Technical Foundations',
    description: 'Python 编程基础，数据处理与分析入门',
    tags: ['Programming', 'Data'],
  },
  {
    code: 'INFO 202',
    name: 'Computational Reasoning',
    description: '计算思维，算法逻辑与问题解决',
    tags: ['Algorithms', 'Logic'],
  },
  {
    code: 'INFO 230',
    name: 'Methods for Human-Centered Design',
    description: '以人为本的设计方法，用户研究与原型设计',
    tags: ['UX', 'Research'],
  },
  {
    code: 'INFO 250',
    name: 'Information Architecture',
    description: '信息架构，组织与结构化信息的艺术',
    tags: ['IA', 'Design'],
  },
  {
    code: 'INFO 300',
    name: 'Research Methods',
    description: '定性与定量研究方法，实验设计与数据分析',
    tags: ['Research', 'Methods'],
  },
  {
    code: 'INFO 310',
    name: 'Information Systems Analysis',
    description: '信息系统分析，需求评估与系统设计',
    tags: ['Systems', 'Analysis'],
  },
  {
    code: 'INFO 330',
    name: 'Database Systems',
    description: '数据库原理与 SQL，数据建模与管理',
    tags: ['Database', 'SQL'],
  },
]

export default function Courses() {
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
      const cards = grid.querySelectorAll('.course-card')
      gsap.from(cards, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
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
      id="courses"
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
            COURSES
          </span>
          <h2
            className="font-extrabold mt-4"
            style={{
              color: '#2D3436',
              fontSize: 'clamp(32px, 4vw, 48px)',
              lineHeight: 1.1,
            }}
          >
            相关课程
          </h2>
          <p
            className="font-light mt-3"
            style={{ color: '#636E72', fontSize: '20px' }}
          >
            构建知识体系的每一块砖
          </p>
        </div>

        {/* Course cards grid */}
        <div
          ref={gridRef}
          className="grid gap-6 mt-16"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
          }}
        >
          {courses.map((course, index) => (
            <div
              key={index}
              className="course-card transition-all duration-300"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(45, 52, 54, 0.08)',
                borderRadius: '16px',
                padding: '28px',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.transform = 'translateY(-4px)'
                el.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.08)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.04)'
              }}
            >
              {/* Course code */}
              <span
                className="font-mono uppercase"
                style={{
                  fontSize: '11px',
                  color: '#FF6B6B',
                  letterSpacing: '0.05em',
                }}
              >
                {course.code}
              </span>

              {/* Course name */}
              <h3
                className="font-semibold mt-2"
                style={{ color: '#2D3436', fontSize: '20px', lineHeight: 1.3 }}
              >
                {course.name}
              </h3>

              {/* Description */}
              <p
                className="font-normal mt-3"
                style={{ color: '#636E72', fontSize: '15px', lineHeight: 1.6 }}
              >
                {course.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {course.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono"
                    style={{
                      fontSize: '10px',
                      color: '#636E72',
                      background: 'rgba(99, 110, 114, 0.08)',
                      borderRadius: '4px',
                      padding: '3px 8px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

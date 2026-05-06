const projects = [
  {
    title: 'Wordplay',
    subtitle: 'Collaborative educational platform for interactive programming learning',
    description: 'Contributing to the development of Wordplay, an interactive educational platform designed to make programming more engaging and accessible.\n\nWorking in a collaborative TypeScript codebase, I focus on frontend development, feature iteration, and improving the overall learning experience through usability-driven design decisions.',
    explored: 'Through Wordplay, I gained experience working in a collaborative development environment, navigating large codebases, contributing through GitHub workflows, and thinking more deeply about how users interact with educational tools.',
    link: 'https://wordplay.dev',
    linkLabel: 'wordplay.dev',
    tags: ['TypeScript', 'Frontend', 'Open Source', 'Educational Technology'],
    visual: {
      type: 'gradient' as const,
      style: {
        background: `
          radial-gradient(ellipse 80% 60% at 20% 40%, rgba(199, 210, 254, 0.5) 0%, transparent 60%),
          radial-gradient(ellipse 60% 80% at 80% 60%, rgba(233, 213, 255, 0.4) 0%, transparent 60%),
          linear-gradient(135deg, #f0f0f8 0%, #e8e4f0 50%, #f5f0f8 100%)
        `,
      },
    },
  },
  {
    title: 'Predicting Social Media Virality',
    subtitle: 'Machine learning analysis of engagement patterns and short-form content virality',
    description: 'Developing a data science project exploring how engagement behaviors, content features, and user interaction patterns influence Instagram Reel virality.\n\nUsing statistical analysis, visualization, and machine learning models to investigate which factors most strongly predict viral performance across large-scale social media datasets.',
    explored: 'The project involves data cleaning, exploratory analysis, feature engineering, model experimentation, and interpreting feature importance through machine learning workflows.\n\nThrough this process, I\u2019m gaining hands-on experience with Python, pandas, scikit-learn, statistical reasoning, and collaborative development using GitHub.',
    focus: ['feature importance', 'engagement prediction', 'statistical modeling', 'machine learning workflows'],
    tags: ['Machine Learning', 'Data Science', 'Python', 'scikit-learn', 'Visualization'],
    visual: {
      type: 'gradient' as const,
      style: {
        background: `
          radial-gradient(ellipse 70% 70% at 30% 30%, rgba(255, 180, 160, 0.3) 0%, transparent 60%),
          radial-gradient(ellipse 60% 50% at 70% 70%, rgba(255, 200, 180, 0.25) 0%, transparent 60%),
          linear-gradient(160deg, #faf5f2 0%, #f0e8e4 50%, #f8f0ec 100%)
        `,
      },
    },
  },
]

export default function ProjectsPage() {
  return (
    <div>
      {/* Heading */}
      <h1
        className="font-bold"
        style={{ fontSize: '40px', lineHeight: 1.1, color: '#1a1a1a' }}
      >
        Projects
      </h1>
      <p
        className="mt-3"
        style={{ fontSize: '16px', color: '#888', lineHeight: 1.6 }}
      >
        Building and exploring AI-native experiences.
      </p>

      {/* Project cards — single column for emphasis */}
      <div className="flex flex-col" style={{ gap: '48px', marginTop: '48px' }}>
        {projects.map((project, index) => (
          <div
            key={index}
            className="overflow-hidden transition-all duration-400"
            style={{
              background: '#fff',
              borderRadius: '18px',
              boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDuration: '0.4s',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 2px 20px rgba(0,0,0,0.04)'
            }}
          >
            {/* Visual header — abstract gradient */}
            <div
              style={{
                height: '160px',
                ...project.visual.style,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Subtle geometric overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `
                    radial-gradient(circle at 20% 50%, rgba(255,255,255,0.4) 0%, transparent 40%),
                    radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 35%)
                  `,
                }}
              />
            </div>

            {/* Content */}
            <div style={{ padding: '32px' }}>
              {/* Title */}
              <h2
                className="font-semibold"
                style={{ fontSize: '24px', color: '#1a1a1a', lineHeight: 1.25 }}
              >
                {project.title}
              </h2>

              {/* Subtitle */}
              <p
                className="mt-1"
                style={{ fontSize: '14px', color: '#aaa', lineHeight: 1.5 }}
              >
                {project.subtitle}
              </p>

              {/* Description */}
              <div className="mt-5" style={{ maxWidth: '640px' }}>
                {project.description.split('\n\n').map((paragraph, i) => (
                  <p
                    key={i}
                    style={{
                      fontSize: '15px',
                      color: '#555',
                      lineHeight: 1.7,
                      marginTop: i > 0 ? '12px' : 0,
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* What I Explored */}
              <div
                className="mt-6"
                style={{
                  background: '#fafaf8',
                  borderRadius: '10px',
                  padding: '18px 20px',
                  border: '1px solid #f0f0ec',
                }}
              >
                <div
                  className="font-mono text-xs uppercase"
                  style={{
                    color: '#FF6B6B',
                    letterSpacing: '0.08em',
                    marginBottom: '8px',
                    fontWeight: 500,
                  }}
                >
                  What I Explored
                </div>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#666',
                    lineHeight: 1.65,
                  }}
                >
                  {project.explored}
                </p>
              </div>

              {/* Current Focus — only for project 2 */}
              {project.focus && (
                <div className="mt-4">
                  <div
                    className="font-mono text-xs uppercase"
                    style={{
                      color: '#bbb',
                      letterSpacing: '0.06em',
                      marginBottom: '10px',
                      fontWeight: 500,
                    }}
                  >
                    Current Focus
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.focus.map((item) => (
                      <span
                        key={item}
                        style={{
                          fontSize: '12px',
                          color: '#777',
                          background: '#f5f5f5',
                          borderRadius: '20px',
                          padding: '5px 14px',
                          letterSpacing: '0.02em',
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono"
                    style={{
                      fontSize: '11px',
                      color: '#aaa',
                      background: '#f6f6f6',
                      borderRadius: '5px',
                      padding: '4px 10px',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* External Link */}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 transition-colors duration-200"
                  style={{
                    fontSize: '14px',
                    color: '#888',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#FF6B6B'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#888'
                  }}
                >
                  <span>{project.linkLabel}</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

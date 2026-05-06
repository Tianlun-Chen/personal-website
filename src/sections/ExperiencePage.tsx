const experiences = [
  {
    date: '2026.03 — Present',
    role: 'Undergraduate Teaching Assistant',
    org: 'INFO110: Fundamental of AI',
    paragraphs: [
      'Supporting students in UW\'s AI Fundamentals course through discussions, office hours, and feedback focused on AI systems, LLMs, and human-AI interaction.',
      'Helping students explore practical uses of AI agents while encouraging critical thinking around emerging technologies.',
    ],
    tags: ['AI Systems', 'LLMs', 'Human-AI Interaction', 'Teaching'],
  },
  {
    date: '2024.10 — Present',
    role: 'Informatics Student',
    org: 'University of Washington',
    paragraphs: [
      'Studying Informatics with growing interests in AI-native technologies, intelligent systems, and human-centered computing.',
      'Exploring machine learning, data science, UI/UX design, frontend development, and emerging AI workflows through coursework and independent experimentation.',
    ],
    gpa: 'GPA 3.95 / 4.0',
    tags: ['AI Native', 'Data Science', 'Frontend', 'Human-AI Interaction'],
  },
  {
    date: '2025.09 — 2026.03',
    role: 'Student Coordinator',
    org: 'UW HFS',
    paragraphs: [
      'Coordinated daily operations in a fast-paced campus environment while supporting workflow efficiency, team communication, and employee training.',
      'Developed strong adaptability and collaboration skills through high-volume service operations and real-time problem solving.',
    ],
    tags: ['Operations', 'Team Coordination', 'Communication', 'Problem Solving'],
  },
  {
    date: '2024.10 — Present',
    role: 'Planning Department',
    org: 'Organization of Hua Classmates',
    paragraphs: [
      'Helped organize student community events and academic activities designed to connect underclassmen with peers, resources, and major-related guidance.',
      'Contributed to planning initiatives that encouraged collaboration, mentorship, and shared learning experiences.',
    ],
    tags: ['Community Building', 'Event Planning', 'Collaboration'],
  },
]

export default function ExperiencePage() {
  return (
    <div>
      {/* Heading */}
      <h1
        className="font-bold"
        style={{ fontSize: '40px', lineHeight: 1.1, color: '#1a1a1a' }}
      >
        Experience
      </h1>
      <p
        className="mt-3"
        style={{ fontSize: '16px', color: '#888', lineHeight: 1.6 }}
      >
        Growing through people, systems, and emerging technologies.
      </p>

      {/* Timeline */}
      <div className="relative mt-12" style={{ paddingLeft: '2rem' }}>
        {/* Vertical line */}
        <div
          className="absolute"
          style={{
            left: '6px',
            top: '8px',
            bottom: '24px',
            width: '1px',
            background: 'linear-gradient(to bottom, #ddd 0%, #eee 60%, transparent 100%)',
          }}
        />

        {experiences.map((exp, index) => (
          <div
            key={index}
            className="relative"
            style={{ marginBottom: index < experiences.length - 1 ? '48px' : 0 }}
          >
            {/* Dot */}
            <div
              className="absolute"
              style={{
                left: '-2rem',
                top: '6px',
                width: '13px',
                height: '13px',
                borderRadius: '50%',
                border: `2px solid ${index === 0 ? '#FF6B6B' : '#ddd'}`,
                background: '#fff',
                zIndex: 1,
              }}
            />

            {/* Date */}
            <div
              className="font-mono text-xs"
              style={{
                color: '#bbb',
                letterSpacing: '0.02em',
                marginBottom: '6px',
              }}
            >
              {exp.date}
            </div>

            {/* Role + Org */}
            <h3
              className="font-semibold"
              style={{
                fontSize: '20px',
                color: '#1a1a1a',
                lineHeight: 1.3,
              }}
            >
              {exp.role}
            </h3>
            <div
              className="font-medium"
              style={{
                fontSize: '14px',
                color: '#999',
                marginTop: '2px',
              }}
            >
              {exp.org}
            </div>

            {/* Narrative paragraphs */}
            <div className="mt-4" style={{ maxWidth: '640px' }}>
              {exp.paragraphs.map((p, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: '15px',
                    color: '#555',
                    lineHeight: 1.7,
                    marginTop: i > 0 ? '10px' : 0,
                  }}
                >
                  {p}
                </p>
              ))}
              {/* GPA — if present, on its own line */}
              {(exp as any).gpa && (
                <p
                  style={{
                    fontSize: '14px',
                    color: '#aaa',
                    lineHeight: 1.7,
                    marginTop: '12px',
                    letterSpacing: '0.02em',
                  }}
                >
                  {(exp as any).gpa}
                </p>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono"
                  style={{
                    fontSize: '11px',
                    color: '#aaa',
                    background: '#f5f5f5',
                    borderRadius: '5px',
                    padding: '4px 10px',
                    letterSpacing: '0.02em',
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
  )
}

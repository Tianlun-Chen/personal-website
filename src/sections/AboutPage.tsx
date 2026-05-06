export default function AboutPage() {
  const tags = ['AI AGENTS', 'AGENTIC WORKFLOWS', 'INTELLIGENT INTERFACES', 'DATA VISUALIZATION']

  return (
    <div>
      {/* Heading */}
      <h1
        className="font-bold"
        style={{ fontSize: '40px', lineHeight: 1.1, color: '#1a1a1a' }}
      >
        I'm Tianlun Chen
      </h1>

      {/* Portrait */}
      <div className="mt-10">
        <img
          src="/avatar-cartoon.png"
          alt="Tianlun Chen"
          className="w-full"
          style={{
            maxWidth: '300px',
            borderRadius: '16px',
          }}
        />
      </div>

      {/* Bio */}
      <div className="mt-10" style={{ fontSize: '16px', lineHeight: 1.75, color: '#333' }}>
        <p>
          Hi, I'm Tianlun Chen, a sophomore studying{' '}
          <a
            href="https://ischool.uw.edu"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#FF6B6B',
              fontWeight: 600,
              textDecoration: 'none',
              borderBottom: '1px solid rgba(255,107,107,0.3)',
              transition: 'border-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderBottomColor = '#FF6B6B'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderBottomColor = 'rgba(255,107,107,0.3)'
            }}
          >
            Informatics
          </a>
          {' '}at the University of Washington.
        </p>

        <p className="mt-5">
          I'm passionate about AI-native technologies and the rapidly evolving world of
          AI agents, intelligent tools, and human-AI interaction. What excites me most
          about AI is the constant process of exploration, experimenting with new workflows,
          combining different tools and skills, and discovering better ways to think,
          build, and create.
        </p>

        <p className="mt-5">
          Working with AI often feels playful in the best way possible. I enjoy testing
          ideas, trying unfamiliar tools, and staying curious as the technology evolves
          almost every day. That sense of experimentation has become a core part of how
          I learn, solve problems, and approach digital experiences.
        </p>

        <p className="mt-5">
          Recently, I've been exploring machine learning, frontend development, and
          data-driven applications, while developing a growing interest in AI agents
          and AI-native product experiences.
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-10">
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
  )
}

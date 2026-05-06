const courses = [
  {
    title: 'Intermediate Data Programming',
    code: 'CSE 163',
    description: 'Developed practical data programming and computational problem-solving skills through Python, machine learning, and real-world data workflows.',
    detail: 'Worked with structured, textual, and spatial datasets while exploring tools such as pandas and scikit-learn.',
    tags: ['Python', 'Machine Learning', 'Data Programming'],
  },
  {
    title: 'Databases and Data Modeling',
    code: 'INFO 330',
    description: 'Explored how relational databases and structured data systems support scalable applications and information-driven decision making.',
    detail: 'Learned SQL, schema design, entity relationships, and the foundations of data architecture.',
    tags: ['SQL', 'Databases', 'Data Modeling', 'Systems'],
  },
  {
    title: 'Core Methods in Data Science',
    code: 'INFO 370',
    description: 'Applied statistical reasoning and data science methods to analyze real-world datasets through modeling, prediction, and interpretation.',
    detail: 'Explored regression, machine learning foundations, and the relationship between data, uncertainty, and decision making.',
    tags: ['Data Science', 'Statistics', 'Modeling', 'Machine Learning'],
  },
  {
    title: 'Product and Information Systems Management',
    code: 'INFO 380',
    description: 'Studied systems thinking, product planning, and user-centered approaches to designing information systems and digital experiences.',
    detail: 'Explored how technical systems, organizational goals, and human needs intersect in product development.',
    tags: ['Systems Thinking', 'Product Design', 'UX', 'Strategy'],
  },
]

export default function CoursesPage() {
  return (
    <div>
      {/* Heading */}
      <h1
        className="font-bold"
        style={{ fontSize: '40px', lineHeight: 1.1, color: '#1a1a1a' }}
      >
        Courses
      </h1>
      <p
        className="mt-3"
        style={{ fontSize: '16px', color: '#888', lineHeight: 1.6 }}
      >
        Courses that shaped the way I think about data, intelligence, systems, and interaction.
      </p>

      {/* Course cards */}
      <div className="mt-14 flex flex-col" style={{ gap: '56px' }}>
        {courses.map((course, index) => (
          <div
            key={index}
            className="group transition-all duration-300"
            style={{
              borderTop: '1px solid #eee',
              paddingTop: '32px',
            }}
          >
            {/* Course number — subtle, secondary */}
            <div
              className="font-mono text-xs"
              style={{
                color: '#999',
                letterSpacing: '0.04em',
                marginBottom: '8px',
              }}
            >
              {course.code}
            </div>

            {/* Course title — primary heading */}
            <h2
              className="font-semibold transition-colors duration-200 group-hover:text-coral"
              style={{
                fontSize: '22px',
                color: '#1a1a1a',
                lineHeight: 1.3,
              }}
            >
              {course.title}
            </h2>

            {/* Description */}
            <p
              className="mt-4"
              style={{
                fontSize: '15px',
                color: '#555',
                lineHeight: 1.7,
                maxWidth: '600px',
              }}
            >
              {course.description}
            </p>

            {/* Detail line */}
            <p
              className="mt-2"
              style={{
                fontSize: '14px',
                color: '#999',
                lineHeight: 1.6,
                maxWidth: '600px',
              }}
            >
              {course.detail}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-5">
              {course.tags.map((tag) => (
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


          </div>
        ))}
      </div>
    </div>
  )
}

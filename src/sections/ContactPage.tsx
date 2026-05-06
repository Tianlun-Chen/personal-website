const contactItems = [
  {
    label: 'Email',
    content: 'tianlun@uw.edu',
    href: 'mailto:tianlun@uw.edu',
  },
  {
    label: 'Seattle',
    content: '+1 206-747-6328',
    href: 'tel:+12067476328',
  },
  {
    label: 'China',
    content: '+86 138-1035-2180',
    href: 'tel:+8613810352180',
  },
]

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center text-center" style={{ paddingTop: '12vh', paddingBottom: '8vh' }}>
      {/* Heading */}
      <h1
        className="font-bold"
        style={{ fontSize: '40px', lineHeight: 1.1, color: '#1a1a1a' }}
      >
        Contact
      </h1>

      {/* Subtitle */}
      <p
        className="mt-3"
        style={{ fontSize: '16px', color: '#888', lineHeight: 1.6 }}
      >
        Open to conversations about AI, technology, design, and new ideas.
      </p>

      {/* Contact items */}
      <div className="flex flex-col items-center" style={{ gap: '32px', marginTop: '56px' }}>
        {contactItems.map((item) => (
          <div key={item.label} className="flex flex-col items-center">
            <span
              className="font-mono text-xs uppercase"
              style={{ color: '#bbb', letterSpacing: '0.08em' }}
            >
              {item.label}
            </span>
            <a
              href={item.href}
              className="mt-1 transition-colors duration-200"
              style={{
                fontSize: '16px',
                color: '#555',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FF6B6B'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#555'
              }}
            >
              {item.content}
            </a>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div
        style={{
          width: '40px',
          height: '1px',
          background: '#eee',
          marginTop: '64px',
        }}
      />

      {/* Reflective section */}
      <p
        className="mt-10"
        style={{
          fontSize: '15px',
          color: '#aaa',
          lineHeight: 1.8,
          maxWidth: '360px',
        }}
      >
        Currently exploring AI-native workflows, interactive systems, and human-centered technology.
      </p>

      {/* Avatar */}
      <div className="mt-12">
        <img
          src={`${import.meta.env.BASE_URL}avatar-cartoon.png`}
          alt="Tianlun"
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            opacity: 0.5,
          }}
        />
      </div>
    </div>
  )
}

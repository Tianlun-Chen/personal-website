import { useState } from 'react'

export type PageId = 'about' | 'experience' | 'courses' | 'projects' | 'contact'

interface NavItem {
  id: PageId
  label: string
  icon: string
}

const navItems: NavItem[] = [
  { id: 'about', label: 'About', icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
  { id: 'experience', label: 'Experience', icon: 'M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z' },
  { id: 'courses', label: 'Courses', icon: 'M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z' },
  { id: 'projects', label: 'Projects', icon: 'M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z' },
  { id: 'contact', label: 'Contact', icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' },
]

interface SidebarProps {
  activePage: PageId
  onPageChange: (page: PageId) => void
  onReturnHome: () => void
}

export default function Sidebar({ activePage, onPageChange, onReturnHome }: SidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <aside
      className="fixed left-0 top-0 h-full flex flex-col items-center z-50"
      style={{
        width: '72px',
        background: '#fafaf8',
        borderRight: '1px solid rgba(0,0,0,0.06)',
        padding: '16px 0',
      }}
    >
      {/* Logo / Home button */}
      <button
        onClick={onReturnHome}
        className="flex items-center justify-center transition-all duration-200 mb-8"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          color: '#999',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(0,0,0,0.04)'
          e.currentTarget.style.color = '#1a1a1a'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = '#999'
        }}
        title="Home"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      </button>

      {/* Divider */}
      <div style={{ width: '24px', height: '1px', background: 'rgba(0,0,0,0.08)', marginBottom: '16px' }} />

      {/* Nav items */}
      <nav className="flex flex-col items-center gap-2 flex-1">
        {navItems.map((item) => {
          const isActive = activePage === item.id
          const isHovered = hoveredItem === item.id

          return (
            <div key={item.id} className="relative">
              <button
                onClick={() => onPageChange(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className="flex items-center justify-center transition-all duration-200"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  color: isActive ? '#1a1a1a' : isHovered ? '#1a1a1a' : '#999',
                  background: isActive ? 'rgba(0,0,0,0.06)' : isHovered ? 'rgba(0,0,0,0.04)' : 'transparent',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d={item.icon} />
                </svg>
              </button>

              {/* Active indicator dot */}
              {isActive && (
                <div
                  className="absolute"
                  style={{
                    right: '-4px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: '#FF6B6B',
                  }}
                />
              )}

              {/* Tooltip */}
              {(isHovered || isActive) && (
                <div
                  className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none"
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    background: '#1a1a1a',
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: 500,
                    zIndex: 100,
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.15s ease',
                  }}
                >
                  {item.label}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Bottom: Cartoon avatar mini */}
      <div className="mt-auto pt-4">
        <img
          src="/avatar-cartoon.png"
          alt="Tianlun"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            objectFit: 'cover',
            opacity: 0.7,
          }}
        />
      </div>
    </aside>
  )
}

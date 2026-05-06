import { useState } from 'react'
import Sidebar, { type PageId } from './Sidebar'
import AboutPage from './AboutPage'
import ExperiencePage from './ExperiencePage'
import CoursesPage from './CoursesPage'
import ProjectsPage from './ProjectsPage'
import ContactPage from './ContactPage'

interface MainLayoutProps {
  onReturnHome: () => void
}

export default function MainLayout({ onReturnHome }: MainLayoutProps) {
  const [activePage, setActivePage] = useState<PageId>('about')
  const [fadeKey, setFadeKey] = useState(0)

  const handlePageChange = (page: PageId) => {
    if (page === activePage) return
    setFadeKey((k) => k + 1)
    setActivePage(page)
  }

  const renderPage = () => {
    switch (activePage) {
      case 'about':
        return <AboutPage />
      case 'experience':
        return <ExperiencePage />
      case 'courses':
        return <CoursesPage />
      case 'projects':
        return <ProjectsPage />
      case 'contact':
        return <ContactPage />
    }
  }

  return (
    <div className="flex h-full w-full" style={{ background: '#fafaf8' }}>
      <Sidebar
        activePage={activePage}
        onPageChange={handlePageChange}
        onReturnHome={onReturnHome}
      />

      {/* Content area */}
      <main
        className="flex-1 h-full overflow-y-auto"
        style={{
          marginLeft: '72px',
          background: '#ffffff',
        }}
      >
        <div
          key={fadeKey}
          className="max-w-[800px] mx-auto"
          style={{
            padding: 'clamp(40px, 5vw, 64px)',
            animation: 'pageFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          {renderPage()}
        </div>
      </main>

      <style>{`
        @keyframes pageFadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

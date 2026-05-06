import { useState, useCallback } from 'react'
import LandingPage from './sections/LandingPage'
import MainLayout from './sections/MainLayout'

type AppView = 'landing' | 'main'

function App() {
  const [view, setView] = useState<AppView>('landing')

  const handleEnter = useCallback(() => {
    setView('main')
  }, [])

  const handleReturnHome = useCallback(() => {
    setView('landing')
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ background: '#0f0f0f' }}>
      {/* Landing Page */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          opacity: view === 'landing' ? 1 : 0,
          pointerEvents: view === 'landing' ? 'auto' : 'none',
          zIndex: view === 'landing' ? 10 : 1,
        }}
      >
        <LandingPage onEnter={handleEnter} />
      </div>

      {/* Main App */}
      <div
        className="absolute inset-0 transition-all duration-500 delay-150"
        style={{
          opacity: view === 'main' ? 1 : 0,
          pointerEvents: view === 'main' ? 'auto' : 'none',
          zIndex: view === 'main' ? 10 : 1,
        }}
      >
        <MainLayout onReturnHome={handleReturnHome} />
      </div>
    </div>
  )
}

export default App

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function TransitionBanner() {
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const banner = bannerRef.current
    if (!banner) return

    const ctx = gsap.context(() => {
      gsap.to(banner, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: banner,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={bannerRef}
      className="relative w-full"
      style={{
        height: '200px',
        background: '#FFE5EC',
      }}
    />
  )
}

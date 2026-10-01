import { useEffect, useState } from 'react'

/**
 * Tracks page scroll progress as a 0-100 percentage, matching the
 * original #scrollBar width behaviour. Also reports whether the page
 * has scrolled past a small threshold, useful for sticky header styling.
 */
export function useScrollProgress(threshold = 10) {
  const [progress, setProgress] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0)
      setScrolled(window.scrollY > threshold)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [threshold])

  return { progress, scrolled }
}

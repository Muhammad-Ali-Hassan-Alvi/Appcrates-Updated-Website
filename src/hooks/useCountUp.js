import { useEffect, useRef } from 'react'
import { useReducedMotion } from './useReducedMotion'

/**
 * Animates a numeric count on the returned ref once it scrolls into view.
 */
export function useCountUp(target, { duration = 1600 } = {}) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const end = Number(target) || 0
    const format = (n) => n.toLocaleString('en-US')
    let raf = 0
    let started = false

    const animate = () => {
      if (started) return
      started = true

      if (reduced) {
        el.textContent = format(end)
        return
      }

      const t0 = performance.now()
      const step = (t) => {
        const p = Math.min((t - t0) / duration, 1)
        el.textContent = format(Math.round(end * (1 - Math.pow(1 - p, 4))))
        if (p < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            animate()
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.4 }
    )
    io.observe(el)

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [target, duration, reduced])

  return ref
}

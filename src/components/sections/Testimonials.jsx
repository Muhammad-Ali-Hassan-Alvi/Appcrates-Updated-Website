import { useCallback, useEffect, useRef, useState } from 'react'
import { TESTIMONIALS } from '../../data/testimonials'
import { useReducedMotion } from '../../hooks/useReducedMotion'

function perViewFor(width) {
  if (width <= 640) return 1
  if (width <= 980) return 2
  return 3
}

export function Testimonials() {
  const reduced = useReducedMotion()
  const viewRef = useRef(null)
  const trackRef = useRef(null)
  const timerRef = useRef(null)
  const touchXRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [perView, setPerView] = useState(() => (typeof window !== 'undefined' ? perViewFor(window.innerWidth) : 3))

  const pages = Math.ceil(TESTIMONIALS.length / perView)

  const goTo = useCallback(
    (i) => {
      const n = pages
      setIndex(((i % n) + n) % n)
    },
    [pages]
  )

  useEffect(() => {
    const onResize = () => setPerView(perViewFor(window.innerWidth))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Reset to first page if page count shrinks below current index.
  useEffect(() => {
    if (index >= pages) setIndex(0)
  }, [pages, index])

  useEffect(() => {
    clearInterval(timerRef.current)
    if (!reduced) {
      timerRef.current = setInterval(() => goTo(index + 1), 5000)
    }
    return () => clearInterval(timerRef.current)
  }, [index, reduced, goTo])

  const first = Math.min(index * perView, TESTIMONIALS.length - perView)
  const translate = -(first * (100 / perView))

  const onMouseEnter = () => clearInterval(timerRef.current)
  const onMouseLeave = () => {
    clearInterval(timerRef.current)
    if (!reduced) timerRef.current = setInterval(() => goTo(index + 1), 5000)
  }
  const onTouchStart = (e) => {
    touchXRef.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchXRef.current === null) return
    const d = e.changedTouches[0].clientX - touchXRef.current
    if (Math.abs(d) > 40) goTo(index + (d < 0 ? 1 : -1))
    touchXRef.current = null
  }

  return (
    <section id="testimonials" className="tc-sec">
      <div className="wrap">
        <div className="tc-head reveal">
          <h2>What our clients say</h2>
        </div>
        <div
          className="tc-viewport reveal"
          id="tcView"
          ref={viewRef}
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="tc-track"
            id="tcTrack"
            ref={trackRef}
            style={{ transform: `translateX(${translate}%)` }}
          >
            {TESTIMONIALS.map((t, i) => (
              <div className={`tc v${(i % 3) + 1}`} key={i}>
                <div className="tc-box">
                  <div className="tc-back"></div>
                  <div className="tc-front"></div>
                  <div className="tc-inner">
                    <h3>{t[0]}</h3>
                    <span className="tc-role">{t[1]}</span>
                    <span className="tc-q" aria-hidden="true">&ldquo;</span>
                    <p>{t[2]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="tc-dots" id="tcDots">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              className={i === index ? 'on' : ''}
              aria-label={`Show testimonials ${i + 1}`}
              onClick={() => goTo(i)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  )
}

import { useEffect, useRef } from 'react'
import { TESTIMONIALS } from '../../data/testimonials'
import { useReducedMotion } from '../../hooks/useReducedMotion'

function Card({ t, i, dup = false }) {
  return (
    <div className={`tc v${(i % 3) + 1}`} aria-hidden={dup ? 'true' : undefined}>
      <div className="tc-box">
        <div className="tc-back"></div>
        <div className="tc-front"></div>
        <div className="tc-inner">
          <h3>{t[0]}</h3>
          <span className="tc-q" aria-hidden="true">
            &ldquo;
          </span>
          <p>{t[1]}</p>
        </div>
      </div>
    </div>
  )
}

export function Testimonials() {
  const reduced = useReducedMotion()
  const viewRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const view = viewRef.current
    const track = trackRef.current
    if (!view || !track || reduced) return

    let resumeTimer
    const pause = () => {
      track.classList.add('paused')
      clearTimeout(resumeTimer)
    }
    const resume = () => {
      clearTimeout(resumeTimer)
      resumeTimer = setTimeout(() => track.classList.remove('paused'), 2500)
    }

    view.addEventListener('touchstart', pause, { passive: true })
    view.addEventListener('touchend', resume, { passive: true })
    return () => {
      view.removeEventListener('touchstart', pause)
      view.removeEventListener('touchend', resume)
      clearTimeout(resumeTimer)
    }
  }, [reduced])

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
        >
          <div className="tc-track" id="tcTrack" ref={trackRef}>
            {TESTIMONIALS.map((t, i) => (
              <Card key={`a-${i}`} t={t} i={i} />
            ))}
            {!reduced &&
              TESTIMONIALS.map((t, i) => (
                <Card key={`b-${i}`} t={t} i={i} dup />
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}

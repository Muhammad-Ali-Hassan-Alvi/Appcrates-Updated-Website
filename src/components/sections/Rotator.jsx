import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useReveal } from '../../hooks/useReveal'

const WORDS = ['end-to-end AI', 'web & mobile', 'cloud & DevOps', 'product design']

export function Rotator() {
  const [index, setIndex] = useState(0)
  const [outIndex, setOutIndex] = useState(null)
  const reduced = useReducedMotion()
  const timeoutRef = useRef(null)
  useReveal()

  useEffect(() => {
    if (reduced) return
    const interval = setInterval(() => {
      setOutIndex(index)
      setIndex((i) => (i + 1) % WORDS.length)
      timeoutRef.current = setTimeout(() => setOutIndex(null), 750)
    }, 2600)
    return () => {
      clearInterval(interval)
      clearTimeout(timeoutRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, reduced])

  return (
    <div className="rotator">
      <div className="wrap reveal">
        <h2>
          Connecting great companies with{' '}
          <span className="rot-slot" id="rot">
            {WORDS.map((w, i) => {
              let cls = ''
              if (i === index) cls = 'on'
              else if (i === outIndex) cls = 'out'
              return (
                <span key={w} className={cls}>
                  {w}
                </span>
              )
            })}
          </span>{' '}
          & software engineering talent
        </h2>
      </div>
    </div>
  )
}

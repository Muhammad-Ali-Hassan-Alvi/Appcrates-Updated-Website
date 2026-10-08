import { useEffect, useRef, useState } from 'react'
import { VETTING_STEPS } from '../../data/vetting'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function VettingStepper() {
  const [active, setActive] = useState(0)
  const [cycle, setCycle] = useState(0)
  const [done, setDone] = useState(() => new Set())
  const [started, setStarted] = useState(false)
  const reduced = useReducedMotion()
  const timerRef = useRef(null)
  const wrapRef = useRef(null)

  const showStep = (i, manual = false) => {
    clearTimeout(timerRef.current)
    setActive(i)
    setCycle((c) => c + 1)
    setDone(() => {
      const next = new Set()
      for (let j = 0; j < i; j++) next.add(j)
      if (reduced || manual) next.add(i)
      return next
    })
    if (!reduced) {
      timerRef.current = setTimeout(
        () => showStep((i + 1) % VETTING_STEPS.length),
        manual ? 7000 : 4200
      )
    }
  }

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    const start = () => {
      if (started) return
      setStarted(true)
      showStep(0, false)
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          start()
          obs.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    )
    obs.observe(el)

    // Fallback if the card is already on screen (common on small viewports)
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) start()

    return () => {
      obs.disconnect()
      clearTimeout(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const step = VETTING_STEPS[active]

  return (
    <div className="vet" id="vet" ref={wrapRef}>
      <div className="vet-top">
        <span>AppCrates engineer vetting</span>
        <b id="vetCount">
          Stage {active + 1} of {VETTING_STEPS.length}
        </b>
      </div>
      <div className="vet-steps" id="vetSteps" role="tablist" aria-label="Vetting stages">
        {VETTING_STEPS.map((s, i) => {
          const isDone = done.has(i) && i !== active
          const isActive = i === active
          return (
            <button
              key={s.title}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Stage ${i + 1}: ${s.title}`}
              className={isDone ? 'done' : isActive ? 'active' : ''}
              onClick={() => showStep(i, true)}
            >
              <i
                key={`${i}-${isActive ? cycle : isDone ? 'done' : 'idle'}`}
                style={
                  isDone
                    ? { transform: 'scaleX(1)' }
                    : isActive && reduced
                      ? { transform: 'scaleX(1)' }
                      : undefined
                }
              />
            </button>
          )
        })}
      </div>
      <div className="vet-body" id="vetBody" aria-live="polite">
        <div className="vet-anim" key={`${active}-${cycle}`}>
          <div className="vet-num">0{active + 1}</div>
          <h3>{step.title}</h3>
          <p>{step.desc}</p>
          <ul>
            {step.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

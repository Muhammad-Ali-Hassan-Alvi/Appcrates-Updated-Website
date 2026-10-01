import { useEffect, useRef, useState } from 'react'
import { VETTING_STEPS } from '../../data/vetting'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function VettingStepper() {
  const [active, setActive] = useState(0)
  const [done, setDone] = useState(new Set())
  const [started, setStarted] = useState(false)
  const reduced = useReducedMotion()
  const timerRef = useRef(null)
  const wrapRef = useRef(null)

  const showStep = (i, manual) => {
    clearTimeout(timerRef.current)
    setActive(i)
    setDone((prev) => {
      const next = new Set()
      for (let j = 0; j < i; j++) next.add(j)
      if (reduced || manual) next.add(i)
      return next
    })
    if (!reduced) {
      timerRef.current = setTimeout(() => showStep((i + 1) % VETTING_STEPS.length), manual ? 7000 : 4200)
    }
  }

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true)
          showStep(0, false)
          obs.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const step = VETTING_STEPS[active]

  return (
    <div className="vet" id="vet" ref={wrapRef}>
      <div className="vet-top">
        <span>AppCrates engineer vetting</span>
        <b id="vetCount">Stage {active + 1} of {VETTING_STEPS.length}</b>
      </div>
      <div className="vet-steps" id="vetSteps">
        {VETTING_STEPS.map((s, i) => {
          let cls = ''
          if (done.has(i) && i !== active) cls = 'done'
          else if (i === active) cls = done.has(i) ? 'done' : 'active'
          return (
            <button
              key={s.title}
              aria-label={`Stage ${i + 1}`}
              className={cls}
              onClick={() => showStep(i, true)}
            >
              <i></i>
            </button>
          )
        })}
      </div>
      <div className="vet-body" id="vetBody" aria-live="polite">
        <div className="vet-anim" key={active}>
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

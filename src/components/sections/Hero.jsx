import { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/Button'
import { Pill } from '../ui/Pill'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useCountUp } from '../../hooks/useCountUp'

const CONSOLE_LINES = [
  ['dim', '$ appcrates deploy --agent support-copilot'],
  ['', '› Loading knowledge base … 12,480 docs'],
  ['', '› Building vector index … '],
  ['ok', '  ✓ indexed in 3.2s'],
  ['', '› Running eval suite (240 cases)'],
  ['ok', '  ✓ accuracy 96.4%  ✓ latency p95 820ms'],
  ['', '› Rolling out to production · eu-west'],
  ['br', '  ● live — handling 1.2k conversations/day'],
]

export function Hero() {
  const orbRef = useRef(null)
  const consoleRef = useRef(null)
  const reduced = useReducedMotion()
  const yearsRef = useCountUp(12)
  const [consoleDone, setConsoleDone] = useState(false)

  useEffect(() => {
    const orb = orbRef.current
    if (!orb || reduced) return
    const onMove = (e) => {
      orb.style.transform = `translate(${(e.clientX / window.innerWidth - 0.5) * -60}px,${
        (e.clientY / window.innerHeight - 0.5) * 40
      }px)`
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduced])

  useEffect(() => {
    const cb = consoleRef.current
    if (!cb) return
    let cancelled = false
    let loopTimer

    async function typeConsole() {
      cb.innerHTML = ''
      for (const [cls, txt] of CONSOLE_LINES) {
        if (cancelled) return
        const div = document.createElement('div')
        if (cls) div.className = cls
        cb.appendChild(div)
        if (reduced) {
          div.textContent = txt
          continue
        }
        for (let i = 0; i <= txt.length; i++) {
          if (cancelled) return
          div.textContent = txt.slice(0, i)
          await new Promise((r) => setTimeout(r, 14))
        }
        await new Promise((r) => setTimeout(r, 260))
      }
      if (cancelled) return
      const caret = document.createElement('span')
      caret.className = 'caret'
      cb.appendChild(caret)
      setConsoleDone(true)
      if (!reduced) loopTimer = setTimeout(typeConsole, 6000)
    }

    const startTimer = setTimeout(typeConsole, 700)

    return () => {
      cancelled = true
      clearTimeout(startTimer)
      clearTimeout(loopTimer)
    }
  }, [reduced])

  return (
    <section className="hero">
      <div className="orb" id="orb" ref={orbRef}></div>
      <div className="wrap hero-grid">
        <div>
          <Pill className="fade-in" style={{ animationDelay: '.1s' }}>
            Now onboarding AI & product teams for Q4 2026
          </Pill>
          <h1>
            <span className="line"><span>Scale with</span></span>
            <span className="line"><span className="stroke">precision</span></span>
            <span className="line"><span className="fill-brand">AI.</span></span>
          </h1>
          <p className="lede fade-in" style={{ animationDelay: '.45s' }}>
            We partner with businesses to deliver AI-driven solutions that turn web, mobile and
            cloud ecosystems into intelligent, scalable platforms. Our B2B engineering approach
            enables automation, data-driven decisions and sustainable digital growth.
          </p>
          <div className="hero-ctas fade-in" style={{ animationDelay: '.6s' }}>
            <Button href="#contact" variant="primary" showArrow>Get started</Button>
            <Button href="#work" variant="ghost">See our work</Button>
          </div>
          <div className="hero-proof fade-in" style={{ animationDelay: '.75s' }}>
            <div className="avatars">
              <span style={{ background: '#e67120' }}>AH</span>
              <span style={{ background: '#0a0404' }}>AM</span>
              <span style={{ background: '#8c4a1c' }}>AC</span>
              <span style={{ background: '#3a2c28' }}>MA</span>
            </div>
            <span>
              <b style={{ color: 'var(--ink)' }}>50+ engineers</b> shipping for teams in the UK,
              EU, US and beyond
            </span>
          </div>
        </div>

        <div className="console-wrap fade-in" style={{ animationDelay: '.35s' }}>
          <div className="float-card fc-ai">
            <div className="ic"></div>
            We develop advanced AI technologies that power automation, predictive intelligence and
            data-driven systems at scale.
          </div>
          <div className="console" role="img" aria-label="Animated deployment log of an AI agent release">
            <div className="console-top">
              <i></i><i></i><i></i>
              <b>appcrates / ai-agent-release</b>
            </div>
            <div className="console-body" id="consoleBody" ref={consoleRef} aria-hidden={!consoleDone}></div>
          </div>
          <div className="float-card fc-years">
            <strong><span data-count="12" ref={yearsRef}>0</span><em>+</em></strong>
            <span>Years of<br />experience</span>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useRef, useState } from 'react'
import { PROJECTS } from '../../data/projects'
import { Button } from '../ui/Button'
import { useReducedMotion } from '../../hooks/useReducedMotion'

function Tile({ project }) {
  const ink = project.ink || '#fff'

  return (
    <div className="pf-tile pf-tile--live" style={{ background: project.bg, color: ink }}>
      <div className="pf-shot">
        <div className="pf-shot-bar" aria-hidden="true">
          <i /><i /><i />
        </div>
        <img src={project.img} alt={`${project.n} live project screenshot`} loading="lazy" />
      </div>
      <div className="pf-meta">
        <span className="logo-chip">{project.n.slice(0, 2)}</span>
        <h4>{project.h}</h4>
        <span className="sub">{project.n} · {project.ind}</span>
        {project.tech?.length > 0 && (
          <div className="tech">
            {project.tech.map((x) => (
              <i key={x}>{x}</i>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function Portfolio() {
  const reduced = useReducedMotion()
  const stageRef = useRef(null)
  const topRef = useRef(null)
  const botRef = useRef(null)
  const centerRef = useRef(null)
  const [pct, setPct] = useState(0)
  const [ringOffset, setRingOffset] = useState(339.3)
  const [ringVisible, setRingVisible] = useState(false)

  const half = Math.ceil(PROJECTS.length / 2)
  const topList = PROJECTS.slice(0, half)
  const botList = PROJECTS.slice(half)

  useEffect(() => {
    const stage = stageRef.current
    const pfTop = topRef.current
    const pfBot = botRef.current
    const center = centerRef.current
    if (!stage || !pfTop || !pfBot) return

    function isMobileLayout() {
      return window.matchMedia('(max-width: 700px)').matches
    }

    function resetRows() {
      pfTop.style.transform = ''
      pfBot.style.transform = ''
      if (center) center.style.removeProperty('--s')
    }

    function pfScroll() {
      if (reduced || isMobileLayout()) {
        resetRows()
        setPct(isMobileLayout() ? 0 : 100)
        setRingOffset(isMobileLayout() ? 339.3 : 0)
        setRingVisible(!isMobileLayout())
        return
      }
      const r = stage.getBoundingClientRect()
      const sticky = stage.querySelector('.pf-sticky')
      const stick = sticky ? sticky.offsetHeight : 0
      const total = Math.max(stage.offsetHeight - stick, 1)
      const p = Math.min(Math.max((74 - r.top) / total, 0), 1)
      const tw = pfTop.scrollWidth / 2
      const bw = pfBot.scrollWidth / 2

      pfTop.style.transform = `translateX(${-40 - p * Math.max(tw - window.innerWidth * 0.4, 260)}px)`
      pfBot.style.transform = `translateX(${-120 - (1 - p) * Math.max(bw - window.innerWidth * 0.4, 260)}px)`

      const v = Math.round(p * 100)
      setPct(v)
      setRingOffset(339.3 * (1 - v / 100))
      setRingVisible(v !== 0)
      if (center) center.style.setProperty('--s', (0.92 + p * 0.12).toFixed(3))
    }

    pfScroll()
    window.addEventListener('scroll', pfScroll, { passive: true })
    window.addEventListener('resize', pfScroll)
    return () => {
      window.removeEventListener('scroll', pfScroll)
      window.removeEventListener('resize', pfScroll)
    }
  }, [reduced])

  return (
    <section id="work" className="pf">
      <div className="pf-stage" id="pfStage" ref={stageRef}>
        <div className="pf-sticky">
          <div className="pf-row" id="pfTop" ref={topRef}>
            {[...topList, ...topList].map((p, i) => (
              <Tile key={`${p.n}-top-${i}`} project={p} />
            ))}
          </div>
          <div className="pf-row" id="pfBottom" ref={botRef}>
            {[...botList, ...botList].map((p, i) => (
              <Tile key={`${p.n}-bot-${i}`} project={p} />
            ))}
          </div>
          <div className="pf-center" id="pfCenter" ref={centerRef}>
            <a href="#services" className="pf-badge" aria-label="Skip past the portfolio">
              <svg viewBox="0 0 120 120" className="pf-ring" aria-hidden="true">
                <circle cx="60" cy="60" r="54" className="bgc" />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  className="fgc"
                  style={{ strokeDashoffset: ringOffset, opacity: ringVisible ? 1 : 0 }}
                />
              </svg>
              <span className="in">
                <span className="pf-word">Portfolio</span>
                <span className="pf-pct pf-pct-desktop"><b>{pct}</b>%</span>
                <span className="pf-hint pf-hint-desktop">Scroll to explore</span>
                <span className="pf-hint pf-hint-mobile">Swipe to explore</span>
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className="wrap">
        <div className="center-cta reveal" style={{ marginTop: 0 }}>
          <Button href="#contact" variant="primary" showArrow>
            Start your project with us
          </Button>
        </div>
      </div>
    </section>
  )
}

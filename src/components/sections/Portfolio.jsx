import { useEffect, useRef, useState } from 'react'
import { PROJECTS, TILE_STYLE } from '../../data/projects'
import { Button } from '../ui/Button'
import { useReducedMotion } from '../../hooks/useReducedMotion'

function Tile({ project }) {
  const t = TILE_STYLE[project.n] || { bg: '#222', dev: 'lap' }
  const ink = t.ink || '#fff'
  const accent = project.ac === '#fff' ? '#e67120' : project.ac

  const device =
    t.dev === 'ph' ? (
      <div
        className="ph"
        style={{
          '--scr': t.scr || '#111',
          '--scr-ink': t.scrInk || '#fff',
          '--acc': accent,
        }}
      >
        <div>
          {project.img ? (
            <img className="ph-shot" src={project.img} alt="" />
          ) : (
            <>
              <h6>{project.h}</h6>
              <span className="row-f" />
              <span className="row-f" />
              <span className="row-f" />
              <span className="cta-f" />
            </>
          )}
        </div>
      </div>
    ) : (
      <div className="lap" style={{ '--acc': accent, '--img': t.img }}>
        <div className="scr">
          <div>
            {project.img ? (
              <img className="scr-shot" src={project.img} alt={`${project.n} screenshot`} />
            ) : (
              <>
                <div className="nav-f">
                  <b /><b /><b /><b />
                </div>
                <div className="hero-f">
                  <div>
                    <h6>{project.h}</h6>
                    <div className="btns">
                      <b /><b />
                    </div>
                  </div>
                  <div className="img" />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="base" />
      </div>
    )

  return (
    <div className="pf-tile" style={{ background: t.bg, color: ink }}>
      <span className="logo-chip">{project.n.slice(0, 2)}</span>
      <h4>{project.h}</h4>
      <span className="sub">
        {project.n} · {project.ind}
      </span>
      {t.tech?.length > 0 && (
        <div className="tech">
          {t.tech.map((x) => (
            <i key={x}>{x}</i>
          ))}
        </div>
      )}
      <span className="ghost">{project.n.split(' ')[0]}</span>
      {device}
    </div>
  )
}

export function Portfolio() {
  const reduced = useReducedMotion()
  const stageRef = useRef(null)
  const topRef = useRef(null)
  const botRef = useRef(null)
  const centerRef = useRef(null)
  const ringRef = useRef(null)
  const [pct, setPct] = useState(0)

  const half = Math.ceil(PROJECTS.length / 2)
  const topList = PROJECTS.slice(0, half)
  const botList = PROJECTS.slice(half)

  useEffect(() => {
    const stage = stageRef.current
    const pfTop = topRef.current
    const pfBot = botRef.current
    const center = centerRef.current
    const ring = ringRef.current
    if (!stage || !pfTop || !pfBot) return

    function pfScroll() {
      if (reduced) {
        setPct(100)
        if (ring) {
          ring.style.strokeDashoffset = '0'
          ring.style.opacity = '1'
        }
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
      if (ring) {
        ring.style.strokeDashoffset = (339.3 * (1 - v / 100)).toFixed(2)
        ring.style.opacity = v === 0 ? '0' : '1'
      }
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
              <Tile key={`${p.n}-t-${i}`} project={p} />
            ))}
          </div>
          <div className="pf-row" id="pfBottom" ref={botRef}>
            {[...botList, ...botList].map((p, i) => (
              <Tile key={`${p.n}-b-${i}`} project={p} />
            ))}
          </div>
          <div className="pf-center" id="pfCenter" ref={centerRef}>
            <a href="#services" className="pf-badge" aria-label="Skip past the portfolio">
              <svg viewBox="0 0 120 120" className="pf-ring" aria-hidden="true">
                <circle cx="60" cy="60" r="54" className="bgc" />
                <circle cx="60" cy="60" r="54" className="fgc" ref={ringRef} />
              </svg>
              <span className="in">
                <span className="pf-word">Portfolio</span>
                <span className="pf-pct">
                  <b>{pct}</b>%
                </span>
                <span className="pf-hint">Scroll to explore</span>
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

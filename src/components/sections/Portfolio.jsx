import { useEffect, useRef, useState } from 'react'
import { PROJECTS, TILE_STYLE } from '../../data/projects'
import { Button } from '../ui/Button'
import { useReducedMotion } from '../../hooks/useReducedMotion'

function Shot({ src, alt }) {
  return (
    <div className="shot">
      <img src={src} alt={alt} loading="lazy" decoding="async" />
    </div>
  )
}

function Tile({ project }) {
  const t = TILE_STYLE[project.n] || { bg: '#222', dev: 'lap' }
  const ink = t.ink || '#fff'
  const accent = project.ac === '#fff' ? '#e67120' : project.ac
  const twin = Array.isArray(project.img)

  let device = null
  if (twin) {
    device = (
      <>
        <div className="ph back">
          <Shot src={project.img[1]} alt={`${project.n} screenshot`} />
        </div>
        <div className="ph">
          <Shot src={project.img[0]} alt={`${project.n} screenshot`} />
        </div>
      </>
    )
  } else if (project.img) {
    device = (
      <div className="lap" style={{ '--acc': accent, '--img': t.img }}>
        <div className="scr">
          <Shot src={project.img} alt={`${project.n} screenshot`} />
        </div>
        <div className="base" />
      </div>
    )
  } else if (t.dev === 'ph') {
    device = (
      <div
        className="ph"
        style={{
          '--scr': t.scr || '#111',
          '--scr-ink': t.scrInk || '#fff',
          '--acc': accent,
        }}
      >
        <div>
          <h6>{project.h}</h6>
          <span className="row-f" />
          <span className="row-f" />
          <span className="row-f" />
          <span className="cta-f" />
        </div>
      </div>
    )
  } else {
    device = (
      <div className="lap" style={{ '--acc': accent, '--img': t.img }}>
        <div className="scr">
          <div>
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
          </div>
        </div>
        <div className="base" />
      </div>
    )
  }

  return (
    <div className={`pf-tile${twin ? ' twin' : ''}`} style={{ background: t.bg, color: ink }}>
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

function ProjectCard({ project }) {
  const t = TILE_STYLE[project.n] || { bg: '#222' }
  const shot = Array.isArray(project.img) ? project.img[0] : project.img
  return (
    <article className="pf-card">
      <div className="pf-card-shot" style={{ background: t.bg }}>
        {shot ? <img src={shot} alt={`${project.n} screenshot`} loading="lazy" /> : null}
      </div>
      <div className="pf-card-body">
        <span className="pf-card-meta">
          {project.n} · {project.ind}
        </span>
        <h3>{project.h}</h3>
        <p>{project.d}</p>
      </div>
    </article>
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
  const [useScroller, setUseScroller] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(min-width: 1024px)').matches &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : true
  )

  const topList = PROJECTS.filter((p) => p.c === 'Mobile')
  const botList = PROJECTS.filter((p) => p.c === 'Web')

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setUseScroller(mq.matches && !motion.matches)
    sync()
    mq.addEventListener('change', sync)
    motion.addEventListener('change', sync)
    return () => {
      mq.removeEventListener('change', sync)
      motion.removeEventListener('change', sync)
    }
  }, [])

  useEffect(() => {
    if (!useScroller || reduced) return
    const stage = stageRef.current
    const pfTop = topRef.current
    const pfBot = botRef.current
    const center = centerRef.current
    const ring = ringRef.current
    if (!stage || !pfTop || !pfBot) return

    function pfScroll() {
      const r = stage.getBoundingClientRect()
      const sticky = stage.querySelector('.pf-sticky')
      const stick = sticky ? sticky.offsetHeight : 0
      const total = Math.max(stage.offsetHeight - stick, 1)
      const p = Math.min(Math.max((74 - r.top) / total, 0), 1)
      const viewW = sticky ? sticky.clientWidth : window.innerWidth
      const travelTop = Math.max(pfTop.scrollWidth / 2 - viewW * 0.4, 260)
      const travelBot = Math.max(pfBot.scrollWidth / 2 - viewW * 0.4, 260)

      pfTop.style.transform = `translateX(${(-40 - p * travelTop).toFixed(1)}px)`
      pfBot.style.transform = `translateX(${(-120 - (1 - p) * travelBot).toFixed(1)}px)`

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
  }, [useScroller, reduced])

  return (
    <section id="work" className="pf">
      <div className="wrap pf-head">
        <h2>Selected work</h2>
        <p className="lede">Live products we&apos;ve engineered — real screenshots from shipping apps.</p>
      </div>

      {useScroller ? (
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
      ) : (
        <div className="wrap pf-grid">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.n} project={p} />
          ))}
        </div>
      )}

      <div className="wrap">
        <div className="center-cta">
          <Button href="#contact" variant="primary" showArrow>
            Start your project with us
          </Button>
        </div>
      </div>
    </section>
  )
}

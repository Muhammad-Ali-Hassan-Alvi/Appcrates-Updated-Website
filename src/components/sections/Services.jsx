import { useEffect, useState } from 'react'
import { SectionHead } from '../ui/SectionHead'
import { Tabs } from '../ui/Tabs'
import { IconTick } from '../icons/Icons'
import {
  SERVICES,
  ENGAGEMENT_MODELS,
  PROCESS_STEPS,
  TRUST_PANELS,
  SERVICE_TABS,
} from '../../data/services'

export const OPEN_SERVICE_TAB_EVENT = 'appcrates:open-service-tab'

const SERVICE_ICONS = {
  uiux: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="13.5" cy="6.5" r="1.5" />
      <circle cx="17.5" cy="10.5" r="1.5" />
      <circle cx="8.5" cy="7.5" r="1.5" />
      <circle cx="6.5" cy="12.5" r="1.5" />
      <path d="M12 2a10 10 0 0 0 0 20c1 0 1.7-.8 1.7-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.9.8-1.7 1.7-1.7h2A5.5 5.5 0 0 0 22 11c0-5-4.5-9-10-9z" />
    </svg>
  ),
  web: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
    </svg>
  ),
  mobile: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="6" y="2" width="12" height="20" rx="2.5" />
      <path d="M11 18h2" />
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.5 19H9a7 7 0 1 1 6.7-9h1.8a4.5 4.5 0 1 1 0 9z" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9.9 15.5A2 2 0 0 0 8.5 14.1L2.4 12.5a.5.5 0 0 1 0-1l6.1-1.6a2 2 0 0 0 1.4-1.4l1.6-6.1a.5.5 0 0 1 1 0l1.6 6.1a2 2 0 0 0 1.4 1.4l6.1 1.6a.5.5 0 0 1 0 1l-6.1 1.6a2 2 0 0 0-1.4 1.4l-1.6 6.1a.5.5 0 0 1-1 0z" />
    </svg>
  ),
  test: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 2v6L4 18a2 2 0 0 0 1.8 3h12.4a2 2 0 0 0 1.8-3L15 8V2M8 2h8M7 15h10" />
    </svg>
  ),
}

export function Services() {
  const [tab, setTab] = useState('services')
  const [animKey, setAnimKey] = useState(0)

  const onChange = (key) => {
    setTab(key)
    setAnimKey((k) => k + 1)
  }

  useEffect(() => {
    const handler = (e) => {
      if (e.detail && e.detail.tab) onChange(e.detail.tab)
    }
    window.addEventListener(OPEN_SERVICE_TAB_EVENT, handler)
    return () => window.removeEventListener(OPEN_SERVICE_TAB_EVENT, handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="svc-wrap" id="services">
      <div className="wrap">
        <SectionHead
          title="Engineering delivery, end to end"
          lede="From the first workshop to production support, one accountable team."
          action={<Tabs tabs={SERVICE_TABS} active={tab} onChange={onChange} />}
        />

        {tab === 'services' && (
          <div data-panel="services" key={animKey} className="panel-anim">
            <div className="svc-grid">
              {SERVICES.map((s) => (
                <div className="svc" key={s.title}>
                  <div className="ic">{SERVICE_ICONS[s.icon]}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <ul>
                    {s.list.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'engage' && (
          <div data-panel="engage" key={animKey} className="panel-anim">
            <div className="two-col">
              {ENGAGEMENT_MODELS.map((m) => (
                <div className={`model${m.hot ? ' hot' : ''}`} key={m.title}>
                  {m.tagline && <span className="tagline">{m.tagline}</span>}
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                  <ul>
                    {m.list.map((li) => (
                      <li key={li}>
                        <IconTick />
                        {li}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'process' && (
          <div data-panel="process" key={animKey} className="panel-anim">
            <div className="steps">
              {PROCESS_STEPS.map((s) => (
                <div className="step" key={s.n}>
                  <b>{s.n}</b>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'trust' && (
          <div data-panel="trust" key={animKey} className="panel-anim">
            <div className="two-col">
              {TRUST_PANELS.map((p) => (
                <div className="model" key={p.title}>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

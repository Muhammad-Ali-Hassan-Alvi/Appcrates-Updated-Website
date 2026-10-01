import { Pill } from '../ui/Pill'
import { IconCheck } from '../icons/Icons'
import { VettingStepper } from './VettingStepper'
import { useCountUp } from '../../hooks/useCountUp'

const WORK_LIST = [
  'Daily check-in and check-out',
  'Detailed daily progress reports',
  'Regular meetings with your team',
  'Weekly CEO review meetings',
  'Full weekly project reports',
  'Continuous feedback alignment',
]

const STATS = [
  { count: 50, suffix: '+', label: 'Dedicated developers', delay: '' },
  { count: 100, suffix: '%', label: 'Client satisfaction', delay: 'd1' },
  { count: 24, suffix: 'h', label: 'Support availability', delay: 'd2' },
  { count: 7, suffix: 'd', label: 'Fast onboarding', delay: 'd3' },
]

function Stat({ count, suffix, label, delay }) {
  const ref = useCountUp(count)
  return (
    <div className={`stat reveal ${delay}`.trim()}>
      <strong><span data-count={count} ref={ref}>0</span><em>{suffix}</em></strong>
      <span>{label}</span>
    </div>
  )
}

export function StaffAugmentation() {
  return (
    <section className="band" id="augment">
      <div className="band-glow"></div>
      <div className="wrap">
        <div className="aug-grid">
          <div className="reveal">
            <Pill style={{ background: '#1a1210', borderColor: '#2c211e', color: '#f0c7a7' }}>
              Staff augmentation
            </Pill>
            <h2 style={{ marginTop: 20 }}>Build your tech team, the right way.</h2>
            <p className="lede" style={{ marginTop: 16 }}>
              Dedicated developer outsourcing for local and international clients, with seamless
              collaboration, transparent communication and consistent delivery.
            </p>
            <h3 style={{ fontSize: '1.25rem', marginTop: 34 }}>How our developers work with you</h3>
            <div className="work-list">
              {WORK_LIST.map((item) => (
                <div key={item}>
                  <IconCheck />
                  {item}
                </div>
              ))}
            </div>
            <p className="sop">
              Every developer works under your Standard Operating Procedures. Weekly reviews
              include you, the developer, the project manager and our CEO.
            </p>
          </div>
          <div className="reveal d2">
            <h3 style={{ fontSize: '1.6rem' }}>How we vet every engineer</h3>
            <p className="lede" style={{ margin: '10px 0 22px' }}>
              Every developer in your seat has passed this 6-stage filter.
            </p>
            <VettingStepper />
          </div>
        </div>
        <div className="stats">
          {STATS.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>
        <p className="quote-line reveal">
          "Let's build your tech team, the right way, with the right people."
        </p>
      </div>
    </section>
  )
}

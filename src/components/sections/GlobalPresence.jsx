import { useEffect, useState } from 'react'

const ZONES = [
  { city: 'London', tz: 'Europe/London', note: 'UK clients' },
  { city: 'Stockholm', tz: 'Europe/Stockholm', note: 'Nordic clients' },
  { city: 'New York', tz: 'America/New_York', note: 'US clients' },
  { city: 'Gujranwala', tz: 'Asia/Karachi', note: 'AppCrates HQ' },
]

function useClocks() {
  const [times, setTimes] = useState({})

  useEffect(() => {
    const update = () => {
      const next = {}
      ZONES.forEach((z) => {
        try {
          next[z.tz] = new Intl.DateTimeFormat('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: z.tz,
          }).format(new Date())
        } catch {
          next[z.tz] = '--:--'
        }
      })
      setTimes(next)
    }
    update()
    const id = setInterval(update, 30000)
    return () => clearInterval(id)
  }, [])

  return times
}

export function GlobalPresence() {
  const times = useClocks()

  return (
    <section style={{ paddingTop: 20 }}>
      <div className="wrap global">
        <div className="reveal">
          <h2>One team, working in your hours</h2>
          <p className="lede" style={{ marginTop: 14 }}>
            Headquartered in Gujranwala, Pakistan, with engineers overlapping working hours for
            clients across the UK, Europe, North America, the Middle East and Africa.
          </p>
          <div className="zones">
            {ZONES.map((z) => (
              <div className="zone" key={z.city}>
                <b>{z.city}</b>
                <span className="t" data-tz={z.tz}>{times[z.tz] || '--:--'}</span>{' '}
                <span>{z.note}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="map reveal d2">
          <svg viewBox="0 0 400 250" aria-label="Map showing AppCrates HQ connected to client regions">
            <defs>
              <pattern id="dots" width="8" height="8" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.3" fill="var(--line)" />
              </pattern>
            </defs>
            <rect width="400" height="250" fill="url(#dots)" />
            <g fill="none" stroke="#e67120" strokeWidth="1.5" strokeDasharray="4 5">
              <path d="M268 120 Q220 40 190 78" />
              <path d="M268 120 Q230 50 205 66" />
              <path d="M268 120 Q180 10 95 95" />
              <path d="M268 120 Q250 120 218 170" />
              <path d="M268 120 Q262 110 245 125" />
            </g>
            <g fill="currentColor" style={{ color: 'var(--ink)' }}>
              <circle cx="190" cy="78" r="4" />
              <circle cx="205" cy="66" r="4" />
              <circle cx="95" cy="95" r="4" />
              <circle cx="218" cy="170" r="4" />
              <circle cx="245" cy="125" r="4" />
            </g>
            <circle cx="268" cy="120" r="7" fill="#e67120" />
            <circle cx="268" cy="120" r="7" fill="none" stroke="#e67120" strokeWidth="2">
              <animate attributeName="r" values="7;22" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0" dur="2s" repeatCount="indefinite" />
            </circle>
            <g fontFamily="Manrope,sans-serif" fontSize="10" fontWeight="700" fill="var(--muted)">
              <text x="176" y="94">London</text>
              <text x="200" y="58">Stockholm</text>
              <text x="72" y="112">New York</text>
              <text x="205" y="186">Lagos</text>
              <text x="232" y="141">Dubai</text>
              <text x="278" y="124" fill="#e67120">HQ</text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  )
}

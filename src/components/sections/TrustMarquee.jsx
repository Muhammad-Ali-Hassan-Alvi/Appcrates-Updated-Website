import { TRUST_LOGOS } from '../../data/trust'

export function TrustMarquee() {
  const items = [...TRUST_LOGOS, ...TRUST_LOGOS]

  return (
    <div className="trust">
      <p>Trusted by product teams and enterprises</p>
      <div className="marquee">
        <div className="marquee-track" id="marquee">
          {items.map((name, i) => (
            <span key={i}>{name}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

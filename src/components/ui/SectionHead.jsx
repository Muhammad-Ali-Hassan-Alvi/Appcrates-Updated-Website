export function SectionHead({ title, lede, action, reveal = true, className = '' }) {
  return (
    <div className={`sec-head${reveal ? ' reveal' : ''} ${className}`.trim()}>
      <div>
        <h2>{title}</h2>
        {lede && <p className="lede">{lede}</p>}
      </div>
      {action}
    </div>
  )
}

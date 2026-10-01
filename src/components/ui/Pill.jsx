export function Pill({ children, style, className = '' }) {
  return (
    <span className={`pill ${className}`.trim()} style={style}>
      <span className="dot"></span>
      {children}
    </span>
  )
}

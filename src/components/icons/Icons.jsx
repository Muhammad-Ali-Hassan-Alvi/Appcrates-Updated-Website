export function IconSprites() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <symbol id="i-arrow" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 12h14M13 6l6 6-6 6"
          />
        </symbol>
        <symbol id="i-check" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8 12.2 2.7 2.7L16.2 9.4"
          />
        </symbol>
        <symbol id="i-tick" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m5 12.5 4.5 4.5L19 7.5"
          />
        </symbol>
        <symbol id="i-logo" viewBox="0 0 48 48">
          <path d="M6 36 22 8l8 14-5 1-3-5-9 16z" fill="currentColor" />
          <path d="m22 8 20 28h-9l-7-10 3-1z" fill="#8c8480" />
          <path d="M3 40c12-7 28-8 42-3-14-2-28 0-42 6z" fill="#e67120" />
        </symbol>
      </defs>
    </svg>
  )
}

export function IconArrow({ className }) {
  return (
    <svg className={className}>
      <use href="#i-arrow" />
    </svg>
  )
}

export function IconCheck({ className }) {
  return (
    <svg className={className}>
      <use href="#i-check" />
    </svg>
  )
}

export function IconTick({ className, width, height }) {
  return (
    <svg className={className} width={width} height={height}>
      <use href="#i-tick" />
    </svg>
  )
}

export function IconLogo({ className, style }) {
  return (
    <svg className={className} style={style}>
      <use href="#i-logo" />
    </svg>
  )
}

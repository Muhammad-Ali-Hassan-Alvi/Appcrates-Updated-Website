import { useEffect, useRef } from 'react'

/**
 * Pill tab group. Active tab uses its own background — no absolute
 * indicator that can mis-measure on wrap/scroll.
 *
 * tabs: [{ key, label }]
 * active: current active key
 * onChange: (key) => void
 */
export function Tabs({ tabs, active, onChange, className = '' }) {
  const wrapRef = useRef(null)
  const isFirstMount = useRef(true)

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }
    const wrap = wrapRef.current
    if (!wrap) return
    const sel = wrap.querySelector('[aria-selected="true"]')
    if (!sel) return

    // Scroll only within the horizontal tabs container without scrolling the window
    const wrapRect = wrap.getBoundingClientRect()
    const selRect = sel.getBoundingClientRect()
    if (selRect.left < wrapRect.left) {
      wrap.scrollLeft += selRect.left - wrapRect.left - 12
    } else if (selRect.right > wrapRect.right) {
      wrap.scrollLeft += selRect.right - wrapRect.right + 12
    }
  }, [active, tabs])

  return (
    <div className={`tabs ${className}`.trim()} role="tablist" ref={wrapRef}>
      {tabs.map((t) => (
        <button
          key={t.key}
          type="button"
          role="tab"
          aria-selected={t.key === active}
          data-target={t.key}
          onClick={() => onChange(t.key)}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

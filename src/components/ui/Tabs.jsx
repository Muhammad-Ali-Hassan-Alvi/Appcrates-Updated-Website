import { useEffect, useRef, useState } from 'react'

/**
 * Pill tab group with a sliding indicator, mirroring the original
 * `.tabs` / `.ind` behaviour.
 *
 * tabs: [{ key, label }]
 * active: current active key
 * onChange: (key) => void
 */
export function Tabs({ tabs, active, onChange, className = '' }) {
  const wrapRef = useRef(null)
  const [ind, setInd] = useState({ left: 0, width: 0 })

  useEffect(() => {
    const update = () => {
      const wrap = wrapRef.current
      if (!wrap) return
      const sel = wrap.querySelector('[aria-selected="true"]')
      if (sel) setInd({ left: sel.offsetLeft, width: sel.offsetWidth })
    }
    update()
    window.addEventListener('resize', update)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(update)
    }
    return () => window.removeEventListener('resize', update)
  }, [active, tabs])

  return (
    <div className={`tabs ${className}`.trim()} role="tablist" ref={wrapRef}>
      <span className="ind" style={{ left: ind.left, width: ind.width }}></span>
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

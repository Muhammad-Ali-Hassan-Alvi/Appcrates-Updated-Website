import { useEffect, useState } from 'react'
import { NAV_LINKS } from '../../data/navigation'
import { IconLogo } from '../icons/Icons'
import { useTheme } from '../../hooks/useTheme'
import { useScrollProgress } from '../../hooks/useScrollProgress'

export function Header() {
  const { toggleTheme } = useTheme()
  const { scrolled } = useScrollProgress()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#top')

  useEffect(() => {
    const sections = document.querySelectorAll('main section[id]')
    if (!sections.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive('#' + entry.target.id)
          }
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )

    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  const closeMenu = () => setOpen(false)

  return (
    <header id="top" className={scrolled ? 'scrolled' : ''}>
      <nav className="wrap nav" aria-label="Main">
        <a href="#top" className="logo" aria-label="AppCrates home">
          <IconLogo className="logo-mark" />
          <span>
            <span className="logo-text">
              <span className="a">App</span>Crates
            </span>
            <span className="logo-tag">Whatever We Do. We Deliver Best</span>
          </span>
        </a>
        <ul className={`nav-links${open ? ' open' : ''}`} id="navLinks">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={active === link.href ? 'active' : ''}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <button className="icon-btn" id="themeBtn" aria-label="Switch light or dark theme" onClick={toggleTheme}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
          </button>
          <a href="#contact" className="btn btn-primary">Contact us</a>
          <button
            className="icon-btn menu-btn"
            id="menuBtn"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}

import { IconLogo } from '../icons/Icons'
import { CONTACT } from '../../data/contact'

const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21H9z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com/',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.2 2h3.4l-7.4 8.5L23 22h-6.8l-5.3-7-6.1 7H1.4l7.9-9L1 2h7l4.8 6.4zm-1.2 18h1.9L7.1 3.9H5.1z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.3H8.2V12h2.6v9.8H14V12h2.6l.4-3.5z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.6 2h-3.3v13.4a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9.2a6.3 6.3 0 1 0 5.3 6.2V8.6a8 8 0 0 0 4.7 1.5V6.8a4.7 4.7 0 0 1-4.7-4.8z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-4.8.5-4.8s0-3.2-.5-4.8zM9.8 15.1V8.9l5.8 3.1z" />
      </svg>
    ),
  },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <div>
            <a href="#top" className="logo">
              <IconLogo className="logo-mark" style={{ color: '#fff' }} />
              <span>
                <span className="logo-text">
                  <span className="a">App</span>Crates
                </span>
                <span className="logo-tag">Whatever We Do. We Deliver Best</span>
              </span>
            </a>
            <p className="foot-about">
              AI-driven software engineering and vetted developer teams for companies worldwide.
            </p>
            <div className="social">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener">
                  {s.svg}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#top">Home</a></li>
              <li><a href="#work">Portfolio</a></li>
              <li><a href="#testimonials">Success stories</a></li>
              <li><a href="#team">Careers</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Custom software</a></li>
              <li><a href="#services">Web development</a></li>
              <li><a href="#services">Mobile development</a></li>
              <li><a href="#augment">Staff augmentation</a></li>
              <li><a href="#services">AI / ML engineering</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href={CONTACT.phoneHref}>{CONTACT.phone}</a></li>
              <li><a href={CONTACT.emailHref}>{CONTACT.email}</a></li>
              <li>{CONTACT.address}</li>
            </ul>
          </div>
        </div>
        <div className="foot-big" aria-hidden="true">AppCrates</div>
        <div className="foot-bottom">
          <span>© <span>{year}</span> AppCrates. All rights reserved.</span>
          <div>
            <a href="#">Privacy policy</a>
            <a href="#">Terms of service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

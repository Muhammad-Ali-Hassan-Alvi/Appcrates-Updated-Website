import { useState } from 'react'
import { IconTick } from '../icons/Icons'
import { CALENDLY_URL, CONTACT } from '../../data/contact'

const SERVICE_CHOICES = ['Dedicated developers', 'Web app', 'Mobile app', 'AI / ML', 'UI/UX design']
const BUDGET_CHOICES = ['Under $5k', '$5k–$20k', '$20k–$50k', '$50k+']

export function Contact() {
  const [step, setStep] = useState(0)
  const [fields, setFields] = useState({ name: '', company: '', phone: '', email: '', details: '' })
  const [picks, setPicks] = useState({ service: '', budget: '' })
  const [err, setErr] = useState('')

  const update = (name, value) => setFields((f) => ({ ...f, [name]: value }))

  const next = () => {
    if (step === 0 && (!fields.name.trim() || !picks.service)) {
      setErr('Add your name and pick what you need to continue.')
      return
    }
    if (step === 1 && !picks.budget) {
      setErr('Pick a budget range to continue.')
      return
    }
    if (step === 2) {
      const email = fields.email.trim()
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        setErr('Enter a valid email so we can reply.')
        return
      }
      const body = `Name: ${fields.name}\nCompany: ${fields.company}\nService: ${picks.service}\nBudget: ${picks.budget}\nPhone: ${fields.phone}\nEmail: ${email}\n\nProject:\n${fields.details}`
      const href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
        'Project enquiry — ' + fields.name
      )}&body=${encodeURIComponent(body)}`
      const a = document.createElement('a')
      a.href = href
      a.click()
      setErr('')
      setStep(3)
      return
    }
    setErr('')
    setStep((s) => s + 1)
  }

  const back = () => {
    setErr('')
    setStep((s) => s - 1)
  }

  const onCalendly = (e) => {
    if (CALENDLY_URL) {
      e.preventDefault()
      window.open(CALENDLY_URL, '_blank', 'noopener')
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    next()
  }

  const choiceButtons = (name, options) => (
    <div className="choice" data-name={name}>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={picks[name] === opt ? 'on' : ''}
          onClick={() => setPicks((p) => ({ ...p, [name]: opt }))}
        >
          {opt}
        </button>
      ))}
    </div>
  )

  return (
    <section id="contact" style={{ paddingTop: 20 }}>
      <div className="wrap">
        <div className="contact reveal">
          <div className="form">
            <h2>Ready to start your project?</h2>
            <p className="lede" style={{ marginTop: 10 }}>
              Share your goals in three short steps so our team can prepare a relevant solution
              plan.
            </p>
            <div className="progress" id="fProg">
              {[0, 1, 2].map((i) => (
                <i key={i} className={i <= Math.min(step, 2) ? 'on' : ''}></i>
              ))}
            </div>
            <form id="leadForm" noValidate onSubmit={onSubmit}>
              <div className={`fstep${step === 0 ? ' on' : ''}`} data-step="1">
                <div className="row2">
                  <label>
                    Full name
                    <input
                      name="name"
                      autoComplete="name"
                      placeholder="Jane Smith"
                      value={fields.name}
                      onChange={(e) => update('name', e.target.value)}
                    />
                  </label>
                  <label>
                    Company
                    <input
                      name="company"
                      autoComplete="organization"
                      placeholder="Acme Ltd"
                      value={fields.company}
                      onChange={(e) => update('company', e.target.value)}
                    />
                  </label>
                </div>
                <label>What do you need?</label>
                {choiceButtons('service', SERVICE_CHOICES)}
              </div>

              <div className={`fstep${step === 1 ? ' on' : ''}`} data-step="2">
                <label>Estimated budget</label>
                {choiceButtons('budget', BUDGET_CHOICES)}
                <label>
                  Tell us about the project
                  <textarea
                    name="details"
                    rows="4"
                    placeholder="Goals, timeline, current stack…"
                    value={fields.details}
                    onChange={(e) => update('details', e.target.value)}
                  ></textarea>
                </label>
              </div>

              <div className={`fstep${step === 2 ? ' on' : ''}`} data-step="3">
                <div className="row2">
                  <label>
                    Phone
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+44 20 0000 0000"
                      value={fields.phone}
                      onChange={(e) => update('phone', e.target.value)}
                    />
                  </label>
                  <label>
                    Email
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      value={fields.email}
                      onChange={(e) => update('email', e.target.value)}
                    />
                  </label>
                </div>
              </div>

              <div className={`fstep${step === 3 ? ' on' : ''}`} data-step="4">
                <div className="done">
                  <div className="check">
                    <IconTick width={30} height={30} />
                  </div>
                  <h3 style={{ fontSize: '1.6rem' }}>Request ready to send</h3>
                  <p className="lede" style={{ margin: '8px auto 0' }}>
                    Your email app has opened with your details. Send it and we'll reply within 24
                    hours.
                  </p>
                </div>
              </div>

              <p className="err" id="fErr" role="alert">{err}</p>

              {step !== 3 && (
                <div className="f-actions" id="fActions">
                  {step > 0 && (
                    <button type="button" className="btn btn-ghost" id="fBack" onClick={back}>
                      Back
                    </button>
                  )}
                  <button type="button" className="btn btn-primary" id="fNext" onClick={next}>
                    {step === 2 ? 'Send request' : 'Next step'} <svg><use href="#i-arrow" /></svg>
                  </button>
                  <a href="#contact" className="btn btn-ghost" data-calendly onClick={onCalendly}>
                    Book via Calendly
                  </a>
                </div>
              )}
            </form>
          </div>
          <div className="side">
            <h3>Talk to a real engineer, not a sales script.</h3>
            <ul>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
                </svg>
                <span>
                  <b>Call or WhatsApp</b>
                  <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
                </span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 6L2 7" />
                </svg>
                <span>
                  <b>Email</b>
                  <a href={CONTACT.emailHref}>{CONTACT.email}</a>
                </span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>
                  <b>Office</b>
                  {CONTACT.address}
                </span>
              </li>
            </ul>
            <div className="promise">Reply within 24 hours. NDA available before the first call.</div>
          </div>
        </div>
      </div>
    </section>
  )
}

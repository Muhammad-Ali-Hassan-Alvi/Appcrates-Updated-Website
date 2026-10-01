import { useCallback, useEffect, useRef, useState } from 'react'
import { fallback, GREETING, QUICK_REPLIES } from '../../data/chatKnowledge'
import { OPEN_CHAT_EVENT } from '../../components/layout/FabRow'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [greeted, setGreeted] = useState(false)
  const [showNudge, setShowNudge] = useState(false)
  const [showQuick, setShowQuick] = useState(true)
  const [busy, setBusy] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const bodyRef = useRef(null)
  const reduced = useReducedMotion()

  const openChat = useCallback(() => {
    setOpen(true)
    setShowNudge(false)
  }, [])

  const closeChat = useCallback(() => setOpen(false), [])

  // Listen for external open requests (FabRow dispatches this custom event).
  useEffect(() => {
    const handler = () => openChat()
    window.addEventListener(OPEN_CHAT_EVENT, handler)
    return () => window.removeEventListener(OPEN_CHAT_EVENT, handler)
  }, [openChat])

  // Greet once, the first time the widget opens.
  useEffect(() => {
    if (open && !greeted) {
      setGreeted(true)
      setMessages((m) => [...m, { who: 'bot', text: GREETING }])
    }
  }, [open, greeted])

  // Nudge bubble after a few seconds if the visitor hasn't opened chat yet.
  useEffect(() => {
    const t = setTimeout(() => {
      if (!greeted) setShowNudge(true)
    }, 5000)
    return () => clearTimeout(t)
  }, [greeted])

  // Close on Escape.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') closeChat()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeChat])

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [messages])

  const send = useCallback(
    async (text) => {
      const trimmed = (text || '').trim()
      if (!trimmed || busy) return
      setBusy(true)
      setShowQuick(false)
      setInput('')
      setMessages((m) => [...m, { who: 'me', text: trimmed }])

      const delay = reduced ? 0 : 650
      await new Promise((r) => setTimeout(r, delay))

      const reply = fallback(trimmed)
      setMessages((m) => [...m, { who: 'bot', text: reply }])
      setBusy(false)
    },
    [busy, reduced]
  )

  const onSubmit = (e) => {
    e.preventDefault()
    send(input)
  }

  return (
    <>
      {showNudge && !open && (
        <div
          className="chat-nudge"
          style={{ position: 'fixed', right: 90, bottom: 26, zIndex: 61 }}
        >
          Need a developer? Ask me
        </div>
      )}
      <div className={`chat${open ? ' open' : ''}`} id="chat" role="dialog" aria-label="AppCrates AI assistant">
      <div className="chat-head">
        <div className="bot">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
            <rect x="4" y="8" width="16" height="12" rx="3" />
            <path d="M12 4v4M9 13h.01M15 13h.01M9.5 16.5h5" />
          </svg>
        </div>
        <div>
          <b>Crate, AppCrates AI</b>
          <span>Usually replies in seconds</span>
        </div>
        <button id="chatClose" aria-label="Close assistant" onClick={closeChat}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
      <div className="chat-body" id="chatBody" aria-live="polite" ref={bodyRef}>
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.who}`}>
            {m.text}
          </div>
        ))}
        {busy && (
          <div className="msg bot">
            <span className="typing"><i></i><i></i><i></i></span>
          </div>
        )}
      </div>
      {showQuick && (
        <div className="quick" id="quick">
          {QUICK_REPLIES.map((q) => (
            <button key={q} onClick={() => send(q)}>
              {q}
            </button>
          ))}
        </div>
      )}
      <form className="chat-foot" id="chatForm" onSubmit={onSubmit}>
        <input
          id="chatInput"
          placeholder="Ask about services, hiring, pricing…"
          autoComplete="off"
          aria-label="Message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button id="chatSend" aria-label="Send" disabled={busy} type="submit">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
          </svg>
        </button>
      </form>
      <div className="chat-note">AI assistant. For quotes, our team confirms by email.</div>
      </div>
    </>
  )
}

import { Button } from '../ui/Button'

export const OPEN_CHAT_EVENT = 'appcrates:open-chat'

export function FabRow({ onOpenChat }) {
  const openChat = () => {
    if (onOpenChat) {
      onOpenChat()
    } else {
      window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT))
    }
  }

  return (
    <div className="fab-row">
      <Button href="#contact" variant="primary" className="fab-call">
        Book a strategy call
      </Button>
      <button
        className="chat-fab"
        id="chatFab"
        aria-label="Open AI assistant"
        aria-expanded="false"
        onClick={openChat}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 10h.01M12 10h.01M16 10h.01" />
        </svg>
        <span className="ping"></span>
      </button>
    </div>
  )
}

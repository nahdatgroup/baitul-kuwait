import { CONTACT } from "../data/content.js";

export default function WhatsAppFab() {
  return (
    <a className="whatsapp-fab" href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.5 3.5A11 11 0 0 0 2.3 16.8L1 22l5.4-1.4A11 11 0 1 0 20.5 3.5ZM12 20a8.9 8.9 0 0 1-4.6-1.3l-.3-.2-3.2.8.9-3.1-.2-.3A9 9 0 1 1 12 20Zm4.9-6.6c-.3-.1-1.6-.8-1.8-.9-.2-.1-.4-.1-.6.1s-.7.9-.9 1-.4.2-.7 0a7.3 7.3 0 0 1-3.6-3.1c-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5s-.6-1.5-.8-2c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-1 2.3c0 1.3.9 2.6 1.1 2.8s1.8 2.7 4.3 3.8c1.9.8 2.3.6 2.7.6a2.3 2.3 0 0 0 1.5-1c.2-.4.2-.7.1-.8Z" />
      </svg>
    </a>
  );
}

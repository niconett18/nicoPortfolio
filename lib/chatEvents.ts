export const CLOSE_CHAT_EVENT = "portfolio:close-chat";
export const OPEN_CHAT_EVENT = "portfolio:open-chat";

/** Tells the chat widget to close, e.g. when the mobile nav menu opens. */
export function closeChat(): void {
  window.dispatchEvent(new Event(CLOSE_CHAT_EVENT));
}

/** Tells the chat widget to open, e.g. from the contact section. */
export function openChat(): void {
  window.dispatchEvent(new Event(OPEN_CHAT_EVENT));
}

export const CLOSE_CHAT_EVENT = "portfolio:close-chat";

/** Tells the chat widget to close, e.g. when the mobile nav menu opens. */
export function closeChat(): void {
  window.dispatchEvent(new Event(CLOSE_CHAT_EVENT));
}

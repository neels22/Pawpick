const SESSION_KEY = 'sessionId'

/**
 * Get or create an anonymous session ID.
 * Reads from localStorage; generates a new UUID if absent.
 */
export function getOrCreateSessionId(): string {
  let id = localStorage.getItem(SESSION_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(SESSION_KEY, id)
  }
  return id
}

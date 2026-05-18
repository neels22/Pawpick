// ── Types ──────────────────────────────────────────────────────────────────

export interface Item {
  id: string
  name: string
  description: string
  category: string
  imageUrl: string
  userChoice: 'yes' | 'no' | null
}

export interface VotePayload {
  itemId: string
  choice: 'yes' | 'no'
  sessionId: string
  decisionMs?: number
}

export interface ResultItem {
  itemId: string
  name: string
  description: string
  category: string
  imageUrl: string
  yesCount: number
  noCount: number
  totalVotes: number
  yesRate: number
}

export type SortMode = 'mostLoved' | 'mostVoted' | 'mostDivisive'

// ── Fetch wrappers ─────────────────────────────────────────────────────────

export async function fetchItems(sessionId: string): Promise<Item[]> {
  const res = await fetch(`/api/items?sessionId=${encodeURIComponent(sessionId)}`, {
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Failed to fetch items')
  const data = await res.json()
  return data.items
}

export async function castVote(payload: VotePayload): Promise<{ ok: boolean; itemId: string; choice: string }> {
  const res = await fetch('/api/vote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Failed to record vote')
  return res.json()
}

export async function fetchResults(sort: SortMode = 'mostLoved'): Promise<ResultItem[]> {
  const res = await fetch(`/api/results?sort=${sort}`, {
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Failed to fetch results')
  const data = await res.json()
  return data.results
}

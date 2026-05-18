'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { fetchItems, castVote, type Item } from '@/lib/api'
import { getOrCreateSessionId } from '@/lib/session'
import ProgressHeader from '@/components/ProgressHeader'
import SwipeCard from '@/components/SwipeCard'
import ResultsView from '@/components/ResultsView'
import EmptyDeck from '@/components/EmptyDeck'

type ViewMode = 'swipe' | 'results'

export default function Home() {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [items, setItems] = useState<Item[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<ViewMode>('swipe')
  const [voting, setVoting] = useState(false)
  const cardTimestamp = useRef<number>(Date.now())

  // 1. Session initialization
  useEffect(() => {
    const id = getOrCreateSessionId()
    setSessionId(id)
  }, [])

  // 2. Fetch items once session is ready
  useEffect(() => {
    if (!sessionId) return
    setLoading(true)
    fetchItems(sessionId)
      .then((data) => {
        setItems(data)
        setCurrentIndex(0)
        cardTimestamp.current = Date.now()
      })
      .catch((err) => {
        console.error('Failed to fetch items:', err)
        window.alert('Failed to load pets. Please refresh the page.')
      })
      .finally(() => setLoading(false))
  }, [sessionId])

  // 3. Vote handler
  const handleVote = useCallback(
    async (choice: 'yes' | 'no') => {
      if (!sessionId || voting) return
      const item = items[currentIndex]
      if (!item) return

      const decisionMs = Date.now() - cardTimestamp.current
      setVoting(true)

      try {
        await castVote({
          itemId: item.id,
          choice,
          sessionId,
          decisionMs,
        })
        setCurrentIndex((prev) => prev + 1)
        cardTimestamp.current = Date.now()
      } catch (err) {
        console.error('Vote failed:', err)
        window.alert('Failed to record vote. Please try again.')
      } finally {
        setVoting(false)
      }
    },
    [sessionId, items, currentIndex, voting]
  )

  // 4. Navigation
  const openResults = useCallback(() => setView('results'), [])
  const backToSwipe = useCallback(() => setView('swipe'), [])

  // Determine what to render
  const currentItem = items[currentIndex] ?? null
  const allVoted = !loading && items.length > 0 && currentIndex >= items.length
  const emptyFromStart = !loading && items.length === 0

  // ─── Results View ──────────────────────────────────────────────
  if (view === 'results') {
    return (
      <div className="flex flex-col h-screen max-w-md mx-auto overflow-hidden">
        <ResultsView onBackToSwipe={backToSwipe} />
      </div>
    )
  }

  // ─── Swipe View ────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto overflow-hidden">
      <ProgressHeader
        currentIndex={currentIndex + 1}
        totalItems={items.length || 100}
        onOpenResults={openResults}
      />

      <main className="flex-1 flex flex-col items-center justify-center px-[var(--spacing-gutter-mobile)] pb-8 overflow-hidden">
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            <p className="text-on-surface-variant text-[16px] font-bold">
              Finding adorable pets...
            </p>
          </div>
        )}

        {/* All voted or empty from start */}
        {(allVoted || emptyFromStart) && (
          <EmptyDeck onViewResults={openResults} />
        )}

        {/* Current card */}
        {!loading && currentItem && (
          <SwipeCard
            item={currentItem}
            onVote={handleVote}
            onOpenResults={openResults}
          />
        )}
      </main>
    </div>
  )
}

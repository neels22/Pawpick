'use client'

import { useEffect, useState } from 'react'
import { fetchResults, type ResultItem, type SortMode } from '@/lib/api'

interface ResultsViewProps {
  onBackToSwipe: () => void
}

const sortModes: { key: SortMode; label: string; icon: string }[] = [
  { key: 'mostLoved', label: 'Most Loved', icon: 'favorite' },
  { key: 'mostVoted', label: 'Most Voted', icon: 'how_to_vote' },
  { key: 'mostDivisive', label: 'Most Divisive', icon: 'balance' },
]

export default function ResultsView({ onBackToSwipe }: ResultsViewProps) {
  const [results, setResults] = useState<ResultItem[]>([])
  const [sortMode, setSortMode] = useState<SortMode>('mostLoved')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchResults(sortMode)
      .then(setResults)
      .catch((err) => {
        console.error('Failed to fetch results:', err)
        window.alert('Failed to load results. Please try again.')
      })
      .finally(() => setLoading(false))
  }, [sortMode])

  return (
    <div className="flex flex-col w-full max-w-md mx-auto h-full">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md flex justify-between items-center px-[var(--spacing-margin-mobile)] py-4 w-full z-10 shrink-0">
        <button
          onClick={onBackToSwipe}
          className="flex items-center gap-1 text-primary hover:bg-surface-container-low transition-colors rounded-full px-3 py-2 text-[14px] font-bold"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          Swipe
        </button>
        <h1 className="font-[var(--font-headline-sm)] text-[20px] leading-[28px] font-bold text-primary flex items-center gap-2">
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            pets
          </span>
          Results
        </h1>
        <div className="w-[72px]" /> {/* Spacer for centering */}
      </header>

      {/* Sort Tabs */}
      <div className="flex gap-2 px-[var(--spacing-margin-mobile)] py-3 overflow-x-auto no-scrollbar">
        {sortModes.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setSortMode(key)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[13px] font-bold whitespace-nowrap transition-all duration-200 ${
              sortMode === key
                ? 'bg-primary text-on-primary shadow-md scale-[1.02]'
                : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
            }`}
          >
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ fontVariationSettings: sortMode === key ? "'FILL' 1" : "'FILL' 0" }}
            >
              {icon}
            </span>
            {label}
          </button>
        ))}
      </div>

      {/* Results List */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-[var(--spacing-margin-mobile)] pb-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="w-10 h-10 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
            <p className="text-on-surface-variant text-[14px] font-bold">Loading results...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
            <span className="material-symbols-outlined text-[48px] text-outline">how_to_vote</span>
            <p className="text-on-surface-variant text-[16px]">No votes yet! Start swiping to see results.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {results.map((item, index) => (
              <div
                key={item.itemId}
                className="bg-surface-container-lowest rounded-xl p-4 flex items-center gap-4 border border-surface-variant/50 shadow-[0_4px_16px_rgba(121,86,76,0.06)] hover:shadow-[0_8px_24px_rgba(121,86,76,0.1)] transition-shadow duration-200"
              >
                {/* Rank */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-extrabold shrink-0 ${
                  index === 0 ? 'bg-primary text-on-primary' :
                  index === 1 ? 'bg-primary-container text-on-primary-container' :
                  index === 2 ? 'bg-secondary-container text-on-secondary-container' :
                  'bg-surface-container-high text-on-surface-variant'
                }`}>
                  {index + 1}
                </div>

                {/* Thumbnail */}
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-dim shrink-0">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-[var(--font-headline-sm)] text-[15px] font-bold text-on-surface truncate">
                    {item.name}
                  </h3>
                  <p className="text-[12px] text-on-surface-variant capitalize truncate">
                    {item.category}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex flex-col items-end gap-0.5 shrink-0">
                  <div className="flex items-center gap-1">
                    <span className="text-[12px] font-bold text-tertiary">
                      {item.totalVotes > 0 ? Math.round(item.yesRate * 100) : 0}%
                    </span>
                    <span
                      className="material-symbols-outlined text-[14px] text-tertiary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      favorite
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <span className="text-green-600 font-bold">{item.yesCount}Y</span>
                    <span className="text-on-surface-variant/40">·</span>
                    <span className="text-red-500 font-bold">{item.noCount}N</span>
                  </div>
                  <span className="text-[11px] text-on-surface-variant">
                    {item.totalVotes} vote{item.totalVotes !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

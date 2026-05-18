'use client'

interface VoteButtonsProps {
  onVote: (choice: 'yes' | 'no') => void
  disabled?: boolean
}

export default function VoteButtons({ onVote, disabled = false }: VoteButtonsProps) {
  return (
    <div className="flex justify-center items-center gap-6 px-[var(--spacing-card-padding)]">
      {/* Pass Button */}
      <button
        aria-label="Pass"
        disabled={disabled}
        onClick={() => onVote('no')}
        className="w-14 h-14 rounded-full bg-surface-container-lowest text-on-surface-variant flex items-center justify-center ambient-shadow transform transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span
          className="material-symbols-outlined text-3xl"
          style={{ color: '#ba1a1a' }}
        >
          close
        </span>
      </button>

      {/* Like Button */}
      <button
        aria-label="Like"
        disabled={disabled}
        onClick={() => onVote('yes')}
        className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center ambient-shadow squishy-button disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span
          className="material-symbols-outlined text-4xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          favorite
        </span>
      </button>
    </div>
  )
}

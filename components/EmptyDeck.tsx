'use client'

interface EmptyDeckProps {
  onViewResults: () => void
}

export default function EmptyDeck({ onViewResults }: EmptyDeckProps) {
  return (
    <div className="flex-grow flex flex-col items-center justify-center px-[var(--spacing-margin-mobile)] w-full max-w-md mx-auto">
      {/* Hero Card */}
      <div className="w-full bg-surface-container-lowest rounded-xl p-[var(--spacing-card-padding)] flex flex-col items-center text-center gap-[var(--spacing-card-padding)] relative overflow-hidden shadow-[0_30px_60px_-15px_rgba(121,86,76,0.1)] border border-surface-variant/50">
        {/* Illustration Container */}
        <div className="w-40 h-40 rounded-full bg-primary-container/30 flex items-center justify-center p-4 shadow-inner">
          <div className="w-full h-full rounded-full bg-primary-container/40 flex items-center justify-center">
            <span
              className="material-symbols-outlined text-[64px] text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              pets
            </span>
          </div>
        </div>

        {/* Messaging */}
        <div className="flex flex-col gap-[var(--spacing-base)]">
          <h2 className="font-[var(--font-headline-lg)] text-[32px] leading-[40px] font-bold text-on-surface">
            You&apos;ve seen them all!
          </h2>
          <p className="font-[var(--font-body-lg)] text-[18px] leading-[26px] text-on-surface-variant max-w-[280px] mx-auto">
            Take a paws. Check out the community results to see which pets are the most loved!
          </p>
        </div>

        {/* Action Stack */}
        <div className="w-full flex flex-col gap-[var(--spacing-stack-gap)] mt-4">
          <button
            onClick={onViewResults}
            className="w-full bg-primary text-on-primary py-4 px-6 rounded-full text-[14px] font-bold flex items-center justify-center gap-2 shadow-md hover:bg-primary/90 transition-colors duration-200 squishy-button"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              bar_chart
            </span>
            View Results
          </button>
        </div>
      </div>
    </div>
  )
}

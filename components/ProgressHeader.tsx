'use client'

interface ProgressHeaderProps {
  currentIndex: number
  totalItems: number
  onOpenResults: () => void
}

export default function ProgressHeader({ currentIndex, totalItems, onOpenResults }: ProgressHeaderProps) {
  return (
    <header className="bg-background/80 backdrop-blur-md flex justify-between items-center px-[var(--spacing-margin-mobile)] py-4 w-full z-10 shrink-0">
      {/* Brand */}
      <div className="flex items-center gap-2 text-primary">
        <span
          className="material-symbols-outlined text-[32px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          pets
        </span>
        <h1 className="font-[var(--font-headline-sm)] text-[20px] leading-[28px] font-bold tracking-tight">
          PawPick
        </h1>
      </div>

      {/* Progress counter */}
      <div className="flex items-center gap-3">
        <span className="font-[var(--font-label-lg)] text-[14px] leading-[20px] font-bold text-on-surface-variant tracking-wide">
          {currentIndex} / {totalItems}
        </span>
        <button
          onClick={onOpenResults}
          className="text-primary hover:bg-surface-container-low transition-colors rounded-full px-4 py-2 flex items-center gap-1.5 text-[14px] font-bold"
          aria-label="View Results"
        >
          <span className="material-symbols-outlined text-[20px]">bar_chart</span>
          Results
        </button>
      </div>
    </header>
  )
}

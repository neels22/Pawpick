'use client'

import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import type { Item } from '@/lib/api'

interface SwipeCardProps {
  item: Item
  onVote: (choice: 'yes' | 'no') => void
  onOpenResults: () => void
}

export default function SwipeCard({ item, onVote, onOpenResults }: SwipeCardProps) {
  const [exiting, setExiting] = useState<'left' | 'right' | null>(null)

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-300, 0, 300], [-18, 0, 18])
  const greenOpacity = useTransform(x, [0, 100], [0, 0.5])
  const redOpacity = useTransform(x, [-100, 0], [0.5, 0])
  const yesLabelOpacity = useTransform(x, [0, 50, 100], [0, 0.3, 1])
  const noLabelOpacity = useTransform(x, [-100, -50, 0], [1, 0.3, 0])

  function handleDragEnd(
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number; y: number } }
  ) {
    // Downward drag → open results (no vote)
    if (info.offset.y > 120) {
      onOpenResults()
      return
    }

    // Right swipe → Yes
    if (info.offset.x > 100) {
      setExiting('right')
      setTimeout(() => onVote('yes'), 300)
      return
    }

    // Left swipe → No
    if (info.offset.x < -100) {
      setExiting('left')
      setTimeout(() => onVote('no'), 300)
      return
    }

    // Below threshold → snap back (handled automatically by framer-motion)
  }

  // Programmatic vote from buttons
  function handleButtonVote(choice: 'yes' | 'no') {
    setExiting(choice === 'yes' ? 'right' : 'left')
    setTimeout(() => onVote(choice), 300)
  }

  const exitX = exiting === 'right' ? 500 : exiting === 'left' ? -500 : 0
  const exitRotate = exiting === 'right' ? 20 : exiting === 'left' ? -20 : 0

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.9}
          onDragEnd={handleDragEnd}
          style={{ x, rotate }}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={
            exiting
              ? { x: exitX, rotate: exitRotate, opacity: 0, transition: { duration: 0.3 } }
              : { scale: 1, opacity: 1, transition: { duration: 0.3 } }
          }
          exit={{ x: exitX, rotate: exitRotate, opacity: 0 }}
          className="relative w-full max-w-[380px] h-[560px] bg-surface-container-highest rounded-[24px] ambient-shadow overflow-hidden flex flex-col cursor-grab active:cursor-grabbing touch-none select-none"
        >
          {/* Pet Image */}
          <div className="relative w-full h-full bg-surface-dim">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover rounded-t-[24px]"
              draggable={false}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 image-gradient rounded-b-[24px]" />
          </div>

          {/* Green tint overlay (right drag = YES) */}
          <motion.div
            className="absolute inset-0 bg-green-500 rounded-[24px] pointer-events-none z-10"
            style={{ opacity: greenOpacity }}
          />

          {/* Red tint overlay (left drag = NO) */}
          <motion.div
            className="absolute inset-0 bg-red-500 rounded-[24px] pointer-events-none z-10"
            style={{ opacity: redOpacity }}
          />

          {/* YES Label */}
          <motion.div
            className="absolute top-8 left-6 z-20 pointer-events-none"
            style={{ opacity: yesLabelOpacity }}
          >
            <span className="text-[40px] font-extrabold text-green-400 border-4 border-green-400 rounded-xl px-4 py-1 rotate-[-15deg] inline-block shadow-lg bg-black/20 backdrop-blur-sm">
              YES
            </span>
          </motion.div>

          {/* NO Label */}
          <motion.div
            className="absolute top-8 right-6 z-20 pointer-events-none"
            style={{ opacity: noLabelOpacity }}
          >
            <span className="text-[40px] font-extrabold text-red-400 border-4 border-red-400 rounded-xl px-4 py-1 rotate-[15deg] inline-block shadow-lg bg-black/20 backdrop-blur-sm">
              NO
            </span>
          </motion.div>

          {/* Pet Info Overlay */}
          <div className="absolute bottom-0 w-full p-[var(--spacing-card-padding)] text-white flex flex-col gap-[var(--spacing-stack-gap)] z-10 pb-[80px]">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="font-[var(--font-display-lg)] text-[32px] leading-none font-extrabold m-0 drop-shadow-lg">
                  {item.name}
                </h2>
                <p className="font-[var(--font-body-md)] text-[14px] opacity-90 mt-1 flex items-center gap-1 capitalize">
                  <span className="material-symbols-outlined text-sm">category</span>
                  {item.category}
                </p>
              </div>
            </div>
            <p className="font-[var(--font-body-md)] text-[14px] mt-1 line-clamp-2 opacity-90 drop-shadow">
              {item.description}
            </p>
          </div>

          {/* Floating Action Buttons inside card */}
          <div className="absolute bottom-5 w-full flex justify-center items-center gap-6 z-20 px-[var(--spacing-card-padding)]">
            {/* Pass Button */}
            <button
              aria-label="Pass"
              onClick={(e) => { e.stopPropagation(); handleButtonVote('no') }}
              className="w-14 h-14 rounded-full bg-surface-container-lowest text-on-surface-variant flex items-center justify-center ambient-shadow transform transition-transform hover:scale-105 active:scale-95"
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
              onClick={(e) => { e.stopPropagation(); handleButtonVote('yes') }}
              className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center ambient-shadow squishy-button"
            >
              <span
                className="material-symbols-outlined text-4xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                favorite
              </span>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Swipe hint */}
      <p className="text-[12px] text-on-surface-variant/60 font-bold tracking-wider uppercase animate-pulse">
        ← Swipe to vote →
      </p>
    </div>
  )
}

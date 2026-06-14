'use client'

import { useMemo } from 'react'
import { PHASES, TOTAL_FRAMES } from '@/lib/constants'
import type { PhaseName, ScrollState } from '@/types/hero'

export function useScrollPhase(progress: number): ScrollState {
  return useMemo(() => {
    const clamped = Math.max(0, Math.min(1, progress))

    // Map progress → frame index
    const frameIndex = Math.round(clamped * (TOTAL_FRAMES - 1))

    // Determine current phase
    let phase: PhaseName = 'INTRO'
    let phaseProgress = 0

    for (const [name, range] of Object.entries(PHASES) as [PhaseName, { start: number; end: number }][]) {
      if (clamped >= range.start && clamped <= range.end) {
        phase = name
        const span = range.end - range.start
        phaseProgress = span === 0 ? 1 : (clamped - range.start) / span
        break
      }
    }

    // Edge: past last phase
    if (clamped > PHASES.WORLD_REVEAL.end) {
      phase = 'WORLD_REVEAL'
      phaseProgress = 1
    }

    return { progress: clamped, frameIndex, phase, phaseProgress }
  }, [progress])
}

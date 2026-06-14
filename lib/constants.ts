// ─── Frame Sequence ───────────────────────────────────────────────────────────
export const TOTAL_FRAMES = 150
export const FRAME_BASE_PATH = '/laptop-sequence'
export const FRAME_PREFIX = 'frame_'
export const FRAME_EXTENSION = 'webp'

/** Returns zero-padded frame filename, e.g. "frame_0042.webp" */
export function getFramePath(index: number): string {
  const padded = String(index).padStart(4, '0')
  return `${FRAME_BASE_PATH}/${FRAME_PREFIX}${padded}.${FRAME_EXTENSION}`
}

// ─── Scroll Phase Breakpoints (0→1) ─────────────────────────────────────────
export const PHASES = {
  INTRO:          { start: 0.00, end: 0.05 }, // static hold
  OPENING:        { start: 0.05, end: 0.35 }, // lid lifts
  KEYBOARD_GLOW:  { start: 0.35, end: 0.45 }, // backlight on
  SCREEN_ON:      { start: 0.45, end: 0.60 }, // screen ignites
  HOLOGRAPHIC:    { start: 0.60, end: 0.72 }, // UI overlays
  ZOOM_IN:        { start: 0.72, end: 0.88 }, // camera zooms
  FILL:           { start: 0.88, end: 0.96 }, // fills viewport
  WORLD_REVEAL:   { start: 0.96, end: 1.00 }, // digital world
} as const

export type PhaseName = keyof typeof PHASES

// ─── Canvas ───────────────────────────────────────────────────────────────────
export const MAX_DPR = 2          // cap device pixel ratio for perf
export const CANVAS_QUALITY = 'high' as const

// ─── Loading Batches ──────────────────────────────────────────────────────────
export const CRITICAL_FRAMES = 20  // loaded before first paint
export const BATCH_SIZE = 12        // subsequent batch size

// ─── Lenis ────────────────────────────────────────────────────────────────────
export const LENIS_LERP = 0.07      // cinematic weight (lower = slower)
export const LENIS_DURATION = 1.4

// ─── GSAP ─────────────────────────────────────────────────────────────────────
export const SCRUB_DESKTOP = 1.8   // weighty, cinematic
export const SCRUB_MOBILE  = 0.9   // snappier on mobile

// ─── Mobile ───────────────────────────────────────────────────────────────────
export const MOBILE_BREAKPOINT = 768
export const MOBILE_SKIP_FRAMES = true  // load only odd-indexed frames

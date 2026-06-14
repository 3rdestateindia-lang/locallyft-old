export type PhaseName =
  | 'INTRO'
  | 'OPENING'
  | 'KEYBOARD_GLOW'
  | 'SCREEN_ON'
  | 'HOLOGRAPHIC'
  | 'ZOOM_IN'
  | 'FILL'
  | 'WORLD_REVEAL'

export interface ScrollState {
  progress: number          // 0 → 1
  frameIndex: number        // 0 → TOTAL_FRAMES - 1
  phase: PhaseName
  phaseProgress: number     // 0 → 1 within current phase
}

export interface ImageSequenceState {
  frames: Array<HTMLImageElement | null>
  loadedCount: number
  isReady: boolean          // true when critical frames loaded
  totalFrames: number
}

export interface ParticleConfig {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  life: number
  maxLife: number
}

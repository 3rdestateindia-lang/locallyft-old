'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import {
  TOTAL_FRAMES,
  CRITICAL_FRAMES,
  BATCH_SIZE,
  MOBILE_BREAKPOINT,
  MOBILE_SKIP_FRAMES,
  CANVAS_QUALITY,
  getFramePath,
} from '@/lib/constants'

interface UseImageSequenceOptions {
  onReady?: () => void
}

interface UseImageSequenceReturn {
  frames: Array<HTMLImageElement | null>
  loadedCount: number
  isReady: boolean
  totalFrames: number
  drawFrame: (ctx: CanvasRenderingContext2D, index: number, canvas: HTMLCanvasElement) => void
}

export function useImageSequence(
  options: UseImageSequenceOptions = {}
): UseImageSequenceReturn {
  const { onReady } = options
  const framesRef = useRef<Array<HTMLImageElement | null>>(
    Array(TOTAL_FRAMES).fill(null)
  )
  const [loadedCount, setLoadedCount] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const isMobileRef = useRef(false)
  const loadingRef = useRef(false)
  const readyRef = useRef(false)

  const getLoadedFrame = useCallback((index: number) => {
    const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, index))
    const exact = framesRef.current[clampedIndex]
    if (exact?.complete && exact.naturalWidth > 0) return exact

    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const before = framesRef.current[clampedIndex - offset]
      if (before?.complete && before.naturalWidth > 0) return before

      const after = framesRef.current[clampedIndex + offset]
      if (after?.complete && after.naturalWidth > 0) return after
    }

    return null
  }, [])

  // Cover-fit draw: fills canvas like background-size: cover
  const drawFrame = useCallback(
    (ctx: CanvasRenderingContext2D, index: number, canvas: HTMLCanvasElement) => {
      const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, index))
      const img = getLoadedFrame(clampedIndex)
      if (!img) return

      const canvasW = canvas.width
      const canvasH = canvas.height
      const imgW = img.naturalWidth
      const imgH = img.naturalHeight

      // cover-fit scale
      const scale = Math.max(canvasW / imgW, canvasH / imgH)
      const drawW = imgW * scale
      const drawH = imgH * scale
      const offsetX = (canvasW - drawW) / 2
      const offsetY = (canvasH - drawH) / 2

      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = CANVAS_QUALITY
      ctx.clearRect(0, 0, canvasW, canvasH)
      ctx.drawImage(img, offsetX, offsetY, drawW, drawH)
    },
    [getLoadedFrame]
  )

  // Load a single frame by 1-indexed number
  const loadFrame = useCallback(
    (frameNumber: number): Promise<void> => {
      return new Promise((resolve) => {
        // Mobile: skip even-indexed frames (keep 1,3,5…)
        if (isMobileRef.current && MOBILE_SKIP_FRAMES && frameNumber % 2 === 0) {
          resolve()
          return
        }

        const arrayIndex = frameNumber - 1
        if (framesRef.current[arrayIndex]) {
          resolve()
          return
        }

        const img = new Image()
        img.decoding = 'async'

        let settled = false
        const handleLoad = () => {
          if (settled) return
          settled = true

          if (img.naturalWidth === 0) {
            resolve()
            return
          }

          framesRef.current[arrayIndex] = img
          setLoadedCount((c) => c + 1)
          resolve()
        }

        img.onload = handleLoad
        img.onerror = () => {
          if (settled) return
          settled = true
          resolve()
        }
        img.src = getFramePath(frameNumber)

        if (img.complete && img.naturalWidth > 0) {
          handleLoad()
        }
      })
    },
    []
  )

  // Load a range of frames sequentially in batches
  const loadBatch = useCallback(
    async (from: number, to: number) => {
      const promises: Promise<void>[] = []
      for (let i = from; i <= to; i++) {
        promises.push(loadFrame(i))
      }
      await Promise.all(promises)
    },
    [loadFrame]
  )

  useEffect(() => {
    if (loadingRef.current) return
    loadingRef.current = true

    isMobileRef.current = window.innerWidth < MOBILE_BREAKPOINT

    async function loadSequence() {
      // ── Critical path: first CRITICAL_FRAMES frames ──
      await loadBatch(1, CRITICAL_FRAMES)
      if (!readyRef.current) {
        readyRef.current = true
        setIsReady(true)
        onReady?.()
      }

      // ── Background: remaining frames in batches ──
      const remaining = TOTAL_FRAMES - CRITICAL_FRAMES
      const batchCount = Math.ceil(remaining / BATCH_SIZE)

      for (let b = 0; b < batchCount; b++) {
        const from = CRITICAL_FRAMES + b * BATCH_SIZE + 1
        const to = Math.min(CRITICAL_FRAMES + (b + 1) * BATCH_SIZE, TOTAL_FRAMES)

        // yield to browser between batches
        await new Promise<void>((r) => {
          if ('requestIdleCallback' in window) {
            ;(window as Window & typeof globalThis).requestIdleCallback(() => r())
          } else {
            setTimeout(r, 16)
          }
        })

        await loadBatch(from, to)
      }
    }

    loadSequence()
  }, [loadBatch, onReady])

  return {
    frames: framesRef.current,
    loadedCount,
    isReady,
    totalFrames: TOTAL_FRAMES,
    drawFrame,
  }
}

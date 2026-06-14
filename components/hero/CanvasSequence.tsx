'use client'

import React, { useEffect, useRef, useCallback } from 'react'
import { MAX_DPR } from '@/lib/constants'

interface CanvasSequenceProps {
  currentFrame: number
  drawFrame: (ctx: CanvasRenderingContext2D, index: number, canvas: HTMLCanvasElement) => void
  isReady: boolean
}

export default function CanvasSequence({ currentFrame, drawFrame, isReady }: CanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const rafRef = useRef<number | null>(null)
  const lastFrameRef = useRef<number>(-1)

  // Initialize canvas with DPR-aware dimensions
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
    const w = window.innerWidth
    const h = window.innerHeight

    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`

    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctxRef.current = ctx
      lastFrameRef.current = -1
    }
  }, [])

  // Redraw if frame changed
  const render = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    if (!canvas || !ctx || !isReady) return
    if (currentFrame === lastFrameRef.current) return

    lastFrameRef.current = currentFrame
    drawFrame(ctx, currentFrame, canvas)
  }, [currentFrame, drawFrame, isReady])

  // RAF render loop
  useEffect(() => {
    function loop() {
      render()
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [render])

  // Reset lastFrameRef when isReady flips to true to guarantee an initial draw
  useEffect(() => {
    if (isReady) {
      lastFrameRef.current = -1
      render()
    }
  }, [isReady, render])

  // Init + ResizeObserver
  useEffect(() => {
    initCanvas()

    let debounceTimer: ReturnType<typeof setTimeout>
    const observer = new ResizeObserver(() => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        initCanvas()
        lastFrameRef.current = -1 // force redraw
      }, 100)
    })

    if (canvasRef.current) observer.observe(canvasRef.current)

    return () => {
      observer.disconnect()
      clearTimeout(debounceTimer)
    }
  }, [initCanvas])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ willChange: 'transform' }}
      className="absolute inset-0 w-full h-full block"
    />
  )
}

'use client'

import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import { LENIS_LERP, LENIS_DURATION } from '@/lib/constants'

let lenisInstance: Lenis | null = null

export function useLenis(): Lenis | null {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Singleton: reuse existing instance
    if (lenisInstance) {
      lenisRef.current = lenisInstance
      return
    }

    const lenis = new Lenis({
      lerp: LENIS_LERP,
      duration: LENIS_DURATION,
      smoothWheel: true,
      touchMultiplier: 2,
    })

    lenisInstance = lenis
    lenisRef.current = lenis

    let rafId: number

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])

  return lenisRef.current
}

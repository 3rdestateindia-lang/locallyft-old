'use client'

import React, { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useImageSequence } from '@/hooks/useImageSequence'
import { useScrollPhase } from '@/hooks/useScrollPhase'

// Dynamic imports for client-only heavy modules
const CanvasSequence    = dynamic(() => import('./CanvasSequence'),    { ssr: false })
const CinematicOverlays = dynamic(() => import('./CinematicOverlays'), { ssr: false })
const DigitalWorld      = dynamic(() => import('./DigitalWorld'),      { ssr: false })
const HeroCopy          = dynamic(() => import('./HeroCopy'),          { ssr: false })
const Loader3D          = dynamic(() => import('./Loader3D'),          { ssr: false })

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4'

export default function HeroCinematic() {
  const outerRef  = useRef<HTMLDivElement>(null)   // h-[500vh] scroll container
  const stickyRef = useRef<HTMLDivElement>(null)   // h-screen sticky panel
  const videoRef  = useRef<HTMLVideoElement>(null) // world-reveal video

  const [scrollProgress, setScrollProgress] = useState(0)
  const [prefersReduced, setPrefersReduced]  = useState(false)
  const [sequenceReady, setSequenceReady]    = useState(false)
  const [loaderReady, setLoaderReady]        = useState(false)
  const [showWorldText, setShowWorldText]    = useState(false)

  const textTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { isReady, drawFrame } = useImageSequence({
    onReady: () => setSequenceReady(true),
  })

  const { frameIndex, phase, phaseProgress } = useScrollPhase(scrollProgress)
  const isLoaded = sequenceReady && loaderReady

  const isWorldReveal = phase === 'WORLD_REVEAL'

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaderReady(true), 5000)
    return () => window.clearTimeout(timer)
  }, [])

  // ── Detect reduced-motion preference ──
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // ── Scroll progress wiring ──
  useEffect(() => {
    if (!outerRef.current) return
    if (prefersReduced) return

    let raf = 0

    function updateProgress() {
      if (!outerRef.current) return

      const rect = outerRef.current.getBoundingClientRect()
      const scrollable = Math.max(1, outerRef.current.offsetHeight - window.innerHeight)
      const nextProgress = Math.max(0, Math.min(1, -rect.top / scrollable))

      setScrollProgress(nextProgress)
      raf = 0
    }

    function requestUpdate() {
      if (raf) return
      raf = requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [prefersReduced])

  // ── Video play/pause synced to WORLD_REVEAL phase ──
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isWorldReveal) {
      // Reset & play video when entering WORLD_REVEAL
      video.currentTime = 0
      setShowWorldText(false)
      if (textTimerRef.current) clearTimeout(textTimerRef.current)

      video.play().catch(() => {/* autoplay policy — silent fail */})

      // Show text after 1 real second of playback
      textTimerRef.current = setTimeout(() => setShowWorldText(true), 1000)
    } else {
      // Pause & reset when leaving WORLD_REVEAL
      video.pause()
      video.currentTime = 0
      setShowWorldText(false)
      if (textTimerRef.current) {
        clearTimeout(textTimerRef.current)
        textTimerRef.current = null
      }
    }

    return () => {
      if (textTimerRef.current) clearTimeout(textTimerRef.current)
    }
  }, [isWorldReveal])

  // ── Reduced-motion fallback: static first frame ──
  if (prefersReduced) {
    return (
      <section
        className="relative flex h-screen items-center justify-center overflow-hidden"
        style={{ background: '#050505' }}
      >
        <div
          style={{
            backgroundImage: 'url(/laptop-sequence/frame_0001.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'absolute',
            inset: 0,
            opacity: 0.9,
          }}
        />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-light text-white tracking-tight">
            Your Business,<br />Powered Online.
          </h1>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* ── Outer scroll container (800vh) ── */}
      <div ref={outerRef} style={{ height: '800vh', position: 'relative' }}>

        {/* ── Sticky cinematic viewport ── */}
        <div
          ref={stickyRef}
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
            background: '#050505',
          }}
        >
          {/* Loading veil — fades out once critical frames ready */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: '#050505',
              zIndex: 50,
              opacity: isLoaded ? 0 : 1,
              transition: 'opacity 0.8s ease',
              pointerEvents: isLoaded ? 'none' : 'all',
            }}
          >
            {!isLoaded && <Loader3D />}
          </div>

          {/* ── Canvas Image Sequence (layer 0) ── */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <CanvasSequence
              currentFrame={frameIndex}
              drawFrame={drawFrame}
              isReady={isReady}
            />
          </div>

          {/* ── Cinematic Post-Processing (layer 1) ── */}
          <CinematicOverlays
            phase={phase}
            phaseProgress={phaseProgress}
            progress={scrollProgress}
          />

          {/* ── Digital World Reveal (layer 2) ── */}
          <DigitalWorld
            phase={phase}
            phaseProgress={phaseProgress}
          />

          {/* ── World-Reveal Video (layer 2.5) — fades in over globe on WORLD_REVEAL ── */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 20,
              opacity: isWorldReveal ? 1 : 0,
              transition: 'opacity 0.8s ease',
              pointerEvents: 'none',
            }}
          >
            {/* Dark vignette so text stays readable over video */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 1,
                background:
                  'radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)',
              }}
            />
            <video
              ref={videoRef}
              src={VIDEO_URL}
              muted
              loop
              playsInline
              preload="auto"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* ── Hero Typography (layer 3) ── */}
          <HeroCopy
            phase={phase}
            phaseProgress={phaseProgress}
            showWorldText={showWorldText}
          />

          {/* ── Minimal top nav ── */}
          <nav
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 40,
              padding: '28px 40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              opacity: ['ZOOM_IN', 'FILL', 'WORLD_REVEAL'].includes(phase)
                ? Math.max(0, 1 - phaseProgress * 2)
                : 1,
              transition: 'opacity 0.1s linear',
            }}
          >
            {/* Logo monogram */}
            <div className="flex items-center gap-2.5">
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  border: '1px solid rgba(0,212,255,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0,212,255,0.04)',
                }}
              >
                <span style={{ color: '#00d4ff', fontSize: 12, fontWeight: 500 }}>L</span>
              </div>
              <span
                style={{
                  color: 'rgba(255,255,255,0.75)',
                  fontSize: 13,
                  fontWeight: 400,
                  letterSpacing: '0.08em',
                }}
              >
                LOCAL LYFT
              </span>
            </div>

            {/* Nav items */}
            <div className="hidden md:flex items-center gap-8">
              {['Services', 'Portfolio', 'Pricing', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  style={{
                    color: 'rgba(255,255,255,0.45)',
                    fontSize: 12,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                >
                  {item}
                </a>
              ))}
            </div>
          </nav>

          {/* ── Progress indicator (thin line at bottom) ── */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              zIndex: 40,
              height: 1,
              width: `${scrollProgress * 100}%`,
              background: 'linear-gradient(90deg, rgba(0,212,255,0.3), rgba(123,97,255,0.5))',
              transition: 'width 0.05s linear',
            }}
          />
        </div>
      </div>
    </>
  )
}

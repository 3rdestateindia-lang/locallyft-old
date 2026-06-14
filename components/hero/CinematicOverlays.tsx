'use client'

import React from 'react'
import type { PhaseName } from '@/types/hero'

interface CinematicOverlaysProps {
  phase: PhaseName
  phaseProgress: number
  progress: number
}

// Utility: linear interpolation
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * Math.max(0, Math.min(1, t))
}

// Map overall progress to ambient overlay opacity
function getAmbientOpacity(phase: PhaseName, phaseProgress: number): number {
  switch (phase) {
    case 'INTRO':        return 0
    case 'OPENING':      return lerp(0, 0.25, phaseProgress)
    case 'KEYBOARD_GLOW':return 0.3
    case 'SCREEN_ON':    return lerp(0.3, 0.55, phaseProgress)
    case 'HOLOGRAPHIC':  return 0.55
    case 'ZOOM_IN':      return lerp(0.55, 0.7, phaseProgress)
    case 'FILL':         return 0.7
    case 'WORLD_REVEAL': return lerp(0.7, 0.2, phaseProgress) // fades as world appears
    default:             return 0
  }
}

function getBloomOpacity(phase: PhaseName, phaseProgress: number): number {
  switch (phase) {
    case 'SCREEN_ON':    return lerp(0, 0.6, phaseProgress)
    case 'HOLOGRAPHIC':  return lerp(0.6, 0.8, phaseProgress)
    case 'ZOOM_IN':      return 0.8
    case 'FILL':         return lerp(0.8, 1, phaseProgress)
    case 'WORLD_REVEAL': return 1
    default:             return 0
  }
}

export default function CinematicOverlays({ phase, phaseProgress, progress }: CinematicOverlaysProps) {
  const ambientOpacity = getAmbientOpacity(phase, phaseProgress)
  const bloomOpacity = getBloomOpacity(phase, phaseProgress)

  return (
    <>
      {/* ── Cinematic Grain ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 animate-grain overflow-hidden opacity-[0.045]"
        style={{ mixBlendMode: 'overlay' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0, width: '300%', height: '300%', marginLeft: '-100%', marginTop: '-100%' }}
        >
          <filter id="grain-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-filter)" opacity="1" />
        </svg>
      </div>

      {/* ── Vignette ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 35%, rgba(5,5,5,0.92) 100%)',
          opacity: lerp(0.5, 1, progress),
          transition: 'opacity 0.1s linear',
        }}
      />

      {/* ── Ambient Atmospheric Haze (pure CSS) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: 'radial-gradient(ellipse at bottom center, rgba(0,212,255,0.05), transparent 60%)',
          opacity: ambientOpacity,
          mixBlendMode: 'screen',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* ── Bloom Glow (electric blue haze around screen) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 52%, rgba(0,212,255,0.08) 0%, transparent 70%)',
          opacity: bloomOpacity,
          filter: 'blur(12px)',
          transition: 'opacity 0.2s ease',
        }}
      />

      {/* ── Top edge fade to black (cinematic letterbox feel) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24"
        style={{
          background: 'linear-gradient(to bottom, rgba(5,5,5,0.8), transparent)',
        }}
      />

      {/* ── Bottom edge fade ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24"
        style={{
          background: 'linear-gradient(to top, rgba(5,5,5,0.8), transparent)',
        }}
      />

      {/* ── Screen flicker on SCREEN_ON phase ── */}
      {(phase === 'SCREEN_ON' || phase === 'HOLOGRAPHIC') && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 animate-flicker"
          style={{
            background: 'radial-gradient(ellipse 50% 30% at 50% 52%, rgba(0,212,255,0.04) 0%, transparent 100%)',
          }}
        />
      )}
    </>
  )
}

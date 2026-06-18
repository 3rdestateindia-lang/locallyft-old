'use client'

import React, { useEffect, useRef } from 'react'
import type { PhaseName } from '@/types/hero'
import type { ParticleConfig } from '@/types/hero'

interface DigitalWorldProps {
  phase: PhaseName
  phaseProgress: number
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t))
}

function getWorldOpacity(phase: PhaseName, pp: number): number {
  if (phase === 'WORLD_REVEAL') return lerp(0, 1, pp)
  return 0
}

function getWorldScale(phase: PhaseName, pp: number): number {
  if (phase === 'WORLD_REVEAL') return lerp(1.04, 1.0, pp)
  return 1.08
}

function getUIOpacity(phase: PhaseName, pp: number): number {
  if (phase === 'HOLOGRAPHIC')  return lerp(0, 0.6, pp)
  if (phase === 'ZOOM_IN')      return lerp(0.6, 0.8, pp)
  if (phase === 'FILL')         return lerp(0.8, 0, pp)
  return 0
}

function getGridOpacity(phase: PhaseName, pp: number): number {
  if (phase === 'WORLD_REVEAL') return lerp(0, 0.7, pp)
  return 0
}

export default function DigitalWorld({ phase, phaseProgress }: DigitalWorldProps) {
  const particleCanvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number | null>(null)
  const particlesRef = useRef<ParticleConfig[]>([])

  const worldOpacity = getWorldOpacity(phase, phaseProgress)
  const worldScale   = getWorldScale(phase, phaseProgress)
  const uiOpacity    = getUIOpacity(phase, phaseProgress)
  const gridOpacity  = getGridOpacity(phase, phaseProgress)

  const isActive = phase === 'WORLD_REVEAL'
  const showHud = phase === 'HOLOGRAPHIC' || phase === 'ZOOM_IN' || phase === 'FILL'

  // ── Particle System ──
  useEffect(() => {
    const canvas = particleCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function resize() {
      if (!canvas) return
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Init particles
    const PARTICLE_COUNT = 55
    const colors = ['rgba(0,212,255,', 'rgba(123,97,255,', 'rgba(180,220,255,']

    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:       Math.random() * window.innerWidth,
      y:       Math.random() * window.innerHeight,
      vx:      (Math.random() - 0.5) * 0.35,
      vy:      (Math.random() - 0.5) * 0.35 - 0.15,
      size:    Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      color:   colors[Math.floor(Math.random() * colors.length)],
      life:    Math.random() * 200,
      maxLife: 200 + Math.floor(Math.random() * 300),
    }))

    function drawParticles() {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.life++

        if (p.life > p.maxLife) {
          p.x      = Math.random() * canvas.width
          p.y      = canvas.height + 10
          p.life   = 0
          p.maxLife = 200 + Math.floor(Math.random() * 300)
        }

        const fadeIn  = Math.min(p.life / 40, 1)
        const fadeOut = Math.min((p.maxLife - p.life) / 40, 1)
        const alpha   = p.opacity * Math.min(fadeIn, fadeOut)

        // Glowing core
        ctx.beginPath()
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)
        grad.addColorStop(0,   `${p.color}${alpha})`)
        grad.addColorStop(0.4, `${p.color}${alpha * 0.5})`)
        grad.addColorStop(1,   `${p.color}0)`)
        ctx.fillStyle = grad
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fill()
      })

      animFrameRef.current = requestAnimationFrame(drawParticles)
    }

    animFrameRef.current = requestAnimationFrame(drawParticles)

    return () => {
      window.removeEventListener('resize', resize)
      if (animFrameRef.current !== null) cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 z-20">

      {/* ── Perspective Grid ── */}
      <div
        style={{
          opacity: gridOpacity,
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(0,212,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.07) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 60%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 60%, black 30%, transparent 100%)',
          transform: `perspective(600px) rotateX(30deg) scale(${worldScale})`,
          transformOrigin: 'center 70%',
          transition: 'transform 0.05s linear',
        }}
      />

      {/* ── Code-driven holographic interface ── */}
      {showHud && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: uiOpacity,
            transform: `scale(${lerp(0.96, 1.04, phaseProgress)})`,
            transition: 'opacity 0.15s linear, transform 0.15s linear',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '12%',
              top: '24%',
              width: '18vw',
              maxWidth: 260,
              minWidth: 150,
              height: 1,
              background: 'linear-gradient(90deg, rgba(0,212,255,0.75), transparent)',
              boxShadow: '0 0 18px rgba(0,212,255,0.35)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: '11%',
              top: '31%',
              width: '14vw',
              maxWidth: 220,
              minWidth: 120,
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(123,97,255,0.75))',
              boxShadow: '0 0 18px rgba(123,97,255,0.35)',
            }}
          />
          <div
            className="animate-pulse-glow"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '34vmin',
              height: '34vmin',
              transform: 'translate(-50%, -50%) rotateX(68deg)',
              borderRadius: '50%',
              border: '1px solid rgba(0,212,255,0.18)',
              boxShadow: '0 0 60px rgba(0,212,255,0.12), inset 0 0 40px rgba(0,212,255,0.08)',
            }}
          />
        </div>
      )}

      {/* ── Scan Line ── */}
      {isActive && (
        <div
          className="animate-scan-line"
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            opacity: worldOpacity * 0.4,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.6), transparent)',
              filter: 'blur(1px)',
            }}
          />
        </div>
      )}

      {/* ── Particle Canvas ── */}
      <canvas
        ref={particleCanvasRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: isActive ? Math.min(worldOpacity * 1.5, 1) : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* ── Horizontal ambient glow bands ── */}
      {isActive && (
        <>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse 100% 20% at 50% 30%, rgba(0,212,255,0.06) 0%, transparent 100%)',
              opacity: worldOpacity,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse 80% 15% at 50% 70%, rgba(123,97,255,0.05) 0%, transparent 100%)',
              opacity: worldOpacity,
            }}
          />
        </>
      )}
    </div>
  )
}

'use client'

import React, { useEffect, useRef, useState } from 'react'

/* ─── Floating particle dot ─────────────────────────────────────── */
function Particle({ x, y, size, delay, duration, color }: {
  x: number; y: number; size: number; delay: number; duration: number; color: string
}) {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 ${size * 3}px ${color}`,
        opacity: 0,
        animation: `loaderParticle ${duration}s ease-in-out ${delay}s infinite`,
        pointerEvents: 'none',
      }}
    />
  )
}

const PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  delay: Math.random() * 4,
  duration: Math.random() * 4 + 3,
  color: i % 3 === 0 ? 'rgba(0,212,255,0.8)' : i % 3 === 1 ? 'rgba(123,97,255,0.8)' : 'rgba(255,255,255,0.5)',
}))

/* ─── Horizontal scan line ──────────────────────────────────────── */
function ScanLine() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 2,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.4) 20%, rgba(0,212,255,0.8) 50%, rgba(0,212,255,0.4) 80%, transparent)',
          boxShadow: '0 0 20px rgba(0,212,255,0.5)',
          animation: 'loaderScan 3s linear infinite',
        }}
      />
    </div>
  )
}

/* ─── Corner brackets ───────────────────────────────────────────── */
function CornerBrackets() {
  const corner = (pos: React.CSSProperties) => (
    <div style={{ position: 'absolute', width: 24, height: 24, ...pos }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        borderColor: 'rgba(0,212,255,0.5)', borderStyle: 'solid',
        borderTopWidth: pos.top !== undefined ? 1 : 0,
        borderLeftWidth: pos.left !== undefined ? 1 : 0,
        borderBottomWidth: pos.bottom !== undefined ? 1 : 0,
        borderRightWidth: pos.right !== undefined ? 1 : 0,
      }} />
    </div>
  )
  return (
    <>
      {corner({ top: -8, left: -8 })}
      {corner({ top: -8, right: -8 })}
      {corner({ bottom: -8, left: -8 })}
      {corner({ bottom: -8, right: -8 })}
    </>
  )
}

export default function Loader3D() {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'intro' | 'loading' | 'done'>('intro')
  const [glitch, setGlitch] = useState(false)
  const [dots, setDots] = useState('')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Progress ticker
  useEffect(() => {
    const timeout = setTimeout(() => setPhase('loading'), 400)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (phase !== 'loading') return
    intervalRef.current = setInterval(() => {
      setProgress(p => {
        const next = p + (Math.random() * 3 + 0.5)
        if (next >= 100) {
          clearInterval(intervalRef.current!)
          setPhase('done')
          return 100
        }
        return next
      })
    }, 40)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [phase])

  // Glitch bursts
  useEffect(() => {
    const trigger = () => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 140)
    }
    const id1 = setTimeout(trigger, 900)
    const id2 = setTimeout(trigger, 2100)
    const id3 = setInterval(trigger, 3400)
    return () => { clearTimeout(id1); clearTimeout(id2); clearInterval(id3) }
  }, [])

  // Dots animation
  useEffect(() => {
    const id = setInterval(() => setDots(d => d.length >= 3 ? '' : d + '.'), 420)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      {/* ── Keyframes injected inline ───────────────────────────────── */}
      <style>{`
        @keyframes loaderParticle {
          0%   { opacity: 0; transform: translateY(0) scale(0.5); }
          30%  { opacity: 1; }
          70%  { opacity: 0.6; }
          100% { opacity: 0; transform: translateY(-40px) scale(1.2); }
        }
        @keyframes loaderScan {
          0%   { top: -2px; }
          100% { top: 100%; }
        }
        @keyframes loaderLogoReveal {
          0%   { clip-path: inset(0 100% 0 0); opacity: 0; }
          100% { clip-path: inset(0 0% 0 0);   opacity: 1; }
        }
        @keyframes loaderSubReveal {
          0%   { opacity: 0; transform: translateY(12px) letterSpacing: 0.5em; }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes loaderBarGlow {
          0%, 100% { box-shadow: 0 0 8px rgba(0,212,255,0.4); }
          50%       { box-shadow: 0 0 24px rgba(0,212,255,0.9), 0 0 48px rgba(0,212,255,0.3); }
        }
        @keyframes loaderBarSweep {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        @keyframes loaderOrbit {
          0%   { transform: rotate(0deg)   translateX(52px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(52px) rotate(-360deg); }
        }
        @keyframes loaderOrbitReverse {
          0%   { transform: rotate(0deg)   translateX(72px) rotate(0deg); }
          100% { transform: rotate(-360deg) translateX(72px) rotate(360deg); }
        }
        @keyframes loaderPing {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50%       { transform: scale(1.4); opacity: 1; }
        }
        @keyframes loaderRingExpand {
          0%   { transform: scale(0.6); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes loaderGridMove {
          0%   { transform: translateY(0); }
          100% { transform: translateY(40px); }
        }
        @keyframes loaderGlitchH {
          0%  { clip-path: inset(20% 0 60% 0); transform: translateX(-6px) skewX(-2deg); }
          25% { clip-path: inset(60% 0 10% 0); transform: translateX(6px)  skewX(2deg); }
          50% { clip-path: inset(40% 0 30% 0); transform: translateX(-3px); }
          75% { clip-path: inset(10% 0 70% 0); transform: translateX(4px)  skewX(-1deg); }
          100%{ clip-path: inset(20% 0 60% 0); transform: translateX(-6px); }
        }
        @keyframes loaderFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes loaderVignettePulse {
          0%, 100% { opacity: 0.7; }
          50%       { opacity: 1; }
        }
      `}</style>

      {/* ── Root overlay ──────────────────────────────────────────── */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: '#050505',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          zIndex: 9999,
        }}
      >

        {/* Particle field */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {PARTICLES.map(p => <Particle key={p.id} {...p} />)}
        </div>

        {/* Perspective grid floor */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: '-20%',
            right: '-20%',
            height: '55%',
            backgroundImage:
              'linear-gradient(rgba(0,212,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.07) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            transform: 'perspective(600px) rotateX(55deg)',
            transformOrigin: 'bottom center',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 60%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 60%)',
            animation: 'loaderGridMove 2s linear infinite',
            pointerEvents: 'none',
          }}
        />

        {/* Vignette */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(5,5,5,0.9) 100%)',
            pointerEvents: 'none',
            animation: 'loaderVignettePulse 4s ease-in-out infinite',
          }}
        />

        {/* Scan line */}
        <ScanLine />

        {/* ── Central content ───────────────────────────────────── */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, zIndex: 10 }}>

          {/* Orbiting rings + logo mark */}
          <div style={{ position: 'relative', width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 44 }}>

            {/* Expanding ping rings */}
            <div style={{ position: 'absolute', width: 80, height: 80, borderRadius: '50%', border: '1px solid rgba(0,212,255,0.3)', animation: 'loaderRingExpand 2.4s ease-out infinite' }} />
            <div style={{ position: 'absolute', width: 80, height: 80, borderRadius: '50%', border: '1px solid rgba(0,212,255,0.3)', animation: 'loaderRingExpand 2.4s ease-out 0.8s infinite' }} />
            <div style={{ position: 'absolute', width: 80, height: 80, borderRadius: '50%', border: '1px solid rgba(0,212,255,0.3)', animation: 'loaderRingExpand 2.4s ease-out 1.6s infinite' }} />

            {/* Outer orbit ring */}
            <div style={{ position: 'absolute', width: 160, height: 160, borderRadius: '50%', border: '1px dashed rgba(0,212,255,0.15)', animation: 'loaderOrbitReverse 12s linear infinite' }}>
              {/* Orbit dot */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%', width: 6, height: 6,
                borderRadius: '50%', background: '#00d4ff', boxShadow: '0 0 12px #00d4ff, 0 0 24px rgba(0,212,255,0.5)',
                animation: 'loaderOrbitReverse 12s linear infinite',
                marginTop: -3, marginLeft: -3,
              }} />
            </div>

            {/* Inner orbit ring */}
            <div style={{ position: 'absolute', width: 118, height: 118, borderRadius: '50%', border: '1px solid rgba(123,97,255,0.25)', animation: 'loaderOrbit 7s linear infinite' }}>
              <div style={{
                position: 'absolute', top: '50%', left: '50%', width: 5, height: 5,
                borderRadius: '50%', background: '#7b61ff', boxShadow: '0 0 10px #7b61ff, 0 0 20px rgba(123,97,255,0.5)',
                animation: 'loaderOrbit 7s linear infinite',
                marginTop: -2.5, marginLeft: -2.5,
              }} />
            </div>

            {/* Core glowing orb */}
            <div style={{
              position: 'relative',
              width: 72, height: 72,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 38% 36%, rgba(0,212,255,0.25), rgba(123,97,255,0.15), rgba(5,5,5,0.9))',
              border: '1px solid rgba(0,212,255,0.4)',
              boxShadow: '0 0 30px rgba(0,212,255,0.2), inset 0 0 30px rgba(0,212,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: 'loaderPing 2.5s ease-in-out infinite',
            }}>
              {/* Brand Logo Mark */}
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="ld-grad-main" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#00d4ff" />
                    <stop offset="100%" stopColor="#7b61ff" />
                  </linearGradient>
                  <linearGradient id="ld-grad-bg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="rgba(0,212,255,0.15)" />
                    <stop offset="100%" stopColor="rgba(123,97,255,0.15)" />
                  </linearGradient>
                  <filter id="ld-glow">
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                {/* Hexagonal bg */}
                <path d="M20 2 L35.6 11 L35.6 29 L20 38 L4.4 29 L4.4 11 Z" fill="url(#ld-grad-bg)" stroke="url(#ld-grad-main)" strokeWidth="0.8" opacity="0.9" />
                {/* Left L */}
                <path d="M10 11 L10 25 L17.5 25" stroke="url(#ld-grad-main)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" filter="url(#ld-glow)" />
                {/* Right L */}
                <path d="M21.5 15 L21.5 29 L30 29" stroke="#7b61ff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                {/* Center accent dot */}
                <circle cx="20" cy="20" r="1.4" fill="url(#ld-grad-main)" opacity="0.9" />
              </svg>
            </div>

            {/* Corner brackets around the whole ring assembly */}
            <div style={{ position: 'absolute', inset: 4 }}>
              <CornerBrackets />
            </div>
          </div>

          {/* Brand name with reveal + optional glitch */}
          <div style={{ position: 'relative', marginBottom: 6 }}>
            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                fontWeight: 800,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                background: 'linear-gradient(135deg, #ffffff 0%, #00d4ff 45%, #7b61ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: 0,
                animation: 'loaderLogoReveal 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s both',
                position: 'relative',
              }}
            >
              LOCAL LYFT
            </h1>

            {/* Glitch clone layer */}
            {glitch && (
              <>
                <h1
                  aria-hidden="true"
                  style={{
                    position: 'absolute', inset: 0,
                    fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                    fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase',
                    color: '#00d4ff', margin: 0,
                    animation: 'loaderGlitchH 0.14s steps(2) both',
                    mixBlendMode: 'screen',
                  }}
                >
                  LOCAL LYFT
                </h1>
                <h1
                  aria-hidden="true"
                  style={{
                    position: 'absolute', inset: 0,
                    fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                    fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase',
                    color: '#7b61ff', margin: 0,
                    transform: 'translateX(4px)',
                    animation: 'loaderGlitchH 0.14s steps(2) 0.03s both',
                    mixBlendMode: 'screen',
                  }}
                >
                  LOCAL LYFT
                </h1>
              </>
            )}
          </div>

          {/* Tagline */}
          <p
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'rgba(0,212,255,0.55)',
              margin: '0 0 48px',
              animation: 'loaderFadeIn 0.7s ease 1.1s both',
            }}
          >
            Elevating Local Businesses
          </p>

          {/* Progress bar area */}
          <div style={{ width: 'min(420px, 80vw)', animation: 'loaderFadeIn 0.7s ease 1.3s both' }}>

            {/* Status row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>
                Initializing{dots}
              </span>
              <span style={{ fontSize: 10, letterSpacing: '0.1em', color: 'rgba(0,212,255,0.7)', fontFamily: 'monospace' }}>
                {Math.round(progress)}%
              </span>
            </div>

            {/* Track */}
            <div style={{
              position: 'relative',
              height: 2,
              background: 'rgba(255,255,255,0.06)',
              borderRadius: 99,
              overflow: 'hidden',
            }}>
              {/* Fill */}
              <div style={{
                position: 'absolute',
                inset: '0 auto 0 0',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #00d4ff, #7b61ff)',
                borderRadius: 99,
                transition: 'width 0.05s linear',
                animation: 'loaderBarGlow 1.5s ease-in-out infinite',
              }} />
              {/* Sweep shimmer */}
              {progress < 100 && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  width: '25%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                  animation: 'loaderBarSweep 1.6s linear infinite',
                }} />
              )}
            </div>

            {/* Segment dots */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
              {[0, 25, 50, 75, 100].map(mark => (
                <div key={mark} style={{
                  width: 3, height: 3, borderRadius: '50%',
                  background: progress >= mark ? '#00d4ff' : 'rgba(255,255,255,0.15)',
                  boxShadow: progress >= mark ? '0 0 6px #00d4ff' : 'none',
                  transition: 'all 0.3s ease',
                }} />
              ))}
            </div>
          </div>

        </div>

      </div>
    </>
  )
}

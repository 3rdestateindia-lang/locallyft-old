'use client'

import React from 'react'

/**
 * LocalLyftLogo — reusable brand logo component
 *
 * Props:
 *  size        — controls overall scale (default 40 = height of the mark in px)
 *  variant     — 'full' (mark + wordmark), 'mark' (icon only), 'wordmark' (text only)
 *  glow        — whether to render the cyan glow halo behind the mark
 *  animated    — subtle pulse animation on the mark
 */
interface LogoProps {
  size?: number
  variant?: 'full' | 'mark' | 'wordmark'
  glow?: boolean
  animated?: boolean
  className?: string
  style?: React.CSSProperties
}

export default function LocalLyftLogo({
  size = 40,
  variant = 'full',
  glow = false,
  animated = false,
  className,
  style,
}: LogoProps) {
  const markSize = size
  const gap = Math.round(size * 0.28)

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap,
        userSelect: 'none',
        ...style,
      }}
    >
      {/* ── Icon Mark ── */}
      {(variant === 'full' || variant === 'mark') && (
        <div
          style={{
            position: 'relative',
            width: markSize,
            height: markSize,
            flexShrink: 0,
          }}
        >
          {/* Outer glow halo */}
          {glow && (
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: -markSize * 0.35,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0,212,255,0.18) 0%, transparent 70%)',
                animation: animated ? 'llLogoPulse 3s ease-in-out infinite' : undefined,
                pointerEvents: 'none',
              }}
            />
          )}

          <svg
            width={markSize}
            height={markSize}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              animation: animated ? 'llLogoPulse 3s ease-in-out infinite' : undefined,
              display: 'block',
            }}
          >
            <defs>
              {/* Main gradient: cyan → purple */}
              <linearGradient id="ll-grad-main" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#00d4ff" />
                <stop offset="100%" stopColor="#7b61ff" />
              </linearGradient>
              {/* Subtle background fill */}
              <linearGradient id="ll-grad-bg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(0,212,255,0.08)" />
                <stop offset="100%" stopColor="rgba(123,97,255,0.08)" />
              </linearGradient>
              {/* Gloss overlay */}
              <linearGradient id="ll-gloss" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
              <filter id="ll-glow-filter">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Hexagonal container bg */}
            <path
              d="M20 2 L35.6 11 L35.6 29 L20 38 L4.4 29 L4.4 11 Z"
              fill="url(#ll-grad-bg)"
              stroke="url(#ll-grad-main)"
              strokeWidth="0.8"
              opacity="0.9"
            />

            {/* Gloss sheen on top half */}
            <path
              d="M20 2 L35.6 11 L35.6 20 L4.4 20 L4.4 11 Z"
              fill="url(#ll-gloss)"
            />

            {/* ── L L letterform — two bold L shapes ── */}
            {/* Left L */}
            <path
              d="M10 11 L10 25 L17.5 25"
              stroke="url(#ll-grad-main)"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#ll-glow-filter)"
            />
            {/* Right L */}
            <path
              d="M21.5 15 L21.5 29 L30 29"
              stroke="#7b61ff"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Connecting accent dot */}
            <circle cx="20" cy="20" r="1.4" fill="url(#ll-grad-main)" opacity="0.7" />

            {/* Corner tick marks — top left & bottom right */}
            <path d="M5.5 10.5 L8 10.5 M5.5 10.5 L5.5 13" stroke="rgba(0,212,255,0.4)" strokeWidth="0.8" strokeLinecap="round" />
            <path d="M34.5 29.5 L32 29.5 M34.5 29.5 L34.5 27" stroke="rgba(123,97,255,0.4)" strokeWidth="0.8" strokeLinecap="round" />
          </svg>
        </div>
      )}

      {/* ── Wordmark ── */}
      {(variant === 'full' || variant === 'wordmark') && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          {/* Main name */}
          <span
            style={{
              fontSize: Math.round(size * 0.42),
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.85) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.1,
            }}
          >
            Local Lyft
          </span>
          {/* Tagline */}
          <span
            style={{
              fontSize: Math.round(size * 0.2),
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(0,212,255,0.6)',
              lineHeight: 1.4,
              marginTop: 2,
            }}
          >
            Digital Solutions
          </span>
        </div>
      )}

      {/* Inline keyframes for animated variant */}
      {animated && (
        <style>{`
          @keyframes llLogoPulse {
            0%, 100% { filter: drop-shadow(0 0 4px rgba(0,212,255,0.3)); }
            50%       { filter: drop-shadow(0 0 12px rgba(0,212,255,0.7)) drop-shadow(0 0 24px rgba(123,97,255,0.3)); }
          }
        `}</style>
      )}
    </div>
  )
}

'use client'

import React, { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { PhaseName } from '@/types/hero'

interface HeroCopyProps {
  phase: PhaseName
  phaseProgress: number
  /** Controlled by HeroCinematic: true once 1s of world-reveal video has played */
  showWorldText?: boolean
}

const HEADLINE = 'Your Business,\nPowered Online.'
const SUBLINE = 'We build fast, modern, SEO-optimised websites for clinics, hospitals, shops, cafes & local service businesses — so customers find you first.'
const EYEBROW = 'LOCAL LYFT · DIGITAL SOLUTIONS FOR LOCAL INDIA'
const CTA_TEXT = 'Get Your Website Now'

function getCopyVisible(phase: PhaseName): boolean {
  return ['INTRO', 'OPENING', 'KEYBOARD_GLOW', 'SCREEN_ON', 'HOLOGRAPHIC'].includes(phase)
}

function getCopyOpacity(phase: PhaseName, pp: number): number {
  if (phase === 'ZOOM_IN') return 1 - Math.min(1, pp * 1.5) // fade out faster
  if (phase === 'FILL') return 0
  if (phase === 'WORLD_REVEAL') return 0
  return 1
}

export default function HeroCopy({ phase, phaseProgress, showWorldText = false }: HeroCopyProps) {
  const copyOpacity = getCopyOpacity(phase, phaseProgress)
  const copyTranslate = phase === 'ZOOM_IN' ? phaseProgress * -40 : 0

  const showCopy = getCopyVisible(phase)
  // Only show world copy once 1s of video has elapsed (controlled by parent)
  const showWorld = phase === 'WORLD_REVEAL' && showWorldText

  return (
    <>
      {/* ── Main hero copy ── */}
      <div
        className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center px-5 text-center sm:px-6"
        style={{
          opacity: copyOpacity,
          transform: `translateY(${copyTranslate}px)`,
          transition: 'opacity 0.05s linear, transform 0.05s linear',
        }}
      >
        {/* Eyebrow */}
        <AnimatePresence>
          {(phase === 'INTRO' || phase === 'OPENING') && (
            <motion.span
              key="eyebrow"
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, letterSpacing: '0.14em' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 block max-w-[92vw] text-[10px] font-semibold uppercase text-electric-blue sm:mb-8 sm:text-xs"
              style={{ color: '#50e6ff', textShadow: '0 0 18px rgba(0,212,255,0.45)' }}
            >
              {EYEBROW}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Headline */}
        <AnimatePresence>
          {showCopy && (
            <motion.h1
              key="headline"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              variants={{
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } },
                hidden: {},
              }}
              className="max-w-5xl whitespace-pre-line font-geist text-4xl font-semibold leading-[1.08] tracking-normal text-white sm:text-6xl md:text-7xl lg:text-8xl"
              style={{ textShadow: '0 3px 28px rgba(0,0,0,0.72), 0 0 18px rgba(0,212,255,0.18)' }}
            >
              {HEADLINE.split('\n').map((line, li) => (
                <span key={li} className="block">
                  {line.split(' ').map((word, wi) => (
                    <motion.span
                      key={wi}
                      variants={{
                        hidden: { opacity: 0, y: 28, filter: 'blur(3px)' },
                        visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
                      }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      style={{ display: 'inline-block', marginRight: '0.25em' }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Divider line */}
        <AnimatePresence>
          {(phase === 'KEYBOARD_GLOW' || phase === 'SCREEN_ON' || phase === 'HOLOGRAPHIC') && (
            <motion.div
              key="divider"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="my-7 h-px w-32 origin-left"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.7), transparent)' }}
            />
          )}
        </AnimatePresence>

        {/* Subline */}
        <AnimatePresence>
          {(phase === 'KEYBOARD_GLOW' || phase === 'SCREEN_ON' || phase === 'HOLOGRAPHIC') && (
            <motion.p
              key="subline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="max-w-2xl text-sm font-normal leading-relaxed sm:text-base md:text-lg"
              style={{ color: 'rgba(255,255,255,0.82)', textShadow: '0 2px 18px rgba(0,0,0,0.7)' }}
            >
              {SUBLINE}
            </motion.p>
          )}
        </AnimatePresence>

        {/* CTA */}
        <AnimatePresence>
          {(phase === 'SCREEN_ON' || phase === 'HOLOGRAPHIC') && (
            <motion.button
              key="cta"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group relative mt-10 overflow-hidden rounded-full px-8 py-3.5 text-sm font-semibold text-white"
              style={{
                border: '1px solid rgba(80,230,255,0.55)',
                background: 'rgba(0,40,52,0.58)',
                backdropFilter: 'blur(14px)',
                boxShadow: '0 0 26px rgba(0,212,255,0.18), inset 0 0 18px rgba(255,255,255,0.04)',
              }}
            >
              <span className="relative z-10 flex items-center gap-2.5">
                {CTA_TEXT}
                <span
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  {String.fromCharCode(8594)}
                </span>
              </span>
              {/* hover shimmer */}
              <span
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                aria-hidden="true"
              />
            </motion.button>
          )}
        </AnimatePresence>
      </div>



      {/* ── World Reveal copy ── */}
      <AnimatePresence>
        {showWorld && (
          <motion.div
            key="world-copy"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-5 sm:px-8"
            style={{ gap: '1.25rem' }}
          >
            {/* Eyebrow */}
            <span
              className="block text-[11px] font-semibold uppercase tracking-widest"
              style={{ color: '#50e6ff', letterSpacing: '0.18em', textShadow: '0 0 16px rgba(0,212,255,0.5)' }}
            >
              LOCAL LYFT FOR NEIGHBOURHOOD BUSINESSES
            </span>

            {/* Headline — editorial bold serif */}
            <h2
              className="max-w-5xl"
              style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 'clamp(1.8rem, 3.2vw, 3rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                color: '#ffffff',
                textShadow: '0 4px 32px rgba(0,0,0,0.82)',
                margin: 0,
              }}
            >
              Websites that turn local searches into real customers.
            </h2>

            {/* Body */}
            <p
              style={{
                maxWidth: '42rem',
                fontSize: 'clamp(0.85rem, 1.4vw, 1rem)',
                fontWeight: 400,
                lineHeight: 1.65,
                color: 'rgba(255,255,255,0.72)',
                textShadow: '0 2px 18px rgba(0,0,0,0.7)',
                margin: 0,
              }}
            >
              We build fast, trustworthy websites for clinics, hospitals, physiotherapy centers,
              shops, cafes and local service brands that need more calls, bookings and walk-ins.
            </p>

            {/* Feature pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
              {['✦ Local SEO ready', '✦ Calls and bookings', '✦ Fast launch'].map((pill) => (
                <span
                  key={pill}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.35rem 1rem',
                    borderRadius: '999px',
                    border: '1px solid rgba(255,255,255,0.18)',
                    background: 'rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(10px)',
                    fontSize: '0.72rem',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    color: 'rgba(255,255,255,0.75)',
                  }}
                >
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Scroll hint (INTRO only) ── */}
      <AnimatePresence>
        {phase === 'INTRO' && (
          <motion.div
            key="scroll-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 1.1, delay: 1.1 }}
            className="pointer-events-none absolute bottom-10 inset-x-0 z-30 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase font-[400]" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Scroll to begin
            </span>
            {/* Animated scroll indicator */}
            <div
              className="relative h-10 w-5 rounded-full"
              style={{ border: '1px solid rgba(255,255,255,0.15)' }}
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full"
                style={{ background: 'rgba(0,212,255,0.7)' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

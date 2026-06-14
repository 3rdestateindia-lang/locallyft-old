'use client'

import React, { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { PhaseName } from '@/types/hero'

interface HeroCopyProps {
  phase: PhaseName
  phaseProgress: number
}

const HEADLINE = 'Your Business,\nPowered Online.'
const SUBLINE  = 'We build fast, modern, SEO-optimised websites for clinics, hospitals, shops, cafes & local service businesses — so customers find you first.'
const EYEBROW  = 'LOCAL LYFT · DIGITAL SOLUTIONS FOR LOCAL INDIA'
const CTA_TEXT = 'Get Your Website Now'
const ZOOM_WORDS = ['GROW', 'RANK', 'CONVERT']

function getCopyVisible(phase: PhaseName): boolean {
  return ['INTRO', 'OPENING', 'KEYBOARD_GLOW', 'SCREEN_ON', 'HOLOGRAPHIC'].includes(phase)
}

function getCopyOpacity(phase: PhaseName, pp: number): number {
  if (phase === 'ZOOM_IN')      return 1 - Math.min(1, pp * 1.5) // fade out faster
  if (phase === 'FILL')         return 0
  if (phase === 'WORLD_REVEAL') return 0
  return 1
}

export default function HeroCopy({ phase, phaseProgress }: HeroCopyProps) {
  const zoomWords = useMemo(() => ZOOM_WORDS, [])
  const copyOpacity   = getCopyOpacity(phase, phaseProgress)
  const copyTranslate = phase === 'ZOOM_IN' ? phaseProgress * -40 : 0

  const showCopy  = getCopyVisible(phase)
  const showZoom  = phase === 'ZOOM_IN' || phase === 'FILL'
  const showWorld = phase === 'WORLD_REVEAL'

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
                hidden:  {},
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
                        hidden:  { opacity: 0, y: 28, filter: 'blur(3px)' },
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

      {/* ── Zoom 3D text (passes camera) ── */}
      <AnimatePresence>
        {showZoom && (
          <motion.div
            key="zoom-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'FILL' ? 1 - phaseProgress : phaseProgress }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, ease: 'linear' }}
            className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center overflow-hidden text-center"
            style={{ perspective: 900 }}
          >
            {zoomWords.map((word, index) => {
              const lane = index - 1
              const depth = phaseProgress * 520 + index * 120
              return (
                <motion.span
                  key={word}
                  className="absolute text-3xl font-semibold uppercase text-transparent sm:text-5xl md:text-6xl"
                  style={{
                    WebkitTextStroke: '1px rgba(80,230,255,0.75)',
                    transform: `translate3d(${lane * 18}vw, ${lane * 14}vh, ${depth}px) rotateY(${lane * -16}deg)`,
                    opacity: Math.max(0, 1 - phaseProgress * 0.65),
                    textShadow: '0 0 34px rgba(0,212,255,0.36)',
                  }}
                >
                  {word}
                </motion.span>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── World Reveal copy ── */}
      <AnimatePresence>
        {showWorld && (
          <motion.div
            key="world-copy"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 text-center"
          >
            <h2
              className="max-w-5xl px-6 text-4xl font-semibold tracking-normal text-white sm:text-5xl md:text-6xl"
              style={{ textShadow: '0 3px 30px rgba(0,0,0,0.78), 0 0 20px rgba(0,212,255,0.18)' }}
            >
              From Your Doorstep to Every Screen.
            </h2>
            <div
              className="h-px w-32 my-4"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.6), transparent)' }}
            />
            <p
              className="max-w-2xl px-6 text-sm font-semibold uppercase"
              style={{
                color: 'rgba(80,230,255,0.95)',
                textShadow: '0 2px 18px rgba(0,0,0,0.82)',
                letterSpacing: '0.08em',
              }}
            >
              SEO-optimised sites that drive calls, appointments & walk-ins — built for local India.
            </p>
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

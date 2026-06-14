'use client'

import React, { useRef, useEffect, useState } from 'react'

const STATS = [
  { value: 50, suffix: '+', label: 'Websites Delivered' },
  { value: 7, suffix: ' days', label: 'Average Launch Time' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 3, suffix: 'x', label: 'Avg. Traffic Growth' },
]

const DIFFERENTIATORS = [
  {
    icon: '⚡',
    title: 'Lightning Fast Delivery',
    desc: 'Most websites go live in 7–14 days. No lengthy agency timelines. We respect your urgency.',
    color: '#00d4ff',
  },
  {
    icon: '📍',
    title: 'Local SEO First',
    desc: "Built to rank on Google for 'near me' searches. Your neighbours should find you, not your competitor.",
    color: '#7b61ff',
  },
  {
    icon: '📱',
    title: 'Mobile-First Always',
    desc: '95% of your customers search on phones. Every site we build is pixel-perfect on every screen size.',
    color: '#00d4ff',
  },
  {
    icon: '💰',
    title: 'Honest Pricing',
    desc: 'No hidden costs. No agency overhead. Flat project fees with transparent monthly maintenance plans.',
    color: '#7b61ff',
  },
  {
    icon: '🔧',
    title: 'You Own Everything',
    desc: 'Your domain, your hosting, your code. We hand over full ownership. No lock-in, ever.',
    color: '#00d4ff',
  },
  {
    icon: '🤝',
    title: 'Always Reachable',
    desc: 'Real humans who speak your language. WhatsApp, call, or email — we respond within hours, not days.',
    color: '#7b61ff',
  },
]

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect() }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function useCounter(target: number, active: boolean, duration = 1800) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = 0
    const step = Math.ceil(target / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [active, target, duration])
  return count
}

function StatCard({ stat, active, index }: { stat: typeof STATS[0]; active: boolean; index: number }) {
  const count = useCounter(stat.value, active)
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '32px 24px',
        borderRadius: 16,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
        border: '1px solid rgba(255,255,255,0.07)',
        opacity: active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
    >
      <div
        style={{
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          background: 'linear-gradient(135deg, #00d4ff, #7b61ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: 10,
        }}
      >
        {count}{stat.suffix}
      </div>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.05em', fontWeight: 500 }}>
        {stat.label}
      </div>
    </div>
  )
}

export default function WhyUsSection() {
  const { ref, inView } = useInView(0.1)

  return (
    <section
      id="why-us"
      ref={ref}
      style={{
        background: 'linear-gradient(180deg, #050505 0%, #07090f 50%, #050505 100%)',
        padding: '120px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient gradient */}
      <div aria-hidden="true" style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 800, height: 400, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(123,97,255,0.05) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 80,
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#00d4ff',
              textShadow: '0 0 18px rgba(0,212,255,0.5)',
              marginBottom: 20,
            }}
          >
            Why Local Lyft
          </span>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              marginBottom: 20,
            }}
          >
            The IT Partner Built{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00d4ff, #7b61ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              for Local India
            </span>
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
            We're not a big agency. We're a focused team that's passionate about helping local businesses compete online.
          </p>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 20,
            marginBottom: 80,
          }}
        >
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} active={inView} index={i} />
          ))}
        </div>

        {/* Differentiators grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}
        >
          {DIFFERENTIATORS.map((item, i) => (
            <DiffCard key={item.title} item={item} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function DiffCard({ item, index, inView }: { item: typeof DIFFERENTIATORS[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        gap: 20,
        padding: '28px 24px',
        borderRadius: 16,
        background: hovered ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.025)',
        border: `1px solid ${hovered ? item.color + '44' : 'rgba(255,255,255,0.06)'}`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.7s ease ${index * 0.07}s, transform 0.7s ease ${index * 0.07}s, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease`,
        boxShadow: hovered ? `0 0 30px ${item.color}15` : 'none',
        cursor: 'default',
      }}
    >
      <div
        style={{
          fontSize: 28,
          flexShrink: 0,
          width: 48,
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 12,
          background: `${item.color}12`,
          border: `1px solid ${item.color}25`,
          transition: 'transform 0.3s ease',
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        {item.icon}
      </div>
      <div>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: '#ffffff', marginBottom: 6, letterSpacing: '-0.01em' }}>
          {item.title}
        </h3>
        <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>
          {item.desc}
        </p>
      </div>
    </div>
  )
}

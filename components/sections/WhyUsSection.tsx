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
    icon: '📍',
    title: 'Local SEO Champion',
    desc: 'Built to rank high on Google for "near me" searches, sending local customers directly to you instead of competitors.',
    color: '#00d4ff',
  },
  {
    icon: '⚡',
    title: 'Express Delivery (7-14 Days)',
    desc: 'Launch your fast, modern website in two weeks or less, respecting your business timelines and urgency.',
    color: '#7b61ff',
  },
  {
    icon: '🔧',
    title: 'Full Handoff & Ownership',
    desc: 'Complete control over your domain, host, and code from day one. Real-time access with absolutely no lock-in.',
    color: '#00d4ff',
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
        background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
        border: '1px solid rgba(255,255,255,0.06)',
        opacity: active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
    >
      <div
        style={{
          fontSize: 'clamp(2.3rem, 4.5vw, 3.2rem)',
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

function DiffRow({ item, index, inView }: { item: typeof DIFFERENTIATORS[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        gap: 20,
        padding: '20px',
        borderRadius: 12,
        background: hovered ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)',
        border: `1px solid ${hovered ? item.color + '33' : 'rgba(255,255,255,0.04)'}`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s, background 0.3s ease, border-color 0.3s ease`,
        cursor: 'default',
      }}
    >
      <div
        style={{
          fontSize: 22,
          flexShrink: 0,
          width: 42,
          height: 42,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          background: `${item.color}12`,
          border: `1px solid ${item.color}20`,
          transition: 'transform 0.3s ease',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
        }}
      >
        {item.icon}
      </div>
      <div>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: '#ffffff', marginBottom: 4 }}>
          {item.title}
        </h3>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.55, margin: 0 }}>
          {item.desc}
        </p>
      </div>
    </div>
  )
}

function VideoMockup() {
  const [hovered, setHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: hovered 
          ? '0 20px 50px rgba(0, 212, 255, 0.15), 0 0 30px rgba(123, 97, 255, 0.1)'
          : '0 10px 30px rgba(0, 0, 0, 0.5)',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: hovered ? 'translateY(-6px) scale(1.01)' : 'translateY(0) scale(1)',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {/* Browser Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 18px',
          background: 'rgba(255, 255, 255, 0.02)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        {/* Color Dots */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
        </div>
        {/* Fake URL Bar */}
        <div
          style={{
            flexGrow: 1,
            margin: '0 20px',
            background: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '6px',
            fontSize: '11px',
            color: 'rgba(255, 255, 255, 0.35)',
            textAlign: 'center',
            padding: '4px 0',
            letterSpacing: '0.04em',
            border: '1px solid rgba(255, 255, 255, 0.03)',
          }}
        >
          locallyft.in/digital-excellence
        </div>
      </div>
      {/* Video Content */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', background: '#000' }}>
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4"
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        {/* Subtle overlay glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 60%, rgba(5,5,5,0.4))',
            pointerEvents: 'none',
          }}
        />
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
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80vw',
          height: '60vh',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(0, 212, 255, 0.03) 0%, rgba(123, 97, 255, 0.03) 50%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Main Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 56,
            alignItems: 'center',
            marginBottom: 80,
          }}
        >
          {/* Left Column: Text + Differentiators */}
          <div>
            {/* Header */}
            <div
              style={{
                marginBottom: 40,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
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
                  marginBottom: 16,
                }}
              >
                Why LocalLyft
              </span>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: '-0.03em',
                  color: '#ffffff',
                  marginBottom: 18,
                }}
              >
                The Unfair Advantage{' '}
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
              <p
                style={{
                  fontSize: 16,
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                We combine cinematic high-end aesthetics with fast search performance to build sites that win patients, rank #1, and convert local clicks into walk-ins.
              </p>
            </div>

            {/* Differentiators */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {DIFFERENTIATORS.map((item, i) => (
                <DiffRow key={item.title} item={item} index={i} inView={inView} />
              ))}
            </div>
          </div>

          {/* Right Column: Video Mockup */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(32px)',
              transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
            }}
          >
            <VideoMockup />
          </div>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 20,
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: 60,
          }}
        >
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} active={inView} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

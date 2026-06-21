'use client'

import React, { useRef, useEffect, useState } from 'react'

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

export default function PricingSection() {
  const { ref, inView } = useInView(0.1)
  const [hovered, setHovered] = useState(false)

  const features = [
    'Professional, mobile-responsive website',
    'Google Maps & Google My Business integration',
    'WhatsApp & Call CTA buttons',
    'Local SEO setup for better visibility',
    'Dedicated support & maintenance',
    'Free domain & hosting (1st year)',
  ]

  return (
    <section
      id="pricing"
      ref={ref}
      style={{
        background: '#050505',
        padding: 'clamp(64px, 10vw, 120px) 20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background blobs */}
      <div aria-hidden="true" style={{ position: 'absolute', top: '15%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: '10%', right: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(123,97,255,0.05) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

      {/* Grid */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,212,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.02) 1px, transparent 1px)', backgroundSize: '80px 80px', maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 100%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 64,
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
            Simple Pricing
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
            Transparent Prices,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00d4ff, #7b61ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Zero Surprises
            </span>
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
            We believe in honest pricing. No hourly billing, no hidden fees. Get your business online with our affordable starting packages.
          </p>
        </div>

        {/* Single Pricing Card */}
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: 'relative',
            borderRadius: 24,
            padding: 'clamp(24px, 5vw, 48px) clamp(16px, 4vw, 48px)',
            background: 'linear-gradient(160deg, rgba(0,212,255,0.06), rgba(123,97,255,0.06))',
            border: `1px solid ${hovered ? 'rgba(0,212,255,0.5)' : 'rgba(255,255,255,0.1)'}`,
            boxShadow: hovered 
              ? '0 0 60px rgba(0,212,255,0.15), 0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)' 
              : '0 20px 60px rgba(0,0,0,0.4)',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.6s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* Highlight Badge */}
          <div
            style={{
              position: 'absolute',
              top: -14,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(90deg, #00d4ff, #7b61ff)',
              color: '#050505',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '6px 24px',
              borderRadius: 100,
              whiteSpace: 'nowrap',
            }}
          >
            Customized For You
          </div>

          <div style={{ marginBottom: 32 }}>
            <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>Projects starting from</span>
            <div style={{ marginTop: 12 }}>
              <span
                style={{
                  fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  background: 'linear-gradient(135deg, #00d4ff, #ffffff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                ₹5,999
              </span>
              <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', marginLeft: 12 }}>one-time</span>
            </div>
          </div>

          <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 32 }} />

          {/* Features Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))', gap: 16, width: '100%', marginBottom: 40, textAlign: 'left' }}>
            {features.map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 15, color: 'rgba(255,255,255,0.8)' }}>
                <span style={{ color: '#00d4ff', fontSize: 16, flexShrink: 0, marginTop: 2 }}>✓</span>
                {f}
              </div>
            ))}
          </div>

          <a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: 'clamp(12px, 2vw, 16px) clamp(20px, 4vw, 40px)',
              borderRadius: 100,
              border: '1px solid rgba(0,212,255,0.4)',
              background: 'linear-gradient(90deg, rgba(0,212,255,0.2), rgba(123,97,255,0.2))',
              color: '#ffffff',
              fontSize: 16,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 20px rgba(0,212,255,0.1)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'linear-gradient(90deg, rgba(0,212,255,0.3), rgba(123,97,255,0.3))'
              el.style.boxShadow = '0 0 30px rgba(0,212,255,0.25)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'linear-gradient(90deg, rgba(0,212,255,0.2), rgba(123,97,255,0.2))'
              el.style.boxShadow = '0 0 20px rgba(0,212,255,0.1)'
            }}
          >
            Discuss Your Project →
          </a>
        </div>

        {/* Note */}
        <p
          style={{
            textAlign: 'center',
            marginTop: 48,
            fontSize: 13,
            color: 'rgba(255,255,255,0.3)',
            opacity: inView ? 1 : 0,
            transition: 'opacity 1s ease 0.5s',
          }}
        >
          Final price depends on project requirements. All prices exclusive of GST. Hosting & domain renewal from year 2 at market rates. <a href="#contact" style={{ color: 'rgba(0,212,255,0.7)', textDecoration: 'underline' }}>Let's talk.</a>
        </p>
      </div>
    </section>
  )
}

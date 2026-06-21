'use client'

import React, { useRef, useEffect, useState } from 'react'

const STEPS = [
  {
    number: '01',
    title: 'Discovery Call',
    subtitle: 'Free · 30 min',
    desc: 'We understand your business, your customers, and your goals. Zero jargon, just a friendly conversation about what your website needs to do.',
    icon: '📞',
    color: '#00d4ff',
  },
  {
    number: '02',
    title: 'Design & Build',
    subtitle: '7–14 Days',
    desc: 'Our team designs and develops your website — mobile-first, fast-loading, and built for local SEO. You see progress every step of the way.',
    icon: '🎨',
    color: '#7b61ff',
  },
  {
    number: '03',
    title: 'Review & Launch',
    subtitle: 'You Approve First',
    desc: "We walk you through your new website, make any tweaks, and launch only when you're 100% happy. Your domain, your hosting, your control.",
    icon: '🚀',
    color: '#00d4ff',
  },
  {
    number: '04',
    title: 'Grow & Support',
    subtitle: 'Ongoing',
    desc: 'Monthly updates, performance reports, SEO improvements, and a team you can call anytime. We grow with your business.',
    icon: '📈',
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

export default function ProcessSection() {
  const { ref, inView } = useInView(0.1)

  return (
    <section
      id="process"
      ref={ref}
      style={{
        background: '#050505',
        padding: 'clamp(64px, 10vw, 120px) 20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top separator glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.3), rgba(123,97,255,0.3), transparent)',
        }}
      />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 56,
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
              color: '#7b61ff',
              textShadow: '0 0 18px rgba(123,97,255,0.5)',
              marginBottom: 20,
            }}
          >
            How It Works
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
            From Idea to{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #7b61ff, #00d4ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Live Website
            </span>
            {' '}in Days
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            A simple, transparent process designed for busy business owners. No technical knowledge needed.
          </p>
        </div>

        {/* Steps */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
            gap: 0,
            position: 'relative',
          }}
        >
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              style={{
                position: 'relative',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(50px)',
                transition: `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`,
              }}
            >
              {/* Connector line (not on last) */}
              {i < STEPS.length - 1 && (
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: 48,
                    left: '50%',
                    width: '100%',
                    height: 1,
                    background: `linear-gradient(90deg, ${step.color}55, ${STEPS[i + 1].color}33)`,
                    zIndex: 0,
                    display: 'none',
                  }}
                  className="process-connector"
                />
              )}

              {/* Step card */}
              <div
                style={{
                  padding: 'clamp(24px, 4vw, 40px) clamp(16px, 3vw, 28px)',
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {/* Number badge */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    border: `1px solid ${step.color}44`,
                    background: `radial-gradient(circle at center, ${step.color}12, transparent 70%)`,
                    marginBottom: 8,
                    position: 'relative',
                    boxShadow: `0 0 24px ${step.color}20`,
                  }}
                >
                  <span style={{ fontSize: 28 }}>{step.icon}</span>
                  {/* Step number */}
                  <span
                    style={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: step.color,
                      color: '#050505',
                      fontSize: 10,
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {i + 1}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: step.color,
                    marginBottom: 10,
                    marginTop: 16,
                    textShadow: `0 0 12px ${step.color}60`,
                  }}
                >
                  {step.subtitle}
                </div>

                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: '#ffffff',
                    marginBottom: 14,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {step.title}
                </h3>

                <p
                  style={{
                    fontSize: 14,
                    color: 'rgba(255,255,255,0.48)',
                    lineHeight: 1.75,
                    maxWidth: 240,
                    margin: '0 auto',
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div
          style={{
            textAlign: 'center',
            marginTop: 60,
            opacity: inView ? 1 : 0,
            transition: 'opacity 1s ease 0.6s',
          }}
        >
          <a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '14px 32px',
              borderRadius: 100,
              border: '1px solid rgba(0,212,255,0.35)',
              background: 'rgba(0,40,52,0.5)',
              backdropFilter: 'blur(12px)',
              color: '#ffffff',
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 0 24px rgba(0,212,255,0.12)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(0,212,255,0.25)'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.6)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(0,212,255,0.12)'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.35)'
            }}
          >
            Book a Free Discovery Call
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}

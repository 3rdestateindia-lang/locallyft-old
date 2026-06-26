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

export default function AboutUsSection() {
  const { ref, inView } = useInView(0.1)

  return (
    <section
      id="about"
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

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 48,
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
              marginBottom: 16,
              background: 'rgba(0,212,255,0.1)',
              padding: '6px 14px',
              borderRadius: 100,
            }}
          >
            Our Story
          </span>
          <h2
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Experience You Can Trust
          </h2>
        </div>

        {/* Content */}
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
            color: 'rgba(255,255,255,0.7)',
            fontSize: 'clamp(16px, 2vw, 18px)',
            lineHeight: 1.7,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <p>
            At Local Lyft, we believe every local business deserves a professional online presence. We design modern, fast, and mobile-friendly websites that help businesses attract more customers, build credibility, and grow with confidence.
          </p>
          <p>
            Backed by 12+ years of experience in software development and quality engineering, we bring the same attention to detail, performance, and reliability used in enterprise software to every website we create. From business websites and landing pages to portfolio sites, our goal is to deliver solutions that look great, perform exceptionally, and generate results.
          </p>
          <p>
            Whether you're a startup, clinic, retail store, or service provider, we're here to help you establish a strong digital presence and stand out in your local market.
          </p>
          <p style={{
            color: '#fff',
            fontWeight: 500,
            fontSize: 'clamp(18px, 2vw, 22px)',
            marginTop: '16px',
            background: 'linear-gradient(90deg, #00d4ff, #7b61ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}>
            Our mission: Lift local businesses through exceptional web design.
          </p>
        </div>
      </div>
    </section>
  )
}

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

export default function PortfolioSection() {
  const { ref, inView } = useInView(0.1)
  const [isHoveringIframe, setIsHoveringIframe] = useState(false)

  return (
    <section
      id="portfolio"
      ref={ref}
      style={{
        background: 'linear-gradient(180deg, #050505 0%, #08090f 50%, #050505 100%)',
        padding: '120px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid bg */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(123,97,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(123,97,255,0.025) 1px, transparent 1px)', backgroundSize: '80px 80px', maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
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
            Our Work
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
            Websites That{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #7b61ff, #00d4ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Actually Work
            </span>
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Experience our latest live application right here.
          </p>
        </div>

        {/* Featured Showcase Card */}
        <div
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 24,
            padding: '40px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 40,
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s ease 0.2s',
            boxShadow: '0 20px 80px rgba(0,0,0,0.5)',
            position: 'relative',
          }}
        >
          {/* Ambient Glow */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              height: '80%',
              background: 'radial-gradient(ellipse, rgba(0,212,255,0.1) 0%, transparent 60%)',
              filter: 'blur(80px)',
              zIndex: -1,
            }}
          />

          {/* Top text area */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', zIndex: 10 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 20 }}>
              {['Healthcare', 'Booking System', 'Local SEO', 'Live Application'].map(tag => (
                <span key={tag} style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#00d4ff', border: '1px solid rgba(0,212,255,0.2)', padding: '5px 14px', borderRadius: 20, background: 'rgba(0,212,255,0.05)' }}>
                  {tag}
                </span>
              ))}
            </div>

            <h3 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, color: '#ffffff', marginBottom: 16, letterSpacing: '-0.02em' }}>
              Physiocure Clinic
            </h3>

            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', maxWidth: 650, lineHeight: 1.6, marginBottom: 28 }}>
              A fully optimized, mobile-first website designed specifically for local healthcare.
              Featuring seamless appointment scheduling, therapist profiles, and integrated SEO to drive real patient walk-ins.
            </p>

            <a
              href="https://www.physiocures.in/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 32px',
                borderRadius: 100,
                background: 'linear-gradient(135deg, #00d4ff, #7b61ff)',
                color: '#fff',
                fontWeight: 700,
                textDecoration: 'none',
                letterSpacing: '0.02em',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                boxShadow: '0 0 24px rgba(0,212,255,0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.style.boxShadow = '0 0 32px rgba(0,212,255,0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = '0 0 24px rgba(0,212,255,0.3)'
              }}
            >
              Visit Live Site <span>→</span>
            </a>
          </div>

          {/* Interactive Browser Frame */}
          <div
            onMouseEnter={() => setIsHoveringIframe(true)}
            onMouseLeave={() => setIsHoveringIframe(false)}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 900,
              margin: '0 auto',
              aspectRatio: '16/10',
              borderRadius: 16,
              overflow: 'hidden',
              border: `1px solid ${isHoveringIframe ? 'rgba(0,212,255,0.4)' : 'rgba(255,255,255,0.1)'}`,
              background: '#000',
              boxShadow: isHoveringIframe ? '0 20px 60px rgba(0,212,255,0.15)' : '0 10px 40px rgba(0,0,0,0.4)',
              transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
              zIndex: 10,
            }}
          >
            {/* Mock browser chrome */}
            <div style={{ height: 36, background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 6, borderBottom: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
              {['#ff5f56', '#ffbd2e', '#27c93f'].map(c => (
                <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
              ))}
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <div style={{ background: 'rgba(255,255,255,0.04)', padding: '4px 20px', borderRadius: 12, fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em' }}>
                  physiocures.in
                </div>
              </div>
            </div>

            {/* Live Video Preview */}
            <div style={{ width: '100%', height: 'calc(100% - 36px)', position: 'relative', background: '#050505', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <video
                src="/golu.mp4?v=2"
                autoPlay
                loop
                muted
                playsInline
                disablePictureInPicture
                disableRemotePlayback
                onEnded={(e) => {
                  // Fallback to force loop in case the browser ignores the loop attribute
                  e.currentTarget.currentTime = 0;
                  e.currentTarget.play().catch(() => { });
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover', // Ensures the video fills the frame beautifully without black bars
                  objectPosition: 'top',
                  pointerEvents: 'none', // Prevents browser overlays (like PiP or translation tools) on hover
                }}
              />

              {/* Inner subtle glow to make the boundary feel premium */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  boxShadow: 'inset 0 0 20px rgba(0,212,255,0.15)',
                  pointerEvents: 'none'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

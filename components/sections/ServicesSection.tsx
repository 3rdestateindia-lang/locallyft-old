'use client'

import React, { useRef, useEffect, useState } from 'react'

const SERVICES = [
  {
    icon: '🏥',
    title: 'Clinics & Hospitals',
    desc: 'Online appointment booking, doctor profiles, patient trust-building pages, and Google Maps integration.',
    tag: 'Healthcare',
    glow: 'rgba(0,212,255,0.18)',
    border: 'rgba(0,212,255,0.25)',
  },
  {
    icon: '🛍️',
    title: 'Local Shops & Retail',
    desc: 'Product catalogues, WhatsApp ordering, directions, and local SEO so nearby shoppers find you first.',
    tag: 'Retail',
    glow: 'rgba(123,97,255,0.18)',
    border: 'rgba(123,97,255,0.25)',
  },
  {
    icon: '☕',
    title: 'Cafes & Restaurants',
    desc: 'Digital menus, table reservations, Instagram-ready photo galleries, and Google My Business sync.',
    tag: 'F&B',
    glow: 'rgba(255,165,0,0.15)',
    border: 'rgba(255,165,0,0.22)',
  },
  {
    icon: '🧘',
    title: 'Physiotherapy & Wellness',
    desc: 'Service pages, therapist bios, online session booking, and testimonials that convert visitors to patients.',
    tag: 'Wellness',
    glow: 'rgba(0,255,150,0.13)',
    border: 'rgba(0,255,150,0.2)',
  },
  {
    icon: '🔧',
    title: 'Service Businesses',
    desc: 'Plumbers, electricians, AC technicians — get discovered, get called. Lead-gen pages that work 24/7.',
    tag: 'Services',
    glow: 'rgba(255,80,80,0.13)',
    border: 'rgba(255,80,80,0.2)',
  },
  {
    icon: '🛒',
    title: 'E-Commerce Starter',
    desc: 'Start selling online. Product listings, payment gateway, delivery tracking — built for small Indian retailers.',
    tag: 'E-Commerce',
    glow: 'rgba(0,212,255,0.14)',
    border: 'rgba(80,230,255,0.22)',
  },
]

function useInView(threshold = 0.15) {
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

export default function ServicesSection() {
  const { ref, inView } = useInView(0.1)

  return (
    <section
      id="services"
      ref={ref}
      style={{
        background: 'linear-gradient(180deg, #050505 0%, #080c12 40%, #050505 100%)',
        padding: 'clamp(64px, 10vw, 120px) 20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Ambient blobs */}
      <div aria-hidden="true" style={{ position: 'absolute', top: '10%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: '10%', right: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(123,97,255,0.05) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        {/* Section header */}
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
              color: '#00d4ff',
              textShadow: '0 0 18px rgba(0,212,255,0.5)',
              marginBottom: 16,
            }}
          >
            What We Build
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              marginBottom: 16,
            }}
          >
            Websites Built for{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00d4ff, #7b61ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Every Local Business
            </span>
          </h2>
          <p style={{ fontSize: 'clamp(14px, 2.5vw, 17px)', color: 'rgba(255,255,255,0.55)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Whatever your business type — we craft a digital presence that turns visitors into loyal customers.
          </p>
        </div>

        {/* Cards grid — single column on mobile, multi on wider */}
        <style>{`
          .services-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 16px;
          }
          @media (min-width: 540px) {
            .services-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (min-width: 900px) {
            .services-grid { grid-template-columns: repeat(3, 1fr); gap: 24px; }
          }
        `}</style>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service, index, inView }: { service: typeof SERVICES[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        position: 'relative',
        borderRadius: 20,
        padding: 'clamp(20px, 4vw, 36px) clamp(16px, 3vw, 28px)',
        background: hovered
          ? 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))'
          : 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
        border: `1px solid ${hovered ? service.border : 'rgba(255,255,255,0.07)'}`,
        backdropFilter: 'blur(12px)',
        boxShadow: hovered
          ? `0 0 40px ${service.glow}, 0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)`
          : '0 4px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
        cursor: 'default',
        transition: `opacity 0.7s ease ${index * 0.08}s, transform 0.7s ease ${index * 0.08}s, background 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1)`,
      }}
    >
      {/* Tag */}
      <span
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.35)',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '3px 8px',
          borderRadius: 20,
        }}
      >
        {service.tag}
      </span>

      {/* Icon */}
      <div
        style={{
          fontSize: 36,
          marginBottom: 16,
          display: 'inline-block',
          filter: hovered ? 'drop-shadow(0 0 12px rgba(0,212,255,0.4))' : 'none',
          transition: 'filter 0.3s ease',
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        {service.icon}
      </div>

      <h3
        style={{
          fontSize: 'clamp(16px, 2.5vw, 20px)',
          fontWeight: 600,
          color: hovered ? '#ffffff' : 'rgba(255,255,255,0.9)',
          marginBottom: 10,
          letterSpacing: '-0.02em',
          transition: 'color 0.3s ease',
        }}
      >
        {service.title}
      </h3>

      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, transition: 'color 0.3s ease' }}>
        {service.desc}
      </p>
    </div>
  )
}

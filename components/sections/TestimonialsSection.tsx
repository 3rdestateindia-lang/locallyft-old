'use client'

import React, { useRef, useEffect, useState } from 'react'

const TESTIMONIALS = [
  {
    name: 'Dr. Priya Sharma',
    role: 'Orthopedic Clinic, Pune',
    avatar: '👩‍⚕️',
    text: 'Before Local Lyft, patients couldn\'t even find us on Google. Now we get 15–20 appointment requests per week directly from the website. Best investment for our clinic.',
    rating: 5,
  },
  {
    name: 'Raj Patel',
    role: 'Grocery Store Owner, Surat',
    avatar: '🛒',
    text: 'I was skeptical about needing a website for my shop. But now my regulars share my online menu and I\'ve got customers from 3 new neighbourhoods. The team is very responsive.',
    rating: 5,
  },
  {
    name: 'Ananya Krishnan',
    role: 'Café Owner, Bengaluru',
    avatar: '☕',
    text: 'The website looks stunning — exactly the vibe I wanted for my café. Our Instagram link now sends people to our booking page and it just works seamlessly.',
    rating: 5,
  },
  {
    name: 'Mohammed Asif',
    role: 'AC Repair Services, Hyderabad',
    avatar: '🔧',
    text: 'Got 3 big commercial contracts just because businesses found my website when searching for AC maintenance. Local Lyft paid for itself in the first month.',
    rating: 5,
  },
  {
    name: 'Dr. Sunita Verma',
    role: 'Physiotherapy Center, Delhi',
    avatar: '🧘',
    text: 'The team understood exactly what a healthcare website needs — trust signals, clear services, easy appointment booking. Patient count is up 40% since launch.',
    rating: 5,
  },
  {
    name: 'Vikram Malhotra',
    role: 'Electrical Contractor, Jaipur',
    avatar: '⚡',
    text: 'Simple, professional, and fast. Within 10 days I had a website that made me look like a proper established business. Now I\'m competing with bigger players.',
    rating: 5,
  },
]

// Duplicate for seamless marquee
const ALL = [...TESTIMONIALS, ...TESTIMONIALS]

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

export default function TestimonialsSection() {
  const { ref, inView } = useInView(0.1)
  const [paused, setPaused] = useState(false)

  return (
    <section
      id="testimonials"
      ref={ref}
      style={{
        background: 'linear-gradient(180deg, #050505 0%, #080c12 50%, #050505 100%)',
        padding: '120px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient */}
      <div aria-hidden="true" style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 300, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,212,255,0.04) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      {/* Header */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: 64,
          padding: '0 24px',
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
          Client Stories
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
          Real Businesses,{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #7b61ff, #00d4ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Real Results
          </span>
        </h2>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
          From clinics to cafes — see how local businesses across India are growing with Local Lyft.
        </p>
      </div>

      {/* Marquee wrapper */}
      <div
        style={{ position: 'relative', overflow: 'hidden' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Left fade */}
        <div aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(90deg, #050505, transparent)', zIndex: 10, pointerEvents: 'none' }} />
        {/* Right fade */}
        <div aria-hidden="true" style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(270deg, #050505, transparent)', zIndex: 10, pointerEvents: 'none' }} />

        <div
          style={{
            display: 'flex',
            gap: 20,
            width: 'max-content',
            animation: paused ? 'none' : 'marquee 40s linear infinite',
            opacity: inView ? 1 : 0,
            transition: 'opacity 1s ease 0.3s',
          }}
        >
          {ALL.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: typeof TESTIMONIALS[0] }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 340,
        flexShrink: 0,
        padding: '28px 28px',
        borderRadius: 20,
        background: hovered
          ? 'linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))'
          : 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
        border: `1px solid ${hovered ? 'rgba(0,212,255,0.25)' : 'rgba(255,255,255,0.07)'}`,
        backdropFilter: 'blur(12px)',
        boxShadow: hovered ? '0 0 40px rgba(0,212,255,0.1), 0 20px 60px rgba(0,0,0,0.4)' : '0 4px 30px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        cursor: 'default',
      }}
    >
      {/* Stars */}
      <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <span key={i} style={{ color: '#fbbf24', fontSize: 14 }}>★</span>
        ))}
      </div>

      <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 24, fontStyle: 'italic' }}>
        "{testimonial.text}"
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(123,97,255,0.15))',
            border: '1px solid rgba(0,212,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            flexShrink: 0,
          }}
        >
          {testimonial.avatar}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#ffffff' }}>{testimonial.name}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{testimonial.role}</div>
        </div>
      </div>
    </div>
  )
}

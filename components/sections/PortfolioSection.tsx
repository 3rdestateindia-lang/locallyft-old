'use client'

import React, { useRef, useEffect, useState } from 'react'

const FILTERS = ['All', 'Clinics', 'Shops', 'Cafes', 'Services']

const PROJECTS = [
  {
    category: 'Clinics',
    title: 'SmileCare Dental Clinic',
    desc: 'Online appointment booking, doctor profiles, before/after gallery — 3x more enquiries in month 1.',
    tags: ['Booking System', 'SEO', 'Google Maps'],
    color: 'rgba(0,212,255,0.6)',
    glow: 'rgba(0,212,255,0.15)',
    accent: '#00d4ff',
    emoji: '🦷',
    metric: '+210% Appointments',
  },
  {
    category: 'Cafes',
    title: 'The Roasted Bean',
    desc: 'Digital menu, table reservation, Instagram gallery sync — became the top-ranked café on Google Maps.',
    tags: ['Digital Menu', 'Reservations', 'GMB'],
    color: 'rgba(255,165,0,0.7)',
    glow: 'rgba(255,165,0,0.12)',
    accent: '#ffaa00',
    emoji: '☕',
    metric: '#1 on Google Maps',
  },
  {
    category: 'Shops',
    title: 'Patel Electronics & Mobiles',
    desc: 'Product catalogue with WhatsApp ordering, EMI info page — doubled walk-in footfall from online searches.',
    tags: ['Catalogue', 'WhatsApp', 'Local SEO'],
    color: 'rgba(123,97,255,0.7)',
    glow: 'rgba(123,97,255,0.15)',
    accent: '#7b61ff',
    emoji: '📱',
    metric: '2x Walk-in Traffic',
  },
  {
    category: 'Clinics',
    title: 'PerfectBalance Physiotherapy',
    desc: 'Online bookings, therapist bios, testimonials — fully booked within 2 weeks of launch.',
    tags: ['Booking', 'Testimonials', 'Healthcare'],
    color: 'rgba(0,255,150,0.6)',
    glow: 'rgba(0,255,150,0.12)',
    accent: '#00ff96',
    emoji: '🧘',
    metric: 'Fully Booked in 2 Weeks',
  },
  {
    category: 'Services',
    title: 'CoolBreeze AC Services',
    desc: 'Lead-gen landing page, before/after service gallery — 40+ new B2B clients from Google organic.',
    tags: ['Lead Gen', 'B2B', 'SEO'],
    color: 'rgba(255,80,80,0.6)',
    glow: 'rgba(255,80,80,0.12)',
    accent: '#ff5050',
    emoji: '❄️',
    metric: '40+ B2B Clients',
  },
  {
    category: 'Shops',
    title: 'Meera Saree House',
    desc: 'WhatsApp catalogue, festival offers page, customer photo gallery — 5x online enquiries.',
    tags: ['Catalogue', 'Gallery', 'Offers'],
    color: 'rgba(255,100,200,0.6)',
    glow: 'rgba(255,100,200,0.12)',
    accent: '#ff64c8',
    emoji: '👗',
    metric: '5x Online Enquiries',
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

export default function PortfolioSection() {
  const { ref, inView } = useInView(0.1)
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === activeFilter)

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
            Not just pretty — every site is built to drive real business results.
          </p>
        </div>

        {/* Filter tabs */}
        <div
          style={{
            display: 'flex',
            gap: 10,
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: 52,
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.8s ease 0.2s',
          }}
        >
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: '8px 20px',
                borderRadius: 100,
                border: `1px solid ${activeFilter === f ? 'rgba(0,212,255,0.5)' : 'rgba(255,255,255,0.1)'}`,
                background: activeFilter === f ? 'rgba(0,212,255,0.1)' : 'rgba(255,255,255,0.03)',
                color: activeFilter === f ? '#00d4ff' : 'rgba(255,255,255,0.4)',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: activeFilter === f ? '0 0 20px rgba(0,212,255,0.15)' : 'none',
                letterSpacing: '0.04em',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
          }}
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index, inView }: { project: typeof PROJECTS[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 20,
        overflow: 'hidden',
        border: `1px solid ${hovered ? project.color.replace('0.6', '0.35').replace('0.7', '0.35') : 'rgba(255,255,255,0.07)'}`,
        background: hovered
          ? `linear-gradient(145deg, ${project.glow}, rgba(255,255,255,0.02))`
          : 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
        boxShadow: hovered ? `0 0 50px ${project.glow}, 0 20px 60px rgba(0,0,0,0.5)` : '0 4px 30px rgba(0,0,0,0.3)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s, box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease`,
        cursor: 'default',
      }}
    >
      {/* Preview area */}
      <div
        style={{
          height: 180,
          background: `linear-gradient(145deg, ${project.glow.replace('0.12', '0.08').replace('0.15', '0.08')}, rgba(5,5,5,0.9))`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: `1px solid rgba(255,255,255,0.05)`,
        }}
      >
        {/* Mock browser chrome */}
        <div
          style={{
            position: 'absolute',
            inset: 12,
            borderRadius: 12,
            border: `1px solid ${project.color.replace('0.6', '0.2').replace('0.7', '0.2')}`,
            background: 'rgba(5,5,5,0.7)',
            backdropFilter: 'blur(12px)',
            overflow: 'hidden',
          }}
        >
          {/* Browser dots */}
          <div style={{ padding: '8px 12px', display: 'flex', gap: 5, borderBottom: '1px solid rgba(255,255,255,0.04)', alignItems: 'center' }}>
            {['#ff5f56', '#ffbd2e', '#27c93f'].map(c => (
              <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.6 }} />
            ))}
            <div style={{ flex: 1, marginLeft: 8, height: 14, borderRadius: 4, background: 'rgba(255,255,255,0.04)' }} />
          </div>
          {/* Mock content lines */}
          <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ height: 14, borderRadius: 4, background: `${project.accent}22`, width: '60%' }} />
            <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.04)', width: '90%' }} />
            <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.04)', width: '75%' }} />
            <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
              <div style={{ height: 28, borderRadius: 6, background: `${project.accent}30`, width: 80 }} />
              <div style={{ height: 28, borderRadius: 6, background: 'rgba(255,255,255,0.04)', width: 60 }} />
            </div>
          </div>
        </div>

        {/* Emoji */}
        <div
          style={{
            position: 'absolute',
            right: 24,
            bottom: 24,
            fontSize: 36,
            filter: hovered ? `drop-shadow(0 0 16px ${project.accent}80)` : 'none',
            transition: 'filter 0.3s ease, transform 0.3s ease',
            transform: hovered ? 'scale(1.15) rotate(-5deg)' : 'scale(1)',
          }}
        >
          {project.emoji}
        </div>

        {/* Metric badge */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: `${project.accent}18`,
            border: `1px solid ${project.color.replace('0.6', '0.3').replace('0.7', '0.3')}`,
            borderRadius: 100,
            padding: '4px 12px',
            fontSize: 10,
            fontWeight: 700,
            color: project.accent,
            letterSpacing: '0.06em',
            backdropFilter: 'blur(8px)',
          }}
        >
          {project.metric}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 24px 28px' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
          {project.tags.map(tag => (
            <span
              key={tag}
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '3px 10px',
                borderRadius: 20,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <h3
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: 10,
            letterSpacing: '-0.02em',
          }}
        >
          {project.title}
        </h3>

        <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.48)', lineHeight: 1.65 }}>
          {project.desc}
        </p>
      </div>
    </div>
  )
}

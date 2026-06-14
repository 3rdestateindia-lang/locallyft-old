'use client'

import React, { useRef, useEffect, useState } from 'react'

const PLANS = [
  {
    name: 'Starter',
    tag: 'Perfect to begin',
    price: '₹8,999',
    period: 'one-time',
    color: 'rgba(0,212,255,0.6)',
    glow: 'rgba(0,212,255,0.12)',
    border: 'rgba(0,212,255,0.2)',
    features: [
      '5-page professional website',
      'Mobile responsive design',
      'Google Maps integration',
      'WhatsApp CTA button',
      'Basic local SEO setup',
      '1 month free support',
      'Free domain (1st year)',
    ],
    notIncluded: [
      'Appointment booking system',
      'E-commerce / payment gateway',
      'Monthly SEO reports',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Growth',
    tag: 'Most Popular',
    price: '₹18,999',
    period: 'one-time',
    color: '#00d4ff',
    glow: 'rgba(0,212,255,0.22)',
    border: 'rgba(0,212,255,0.5)',
    features: [
      '10-page premium website',
      'Appointment booking system',
      'Google My Business setup',
      'WhatsApp & Call CTA',
      'Advanced local SEO',
      'Monthly performance report',
      '3 months free support',
      'Free domain + hosting (1st year)',
      'Social media integration',
    ],
    notIncluded: [
      'Full E-commerce store',
    ],
    cta: 'Start Growing',
    popular: true,
  },
  {
    name: 'Premium',
    tag: 'Full Solution',
    price: '₹34,999',
    period: 'one-time',
    color: '#7b61ff',
    glow: 'rgba(123,97,255,0.18)',
    border: 'rgba(123,97,255,0.4)',
    features: [
      'Unlimited pages',
      'Full e-commerce store',
      'Payment gateway integration',
      'Admin dashboard',
      'Advanced SEO + blogging',
      'Google Ads landing pages',
      '6 months priority support',
      'Free domain + hosting (1st year)',
      'Custom animations & branding',
      'Staff / product management',
    ],
    notIncluded: [],
    cta: 'Get Premium',
    popular: false,
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

export default function PricingSection() {
  const { ref, inView } = useInView(0.1)

  return (
    <section
      id="pricing"
      ref={ref}
      style={{
        background: '#050505',
        padding: '120px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background blobs */}
      <div aria-hidden="true" style={{ position: 'absolute', top: '15%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: '10%', right: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(123,97,255,0.05) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

      {/* Grid */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,212,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.02) 1px, transparent 1px)', backgroundSize: '80px 80px', maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 100%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 72,
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
            Flat one-time project fees. No hourly billing. No hidden agency costs. Just great work at honest prices.
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
            alignItems: 'start',
          }}
        >
          {PLANS.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} inView={inView} />
          ))}
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
          All prices exclusive of GST. Hosting & domain renewal from year 2 at market rates. Custom requirements? <a href="#contact" style={{ color: 'rgba(0,212,255,0.7)', textDecoration: 'underline' }}>Let's talk.</a>
        </p>
      </div>
    </section>
  )
}

function PricingCard({ plan, index, inView }: { plan: typeof PLANS[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: 24,
        padding: plan.popular ? '36px 32px' : '32px 28px',
        background: plan.popular
          ? 'linear-gradient(160deg, rgba(0,212,255,0.08), rgba(123,97,255,0.08))'
          : 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
        border: `1px solid ${hovered || plan.popular ? plan.border : 'rgba(255,255,255,0.07)'}`,
        boxShadow: plan.popular
          ? `0 0 60px ${plan.glow}, 0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)`
          : hovered ? `0 0 30px ${plan.glow}` : '0 4px 30px rgba(0,0,0,0.3)',
        opacity: inView ? 1 : 0,
        transform: inView
          ? plan.popular ? 'translateY(-8px) scale(1.02)' : 'translateY(0)'
          : 'translateY(40px)',
        transition: `opacity 0.7s ease ${index * 0.12}s, transform 0.7s ease ${index * 0.12}s, box-shadow 0.3s ease, border-color 0.3s ease`,
        cursor: 'default',
      }}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div
          style={{
            position: 'absolute',
            top: -14,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(90deg, #00d4ff, #7b61ff)',
            color: '#050505',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '5px 20px',
            borderRadius: 100,
            whiteSpace: 'nowrap',
          }}
        >
          ★ Most Popular
        </div>
      )}

      {/* Plan name */}
      <div style={{ marginBottom: 24 }}>
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          {plan.tag}
        </span>
        <h3
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            marginTop: 6,
          }}
        >
          {plan.name}
        </h3>
      </div>

      {/* Price */}
      <div style={{ marginBottom: 32 }}>
        <span
          style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            background: `linear-gradient(135deg, ${plan.color}, #ffffff)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {plan.price}
        </span>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginLeft: 8 }}>{plan.period}</span>
      </div>

      {/* CTA */}
      <a
        href="#contact"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          width: '100%',
          padding: '13px 24px',
          borderRadius: 100,
          border: `1px solid ${plan.border}`,
          background: plan.popular
            ? 'linear-gradient(90deg, rgba(0,212,255,0.2), rgba(123,97,255,0.2))'
            : 'rgba(255,255,255,0.04)',
          color: '#ffffff',
          fontSize: 14,
          fontWeight: 600,
          textDecoration: 'none',
          marginBottom: 32,
          transition: 'all 0.3s ease',
          boxShadow: plan.popular ? `0 0 20px ${plan.glow}` : 'none',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          el.style.background = plan.popular
            ? 'linear-gradient(90deg, rgba(0,212,255,0.3), rgba(123,97,255,0.3))'
            : 'rgba(255,255,255,0.08)'
          el.style.boxShadow = `0 0 30px ${plan.glow}`
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.background = plan.popular
            ? 'linear-gradient(90deg, rgba(0,212,255,0.2), rgba(123,97,255,0.2))'
            : 'rgba(255,255,255,0.04)'
          el.style.boxShadow = plan.popular ? `0 0 20px ${plan.glow}` : 'none'
        }}
      >
        {plan.cta} →
      </a>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 24 }} />

      {/* Features */}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {plan.features.map(f => (
          <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: 'rgba(255,255,255,0.75)' }}>
            <span style={{ color: '#00d4ff', fontSize: 14, flexShrink: 0, marginTop: 1 }}>✓</span>
            {f}
          </li>
        ))}
        {plan.notIncluded.map(f => (
          <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: 'rgba(255,255,255,0.22)' }}>
            <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>✕</span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  )
}

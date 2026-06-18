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

export default function CTASection() {
  const { ref, inView } = useInView(0.1)
  const [form, setForm] = useState({ name: '', phone: '', business: '' })
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.phone) return
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        background: 'linear-gradient(180deg, #050505 0%, #06090f 100%)',
        padding: 'clamp(64px, 10vw, 120px) 20px clamp(48px, 6vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated gradient orbs */}
      <div aria-hidden="true" style={{ position: 'absolute', top: '20%', left: '15%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 65%)', filter: 'blur(80px)', animation: 'ctaFloat1 8s ease-in-out infinite', pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: '10%', right: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(123,97,255,0.08) 0%, transparent 65%)', filter: 'blur(80px)', animation: 'ctaFloat2 10s ease-in-out infinite', pointerEvents: 'none' }} />

      {/* Top separator */}
      <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.25), rgba(123,97,255,0.25), transparent)' }} />

      <div
        style={{
          maxWidth: 900,
          margin: '0 auto',
          position: 'relative',
        }}
      >
        {/* Main CTA block */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 72,
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(40px)',
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
              marginBottom: 24,
            }}
          >
            Get Started Today
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 5vw, 4rem)',
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: '-0.04em',
              color: '#ffffff',
              marginBottom: 24,
            }}
          >
            Ready to Put Your{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00d4ff, #7b61ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Business Online?
            </span>
          </h2>
          <p
            style={{
              fontSize: 18,
              color: 'rgba(255,255,255,0.55)',
              maxWidth: 560,
              margin: '0 auto 48px',
              lineHeight: 1.7,
            }}
          >
            Book a free 30-minute discovery call. No pressure, no commitment — just an honest conversation about your website.
          </p>

          {/* Quick contact buttons */}
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 64 }}>
            <a
              href="https://wa.me/919999999999?text=Hi%20Local%20Lyft!%20I%27d%20like%20to%20discuss%20my%20website."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 28px',
                borderRadius: 100,
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                color: '#ffffff',
                fontSize: 15,
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 0 30px rgba(37,211,102,0.25)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 50px rgba(37,211,102,0.4)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(37,211,102,0.25)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
            >
              <span style={{ fontSize: 20 }}>💬</span>
              Chat on WhatsApp
            </a>
            <a
              href="tel:+919999999999"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 28px',
                borderRadius: 100,
                border: '1px solid rgba(0,212,255,0.35)',
                background: 'rgba(0,40,52,0.5)',
                backdropFilter: 'blur(12px)',
                color: '#ffffff',
                fontSize: 15,
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 0 24px rgba(0,212,255,0.1)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(0,212,255,0.25)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.6)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(0,212,255,0.1)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.35)' }}
            >
              <span style={{ fontSize: 18 }}>📞</span>
              Call Us Now
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center', marginBottom: 48 }}>
            <div style={{ height: 1, flex: 1, background: 'rgba(255,255,255,0.08)', maxWidth: 160 }} />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>or fill the form</span>
            <div style={{ height: 1, flex: 1, background: 'rgba(255,255,255,0.08)', maxWidth: 160 }} />
          </div>
        </div>

        {/* Contact form */}
        <div
          style={{
            maxWidth: 580,
            margin: '0 auto',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
          }}
        >
          {submitted ? (
            <div
              style={{
                textAlign: 'center',
                padding: 'clamp(32px, 5vw, 60px) clamp(20px, 4vw, 40px)',
                borderRadius: 24,
                background: 'linear-gradient(135deg, rgba(0,212,255,0.06), rgba(123,97,255,0.06))',
                border: '1px solid rgba(0,212,255,0.2)',
              }}
            >
              <div style={{ fontSize: 60, marginBottom: 20 }}>🎉</div>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: '#ffffff', marginBottom: 12 }}>We'll be in touch soon!</h3>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
                Thank you, {form.name}! Our team will call or WhatsApp you within 2 business hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: 24,
                padding: 'clamp(28px, 5vw, 48px) clamp(16px, 4vw, 40px)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 20px 80px rgba(0,0,0,0.4)',
              }}
            >
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: 32,
                  letterSpacing: '-0.02em',
                  textAlign: 'center',
                }}
              >
                Book Your Free Discovery Call
              </h3>

              {[
                { key: 'name', label: 'Your Name', placeholder: 'e.g. Dr. Sharma / Raj Patel', type: 'text', required: true },
                { key: 'phone', label: 'WhatsApp / Phone Number', placeholder: '+91 98765 43210', type: 'tel', required: true },
                { key: 'business', label: 'Business Type', placeholder: 'e.g. Dental Clinic, Grocery Store, Café...', type: 'text', required: false },
              ].map(field => (
                <div key={field.key} style={{ marginBottom: 20 }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.4)',
                      marginBottom: 8,
                    }}
                  >
                    {field.label} {field.required && <span style={{ color: '#00d4ff' }}>*</span>}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    value={form[field.key as keyof typeof form]}
                    onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                    onFocus={() => setFocused(field.key)}
                    onBlur={() => setFocused(null)}
                    style={{
                      width: '100%',
                      padding: '13px 18px',
                      borderRadius: 12,
                      border: `1px solid ${focused === field.key ? 'rgba(0,212,255,0.5)' : 'rgba(255,255,255,0.1)'}`,
                      background: focused === field.key ? 'rgba(0,212,255,0.04)' : 'rgba(255,255,255,0.03)',
                      color: '#ffffff',
                      fontSize: 15,
                      outline: 'none',
                      transition: 'all 0.25s ease',
                      boxShadow: focused === field.key ? '0 0 20px rgba(0,212,255,0.1)' : 'none',
                    }}
                  />
                </div>
              ))}

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '15px 32px',
                  borderRadius: 100,
                  border: 'none',
                  background: 'linear-gradient(135deg, #00d4ff, #7b61ff)',
                  color: '#050505',
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: 'pointer',
                  marginTop: 12,
                  boxShadow: '0 0 40px rgba(0,212,255,0.3)',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 60px rgba(0,212,255,0.5)'
                  ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(0,212,255,0.3)'
                  ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                }}
              >
                Book Free Call Now →
              </button>

              <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.25)', marginTop: 18, lineHeight: 1.6 }}>
                No spam ever. We'll contact you within 2 business hours. 🔒
              </p>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes ctaFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.05); }
        }
        @keyframes ctaFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 20px) scale(1.03); }
        }
      `}</style>
    </section>
  )
}

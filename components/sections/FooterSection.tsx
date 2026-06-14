'use client'

import React, { useState } from 'react'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#process' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
]

export default function FooterSection() {
  return (
    <footer
      style={{
        background: '#050505',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '64px 24px 40px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle gradient top */}
      <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '40%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.2), transparent)' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Top row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 48,
            justifyContent: 'space-between',
            marginBottom: 56,
          }}
        >
          {/* Brand */}
          <div style={{ maxWidth: 320 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  border: '1px solid rgba(0,212,255,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, rgba(0,212,255,0.08), rgba(123,97,255,0.08))',
                  boxShadow: '0 0 20px rgba(0,212,255,0.1)',
                }}
              >
                <span style={{ color: '#00d4ff', fontSize: 16, fontWeight: 700 }}>L</span>
              </div>
              <div>
                <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: 15, fontWeight: 700, letterSpacing: '0.08em' }}>LOCAL LYFT</div>
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Digital Solutions</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.75 }}>
              We help local businesses across India compete online with modern, affordable, SEO-optimised websites.
            </p>

            {/* Social */}
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              {SOCIAL_LINKS.map(s => (
                <SocialLink key={s.label} {...s} />
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
                marginBottom: 20,
              }}
            >
              Navigation
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {NAV_LINKS.map(link => (
                <li key={link.label}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
                marginBottom: 20,
              }}
            >
              Get in Touch
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: '💬', text: 'WhatsApp: +91 99999 99999', href: 'https://wa.me/919999999999' },
                { icon: '📞', text: 'Call: +91 99999 99999', href: 'tel:+919999999999' },
                { icon: '📧', text: 'hello@locallyft.in', href: 'mailto:hello@locallyft.in' },
              ].map(item => (
                <a
                  key={item.text}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    fontSize: 13.5,
                    color: 'rgba(255,255,255,0.45)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                >
                  <span>{item.icon}</span>
                  {item.text}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
            paddingTop: 28,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.22)' }}>
            © {new Date().getFullYear()} Local Lyft. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Service'].map(item => (
              <a
                key={item}
                href="#"
                style={{
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.22)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.22)')}
              >
                {item}
              </a>
            ))}
          </div>
          <div
            style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.18)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            Made with <span style={{ color: 'rgba(255,60,80,0.7)' }}>♥</span> for Local India
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: 14,
        color: hovered ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.42)',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        transition: 'color 0.2s ease',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          width: 16,
          height: 1,
          background: hovered ? '#00d4ff' : 'rgba(255,255,255,0.15)',
          transition: 'width 0.2s ease, background 0.2s ease',
        }}
      />
      {label}
    </a>
  )
}

function SocialLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 38,
        height: 38,
        borderRadius: '50%',
        border: `1px solid ${hovered ? 'rgba(0,212,255,0.4)' : 'rgba(255,255,255,0.1)'}`,
        background: hovered ? 'rgba(0,212,255,0.06)' : 'rgba(255,255,255,0.03)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: hovered ? '#00d4ff' : 'rgba(255,255,255,0.4)',
        textDecoration: 'none',
        transition: 'all 0.25s ease',
        boxShadow: hovered ? '0 0 16px rgba(0,212,255,0.15)' : 'none',
      }}
    >
      {icon}
    </a>
  )
}

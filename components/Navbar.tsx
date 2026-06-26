'use client'

import React, { useEffect, useRef, useState } from 'react'
import LocalLyftLogo from './LocalLyftLogo'

const NAV_LINKS = [
  { label: 'Services',    href: '#services' },
  { label: 'Process',     href: '#process' },
  { label: 'Portfolio',   href: '#portfolio' },
  { label: 'Pricing',     href: '#pricing' },
  { label: 'Contact',     href: '#contact' },
  { label: 'About',       href: '#about' },
]

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false)
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [activeLink,   setActiveLink]   = useState('')
  const [siteLoaded,   setSiteLoaded]   = useState(false)
  const navRef = useRef<HTMLElement>(null)

  /* ── Reveal navbar only after loader completes ── */
  useEffect(() => {
    const onLoaded = () => setSiteLoaded(true)
    window.addEventListener('locallyft:loaded', onLoaded)
    return () => window.removeEventListener('locallyft:loaded', onLoaded)
  }, [])

  /* ── Scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Active section tracking ── */
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.replace('#', ''))
    const observers: IntersectionObserver[] = []
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveLink(`#${id}`) },
        { rootMargin: '-40% 0px -40% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  /* ── Close menu on outside click ── */
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  /* ── Lock body scroll when mobile menu open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <style>{`
        @keyframes navReveal {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes navLinkIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes navMenuIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        .nav-link {
          position: relative;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-decoration: none;
          color: rgba(255,255,255,0.55);
          transition: color 0.25s ease;
          padding: 4px 0;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0%;
          height: 1px;
          background: linear-gradient(90deg, #00d4ff, #7b61ff);
          transition: width 0.3s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 0 8px rgba(0,212,255,0.5);
        }
        .nav-link:hover,
        .nav-link.active { color: rgba(255,255,255,0.95); }
        .nav-link:hover::after,
        .nav-link.active::after { width: 100%; }
      `}</style>

      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '0 24px',
          opacity: siteLoaded ? 1 : 0,
          pointerEvents: siteLoaded ? 'all' : 'none',
          transform: siteLoaded ? 'translateY(0)' : 'translateY(-16px)',
          transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Glass pill container */}
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            marginTop: scrolled ? 12 : 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px 10px 12px',
            borderRadius: 100,
            background: scrolled
              ? 'rgba(5,5,5,0.85)'
              : 'rgba(5,5,5,0.3)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: scrolled
              ? '1px solid rgba(255,255,255,0.1)'
              : '1px solid rgba(255,255,255,0.06)',
            boxShadow: scrolled
              ? '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)'
              : '0 4px 20px rgba(0,0,0,0.2)',
            transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
            gap: 8,
          }}
        >
          {/* Logo */}
          <a href="#" style={{ textDecoration: 'none', flexShrink: 0 }} aria-label="Local Lyft home">
            <LocalLyftLogo size={34} variant="full" glow={false} animated />
          </a>

          {/* Desktop Nav Links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 32,
            }}
            className="nav-desktop-links"
          >
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className={`nav-link${activeLink === link.href ? ' active' : ''}`}
                style={{
                  animation: `navLinkIn 0.5s ease ${0.1 + i * 0.07}s both`,
                }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button — hidden on mobile (hamburger only) */}
          <a
            href="#contact"
            className="nav-cta-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 20px',
              borderRadius: 100,
              background: 'linear-gradient(90deg, rgba(0,212,255,0.15), rgba(123,97,255,0.15))',
              border: '1px solid rgba(0,212,255,0.3)',
              color: '#ffffff',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.04em',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = 'linear-gradient(90deg, rgba(0,212,255,0.25), rgba(123,97,255,0.25))'
              el.style.boxShadow = '0 0 20px rgba(0,212,255,0.2)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = 'linear-gradient(90deg, rgba(0,212,255,0.15), rgba(123,97,255,0.15))'
              el.style.boxShadow = 'none'
            }}
          >
            Get Started
            <span style={{ fontSize: 11 }}>→</span>
          </a>

          {/* Mobile hamburger */}
          <button
            id="nav-menu-toggle"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 6,
              color: 'rgba(255,255,255,0.7)',
              flexShrink: 0,
            }}
            className="nav-hamburger"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 4 L16 16 M16 4 L4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 5 H17 M3 10 H17 M3 15 H12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div
            style={{
              maxWidth: 1200,
              margin: '8px auto 0',
              borderRadius: 20,
              background: 'rgba(5,5,5,0.95)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
              padding: '20px 24px 24px',
              animation: 'navMenuIn 0.3s cubic-bezier(0.16,1,0.3,1) both',
              display: 'none',
            }}
            className="nav-mobile-menu"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    color: activeLink === link.href ? '#00d4ff' : 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    padding: '12px 0',
                    borderBottom: i < NAV_LINKS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.95)')}
                  onMouseLeave={e => (e.currentTarget.style.color = activeLink === link.href ? '#00d4ff' : 'rgba(255,255,255,0.7)')}
                >
                  {link.label}
                  <span style={{ fontSize: 12, color: 'rgba(0,212,255,0.5)' }}>→</span>
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                style={{
                  marginTop: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '14px 24px',
                  borderRadius: 100,
                  background: 'linear-gradient(90deg, rgba(0,212,255,0.2), rgba(123,97,255,0.2))',
                  border: '1px solid rgba(0,212,255,0.3)',
                  color: '#ffffff',
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Get Started →
              </a>
            </div>
          </div>
        )}

        {/* Responsive styles */}
        <style>{`
          @media (max-width: 768px) {
            .nav-desktop-links { display: none !important; }
            .nav-hamburger     { display: flex !important; }
            .nav-mobile-menu   { display: block !important; }
          }
          @media (max-width: 480px) {
            .nav-cta-btn { display: none !important; }
          }
        `}</style>
      </nav>
    </>
  )
}

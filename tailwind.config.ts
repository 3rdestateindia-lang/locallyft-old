import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#050505',
        graphite: '#1a1a1a',
        'graphite-mid': '#2a2a2a',
        'electric-blue': '#00d4ff',
        'electric-blue-dim': '#0099bb',
        'purple-soft': '#7b61ff',
        'purple-glow': '#9d7eff',
        'white-dim': 'rgba(255,255,255,0.7)',
        'white-mute': 'rgba(255,255,255,0.35)',
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'Inter', 'sans-serif'],
        geist: ['var(--font-geist)', 'Geist', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'scan-line': 'scanLine 4s linear infinite',
        'grain': 'grain 0.4s steps(1) infinite',
        'flicker': 'flicker 8s ease-in-out infinite',
        'spin-3d-slow': 'spin3dSlow 8s linear infinite',
        'spin-3d-fast': 'spin3dFast 4s linear infinite',
      },
      keyframes: {
        spin3dSlow: {
          '0%': { transform: 'rotateX(60deg) rotateY(0deg) rotateZ(0deg)' },
          '100%': { transform: 'rotateX(60deg) rotateY(360deg) rotateZ(360deg)' },
        },
        spin3dFast: {
          '0%': { transform: 'rotateX(45deg) rotateY(45deg) rotateZ(0deg)' },
          '100%': { transform: 'rotateX(45deg) rotateY(45deg) rotateZ(-360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(200vh)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -3%)' },
          '20%': { transform: 'translate(1%, 2%)' },
          '30%': { transform: 'translate(-3%, 1%)' },
          '40%': { transform: 'translate(2%, -1%)' },
          '50%': { transform: 'translate(-1%, 3%)' },
          '60%': { transform: 'translate(3%, -2%)' },
          '70%': { transform: 'translate(-2%, 2%)' },
          '80%': { transform: 'translate(1%, -3%)' },
          '90%': { transform: 'translate(-3%, 1%)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '92%': { opacity: '1' },
          '93%': { opacity: '0.8' },
          '94%': { opacity: '1' },
          '96%': { opacity: '0.9' },
          '97%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'radial-vignette': 'radial-gradient(ellipse at center, transparent 40%, rgba(5,5,5,0.85) 100%)',
        'grid-perspective': 'linear-gradient(rgba(0,212,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.08) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}

export default config

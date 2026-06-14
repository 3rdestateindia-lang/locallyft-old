import React from 'react'

export default function Loader3D() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-void text-center">
      {/* ── 3D Holographic Rings ── */}
      <div
        className="relative mb-12 flex h-40 w-40 items-center justify-center"
        style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
      >
        <div
          className="absolute h-32 w-32 rounded-full border border-electric-blue/40 animate-spin-3d-slow"
          style={{ boxShadow: '0 0 20px rgba(0,212,255,0.2) inset' }}
        />
        <div
          className="absolute h-24 w-24 rounded-full border border-purple-soft/60 animate-spin-3d-fast"
          style={{ transform: 'rotateX(45deg) rotateY(45deg)' }}
        />
        <div
          className="absolute h-16 w-16 rounded-full border border-white/15"
          style={{ transform: 'rotateX(72deg)', boxShadow: '0 0 40px rgba(0,212,255,0.2)' }}
        />
        <div className="absolute h-2 w-2 rounded-full bg-white shadow-[0_0_15px_#fff] animate-pulse-glow" />
      </div>

      {/* ── Data Output ── */}
      <div className="flex flex-col gap-2 font-mono text-[11px] tracking-widest text-electric-blue/80">
        <p className="uppercase">Preparing Local Lyft</p>
        <p className="loader-data-bar">[████████████████░░░░] 80%</p>
        <p className="mt-2 text-[9px] uppercase text-white/30 animate-pulse">Building your local web presence</p>
      </div>
    </div>
  )
}

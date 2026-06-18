import dynamic from 'next/dynamic'

// Dynamically import — hero uses canvas + GSAP (client-only)
const HeroCinematic = dynamic(
  () => import('@/components/hero/HeroCinematic'),
  { ssr: false }
)

// Sections — loaded client-side for IntersectionObserver support
const ServicesSection     = dynamic(() => import('@/components/sections/ServicesSection'),     { ssr: false })
const ProcessSection      = dynamic(() => import('@/components/sections/ProcessSection'),      { ssr: false })
const WhyUsSection        = dynamic(() => import('@/components/sections/WhyUsSection'),        { ssr: false })
const PortfolioSection    = dynamic(() => import('@/components/sections/PortfolioSection'),    { ssr: false })
const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'), { ssr: false })
const PricingSection      = dynamic(() => import('@/components/sections/PricingSection'),      { ssr: false })
const CTASection          = dynamic(() => import('@/components/sections/CTASection'),          { ssr: false })
const FooterSection       = dynamic(() => import('@/components/sections/FooterSection'),       { ssr: false })

export default function Home() {
  return (
    <main>
      {/* ── Cinematic Hero (500vh scroll container) ── */}
      <div id="hero-cinematic">
        <HeroCinematic />
      </div>

      {/* ── Main Site Content ── */}
      <ServicesSection />
      <ProcessSection />
      {/* <WhyUsSection /> Hidden for launch */}
      <PortfolioSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <FooterSection />
    </main>
  )
}

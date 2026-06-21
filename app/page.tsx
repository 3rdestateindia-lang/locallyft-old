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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Local Lyft',
    url: 'https://www.local-lyft.com',
    description: 'Local Lyft creates modern websites for clinics, hospitals, physiotherapy centers, shops, cafes, and local service businesses. Earn trust, calls, bookings, and visits.',
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── Cinematic Hero (500vh scroll container) ── */}
      <div id="hero-cinematic">
        <HeroCinematic />
      </div>

      {/* ── Main Site Content ── */}
      <ServicesSection />
      <ProcessSection />
      <WhyUsSection />
      <PortfolioSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <FooterSection />
    </main>
  )
}

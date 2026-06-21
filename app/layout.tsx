import type { Metadata } from 'next'
import { Inter, Bodoni_Moda } from 'next/font/google'
import dynamic from 'next/dynamic'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-bodoni',
  display: 'swap',
  adjustFontFallback: false,
})

// Navbar is client-only (uses scroll + IntersectionObserver)
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.local-lyft.com'),
  title: {
    default: 'Local Lyft | Websites for Local Businesses',
    template: '%s | Local Lyft',
  },
  description:
    'Local Lyft creates modern websites for clinics, hospitals, physiotherapy centers, shops, cafes, and local service businesses. Earn trust, calls, bookings, and visits.',
  keywords: [
    'local business websites',
    'clinic website design',
    'cafe website design',
    'shop website design',
    'physiotherapy website',
    'web design agency',
    'Local Lyft',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Local Lyft - Websites for Local Businesses',
    description: 'Modern websites that help local businesses earn trust, calls, bookings, and visits.',
    url: 'https://www.local-lyft.com',
    siteName: 'Local Lyft',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Local Lyft Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Local Lyft - Websites for Local Businesses',
    description: 'Modern websites that help local businesses earn trust, calls, bookings, and visits.',
    images: ['/opengraph-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${bodoni.variable}`}>
      <head>
        {/* Preload critical frames for fastest first paint */}
        <link rel="preload" as="image" href="/laptop-sequence/frame_0001.webp" />
        <link rel="preload" as="image" href="/laptop-sequence/frame_0002.webp" />
        <link rel="preload" as="image" href="/laptop-sequence/frame_0003.webp" />
        <link rel="preload" as="image" href="/laptop-sequence/frame_0004.webp" />
        <link rel="preload" as="image" href="/laptop-sequence/frame_0005.webp" />
      </head>
      <body className={`${inter.className} bg-void text-white antialiased`}>
        {/* Global floating navbar */}
        <Navbar />
        {children}
      </body>
    </html>
  )
}

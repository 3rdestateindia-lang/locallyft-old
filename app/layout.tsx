import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Local Lyft - Websites for Local Businesses',
  description:
    'Local Lyft creates modern websites for clinics, hospitals, physiotherapy centers, shops, cafes, and local service businesses.',
  keywords: [
    'local business websites',
    'clinic website design',
    'cafe website design',
    'shop website design',
    'physiotherapy website',
    'Local Lyft',
  ],
  openGraph: {
    title: 'Local Lyft - Websites for Local Businesses',
    description: 'Modern websites that help local businesses earn trust, calls, bookings, and visits.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        {/* Preload critical frames for fastest first paint */}
        <link rel="preload" as="image" href="/laptop-sequence/frame_0001.webp" />
        <link rel="preload" as="image" href="/laptop-sequence/frame_0002.webp" />
        <link rel="preload" as="image" href="/laptop-sequence/frame_0003.webp" />
        <link rel="preload" as="image" href="/laptop-sequence/frame_0004.webp" />
        <link rel="preload" as="image" href="/laptop-sequence/frame_0005.webp" />
      </head>
      <body className={`${inter.className} bg-void text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}

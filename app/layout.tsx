import type { Metadata, Viewport } from 'next'
import { Manrope, Inter } from 'next/font/google'
import Script from 'next/script'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { baseMetadata } from '@/lib/seo/metadata'
import './globals.css'

// ── Fonts — matching Stitch design system ─────────────────────────────────────

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600'],
})

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  ...baseMetadata,
  title: {
    template: '%s | Parental Leave Calculator Singapore',
    default: 'Singapore Parental Leave Calculator 2026 — Free Online Tools',
  },
  description:
    'Calculate your maternity, paternity, childcare, and shared parental leave entitlements in Singapore. Free, instant, updated for 2026 MOM guidelines.',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export const viewport: Viewport = {
  themeColor: '#004d60',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

// ── Root Layout ───────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const gaId = process.env.NEXT_PUBLIC_GA4_ID
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT

  return (
    <html lang="en-SG" className={`${manrope.variable} ${inter.variable}`}>
      <head>
        {/* Material Symbols Outlined — icons throughout the site */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body className="font-body antialiased bg-surface text-on-surface min-h-screen flex flex-col">
        {/* Google Analytics 4 */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}

        {/* Google AdSense — load lazily after page is interactive */}
        {adsenseClient && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        )}

        <Header />

        <main className="flex-1 pt-16">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
}

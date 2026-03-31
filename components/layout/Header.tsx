'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Maternity', href: '/maternity-leave' },
  { label: 'Paternity', href: '/paternity-leave' },
  { label: 'Childcare', href: '/childcare-leave' },
  { label: 'SPL', href: '/shared-parental-leave', fullLabel: 'Shared Parental Leave' },
  { label: 'Baby Bonus', href: '/baby-bonus' },
  { label: 'Tools', href: '/tools' },
  { label: 'Guides', href: '/guides' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`glass-nav fixed top-0 inset-x-0 z-50 transition-shadow duration-200 ${
        scrolled ? 'shadow-ambient' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="Leave Calculator Singapore — home">
            <div className="w-8 h-8 rounded-lg primary-gradient flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-white text-[18px]" aria-hidden="true">
                child_care
              </span>
            </div>
            <span className="font-headline font-bold text-primary text-sm leading-tight hidden sm:block">
              Leave Calculator<br />
              <span className="text-primary/70 font-medium">Calculator SG</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                title={link.fullLabel}
                className="px-3 py-2 rounded-lg text-sm font-medium text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/maternity-leave/calculator"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white primary-gradient hover:opacity-90 transition-opacity shadow-ambient"
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">calculate</span>
              Calculate
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg text-on-surface-variant hover:bg-primary/5 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                {menuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          className="lg:hidden border-t border-outline-variant/30 bg-surface/95 backdrop-blur-md"
          aria-label="Mobile navigation"
        >
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 rounded-xl text-sm font-medium text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.fullLabel ?? link.label}
              </Link>
            ))}
            <Link
              href="/maternity-leave/calculator"
              className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white primary-gradient"
              onClick={() => setMenuOpen(false)}
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">calculate</span>
              Calculate my leave
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}

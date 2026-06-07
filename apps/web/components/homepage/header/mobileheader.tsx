'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { AriiaSvgMark } from '@/components/icons/AriiaSvgMark';

const SINGLE_LINKS = [
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
];

const COMPANY_LINKS = [
  { href: '/#about-us', label: 'About Us' },
  { href: '/story-behind-ariia/', label: 'The Story Behind ARIIA' },
  { href: '/careers/', label: 'Careers' },
  { href: '/customers/', label: 'Customers' },
  { href: '/contact-us/', label: 'Contact Us' },
];

const RESOURCES_LINKS = [
  { href: '/blog/', label: 'Blog' },
  { href: '/#use-cases', label: 'Use Cases' },
  { href: '/industries/', label: 'Industries' },
  { href: '/#faq', label: 'Questions & Answers' },
  { href: '/#security', label: 'Security & Data Protection' },
  { href: '/terms-of-service/', label: 'Terms of Service' },
  { href: '/privacy-policy/', label: 'Privacy Policy' },
];

export function MobileHeader({ isScrolled = false }: { isScrolled?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const topBarBackground =
    'linear-gradient(90deg, #6679f4 0%, #4E97FA 25%, #35B5F5 68%, #2EFFEA 100%)';

  function closeMenu() {
    setMenuOpen(false);
    setCompanyOpen(false);
    setResourcesOpen(false);
  }

  const mainLinkStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '8px 16px',
    color: '#374151',
    fontWeight: 700,
    fontSize: 15,
    textDecoration: 'none',
    touchAction: 'manipulation' as const,
    border: 'none',
    borderBottom: '1px solid rgba(147, 216, 250, 0.30)',
    background: 'transparent',
    lineHeight: 1.45,
    cursor: 'pointer',
    textAlign: 'left' as const,
  };

  const subLinkStyle = {
    display: 'block',
    padding: '5px',
    marginLeft: 8,
    color: '#1f2937',
    fontSize: 16,
    fontWeight: 400,
    textDecoration: 'none',
    touchAction: 'manipulation' as const,
    background: 'transparent',
    borderBottom: 'none',
    lineHeight: 1.5,
  };

  return (
    <>
      <div
        className="ios-mobile-fixed-layer"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: 64,
          padding: '0 16px',
          background: 'transparent',
          pointerEvents: 'none',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 40,
            background: isScrolled ? 'none' : topBarBackground,
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: 25,
            left: 16,
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            background: '#fff',
            borderRadius: 999,
            padding: '5px 12px',
            boxShadow: '0 4px 12px rgba(15, 23, 42, 0.12)',
            pointerEvents: 'auto',
          }}
        >
          <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            {/* <AriiaSvgMark className="w-20 h-7" /> */}
            <AriiaSvgMark width={80} height={28} />
          </a>
        </div>

        <div
          style={{
            position: 'absolute',
            top: 25,
            right: 16,
            zIndex: 1,
            pointerEvents: 'auto',
          }}
          className="flex items-center bg-white rounded-full shadow-[0_4px_12px_rgba(15,23,42,0.12)] px-1 py-1 space-x-1"
        >
          <a
            href="/trial"
            className="bg-gray-900/95 text-white font-medium text-xs sm:text-sm rounded-full px-3 sm:px-6 h-8 sm:h-9 flex items-center whitespace-nowrap"
            style={{ textDecoration: 'none' }}
          >
            1-Month Free Trial
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex items-center justify-center size-8 sm:size-10 rounded-full text-gray-700"
            style={{
              touchAction: 'manipulation',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
            aria-label="Open menu"
          >
            <svg style={{ width: 20, height: 20 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className="ios-mobile-fixed-layer"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 200,
          background: 'transparent',
          overflow: 'hidden',
          display: menuOpen ? 'block' : 'none',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        <div
          style={{
            margin: '8px',
            borderRadius: 18,
            border: '1px solid rgba(255,255,255,0.40)',
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0.08)), linear-gradient(135deg, rgba(248,251,255,0.58), rgba(236,249,255,0.44))',
            WebkitBackdropFilter: 'blur(12px)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 14px 36px rgba(15,23,42,0.12)',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            maxHeight: 'calc(100dvh - 16px)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 16px 8px',
              background: 'transparent',
              flexShrink: 0,
            }}
          >
            <a
              href="/"
              onClick={closeMenu}
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.45)',
                borderRadius: 999,
                padding: '4px 12px',
                border: '1px solid rgba(255,255,255,0.45)',
                textDecoration: 'none',
              }}
            >
              <AriiaSvgMark width={64} height={28} />
            </a>

            <button
              type="button"
              onClick={closeMenu}
              style={{
                touchAction: 'manipulation',
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.45)',
                background: 'rgba(255,255,255,0.45)',
                boxShadow: '0 8px 18px rgba(15,23,42,0.10)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                opacity: 0.9,
              }}
              aria-label="Close menu"
            >
              <svg style={{ width: 16, height: 16, color: '#374151' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav style={{ paddingBottom: 24 }}>
            {SINGLE_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={closeMenu} style={mainLinkStyle}>
                <span>{link.label}</span>
                <ChevronRight style={{ width: 18, height: 18, color: '#263746' }} strokeWidth={2.3} />
              </a>
            ))}

            <button
              type="button"
              onClick={() => setCompanyOpen((p) => !p)}
              style={{
                ...mainLinkStyle,
                borderBottom: companyOpen ? 'none' : '1px solid rgba(147, 216, 250, 0.30)',
              }}
            >
              <span>Company</span>
              <ChevronRight
                style={{
                  width: 18,
                  height: 18,
                  color: companyOpen ? '#35B5F5' : '#263746',
                  transform: companyOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                }}
                strokeWidth={2.3}
              />
            </button>

            <div style={{ display: companyOpen ? 'block' : 'none', padding: '0 16px 16px', borderBottom: '1px solid rgba(147, 216, 250, 0.30)' }}>
              {COMPANY_LINKS.map((link) => (
                <a key={link.href} href={link.href} onClick={closeMenu} style={subLinkStyle}>
                  {link.label}
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setResourcesOpen((p) => !p)}
              style={{
                ...mainLinkStyle,
                borderBottom: resourcesOpen ? 'none' : '1px solid rgba(147, 216, 250, 0.30)',
              }}
            >
              <span>Resources</span>
              <ChevronRight
                style={{
                  width: 18,
                  height: 18,
                  color: resourcesOpen ? '#35B5F5' : '#263746',
                  transform: resourcesOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                }}
                strokeWidth={2.3}
              />
            </button>

            <div style={{ display: resourcesOpen ? 'block' : 'none', padding: '0 16px 16px' }}>
              {RESOURCES_LINKS.map((link) => (
                <a key={link.href} href={link.href} onClick={closeMenu} style={subLinkStyle}>
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          <div style={{ padding: '8px 16px 24px', flexShrink: 0 }}>
            <div
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.45)',
                borderRadius: 999,
                padding: 5,
                boxShadow: '0 14px 36px rgba(15,23,42,0.14)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 8,
                border: '1px solid rgba(255,255,255,0.45)',
              }}
            >
              <a
                href="/login"
                onClick={closeMenu}
                style={{
                  flex: 1,
                  color: '#374151',
                  fontWeight: 500,
                  fontSize: 14,
                  textDecoration: 'none',
                  padding: '8px 12px',
                  borderRadius: 999,
                  textAlign: 'center',
                }}
              >
                Log In
              </a>
              <a
                href="/trial"
                onClick={closeMenu}
                style={{
                  flex: 1,
                  background: 'rgba(17,24,39,0.95)',
                  color: '#fff',
                  borderRadius: 999,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                1-Month Free Trial
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

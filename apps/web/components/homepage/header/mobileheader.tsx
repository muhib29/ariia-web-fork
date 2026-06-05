'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { AriiaSvgMark } from '@/components/icons/AriiaSvgMark';

const SINGLE_LINKS = [
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
];

const COMPANY_LINKS = [
  { href: '/#about-us', label: 'About us' },
  { href: '/story-behind-ariia/', label: 'Our Story' },
  { href: '/careers/', label: 'Careers' },
  { href: '/customers/', label: 'Customers' },
  { href: '/contact-us/', label: 'Contact us' },
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
    padding: '16px 28px',
    color: '#0d1b2e',
    fontWeight: 700,
    fontSize: 15,
    textDecoration: 'none',
    touchAction: 'manipulation' as const,
    border: 'none',
    borderBottom: '1px solid rgba(148, 210, 225, 0.55)',
    background: 'transparent',
    lineHeight: 1.1,
    cursor: 'pointer',
    textAlign: 'left' as const,
  };

  const subLinkStyle = {
    display: 'block',
    padding: '10px 28px 10px 36px',
    color: '#0d1b2e',
    fontSize: 16,
    fontWeight: 450,
    textDecoration: 'none',
    touchAction: 'manipulation' as const,
    background: 'transparent',
    borderBottom: 'none',
    lineHeight: 1.45,
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
            <AriiaSvgMark priority width={80} height={26} />
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
          background:
            'linear-gradient(rgba(255,255,255,0.42) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.42) 1px, transparent 1px), radial-gradient(ellipse 520px 520px at 96% 86%, rgba(78,151,250,0.26) 0%, rgba(78,151,250,0.13) 42%, transparent 76%), radial-gradient(ellipse 460px 360px at 18% 30%, rgba(46,255,234,0.16) 0%, rgba(46,255,234,0.08) 44%, transparent 76%), linear-gradient(180deg, #dcf7fb 0%, #e2fbfb 58%, #d8f3ff 100%)',
          backgroundSize: '114px 114px, 114px 114px, auto, auto, auto',
          overflowY: 'scroll',
          WebkitOverflowScrolling: 'touch',
          display: menuOpen ? 'block' : 'none',
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
            background: 'linear-gradient(90deg, #6675f4 0%, #4d94f2 42%, #37b8ef 72%, #35e5d3 100%)',
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            padding: '56px 16px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#fff',
              borderRadius: 999,
              padding: '10px',
              gap: 6,
              boxShadow: '0 8px 18px rgba(15, 23, 42, 0.12)',
              minHeight: 48,
              maxWidth: 300,
            }}
          >
            <a
              href="/login"
              onClick={closeMenu}
              style={{
                padding: '8px 16px',
                color: '#2f3745',
                textDecoration: 'none',
                fontSize: 15,
                fontWeight: 600,
                borderRadius: 999,
                lineHeight: 1,
              }}
            >
              Log In
            </a>

            <a
              href="/trial"
              onClick={closeMenu}
              style={{
                background: '#111',
                color: '#fff',
                borderRadius: 999,
                padding: '8px 14px',
                fontSize: 14,
                fontWeight: 700,
                textDecoration: 'none',
                lineHeight: 1,
                whiteSpace: 'nowrap',
              }}
            >
              1-Month Free Trial
            </a>
          </div>

          <button
            type="button"
            onClick={closeMenu}
            style={{
              touchAction: 'manipulation',
              background: 'rgba(255,255,255,0.42)',
              border: 'none',
              borderRadius: '50%',
              width: 48,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
            }}
            aria-label="Close menu"
          >
            <svg style={{ width: 24, height: 24, color: '#526273' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div style={{ position: 'relative', zIndex: 1, padding: '32px 0 28px' }}>
          {SINGLE_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu} style={mainLinkStyle}>
              <span>{link.label}</span>
              <ChevronRight style={{ width: 22, height: 22, color: '#263746' }} strokeWidth={2.3} />
            </a>
          ))}

          <button
            type="button"
            onClick={() => setCompanyOpen((p) => !p)}
            style={{
              ...mainLinkStyle,
              borderBottom: companyOpen ? 'none' : '1px solid rgba(148, 210, 225, 0.55)',
            }}
          >
            <span>Company</span>
            <ChevronRight
              style={{
                width: 22,
                height: 22,
                color: '#263746',
                transform: companyOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
              }}
              strokeWidth={2.3}
            />
          </button>

          <div style={{ display: companyOpen ? 'contents' : 'none' }}>
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
              borderBottom: resourcesOpen ? 'none' : '1px solid rgba(148, 210, 225, 0.55)',
            }}
          >
            <span>Resources</span>
            <ChevronRight
              style={{
                width: 22,
                height: 22,
                color: '#263746',
                transform: resourcesOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
              }}
              strokeWidth={2.3}
            />
          </button>

          <div style={{ display: resourcesOpen ? 'contents' : 'none' }}>
            {RESOURCES_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={closeMenu} style={subLinkStyle}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
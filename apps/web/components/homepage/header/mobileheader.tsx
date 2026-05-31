'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
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

export function MobileHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'transparent',
        }}
      >
        {/* RESTORED: Left pill — logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: '#fff',
          borderRadius: 999,
          padding: '0 12px',
        }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <AriiaSvgMark className="w-20 h-10" />
          </a>
        </div>

        {/* RESTORED: Right pill — CTA + hamburger */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: '#fff',
          borderRadius: 999,
          padding: '4px',
          gap: 4,
        }}>
          <a
            href="/trial"
            style={{
              background: '#111',
              color: '#fff',
              border: 'none',
              borderRadius: 999,
              padding: '8px 16px',
              fontSize: 14,
              fontWeight: 500,
              textDecoration: 'none',
              touchAction: 'manipulation',
            }}
          >
            1-Month Free Trial
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            style={{
              touchAction: 'manipulation',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              style={{ width: 24, height: 24, color: '#111' }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Menu overlay — untouched */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 200,
            background: '#fff',
            overflowY: 'scroll',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <AriiaSvgMark className="w-20 h-10" />
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setCompanyOpen(false);
                setResourcesOpen(false);
              }}
              style={{
                touchAction: 'manipulation',
                background: '#eee',
                border: 'none',
                borderRadius: '50%',
                width: 40,
                height: 40,
                fontSize: 18,
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>

          {SINGLE_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                display: 'block',
                padding: '14px 16px',
                borderBottom: '1px solid #eee',
                color: '#111',
                fontWeight: 700,
                textDecoration: 'none',
                touchAction: 'manipulation',
              }}
            >
              {link.label}
            </a>
          ))}

          <button
            type="button"
            onClick={() => setCompanyOpen((p) => !p)}
            style={{
              touchAction: 'manipulation',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '14px 16px',
              borderBottom: '1px solid #eee',
              background: 'none',
              border: 'none',
              color: '#111',
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer',
            }}
          >
            <span>Company</span>
            <ChevronDown style={{ width: 16, height: 16, color: companyOpen ? '#35B5F5' : '#111', transform: companyOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </button>

          {companyOpen && COMPANY_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                display: 'block',
                padding: '12px 16px 12px 32px',
                borderBottom: '1px solid #f5f5f5',
                color: '#333',
                textDecoration: 'none',
                touchAction: 'manipulation',
              }}
            >
              {link.label}
            </a>
          ))}

          <button
            type="button"
            onClick={() => setResourcesOpen((p) => !p)}
            style={{
              touchAction: 'manipulation',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '14px 16px',
              background: 'none',
              border: 'none',
              borderBottom: '1px solid #eee',
              color: '#111',
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer',
            }}
          >
            <span>Resources</span>
            <ChevronDown style={{ width: 16, height: 16, color: resourcesOpen ? '#35B5F5' : '#111', transform: resourcesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </button>

          {resourcesOpen && RESOURCES_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                display: 'block',
                padding: '12px 16px 12px 32px',
                borderBottom: '1px solid #f5f5f5',
                color: '#333',
                textDecoration: 'none',
                touchAction: 'manipulation',
              }}
            >
              {link.label}
            </a>
          ))}

          <div style={{ padding: '24px 16px', display: 'flex', gap: 12 }}>
            <a
              href="/login"
              style={{
                flex: 1,
                display: 'block',
                padding: '12px',
                textAlign: 'center',
                color: '#111',
                textDecoration: 'none',
                border: '1px solid #eee',
                borderRadius: 999,
                fontWeight: 500,
                touchAction: 'manipulation',
              }}
            >
              Log In
            </a>
            <a
              href="/trial"
              style={{
                flex: 1,
                display: 'block',
                padding: '12px',
                textAlign: 'center',
                background: '#111',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: 999,
                fontWeight: 500,
                touchAction: 'manipulation',
              }}
            >
              Free Trial
            </a>
          </div>
        </div>
      )}
    </>
  );
}
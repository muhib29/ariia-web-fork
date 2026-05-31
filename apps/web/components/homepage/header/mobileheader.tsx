'use client';

import { useState } from 'react';

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
          background: '#fff',
        }}
      >
        <a href="/" style={{ fontWeight: 700, fontSize: 18, color: '#111', textDecoration: 'none' }}>
          ARIIA
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          style={{
            touchAction: 'manipulation',
            background: '#111',
            color: '#fff',
            border: 'none',
            borderRadius: 999,
            padding: '8px 16px',
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          Menu
        </button>
      </div>

      {/* Menu overlay */}
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
          {/* Close */}
          <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 700, fontSize: 18, color: '#111' }}>ARIIA</span>
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

          {/* Single links */}
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

          {/* Company accordion */}
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
            <span>{companyOpen ? '▲' : '▼'}</span>
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

          {/* Resources accordion */}
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
            <span>{resourcesOpen ? '▲' : '▼'}</span>
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

          {/* CTA */}
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
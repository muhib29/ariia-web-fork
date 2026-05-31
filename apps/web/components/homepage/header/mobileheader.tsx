'use client';

import { useState } from 'react';
import { ChevronDown, Sparkles, DollarSign, Users, UserRound, Briefcase, Mail, BookOpen, BoxIcon, Building2, CircleHelp, Lock, ScrollText, ShieldCheck } from 'lucide-react';
import { AriiaSvgMark } from '@/components/icons/AriiaSvgMark';
import { getLenis } from '@/lib/lenis';


const SINGLE_LINKS = [
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
];


const COMPANY_LINKS = [
  { href: '/#about-us', label: 'About Us', icon: <UserRound style={{ width: 18, height: 18, color: '#6b7280' }} /> },
  { href: '/story-behind-ariia/', label: 'The Story Behind ARIIA', icon: <Sparkles style={{ width: 18, height: 18, color: '#6b7280' }} /> },
  { href: '/careers/', label: 'Careers', icon: <Briefcase style={{ width: 18, height: 18, color: '#6b7280' }} /> },
  { href: '/customers/', label: 'Customers', icon: <Users style={{ width: 18, height: 18, color: '#6b7280' }} /> },
  { href: '/contact-us/', label: 'Contact Us', icon: <Mail style={{ width: 18, height: 18, color: '#6b7280' }} /> },
];

const RESOURCES_LINKS = [
  { href: '/blog/', label: 'Blog', icon: <BookOpen style={{ width: 18, height: 18, color: '#6b7280' }} /> },
  { href: '/#use-cases', label: 'Use Cases', icon: <BoxIcon style={{ width: 18, height: 18, color: '#6b7280' }} /> },
  { href: '/industries/', label: 'Industries', icon: <Building2 style={{ width: 18, height: 18, color: '#6b7280' }} /> },
  { href: '/#faq', label: 'Questions & Answers', icon: <CircleHelp style={{ width: 18, height: 18, color: '#6b7280' }} /> },
  { href: '/#security', label: 'Security & Data Protection', icon: <Lock style={{ width: 18, height: 18, color: '#6b7280' }} /> },
  { href: '/terms-of-service/', label: 'Terms of Service', icon: <ScrollText style={{ width: 18, height: 18, color: '#6b7280' }} /> },
  { href: '/privacy-policy/', label: 'Privacy Policy', icon: <ShieldCheck style={{ width: 18, height: 18, color: '#6b7280' }} /> },
];

export function MobileHeader({
  isScrolled = false,
}: {
  isScrolled?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const pillBg = isScrolled ? 'rgba(255,255,255,0.7)' : '#fff';

  function openMenu() {
    setMenuOpen(true);
    setTimeout(() => {
      getLenis()?.stop?.();
      window.dispatchEvent(new Event('spline-pause'));
    }, 0);
  }

  function closeMenu() {
    setMenuOpen(false);
    setCompanyOpen(false);
    setResourcesOpen(false);
    setTimeout(() => {
      getLenis()?.start?.();
      window.dispatchEvent(new Event('spline-resume'));
    }, 0);
  }

  return (
    <>
      {/* Top bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 40,
          zIndex: 49,
          pointerEvents: 'none',
          // background: 'linear-gradient(90deg, #6779FF 0%, #4E97FA 25%, #35B5F5 50%, #2EFFEA 100%)',
          // background: '#4E97FA', // blue
          background: '#35B5F5', // cyan blue

          opacity: isScrolled ? 0 : 1,
        }}
      />
      {/* <div style={{ position: 'fixed', top: 0, ... }}> */}
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
          // background: '#fff',
        }}
      >
        {/* Left pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: pillBg,
          borderRadius: 999,
          padding: '0 12px',
          boxShadow: '0 3px 6px rgba(181,181,181,0.25)',
        }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <AriiaSvgMark className="w-20 h-10" />
          </a>
        </div>

        {/* Right pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: pillBg,
          borderRadius: 999,
          padding: '4px',
          gap: 4,
          boxShadow: '0 3px 6px rgba(181,181,181,0.25)',
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
            onClick={openMenu}
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
            <svg style={{ width: 24, height: 24, color: '#111' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
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
            //  background: 'linear-gradient(135deg, #f0f4ff 0%, #e8f6ff 100%)', 
            overflowY: 'scroll',
            WebkitOverflowScrolling: 'touch',
          }}
        >


          {/* Close row */}
          <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <AriiaSvgMark className="w-20 h-10" />
            <button
              type="button"
              onClick={closeMenu}
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
          {/* {SINGLE_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 16px',
                borderBottom: '1px solid rgba(147,216,250,0.3)',
                color: '#111',
                fontWeight: 700,
                textDecoration: 'none',
                touchAction: 'manipulation',
              }}
            >
              {link.icon}
              {link.label}
            </a>
          ))} */}
          {SINGLE_LINKS.map((link) => (
            <a key={link.href} href={link.href} style={{
              display: 'block', padding: '14px 16px',
              borderBottom: '1px solid #eee', color: '#111', fontWeight: 700, textDecoration: 'none',
              touchAction: 'manipulation',
            }}>
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
              borderBottom: '1px solid rgba(147,216,250,0.3)',
              background: 'none',
              border: 'none',
              color: '#111',
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer',
            }}
          >
            <span>Company</span>
            <ChevronDown style={{
              width: 16,
              height: 16,
              color: companyOpen ? '#35B5F5' : '#111',
              transform: companyOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }} />
          </button>

          {companyOpen && COMPANY_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 16px 12px 32px',
                borderBottom: '1px solid #f5f5f5',
                color: '#333',
                textDecoration: 'none',
                touchAction: 'manipulation',
              }}
            >
              {link.icon}
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
              borderBottom: '1px solid rgba(147,216,250,0.3)',
              color: '#111',
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer',
            }}
          >
            <span>Resources</span>
            <ChevronDown style={{
              width: 16,
              height: 16,
              color: resourcesOpen ? '#35B5F5' : '#111',
              transform: resourcesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }} />
          </button>

          {resourcesOpen && RESOURCES_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 16px 12px 32px',
                borderBottom: '1px solid #f5f5f5',
                color: '#333',
                textDecoration: 'none',
                touchAction: 'manipulation',
              }}
            >
              {link.icon}
              {link.label}
            </a>
          ))}

          {/* CTA */}
          <div style={{ padding: '24px 16px', display: 'flex', gap: 12 }}>
            <a
              href="/login"
              onClick={closeMenu}
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
              onClick={closeMenu}
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
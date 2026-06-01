  'use client';

  import { useState } from 'react';
  import {
    ChevronDown,
    ChevronRight,
    Users,
    UserRound,
    Briefcase,
    Mail,
    BookOpen,
    BoxIcon,
    Building2,
    CircleHelp,
    Lock,
    ScrollText,
    ShieldCheck,
    Sparkles,
  } from 'lucide-react';
  import { AriiaSvgMark } from '@/components/icons/AriiaSvgMark';
  import { getLenis } from '@/lib/lenis';

  const SINGLE_LINKS = [
    
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
  ];

  const COMPANY_LINKS = [
    { href: '/#about-us', label: 'About Us', icon: <UserRound style={{ width: 17, height: 17, color: '#4E97FA' }} /> },
    { href: '/story-behind-ariia/', label: 'The Story Behind ARIIA', icon: <Sparkles style={{ width: 17, height: 17, color: '#4E97FA' }} /> },
    { href: '/careers/', label: 'Careers', icon: <Briefcase style={{ width: 17, height: 17, color: '#4E97FA' }} /> },
    { href: '/customers/', label: 'Customers', icon: <Users style={{ width: 17, height: 17, color: '#4E97FA' }} /> },
    { href: '/contact-us/', label: 'Contact Us', icon: <Mail style={{ width: 17, height: 17, color: '#4E97FA' }} /> },
  ];

  const RESOURCES_LINKS = [
    { href: '/blog/', label: 'Blog', icon: <BookOpen style={{ width: 17, height: 17, color: '#4E97FA' }} /> },
    { href: '/#use-cases', label: 'Use Cases', icon: <BoxIcon style={{ width: 17, height: 17, color: '#4E97FA' }} /> },
    { href: '/industries/', label: 'Industries', icon: <Building2 style={{ width: 17, height: 17, color: '#4E97FA' }} /> },
    { href: '/#faq', label: 'Questions & Answers', icon: <CircleHelp style={{ width: 17, height: 17, color: '#4E97FA' }} /> },
    { href: '/#security', label: 'Security & Data Protection', icon: <Lock style={{ width: 17, height: 17, color: '#4E97FA' }} /> },
    { href: '/terms-of-service/', label: 'Terms of Service', icon: <ScrollText style={{ width: 17, height: 17, color: '#4E97FA' }} /> },
    { href: '/privacy-policy/', label: 'Privacy Policy', icon: <ShieldCheck style={{ width: 17, height: 17, color: '#4E97FA' }} /> },
  ];

  export function MobileHeader({
    isScrolled = false,
  }: {
    isScrolled?: boolean;
  }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [companyOpen, setCompanyOpen] = useState(false);
    const [resourcesOpen, setResourcesOpen] = useState(false);

    // Safe: solid color only, never transparent
    const pillBg = isScrolled ? '#f0f8ff' : '#fff';

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
        {/* ── Top bar ── solid white, never transparent */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#fff',
          }}
        >
          {/* Left pill — logo */}
          {/* <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: pillBg,
              borderRadius: 999,
              padding: '0 10px',
              boxShadow: '0 2px 8px rgba(78,151,250,0.12)',
            }}
          >
            <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <AriiaSvgMark className="w-20 h-10" />
            </a>
          </div> */}

          {/* Right pill — CTA + hamburger */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: pillBg,
              borderRadius: 999,
              padding: '4px',
              gap: 4,
              boxShadow: '0 2px 8px rgba(78,151,250,0.12)',
            }}
          >
            <a
              href="/trial"
              style={{
                background: '#111',
                color: '#fff',
                borderRadius: 999,
                padding: '8px 14px',
                fontSize: 13,
                fontWeight: 600,
                textDecoration: 'none',
                touchAction: 'manipulation',
                letterSpacing: '-0.01em',
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
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg style={{ width: 22, height: 22, color: '#111' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Menu overlay ── SAFE: solid gradient, full-screen, scrollable */}
        {menuOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 200,
              // Solid gradient — safe, no transparency, no blur
              background: 'linear-gradient(170deg, #dbeeff 0%, #eaf6ff 40%, #f4fbff 100%)',
              overflowY: 'scroll',
              WebkitOverflowScrolling: 'touch',
            }}
          >

            {/* ── Header row: CTA pills left, close right ── */}
            <div
              style={{
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {/* CTA pill group — matches Eric's screenshot */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: '#fff',
                  borderRadius: 999,
                  padding: '4px',
                  gap: 2,
                  boxShadow: '0 2px 10px rgba(78,151,250,0.15)',
                }}
              >
                <a
                  href="/login"
                  onClick={closeMenu}
                  style={{
                    padding: '8px 16px',
                    color: '#111',
                    textDecoration: 'none',
                    fontSize: 14,
                    fontWeight: 500,
                    borderRadius: 999,
                    touchAction: 'manipulation',
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
                    padding: '8px 16px',
                    fontSize: 14,
                    fontWeight: 600,
                    textDecoration: 'none',
                    touchAction: 'manipulation',
                  }}
                >
                  1-Month Free Trial
                </a>
              </div>

              {/* Close button — circle */}
              <button
                type="button"
                onClick={closeMenu}
                style={{
                  touchAction: 'manipulation',
                  background: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  width: 42,
                  height: 42,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(78,151,250,0.15)',
                  flexShrink: 0,
                }}
              >
                <svg style={{ width: 18, height: 18, color: '#444' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* ── Divider ── */}
            <div style={{ height: 1, background: 'rgba(78,151,250,0.12)', margin: '0 16px' }} />

            {/* ── Nav links container ── */}
            <div style={{ padding: '8px 0' }}>

              {/* Single links */}
              {SINGLE_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '15px 20px',
                    color: '#0d1b2e',
                    fontWeight: 700,
                    fontSize: 16,
                    textDecoration: 'none',
                    touchAction: 'manipulation',
                    borderBottom: '1px solid rgba(78,151,250,0.1)',
                  }}
                >
                  <span>{link.label}</span>
                  <ChevronRight style={{ width: 16, height: 16, color: '#4E97FA' }} />
                </a>
              ))}

              {/* ── Company accordion ── */}
              <button
                type="button"
                onClick={() => setCompanyOpen((p) => !p)}
                style={{
                  touchAction: 'manipulation',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '15px 20px',
                  background: companyOpen ? 'rgba(78,151,250,0.07)' : 'none',
                  border: 'none',
                  borderBottom: '1px solid rgba(78,151,250,0.1)',
                  color: '#0d1b2e',
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span>Company</span>
                <ChevronDown
                  style={{
                    width: 16,
                    height: 16,
                    color: '#4E97FA',
                    transform: companyOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>

              {companyOpen && COMPANY_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '13px 20px 13px 36px',
                    borderBottom: '1px solid rgba(78,151,250,0.07)',
                    color: '#1e3a5f',
                    fontSize: 15,
                    fontWeight: 500,
                    textDecoration: 'none',
                    touchAction: 'manipulation',
                    background: 'rgba(78,151,250,0.04)',
                  }}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </a>
              ))}

              {/* ── Resources accordion ── */}
              <button
                type="button"
                onClick={() => setResourcesOpen((p) => !p)}
                style={{
                  touchAction: 'manipulation',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '15px 20px',
                  background: resourcesOpen ? 'rgba(78,151,250,0.07)' : 'none',
                  border: 'none',
                  borderBottom: '1px solid rgba(78,151,250,0.1)',
                  color: '#0d1b2e',
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span>Resources</span>
                <ChevronDown
                  style={{
                    width: 16,
                    height: 16,
                    color: '#4E97FA',
                    transform: resourcesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>

              {resourcesOpen && RESOURCES_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '13px 20px 13px 36px',
                    borderBottom: '1px solid rgba(78,151,250,0.07)',
                    color: '#1e3a5f',
                    fontSize: 15,
                    fontWeight: 500,
                    textDecoration: 'none',
                    touchAction: 'manipulation',
                    background: 'rgba(78,151,250,0.04)',
                  }}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </a>
              ))}
            </div>

            {/* ── Bottom logo watermark ── subtle brand touch */}
            {/* <div
              style={{
                padding: '28px 20px 32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.4,
              }}
            >
              <AriiaSvgMark className="w-16 h-8" />
            </div> */}

          </div>
        )}
      </>
    );
  }

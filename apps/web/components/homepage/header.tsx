'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { AriiaSvgMark } from '../icons/AriiaSvgMark';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const COMPANY_MENU = [
  { href: '/#about-us',           title: 'About Us',                description: 'Learn about our mission to transform businesses with AI agents.' },
  { href: '/story-behind-ariia/', title: 'The Story Behind ARIIA',  description: "Discover the story behind ARIIA's name & its vision for the future." },
  { href: '/careers/',            title: 'Careers',                 description: 'Help us build the next gen of AI. Explore job openings and join our journey.' },
  { href: '/customers/',          title: 'Customers',               description: 'See how ARIIA is transforming customer experiences for businesses.' },
  { href: '/contact-us/',         title: 'Contact Us',              description: "Have questions? Reach out, and we'll respond within 24 hours." },
];

const RESOURCES_MENU = [
  { href: '/blog/',             title: 'Blog',                       description: 'Stay informed with industry trends, insights, and the latest ARIIA news.' },
  { href: '/#use-cases',        title: 'Use Cases',                  description: 'Check out demos and how ARIIA can be applied across industries.' },
  { href: '/industries/',       title: 'Industries',                 description: 'See the sectors where ARIIA can enhance operations and customer experiences.' },
  { href: '/#faq',              title: 'Questions & Answers',        description: 'Find what you need in our Q&A section.' },
  { href: '/#security',         title: 'Security & Data Protection', description: 'Understand how ARIIA safeguards your data.' },
  { href: '/terms-of-service/', title: 'Terms of Service',           description: 'Review the terms for using our services.' },
  { href: '/privacy-policy/',   title: 'Privacy Policy',             description: 'Learn how your privacy and personal data is protected.' },
];

const MOBILE_SINGLE_LINKS = [
  { href: '/features', label: 'Features' },
  { href: '/pricing',  label: 'Pricing'  },
];
const MOBILE_COMPANY_LINKS = [
  { href: '/#about-us',           label: 'About Us' },
  { href: '/story-behind-ariia/', label: 'The Story Behind ARIIA' },
  { href: '/careers/',            label: 'Careers' },
  { href: '/customers/',          label: 'Customers' },
  { href: '/contact-us/',         label: 'Contact Us' },
];
const MOBILE_RESOURCES_LINKS = [
  { href: '/blog/',             label: 'Blog' },
  { href: '/#use-cases',        label: 'Use Cases' },
  { href: '/industries/',       label: 'Industries' },
  { href: '/#faq',              label: 'Questions & Answers' },
  { href: '/#security',         label: 'Security & Data Protection' },
  { href: '/terms-of-service/', label: 'Terms of Service' },
  { href: '/privacy-policy/',   label: 'Privacy Policy' },
];

// ---------------------------------------------------------------------------
// MobileSection
// ---------------------------------------------------------------------------
function MobileSection({ label, links, isOpen, onToggle }: {
  label: string;
  links: { href: string; label: string }[];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        style={{
          display: 'flex', alignItems: 'center', width: '100%',
          padding: '12px 16px', minHeight: 44,
          background: 'none', border: 'none',
          borderBottom: isOpen ? 'none' : '1px solid rgba(147,216,250,0.3)',
          fontSize: 15, fontWeight: 700, color: '#374151',
          cursor: 'pointer', textAlign: 'left',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <span style={{ flex: 1 }}>{label}</span>
        {/* Inline SVG chevron — zero import cost */}
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke={isOpen ? '#35B5F5' : '#6b7280'} strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
          style={{ transition: 'transform 0.2s ease', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div style={{
        maxHeight: isOpen ? `${links.length * 52}px` : '0px',
        overflow: 'hidden',
        transition: 'max-height 0.22s ease',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '0 16px 12px 16px', borderBottom: '1px solid rgba(147,216,250,0.3)' }}>
          {links.map(link => (
            // Use plain <a> — instant, no JS routing overhead
            <a
              key={link.href}
              href={link.href}
              style={{
                display: 'flex', alignItems: 'center',
                padding: '10px 4px 10px 12px', minHeight: 44,
                fontSize: 16, color: '#1f2937',
                textDecoration: 'none', borderRadius: 6,
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------
export function Header({ isHomePage = true }: { isHomePage?: boolean }) {
  const NO_GRADIENT_ROUTES = ['/', '/#faq', '/#about-us/', '/pricing'];
  const pathname = usePathname();

  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const [mobileMenuOpen,  setMobileMenuOpen]  = useState(false);
  const [isScrolled,      setIsScrolled]      = useState(false);
  const [companyOpen,     setCompanyOpen]     = useState(false);
  const [resourcesOpen,   setResourcesOpen]   = useState(false);

  const hoverTimer         = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldHideGradient = NO_GRADIENT_ROUTES.includes(pathname);

  // Close on route change
  useEffect(() => { setMobileMenuOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  useEffect(() => () => { if (hoverTimer.current) clearTimeout(hoverTimer.current); }, []);

  const handleDropdownEnter = (name: string) => {
    if (hoverTimer.current) { clearTimeout(hoverTimer.current); hoverTimer.current = null; }
    setHoveredDropdown(name);
  };
  const handleDropdownLeave = () => {
    hoverTimer.current = setTimeout(() => setHoveredDropdown(null), 150);
  };

  const pillBg = isScrolled ? 'rgba(255,255,255,0.7)' : '#ffffff';
  const pill: React.CSSProperties = {
    display: 'flex', alignItems: 'center',
    background: pillBg, borderRadius: 9999,
    boxShadow: '0 3px 6px rgba(181,181,181,0.25)',
  };

  return (
    <>
      {/* Gradient bar */}
      <div style={{
        height: 40, position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 40,
        background: 'linear-gradient(90deg,#6779FF 0%,#4E97FA 25%,#35B5F5 50%,#2EFFEA 100%)',
        opacity: isScrolled ? 0 : 1,
        transition: 'opacity 0.5s cubic-bezier(0.23,1,0.32,1)',
        pointerEvents: 'none',
      }} />

      <header style={{
        position: 'fixed', left: 0, top: 0, width: '100%', zIndex: 50,
        background: 'transparent', maxWidth: '100vw',
      }}>
        {/* Ambient glow */}
        {!shouldHideGradient && (
          <div style={{ position: 'absolute', inset: 0, zIndex: -1, pointerEvents: 'none' }}>
            <div style={{
              position: 'absolute', width: 300, height: 150,
              top: '-3rem', right: '5%',
              background: 'linear-gradient(90deg,#6779FF,#4E97FA)',
              opacity: 0.3, filter: 'blur(10rem)',
            }} />
          </div>
        )}

        <div style={{ maxWidth: '73.1rem', margin: '0 auto', padding: '24px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

            {/* LEFT PILL */}
            <div style={{ ...pill, padding: '0 12px' }}>
              <a href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0, textDecoration: 'none', marginRight: 0 }}>
                <AriiaSvgMark priority width={80} height={40} />
              </a>

              <nav className="hdr-desktop-nav">
                <a href="/features" className="hdr-nav-link">Features</a>
                <a href="/pricing"  className="hdr-nav-link" style={{ marginRight: 12 }}>Pricing</a>

                {/* Company */}
                <div style={{ position: 'relative' }}
                  onMouseEnter={() => handleDropdownEnter('company')}
                  onMouseLeave={handleDropdownLeave}>
                  <button className="hdr-drop-btn">
                    Company
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      style={{ marginLeft: 4, transition: 'transform 0.2s', transform: hoveredDropdown === 'company' ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {hoveredDropdown === 'company' && (
                    <div style={dropPanel} className="hdr-drop-panel">
                      {COMPANY_MENU.map(item => (
                        <a key={item.href} href={item.href} className="hdr-drop-item" onClick={() => setHoveredDropdown(null)}>
                          <span style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#111827' }}>{item.title}</span>
                          <span style={{ display: 'block', fontSize: 12, color: '#4b5563', lineHeight: 1.4 }}>{item.description}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* Resources */}
                <div style={{ position: 'relative' }}
                  onMouseEnter={() => handleDropdownEnter('resources')}
                  onMouseLeave={handleDropdownLeave}>
                  <button className="hdr-drop-btn" style={{ marginLeft: -8 }}>
                    Resources
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      style={{ marginLeft: 4, transition: 'transform 0.2s', transform: hoveredDropdown === 'resources' ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {hoveredDropdown === 'resources' && (
                    <div style={dropPanel} className="hdr-drop-panel">
                      {RESOURCES_MENU.map(item => (
                        <a key={item.href} href={item.href} className="hdr-drop-item" onClick={() => setHoveredDropdown(null)}>
                          <span style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#111827' }}>{item.title}</span>
                          <span style={{ display: 'block', fontSize: 12, color: '#4b5563', lineHeight: 1.4 }}>{item.description}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </nav>
            </div>

            {/* RIGHT PILL */}
            <div style={{ ...pill, padding: '4px 4px' }}>
              <a href="/login" className="hdr-login-link">Log In</a>
              <a href="/trial" className="hdr-cta">1-Month Free Trial</a>
              {/* Hamburger */}
              <button
                type="button"
                className="hdr-hamburger"
                aria-label="Open menu"
                onClick={() => setMobileMenuOpen(true)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, marginLeft: 4, WebkitTapHighlightColor: 'transparent' }}
              >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6"  x2="21" y2="6"  />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU — only rendered when open, no isMounted guard needed since no SSR mismatch risk with simple state */}
        {mobileMenuOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 200 }}>
            {/* Backdrop */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} onClick={() => setMobileMenuOpen(false)} />

            {/* Panel */}
            <div style={{
              position: 'relative', zIndex: 1,
              margin: '8px 8px 0', borderRadius: 18,
              border: '1px solid rgba(255,255,255,0.4)',
              background: 'rgba(255,255,255,0.95)',
              boxShadow: '0 14px 36px rgba(15,23,42,0.12)',
              overflowY: 'auto',
              maxHeight: 'calc(100dvh - 1.5rem)',
              display: 'flex', flexDirection: 'column',
            }}>
              {/* Top bar */}
              <div style={{
                position: 'sticky', top: 0, zIndex: 2,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 16px 8px', flexShrink: 0,
              }}>
                <div style={{ background: 'rgba(255,255,255,0.45)', borderRadius: 9999, padding: '4px 12px', border: '1px solid rgba(255,255,255,0.45)', pointerEvents: 'none' }}>
                  <AriiaSvgMark width={64} height={28} />
                </div>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.45)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)', cursor: 'pointer',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Nav */}
              <nav style={{ paddingBottom: 24 }}>
                {MOBILE_SINGLE_LINKS.map(item => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'flex', alignItems: 'center', width: '100%', padding: '12px 16px',
                      minHeight: 44, borderBottom: '1px solid rgba(147,216,250,0.3)',
                      fontSize: 15, fontWeight: 700, color: '#374151', textDecoration: 'none',
                    }}
                  >
                    {item.label}
                  </a>
                ))}

                <MobileSection label="Company"   links={MOBILE_COMPANY_LINKS}   isOpen={companyOpen}   onToggle={() => setCompanyOpen(v => !v)} />
                <MobileSection label="Resources" links={MOBILE_RESOURCES_LINKS} isOpen={resourcesOpen} onToggle={() => setResourcesOpen(v => !v)} />
              </nav>

              {/* Bottom CTA */}
              <div style={{ padding: '8px 16px 24px', flexShrink: 0 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: 'rgba(255,255,255,0.4)', borderRadius: 9999,
                  padding: 5, border: '1px solid rgba(255,255,255,0.45)',
                  boxShadow: '0 14px 36px rgba(15,23,42,0.14)',
                }}>
                  <a href="/login" onClick={() => setMobileMenuOpen(false)} style={{
                    flex: 1, color: '#374151', fontWeight: 500, fontSize: 14,
                    padding: '12px', minHeight: 44, borderRadius: 9999,
                    textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    Log In
                  </a>
                  <a href="/trial" onClick={() => setMobileMenuOpen(false)} style={{
                    flex: 1, background: 'rgba(17,24,39,0.95)', color: '#fff',
                    fontWeight: 500, fontSize: 14, padding: '12px 16px',
                    height: 44, borderRadius: 9999, textDecoration: 'none',
                    textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    1-Month Free Trial
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <style jsx global>{`
        /* Dropdown panel fade */
        .hdr-drop-panel {
          animation: hdr-fade 0.15s ease-out;
        }
        @keyframes hdr-fade {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Desktop nav */
        .hdr-desktop-nav { display: none; }
        @media (min-width: 768px) {
          .hdr-desktop-nav { display: flex; align-items: center; margin-left: 16px; }
        }

        /* Nav links */
        .hdr-nav-link {
          font-size: 14px; font-weight: 500; color: #374151;
          text-decoration: none; padding: 8px 16px; border-radius: 9999px;
          transition: background 0.15s;
        }
        .hdr-nav-link:hover { background: #EEFBFF; }

        /* Dropdown trigger button */
        .hdr-drop-btn {
          display: flex; align-items: center; background: transparent;
          border: none; cursor: pointer; font-size: 14px; font-weight: 500;
          color: #374151; padding: 8px 12px; border-radius: 9999px;
          outline: none; white-space: nowrap; transition: background 0.15s;
        }
        .hdr-drop-btn:hover { background: #EEFBFF; }

        /* Dropdown items */
        .hdr-drop-item {
          display: block; padding: 12px; border-radius: 8px;
          text-decoration: none; transition: background 0.12s;
        }
        .hdr-drop-item:hover { background: #EEFBFF; }

        /* Log In — desktop only */
        .hdr-login-link {
          display: none; color: #4b5563; font-weight: 500; font-size: 14px;
          text-decoration: none; padding: 0 12px 0 20px;
          transition: color 0.15s;
        }
        .hdr-login-link:hover { color: #111827; }
        @media (min-width: 768px) { .hdr-login-link { display: block; } }

        /* CTA button */
        .hdr-cta {
          background: rgba(17,24,39,0.95); color: #fff; font-weight: 500;
          font-size: 14px; padding: 8px 20px; border-radius: 9999px;
          text-decoration: none; display: inline-flex; align-items: center;
          height: 36px; white-space: nowrap; transition: background 0.15s;
        }
        .hdr-cta:hover { background: rgba(31,41,55,0.9); }

        /* Hamburger — mobile only */
        .hdr-hamburger { display: none; }
        @media (max-width: 767px) { .hdr-hamburger { display: flex; } }
      `}</style>
    </>
  );
}

// Panel style (static, never recreated)
const dropPanel: React.CSSProperties = {
  position: 'absolute', top: '100%', left: 0, marginTop: 20,
  width: 384, padding: 8, borderRadius: 12,
  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
  border: '1px solid #f3f4f6', background: '#fff',
  zIndex: 50, display: 'flex', flexDirection: 'column', gap: 2,
};

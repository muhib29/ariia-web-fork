"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import {
  ChevronDown, Users, Sparkles, Briefcase, Building2, Mail,
  BookOpen, BoxIcon, ShieldCheck, Lock, ScrollText, DollarSign,
  CircleHelp, UserRound, X,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { AriiaSvgMark } from '../icons/AriiaSvgMark';

// ---------------------------------------------------------------------------
// Shared inline style helpers (replaces icon className)
// ---------------------------------------------------------------------------
const iconStyle = { width: 20, height: 20, color: '#6b7280', flexShrink: 0 } as const;

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const COMPANY_MENU = [
  { href: '/#about-us',           title: 'About Us',                description: 'Learn about our mission to transform businesses with AI agents.',        icon: <UserRound style={iconStyle} /> },
  { href: '/story-behind-ariia/', title: 'The Story Behind ARIIA',  description: "Discover the story behind ARIIA's name & its vision for the future.",    icon: <Sparkles  style={iconStyle} /> },
  { href: '/careers/',            title: 'Careers',                 description: 'Help us build the next gen of AI. Explore job openings and join our journey.', icon: <Briefcase style={iconStyle} /> },
  { href: '/customers/',          title: 'Customers',               description: 'See how ARIIA is transforming customer experiences for businesses.',       icon: <Users     style={iconStyle} /> },
  { href: '/contact-us/',         title: 'Contact Us',              description: "Have questions? Reach out, and we'll respond within 24 hours.",            icon: <Mail      style={iconStyle} /> },
];

const RESOURCES_MENU = [
  { href: '/blog/',             title: 'Blog',                      description: 'Stay informed with industry trends, insights, and the latest ARIIA news.',       icon: <BookOpen  style={iconStyle} /> },
  { href: '/#use-cases',        title: 'Use Cases',                 description: 'Check out demos and how ARIIA can be applied across industries.',               icon: <BoxIcon   style={iconStyle} /> },
  { href: '/industries/',       title: 'Industries',                description: 'See the sectors where ARIIA can enhance operations and customer experiences.',   icon: <Building2 style={iconStyle} /> },
  { href: '/#faq',              title: 'Questions & Answers',       description: 'Find what you need in our Q&A section.',                                        icon: <CircleHelp style={iconStyle} /> },
  { href: '/#security',         title: 'Security & Data Protection',description: 'Understand how ARIIA safeguards your data.',                                    icon: <Lock      style={iconStyle} /> },
  { href: '/terms-of-service/', title: 'Terms of Service',          description: 'Review the terms for using our services.',                                      icon: <ScrollText style={iconStyle} /> },
  { href: '/privacy-policy/',   title: 'Privacy Policy',            description: 'Learn how your privacy and personal data is protected.',                        icon: <ShieldCheck style={iconStyle} /> },
];

const MOBILE_SINGLE_LINKS   = [{ href: '/features', label: 'Features' }, { href: '/pricing', label: 'Pricing' }];
const MOBILE_COMPANY_LINKS  = [
  { href: '/#about-us',           label: 'About Us'               },
  { href: '/story-behind-ariia/', label: 'The Story Behind ARIIA' },
  { href: '/careers/',            label: 'Careers'                },
  { href: '/customers/',          label: 'Customers'              },
  { href: '/contact-us/',         label: 'Contact Us'             },
];
const MOBILE_RESOURCES_LINKS = [
  { href: '/blog/',             label: 'Blog'                       },
  { href: '/#use-cases',        label: 'Use Cases'                  },
  { href: '/industries/',       label: 'Industries'                 },
  { href: '/#faq',              label: 'Questions & Answers'        },
  { href: '/#security',         label: 'Security & Data Protection' },
  { href: '/terms-of-service/', label: 'Terms of Service'           },
  { href: '/privacy-policy/',   label: 'Privacy Policy'             },
];


// ---------------------------------------------------------------------------
// MobileSection — pure CSS height animation, zero Radix
// ---------------------------------------------------------------------------
function MobileSection({
  label, links, isOpen, onToggle, onNavigate,
}: { label: string; links: { href: string; label: string }[]; isOpen: boolean; onToggle: () => void; onNavigate: (href: string) => void; }) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        style={{
          display: 'flex', alignItems: 'center', width: '100%', padding: '12px 16px',
          minHeight: 44, background: 'none', border: 'none', borderBottom: isOpen ? 'none' : '1px solid rgba(147,216,250,0.3)',
          fontSize: 15, fontWeight: 700, color: '#374151', cursor: 'pointer', textAlign: 'left',
          WebkitTapHighlightColor: 'transparent',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#f3f4f6')}
        onMouseLeave={e => (e.currentTarget.style.background = 'none')}
      >
        <span style={{ flex: 1 }}>{label}</span>
        <ChevronDown style={{
          width: 16, height: 16, color: isOpen ? '#35B5F5' : '#6b7280',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease, color 0.2s ease',
        }} />
      </button>

      <div style={{
        maxHeight: isOpen ? `${links.length * 56}px` : '0px',
        overflow: 'hidden',
        transition: 'max-height 0.22s ease',
        willChange: 'max-height',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '0 16px 16px 16px', borderBottom: '1px solid rgba(147,216,250,0.3)', gap: 4 }}>
          {links.map(link => (
            <button
              key={link.href}
              type="button"
              onClick={() => onNavigate(link.href)}
              style={{
                display: 'flex', alignItems: 'center', padding: '8px 4px 8px 12px',
                minHeight: 44, background: 'none', border: 'none',
                fontSize: 16, color: '#1f2937', cursor: 'pointer', textAlign: 'left',
                WebkitTapHighlightColor: 'transparent',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#f3f4f6')}
              onMouseLeave={e => (e.currentTarget.style.background = 'none')}
            >
              {link.label}
            </button>
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
  const router   = useRouter();

  const [activePath,      setActivePath]      = useState<string | null>(null);
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const [mobileMenuOpen,  setMobileMenuOpen]  = useState(false);
  const [isScrolled,      setIsScrolled]      = useState(false);
  const [isMounted,       setIsMounted]       = useState(false);
  const [companyOpen,     setCompanyOpen]     = useState(false);
  const [resourcesOpen,   setResourcesOpen]   = useState(false);

  const hoverTimer        = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldHideGradient = NO_GRADIENT_ROUTES.includes(pathname);

  useEffect(() => { setMobileMenuOpen(false); }, [pathname]);
  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
  const handleMobileNav = (href: string) => { setMobileMenuOpen(false); router.push(href); };

  // Pill background
  const pillBg = isScrolled ? 'rgba(255,255,255,0.7)' : '#ffffff';
  const pillStyle = {
    display: 'flex', alignItems: 'center', background: pillBg,
    borderRadius: 9999, boxShadow: '0 3px 6px rgba(181,181,181,0.25)',
  } as const;

  return (
    <>
      {/* ── Gradient bar ── */}
      <div style={{
        height: 40, position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 40,
        background: 'linear-gradient(90deg,#6779FF 0%,#4E97FA 25%,#35B5F5 50%,#2EFFEA 100%)',
        opacity: isScrolled ? 0 : 1,
        transition: 'opacity 0.5s cubic-bezier(0.23,1,0.32,1)',
        pointerEvents: 'none',
        willChange: 'opacity',
      }} />

      {/* ── Header ── */}
      <header style={{
        position: 'fixed', left: 0, top: 0, width: '100%', zIndex: 50,
        background: 'transparent', maxWidth: '100vw',
        transition: 'all 0.5s cubic-bezier(0.23,1,0.32,1)',
      }}>
        {/* Ambient glow — only on non-gradient routes */}
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

            {/* ── LEFT PILL ── */}
            <div style={{ ...pillStyle, padding: '0 12px' }}>
              <Link href="/" style={{ display: 'flex', alignItems: 'center', marginRight: 0, flexShrink: 0, textDecoration: 'none' }}>
                <AriiaSvgMark priority width={80} height={40} />
              </Link>

              {/* Desktop nav — hidden on mobile via CSS class */}
              <nav className="hdr-desktop-nav">
                {/* Features */}
                <Link href="/features" style={navLinkStyle}
                  onMouseEnter={e => Object.assign((e.target as HTMLElement).style, navLinkHover)}
                  onMouseLeave={e => Object.assign((e.target as HTMLElement).style, navLinkBase)}>
                  Features
                </Link>
                {/* Pricing */}
                <Link href="/pricing" style={{ ...navLinkStyle, marginRight: 12 }}
                  onMouseEnter={e => Object.assign((e.target as HTMLElement).style, navLinkHover)}
                  onMouseLeave={e => Object.assign((e.target as HTMLElement).style, navLinkBase)}>
                  Pricing
                </Link>

                {/* Company dropdown */}
                <div style={{ position: 'relative' }}
                  onMouseEnter={() => handleDropdownEnter('company')}
                  onMouseLeave={handleDropdownLeave}>
                  <button style={dropBtnStyle}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#EEFBFF')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}>
                    Company
                    <ChevronDown style={{ marginLeft: 4, width: 16, height: 16, transition: 'transform 0.2s', transform: hoveredDropdown === 'company' ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                  </button>
                  {hoveredDropdown === 'company' && (
                    <div style={dropPanelStyle} className="hdr-dropdown-panel">
                      {COMPANY_MENU.map(item => (
                        <Link key={item.href} href={item.href} style={dropItemStyle(activePath === item.href)}
                          onClick={() => { setActivePath(item.href); setHoveredDropdown(null); }}
                          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#EEFBFF')}
                          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = activePath === item.href ? '#EEFBFF' : 'transparent')}>
                          <span style={{ paddingTop: 2, flexShrink: 0 }}>{item.icon}</span>
                          <span>
                            <span style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#111827' }}>{item.title}</span>
                            <span style={{ display: 'block', fontSize: 12, color: '#4b5563', lineHeight: 1.4 }}>{item.description}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Resources dropdown */}
                <div style={{ position: 'relative' }}
                  onMouseEnter={() => handleDropdownEnter('resources')}
                  onMouseLeave={handleDropdownLeave}>
                  <button style={{ ...dropBtnStyle, marginLeft: -8 }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#EEFBFF')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}>
                    Resources
                    <ChevronDown style={{ marginLeft: 4, width: 16, height: 16, transition: 'transform 0.2s', transform: hoveredDropdown === 'resources' ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                  </button>
                  {hoveredDropdown === 'resources' && (
                    <div style={dropPanelStyle} className="hdr-dropdown-panel">
                      {RESOURCES_MENU.map(item => (
                        <Link key={item.href} href={item.href} style={dropItemStyle(activePath === item.href)}
                          onClick={() => { setActivePath(item.href); setHoveredDropdown(null); }}
                          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#EEFBFF')}
                          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = activePath === item.href ? '#EEFBFF' : 'transparent')}>
                          <span style={{ paddingTop: 2, flexShrink: 0 }}>{item.icon}</span>
                          <span>
                            <span style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#111827' }}>{item.title}</span>
                            <span style={{ display: 'block', fontSize: 12, color: '#4b5563', lineHeight: 1.4 }}>{item.description}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </nav>
            </div>

            {/* ── RIGHT PILL ── */}
            <div style={{ ...pillStyle, padding: '4px 4px' }}>
              {/* Log In — desktop only */}
              <Link href="/login" prefetch={false} className="hdr-login-link" style={{ color: '#4b5563', fontWeight: 500, fontSize: 14, textDecoration: 'none', padding: '0 12px 0 20px' }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = '#111827')}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = '#4b5563')}>
                Log In
              </Link>

              {/* CTA */}
              <Link href="/trial" prefetch={false} style={{
                background: 'rgba(17,24,39,0.95)', color: '#fff', fontWeight: 500, fontSize: 14,
                padding: '8px 24px', borderRadius: 9999, textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', height: 36, whiteSpace: 'nowrap',
              }}
                onMouseEnter={e => ((e.target as HTMLElement).style.background = 'rgba(31,41,55,0.9)')}
                onMouseLeave={e => ((e.target as HTMLElement).style.background = 'rgba(17,24,39,0.95)')}>
                1-Month Free Trial
              </Link>

              {/* Hamburger — mobile only */}
              <button
                type="button" className="hdr-hamburger"
                aria-label="Open menu" aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(true)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, marginLeft: 4, display: 'none', WebkitTapHighlightColor: 'transparent' }}>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#111827' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        {isMounted && mobileMenuOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 200, pointerEvents: 'auto' }}>
            {/* Backdrop */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} onClick={() => setMobileMenuOpen(false)} />

            {/* Panel */}
            <div style={{
              position: 'relative', zIndex: 1,
              margin: '8px 8px 0', borderRadius: 18,
              border: '1px solid rgba(255,255,255,0.4)',
              background: 'rgba(255,255,255,0.92)',
              boxShadow: '0 14px 36px rgba(15,23,42,0.12)',
              overflowY: 'auto',
              maxHeight: 'calc(100dvh - 1.5rem)',
              display: 'flex', flexDirection: 'column',
            }}>
              {/* Top bar */}
              <div style={{ position: 'sticky', top: 0, zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px 8px', background: 'transparent', flexShrink: 0 }}>
                <div style={{ background: 'rgba(255,255,255,0.45)', borderRadius: 9999, padding: '4px 12px', border: '1px solid rgba(255,255,255,0.45)', pointerEvents: 'none' }}>
                  <AriiaSvgMark width={64} height={28} />
                </div>
                <button
                  type="button" aria-label="Close menu"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.45)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)', cursor: 'pointer',
                    WebkitTapHighlightColor: 'transparent',
                  }}>
                  <X style={{ width: 16, height: 16, color: '#374151', pointerEvents: 'none' }} />
                </button>
              </div>

              {/* Nav items */}
              <nav style={{ paddingBottom: 24 }}>
                {MOBILE_SINGLE_LINKS.map(item => (
                  <button key={item.href} type="button" onClick={() => handleMobileNav(item.href)}
                    style={{
                      display: 'flex', alignItems: 'center', width: '100%', padding: '12px 16px',
                      minHeight: 44, background: 'none', border: 'none',
                      borderBottom: '1px solid rgba(147,216,250,0.3)',
                      fontSize: 15, fontWeight: 700, color: '#374151', cursor: 'pointer', textAlign: 'left',
                      WebkitTapHighlightColor: 'transparent',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#f3f4f6')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'none')}>
                    {item.label}
                  </button>
                ))}

                <MobileSection label="Company"   links={MOBILE_COMPANY_LINKS}   isOpen={companyOpen}   onToggle={() => setCompanyOpen(v => !v)}   onNavigate={handleMobileNav} />
                <MobileSection label="Resources" links={MOBILE_RESOURCES_LINKS} isOpen={resourcesOpen} onToggle={() => setResourcesOpen(v => !v)} onNavigate={handleMobileNav} />
              </nav>

              {/* Bottom CTA */}
              <div style={{ padding: '8px 16px 24px', flexShrink: 0 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: 'rgba(255,255,255,0.4)', borderRadius: 9999,
                  padding: 5, border: '1px solid rgba(255,255,255,0.45)',
                  boxShadow: '0 14px 36px rgba(15,23,42,0.14)',
                }}>
                  <button type="button" onClick={() => handleMobileNav('/login')} style={{
                    flex: 1, background: 'none', border: 'none', color: '#374151', fontWeight: 500,
                    fontSize: 14, padding: '12px 12px', minHeight: 44, borderRadius: 9999,
                    cursor: 'pointer', textAlign: 'center', WebkitTapHighlightColor: 'transparent',
                  }}>
                    Log In
                  </button>
                  <button type="button" onClick={() => handleMobileNav('/trial')} style={{
                    flex: 1, background: 'rgba(17,24,39,0.95)', color: '#fff', fontWeight: 500,
                    fontSize: 14, padding: '12px 16px', height: 44, borderRadius: 9999,
                    border: 'none', cursor: 'pointer', WebkitTapHighlightColor: 'transparent',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(31,41,55,0.9)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(17,24,39,0.95)')}>
                    1-Month Free Trial
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ── Global styles — minimal, only what inline styles can't do ── */}
      <style jsx global>{`
        /* Dropdown fade-in */
        .hdr-dropdown-panel {
          animation: hdr-fade-in 0.18s ease-out;
        }
        @keyframes hdr-fade-in {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        /* Desktop nav: visible on md+ */
        .hdr-desktop-nav {
          display: none;
        }
        @media (min-width: 768px) {
          .hdr-desktop-nav {
            display: flex;
            align-items: center;
            gap: 0;
            margin-left: 16px;
          }
        }

        /* Log In link: hide on mobile */
        .hdr-login-link { display: none; }
        @media (min-width: 768px) { .hdr-login-link { display: block; } }

        /* Hamburger: show on mobile only */
        .hdr-hamburger { display: none !important; }
        @media (max-width: 767px) { .hdr-hamburger { display: flex !important; } }
      `}</style>
    </>
  );
}

// ---------------------------------------------------------------------------
// Shared style objects (defined after component so they don't rebuild each render)
// ---------------------------------------------------------------------------
const navLinkBase = { color: '#374151', textDecoration: 'none', background: 'transparent', borderRadius: 9999 } as const;
const navLinkHover = { background: '#EEFBFF' } as const;
const navLinkStyle: React.CSSProperties = {
  ...navLinkBase,
  fontWeight: 500, fontSize: 14,
  padding: '8px 16px', borderRadius: 9999,
  display: 'inline-block', transition: 'background 0.15s',
};
const dropBtnStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center',
  background: 'transparent', border: 'none', cursor: 'pointer',
  fontWeight: 500, fontSize: 14, color: '#374151',
  padding: '8px 12px', borderRadius: 9999,
  outline: 'none', transition: 'background 0.15s',
  whiteSpace: 'nowrap',
};
const dropPanelStyle: React.CSSProperties = {
  position: 'absolute', top: '100%', left: 0, marginTop: 20,
  width: 384, padding: 8, borderRadius: 12,
  boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid #f3f4f6',
  background: '#fff', zIndex: 50,
  display: 'flex', flexDirection: 'column', gap: 2,
};
const dropItemStyle = (active: boolean): React.CSSProperties => ({
  display: 'flex', alignItems: 'flex-start', gap: 12, padding: 12, borderRadius: 8,
  textDecoration: 'none', background: active ? '#EEFBFF' : 'transparent',
  transition: 'background 0.12s',
});

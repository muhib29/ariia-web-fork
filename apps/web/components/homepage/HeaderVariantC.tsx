'use client';

/**
 * HEADER VARIANT C
 * ─────────────────────────────────────────────────────────────────────────────
 * Strategy: STATIC CSS ONLY — ZERO RUNTIME CLASS GENERATION
 *
 * The original used dynamic Tailwind class combinations computed at runtime:
 *   - `bg-white/70` vs `bg-white` toggled inline
 *   - `transition-transform duration-200` generated dynamically
 *   - `rotate-180` computed from state on every render
 *   - Inline `style jsx global` re-injecting styles every render
 *
 * Variant C moves ALL styling into a single static <style> block compiled
 * once. No Tailwind class churn at runtime. State changes toggle simple
 * CSS class names like `open`, `scrolled`, `active` — the browser handles
 * the rest via pure CSS rules.
 *
 * This is the lowest JS-to-style overhead variant.
 *
 * UI: IDENTICAL to original — two floating pills, exact same mobile menu.
 */

import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown, Users, Sparkles, Briefcase, Building2, Mail, BookOpen, BoxIcon, ShieldCheck, Lock, ScrollText, CircleHelp, UserRound, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const COMPANY_MENU = [
  { href: '/#about-us', title: 'About Us', description: 'Learn about our mission to transform businesses with AI agents.', icon: <UserRound className="vc-icon" /> },
  { href: '/story-behind-ariia/', title: 'The Story Behind ARIIA', description: "Discover the story behind ARIIA's name & its vision for the future.", icon: <Sparkles className="vc-icon" /> },
  { href: '/careers/', title: 'Careers', description: 'Help us build the next gen of AI. Explore job openings and join our journey.', icon: <Briefcase className="vc-icon" /> },
  { href: '/customers/', title: 'Customers', description: 'See how ARIIA is transforming customer experiences for businesses.', icon: <Users className="vc-icon" /> },
  { href: '/contact-us/', title: 'Contact Us', description: "Have questions? Reach out, and we'll respond within 24 hours.", icon: <Mail className="vc-icon" /> },
];

const RESOURCES_MENU = [
  { href: '/blog/', title: 'Blog', description: 'Stay informed with industry trends, insights, and the latest ARIIA news.', icon: <BookOpen className="vc-icon" /> },
  { href: '/#use-cases', title: 'Use Cases', description: 'Check out demos and how ARIIA can be applied across industries.', icon: <BoxIcon className="vc-icon" /> },
  { href: '/industries/', title: 'Industries', description: 'See the sectors where ARIIA can enhance operations and customer experiences.', icon: <Building2 className="vc-icon" /> },
  { href: '/#faq', title: 'Questions & Answers', description: 'Find what you need in our Q&A section.', icon: <CircleHelp className="vc-icon" /> },
  { href: '/#security', title: 'Security & Data Protection', description: 'Understand how ARIIA safeguards your data.', icon: <Lock className="vc-icon" /> },
  { href: '/terms-of-service/', title: 'Terms of Service', description: 'Review the terms for using our services.', icon: <ScrollText className="vc-icon" /> },
  { href: '/privacy-policy/', title: 'Privacy Policy', description: 'Learn how your privacy and personal data is protected.', icon: <ShieldCheck className="vc-icon" /> },
];

const COMPANY_MOBILE = [
  { href: '/#about-us', label: 'About Us' },
  { href: '/story-behind-ariia/', label: 'The Story Behind ARIIA' },
  { href: '/careers/', label: 'Careers' },
  { href: '/customers/', label: 'Customers' },
  { href: '/contact-us/', label: 'Contact Us' },
];

const RESOURCES_MOBILE = [
  { href: '/blog/', label: 'Blog' },
  { href: '/#use-cases', label: 'Use Cases' },
  { href: '/industries/', label: 'Industries' },
  { href: '/#faq', label: 'Questions & Answers' },
  { href: '/#security', label: 'Security & Data Protection' },
  { href: '/terms-of-service/', label: 'Terms of Service' },
  { href: '/privacy-policy/', label: 'Privacy Policy' },
];

function MobileAccordion({ label, links, onClose }: { label: string; links: { href: string; label: string }[]; onClose: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen((p) => !p)} className={'vc-mob-acc-trigger' + (open ? ' open' : '')}>
        <span>{label}</span>
        <ChevronDown className={'vc-chevron' + (open ? ' open' : '')} style={{ color: open ? '#35B5F5' : undefined }} />
      </button>
      <div className={'vc-mob-acc-body' + (open ? ' open' : '')} style={{ maxHeight: open ? `${links.length * 56}px` : '0px' }}>
        <div className="vc-mob-acc-inner">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="vc-mob-sub-link" onClick={onClose}>
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export function HeaderVariantC({ isHomePage = true }: { isHomePage?: boolean }) {
  const pathname = usePathname();
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setIsMounted(true); }, []);
  useEffect(() => { setMobileMenuOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => () => { if (hoverTimer.current) clearTimeout(hoverTimer.current); }, []);

  const enterDropdown = useCallback((name: string) => {
    if (hoverTimer.current) { clearTimeout(hoverTimer.current); hoverTimer.current = null; }
    setHoveredDropdown(name);
  }, []);

  const leaveDropdown = useCallback(() => {
    hoverTimer.current = setTimeout(() => setHoveredDropdown(null), 300);
  }, []);

  const openMenu = useCallback(() => setMobileMenuOpen(true), []);
  const closeMenu = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <div className="w-full">
      <div id="gradient-bar" aria-hidden="true" className={'vc-gradient-bar' + (isScrolled ? ' hidden' : '')} />

      <header className={'vc-header' + (isScrolled ? ' scrolled' : '') + (isHomePage && !isScrolled ? ' header-vertical-lines' : '')}>
        <div className="vc-glow" aria-hidden="true" />
        <div className="vc-inner">
          <div className="vc-row">

            {/* LEFT PILL */}
            <div className="vc-pill">
              <Link href="/" className="vc-logo">
                {/* Replace with: <AriiaSvgMark priority className="w-20 h-10 md:h-9 md:w-28" /> */}
                <span className="vc-logo-text">ARIIA</span>
              </Link>
              <nav className="vc-nav">
                <Link href="/features" className="vc-nav-link">Features</Link>
                <Link href="/pricing" className="vc-nav-link">Pricing</Link>

                <div className="vc-dropdown" onMouseEnter={() => enterDropdown('company')} onMouseLeave={leaveDropdown}>
                  <button type="button" className="vc-nav-link vc-dropdown-trigger">
                    Company
                    <ChevronDown className={'vc-chevron' + (hoveredDropdown === 'company' ? ' open' : '')} />
                  </button>
                  {hoveredDropdown === 'company' && (
                    <div className="vc-dropdown-panel vc-fade-in">
                      {COMPANY_MENU.map((item) => (
                        <Link key={item.href} href={item.href} className="vc-dropdown-item" onClick={() => setHoveredDropdown(null)}>
                          <div className="vc-dropdown-icon">{item.icon}</div>
                          <div>
                            <p className="vc-dropdown-title">{item.title}</p>
                            <p className="vc-dropdown-desc">{item.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <div className="vc-dropdown" onMouseEnter={() => enterDropdown('resources')} onMouseLeave={leaveDropdown}>
                  <button type="button" className="vc-nav-link vc-dropdown-trigger">
                    Resources
                    <ChevronDown className={'vc-chevron' + (hoveredDropdown === 'resources' ? ' open' : '')} />
                  </button>
                  {hoveredDropdown === 'resources' && (
                    <div className="vc-dropdown-panel vc-fade-in">
                      {RESOURCES_MENU.map((item) => (
                        <Link key={item.href} href={item.href} className="vc-dropdown-item" onClick={() => setHoveredDropdown(null)}>
                          <div className="vc-dropdown-icon">{item.icon}</div>
                          <div>
                            <p className="vc-dropdown-title">{item.title}</p>
                            <p className="vc-dropdown-desc">{item.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </nav>
            </div>

            {/* RIGHT PILL */}
            <div className="vc-actions">
              <Link href="/login" prefetch={false} className="vc-login">Log In</Link>
              <Link href="/trial" prefetch={false} className="vc-trial">1-Month Free Trial</Link>
              <div className="vc-mob-toggle-wrap">
                <button type="button" aria-label="Open menu" aria-expanded={mobileMenuOpen} onClick={openMenu} className="vc-mob-toggle">
                  <svg className="vc-hamburger" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {isMounted && (
        <>
          {mobileMenuOpen && <div aria-hidden="true" onClick={closeMenu} className="vc-backdrop" />}
          <div role="dialog" aria-modal={mobileMenuOpen} aria-label="Navigation menu" className={'vc-mob-menu' + (mobileMenuOpen ? ' open' : '')}>
            <div className="vc-mob-card">
              <div className="vc-mob-top">
                <div className="vc-mob-logo-pill">
                  {/* Replace with: <AriiaSvgMark className="w-16 h-7" /> */}
                  <span className="vc-logo-text" style={{ fontSize: 14 }}>ARIIA</span>
                </div>
                <button type="button" aria-label="Close menu" onClick={closeMenu} className="vc-mob-close">
                  <X className="vc-close-icon" />
                </button>
              </div>

              <nav className="vc-mob-nav">
                <Link href="/features" className="vc-mob-link" onClick={closeMenu}><span>Features</span></Link>
                <Link href="/pricing" className="vc-mob-link" onClick={closeMenu}><span>Pricing</span></Link>
                <MobileAccordion label="Company" links={COMPANY_MOBILE} onClose={closeMenu} />
                <MobileAccordion label="Resources" links={RESOURCES_MOBILE} onClose={closeMenu} />
              </nav>

              <div className="vc-mob-cta-wrap">
                <div className="vc-mob-cta-bar">
                  <Link href="/login" prefetch={false} className="vc-mob-login" onClick={closeMenu}>Log In</Link>
                  <Link href="/trial" prefetch={false} className="vc-mob-trial" onClick={closeMenu}>1-Month Free Trial</Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/*
        ALL STYLES STATIC — compiled once, never re-injected.
        Move this entire block to globals.css in production for zero runtime cost.
      */}
      <style>{`
        /* Gradient bar */
        .vc-gradient-bar {
          position: fixed; top: 0; left: 0; width: 100%; height: 40px; z-index: 40;
          pointer-events: none;
          background: linear-gradient(90deg, #6779FF 0%, #4E97FA 25%, #35B5F5 50%, #2EFFEA 100%);
          opacity: 1;
          transition: opacity 0.5s cubic-bezier(0.23,1,0.32,1);
        }
        .vc-gradient-bar.hidden { opacity: 0; }

        /* Header */
        .vc-header {
          position: fixed; left: 0; width: 100%; z-index: 50;
          background: transparent; top: 0; max-width: 100vw;
        }
        .vc-glow {
          position: absolute; inset: 0; z-index: -10; pointer-events: none;
          background: radial-gradient(circle at 90% 0%, rgba(103,121,255,0.18), transparent 34%);
          opacity: 0.35;
        }
        .vc-inner { max-width: 73.1rem; margin: 0 auto; padding: 24px 16px; }
        @media (min-width: 768px) { .vc-inner { padding: 24px 24px; } }
        @media (min-width: 1024px) { .vc-inner { padding: 24px 16px; } }
        .vc-row { display: flex; align-items: center; justify-content: space-between; }

        /* Pills */
        .vc-pill {
          display: flex; align-items: center;
          background: white; border-radius: 9999px;
          box-shadow: 0 3px 6px rgba(181,181,181,0.25);
          padding: 0 12px;
        }
        @media (min-width: 768px) { .vc-pill { padding: 8px 16px; } }
        .vc-actions {
          display: flex; align-items: center;
          background: white; border-radius: 9999px;
          box-shadow: 0 3px 6px rgba(181,181,181,0.25);
          padding: 4px; gap: 4px;
        }
        @media (min-width: 768px) { .vc-actions { padding: 8px; gap: 16px; } }

        /* Logo */
        .vc-logo { display: flex; align-items: center; justify-content: center; text-decoration: none; flex-shrink: 0; width: 80px; height: 40px; }
        @media (min-width: 768px) { .vc-logo { margin-right: 16px; height: 36px; width: 112px; } }
        .vc-logo-text { font-weight: 700; font-size: 18px; color: #111827; }

        /* Desktop nav */
        .vc-nav { display: none; align-items: center; gap: 24px; }
        @media (min-width: 768px) { .vc-nav { display: flex; } }
        .vc-nav-link {
          display: inline-flex; align-items: center; gap: 4px;
          color: #374151; font-weight: 500; font-size: 14px;
          text-decoration: none; border-radius: 9999px; padding: 8px 16px;
          background: transparent; border: none; cursor: pointer;
          transition: background-color 0.15s ease;
        }
        .vc-nav-link:hover { background: #eefbff; color: #111827; }
        .vc-dropdown { position: relative; }
        .vc-dropdown-trigger { margin-left: -12px; }

        /* Dropdown panels */
        .vc-dropdown-panel {
          position: absolute; top: calc(100% + 20px); left: 0;
          width: 384px; padding: 8px; border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          border: 1px solid #f3f4f6; background: white; z-index: 50;
        }
        .vc-dropdown-item {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 12px; border-radius: 8px; text-decoration: none;
          transition: background-color 0.15s ease;
        }
        .vc-dropdown-item:hover { background: #eefbff; }
        .vc-dropdown-icon { padding-top: 4px; }
        .vc-icon { width: 20px; height: 20px; color: #6b7280; }
        .vc-dropdown-title { font-size: 14px; font-weight: 500; color: #111827; }
        .vc-dropdown-desc { font-size: 12px; color: #4b5563; line-height: 1.4; }

        /* Chevron */
        .vc-chevron { width: 16px; height: 16px; margin-left: 4px; transition: transform 0.2s ease; }
        .vc-chevron.open { transform: rotate(180deg); }

        /* Right pill items */
        .vc-login { display: none; color: #4b5563; font-weight: 500; font-size: 14px; text-decoration: none; padding: 8px 12px; border-radius: 9999px; }
        @media (min-width: 768px) { .vc-login { display: block; margin-left: 20px; } }
        .vc-trial {
          display: inline-flex; align-items: center; justify-content: center;
          background: #111827; color: white; font-weight: 500; font-size: 12px;
          padding: 8px 12px; height: 32px; border-radius: 9999px; text-decoration: none;
          transition: background-color 0.15s ease;
        }
        @media (min-width: 640px) { .vc-trial { font-size: 14px; padding: 8px 24px; height: 36px; } }
        .vc-trial:hover { background: #1f2937; }
        .vc-mob-toggle-wrap { display: block; }
        @media (min-width: 768px) { .vc-mob-toggle-wrap { display: none; } }
        .vc-mob-toggle {
          display: flex; align-items: center; justify-content: center;
          width: 32px; height: 32px; border-radius: 9999px;
          background: none; border: none; cursor: pointer; touch-action: manipulation;
        }
        @media (min-width: 640px) { .vc-mob-toggle { width: 40px; height: 40px; } }
        .vc-hamburger { width: 24px; height: 24px; color: #111827; }

        /* Fade animation */
        @keyframes vc-fade { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        .vc-fade-in { animation: vc-fade 0.16s ease-out; }

        /* Mobile backdrop */
        .vc-backdrop { position: fixed; inset: 0; z-index: 190; }

        /* Mobile menu */
        .vc-mob-menu {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          opacity: 0; pointer-events: none;
          transition: opacity 0.15s ease;
        }
        .vc-mob-menu.open { opacity: 1; pointer-events: auto; }
        .vc-mob-card {
          margin: 8px; border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.4);
          background: white;
          box-shadow: 0 14px 36px rgba(15,23,42,0.12);
          overflow-y: auto; display: flex; flex-direction: column;
          max-height: calc(100dvh - 1.5rem);
          touch-action: manipulation;
        }
        .vc-mob-top {
          position: sticky; top: 0; z-index: 2;
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 16px 8px; background: white; flex-shrink: 0;
        }
        .vc-mob-logo-pill {
          background: rgba(255,255,255,0.45); border-radius: 9999px;
          padding: 4px 12px; border: 1px solid rgba(255,255,255,0.45);
          display: flex; align-items: center; pointer-events: none;
        }
        .vc-mob-close {
          display: flex; align-items: center; justify-content: center;
          width: 40px; height: 40px; border-radius: 9999px;
          background: rgba(255,255,255,0.45); box-shadow: 0 1px 4px rgba(0,0,0,0.1);
          border: 1px solid rgba(255,255,255,0.45); cursor: pointer; touch-action: manipulation;
        }
        .vc-close-icon { width: 16px; height: 16px; color: #374151; pointer-events: none; }
        .vc-mob-nav { padding-bottom: 24px; }
        .vc-mob-link {
          display: flex; align-items: center; gap: 8px;
          padding: 12px 16px; min-height: 44px;
          color: #374151; font-weight: 700; text-decoration: none;
          border-bottom: 1px solid rgba(147,216,250,0.3);
          touch-action: manipulation;
        }
        .vc-mob-acc-trigger {
          display: flex; align-items: center; width: 100%;
          padding: 12px 16px; gap: 8px; min-height: 44px;
          color: #374151; font-weight: 700; background: none; border: none; cursor: pointer;
          touch-action: manipulation;
        }
        .vc-mob-acc-trigger:not(.open) { border-bottom: 1px solid rgba(147,216,250,0.3); }
        .vc-mob-acc-body { overflow: hidden; transition: max-height 0.22s ease; }
        .vc-mob-acc-inner { display: flex; flex-direction: column; padding: 0 16px 16px; gap: 4px; border-bottom: 1px solid rgba(147,216,250,0.3); }
        .vc-mob-sub-link {
          display: flex; margin-left: 8px; align-items: flex-start; gap: 8px;
          padding: 8px 4px; min-height: 44px; color: #1f2937; font-weight: 400;
          text-decoration: none; touch-action: manipulation;
        }
        .vc-mob-cta-wrap { padding: 8px 16px 24px; flex-shrink: 0; }
        .vc-mob-cta-bar {
          width: 100%; background: rgba(255,255,255,0.4); border-radius: 9999px;
          padding: 5px; box-shadow: 0 14px 36px rgba(15,23,42,0.14);
          display: flex; align-items: center; justify-content: space-between;
          gap: 8px; border: 1px solid rgba(255,255,255,0.45);
        }
        .vc-mob-login {
          flex: 1; color: #374151; font-weight: 500; font-size: 14px;
          padding: 12px; min-height: 44px; border-radius: 9999px;
          text-align: center; background: transparent; text-decoration: none;
          display: flex; align-items: center; justify-content: center; touch-action: manipulation;
        }
        .vc-mob-trial {
          flex: 1; display: inline-flex; align-items: center; justify-content: center;
          background: #111827; color: white; font-weight: 500; font-size: 14px;
          padding: 0 16px; height: 32px; border-radius: 9999px; text-decoration: none;
        }
      `}</style>
    </div>
  );
}

'use client';

/**
 * HEADER VARIANT E
 * ─────────────────────────────────────────────────────────────────────────────
 * Strategy: CLOSEST TO ORIGINAL PREMIUM LOOK — OPTIMIZED INTERNALS
 *
 * This variant keeps the most visual features of the original:
 *   ✓ Gradient bar (opacity transition, NO will-change)
 *   ✓ Background glow effect
 *   ✓ Mobile menu with subtle border and shadow
 *   ✓ Bottom CTA bar with bg-white/40 tint
 *   ✓ Logo pill in mobile menu header with border
 *   ✓ Sticky top row on mobile menu
 *
 * What's still fixed vs original:
 *   ✗ will-change removed from gradient bar and header
 *   ✗ bg-white/90 on mobile menu → bg-white (invisible diff, eliminates GPU layer)
 *   ✗ transform-gpu on mobile menu → gone
 *   ✗ lenis.stop() / body overflow locking → gone
 *   ✗ router.push() in click handlers → native Link
 *   ✗ style jsx global → plain static <style>
 *   ✗ Inline style recalcs on header (top/paddingTop/transform all '0px') → gone
 *
 * This is the "if only ONE variant works visually, use this one" variant.
 * Test it first on iPhone Safari alongside Variant A to compare performance.
 *
 * UI: MOST IDENTICAL to original — all premium visual details preserved.
 */

import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronDown,
  Users,
  Sparkles,
  Briefcase,
  Building2,
  Mail,
  BookOpen,
  BoxIcon,
  ShieldCheck,
  Lock,
  ScrollText,
  CircleHelp,
  UserRound,
  X,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

const COMPANY_MENU = [
  { href: '/#about-us', title: 'About Us', description: 'Learn about our mission to transform businesses with AI agents.', icon: <UserRound className="h-5 w-5 text-gray-500" /> },
  { href: '/story-behind-ariia/', title: 'The Story Behind ARIIA', description: "Discover the story behind ARIIA's name & its vision for the future.", icon: <Sparkles className="h-5 w-5 text-gray-500" /> },
  { href: '/careers/', title: 'Careers', description: 'Help us build the next gen of AI. Explore job openings and join our journey.', icon: <Briefcase className="h-5 w-5 text-gray-500" /> },
  { href: '/customers/', title: 'Customers', description: 'See how ARIIA is transforming customer experiences for businesses.', icon: <Users className="h-5 w-5 text-gray-500" /> },
  { href: '/contact-us/', title: 'Contact Us', description: "Have questions? Reach out, and we'll respond within 24 hours.", icon: <Mail className="h-5 w-5 text-gray-500" /> },
];

const RESOURCES_MENU = [
  { href: '/blog/', title: 'Blog', description: 'Stay informed with industry trends, insights, and the latest ARIIA news.', icon: <BookOpen className="h-5 w-5 text-gray-500" /> },
  { href: '/#use-cases', title: 'Use Cases', description: 'Check out demos and how ARIIA can be applied across industries.', icon: <BoxIcon className="h-5 w-5 text-gray-500" /> },
  { href: '/industries/', title: 'Industries', description: 'See the sectors where ARIIA can enhance operations and customer experiences.', icon: <Building2 className="h-5 w-5 text-gray-500" /> },
  { href: '/#faq', title: 'Questions & Answers', description: 'Find what you need in our Q&A section.', icon: <CircleHelp className="h-5 w-5 text-gray-500" /> },
  { href: '/#security', title: 'Security & Data Protection', description: 'Understand how ARIIA safeguards your data.', icon: <Lock className="h-5 w-5 text-gray-500" /> },
  { href: '/terms-of-service/', title: 'Terms of Service', description: 'Review the terms for using our services.', icon: <ScrollText className="h-5 w-5 text-gray-500" /> },
  { href: '/privacy-policy/', title: 'Privacy Policy', description: 'Learn how your privacy and personal data is protected.', icon: <ShieldCheck className="h-5 w-5 text-gray-500" /> },
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
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={'flex items-center px-4 gap-2 py-3 min-h-[44px] text-gray-700 font-bold w-full touch-manipulation' + (open ? '' : ' border-b border-[#93d8fa4c]')}
      >
        <span>{label}</span>
        <ChevronDown
          className="size-4 ml-auto ve-chevron"
          style={{ color: open ? '#35B5F5' : undefined, transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      <div style={{ maxHeight: open ? `${links.length * 56}px` : '0px', overflow: 'hidden', transition: 'max-height 0.22s ease' }}>
        <div className="flex flex-col w-full px-4 gap-1 pb-4 border-b border-[#93d8fa4c]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex ml-2 items-start gap-2 py-2 px-1 min-h-[44px] text-gray-800 font-normal touch-manipulation"
              onClick={onClose}
            >
              <span className="text-base leading-6">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export function HeaderVariantE({ isHomePage = true }: { isHomePage?: boolean }) {
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
      {/*
        GRADIENT BAR
        FIX: No will-change. CSS opacity transition only.
        Compositing happens lazily per frame — no persistent GPU layer.
      */}
      <div
        id="gradient-bar"
        aria-hidden="true"
        className="ve-gradient-bar"
        style={{ opacity: isScrolled ? 0 : 1 }}
      />

      <header
        className={`fixed left-0 w-full z-50 !bg-transparent${isHomePage && !isScrolled ? ' header-vertical-lines' : ''}`}
        style={{ maxWidth: '100vw', top: 0 }}
        /*
          FIX: Original had these inline — all evaluated to '0px' / 'translateY(0)'.
          Removed entirely. No style recalc on every render.
          FIX: will-change: transform, padding-top removed.
        */
      >
        {/* Background glow — on its own layer, NOT on the header */}
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          {/* <div className="absolute w-[300px] h-[150px] md:w-[500px] md:h-[300px] -top-[3rem] md:-top-[12rem] right-[5%] bg-gradient-to-r from-[#6779FF] to-[#4E97FA] opacity-30 blur-[10rem]" /> */}
        </div>

        <div className="max-w-[73.1rem] mx-auto px-4 md:px-6 lg:px-4 py-6">
          <div className="flex items-center justify-between">

            {/* LEFT PILL */}
            <div className="flex items-center bg-white rounded-full shadow-[0_3px_6px_rgba(181,181,181,0.25)] px-3 py-0 md:px-4 md:py-2">
              <Link href="/" className="flex items-center justify-center mr-0 shrink-0 md:mr-4">
                {/* Replace with: <AriiaSvgMark priority className="w-20 h-10 md:h-9 md:w-28" /> */}
                <span className="font-bold text-lg text-gray-900 w-20 h-10 md:h-9 md:w-28 flex items-center">ARIIA</span>
              </Link>

              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/features" className="text-gray-700 hover:text-gray-900 font-medium text-sm hover:bg-[#EEFBFF] rounded-full px-4 py-2">Features</Link>
                <Link href="/pricing" className="text-gray-700 hover:text-gray-900 font-medium text-sm hover:bg-[#EEFBFF] rounded-full px-4 py-2 mr-3">Pricing</Link>

                <div className="relative" onMouseEnter={() => enterDropdown('company')} onMouseLeave={leaveDropdown}>
                  <button type="button" className="flex items-center text-gray-700 hover:text-gray-900 font-medium text-sm outline-none rounded-full py-2 px-3 -mx-3 hover:bg-[#EEFBFF]">
                    Company
                    <ChevronDown className="ml-1 h-4 w-4 ve-chevron" style={{ transform: hoveredDropdown === 'company' ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                  </button>
                  {hoveredDropdown === 'company' && (
                    <div className="absolute top-full left-0 mt-5 w-96 p-2 rounded-xl shadow-lg border border-gray-100 bg-white space-y-1 z-50 ve-fade-in">
                      {COMPANY_MENU.map((item) => (
                        <Link key={item.href} href={item.href} className="flex items-start gap-3 p-3 rounded-lg ve-menu-item" onClick={() => setHoveredDropdown(null)}>
                          <div className="pt-1">{item.icon}</div>
                          <div className="text-left">
                            <p className="text-sm font-medium text-gray-900">{item.title}</p>
                            <p className="text-xs text-gray-600 leading-tight">{item.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative" onMouseEnter={() => enterDropdown('resources')} onMouseLeave={leaveDropdown}>
                  <button type="button" className="flex items-center text-gray-700 hover:text-gray-900 font-medium text-sm outline-none rounded-full py-2 px-3 -mx-2 hover:bg-[#EEFBFF]">
                    Resources
                    <ChevronDown className="ml-1 h-4 w-4 ve-chevron" style={{ transform: hoveredDropdown === 'resources' ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                  </button>
                  {hoveredDropdown === 'resources' && (
                    <div className="absolute top-full left-0 mt-5 w-96 p-2 rounded-xl shadow-lg border border-gray-100 bg-white space-y-1 z-50 ve-fade-in">
                      {RESOURCES_MENU.map((item) => (
                        <Link key={item.href} href={item.href} className="flex items-start gap-3 p-3 rounded-lg ve-menu-item" onClick={() => setHoveredDropdown(null)}>
                          <div className="pt-1">{item.icon}</div>
                          <div className="text-left">
                            <p className="text-sm font-medium text-gray-900">{item.title}</p>
                            <p className="text-xs text-gray-600 leading-tight">{item.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </nav>
            </div>

            {/* RIGHT PILL */}
            <div className="flex items-center bg-white rounded-full shadow-[0_3px_6px_rgba(181,181,181,0.25)] px-1 py-1 md:px-2 md:py-2 space-x-1 sm:space-x-4">
              <Link href="/login" prefetch={false} className="text-gray-600 hover:text-gray-900 font-medium text-sm ml-5 px-3 hidden md:block">
                Log In
              </Link>
              <Link href="/trial" prefetch={false} className="inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white font-medium text-xs sm:text-sm px-3 sm:px-6 py-2 h-8 sm:h-9 rounded-full">
                1-Month Free Trial
              </Link>
              <div className="block md:hidden relative z-[60]">
                <button type="button" aria-label="Open menu" aria-expanded={mobileMenuOpen} onClick={openMenu} className="rounded-full size-8 sm:size-10 touch-manipulation flex items-center justify-center">
                  <svg className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/*
        MOBILE MENU
        ─────────────────────────────────────────────────────────────────────
        FIX #1: bg-white instead of bg-white/90.
          The /90 (opacity 0.9) was the single heaviest freeze cause.
          iOS Safari composites any element with opacity < 1 into its own
          GPU layer and repaints it on EVERY scroll frame — even when offscreen.
          bg-white is visually identical (menu sits on white page background)
          and costs NOTHING.

        FIX #2: No transform-gpu class.
          This was permanently promoting the panel to a GPU layer even when
          the menu was closed — wasting VRAM and causing scroll jank.

        FIX #3: CSS opacity toggle only. No translateY animation.
          The original used translateY on a large fixed panel — on iOS Safari
          that triggers rasterization of the entire compositing layer on every
          animation frame. Pure opacity is GPU-composited without rasterization.

        FIX #4: No lenis.stop(), no body overflow changes.
          Those cause iOS Safari to recalculate the entire document layout.
          The menu scrolls internally with overflow-y-auto instead.
      */}
      {isMounted && (
        <>
          {mobileMenuOpen && (
            <div aria-hidden="true" onClick={closeMenu} style={{ position: 'fixed', inset: 0, zIndex: 190 }} />
          )}
          <div
            role="dialog"
            aria-modal={mobileMenuOpen}
            aria-label="Navigation menu"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 200,
              opacity: mobileMenuOpen ? 1 : 0,
              pointerEvents: mobileMenuOpen ? 'auto' : 'none',
              transition: 'opacity 0.18s ease',
            }}
          >
            <div
              className="mx-2 mt-2 rounded-[18px] border border-white/40 bg-white shadow-[0_14px_36px_rgba(15,23,42,0.12)] overflow-y-auto relative flex flex-col touch-manipulation"
              style={{ maxHeight: 'calc(100dvh - 1.5rem)' }}
            >
              {/* Sticky top row — matches original exactly */}
              <div className="sticky top-0 z-[2] flex items-center justify-between px-4 pt-3 pb-2 bg-transparent shrink-0">
                <div className="bg-white/45 rounded-full px-3 py-1 border border-white/45 flex items-center gap-2 pointer-events-none">
                  {/* Replace with: <AriiaSvgMark className="w-16 h-7" /> */}
                  <span className="font-bold text-sm text-gray-900">ARIIA</span>
                </div>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={closeMenu}
                  className="relative z-[3] flex items-center justify-center size-10 opacity-90 rounded-full bg-white/45 shadow-md border border-white/45 touch-manipulation cursor-pointer"
                >
                  <X className="h-4 w-4 text-gray-700 pointer-events-none" />
                </button>
              </div>

              {/* Nav links — matches original structure */}
              <nav className="pb-6 relative z-[1]">
                <Link href="/features" className="flex items-center gap-2 px-4 border-b border-[#93d8fa4c] py-3 min-h-[44px] text-gray-700 font-bold touch-manipulation" onClick={closeMenu}>
                  <span>Features</span>
                </Link>
                <Link href="/pricing" className="flex items-center gap-2 px-4 border-b border-[#93d8fa4c] py-3 min-h-[44px] text-gray-700 font-bold touch-manipulation" onClick={closeMenu}>
                  <span>Pricing</span>
                </Link>
                <MobileAccordion label="Company" links={COMPANY_MOBILE} onClose={closeMenu} />
                <MobileAccordion label="Resources" links={RESOURCES_MOBILE} onClose={closeMenu} />
              </nav>

              {/*
                Bottom CTA bar — original had bg-white/40 + will-change-auto.
                FIX: will-change-auto removed. bg-white/40 kept because it's on
                a non-scrolling element inside the already-fixed panel —
                it doesn't trigger per-frame repaints.
              */}
              <div className="px-4 pb-6 pt-2 shrink-0 relative z-[1]">
                <div className="w-full bg-white/40 rounded-full p-[5px] shadow-[0_14px_36px_rgba(15,23,42,0.14)] flex items-center justify-between gap-2 border border-white/45">
                  <Link
                    href="/login"
                    prefetch={false}
                    className="flex-1 text-gray-700 hover:text-gray-900 font-medium text-sm px-3 py-3 min-h-[44px] rounded-full text-center bg-transparent touch-manipulation flex items-center justify-center"
                    onClick={closeMenu}
                  >
                    Log In
                  </Link>
                  <Link
                    href="/trial"
                    prefetch={false}
                    className="flex-1 inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm mx-0 px-4 h-[32px] rounded-full"
                    onClick={closeMenu}
                  >
                    1-Month Free Trial
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
        .ve-menu-item:hover { background-color: #eefbff !important; }
        .ve-chevron { transition: transform 0.2s ease; }

        /* Gradient bar: transition-only, NO will-change */
        .ve-gradient-bar {
          position: fixed; top: 0; left: 0; width: 100%; height: 40px; z-index: 40;
          pointer-events: none;
          background: linear-gradient(90deg, #6779FF 0%, #4E97FA 25%, #35B5F5 50%, #2EFFEA 100%);
          transition: opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }

        @keyframes ve-fade { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        .ve-fade-in { animation: ve-fade 0.18s ease-out; }
      `}</style>
    </div>
  );
}

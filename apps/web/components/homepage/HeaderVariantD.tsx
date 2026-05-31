'use client';

/**
 * HEADER VARIANT D
 * ─────────────────────────────────────────────────────────────────────────────
 * Strategy: MEMOIZED — FEWEST RE-RENDERS, MOST STABLE CALLBACKS
 *
 * The original re-rendered many child components unnecessarily because:
 *   - HeaderContent received new object refs on every parent render
 *   - Inline arrow functions in onClick created new refs every render
 *   - Dropdown panels were rebuilt from scratch on every hover state change
 *   - Collapsible open/close state lived inside the same component tree
 *     that managed mobileMenuOpen, causing full subtree re-renders
 *
 * Variant D strategy:
 *   - Dropdown panels extracted to memoized components — won't re-render
 *     unless their specific dropdown is hovered
 *   - All callbacks stable via useCallback
 *   - Left pill and right pill are memoized — only re-render when their
 *     own props change, not when mobile menu state changes
 *   - Mobile menu fully separated — its state changes don't touch desktop
 *   - Same zero-compositing approach as Variant A
 *
 * UI: IDENTICAL to original — two floating pills, exact same mobile menu.
 */

import Link from 'next/link';
import { memo, useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown, Users, Sparkles, Briefcase, Building2, Mail, BookOpen, BoxIcon, ShieldCheck, Lock, ScrollText, CircleHelp, UserRound, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

// ─── Data (module-level, never re-created) ────────────────────────────────────

const COMPANY_MENU = [
  { href: '/#about-us', title: 'About Us', description: 'Learn about our mission to transform businesses with AI agents.' },
  { href: '/story-behind-ariia/', title: 'The Story Behind ARIIA', description: "Discover the story behind ARIIA's name & its vision for the future." },
  { href: '/careers/', title: 'Careers', description: 'Help us build the next gen of AI. Explore job openings and join our journey.' },
  { href: '/customers/', title: 'Customers', description: 'See how ARIIA is transforming customer experiences for businesses.' },
  { href: '/contact-us/', title: 'Contact Us', description: "Have questions? Reach out, and we'll respond within 24 hours." },
] as const;

const RESOURCES_MENU = [
  { href: '/blog/', title: 'Blog', description: 'Stay informed with industry trends, insights, and the latest ARIIA news.' },
  { href: '/#use-cases', title: 'Use Cases', description: 'Check out demos and how ARIIA can be applied across industries.' },
  { href: '/industries/', title: 'Industries', description: 'See the sectors where ARIIA can enhance operations and customer experiences.' },
  { href: '/#faq', title: 'Questions & Answers', description: 'Find what you need in our Q&A section.' },
  { href: '/#security', title: 'Security & Data Protection', description: 'Understand how ARIIA safeguards your data.' },
  { href: '/terms-of-service/', title: 'Terms of Service', description: 'Review the terms for using our services.' },
  { href: '/privacy-policy/', title: 'Privacy Policy', description: 'Learn how your privacy and personal data is protected.' },
] as const;

// Icons at module level — never re-created
const COMPANY_ICONS: Record<string, React.ReactNode> = {
  'About Us': <UserRound className="h-5 w-5 text-gray-500" />,
  'The Story Behind ARIIA': <Sparkles className="h-5 w-5 text-gray-500" />,
  'Careers': <Briefcase className="h-5 w-5 text-gray-500" />,
  'Customers': <Users className="h-5 w-5 text-gray-500" />,
  'Contact Us': <Mail className="h-5 w-5 text-gray-500" />,
};

const RESOURCES_ICONS: Record<string, React.ReactNode> = {
  'Blog': <BookOpen className="h-5 w-5 text-gray-500" />,
  'Use Cases': <BoxIcon className="h-5 w-5 text-gray-500" />,
  'Industries': <Building2 className="h-5 w-5 text-gray-500" />,
  'Questions & Answers': <CircleHelp className="h-5 w-5 text-gray-500" />,
  'Security & Data Protection': <Lock className="h-5 w-5 text-gray-500" />,
  'Terms of Service': <ScrollText className="h-5 w-5 text-gray-500" />,
  'Privacy Policy': <ShieldCheck className="h-5 w-5 text-gray-500" />,
};

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

// ─── Memoized Dropdown Panel ──────────────────────────────────────────────────

const DropdownPanel = memo(function DropdownPanel({
  items,
  icons,
  onClose,
}: {
  items: readonly { href: string; title: string; description: string }[];
  icons: Record<string, React.ReactNode>;
  onClose: () => void;
}) {
  return (
    <div className="absolute top-full left-0 mt-5 w-96 p-2 rounded-xl shadow-lg border border-gray-100 bg-white space-y-1 z-50 vd-fade-in">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="flex items-start gap-3 p-3 rounded-lg vd-menu-item" onClick={onClose}>
          <div className="pt-1">{icons[item.title]}</div>
          <div className="text-left">
            <p className="text-sm font-medium text-gray-900">{item.title}</p>
            <p className="text-xs text-gray-600 leading-tight">{item.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
});

// ─── Memoized Left Pill ───────────────────────────────────────────────────────

const LeftPill = memo(function LeftPill({
  hoveredDropdown,
  onEnter,
  onLeave,
  onClose,
}: {
  hoveredDropdown: string | null;
  onEnter: (name: string) => void;
  onLeave: () => void;
  onClose: () => void;
}) {
  return (
    <div className="flex items-center bg-white rounded-full shadow-[0_3px_6px_rgba(181,181,181,0.25)] px-3 py-0 md:px-4 md:py-2">
      <Link href="/" className="flex items-center justify-center mr-0 shrink-0 md:mr-4">
        {/* Replace with: <AriiaSvgMark priority className="w-20 h-10 md:h-9 md:w-28" /> */}
        <span className="font-bold text-lg text-gray-900 w-20 h-10 md:h-9 md:w-28 flex items-center">ARIIA</span>
      </Link>
      <nav className="hidden md:flex items-center space-x-6">
        <Link href="/features" className="text-gray-700 hover:text-gray-900 font-medium text-sm hover:bg-[#EEFBFF] rounded-full px-4 py-2">Features</Link>
        <Link href="/pricing" className="text-gray-700 hover:text-gray-900 font-medium text-sm hover:bg-[#EEFBFF] rounded-full px-4 py-2 mr-3">Pricing</Link>

        <div className="relative" onMouseEnter={() => onEnter('company')} onMouseLeave={onLeave}>
          <button type="button" className="flex items-center text-gray-700 hover:text-gray-900 font-medium text-sm outline-none rounded-full py-2 px-3 -mx-3 hover:bg-[#EEFBFF]">
            Company
            <ChevronDown className="ml-1 h-4 w-4 vd-chevron" style={{ transform: hoveredDropdown === 'company' ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </button>
          {hoveredDropdown === 'company' && (
            <DropdownPanel items={COMPANY_MENU} icons={COMPANY_ICONS} onClose={onClose} />
          )}
        </div>

        <div className="relative" onMouseEnter={() => onEnter('resources')} onMouseLeave={onLeave}>
          <button type="button" className="flex items-center text-gray-700 hover:text-gray-900 font-medium text-sm outline-none rounded-full py-2 px-3 -mx-2 hover:bg-[#EEFBFF]">
            Resources
            <ChevronDown className="ml-1 h-4 w-4 vd-chevron" style={{ transform: hoveredDropdown === 'resources' ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </button>
          {hoveredDropdown === 'resources' && (
            <DropdownPanel items={RESOURCES_MENU} icons={RESOURCES_ICONS} onClose={onClose} />
          )}
        </div>
      </nav>
    </div>
  );
});

// ─── Memoized Right Pill ──────────────────────────────────────────────────────

const RightPill = memo(function RightPill({
  mobileMenuOpen,
  onOpenMenu,
}: {
  mobileMenuOpen: boolean;
  onOpenMenu: () => void;
}) {
  return (
    <div className="flex items-center bg-white rounded-full shadow-[0_3px_6px_rgba(181,181,181,0.25)] px-1 py-1 md:px-2 md:py-2 space-x-1 sm:space-x-4">
      <Link href="/login" prefetch={false} className="text-gray-600 hover:text-gray-900 font-medium text-sm ml-5 px-3 hidden md:block">Log In</Link>
      <Link href="/trial" prefetch={false} className="inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white font-medium text-xs sm:text-sm px-3 sm:px-6 py-2 h-8 sm:h-9 rounded-full">
        1-Month Free Trial
      </Link>
      <div className="block md:hidden relative z-[60]">
        <button type="button" aria-label="Open menu" aria-expanded={mobileMenuOpen} onClick={onOpenMenu} className="rounded-full size-8 sm:size-10 touch-manipulation flex items-center justify-center">
          <svg className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  );
});

// ─── Mobile Accordion ─────────────────────────────────────────────────────────

const MobileAccordion = memo(function MobileAccordion({
  label,
  links,
  onClose,
}: {
  label: string;
  links: { href: string; label: string }[];
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((p) => !p), []);

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        className={'flex items-center px-4 gap-2 py-3 min-h-[44px] text-gray-700 font-bold w-full touch-manipulation' + (open ? '' : ' border-b border-[#93d8fa4c]')}
      >
        <span>{label}</span>
        <ChevronDown className="size-4 ml-auto vd-chevron" style={{ color: open ? '#35B5F5' : undefined, transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </button>
      <div style={{ maxHeight: open ? `${links.length * 56}px` : '0px', overflow: 'hidden', transition: 'max-height 0.22s ease' }}>
        <div className="flex flex-col w-full px-4 gap-1 pb-4 border-b border-[#93d8fa4c]">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="flex ml-2 items-start gap-2 py-2 px-1 min-h-[44px] text-gray-800 font-normal touch-manipulation" onClick={onClose}>
              <span className="text-base leading-6">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
});

// ─── Memoized Mobile Menu ─────────────────────────────────────────────────────

const MobileMenu = memo(function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {open && <div aria-hidden="true" onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 190 }} />}
      <div
        role="dialog"
        aria-modal={open}
        aria-label="Navigation menu"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.15s ease',
        }}
      >
        <div
          className="mx-2 mt-2 rounded-[18px] border border-white/40 bg-white shadow-[0_14px_36px_rgba(15,23,42,0.12)] overflow-y-auto relative flex flex-col touch-manipulation"
          style={{ maxHeight: 'calc(100dvh - 1.5rem)' }}
        >
          <div className="sticky top-0 z-[2] flex items-center justify-between px-4 pt-3 pb-2 bg-white shrink-0">
            <div className="bg-gray-50 rounded-full px-3 py-1 border border-gray-100 flex items-center gap-2 pointer-events-none">
              {/* Replace with: <AriiaSvgMark className="w-16 h-7" /> */}
              <span className="font-bold text-sm text-gray-900">ARIIA</span>
            </div>
            <button type="button" aria-label="Close menu" onClick={onClose} className="flex items-center justify-center size-10 rounded-full bg-gray-50 shadow-sm border border-gray-100 touch-manipulation cursor-pointer">
              <X className="h-4 w-4 text-gray-700 pointer-events-none" />
            </button>
          </div>

          <nav className="pb-6 relative z-[1]">
            <Link href="/features" className="flex items-center gap-2 px-4 border-b border-[#93d8fa4c] py-3 min-h-[44px] text-gray-700 font-bold touch-manipulation" onClick={onClose}><span>Features</span></Link>
            <Link href="/pricing" className="flex items-center gap-2 px-4 border-b border-[#93d8fa4c] py-3 min-h-[44px] text-gray-700 font-bold touch-manipulation" onClick={onClose}><span>Pricing</span></Link>
            <MobileAccordion label="Company" links={COMPANY_MOBILE} onClose={onClose} />
            <MobileAccordion label="Resources" links={RESOURCES_MOBILE} onClose={onClose} />
          </nav>

          <div className="px-4 pb-6 pt-2 shrink-0 relative z-[1]">
            <div className="w-full bg-white rounded-full p-[5px] shadow-[0_14px_36px_rgba(15,23,42,0.14)] flex items-center justify-between gap-2 border border-gray-100">
              <Link href="/login" prefetch={false} className="flex-1 text-gray-700 font-medium text-sm px-3 py-3 min-h-[44px] rounded-full text-center touch-manipulation flex items-center justify-center" onClick={onClose}>Log In</Link>
              <Link href="/trial" prefetch={false} className="flex-1 inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm px-4 h-[32px] rounded-full" onClick={onClose}>1-Month Free Trial</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

// ─── Main Header ──────────────────────────────────────────────────────────────

export function HeaderVariantD({ isHomePage = true }: { isHomePage?: boolean }) {
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

  // All callbacks stable — won't cause memo invalidation on children
  const enterDropdown = useCallback((name: string) => {
    if (hoverTimer.current) { clearTimeout(hoverTimer.current); hoverTimer.current = null; }
    setHoveredDropdown(name);
  }, []);

  const leaveDropdown = useCallback(() => {
    hoverTimer.current = setTimeout(() => setHoveredDropdown(null), 300);
  }, []);

  const closeDropdown = useCallback(() => setHoveredDropdown(null), []);
  const openMenu = useCallback(() => setMobileMenuOpen(true), []);
  const closeMenu = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <div className="w-full">
      <div
        id="gradient-bar"
        aria-hidden="true"
        className="h-10 fixed top-0 left-0 w-full z-40 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, #6779FF 0%, #4E97FA 25%, #35B5F5 50%, #2EFFEA 100%)',
          opacity: isScrolled ? 0 : 1,
          transition: 'opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
          // NO will-change
        }}
      />

      <header
        className={`fixed left-0 w-full z-50 !bg-transparent${isHomePage && !isScrolled ? ' header-vertical-lines' : ''}`}
        style={{ maxWidth: '100vw', top: 0 }}
      >
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          {/* <div className="absolute w-[300px] h-[150px] md:w-[500px] md:h-[300px] -top-[3rem] md:-top-[12rem] right-[5%] bg-gradient-to-r from-[#6779FF] to-[#4E97FA] opacity-30 blur-[10rem]" /> */}
        </div>

        <div className="max-w-[73.1rem] mx-auto px-4 md:px-6 lg:px-4 py-6">
          <div className="flex items-center justify-between">
            {/*
              LeftPill only re-renders when hoveredDropdown changes.
              RightPill only re-renders when mobileMenuOpen changes.
              They never re-render each other.
            */}
            <LeftPill
              hoveredDropdown={hoveredDropdown}
              onEnter={enterDropdown}
              onLeave={leaveDropdown}
              onClose={closeDropdown}
            />
            <RightPill
              mobileMenuOpen={mobileMenuOpen}
              onOpenMenu={openMenu}
            />
          </div>
        </div>
      </header>

      {/*
        MobileMenu is a separate memoized tree.
        Desktop interaction (hover dropdowns) causes ZERO re-renders here.
      */}
      {isMounted && <MobileMenu open={mobileMenuOpen} onClose={closeMenu} />}

      <style>{`
        .vd-menu-item:hover { background-color: #eefbff !important; }
        .vd-chevron { transition: transform 0.2s ease; }
        @keyframes vd-fade { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        .vd-fade-in { animation: vd-fade 0.16s ease-out; }
      `}</style>
    </div>
  );
}

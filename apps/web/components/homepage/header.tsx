'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
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
  DollarSign,
  ShieldQuestionIcon,
  CircleHelp,
  UserRound,
  X,
} from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { usePathname, useRouter } from 'next/navigation';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const COMPANY_MENU = [
  {
    href: '/#about-us',
    title: 'About Us',
    description: 'Learn about our mission to transform businesses with AI agents.',
    icon: <UserRound className="h-5 w-5 text-gray-500" />,
  },
  {
    href: '/story-behind-ariia/',
    title: 'The Story Behind ARIIA',
    description: "Discover the story behind ARIIA's name & its vision for the future.",
    icon: <Sparkles className="h-5 w-5 text-gray-500" />,
  },
  {
    href: '/careers/',
    title: 'Careers',
    description: 'Help us build the next gen of AI. Explore job openings and join our journey.',
    icon: <Briefcase className="h-5 w-5 text-gray-500" />,
  },
  {
    href: '/customers/',
    title: 'Customers',
    description: 'See how ARIIA is transforming customer experiences for businesses.',
    icon: <Users className="h-5 w-5 text-gray-500" />,
  },
  {
    href: '/contact-us/',
    title: 'Contact Us',
    description: "Have questions? Reach out, and we'll respond within 24 hours.",
    icon: <Mail className="h-5 w-5 text-gray-500" />,
  },
];

const RESOURCES_MENU = [
  {
    href: '/blog/',
    title: 'Blog',
    description: 'Stay informed with industry trends, insights, and the latest ARIIA news.',
    icon: <BookOpen className="h-5 w-5 text-gray-500" />,
  },
  {
    href: '/#use-cases',
    title: 'Use Cases',
    description: 'Check out demos and how ARIIA can be applied across industries.',
    icon: <BoxIcon className="h-5 w-5 text-gray-500" />,
  },
  {
    href: '/industries/',
    title: 'Industries',
    description: 'See the sectors where ARIIA can enhance operations and customer experiences.',
    icon: <Building2 className="h-5 w-5 text-gray-500" />,
  },
  {
    href: '/#faq',
    title: 'Questions & Answers',
    description: 'Find what you need in our Q&A section.',
    icon: <CircleHelp className="h-5 w-5 text-gray-500" />,
  },
  {
    href: '/#security',
    title: 'Security & Data Protection',
    description: 'Understand how ARIIA safeguards your data.',
    icon: <Lock className="h-5 w-5 text-gray-500" />,
  },
  {
    href: '/terms-of-service/',
    title: 'Terms of Service',
    description: 'Review the terms for using our services.',
    icon: <ScrollText className="h-5 w-5 text-gray-500" />,
  },
  {
    href: '/privacy-policy/',
    title: 'Privacy Policy',
    description: 'Learn how your privacy and personal data is protected.',
    icon: <ShieldCheck className="h-5 w-5 text-gray-500" />,
  },
];

const MOBILE_SINGLE_LINKS = [
  { href: '/features', label: 'Features', icon: <Sparkles className="w-5 h-5 text-gray-500" /> },
  { href: '/pricing', label: 'Pricing', icon: <DollarSign className="w-5 h-5 text-gray-500" /> },
];

const MOBILE_COMPANY_LINKS = [
  { href: '/#about-us', label: 'About Us' },
  { href: '/story-behind-ariia/', label: 'The Story Behind ARIIA' },
  { href: '/careers/', label: 'Careers' },
  { href: '/customers/', label: 'Customers' },
  { href: '/contact-us/', label: 'Contact Us' },
];

const MOBILE_RESOURCES_LINKS = [
  { href: '/blog/', label: 'Blog' },
  { href: '/#use-cases', label: 'Use Cases' },
  { href: '/industries/', label: 'Industries' },
  { href: '/#faq', label: 'Questions & Answers' },
  { href: '/#security', label: 'Security & Data Protection' },
  { href: '/terms-of-service/', label: 'Terms of Service' },
  { href: '/privacy-policy/', label: 'Privacy Policy' },
];

// ---------------------------------------------------------------------------
// Simple cn helper (avoids importing clsx/tailwind-merge)
// ---------------------------------------------------------------------------
function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

// ---------------------------------------------------------------------------
// Collapsible section for mobile menu
// ---------------------------------------------------------------------------
function MobileSection({
  label,
  links,
  isOpen,
  onToggle,
  onNavigate,
}: {
  label: string;
  links: { href: string; label: string }[];
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: (href: string) => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          'flex items-center px-4 gap-2 py-3 min-h-[44px] text-gray-700 font-bold hover:bg-gray-100 transition-colors w-full touch-manipulation',
          !isOpen && 'border-b border-[#93d8fa4c]',
        )}
      >
        <span>{label}</span>
        <ChevronDown
          className={cn('size-4 ml-auto transition-transform duration-200', isOpen && 'rotate-180')}
          style={{ color: isOpen ? '#35B5F5' : undefined }}
        />
      </button>

      {/* Animate open/close with max-height trick — zero JS layout thrash */}
      <div
        style={{
          maxHeight: isOpen ? `${links.length * 60}px` : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.22s ease',
        }}
      >
        <div className="flex flex-col w-full px-4 gap-1 pb-4 border-b border-[#93d8fa4c]">
          {links.map((link) => (
            <button
              key={link.href}
              type="button"
              className="flex ml-2 items-start gap-2 py-2 px-1 min-h-[44px] text-gray-800 font-normal transition-colors touch-manipulation text-left"
              onClick={() => onNavigate(link.href)}
            >
              <span className="text-base leading-6">{link.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Header
// ---------------------------------------------------------------------------
export function Header({ isHomePage = true }: { isHomePage?: boolean }) {
  const NO_GRADIENT_ROUTES = ['/', '/#faq', '/#about-us/', '/pricing'];
  const pathname = usePathname();
  const router = useRouter();

  const [activePath, setActivePath] = useState<string | null>(null);
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldHideGradient = NO_GRADIENT_ROUTES.includes(pathname);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const handleDropdownEnter = (name: string) => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setHoveredDropdown(name);
  };

  const handleDropdownLeave = () => {
    hoverTimerRef.current = setTimeout(() => setHoveredDropdown(null), 300);
  };

  const handleMobileNav = (href: string) => {
    setMobileMenuOpen(false);
    router.push(href);
  };

  const menuItemClasses = (href: string) =>
    `flex items-start gap-3 p-3 rounded-lg transition-colors ${activePath === href ? 'bg-[#EEFBFF]' : ''} menu-item-hover`;

  const bgClass = isScrolled ? 'bg-white/70' : 'bg-white';

  return (
    <div className="w-full">
      {/* Gradient bar at very top */}
      <div
        id="gradient-bar"
        className="h-10 fixed top-0 left-0 w-full z-40 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, #6779FF 0%, #4E97FA 25%, #35B5F5 50%, #2EFFEA 100%)',
          opacity: !isScrolled ? 1 : 0,
          willChange: 'opacity',
        }}
      />

      <header
        className={`transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isHomePage && !isScrolled ? 'header-vertical-lines' : ''
        } fixed left-0 w-full z-50 !bg-transparent`}
        style={{ maxWidth: '100vw', top: 0, willChange: 'transform, padding-top' }}
      >
        {!shouldHideGradient && (
          <div className="absolute inset-0 -z-10">
            <div className="absolute w-[300px] h-[150px] md:w-[500px] md:h-[300px] -top-[3rem] md:-top-[12rem] right-[5%] bg-gradient-to-r from-[#6779FF] to-[#4E97FA] opacity-30 blur-[10rem]" />
          </div>
        )}

        <div className="max-w-[73.1rem] mx-auto px-4 md:px-6 lg:px-4 py-6">
          {/* ----------------------------------------------------------------
              Header row
          ---------------------------------------------------------------- */}
          <div className="flex items-center justify-between">

            {/* LEFT PILL — logo + desktop nav */}
            <div
              className={`flex items-center ${bgClass} rounded-full shadow-[0_3px_6px_rgba(181,181,181,0.25)] px-3 py-0 md:px-4 md:py-2`}
            >
              <Link href="/" className="flex items-center justify-center mr-0 shrink-0 md:mr-4">
                {/* Replace with <AriiaSvgMark /> if available */}
                <span className="font-bold text-lg tracking-tight select-none px-1">ARIIA</span>
              </Link>

              <nav className="hidden md:flex items-center space-x-6">
                <Link
                  href="/features"
                  className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors hover:bg-[#EEFBFF] rounded-full px-4 py-2"
                >
                  Features
                </Link>
                <Link
                  href="/pricing"
                  className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors hover:bg-[#EEFBFF] rounded-full px-4 py-2 mr-3"
                >
                  Pricing
                </Link>

                {/* Company dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter('company')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button className="flex items-center text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors outline-none rounded-full py-2 px-3 -mx-3 hover:bg-[#EEFBFF]">
                    Company
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transition-transform duration-200 ${hoveredDropdown === 'company' ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {hoveredDropdown === 'company' && (
                    <div className="absolute top-full left-0 mt-5 w-96 p-2 rounded-xl shadow-lg border border-gray-100 bg-white space-y-1 z-50 animate-fade-in">
                      {COMPANY_MENU.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={menuItemClasses(item.href)}
                          onClick={() => { setActivePath(item.href); setHoveredDropdown(null); }}
                        >
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

                {/* Resources dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter('resources')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button className="flex items-center text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors outline-none rounded-full py-2 px-3 -mx-2 hover:bg-[#EEFBFF]">
                    Resources
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transition-transform duration-200 ${hoveredDropdown === 'resources' ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {hoveredDropdown === 'resources' && (
                    <div className="absolute top-full left-0 mt-5 w-96 p-2 rounded-xl shadow-lg border border-gray-100 bg-white space-y-1 z-50 animate-fade-in">
                      {RESOURCES_MENU.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={menuItemClasses(item.href)}
                          onClick={() => { setActivePath(item.href); setHoveredDropdown(null); }}
                        >
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

            {/* RIGHT PILL — login + CTA + hamburger */}
            <div
              className={`flex items-center ${bgClass} rounded-full shadow-[0_3px_6px_rgba(181,181,181,0.25)] px-1 py-1 md:px-2 md:py-2 space-x-1 sm:space-x-4`}
            >
              <Link
                href="/login"
                prefetch={false}
                className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors ml-5 px-3 hidden md:block"
              >
                Log In
              </Link>

              <Link
                href="/trial"
                prefetch={false}
                className="bg-gray-900/95 hover:bg-gray-800/90 text-white font-medium text-xs sm:text-sm mx-0 px-3 sm:px-6 py-2 h-8 sm:h-9 rounded-full inline-flex items-center"
              >
                <span className="hidden sm:inline">1-Month Free Trial</span>
                <span className="sm:hidden">1-Month Free Trial</span>
              </Link>

              {/* Hamburger — mobile only */}
              <div className="block md:hidden relative z-[60]">
                <button
                  type="button"
                  className="rounded-full size-8 sm:size-10 touch-manipulation flex items-center justify-center hover:bg-gray-100"
                  aria-label="Open menu"
                  aria-expanded={mobileMenuOpen}
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <svg className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------
            Mobile menu overlay — rendered client-side only after mount
        ---------------------------------------------------------------- */}
        {isMounted && mobileMenuOpen && (
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 200 }}
            className="pointer-events-auto"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/20"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Panel */}
            <div
              className="mx-2 mt-2 rounded-[18px] border border-white/40 bg-white/90 shadow-[0_14px_36px_rgba(15,23,42,0.12)] overflow-y-auto relative flex flex-col max-h-[calc(100dvh-1.5rem)] touch-manipulation"
              style={{ position: 'relative', zIndex: 1 }}
            >
              {/* Top bar */}
              <div className="sticky top-0 z-[2] flex items-center justify-between px-4 pt-3 pb-2 bg-transparent shrink-0">
                <div className="bg-white/45 rounded-full px-3 py-1 border border-white/45 flex items-center gap-2 pointer-events-none">
                  <span className="font-bold text-base tracking-tight">ARIIA</span>
                </div>
                <button
                  type="button"
                  aria-label="Close menu"
                  className="flex items-center justify-center size-10 opacity-90 rounded-full bg-white/45 shadow-md border border-white/45 touch-manipulation cursor-pointer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-4 w-4 text-gray-700 pointer-events-none" />
                </button>
              </div>

              {/* Nav items */}
              <nav className="pb-6">
                {MOBILE_SINGLE_LINKS.map((item) => (
                  <button
                    key={item.href}
                    type="button"
                    className="flex items-center gap-2 px-4 border-b border-[#93d8fa4c] py-3 min-h-[44px] text-gray-700 font-bold hover:bg-gray-100 transition-colors touch-manipulation w-full text-left"
                    onClick={() => handleMobileNav(item.href)}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}

                <MobileSection
                  label="Company"
                  links={MOBILE_COMPANY_LINKS}
                  isOpen={companyOpen}
                  onToggle={() => setCompanyOpen((v) => !v)}
                  onNavigate={handleMobileNav}
                />

                <MobileSection
                  label="Resources"
                  links={MOBILE_RESOURCES_LINKS}
                  isOpen={resourcesOpen}
                  onToggle={() => setResourcesOpen((v) => !v)}
                  onNavigate={handleMobileNav}
                />
              </nav>

              {/* Bottom CTA bar */}
              <div className="px-4 pb-6 pt-2 shrink-0">
                <div className="w-full bg-white/40 rounded-full p-[5px] shadow-[0_14px_36px_rgba(15,23,42,0.14)] flex items-center justify-between gap-2 border border-white/45">
                  <button
                    type="button"
                    className="flex-1 text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors px-3 py-3 min-h-[44px] rounded-full text-center bg-transparent touch-manipulation flex items-center justify-center"
                    onClick={() => handleMobileNav('/login')}
                  >
                    Log In
                  </button>
                  <button
                    type="button"
                    className="flex-1 bg-gray-900/95 hover:bg-gray-800/90 text-white font-medium text-sm px-4 h-[44px] rounded-full touch-manipulation"
                    onClick={() => handleMobileNav('/trial')}
                  >
                    1-Month Free Trial
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <style jsx global>{`
        .menu-item-hover:hover {
          background-color: #eefbff !important;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}

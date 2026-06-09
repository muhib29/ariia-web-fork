'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
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
  CircleHelp,
  UserRound,
} from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { usePathname } from 'next/navigation';
import { cn } from '@workspace/ui/lib/utils';
import { AriiaSvgMark } from '@/components/icons/AriiaSvgMark';
import { MobileHeader } from './mobileheader';
import { SmoothLink } from '@/components/SmoothLink';

// ─── Data ─────────────────────────────────────────────────────────────────────

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

// ─── Desktop nav — completely untouched ───────────────────────────────────────

function DesktopNav({
  hoveredDropdown,
  handleDropdownEnter,
  handleDropdownLeave,
  activePath,
  setActivePath,
  setHoveredDropdown,
  isSticky = false,
}: {
  hoveredDropdown: string | null;
  handleDropdownEnter: (name: string) => void;
  handleDropdownLeave: () => void;
  activePath: string | null;
  setActivePath: (path: string) => void;
  setHoveredDropdown: (name: string | null) => void;
  isSticky?: boolean;
}) {
  const isHomeSectionLink = (href: string) => href.startsWith('/#');

  const renderMenuLink = (
    item: {
      href: string;
      title: string;
      description: string;
      icon: ReactNode;
    },
  ) => {
    const content = (
      <>
        <div className="pt-1">{item.icon}</div>
        <div className="text-left">
          <p className="text-sm font-medium text-gray-900">{item.title}</p>
          <p className="text-xs text-gray-600 leading-tight">{item.description}</p>
        </div>
      </>
    );
    const handleSelect = () => {
      setActivePath(item.href);
      setHoveredDropdown(null);
    };

    return isHomeSectionLink(item.href) ? (
      <SmoothLink
        key={item.href}
        href={item.href}
        className={menuItemClasses(item.href)}
        onClick={handleSelect}
      >
        {content}
      </SmoothLink>
    ) : (
      <Link
        key={item.href}
        href={item.href}
        className={menuItemClasses(item.href)}
        onClick={handleSelect}
      >
        {content}
      </Link>
    );
  };

  const menuItemClasses = (href: string) =>
    `flex items-start gap-3 p-3 rounded-lg transition-colors ${activePath === href ? 'bg-[#EEFBFF]' : ''
    } menu-item-hover`;

  const bgClass = isSticky
    ? 'bg-white/60 backdrop-blur-md border border-white/45'
    : 'bg-white';

  return (
    <div className="flex items-center justify-between">
      {/* Left pill */}
      <div
        className={`flex items-center ${bgClass} rounded-full shadow-[0_3px_6px_rgba(181,181,181,0.25)] px-3 py-0 md:px-4 md:py-2`}
      >
        {/* <AriiaSvgMark priority className="w-24 h-11 md:w-32 md:h-12" /> */}
        {/* <AriiaSvgMark width={110} height={35} /> */}
        <Link href="/" className="flex items-center justify-center mr-0 shrink-0 md:mr-4">
          <AriiaSvgMark className="w-20 h-10 md:h-9 md:w-28" />
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/features"
            className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors hover:bg-[#EEFBFF] rounded-full px-4 py-2"
          >
            Features
          </Link>

          <Link
            href="/pricing"
            className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors hover:bg-[#EEFBFF] rounded-full px-4 py-2"
          >
            Pricing
          </Link>

          <div
            className="relative"
            onMouseEnter={() => handleDropdownEnter('company')}
            onMouseLeave={handleDropdownLeave}
          >
            <button className="flex items-center text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors outline-none rounded-full px-4 py-2 hover:bg-[#EEFBFF]">
              Company
              <ChevronDown
                className={`ml-1 h-4 w-4 transition-transform duration-200 ${hoveredDropdown === 'company' ? 'rotate-180' : ''
                  }`}
              />
            </button>

            {hoveredDropdown === 'company' && (
              <div className="absolute top-full left-0 mt-5 w-96 p-2 rounded-xl shadow-lg border border-gray-100 bg-white space-y-1 z-50 animate-fade-in">
                {COMPANY_MENU.map((item) => renderMenuLink(item))}
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => handleDropdownEnter('resources')}
            onMouseLeave={handleDropdownLeave}
          >
            <button className="flex items-center text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors outline-none rounded-full px-4 py-2 hover:bg-[#EEFBFF]">
              Resources
              <ChevronDown
                className={`ml-1 h-4 w-4 transition-transform duration-200 ${hoveredDropdown === 'resources' ? 'rotate-180' : ''
                  }`}
              />
            </button>

            {hoveredDropdown === 'resources' && (
              <div className="absolute top-full left-0 mt-5 w-96 p-2 rounded-xl shadow-lg border border-gray-100 bg-white space-y-1 z-50 animate-fade-in">
                {RESOURCES_MENU.map((item) => renderMenuLink(item))}
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Right pill */}
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
        <Button
          asChild
          className="bg-gray-900/95 hover:bg-gray-800/90 text-white font-medium text-xs sm:text-sm mx-0 px-3 sm:px-6 py-2 h-8 sm:h-9 rounded-full"
        >
          <Link href="/trial" prefetch={false}>
            1-Month Free Trial
          </Link>
        </Button>
      </div>
    </div>
  );
}

// ─── Header: parent ────────────────────────────────────────────────────────────

export function Header({ isHomePage }: { isHomePage?: boolean }) {
  const NO_GRADIENT_ROUTES = ['/', '/#faq', '/#about-us/', '/pricing'];
  const pathname = usePathname();
  const [activePath, setActivePath] = useState<string | null>(null);
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const shouldShowHomeLines = (isHomePage ?? pathname === '/') && !isScrolled;
  const shouldHideGradient = NO_GRADIENT_ROUTES.includes(pathname);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const handleDropdownEnter = (name: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredDropdown(name);
  };

  const handleDropdownLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => setHoveredDropdown(null), 300);
  };

  return (
    <div className="w-full">
      {/* Gradient bar */}
      <div
        id="gradient-bar"
        className="hidden md:block h-10 fixed top-0 left-0 w-full z-40 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, #6779FF 0%, #4E97FA 25%, #35B5F5 50%, #2EFFEA 100%)',
          opacity: !isScrolled ? 1 : 0,
          transition: 'opacity 0.5s cubic-bezier(0.23,1,0.32,1)',
          willChange: 'opacity',
        }}
      />

      {/* ── MOBILE ── */}
      <div className="block md:hidden">
        <MobileHeader isScrolled={isScrolled} />
      </div>

      {/* ── DESKTOP ── */}
      <header
        className={`hidden md:block fixed left-0 w-full z-50 !bg-transparent ${shouldShowHomeLines ? 'header-vertical-lines' : ''
          }`}
        style={{ maxWidth: '100vw', top: 0 }}
      >
        {!shouldHideGradient && (
          <div className="absolute inset-0 -z-10">
            <div className="absolute w-[500px] h-[300px] -top-[12rem] right-[5%] bg-gradient-to-r from-[#6779FF] to-[#4E97FA] opacity-30 blur-[10rem]" />
          </div>
        )}
        <div className="max-w-[73.1rem] mx-auto px-4 md:px-6 lg:px-4 py-6">
          <DesktopNav
            hoveredDropdown={hoveredDropdown}
            handleDropdownEnter={handleDropdownEnter}
            handleDropdownLeave={handleDropdownLeave}
            activePath={activePath}
            setActivePath={setActivePath}
            setHoveredDropdown={setHoveredDropdown}
            isSticky={isScrolled}
          />
        </div>
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

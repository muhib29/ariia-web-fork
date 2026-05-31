'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronDown, X } from 'lucide-react';
import { AriiaSvgMark } from '../icons/AriiaSvgMark';

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

export function Header({ isHomePage = true }: { isHomePage?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
    setCompanyOpen(false);
    setResourcesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const pillBg = isScrolled ? 'bg-white/70' : 'bg-white';

  return (
    <div className="w-full">
      {/* Gradient accent bar — fades out on scroll */}
      <div
        className="h-10 fixed top-0 left-0 w-full z-40 pointer-events-none transition-opacity duration-500"
        style={{
          background: 'linear-gradient(90deg, #6779FF 0%, #4E97FA 25%, #35B5F5 50%, #2EFFEA 100%)',
          opacity: isScrolled ? 0 : 1,
        }}
      />

      {/* Main header */}
      <header className="fixed left-0 w-full z-50 bg-transparent" style={{ top: 0 }}>
        <div className="max-w-[73.1rem] mx-auto px-4 md:px-6 lg:px-4 py-6">
          <div className="flex items-center justify-between">

            {/* Left pill: logo + desktop nav */}
            <div className={`flex items-center ${pillBg} rounded-full shadow-[0_3px_6px_rgba(181,181,181,0.25)] px-3 py-0 md:px-4 md:py-2`}>
              <Link href="/" className="flex items-center justify-center shrink-0 mr-0 md:mr-4">
                <AriiaSvgMark priority className="w-20 h-10 md:h-9 md:w-28" />
              </Link>

              <nav className="hidden md:flex items-center space-x-1">
                <Link href="/features" className="text-gray-700 hover:text-gray-900 font-medium text-sm hover:bg-[#EEFBFF] rounded-full px-4 py-2 transition-colors">
                  Features
                </Link>
                <Link href="/pricing" className="text-gray-700 hover:text-gray-900 font-medium text-sm hover:bg-[#EEFBFF] rounded-full px-4 py-2 transition-colors">
                  Pricing
                </Link>

                {/* Company dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setHoveredDropdown('company')}
                  onMouseLeave={() => setHoveredDropdown(null)}
                >
                  <button className="flex items-center text-gray-700 hover:text-gray-900 font-medium text-sm hover:bg-[#EEFBFF] rounded-full px-4 py-2 transition-colors outline-none">
                    Company
                    <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${hoveredDropdown === 'company' ? 'rotate-180' : ''}`} />
                  </button>
                  {hoveredDropdown === 'company' && (
                    <div className="absolute top-full left-0 mt-5 w-64 p-2 rounded-xl shadow-lg border border-gray-100 bg-white space-y-0.5 z-50">
                      {COMPANY_LINKS.map((item) => (
                        <Link key={item.href} href={item.href} className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-800 hover:bg-[#EEFBFF] transition-colors">
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Resources dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setHoveredDropdown('resources')}
                  onMouseLeave={() => setHoveredDropdown(null)}
                >
                  <button className="flex items-center text-gray-700 hover:text-gray-900 font-medium text-sm hover:bg-[#EEFBFF] rounded-full px-4 py-2 transition-colors outline-none">
                    Resources
                    <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${hoveredDropdown === 'resources' ? 'rotate-180' : ''}`} />
                  </button>
                  {hoveredDropdown === 'resources' && (
                    <div className="absolute top-full left-0 mt-5 w-64 p-2 rounded-xl shadow-lg border border-gray-100 bg-white space-y-0.5 z-50">
                      {RESOURCES_LINKS.map((item) => (
                        <Link key={item.href} href={item.href} className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-800 hover:bg-[#EEFBFF] transition-colors">
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </nav>
            </div>

            {/* Right pill: login + trial + hamburger */}
            <div className={`flex items-center ${pillBg} rounded-full shadow-[0_3px_6px_rgba(181,181,181,0.25)] px-1 py-1 md:px-2 md:py-2 gap-1 sm:gap-2`}>
              <Link href="/login" prefetch={false} className="hidden md:block text-gray-600 hover:text-gray-900 font-medium text-sm px-3 transition-colors">
                Log In
              </Link>
              <Link href="/trial" prefetch={false} className="bg-gray-900 hover:bg-gray-800 text-white font-medium text-xs sm:text-sm px-3 sm:px-5 h-8 sm:h-9 rounded-full transition-colors flex items-center whitespace-nowrap">
                1-Month Free Trial
              </Link>

              {/* Hamburger — mobile only */}
              <button
                type="button"
                className="flex md:hidden items-center justify-center size-8 sm:size-9 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Open menu"
                onClick={() => setMenuOpen(true)}
              >
                <svg className="h-5 w-5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[200]">
          <div className="mx-2 mt-2 rounded-[18px] border border-white/40 bg-white/90 shadow-[0_14px_36px_rgba(15,23,42,0.12)] overflow-y-auto flex flex-col max-h-[calc(100dvh-1rem)]">

            {/* Top row */}
            <div className="flex items-center justify-between px-4 pt-3 pb-2 shrink-0">
              <div className="bg-white/45 rounded-full px-3 py-1 border border-white/20 flex items-center">
                <AriiaSvgMark className="w-16 h-7" />
              </div>
              <button
                type="button"
                aria-label="Close menu"
                className="flex items-center justify-center size-10 rounded-full bg-white/45 border border-white/20 shadow-sm"
                onClick={() => setMenuOpen(false)}
              >
                <X className="h-4 w-4 text-gray-700" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="pb-4">
              <Link href="/features" className="flex items-center px-4 py-3 min-h-[44px] text-gray-700 font-bold border-b border-[#93d8fa4c] hover:bg-gray-50 transition-colors" onClick={() => setMenuOpen(false)}>
                Features
              </Link>
              <Link href="/pricing" className="flex items-center px-4 py-3 min-h-[44px] text-gray-700 font-bold border-b border-[#93d8fa4c] hover:bg-gray-50 transition-colors" onClick={() => setMenuOpen(false)}>
                Pricing
              </Link>

              {/* Company accordion */}
              <div className={companyOpen ? '' : 'border-b border-[#93d8fa4c]'}>
                <button
                  type="button"
                  className="flex items-center w-full px-4 py-3 min-h-[44px] text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                  onClick={() => setCompanyOpen(p => !p)}
                >
                  <span>Company</span>
                  <ChevronDown className={`ml-auto h-4 w-4 transition-transform duration-200 ${companyOpen ? 'rotate-180' : ''}`} style={{ color: companyOpen ? '#35B5F5' : undefined }} />
                </button>
                {companyOpen && (
                  <div className="flex flex-col px-4 pb-3 border-b border-[#93d8fa4c]">
                    {COMPANY_LINKS.map((item) => (
                      <Link key={item.href} href={item.href} className="ml-2 py-2 px-1 min-h-[44px] flex items-center text-gray-800 text-base hover:bg-gray-50 transition-colors" onClick={() => setMenuOpen(false)}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Resources accordion */}
              <div className={resourcesOpen ? '' : 'border-b border-[#93d8fa4c]'}>
                <button
                  type="button"
                  className="flex items-center w-full px-4 py-3 min-h-[44px] text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                  onClick={() => setResourcesOpen(p => !p)}
                >
                  <span>Resources</span>
                  <ChevronDown className={`ml-auto h-4 w-4 transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} style={{ color: resourcesOpen ? '#35B5F5' : undefined }} />
                </button>
                {resourcesOpen && (
                  <div className="flex flex-col px-4 pb-3 border-b border-[#93d8fa4c]">
                    {RESOURCES_LINKS.map((item) => (
                      <Link key={item.href} href={item.href} className="ml-2 py-2 px-1 min-h-[44px] flex items-center text-gray-800 text-base hover:bg-gray-50 transition-colors" onClick={() => setMenuOpen(false)}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Bottom CTA bar */}
            <div className="px-4 pb-6 pt-2 shrink-0">
              <div className="w-full bg-white/40 rounded-full p-[5px] shadow-[0_14px_36px_rgba(15,23,42,0.14)] flex items-center gap-2 border border-white/45">
                <Link href="/login" prefetch={false} className="flex-1 text-gray-700 hover:text-gray-900 font-medium text-sm px-3 min-h-[44px] rounded-full text-center flex items-center justify-center transition-colors" onClick={() => setMenuOpen(false)}>
                  Log In
                </Link>
                <Link href="/trial" prefetch={false} className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm px-4 min-h-[44px] rounded-full flex items-center justify-center transition-colors" onClick={() => setMenuOpen(false)}>
                  1-Month Free Trial
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getLenis } from '@/lib/lenis';
import { AriiaSvgMark } from '../icons/AriiaSvgMark';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@workspace/ui/components/collapsible';

const COMPANY_MENU = [
  {
    href: '/#about-us',
    title: 'About Us',
    description: 'Learn about our mission to transform businesses with AI agents.',
    icon: <span className="size-5 text-gray-500">👤</span>,
  },
  {
    href: '/story-behind-ariia/',
    title: 'The Story Behind ARIIA',
    description: "Discover the story behind ARIIA's name & its vision for the future.",
    icon: <span className="size-5 text-gray-500">✨</span>,
  },
  {
    href: '/careers/',
    title: 'Careers',
    description: 'Help us build the next gen of AI. Explore job openings and join our journey.',
    icon: <span className="size-5 text-gray-500">💼</span>,
  },
  {
    href: '/customers/',
    title: 'Customers',
    description: 'See how ARIIA is transforming customer experiences for businesses.',
    icon: <span className="size-5 text-gray-500">👥</span>,
  },
  {
    href: '/contact-us/',
    title: 'Contact Us',
    description: "Have questions? Reach out, and we'll respond within 24 hours.",
    icon: <span className="size-5 text-gray-500">✉️</span>,
  },
];

const RESOURCES_MENU = [
  {
    href: '/blog/',
    title: 'Blog',
    description: 'Stay informed with industry trends, insights, and the latest ARIIA news.',
    icon: <span className="size-5 text-gray-500">📖</span>,
  },
  {
    href: '/#use-cases',
    title: 'Use Cases',
    description: 'Check out demos and how ARIIA can be applied across industries.',
    icon: <span className="size-5 text-gray-500">📦</span>,
  },
  {
    href: '/industries/',
    title: 'Industries',
    description: 'See the sectors where ARIIA can enhance operations and customer experiences.',
    icon: <span className="size-5 text-gray-500">🏢</span>,
  },
  {
    href: '/#faq',
    title: 'Questions & Answers',
    description: 'Find what you need in our Q&A section.',
    icon: <span className="size-5 text-gray-500">❓</span>,
  },
  {
    href: '/#security',
    title: 'Security & Data Protection',
    description: 'Understand how ARIIA safeguards your data.',
    icon: <span className="size-5 text-gray-500">🔒</span>,
  },
  {
    href: '/terms-of-service/',
    title: 'Terms of Service',
    description: 'Review the terms for using our services.',
    icon: <span className="size-5 text-gray-500">📜</span>,
  },
  {
    href: '/privacy-policy/',
    title: 'Privacy Policy',
    description: 'Learn how your privacy and personal data is protected.',
    icon: <span className="size-5 text-gray-500">🛡️</span>,
  },
];

const MOBILE_MENU_RESOURCES = [
  {
    label: 'Resources',
    links: [
      {
        href: '/blog/',
        label: 'Blog',
        description: 'Stay informed with industry trends, insights, and the latest ARIIA news.',
        icon: <span className="size-5 text-gray-500">📖</span>,
      },
      {
        href: '/#use-cases',
        label: 'Use Cases',
        description: 'Check out demos and how ARIIA can be applied across industries.',
        icon: <span className="size-5 text-gray-500">📦</span>,
      },
      {
        href: '/industries/',
        label: 'Industries',
        description: 'See the sectors where ARIIA can enhance operations and customer experiences.',
        icon: <span className="size-5 text-gray-500">🏢</span>,
      },
      {
        href: '/#faq',
        label: 'Questions & Answers',
        description: 'Find what you need in our Q&A section.',
        icon: <span className="size-5 text-gray-500">❓</span>,
      },
      {
        href: '/#security',
        label: 'Security & Data Protection',
        description: 'Understand how ARIIA safeguards your data.',
        icon: <span className="size-5 text-gray-500">🔒</span>,
      },
      {
        href: '/terms-of-service/',
        label: 'Terms of Service',
        description: 'Review the terms for using our services.',
        icon: <span className="size-5 text-gray-500">📜</span>,
      },
      {
        href: '/privacy-policy/',
        label: 'Privacy Policy',
        description: 'Learn how your privacy and personal data is protected.',
        icon: <span className="size-5 text-gray-500">🛡️</span>,
      },
    ],
  },
];

const MOBILE_MENU_GROUPS = [
  {
    label: 'Company',
    icon: <span className="size-5 text-gray-500">👥</span>,
    links: [
      {
        href: '/#about-us',
        label: 'About Us',
        description: 'Learn about our mission to transform businesses with AI agents.',
        icon: <span className="size-5 text-gray-500">👤</span>,
      },
      {
        href: '/story-behind-ariia/',
        label: 'The Story Behind ARIIA',
        description: 'Discover the story behind ARIIA’s name its vision for the future.',
        icon: <span className="size-5 text-gray-500">✨</span>,
      },
      {
        href: '/careers/',
        label: 'Careers',
        description: 'Help us build the next gen of AI. Explore job openings and join our journey.',
        icon: <span className="size-5 text-gray-500">💼</span>,
      },
      {
        href: '/customers/',
        label: 'Customers',
        description: 'See how ARIIA is transforming customer experiences for businesses.',
        icon: <span className="size-5 text-gray-500">👥</span>,
      },
      {
        href: '/contact-us/',
        label: 'Contact Us',
        description: 'Have questions? Reach out, and we’ll respond within 24 hours.',
        icon: <span className="size-5 text-gray-500">✉️</span>,
      },
    ],
  },
];

const MOBILE_MENU_SINGLE_LINKS = [
  { href: '/features', label: 'Features', icon: <span className="w-5 h-5 text-gray-500">✨</span> },
  { href: '/pricing', label: 'Pricing', icon: <span className="w-5 h-5 text-gray-500">💲</span> },
];

function HeaderContent({
  hoveredDropdown,
  handleDropdownEnter,
  handleDropdownLeave,
  activePath,
  setActivePath,
  setHoveredDropdown,
  mobileMenuOpen,
  handleMobileMenuOpenChange,
  isSticky = false,
}: {
  hoveredDropdown: string | null;
  handleDropdownEnter: (name: string) => void;
  handleDropdownLeave: () => void;
  activePath: string | null;
  setActivePath: (path: string) => void;
  setHoveredDropdown: (name: string | null) => void;
  mobileMenuOpen: boolean;
  handleMobileMenuOpenChange: (open: boolean) => void;
  isSticky?: boolean;
}) {
  const menuItemClasses = (href: string) =>
    `flex items-start gap-3 p-3 rounded-lg transition-colors ${
      activePath === href ? 'bg-[#EEFBFF]' : ''
    } menu-item-hover`;

  const bgClass = isSticky ? 'bg-white/70' : 'bg-white';

  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <div
        className={`flex items-center ${bgClass} rounded-full shadow-[0_3px_6px_rgba(181,181,181,0.25)] px-3 py-0 md:px-4 md:py-2`}
      >
        <a href="/" className="flex items-center justify-center mr-0 shrink-0 md:mr-4">
          <AriiaSvgMark className="w-20 h-10 md:h-9 md:w-28" />
        </a>

        <nav className="hidden md:flex items-center space-x-6">
          <a
            href="/features"
            className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors hover:bg-[#EEFBFF] rounded-full px-4 py-2 mr-0"
            onClick={() => setActivePath('/features')}
          >
            Features
          </a>
          <a
            href="/pricing"
            className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors hover:bg-[#EEFBFF] rounded-full px-4 py-2 mr-3"
            onClick={() => setActivePath('/pricing')}
          >
            Pricing
          </a>

          <div
            className="relative"
            onMouseEnter={() => handleDropdownEnter('company')}
            onMouseLeave={handleDropdownLeave}
          >
            <button className="flex items-center text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors outline-none rounded-full py-2 px-3 -mx-3 hover:bg-[#EEFBFF]">
              Company
              <span className={`ml-1 h-4 w-4 transition-transform duration-200 ${hoveredDropdown === 'company' ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {hoveredDropdown === 'company' && (
              <div className="absolute top-full left-0 mt-5 w-96 p-2 rounded-xl shadow-lg border border-gray-100 bg-white space-y-1 z-50 animate-fade-in">
                {COMPANY_MENU.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={menuItemClasses(item.href)}
                    onClick={() => {
                      setActivePath(item.href);
                      setHoveredDropdown(null);
                    }}
                  >
                    <div className="pt-1">{item.icon}</div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">{item.title}</p>
                      <p className="text-xs text-gray-600 leading-tight">{item.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => handleDropdownEnter('resources')}
            onMouseLeave={handleDropdownLeave}
          >
            <button className="flex items-center text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors outline-none rounded-full py-2 px-3 -mx-2 hover:bg-[#EEFBFF]">
              Resources
              <span className={`ml-1 h-4 w-4 transition-transform duration-200 ${hoveredDropdown === 'resources' ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {hoveredDropdown === 'resources' && (
              <div className="absolute top-full left-0 mt-5 w-96 p-2 rounded-xl shadow-lg border border-gray-100 bg-white space-y-1 z-50 animate-fade-in">
                {RESOURCES_MENU.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={menuItemClasses(item.href)}
                    onClick={() => {
                      setActivePath(item.href);
                      setHoveredDropdown(null);
                    }}
                  >
                    <div className="pt-1">{item.icon}</div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">{item.title}</p>
                      <p className="text-xs text-gray-600 leading-tight">{item.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>

      <div
        className={`flex items-center ${bgClass} rounded-full shadow-[0_3px_6px_rgba(181,181,181,0.25)] px-1 py-1 md:px-2 md:py-2 space-x-1 sm:space-x-4`}
      >
        <a
          href="/login"
          className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors ml-5 px-3 hidden md:block"
        >
          Log In
        </a>
        <a
          href="/trial"
          className="bg-gray-900/95 hover:bg-gray-800/90 text-white font-medium text-xs sm:text-sm mx-0 px-3 sm:px-6 py-2 h-8 sm:h-9 rounded-full"
        >
          1-Month Free Trial
        </a>
        <div className="block md:hidden relative z-[60]">
          <button
            type="button"
            className="rounded-full size-8 sm:size-10 touch-manipulation bg-transparent border border-transparent"
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => handleMobileMenuOpenChange(!mobileMenuOpen)}
          >
            <svg
              className="h-6 w-6 sm:h-10 sm:w-10 text-gray-900"
              fill="none"
              viewBox="0 0 20 20"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {mobileMenuOpen && (
            <div
              className="p-0 bg-transparent rounded-none border-0 shadow-none z-[200] pointer-events-auto duration-0 mobile-menu-sheet"
              style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200 }}
            >
              <div className="mx-2 mt-2 rounded-[18px] border border-white/40 bg-white/90 shadow-[0_14px_36px_rgba(15,23,42,0.12)] overflow-y-auto relative flex flex-col max-h-[calc(100dvh-1.5rem)] touch-manipulation transform-gpu z-[1]">
                <div className="sticky top-0 z-[2] flex items-center justify-between px-4 pt-3 pb-2 bg-transparent shrink-0">
                  <div className="bg-white/45 rounded-full px-3 py-1 border border-white/45 flex items-center gap-2 pointer-events-none">
                    <AriiaSvgMark className="w-16 h-7" />
                  </div>
                  <button
                    type="button"
                    aria-label="Close menu"
                    className="relative z-[3] flex items-center justify-center size-10 opacity-90 rounded-full bg-white/45 shadow-md border border-white/45 touch-manipulation cursor-pointer"
                    onClick={() => handleMobileMenuOpenChange(false)}
                  >
                    ✕
                  </button>
                </div>

                <nav className="pb-6 relative z-[1]">
                  {MOBILE_MENU_SINGLE_LINKS.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-2 px-4 border-b border-[#93d8fa4c] py-3 min-h-[44px] text-gray-700 font-bold hover:bg-gray-100 transition-colors touch-manipulation relative z-[1]"
                      onClick={() => handleMobileMenuOpenChange(false)}
                    >
                      <span>{item.label}</span>
                    </a>
                  ))}

                  {MOBILE_MENU_GROUPS.map((group) => (
                    <Collapsible key={group.label} open={isCompanyOpen} onOpenChange={setIsCompanyOpen}>
                      <CollapsibleTrigger
                        type="button"
                        className={`flex items-center px-4 gap-2 py-3 min-h-[44px] text-gray-700 font-bold hover:bg-gray-100 transition-colors w-full touch-manipulation relative z-[1] ${
                          isCompanyOpen ? '' : 'border-b border-[#93d8fa4c]'}
                        `}
                      >
                        <span>{group.label}</span>
                        <span className={`size-4 ml-auto ${isCompanyOpen ? 'rotate-180 transition-all ease-in-out duration-200' : ''}`}>
                          ▼
                        </span>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="flex flex-col w-full px-4 gap-1 pb-4 border-b border-[#93d8fa4c]">
                          {group.links.map((link) => (
                            <a
                              key={link.href}
                              href={link.href}
                              className="flex ml-2 items-start gap-2 py-2 px-1 min-h-[44px] text-gray-800 font-[400] transition-colors touch-manipulation relative z-[1]"
                              onClick={() => handleMobileMenuOpenChange(false)}
                            >
                              <div className="flex flex-col gap-[1px]">
                                <span className="text-base leading-6">{link.label}</span>
                              </div>
                            </a>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}

                  {MOBILE_MENU_RESOURCES.map((group) => (
                    <Collapsible key={group.label} open={isResourcesOpen} onOpenChange={setIsResourcesOpen}>
                      <CollapsibleTrigger
                        type="button"
                        className={`flex items-center px-4 gap-2 py-3 min-h-[44px] text-gray-700 font-bold hover:bg-gray-100 transition-colors w-full touch-manipulation relative z-[1] ${
                          isResourcesOpen ? '' : 'border-b border-[#93d8fa4c]'}
                        `}
                      >
                        <span>{group.label}</span>
                        <span className={`size-4 ml-auto ${isResourcesOpen ? 'rotate-180 transition-all ease-in-out duration-200' : ''}`}>
                          ▼
                        </span>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="flex flex-col w-full px-4 gap-2 pb-4 border-b border-[#93d8fa4c]">
                          {group.links.map((link) => (
                            <a
                              key={link.href}
                              href={link.href}
                              className="flex ml-2 items-start gap-2 py-2 px-1 min-h-[44px] text-gray-800 font-[400] transition-colors touch-manipulation relative z-[1]"
                              onClick={() => handleMobileMenuOpenChange(false)}
                            >
                              <div className="flex flex-col gap-[1px]">
                                <span className="text-base leading-6">{link.label}</span>
                              </div>
                            </a>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </nav>

                <div className="px-4 pb-6 pt-2 shrink-0 relative z-[1]">
                  <div className="w-full bg-white/40 rounded-full p-[5px] shadow-[0_14px_36px_rgba(15,23,42,0.14)] flex items-center justify-between gap-2 border border-white/45">
                    <a
                      href="/login"
                      className="flex-1 text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors px-3 py-3 min-h-[44px] rounded-full text-center bg-transparent touch-manipulation flex items-center justify-center"
                      onClick={() => handleMobileMenuOpenChange(false)}
                    >
                      Log In
                    </a>
                    <a
                      href="/trial"
                      className="flex-1 bg-gray-900/95 hover:bg-gray-800/90 text-white font-medium text-sm mx-0 px-4 h-[32px] rounded-full flex items-center justify-center"
                      onClick={() => handleMobileMenuOpenChange(false)}
                    >
                      1-Month Free Trial
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Header({ isHomePage = true }: { isHomePage?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const [activePath, setActivePath] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  const handleMenuOpen = (open: boolean) => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop?.();
    } else {
      lenis?.start?.();
    }
    setMenuOpen(open);
  };

  const NO_GRADIENT_ROUTES = ['/', '/#faq', '/#about-us/', '/pricing'];
  const shouldHideGradient = NO_GRADIENT_ROUTES.includes(pathname);

  return (
    <div className="w-full">
      <div
        id="gradient-bar"
        className="h-10 fixed top-0 left-0 w-full z-40 transition-opacity duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, #6779FF 0%, #4E97FA 25%, #35B5F5 50%, #2EFFEA 100%)',
          opacity: 1,
        }}
      />

      <header className="fixed left-0 top-0 w-full z-50 !bg-transparent">
        {!shouldHideGradient && (
          <div className="absolute inset-0 -z-10">
            <div className="absolute w-[300px] h-[150px] md:w-[500px] md:h-[300px] -top-[3rem] md:-top-[12rem] right-[5%] bg-gradient-to-r from-[#6779FF] to-[#4E97FA] opacity-30 blur-[10rem]" />
          </div>
        )}

        <div className="max-w-[73.1rem] mx-auto px-4 md:px-6 lg:px-4 py-6">
          <HeaderContent
            hoveredDropdown={hoveredDropdown}
            handleDropdownEnter={(value) => setHoveredDropdown(value)}
            handleDropdownLeave={() => setHoveredDropdown(null)}
            activePath={activePath}
            setActivePath={setActivePath}
            setHoveredDropdown={setHoveredDropdown}
            mobileMenuOpen={menuOpen}
            handleMobileMenuOpenChange={handleMenuOpen}
            isSticky={false}
          />
        </div>
      </header>
    </div>
  );
}

'use client';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const COMPANY_MENU = [
  { href: '/#about-us', title: 'About Us', description: 'Learn about our mission to transform businesses with AI agents.' },
  { href: '/story-behind-ariia/', title: 'The Story Behind ARIIA', description: "Discover the story behind ARIIA's name & its vision for the future." },
  { href: '/careers/', title: 'Careers', description: 'Help us build the next gen of AI. Explore job openings and join our journey.' },
  { href: '/customers/', title: 'Customers', description: 'See how ARIIA is transforming customer experiences for businesses.' },
  { href: '/contact-us/', title: 'Contact Us', description: "Have questions? Reach out, and we'll respond within 24 hours." },
];

const RESOURCES_MENU = [
  { href: '/blog/', title: 'Blog', description: 'Stay informed with industry trends, insights, and the latest ARIIA news.' },
  { href: '/#use-cases', title: 'Use Cases', description: 'Check out demos and how ARIIA can be applied across industries.' },
  { href: '/industries/', title: 'Industries', description: 'See the sectors where ARIIA can enhance operations and customer experiences.' },
  { href: '/#faq', title: 'Questions & Answers', description: 'Find what you need in our Q&A section.' },
  { href: '/#security', title: 'Security & Data Protection', description: 'Understand how ARIIA safeguards your data.' },
  { href: '/terms-of-service/', title: 'Terms of Service', description: 'Review the terms for using our services.' },
  { href: '/privacy-policy/', title: 'Privacy Policy', description: 'Learn how your privacy and personal data is protected.' },
];

const MOBILE_MENU_SINGLE_LINKS = [
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
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

export function Header({ isHomePage = true }: { isHomePage?: boolean }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState<string | null>(null);
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const handleMenuOpen = (open: boolean) => {
    setMenuOpen(open);
  };

  const handleDropdownEnter = (name: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredDropdown(name);
  };

  const handleDropdownLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredDropdown(null);
    }, 300);
  };

  const menuItemClasses = (href: string) =>
    `flex items-start gap-3 p-3 rounded-lg transition-colors menu-item-hover${activePath === href ? ' bg-[#EEFBFF]' : ''}`;

  return (
    <div className="w-full">
      <div
        id="gradient-bar"
        className="h-10 fixed top-0 left-0 w-full z-40 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, #6779FF 0%, #4E97FA 25%, #35B5F5 50%, #2EFFEA 100%)',
          opacity: 1,
        }}
      />

      <header className={`fixed left-0 top-0 w-full z-50 !bg-transparent${isHomePage ? ' header-vertical-lines' : ''}`}>
        <div className="max-w-[73.1rem] mx-auto px-4 md:px-6 lg:px-4 py-6">
          <div className="flex items-center justify-between">

            {/* Left pill */}
            <div className="flex items-center bg-white rounded-full shadow-[0_3px_6px_rgba(181,181,181,0.25)] px-3 py-0 md:px-4 md:py-2">
              <a href="/" className="flex items-center justify-center mr-0 shrink-0 md:mr-4">
                <span className="text-lg font-bold md:text-xl">ARIIA</span>
              </a>

              <nav className="hidden md:flex items-center space-x-6">
                <a href="/features" className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors hover:bg-[#EEFBFF] rounded-full px-4 py-2">
                  Features
                </a>
                <a href="/pricing" className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors hover:bg-[#EEFBFF] rounded-full px-4 py-2 mr-3">
                  Pricing
                </a>

                <div className="relative" onMouseEnter={() => handleDropdownEnter('company')} onMouseLeave={handleDropdownLeave}>
                  <button className="flex items-center text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors outline-none rounded-full py-2 px-3 -mx-3 hover:bg-[#EEFBFF]">
                    Company
                    <span className={`ml-1 text-xs transition-transform duration-200${hoveredDropdown === 'company' ? ' rotate-180' : ''}`}>▼</span>
                  </button>
                  {hoveredDropdown === 'company' && (
                    <div className="absolute top-full left-0 mt-5 w-96 p-2 rounded-xl shadow-lg border border-gray-100 bg-white space-y-1 z-50 animate-fade-in">
                      {COMPANY_MENU.map((item) => (
                        <a key={item.href} href={item.href} className={menuItemClasses(item.href)} onClick={() => { setActivePath(item.href); setHoveredDropdown(null); }}>
                          <div className="text-left">
                            <p className="text-sm font-medium text-gray-900">{item.title}</p>
                            <p className="text-xs text-gray-600 leading-tight">{item.description}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative" onMouseEnter={() => handleDropdownEnter('resources')} onMouseLeave={handleDropdownLeave}>
                  <button className="flex items-center text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors outline-none rounded-full py-2 px-3 -mx-2 hover:bg-[#EEFBFF]">
                    Resources
                    <span className={`ml-1 text-xs transition-transform duration-200${hoveredDropdown === 'resources' ? ' rotate-180' : ''}`}>▼</span>
                  </button>
                  {hoveredDropdown === 'resources' && (
                    <div className="absolute top-full left-0 mt-5 w-96 p-2 rounded-xl shadow-lg border border-gray-100 bg-white space-y-1 z-50 animate-fade-in">
                      {RESOURCES_MENU.map((item) => (
                        <a key={item.href} href={item.href} className={menuItemClasses(item.href)} onClick={() => { setActivePath(item.href); setHoveredDropdown(null); }}>
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

            {/* Right pill */}
            <div className="flex items-center bg-white rounded-full shadow-[0_3px_6px_rgba(181,181,181,0.25)] px-1 py-1 md:px-2 md:py-2 space-x-1 sm:space-x-4">
              <a href="/login" className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors ml-5 px-3 hidden md:block">
                Log In
              </a>
              <a href="/trial" style={{ background: '#111', color: 'white', fontWeight: '500', fontSize: '14px', padding: '8px 24px', borderRadius: '999px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                1-Month Free Trial
              </a>

              {/* Mobile hamburger */}
              <div className="block md:hidden relative z-[60]">
                <button
                  type="button"
                  aria-label="Open menu"
                  aria-expanded={menuOpen}
                  className="rounded-full size-8 sm:size-10 touch-manipulation bg-transparent border-none outline-none"
                  onClick={() => handleMenuOpen(true)}
                >
                  <svg className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </header>

      {menuOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200 }} className="pointer-events-auto">
          <div style={{
            margin: '8px',
            marginTop: '8px',
            borderRadius: '18px',
            background: 'white',
            overflowY: 'auto',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: 'calc(100dvh - 1.5rem)',
            border: '1px solid #eee',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            zIndex: 1,
          }}>

            <div className="sticky top-0 z-[2] flex items-center justify-between px-4 pt-3 pb-2 shrink-0">
              <div style={{ background: 'white', borderRadius: '999px', padding: '4px 12px', border: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '8px', pointerEvents: 'none' }}>
                <span className="text-base font-bold">ARIIA</span>
              </div>
              <button
                type="button"
                aria-label="Close menu"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: 'white', border: '1px solid #eee', cursor: 'pointer' }}
                onClick={() => handleMenuOpen(false)}
              >
                <span className="text-gray-700 pointer-events-none">✕</span>
              </button>
            </div>

            <nav className="pb-6">
              {MOBILE_MENU_SINGLE_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 px-4 border-b border-[#93d8fa4c] py-3 min-h-[44px] text-gray-700 font-bold hover:bg-gray-100 transition-colors touch-manipulation"
                  onClick={() => handleMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}

              <div>
                <button
                  type="button"
                  className={`flex items-center px-4 gap-2 py-3 min-h-[44px] text-gray-700 font-bold hover:bg-gray-100 transition-colors w-full touch-manipulation${!isCompanyOpen ? ' border-b border-[#93d8fa4c]' : ''}`}
                  onClick={() => setIsCompanyOpen((prev) => !prev)}
                >
                  <span>Company</span>
                  <span className={`ml-auto text-sm transition-transform duration-200${isCompanyOpen ? ' rotate-180' : ''}`} style={{ color: isCompanyOpen ? '#35B5F5' : undefined }}>▼</span>
                </button>
                {isCompanyOpen && (
                  <div className="flex flex-col w-full px-4 gap-1 pb-4 border-b border-[#93d8fa4c]">
                    {MOBILE_COMPANY_LINKS.map((link) => (
                      <a key={link.href} href={link.href} className="flex ml-2 items-start gap-2 py-2 px-1 min-h-[44px] text-gray-800 font-[400] touch-manipulation" onClick={() => handleMenuOpen(false)}>
                        <span className="text-base leading-6">{link.label}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <button
                  type="button"
                  className={`flex items-center px-4 gap-2 py-3 min-h-[44px] text-gray-700 font-bold hover:bg-gray-100 transition-colors w-full touch-manipulation${!isResourcesOpen ? ' border-b border-[#93d8fa4c]' : ''}`}
                  onClick={() => setIsResourcesOpen((prev) => !prev)}
                >
                  <span>Resources</span>
                  <span className={`ml-auto text-sm transition-transform duration-200${isResourcesOpen ? ' rotate-180' : ''}`} style={{ color: isResourcesOpen ? '#35B5F5' : undefined }}>▼</span>
                </button>
                {isResourcesOpen && (
                  <div className="flex flex-col w-full px-4 gap-2 pb-4 border-b border-[#93d8fa4c]">
                    {MOBILE_RESOURCES_LINKS.map((link) => (
                      <a key={link.href} href={link.href} className="flex ml-2 items-start gap-2 py-2 px-1 min-h-[44px] text-gray-800 font-[400] touch-manipulation" onClick={() => handleMenuOpen(false)}>
                        <span className="text-base leading-6">{link.label}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            <div className="px-4 pb-6 pt-2 shrink-0">
              <div style={{ width: '100%', background: 'white', borderRadius: '999px', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', border: '1px solid #eee' }}>
                <a href="/login" className="flex-1 text-gray-700 hover:text-gray-900 font-medium text-sm px-3 py-3 min-h-[44px] rounded-full text-center touch-manipulation flex items-center justify-center" onClick={() => handleMenuOpen(false)}>
                  Log In
                </a>
                <a href="/trial" style={{ flex: 1, background: '#111', color: 'white', fontWeight: '500', fontSize: '14px', padding: '0 16px', height: '32px', borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }} onClick={() => handleMenuOpen(false)}>
                  1-Month Free Trial
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      <style jsx global>{`
        .menu-item-hover:hover { background-color: #eefbff !important; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
      `}</style>
    </div>
  );
}
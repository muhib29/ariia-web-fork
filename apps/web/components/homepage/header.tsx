'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { AriiaSvgMark } from '../icons/AriiaSvgMark';

// -----------------------------------------------------------------------------
// DATA
// -----------------------------------------------------------------------------

const COMPANY_LINKS = [
  { href: '/#about-us', label: 'About Us' },
  { href: '/story-behind-ariia/', label: 'The Story Behind ARIIA' },
  { href: '/careers/', label: 'Careers' },
  { href: '/customers/', label: 'Customers' },
  { href: '/contact-us/', label: 'Contact Us' },
];

const RESOURCE_LINKS = [
  { href: '/blog/', label: 'Blog' },
  { href: '/industries/', label: 'Industries' },
  { href: '/terms-of-service/', label: 'Terms of Service' },
  { href: '/privacy-policy/', label: 'Privacy Policy' },
];

const NAV_LINKS = [
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
];

// -----------------------------------------------------------------------------
// HEADER
// -----------------------------------------------------------------------------

export function Header({ isHomePage = true }: { isHomePage?: boolean }) {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ---------------------------------------------------------------------------
  // CLOSE MOBILE MENU ON ROUTE CHANGE
  // ---------------------------------------------------------------------------

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // ---------------------------------------------------------------------------
  // LIGHTWEIGHT SCROLL DETECTION
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // ---------------------------------------------------------------------------
  // BODY LOCK
  // ---------------------------------------------------------------------------

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 100,
          padding: '18px 14px',
          transition: 'background-color .25s ease',
        }}
      >
        {/* ------------------------------------------------------------------ */}
        {/* WRAPPER */}
        {/* ------------------------------------------------------------------ */}

        <div
          style={{
            maxWidth: '1180px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          {/* ---------------------------------------------------------------- */}
          {/* LEFT PILL */}
          {/* ---------------------------------------------------------------- */}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: '#fff',
              borderRadius: 999,
              padding: '10px 12px',
              boxShadow: scrolled
                ? '0 4px 14px rgba(0,0,0,0.08)'
                : '0 2px 10px rgba(0,0,0,0.05)',
              border: '1px solid rgba(0,0,0,0.04)',
              flexShrink: 0,
            }}
          >
            {/* LOGO */}

            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
              }}
            >
              <AriiaSvgMark width={82} height={36} />
            </Link>

            {/* DESKTOP NAV */}

            <nav className="desktop-nav">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link"
                >
                  {item.label}
                </Link>
              ))}

              {/* COMPANY */}

              <div className="dropdown">
                <button className="dropdown-trigger">
                  Company
                  <ChevronDown size={16} />
                </button>

                <div className="dropdown-panel">
                  {COMPANY_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="dropdown-item"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* RESOURCES */}

              <div className="dropdown">
                <button className="dropdown-trigger">
                  Resources
                  <ChevronDown size={16} />
                </button>

                <div className="dropdown-panel">
                  {RESOURCE_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="dropdown-item"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* RIGHT PILL */}
          {/* ---------------------------------------------------------------- */}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: '#fff',
              borderRadius: 999,
              padding: '4px',
              boxShadow: scrolled
                ? '0 4px 14px rgba(0,0,0,0.08)'
                : '0 2px 10px rgba(0,0,0,0.05)',
              border: '1px solid rgba(0,0,0,0.04)',
              flexShrink: 0,
            }}
          >
            <Link href="/login" className="login-link">
              Log In
            </Link>

            <Link href="/trial" className="trial-btn">
              1-Month Free Trial
            </Link>

            {/* MOBILE BUTTON */}

            <button
              aria-label="Open menu"
              className="mobile-btn"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* -------------------------------------------------------------------- */}
      {/* MOBILE OVERLAY */}
      {/* -------------------------------------------------------------------- */}

      <div
        className={`mobile-overlay ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* -------------------------------------------------------------------- */}
      {/* MOBILE MENU */}
      {/* -------------------------------------------------------------------- */}

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {/* TOP */}

        <div className="mobile-top">
          <AriiaSvgMark width={78} height={32} />

          <button
            aria-label="Close menu"
            className="mobile-close"
            onClick={() => setMobileOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* LINKS */}

        <div className="mobile-links">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mobile-link"
            >
              {item.label}
            </Link>
          ))}

          {/* COMPANY */}

          <button
            className="mobile-accordion-trigger"
            onClick={() => setCompanyOpen((v) => !v)}
          >
            Company

            <ChevronDown
              size={18}
              style={{
                transform: companyOpen
                  ? 'rotate(180deg)'
                  : 'rotate(0deg)',
                transition: 'transform .2s ease',
              }}
            />
          </button>

          <div
            className={`mobile-accordion ${
              companyOpen ? 'open' : ''
            }`}
          >
            {COMPANY_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="mobile-sub-link"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* RESOURCES */}

          <button
            className="mobile-accordion-trigger"
            onClick={() => setResourcesOpen((v) => !v)}
          >
            Resources

            <ChevronDown
              size={18}
              style={{
                transform: resourcesOpen
                  ? 'rotate(180deg)'
                  : 'rotate(0deg)',
                transition: 'transform .2s ease',
              }}
            />
          </button>

          <div
            className={`mobile-accordion ${
              resourcesOpen ? 'open' : ''
            }`}
          >
            {RESOURCE_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="mobile-sub-link"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* BOTTOM */}

        <div className="mobile-bottom">
          <Link href="/login" className="mobile-login">
            Log In
          </Link>

          <Link href="/trial" className="mobile-trial">
            1-Month Free Trial
          </Link>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* STYLES */}
      {/* -------------------------------------------------------------------- */}

      <style jsx global>{`
        * {
          -webkit-tap-highlight-color: transparent;
        }

        .desktop-nav {
          display: none;
        }

        .nav-link,
        .dropdown-trigger {
          height: 38px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 0 16px;
          border-radius: 999px;
          text-decoration: none;
          color: #374151;
          font-size: 14px;
          font-weight: 500;
          transition: background-color 0.15s ease;
          background: transparent;
          border: none;
          cursor: pointer;
          white-space: nowrap;
        }

        .nav-link:hover,
        .dropdown-trigger:hover {
          background: #eefbff;
        }

        .dropdown {
          position: relative;
        }

        .dropdown-panel {
          position: absolute;
          top: calc(100% + 14px);
          left: 0;
          min-width: 240px;
          background: white;
          border-radius: 14px;
          padding: 8px;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(0, 0, 0, 0.05);
          opacity: 0;
          pointer-events: none;
          transform: translateY(6px);
          transition:
            opacity 0.18s ease,
            transform 0.18s ease;
        }

        .dropdown:hover .dropdown-panel {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }

        .dropdown-item {
          display: block;
          padding: 12px 14px;
          border-radius: 10px;
          text-decoration: none;
          color: #374151;
          font-size: 14px;
          transition: background-color 0.15s ease;
        }

        .dropdown-item:hover {
          background: #eefbff;
        }

        .login-link {
          display: none;
        }

        .trial-btn {
          height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: #111827;
          color: white;
          text-decoration: none;
          padding: 0 20px;
          font-size: 14px;
          font-weight: 500;
          transition: background-color 0.15s ease;
          white-space: nowrap;
        }

        .trial-btn:hover {
          background: #1f2937;
        }

        .mobile-btn {
          width: 40px;
          height: 40px;
          border: none;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          cursor: pointer;
          color: #111827;
        }

        .mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.2);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.22s ease;
          z-index: 90;
        }

        .mobile-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }

        .mobile-menu {
          position: fixed;
          top: 10px;
          left: 10px;
          right: 10px;
          background: white;
          border-radius: 22px;
          z-index: 100;
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.12);
          border: 1px solid rgba(0, 0, 0, 0.05);

          transform: translateY(-12px);
          opacity: 0;
          pointer-events: none;

          transition:
            transform 0.24s ease,
            opacity 0.24s ease;

          max-height: calc(100vh - 20px);
          overflow-y: auto;

          -webkit-overflow-scrolling: touch;

          will-change: transform, opacity;
        }

        .mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        .mobile-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 18px 12px;
        }

        .mobile-close {
          width: 40px;
          height: 40px;
          border-radius: 999px;
          border: none;
          background: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .mobile-links {
          padding: 0 10px;
        }

        .mobile-link,
        .mobile-accordion-trigger {
          width: 100%;
          min-height: 52px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 12px;
          border: none;
          background: transparent;
          text-decoration: none;
          color: #374151;
          font-size: 15px;
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
        }

        .mobile-link:hover,
        .mobile-accordion-trigger:hover {
          background: #f8fafc;
        }

        .mobile-accordion {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.2s ease;
        }

        .mobile-accordion.open {
          grid-template-rows: 1fr;
        }

        .mobile-accordion > div {
          overflow: hidden;
        }

        .mobile-sub-link {
          display: block;
          padding: 10px 16px 10px 22px;
          text-decoration: none;
          color: #6b7280;
          font-size: 14px;
        }

        .mobile-bottom {
          display: flex;
          gap: 10px;
          padding: 20px;
        }

        .mobile-login,
        .mobile-trial {
          flex: 1;
          height: 46px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
        }

        .mobile-login {
          background: #f3f4f6;
          color: #111827;
        }

        .mobile-trial {
          background: #111827;
          color: white;
        }

        @media (min-width: 768px) {
          .desktop-nav {
            display: flex;
            align-items: center;
            gap: 2px;
            margin-left: 10px;
          }

          .login-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            height: 40px;
            padding: 0 14px;
            border-radius: 999px;
            color: #374151;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            transition: background-color 0.15s ease;
          }

          .login-link:hover {
            background: #f3f4f6;
          }

          .mobile-btn {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
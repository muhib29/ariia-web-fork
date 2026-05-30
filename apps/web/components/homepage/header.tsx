'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ALL_LINKS = [
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/industries', label: 'Industries' },
  { href: '/blog', label: 'Blog' },
  { href: '/customers', label: 'Customers' },
  { href: '/careers', label: 'Careers' },
  { href: '/story-behind-ariia', label: 'Our Story' },
  { href: '/contact-us', label: 'Contact' },
  { href: '/terms-of-service', label: 'Terms of Service' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
];

const NAV_LINKS = [
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/industries', label: 'Industries' },
  { href: '/contact-us', label: 'Contact' },
];

export function Header({ isHomePage = true }: { isHomePage?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="homepage-header">
      <div className="homepage-header-inner">
        <a href="/" className="homepage-header-logo">
          ARIIA
        </a>

        <nav className="homepage-header-nav">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="homepage-header-link">
            {link.label}
          </a>
        ))}
      </nav>

      <div className="homepage-header-actions">
        <a href="/login" style={{ color: '#333', textDecoration: 'none', fontSize: '14px' }}>
          Log In
        </a>
        <a href="/trial" style={{ background: '#111', color: 'white', padding: '8px 16px', borderRadius: '999px', textDecoration: 'none', fontSize: '14px' }}>
          Free Trial
        </a>
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
          className="homepage-mobile-menu-btn"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close mobile menu' : 'Open mobile menu'}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
      </div>

      {menuOpen && (
        <div className="homepage-mobile-menu-panel">
          {ALL_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: '#333',
                textDecoration: 'none',
                fontSize: '16px',
                padding: '14px 24px',
                borderBottom: '1px solid #f0f0f0'
              }}
            >
              {link.label}
            </a>
          ))}

          <div style={{ display: 'flex', gap: '12px', padding: '14px 24px' }}>
            <a href="/login" style={{ color: '#333', textDecoration: 'none', fontSize: '16px' }}>
              Log In
            </a>
            <a href="/trial" style={{ background: '#111', color: 'white', padding: '8px 16px', borderRadius: '999px', textDecoration: 'none', fontSize: '14px' }}>
              Free Trial
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

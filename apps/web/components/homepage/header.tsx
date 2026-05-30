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
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      background: 'white',
      zIndex: 50,
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #eee'
    }}>
      <a href="/" style={{ fontWeight: 'bold', fontSize: '20px', textDecoration: 'none', color: 'black' }}>
        ARIIA
      </a>

      <nav style={{ display: 'flex', gap: '24px' }}>
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} style={{ color: '#333', textDecoration: 'none', fontSize: '14px' }}>
            {link.label}
          </a>
        ))}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <a href="/login" style={{ color: '#333', textDecoration: 'none', fontSize: '14px' }}>
          Log In
        </a>
        <a href="/trial" style={{ background: '#111', color: 'white', padding: '8px 16px', borderRadius: '999px', textDecoration: 'none', fontSize: '14px' }}>
          Free Trial
        </a>
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', display: 'none' }}
          className="mobile-menu-btn"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: '57px',
          left: 0,
          right: 0,
          background: 'white',
          borderBottom: '1px solid #eee',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 100
        }}>
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

      <style jsx global>{`
        @media (max-width: 768px) {
          nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
'use client';

import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const SINGLE_LINKS = [
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
];

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

// ─── Component ────────────────────────────────────────────────────────────────

export function MobileHeader({
    isHomePage = true,
    isScrolled = false,
}: {
    isHomePage?: boolean;
    isScrolled?: boolean;
}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [companyOpen, setCompanyOpen] = useState(false);
    const [resourcesOpen, setResourcesOpen] = useState(false);

    const bgClass = isScrolled ? 'bg-white/70' : 'bg-white';

    function openMenu() {
        setMenuOpen(true);
    }

    function closeMenu() {
        setMenuOpen(false);
        setCompanyOpen(false);
        setResourcesOpen(false);
    }

    return (
        <>
            {/* ── Top bar ── */}
            <header
                className="fixed left-0 top-0 w-full z-50"
                style={{ maxWidth: '100vw', background: 'transparent' }}
            >
                <div style={{ padding: '24px 16px' }}>
                    <div className="flex items-center justify-between">

                        {/* Left pill: logo */}
                        <div
                            className={`flex items-center ${bgClass} rounded-full`}
                            style={{ padding: '0 12px', boxShadow: '0 3px 6px rgba(181,181,181,0.25)' }}
                        >
                            <a
                                href="/"
                                style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
                            >
                                <span style={{ fontWeight: 700, fontSize: 18, color: '#111' }}>ARIIA</span>
                            </a>
                        </div>

                        {/* Right pill: CTA + hamburger */}
                        <div
                            className={`flex items-center ${bgClass} rounded-full`}
                            style={{
                                padding: '4px',
                                boxShadow: '0 3px 6px rgba(181,181,181,0.25)',
                                gap: 4,
                            }}
                        >
                            <a
                                href="/trial"
                                style={{
                                    background: '#111',
                                    color: '#fff',
                                    fontWeight: 500,
                                    fontSize: 12,
                                    padding: '6px 12px',
                                    borderRadius: 999,
                                    textDecoration: 'none',
                                    touchAction: 'manipulation',
                                }}
                            >
                                1-Month Free Trial
                            </a>

                            {/* Hamburger */}
                            <button
                                type="button"
                                aria-label="Open menu"
                                aria-expanded={menuOpen}
                                onClick={openMenu}
                                style={{
                                    touchAction: 'manipulation',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 32,
                                    height: 32,
                                    borderRadius: '50%',
                                    padding: 0,
                                }}
                            >
                                <svg
                                    style={{ width: 24, height: 24, color: '#111' }}
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
                        </div>
                    </div>
                </div>
            </header>

            {/* ── Mobile menu overlay ── */}
            {menuOpen && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 200,
                        touchAction: 'manipulation',
                    }}
                >
                    <div
                        style={{
                            margin: '8px',
                            borderRadius: 18,
                            border: '1px solid rgba(255,255,255,0.4)',
                            background: 'rgba(255,255,255,0.95)',
                            boxShadow: '0 14px 36px rgba(15,23,42,0.12)',
                            overflowY: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            maxHeight: 'calc(100dvh - 1rem)',
                            touchAction: 'manipulation',
                        }}
                    >
                        {/* Header row */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '12px 16px 8px',
                                flexShrink: 0,
                            }}
                        >
                            <div
                                style={{
                                    background: 'rgba(255,255,255,0.45)',
                                    borderRadius: 999,
                                    padding: '4px 12px',
                                    border: '1px solid rgba(255,255,255,0.45)',
                                }}
                            >
                                <span style={{ fontWeight: 700, fontSize: 16, color: '#111' }}>ARIIA</span>
                            </div>
                            <button
                                type="button"
                                aria-label="Close menu"
                                onClick={closeMenu}
                                style={{
                                    touchAction: 'manipulation',
                                    background: 'rgba(255,255,255,0.45)',
                                    border: '1px solid rgba(255,255,255,0.45)',
                                    borderRadius: '50%',
                                    width: 40,
                                    height: 40,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                }}
                            >
                                <X style={{ width: 16, height: 16, color: '#374151', pointerEvents: 'none' }} />
                            </button>
                        </div>

                        {/* Nav */}
                        <nav style={{ paddingBottom: 8 }}>

                            {/* Single links */}
                            {SINGLE_LINKS.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={closeMenu}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '12px 16px',
                                        minHeight: 44,
                                        borderBottom: '1px solid rgba(147,216,250,0.3)',
                                        color: '#374151',
                                        fontWeight: 700,
                                        textDecoration: 'none',
                                        touchAction: 'manipulation',
                                    }}
                                >
                                    {link.label}
                                </a>
                            ))}

                            {/* Company accordion */}
                            <div style={{ borderBottom: '1px solid rgba(147,216,250,0.3)' }}>
                                <button
                                    type="button"
                                    onClick={() => setCompanyOpen((p) => !p)}
                                    style={{
                                        touchAction: 'manipulation',
                                        display: 'flex',
                                        alignItems: 'center',
                                        width: '100%',
                                        padding: '12px 16px',
                                        minHeight: 44,
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#374151',
                                        fontWeight: 700,
                                        fontSize: 16,
                                    }}
                                >
                                    <span>Company</span>
                                    <ChevronDown
                                        style={{
                                            width: 16,
                                            height: 16,
                                            marginLeft: 'auto',
                                            color: companyOpen ? '#35B5F5' : '#374151',
                                            transform: companyOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                        }}
                                    />
                                </button>

                                {companyOpen && (
                                    <div style={{ display: 'flex', flexDirection: 'column', padding: '0 16px 12px' }}>
                                        {COMPANY_LINKS.map((link) => (
                                            <a
                                                key={link.href}
                                                href={link.href}
                                                onClick={closeMenu}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    padding: '8px 4px 8px 8px',
                                                    minHeight: 44,
                                                    color: '#1f2937',
                                                    textDecoration: 'none',
                                                    touchAction: 'manipulation',
                                                    fontSize: 16,
                                                }}
                                            >
                                                {link.label}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Resources accordion */}
                            <div style={{ borderBottom: '1px solid rgba(147,216,250,0.3)' }}>
                                <button
                                    type="button"
                                    onClick={() => setResourcesOpen((p) => !p)}
                                    style={{
                                        touchAction: 'manipulation',
                                        display: 'flex',
                                        alignItems: 'center',
                                        width: '100%',
                                        padding: '12px 16px',
                                        minHeight: 44,
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#374151',
                                        fontWeight: 700,
                                        fontSize: 16,
                                    }}
                                >
                                    <span>Resources</span>
                                    <ChevronDown
                                        style={{
                                            width: 16,
                                            height: 16,
                                            marginLeft: 'auto',
                                            color: resourcesOpen ? '#35B5F5' : '#374151',
                                            transform: resourcesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                        }}
                                    />
                                </button>

                                {resourcesOpen && (
                                    <div style={{ display: 'flex', flexDirection: 'column', padding: '0 16px 12px' }}>
                                        {RESOURCES_LINKS.map((link) => (
                                            <a
                                                key={link.href}
                                                href={link.href}
                                                onClick={closeMenu}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    padding: '8px 4px 8px 8px',
                                                    minHeight: 44,
                                                    color: '#1f2937',
                                                    textDecoration: 'none',
                                                    touchAction: 'manipulation',
                                                    fontSize: 16,
                                                }}
                                            >
                                                {link.label}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </nav>

                        {/* Bottom CTA bar */}
                        <div style={{ padding: '8px 16px 24px', flexShrink: 0 }}>
                            <div
                                style={{
                                    width: '100%',
                                    background: 'rgba(255,255,255,0.4)',
                                    borderRadius: 999,
                                    padding: 5,
                                    boxShadow: '0 14px 36px rgba(15,23,42,0.14)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    border: '1px solid rgba(255,255,255,0.45)',
                                }}
                            >
                                <a
                                    href="/login"
                                    onClick={closeMenu}
                                    style={{
                                        flex: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#374151',
                                        fontWeight: 500,
                                        fontSize: 14,
                                        padding: '12px',
                                        minHeight: 44,
                                        borderRadius: 999,
                                        textDecoration: 'none',
                                        touchAction: 'manipulation',
                                    }}
                                >
                                    Log In
                                </a>
                                <a
                                    href="/trial"
                                    onClick={closeMenu}
                                    style={{
                                        flex: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: '#111',
                                        color: '#fff',
                                        fontWeight: 500,
                                        fontSize: 14,
                                        padding: '12px',
                                        minHeight: 44,
                                        borderRadius: 999,
                                        textDecoration: 'none',
                                        touchAction: 'manipulation',
                                    }}
                                >
                                    1-Month Free Trial
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
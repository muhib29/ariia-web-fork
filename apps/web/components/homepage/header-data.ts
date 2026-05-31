'use client';

export type HeaderFeatureFlags = {
  blur: boolean;
  shadows: boolean;
  transitions: boolean;
  gradients: boolean;
  opacity: boolean;
  transforms: boolean;
  dropdownAnimations: boolean;
};

export const NAV_LINKS = [
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
];

export const COMPANY_MENU = [
  {
    href: '/#about-us',
    title: 'About Us',
    description: 'Learn about our mission to transform businesses with AI agents.',
  },
  {
    href: '/story-behind-ariia/',
    title: 'The Story Behind ARIIA',
    description: "Discover the story behind ARIIA's name & its vision for the future.",
  },
  {
    href: '/careers/',
    title: 'Careers',
    description: 'Help us build the next gen of AI. Explore job openings and join our journey.',
  },
  {
    href: '/customers/',
    title: 'Customers',
    description: 'See how ARIIA is transforming customer experiences for businesses.',
  },
  {
    href: '/contact-us/',
    title: 'Contact Us',
    description: 'Have questions? Reach out, and we’ll respond within 24 hours.',
  },
];

export const RESOURCES_MENU = [
  {
    href: '/blog/',
    title: 'Blog',
    description: 'Stay informed with industry trends, insights, and the latest ARIIA news.',
  },
  {
    href: '/#use-cases',
    title: 'Use Cases',
    description: 'Check out demos and how ARIIA can be applied across industries.',
  },
  {
    href: '/industries/',
    title: 'Industries',
    description: 'See the sectors where ARIIA can enhance operations and customer experiences.',
  },
  {
    href: '/#faq',
    title: 'Questions & Answers',
    description: 'Find what you need in our Q&A section.',
  },
  {
    href: '/#security',
    title: 'Security & Data Protection',
    description: 'Understand how ARIIA safeguards your data.',
  },
  {
    href: '/terms-of-service/',
    title: 'Terms of Service',
    description: 'Review the terms for using our services.',
  },
  {
    href: '/privacy-policy/',
    title: 'Privacy Policy',
    description: 'Learn how your privacy and personal data is protected.',
  },
];

export const MOBILE_MENU_SINGLE_LINKS = [
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
];

export const MOBILE_MENU_GROUPS = [
  {
    label: 'Company',
    links: [
      { href: '/#about-us', label: 'About Us' },
      { href: '/story-behind-ariia/', label: 'The Story Behind ARIIA' },
      { href: '/careers/', label: 'Careers' },
      { href: '/customers/', label: 'Customers' },
      { href: '/contact-us/', label: 'Contact Us' },
    ],
  },
];

export const MOBILE_MENU_RESOURCES = [
  {
    label: 'Resources',
    links: [
      { href: '/blog/', label: 'Blog' },
      { href: '/#use-cases', label: 'Use Cases' },
      { href: '/industries/', label: 'Industries' },
      { href: '/#faq', label: 'Questions & Answers' },
      { href: '/#security', label: 'Security & Data Protection' },
      { href: '/terms-of-service/', label: 'Terms of Service' },
      { href: '/privacy-policy/', label: 'Privacy Policy' },
    ],
  },
];

export const DEFAULT_HEADER_FEATURE_FLAGS: HeaderFeatureFlags = {
  blur: true,
  shadows: true,
  transitions: true,
  gradients: true,
  opacity: true,
  transforms: true,
  dropdownAnimations: true,
};

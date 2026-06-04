'use client';

import dynamic from 'next/dynamic';
import type { FAQSectionProps } from './faqsection';
import type { SecuritySectionProps } from './security-section';
import type { UseCasesSectionProps } from './use-cases-section';
import type { InnovationSectionProps } from './innovation-section';

const VideoSection = dynamic(
  () => import('@/components/homepage').then((m) => ({ default: m.VideoSection })),
);
const ContentSection = dynamic(
  () => import('@/components/homepage').then((m) => ({ default: m.ContentSection })),
);
const UseCasesSection = dynamic(
  () => import('@/components/homepage').then((m) => ({ default: m.UseCasesSection })),
  { loading: () => <div id="use-cases" className="h-0 scroll-mt-20" aria-hidden /> },
);
const InnovationSection = dynamic(
  () => import('@/components/homepage').then((m) => ({ default: m.InnovationSection })),
  { loading: () => <div id="about-us" className="h-0 scroll-mt-20" aria-hidden /> },
);
const SecuritySection = dynamic(
  () => import('@/components/homepage').then((m) => ({ default: m.SecuritySection })),
  { loading: () => <div id="security" className="h-0 scroll-mt-20" aria-hidden /> },
);
const FAQSection = dynamic(
  () => import('@/components/homepage').then((m) => ({ default: m.FAQSection })),
  { loading: () => <div id="faq" className="h-0 scroll-mt-20" aria-hidden /> },
);
const NewsletterFooter = dynamic(
  () => import('@/components/homepage').then((m) => ({ default: m.NewsletterFooter })),
);

interface HomeBelowFoldProps {
  useCasesProps: UseCasesSectionProps | null;
  innovationProps: InnovationSectionProps | null;
  securityProps: SecuritySectionProps | null;
  faqProps: FAQSectionProps | null;
}

/** Below-fold sections — code-split with dynamic(), no viewport gating. */
export function HomeBelowFold({ useCasesProps, innovationProps, securityProps, faqProps }: HomeBelowFoldProps) {
  return (
    <>
      <VideoSection />
      <ContentSection />
      {useCasesProps && <UseCasesSection {...useCasesProps} />}
      {innovationProps && <InnovationSection {...innovationProps} />}
      {securityProps && <SecuritySection {...securityProps} />}
      {faqProps && <FAQSection {...faqProps} />}
      <NewsletterFooter />
    </>
  );
}

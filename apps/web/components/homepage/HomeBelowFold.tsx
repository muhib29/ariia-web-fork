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
);
const InnovationSection = dynamic(
  () => import('@/components/homepage').then((m) => ({ default: m.InnovationSection })),
);
const SecuritySection = dynamic(
  () => import('@/components/homepage').then((m) => ({ default: m.SecuritySection })),
);
const FAQSection = dynamic(
  () => import('@/components/homepage').then((m) => ({ default: m.FAQSection })),
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

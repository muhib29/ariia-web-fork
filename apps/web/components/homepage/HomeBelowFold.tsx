'use client';

import dynamic from 'next/dynamic';
import { ViewportSection } from '@/components/ViewportSection';
import type { FAQSectionProps } from './faqsection';
import type { SecuritySectionProps } from './security-section';
import type { UseCasesSectionProps } from './use-cases-section';

const VideoSection = dynamic(
  () => import('@/components/homepage').then((m) => ({ default: m.VideoSection })),
);
const ContentSection = dynamic(
  () => import('@/components/homepage').then((m) => ({ default: m.ContentSection })),
);
const UseCasesSection = dynamic(
  () => import('@/components/homepage').then((m) => ({ default: m.UseCasesSection })),
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
  securityProps: SecuritySectionProps | null;
  faqProps: FAQSectionProps | null;
}

/** Below-fold homepage — lazy chunks + viewport mount on low-RAM devices. */
export function HomeBelowFold({ useCasesProps, securityProps, faqProps }: HomeBelowFoldProps) {
  return (
    <>
      <ViewportSection id="about-us" estimatedHeight={320}>
        <VideoSection />
      </ViewportSection>

      <ViewportSection estimatedHeight={2400}>
        <ContentSection />
      </ViewportSection>

      {useCasesProps ? (
        <ViewportSection id="use-cases" estimatedHeight={1700}>
          <UseCasesSection {...useCasesProps} />
        </ViewportSection>
      ) : null}

      {securityProps ? (
        <ViewportSection id="security" estimatedHeight={1100}>
          <SecuritySection {...securityProps} />
        </ViewportSection>
      ) : null}

      {faqProps ? (
        <ViewportSection id="faq" estimatedHeight={900}>
          <FAQSection {...faqProps} />
        </ViewportSection>
      ) : null}

      <ViewportSection estimatedHeight={520}>
        <NewsletterFooter />
      </ViewportSection>
    </>
  );
}

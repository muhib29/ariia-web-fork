'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import type { FAQSectionProps } from './faqsection';
import type { SecuritySectionProps } from './security-section';
import type { UseCasesSectionProps } from './use-cases-section';
import type { InnovationSectionProps } from './innovation-section';

const VideoSection = dynamic(() => import('./video-section').then((m) => m.VideoSection));
const ContentSection = dynamic(() => import('./content-section').then((m) => m.ContentSection));
const UseCasesSection = dynamic(() => import('./use-cases-section').then((m) => m.UseCasesSection));
const InnovationSection = dynamic(() => import('./innovation-section').then((m) => m.InnovationSection));
const SecuritySection = dynamic(() => import('./security-section').then((m) => m.SecuritySection));
const FAQSection = dynamic(() => import('./faqsection').then((m) => m.FAQSection));
const NewsletterFooter = dynamic(() => import('./footer').then((m) => m.NewsletterFooter));

interface HomeBelowFoldProps {
  useCasesProps: UseCasesSectionProps | null;
  innovationProps: InnovationSectionProps | null;
  securityProps: SecuritySectionProps | null;
  faqProps: FAQSectionProps | null;
}

/** Below-fold sections: keep their JS off the mobile initial render path. */
export function HomeBelowFold({ useCasesProps, innovationProps, securityProps, faqProps }: HomeBelowFoldProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [shouldRenderSections, setShouldRenderSections] = useState(false);

  useEffect(() => {
    if (shouldRenderSections) return;

    let idleId: number | undefined;
    let timerId: number | undefined;

    const renderSections = () => setShouldRenderSections(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          renderSections();
          observer.disconnect();
        }
      },
      { rootMargin: '120px 0px' },
    );

    const sentinel = sentinelRef.current;
    if (sentinel) observer.observe(sentinel);

    const scheduleIdleRender = () => {
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(renderSections, { timeout: 6000 });
      } else {
        renderSections();
      }
    };

    const isMobileViewport = window.matchMedia('(max-width: 767px)').matches;
    if (isMobileViewport) {
      const scheduleAfterLoad = () => {
        timerId = window.setTimeout(scheduleIdleRender, 6000);
      };

      if (document.readyState === 'complete') {
        scheduleAfterLoad();
      } else {
        window.addEventListener('load', scheduleAfterLoad, { once: true });
      }

      return () => {
        observer.disconnect();
        window.removeEventListener('load', scheduleAfterLoad);
        if (idleId) window.cancelIdleCallback(idleId);
        if (timerId) window.clearTimeout(timerId);
      };
    }

    scheduleIdleRender();

    return () => {
      observer.disconnect();
      if (idleId) window.cancelIdleCallback(idleId);
      if (timerId) window.clearTimeout(timerId);
    };
  }, [shouldRenderSections]);

  return (
    <>
      <div ref={sentinelRef} aria-hidden />
      {!shouldRenderSections ? null : (
        <>
      <VideoSection />
      <ContentSection />
      {useCasesProps && <UseCasesSection {...useCasesProps} />}
      {innovationProps && <InnovationSection {...innovationProps} />}
      {securityProps && <SecuritySection {...securityProps} />}
      {faqProps && <FAQSection {...faqProps} />}
      <NewsletterFooter />
        </>
      )}
    </>
  );
}

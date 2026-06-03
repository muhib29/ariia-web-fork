'use client';
import React from 'react';
import { NewsletterFooter } from './footer';
import { SectionHeader } from '../SectionHeader';
import { Header } from './header/header';
import { SimplePolicyRenderer } from './simple-policy-renderer';

export interface TermsOfServiceData {
  tag?: string;
  title?: string;
  styledTitle?: string;
  content?: string;
  effectiveDate?: string;
}

/** Normalize content so markdown lists parse (Strapi/GraphQL often returns escaped newlines). */
function normalizeMarkdownContent(raw: unknown): string {
  if (raw == null) return '';
  if (typeof raw !== 'string') return String(raw);
  return raw.replace(/\\n/g, '\n').trim();
}

export function TermsOfService({ terms }: { terms: TermsOfServiceData }) {
  let rawContent = normalizeMarkdownContent(terms?.content);
  let effectiveDate = terms?.effectiveDate || '';

  const dateMatch = rawContent.match(/^(?:\*\*)?Effective Date\s*:?\s*(.*?)(?:\*\*)?(?:\n|$)+/i);
  if (dateMatch) {
    if (!terms?.effectiveDate) {
      effectiveDate = dateMatch[1].replace(/\*/g, '').trim();
    }
    rawContent = rawContent.replace(/^(?:\*\*)?Effective Date\s*:?\s*(.*?)(?:\*\*)?(?:\n|$)+/i, '');
  }

  // Keep phone on a separate line without changing Strapi's phone value.
  rawContent = rawContent.replace(
    /(Email:[^\n]*?)(?:\s*[|,;-]?\s*)((?:\*\*)?Phone\s*:[^\n]*)/gi,
    '$1\n\n$2',
  );

  // Force ANY bold word starting at the beginning of a sentence to break to the next line
  // so the paragraph content appears below it.
  rawContent = rawContent.replace(/(\*\*[^*]+?\*\*)\s+(?=[A-Za-z0-9])/g, '$1\n\n');

  return (
    <section
      className="relative overflow-hidden bg-white min-h-screen flex flex-col justify-start pt-20"
      style={{ backgroundColor: '#fff' }}
    >
      {/* Background Blurs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="ios-mobile-disable-blob absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] top-[180px] -left-[10%] bg-gradient-to-r from-[#6779FF] via-[#4E97FA] to-[#2EFFEA] opacity-20 blur-[70px]" />
        <div className="ios-mobile-disable-blob absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] bottom-[1800px] -left-[10%] bg-gradient-to-r from-[#6779FF] via-[#4E97FA] to-[#2EFFEA] opacity-20 blur-[70px]" />
        <div className="ios-mobile-disable-blob absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] top-[700px] -right-[10%] bg-gradient-to-tr from-[#C4CDF3] to-[#C4CDF3] opacity-40 blur-[100px]" />
        <div className="ios-mobile-disable-blob absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] bottom-[1000px] -right-[10%] bg-gradient-to-tr from-[#C4CDF3] to-[#C4CDF3] opacity-40 blur-[100px]" />
      </div>

      {/* Header */}
      <Header /> {/* //changed */}
      {/* Main Content */}
      <div className="px-5 max-w-6xl mx-auto z-10 relative pb-4 md:pb-8 bg-white">
        <div className="text-center pt-10 pb-0">
          <SectionHeader
            tag={terms.tag}
            title={terms.title}
            gradientTitle={terms.styledTitle}
          />
        </div>
        {effectiveDate && (
          <p className="text-lg mt-0 mb-10 font-medium text-black">Effective Date: {effectiveDate}</p>
        )}

        <div className="space-y-10 text-gray-800 text-base leading-relaxed">
          {rawContent ? (
            <SimplePolicyRenderer content={rawContent} />
          ) : (
            <p>No terms of service content available.</p>
          )}
        </div>
      </div>

      <NewsletterFooter isHomePage={false} />
    </section>
  );
}

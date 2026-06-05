'use client';
import React from 'react';
import { NewsletterFooter } from './footer';
import { SectionHeader } from '../SectionHeader';
import { Header } from './header/header';
import { SimplePolicyRenderer } from './simple-policy-renderer';

export interface PrivacyPolicyData {
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

export function PrivacyPolicy({ policy }: { policy: PrivacyPolicyData }) {
  let rawContent = normalizeMarkdownContent(policy?.content);
  let effectiveDate = policy?.effectiveDate || '';

  const dateMatch = rawContent.match(/^(?:\*\*)?Effective Date\s*:?\s*(.*?)(?:\*\*)?(?:\n|$)+/i);
  if (dateMatch) {
    if (!policy?.effectiveDate) {
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
      className="relative overflow-hidden bg-white min-h-screen flex flex-col justify-start pt-16 md:pt-20"
      style={{ backgroundColor: '#fff' }}
    >
      {/* Background Blurs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-[54px] md:hidden bg-[linear-gradient(90deg,#6779FF_0%,#4E97FA_42%,#35B5F5_72%,#2EFFEA_100%)]" />
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              'radial-gradient(ellipse 760px 360px at 50% 150px, rgba(78,151,250,0.12) 0%, rgba(53,181,245,0.08) 42%, rgba(46,255,234,0.04) 62%, transparent 86%), radial-gradient(ellipse 360px 360px at -70px 180px, rgba(103,121,255,0.12) 0%, rgba(78,151,250,0.085) 36%, rgba(46,255,234,0.045) 58%, transparent 82%), radial-gradient(ellipse 320px 380px at -80px 56%, rgba(78,151,250,0.15) 0%, rgba(53,181,245,0.10) 42%, rgba(46,255,234,0.055) 62%, transparent 84%), radial-gradient(ellipse 360px 420px at calc(100% + 90px) 32%, rgba(196,205,243,0.18) 0%, rgba(196,205,243,0.10) 42%, transparent 82%), radial-gradient(ellipse 380px 440px at calc(100% + 90px) 72%, rgba(196,205,243,0.16) 0%, rgba(196,205,243,0.09) 42%, transparent 84%), linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(247,252,255,0.16) 46%, rgba(234,246,255,0.30) 100%)',
          }}
        />
        <div className="ios-mobile-disable-blob absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] top-[180px] -left-[10%] bg-gradient-to-r from-[#6779FF] via-[#4E97FA] to-[#2EFFEA] opacity-20 blur-[70px]" />
        <div className="ios-mobile-disable-blob absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] bottom-[1800px] -left-[10%] bg-gradient-to-r from-[#6779FF] via-[#4E97FA] to-[#2EFFEA] opacity-20 blur-[70px]" />
        <div className="ios-mobile-disable-blob absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] top-[700px] -right-[10%] bg-gradient-to-tr from-[#C4CDF3] to-[#C4CDF3] opacity-40 blur-[100px]" />
        <div className="ios-mobile-disable-blob absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] bottom-[1000px] -right-[10%] bg-gradient-to-tr from-[#C4CDF3] to-[#C4CDF3] opacity-40 blur-[100px]" />
      </div>

      {/* Header */}
      <Header /> {/* //changed */}

      {/* Main Content */}
      <div className="px-5 max-w-6xl mx-auto z-10 relative pb-4 pt-10 md:pb-8 bg-transparent md:bg-white">
        <div className="text-center">
          <SectionHeader
            tag={policy.tag}
            title={policy.title}
            gradientTitle={policy.styledTitle}
          />
        </div>
        {effectiveDate && (
          <p className="text-lg mt-0 mb-10 font-medium text-black">Effective Date: {effectiveDate}</p>
        )}

        {/* Privacy Content */}
        <div className="space-y-10 text-gray-800 text-base leading-relaxed">
          {rawContent ? (
            <SimplePolicyRenderer content={rawContent} />
          ) : (
            <p>No privacy policy content available.</p>
          )}
        </div>
      </div>

      <NewsletterFooter isHomePage={false} />
    </section>
  );
}

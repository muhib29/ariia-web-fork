'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { HeaderVariantA } from '@/components/homepage/HeaderVariantA';
import { HeaderVariantB } from '@/components/homepage/HeaderVariantB';
import { HeaderVariantC } from '@/components/homepage/HeaderVariantC';
import { HeaderVariantD } from '@/components/homepage/HeaderVariantD';
import { HeaderVariantE } from '@/components/homepage/HeaderVariantE';
import { DEFAULT_HEADER_FEATURE_FLAGS, HeaderFeatureFlags } from '@/components/homepage/header-data';

const VARIANT_OPTIONS = ['A', 'B', 'C', 'D', 'E'] as const;

const VARIANT_LABELS: Record<typeof VARIANT_OPTIONS[number], string> = {
  A: 'Variant A - Ultra Stable',
  B: 'Variant B - Glass Optimized',
  C: 'Variant C - Static CSS',
  D: 'Variant D - Memoized',
  E: 'Variant E - Closest Match',
};

const VARIANTS = {
  A: HeaderVariantA,
  B: HeaderVariantB,
  C: HeaderVariantC,
  D: HeaderVariantD,
  E: HeaderVariantE,
};

const FEATURE_FLAGS: Array<keyof HeaderFeatureFlags> = [
  'blur',
  'shadows',
  'transitions',
  'gradients',
  'opacity',
  'transforms',
  'dropdownAnimations',
];

export default function HeaderTestPage() {
  const params = useSearchParams();
  const router = useRouter();
  const queryVariant = params.get('variant') as typeof VARIANT_OPTIONS[number] | null;
  const [activeVariant, setActiveVariant] = useState<typeof VARIANT_OPTIONS[number]>('A');
  const [featureFlags, setFeatureFlags] = useState<HeaderFeatureFlags>(DEFAULT_HEADER_FEATURE_FLAGS);

  useEffect(() => {
    if (queryVariant && VARIANT_OPTIONS.includes(queryVariant)) {
      setActiveVariant(queryVariant);
    }
  }, [queryVariant]);

  const SelectedHeader = useMemo(() => VARIANTS[activeVariant], [activeVariant]);

  const toggleFeatureFlag = (flag: keyof HeaderFeatureFlags) => {
    setFeatureFlags((current) => ({ ...current, [flag]: !current[flag] }));
  };

  const selectVariant = (variant: typeof VARIANT_OPTIONS[number]) => {
    setActiveVariant(variant);
    router.replace(`/header-test?variant=${variant}`);
  };

  return (
    <main className="header-test-page">
      <section className="control-panel">
        <div className="panel-heading">
          <h1>Header Variant Test</h1>
          <p>Switch variants and toggle render features on real iPhone Safari.</p>
        </div>

        <div className="variant-buttons">
          {VARIANT_OPTIONS.map((variant) => (
            <button
              key={variant}
              type="button"
              className={activeVariant === variant ? 'active' : ''}
              onClick={() => selectVariant(variant)}
            >
              {variant}
            </button>
          ))}
        </div>

        <div className="variant-summary">
          <strong>{VARIANT_LABELS[activeVariant]}</strong>
          <span>Query param: ?variant={activeVariant}</span>
        </div>

        <div className="flag-grid">
          {FEATURE_FLAGS.map((flag) => (
            <label key={flag} className="flag-toggle">
              <input
                type="checkbox"
                checked={featureFlags[flag]}
                onChange={() => toggleFeatureFlag(flag)}
              />
              <span>{flag}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="header-preview">
        <SelectedHeader />
      </section>

      <section className="content-body">
        <div className="content-card">
          <h2>Scroll performance test</h2>
          <p>This is a fake page area to verify scroll fluidity and fixed header behavior.</p>
        </div>
        <div className="content-spacer" />
      </section>

      <style jsx>{`
        .header-test-page {
          min-height: 100vh;
          background: #f8fafc;
          color: #0f172a;
          padding-bottom: 120px;
        }

        .control-panel {
          max-width: 1120px;
          margin: 0 auto 24px;
          padding: 24px 16px 12px;
          background: #ffffff;
          border-radius: 24px;
          border: 1px solid rgba(148, 163, 184, 0.18);
          box-shadow: 0 14px 30px rgba(15, 23, 42, 0.08);
        }

        .panel-heading h1 {
          margin: 0 0 8px;
          font-size: 24px;
          line-height: 1.2;
        }

        .panel-heading p {
          margin: 0;
          color: #475569;
          font-size: 15px;
        }

        .variant-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin: 18px 0;
        }

        .variant-buttons button {
          border: 1px solid rgba(15, 23, 42, 0.12);
          background: #ffffff;
          color: #0f172a;
          padding: 10px 16px;
          border-radius: 999px;
          cursor: pointer;
          transition: background-color 0.16s ease, transform 0.16s ease;
        }

        .variant-buttons button.active {
          background: #e0f2fe;
          border-color: #7dd3fc;
        }

        .variant-summary {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          align-items: center;
          margin-bottom: 16px;
          color: #475569;
        }

        .flag-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 12px;
        }

        .flag-toggle {
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(148, 163, 184, 0.18);
          border-radius: 14px;
          padding: 10px 14px;
          background: #f8fafc;
          cursor: pointer;
          user-select: none;
        }

        .flag-toggle input {
          accent-color: #0284c7;
        }

        .header-preview {
          position: relative;
          min-height: 300px;
          margin: 0 auto 24px;
          max-width: 1170px;
          background: #e2e8f0;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(148, 163, 184, 0.18);
          padding-top: 120px;
        }

        .content-body {
          max-width: 1170px;
          margin: 0 auto;
          padding: 16px;
        }

        .content-card {
          background: #ffffff;
          border-radius: 24px;
          border: 1px solid rgba(148, 163, 184, 0.18);
          padding: 22px;
          box-shadow: 0 14px 28px rgba(15, 23, 42, 0.08);
          margin-bottom: 18px;
        }

        .content-card h2 {
          margin: 0 0 10px;
          font-size: 20px;
        }

        .content-card p {
          margin: 0;
          color: #475569;
          line-height: 1.7;
        }

        .content-spacer {
          min-height: 2600px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.8), rgba(226, 232, 240, 0.6));
          border-radius: 24px;
        }
      `}</style>
    </main>
  );
}

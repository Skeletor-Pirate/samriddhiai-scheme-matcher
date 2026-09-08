import React from 'react';
import { Compass, Calculator, ShieldCheck, Sparkles } from 'lucide-react';
import { TranslationStrings } from '../utils/translations';

interface HeroSectionProps {
  t: TranslationStrings;
  onExploreRecommender: () => void;
  onExploreCalculator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  t,
  onExploreRecommender,
  onExploreCalculator
}) => {
  return (
    <section className="hero-section">
      <div className="app-container">
        <div className="hero-badge">
          <ShieldCheck size={16} />
          <span>{t.heroBadge}</span>
        </div>

        <h1 className="hero-title">{t.heroHeadline}</h1>
        <p className="hero-desc">{t.heroSubheadline}</p>

        <div className="hero-actions">
          <button className="btn-primary" onClick={onExploreRecommender}>
            <Compass size={18} />
            {t.heroCta1}
          </button>
          <button className="btn-secondary" onClick={onExploreCalculator}>
            <Calculator size={18} />
            {t.heroCta2}
          </button>
        </div>

        {/* 4 Core Pillars of the Concessional Scheme */}
        <div className="stats-grid">
          <div className="stat-card glass-card">
            <div className="stat-value amber">{t.statIncomeLimit}</div>
            <div className="stat-label">{t.statIncomeLabel}</div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-value cyan">{t.statAssistance}</div>
            <div className="stat-label">{t.statAssistanceLabel}</div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-value emerald">{t.statInterest}</div>
            <div className="stat-label">{t.statInterestLabel}</div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-value indigo">{t.statPartners}</div>
            <div className="stat-label">{t.statPartnersLabel}</div>
          </div>
        </div>

        {/* Channel Finance System Highlight Box */}
        <div
          style={{
            background: 'rgba(30, 41, 59, 0.5)',
            border: '1px solid rgba(56, 189, 248, 0.2)',
            borderRadius: '14px',
            padding: '16px 20px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.88rem',
            color: '#cbd5e1',
            maxWidth: '920px',
            textAlign: 'left'
          }}
        >
          <Sparkles size={20} style={{ color: '#38bdf8', flexShrink: 0 }} />
          <span>
            <strong>Channel Finance Routing Mechanism:</strong> Direct applications are routed through over 100 authorized Channel Partners (State Channelizing Agencies, Public Sector Banks, Regional Rural Banks, and NBFC-MFIs). SamriddhiAI automatically audits each partner's real-time fund utilization and NPA ratio to avoid stuck or delayed disbursements!
          </span>
        </div>
      </div>
    </section>
  );
};

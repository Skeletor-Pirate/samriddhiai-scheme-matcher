import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Calculator, 
  MapPin, 
  FileText, 
  Percent, 
  Calendar, 
  ArrowRight,
  RefreshCcw,
  IndianRupee,
  Users,
  Volume2
} from 'lucide-react';
import { UserInputProfile, SchemeRecommendation, SectorType, EducationLevel, GenderType, Scheme } from '../types';
import { recommendSchemes } from '../utils/aiRecommender';
import { formatIndianCurrency } from '../utils/calculator';
import { TranslationStrings, Language } from '../utils/translations';
import { VisualCards } from './VisualCards';
import { VoiceSpeechBar } from './VoiceSpeechBar';
import confetti from 'canvas-confetti';

interface RecommenderSectionProps {
  t: TranslationStrings;
  lang: Language;
  onSelectSchemeForCalc: (scheme: Scheme, cost: number, rate: number, tenure: number, moratorium: number) => void;
  onSelectSchemeForLocator: (scheme: Scheme) => void;
  onViewDocuments: (scheme: Scheme) => void;
  onSpeakText: (text: string) => void;
  isSpeaking: boolean;
}

export const RecommenderSection: React.FC<RecommenderSectionProps> = ({
  t,
  lang,
  onSelectSchemeForCalc,
  onSelectSchemeForLocator,
  onViewDocuments,
  onSpeakText,
  isSpeaking
}) => {
  const [profile, setProfile] = useState<UserInputProfile>({
    sector: 'micro_enterprise',
    estimatedCost: 140000,
    annualIncome: 250000,
    education: 'matriculate',
    gender: 'female',
    isExistingBusiness: false,
    state: 'Delhi',
    district: 'Central Delhi',
    pincode: '110001'
  });

  const [hasSubmitted, setHasSubmitted] = useState<boolean>(true);

  // Handle voice transcribed profile update
  const handleVoiceProfileParsed = (extracted: Partial<UserInputProfile>) => {
    setProfile(prev => ({
      ...prev,
      ...extracted
    }));
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.5 }
    });
  };

  // Auto-recalculate recommendations whenever inputs change
  const recommendations = useMemo(() => {
    return recommendSchemes(profile);
  }, [profile]);

  const handleRunMatch = () => {
    setHasSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleReset = () => {
    setProfile({
      sector: 'micro_enterprise',
      estimatedCost: 140000,
      annualIncome: 250000,
      education: 'matriculate',
      gender: 'female',
      isExistingBusiness: false,
      state: 'Delhi',
      district: 'Central Delhi',
      pincode: '110001'
    });
  };

  const isIncomeEligible = profile.annualIncome <= 500000;

  return (
    <section id="recommender-section" style={{ padding: '36px 0 60px 0' }}>
      <div className="app-container">
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={16} />
            <span>AI Matching Engine</span>
          </div>
          <h2 className="section-heading">{t.recHeader}</h2>
          <p className="section-subheading">{t.recSubheader}</p>
        </div>

        {/* VOICE-ENABLED REAL-TIME SPEECH BAR */}
        <VoiceSpeechBar
          lang={lang}
          onVoiceProfileParsed={handleVoiceProfileParsed}
          onReadAloud={() => {
            const summarySpeech = lang === 'hi' 
              ? `आपके लिए सर्वश्रेष्ठ योजना है: ${recommendations[0]?.scheme?.hindiName || 'सूक्ष्म वित्त योजना'}। इसमें 90 प्रतिशत तक रियायती ऋण सहायता उपलब्ध है।`
              : `The best matching scheme for you is ${recommendations[0]?.scheme?.name || 'Micro Finance Scheme'} with up to 90 percent concessional assistance.`;
            onSpeakText(summarySpeech);
          }}
          isReadingAloud={isSpeaking}
        />

        {/* VISUAL ONE-CLICK CATEGORY SELECTORS FOR RURAL / LOW-LITERACY USERS */}
        <VisualCards
          lang={lang}
          selectedSector={profile.sector}
          onSelectSector={(sector) => setProfile(prev => ({ ...prev, sector }))}
          selectedCost={profile.estimatedCost}
          onSelectCost={(estimatedCost) => setProfile(prev => ({ ...prev, estimatedCost }))}
          selectedIncomeTier={profile.annualIncome}
          onSelectIncomeTier={(annualIncome) => setProfile(prev => ({ ...prev, annualIncome }))}
          selectedGender={profile.gender}
          onSelectGender={(gender) => setProfile(prev => ({ ...prev, gender }))}
          onSpeakExplanation={onSpeakText}
        />

        {/* Detailed Fine-Tuning Slider Controls (Collapsible or Companion) */}
        <div className="glass-card" style={{ padding: '32px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
            <h4 style={{ color: '#38bdf8', fontSize: '1.05rem', fontWeight: 700 }}>
              {lang === 'hi' ? 'विस्तृत विवरण एवं स्लाइडर' : 'Detailed Profile Sliders'}
            </h4>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              {lang === 'hi' ? 'स्लाइडर को खींचकर सटीक राशि तय करें' : 'Drag sliders to customize exact rupee figures'}
            </span>
          </div>
          <div className="form-grid">
            {/* 1. Sector */}
            <div className="form-group">
              <label className="form-label">
                <span>{t.lblSector}</span>
                <span style={{ color: '#38bdf8', fontSize: '0.75rem' }}>Core Category</span>
              </label>
              <select
                className="form-select"
                value={profile.sector}
                onChange={(e) => setProfile({ ...profile, sector: e.target.value as SectorType })}
              >
                <option value="micro_enterprise">Micro Finance / Small Trades & Crafts (up to ₹1.40L - ₹5L)</option>
                <option value="women_entrepreneurship">Women Entrepreneurship & SHGs (Special 5% Rate)</option>
                <option value="agriculture">Agriculture, Dairy, Cattle & Allied Activities</option>
                <option value="term_loan">Term Loan / Manufacturing & Small Scale Units (up to ₹50L)</option>
                <option value="green_business">Green Business (E-Vehicles, Solar, Recycling up to ₹30L)</option>
                <option value="education_inland">Higher Education in India (Engineering, Medical, MBA up to ₹20L)</option>
                <option value="education_abroad">Higher Education Abroad (Masters/Ph.D. up to ₹30L)</option>
              </select>
            </div>

            {/* 2. Estimated Project Cost */}
            <div className="form-group">
              <div className="form-label">
                <span>{t.lblProjectCost}</span>
                <strong style={{ color: '#38bdf8', fontSize: '1.05rem' }}>
                  {formatIndianCurrency(profile.estimatedCost)}
                </strong>
              </div>
              <input
                type="range"
                className="range-slider"
                min={30000}
                max={5000000}
                step={10000}
                value={profile.estimatedCost}
                onChange={(e) => setProfile({ ...profile, estimatedCost: Number(e.target.value) })}
              />
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {[100000, 140000, 500000, 1500000, 3000000, 5000000].map((val) => (
                  <button
                    key={val}
                    type="button"
                    style={{
                      background: profile.estimatedCost === val ? 'rgba(56, 189, 248, 0.3)' : 'rgba(15, 23, 42, 0.7)',
                      border: '1px solid var(--color-border)',
                      color: profile.estimatedCost === val ? '#38bdf8' : '#94a3b8',
                      fontSize: '0.72rem',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                    onClick={() => setProfile({ ...profile, estimatedCost: val })}
                  >
                    ₹{(val / 100000).toFixed(val < 100000 ? 2 : val < 1000000 ? 1 : 0)}L
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Annual Family Income */}
            <div className="form-group">
              <div className="form-label">
                <span>{t.lblIncome}</span>
                <strong style={{ color: isIncomeEligible ? '#34d399' : '#f43f5e', fontSize: '1.05rem' }}>
                  {formatIndianCurrency(profile.annualIncome)}
                </strong>
              </div>
              <input
                type="range"
                className="range-slider"
                min={50000}
                max={900000}
                step={10000}
                value={profile.annualIncome}
                onChange={(e) => setProfile({ ...profile, annualIncome: Number(e.target.value) })}
              />
              {!isIncomeEligible ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f43f5e', fontSize: '0.78rem' }}>
                  <AlertTriangle size={14} />
                  <span>Exceeds statutory ₹5.00 Lakhs ceiling. Move slider below ₹5.00L to unlock full concessions.</span>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399', fontSize: '0.78rem' }}>
                  <CheckCircle2 size={14} />
                  <span>Eligible! Family income is below the ₹5.00 Lakhs statutory benchmark.</span>
                </div>
              )}
            </div>

            {/* 4. Education Status */}
            <div className="form-group">
              <label className="form-label">
                <span>{t.lblEducation}</span>
              </label>
              <select
                className="form-select"
                value={profile.education}
                onChange={(e) => setProfile({ ...profile, education: e.target.value as EducationLevel })}
              >
                <option value="below_10th">Below 10th / Artisan</option>
                <option value="matriculate">10th / 12th Pass</option>
                <option value="graduate">Graduate (B.A., B.Sc., B.Tech, B.Com)</option>
                <option value="post_graduate_professional">Post Graduate / Professional (Medical, MBA, M.Tech)</option>
              </select>
            </div>

            {/* 5. Gender */}
            <div className="form-group">
              <label className="form-label">
                <span>{t.lblGender}</span>
                <span style={{ color: '#fbbf24', fontSize: '0.75rem' }}>★ Women get 0.5% - 1% Interest Rebate</span>
              </label>
              <select
                className="form-select"
                value={profile.gender}
                onChange={(e) => setProfile({ ...profile, gender: e.target.value as GenderType })}
              >
                <option value="female">Female (Qualifies for Mahila Samriddhi & Concessional Rebates)</option>
                <option value="male">Male</option>
                <option value="transgender">Transgender</option>
              </select>
            </div>

            {/* 6. Enterprise Stage */}
            <div className="form-group">
              <label className="form-label">
                <span>{t.lblExistingBusiness}</span>
              </label>
              <select
                className="form-select"
                value={profile.isExistingBusiness ? 'existing' : 'new'}
                onChange={(e) => setProfile({ ...profile, isExistingBusiness: e.target.value === 'existing' })}
              >
                <option value="new">New Enterprise / Fresh Venture (Start-Up)</option>
                <option value="existing">Existing Business (Expansion / Modernization)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
            <button
              type="button"
              className="btn-secondary"
              style={{ padding: '10px 18px', fontSize: '0.85rem' }}
              onClick={handleReset}
            >
              <RefreshCcw size={14} />
              {t.btnReset}
            </button>
            <button
              type="button"
              className="btn-primary"
              style={{ padding: '10px 22px', fontSize: '0.9rem' }}
              onClick={handleRunMatch}
            >
              <Sparkles size={16} />
              {t.btnFindSchemes}
            </button>
          </div>
        </div>

        {/* Recommendation Results Grid */}
        {hasSubmitted && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.4rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>Recommended Concessional Schemes</span>
                <span style={{ fontSize: '0.8rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '3px 10px', borderRadius: '12px', fontWeight: 600 }}>
                  {recommendations.length} Schemes Analyzed
                </span>
              </h3>
            </div>

            <div className="schemes-grid">
              {recommendations.map((rec, index) => {
                const { scheme, matchScore, effectiveInterestRate, eligibleLoanAmount, promoterContribution, estimatedMonthlyEmi, matchingReasons, hindiMatchingReasons } = rec;
                const isTopMatch = index === 0;

                return (
                  <div
                    key={scheme.id}
                    className="scheme-card glass-card"
                    style={{
                      border: isTopMatch ? '2px solid rgba(56, 189, 248, 0.5)' : undefined,
                      boxShadow: isTopMatch ? '0 10px 30px rgba(56, 189, 248, 0.2)' : undefined
                    }}
                  >
                    {/* Top Match Badge */}
                    <div className="scheme-badge-match">
                      <Sparkles size={12} />
                      <span>{matchScore}% Match</span>
                    </div>

                    <div>
                      <span className="scheme-badge-code">{scheme.code}</span>
                      <h4 className="scheme-name">{lang === 'hi' ? scheme.hindiName : scheme.name}</h4>
                      <div className="scheme-hindi-name">
                        {lang === 'hi' ? scheme.name : scheme.hindiName}
                      </div>

                      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: '1.5', marginBottom: '16px' }}>
                        {lang === 'hi' ? scheme.hindiDescription : scheme.description}
                      </p>

                      {/* Key Financial Snapshot */}
                      <div className="scheme-stats-row">
                        <div className="stat-item">
                          <div className="stat-item-val" style={{ color: '#38bdf8' }}>
                            {effectiveInterestRate}%
                          </div>
                          <div className="stat-item-lbl">{t.effectiveRate}</div>
                        </div>

                        <div className="stat-item">
                          <div className="stat-item-val" style={{ color: '#34d399' }}>
                            {scheme.maxAssistancePct}%
                          </div>
                          <div className="stat-item-lbl">{t.maxAssistance}</div>
                        </div>

                        <div className="stat-item">
                          <div className="stat-item-val" style={{ color: '#fbbf24' }}>
                            {formatIndianCurrency(estimatedMonthlyEmi)}
                          </div>
                          <div className="stat-item-lbl">{t.estEmi}</div>
                        </div>
                      </div>

                      {/* Assistance vs Margin Breakdown */}
                      <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '10px 14px', borderRadius: '8px', marginBottom: '14px', fontSize: '0.8rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ color: '#94a3b8' }}>Eligible Concessional Loan:</span>
                          <strong style={{ color: '#38bdf8' }}>{formatIndianCurrency(eligibleLoanAmount)}</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#94a3b8' }}>Beneficiary Margin (Promoter):</span>
                          <strong style={{ color: '#fbbf24' }}>{formatIndianCurrency(promoterContribution)}</strong>
                        </div>
                      </div>

                      {/* Moratorium & Tenure Tag */}
                      <div style={{ display: 'flex', gap: '10px', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '16px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255, 255, 255, 0.05)', padding: '4px 8px', borderRadius: '4px' }}>
                          <Calendar size={13} style={{ color: '#38bdf8' }} />
                          Moratorium: {scheme.maxMoratoriumMonths} Months
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255, 255, 255, 0.05)', padding: '4px 8px', borderRadius: '4px' }}>
                          <Calendar size={13} style={{ color: '#34d399' }} />
                          Tenure: Up to {scheme.maxTenureYears} Yrs
                        </span>
                      </div>

                      {/* AI Matching Reasons Box */}
                      <div className="reasons-box">
                        <div className="reasons-title">{t.whyFitsYou}</div>
                        <ul className="reasons-list">
                          {(lang === 'hi' ? hindiMatchingReasons : matchingReasons).slice(0, 3).map((reason, rIdx) => (
                            <li key={rIdx}>
                              <CheckCircle2 size={13} style={{ color: '#38bdf8', flexShrink: 0, marginTop: '2px' }} />
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Actions on this scheme */}
                    <div className="scheme-actions">
                      <button
                        className="btn-card-primary"
                        onClick={() => onSelectSchemeForCalc(scheme, profile.estimatedCost, effectiveInterestRate, scheme.maxTenureYears, scheme.maxMoratoriumMonths)}
                        title="Open interactive calculator with this scheme data"
                      >
                        <Calculator size={15} />
                        <span>{t.calcEmiBtn}</span>
                      </button>

                      <button
                        className="btn-card-secondary"
                        onClick={() => onSelectSchemeForLocator(scheme)}
                        title="Locate channel partners capable of processing this scheme"
                      >
                        <MapPin size={15} />
                        <span>{t.locateBranchBtn}</span>
                      </button>

                      <button
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          color: '#fff',
                          border: 'none',
                          padding: '10px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        onClick={() => onViewDocuments(scheme)}
                        title="View list of required certificates"
                      >
                        <FileText size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

import React from 'react';
import { Landmark, Compass, Calculator, MapPin, FileCheck2, Globe, Volume2, VolumeX } from 'lucide-react';
import { Language, TranslationStrings } from '../utils/translations';

interface NavbarProps {
  currentTab: 'recommender' | 'calculator' | 'locator' | 'dossier';
  setCurrentTab: (tab: 'recommender' | 'calculator' | 'locator' | 'dossier') => void;
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationStrings;
  isVoiceActive: boolean;
  toggleVoice: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  lang,
  setLang,
  t,
  isVoiceActive,
  toggleVoice
}) => {
  return (
    <header className="navbar">
      <div className="app-container nav-content">
        <div className="brand-wrapper" onClick={() => setCurrentTab('recommender')}>
          <div className="brand-icon">
            <Landmark size={24} />
          </div>
          <div>
            <div className="brand-title">
              {t.appTitle}
              <span style={{ fontSize: '0.65rem', background: '#f59e0b', color: '#000', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>
                SC-FIN
              </span>
            </div>
            <div className="brand-subtitle">{t.appSubtitle}</div>
          </div>
        </div>

        <nav className="nav-links">
          <button
            className={`nav-btn ${currentTab === 'recommender' ? 'active' : ''}`}
            onClick={() => setCurrentTab('recommender')}
          >
            <Compass size={16} />
            {t.navRecommender}
          </button>
          <button
            className={`nav-btn ${currentTab === 'calculator' ? 'active' : ''}`}
            onClick={() => setCurrentTab('calculator')}
          >
            <Calculator size={16} />
            {t.navCalculator}
          </button>
          <button
            className={`nav-btn ${currentTab === 'locator' ? 'active' : ''}`}
            onClick={() => setCurrentTab('locator')}
          >
            <MapPin size={16} />
            {t.navLocator}
          </button>
          <button
            className={`nav-btn ${currentTab === 'dossier' ? 'active' : ''}`}
            onClick={() => setCurrentTab('dossier')}
          >
            <FileCheck2 size={16} />
            {t.navDossier}
          </button>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Voice Assistant Toggle */}
          <button
            onClick={toggleVoice}
            className={`voice-trigger-btn ${isVoiceActive ? 'speaking' : ''}`}
            title="Read screen content aloud"
          >
            {isVoiceActive ? <VolumeX size={15} /> : <Volume2 size={15} />}
            <span>{isVoiceActive ? 'Stop Voice' : 'Voice Guide'}</span>
          </button>

          {/* Language Toggle */}
          <div className="lang-selector">
            <Globe size={14} style={{ color: '#94a3b8', marginLeft: '4px' }} />
            <button
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
            >
              EN
            </button>
            <button
              className={`lang-btn ${lang === 'hi' ? 'active' : ''}`}
              onClick={() => setLang('hi')}
            >
              हिन्दी
            </button>
            <button
              className={`lang-btn ${lang === 'ta' ? 'active' : ''}`}
              onClick={() => setLang('ta')}
            >
              தமிழ்
            </button>
            <button
              className={`lang-btn ${lang === 'mr' ? 'active' : ''}`}
              onClick={() => setLang('mr')}
            >
              मराठी
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

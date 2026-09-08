import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { VoiceAssistantBar } from './components/VoiceAssistantBar';
import { HeroSection } from './components/HeroSection';
import { RecommenderSection } from './components/RecommenderSection';
import { CalculatorSection } from './components/CalculatorSection';
import { PartnerLocatorSection } from './components/PartnerLocatorSection';
import { ApplicationDossierModal } from './components/ApplicationDossierModal';
import { SchemeDetailsModal } from './components/SchemeDetailsModal';
import { Scheme, ChannelPartner } from './types';
import { TRANSLATIONS, Language } from './utils/translations';
import { SCHEMES_DATABASE } from './data/schemes';
import { CHANNEL_PARTNERS_DATABASE } from './data/partners';
import { 
  Landmark, 
  HeartHandshake, 
  HelpCircle, 
  ShieldCheck, 
  PhoneCall, 
  CheckCircle2, 
  Award 
} from 'lucide-react';

export function App() {
  const [currentTab, setCurrentTab] = useState<'recommender' | 'calculator' | 'locator' | 'dossier'>('recommender');
  const [lang, setLang] = useState<Language>('en');
  const [isVoiceActive, setIsVoiceActive] = useState<boolean>(false);
  const [voiceStatusText, setVoiceStatusText] = useState<string>('');

  // Cross-component state
  const [activeSchemeForCalc, setActiveSchemeForCalc] = useState<Scheme | null>(null);
  const [calcPrefillParams, setCalcPrefillParams] = useState({
    cost: 500000,
    rate: 6.5,
    tenure: 5,
    moratorium: 6
  });

  const [activeSchemeForLocator, setActiveSchemeForLocator] = useState<Scheme | null>(null);
  const [activePartnerForDossier, setActivePartnerForDossier] = useState<ChannelPartner | null>(CHANNEL_PARTNERS_DATABASE[0]);
  const [selectedSchemeForDocs, setSelectedSchemeForDocs] = useState<Scheme | null>(null);
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);

  const t = TRANSLATIONS[lang];

  // Web Speech API Integration
  const toggleVoice = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isVoiceActive) {
      window.speechSynthesis.cancel();
      setIsVoiceActive(false);
      setVoiceStatusText('');
      return;
    }

    let speechText = '';
    if (lang === 'hi') {
      speechText = 'समृद्धि एआई में आपका स्वागत है। यदि आपकी वार्षिक पारिवारिक आय पांच लाख रुपये तक है, तो आप 90 प्रतिशत तक रियायती ऋण प्राप्त कर सकते हैं। अपना व्यवसाय क्षेत्र और लागत चुनकर सर्वोत्तम योजना की जांच करें।';
    } else {
      speechText = 'Welcome to SamriddhiAI. If your annual family income is up to 5 Lakh Rupees, you are eligible for up to 90 percent concessional credit at 6.5 to 8 percent interest. Select your sector and project cost to find your matching scheme.';
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.rate = 0.95;
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';

    utterance.onstart = () => {
      setIsVoiceActive(true);
      setVoiceStatusText(speechText);
    };

    utterance.onend = () => {
      setIsVoiceActive(false);
      setVoiceStatusText('');
    };

    utterance.onerror = () => {
      setIsVoiceActive(false);
      setVoiceStatusText('');
    };

    window.speechSynthesis.speak(utterance);
  };

  // Switch to Calculator with selected scheme
  const handleSelectSchemeForCalc = (
    scheme: Scheme,
    cost: number,
    rate: number,
    tenure: number,
    moratorium: number
  ) => {
    setActiveSchemeForCalc(scheme);
    setCalcPrefillParams({ cost, rate, tenure, moratorium });
    setCurrentTab('calculator');
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  // Switch to Locator with selected scheme
  const handleSelectSchemeForLocator = (scheme: Scheme) => {
    setActiveSchemeForLocator(scheme);
    setCurrentTab('locator');
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  // Open Routing Dossier for a Partner
  const handleRouteToPartner = (partner: ChannelPartner) => {
    setActivePartnerForDossier(partner);
    setIsDossierOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lang={lang}
        setLang={setLang}
        t={t}
        isVoiceActive={isVoiceActive}
        toggleVoice={toggleVoice}
      />

      {/* Voice Assistant Banner */}
      <VoiceAssistantBar
        isVoiceActive={isVoiceActive}
        toggleVoice={toggleVoice}
        statusText={voiceStatusText}
        t={t}
      />

      {/* Hero Section */}
      <HeroSection
        t={t}
        onExploreRecommender={() => {
          setCurrentTab('recommender');
          document.getElementById('recommender-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onExploreCalculator={() => {
          setCurrentTab('calculator');
          document.getElementById('calculator-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Tab Content */}
      <main>
        {currentTab === 'recommender' && (
          <RecommenderSection
            t={t}
            lang={lang}
            onSelectSchemeForCalc={handleSelectSchemeForCalc}
            onSelectSchemeForLocator={handleSelectSchemeForLocator}
            onViewDocuments={(scheme) => setSelectedSchemeForDocs(scheme)}
            onSpeakText={(text) => {
              window.speechSynthesis.cancel();
              const utterance = new SpeechSynthesisUtterance(text);
              utterance.rate = 0.95;
              utterance.lang = lang === 'hi' ? 'hi-IN' : lang === 'ta' ? 'ta-IN' : lang === 'mr' ? 'mr-IN' : 'en-IN';
              utterance.onstart = () => {
                setIsVoiceActive(true);
                setVoiceStatusText(text);
              };
              utterance.onend = () => {
                setIsVoiceActive(false);
                setVoiceStatusText('');
              };
              utterance.onerror = () => {
                setIsVoiceActive(false);
                setVoiceStatusText('');
              };
              window.speechSynthesis.speak(utterance);
            }}
            isSpeaking={isVoiceActive}
          />
        )}

        {currentTab === 'calculator' && (
          <CalculatorSection
            t={t}
            prefillScheme={activeSchemeForCalc}
            initialCost={calcPrefillParams.cost}
            initialRate={calcPrefillParams.rate}
            initialTenure={calcPrefillParams.tenure}
            initialMoratorium={calcPrefillParams.moratorium}
            onNavigateToLocator={() => setCurrentTab('locator')}
          />
        )}

        {currentTab === 'locator' && (
          <PartnerLocatorSection
            t={t}
            lang={lang}
            selectedScheme={activeSchemeForLocator}
            onRouteToPartner={handleRouteToPartner}
          />
        )}

        {currentTab === 'dossier' && (
          <div className="app-container" style={{ padding: '60px 0', textAlign: 'center' }}>
            <div className="glass-card" style={{ maxWidth: '640px', margin: '0 auto', padding: '40px' }}>
              <Award size={48} style={{ color: '#38bdf8', margin: '0 auto 16px auto' }} />
              <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '12px' }}>
                Verified Channel Dispatch Dossier
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: '1.6', marginBottom: '24px' }}>
                Your pre-screening certificate routes your application directly to accredited Channel Partner branches with unutilized fund allocations and safe NPA health.
              </p>
              <button
                className="btn-primary"
                onClick={() => setIsDossierOpen(true)}
              >
                View & Print Current Active Dossier
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Documents Modal */}
      {selectedSchemeForDocs && (
        <SchemeDetailsModal
          scheme={selectedSchemeForDocs}
          onClose={() => setSelectedSchemeForDocs(null)}
        />
      )}

      {/* Application Dossier Modal */}
      <ApplicationDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        partner={activePartnerForDossier}
        scheme={activeSchemeForCalc || SCHEMES_DATABASE[0]}
        projectCost={calcPrefillParams.cost}
        loanAmount={Math.round(calcPrefillParams.cost * 0.9)}
        promoterEquity={Math.round(calcPrefillParams.cost * 0.1)}
        interestRate={calcPrefillParams.rate}
        t={t}
      />

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--color-border)',
          background: 'rgba(11, 17, 32, 0.95)',
          padding: '48px 0 24px 0',
          marginTop: '60px',
          fontSize: '0.85rem',
          color: '#64748b'
        }}
      >
        <div className="app-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px', marginBottom: '36px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontSize: '1.1rem', fontWeight: 800, marginBottom: '10px' }}>
                <Landmark size={20} style={{ color: '#38bdf8' }} />
                <span>SamriddhiAI</span>
              </div>
              <p style={{ lineHeight: '1.6', color: '#94a3b8' }}>
                AI-driven concessional finance matching and intelligent channel router for Scheduled Caste entrepreneurs and students under the National Scheduled Castes Finance & Development Corporation (NSFDC) framework.
              </p>
            </div>

            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '12px' }}>Concessional Highlights</h4>
              <ul style={{ listStyle: 'none', lineHeight: '2' }}>
                <li>✓ Annual Family Income Limit: Up to ₹5.00 Lakhs</li>
                <li>✓ Apex Financial Assistance: Up to 90% Unit Cost</li>
                <li>✓ Concessional Interest Rate: 5.0% – 8.0% p.a.</li>
                <li>✓ Moratorium Period: 3 to 12 Months (Course duration for Education)</li>
              </ul>
            </div>

            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '12px' }}>Channel Finance Ecosystem</h4>
              <ul style={{ listStyle: 'none', lineHeight: '2' }}>
                <li>• State Channelizing Agencies (SCAs)</li>
                <li>• Public Sector Commercial Banks (PSBs)</li>
                <li>• Regional Rural Banks (RRBs)</li>
                <li>• Authorized Microfinance Institutions (NBFC-MFIs)</li>
              </ul>
            </div>

            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '12px' }}>National Helpline</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', marginBottom: '6px', fontWeight: 700 }}>
                <PhoneCall size={16} />
                <span>Toll Free: 1800-11-8866 / 011-22054394</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                Ministry of Social Justice & Empowerment, Govt. of India
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '20px', textAlign: 'center', fontSize: '0.78rem' }}>
            © 2026 SamriddhiAI. Built for inclusive economic empowerment and transparent channel finance routing.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

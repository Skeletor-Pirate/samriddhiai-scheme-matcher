import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { TranslationStrings } from '../utils/translations';

interface VoiceAssistantBarProps {
  isVoiceActive: boolean;
  toggleVoice: () => void;
  statusText: string;
  t: TranslationStrings;
}

export const VoiceAssistantBar: React.FC<VoiceAssistantBarProps> = ({
  isVoiceActive,
  toggleVoice,
  statusText,
  t
}) => {
  return (
    <div className="voice-bar">
      <div className="app-container voice-bar-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#93c5fd' }}>
          <Sparkles size={16} style={{ color: '#38bdf8' }} />
          <span>
            <strong>{t.voiceHelp}:</strong> {statusText || t.listenGuide}
          </span>
        </div>

        <button
          onClick={toggleVoice}
          className={`voice-trigger-btn ${isVoiceActive ? 'speaking' : ''}`}
        >
          {isVoiceActive ? <VolumeX size={14} /> : <Volume2 size={14} />}
          <span>{isVoiceActive ? 'Stop Voice' : 'Listen Now'}</span>
        </button>
      </div>
    </div>
  );
};

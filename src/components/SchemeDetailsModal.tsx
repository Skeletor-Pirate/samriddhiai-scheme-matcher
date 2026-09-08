import React from 'react';
import { FileText, CheckCircle2, ShieldAlert, Sparkles, Download } from 'lucide-react';
import { Scheme } from '../types';
import { formatIndianCurrency } from '../utils/calculator';

interface SchemeDetailsModalProps {
  scheme: Scheme | null;
  onClose: () => void;
}

export const SchemeDetailsModal: React.FC<SchemeDetailsModalProps> = ({ scheme, onClose }) => {
  if (!scheme) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <span className="scheme-badge-code">{scheme.code}</span>
            <h3 style={{ fontSize: '1.35rem', color: '#fff' }}>{scheme.name}</h3>
            <div style={{ fontSize: '0.9rem', color: '#fbbf24', marginTop: '2px' }}>{scheme.hindiName}</div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.5rem', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        {/* Overview Box */}
        <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid var(--color-border)', borderRadius: '10px', padding: '16px', marginBottom: '20px' }}>
          <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: '1.5' }}>{scheme.description}</p>
          <div style={{ marginTop: '10px', display: 'flex', gap: '16px', fontSize: '0.8rem', color: '#94a3b8' }}>
            <span>Max Project Cost: <strong style={{ color: '#38bdf8' }}>{formatIndianCurrency(scheme.maxProjectCost)}</strong></span>
            <span>Interest Rate: <strong style={{ color: '#fbbf24' }}>{scheme.baseInterestRate}% p.a.</strong></span>
          </div>
        </div>

        {/* Required Documents Checklist */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '1rem', color: '#38bdf8', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} />
            <span>Statutory Document Readiness Checklist</span>
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {scheme.documentsRequired.map((doc, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  background: 'rgba(30, 41, 59, 0.4)',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  fontSize: '0.85rem',
                  color: '#e2e8f0'
                }}
              >
                <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
                <span>{doc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Highlights */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '0.95rem', color: '#fff', marginBottom: '10px' }}>Key Scheme Highlights</h4>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.82rem', color: '#94a3b8' }}>
            {scheme.keyHighlights.map((hl, idx) => (
              <li key={idx} style={{ marginBottom: '6px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <Sparkles size={14} style={{ color: '#fbbf24', flexShrink: 0, marginTop: '2px' }} />
                <span>{hl}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ textAlign: 'right' }}>
          <button className="btn-secondary" onClick={onClose}>
            Got it, Close
          </button>
        </div>
      </div>
    </div>
  );
};

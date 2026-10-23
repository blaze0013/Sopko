import React from 'react';

export function OnboardingModal({ isOpen, onClose, onLoadSampleData }) {
  if (!isOpen) return null;

  const steps = [
    {
      num: 1,
      title: 'Add goods',
      desc: 'Quickly restock incoming crates or add new products with low-stock alerts.'
    },
    {
      num: 2,
      title: 'Record sales',
      desc: 'One tap behind the counter during customer rushes with zero math errors.'
    },
    {
      num: 3,
      title: 'Check your day',
      desc: "Glance at Today's Sales in ₹ and see which items are running out in real time."
    },
    {
      num: 4,
      title: 'Take it with you',
      desc: 'One-tap CSV export backs up your data and opens directly in Excel or Google Sheets.'
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '32px', marginBottom: '6px' }}>🏪</div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-hero)' }}>
            Welcome to Sopko
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Lightweight stock and sales tracking for kirana stores.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
          {steps.map((s) => (
            <div key={s.num} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  minWidth: '28px',
                  borderRadius: '50%',
                  backgroundColor: '#407A45',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '2px'
                }}
              >
                {s.num}
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {s.title}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {s.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            className="btn-primary"
            style={{
              backgroundColor: 'var(--btn-onboard-bg)',
              width: '100%',
              height: '46px',
              fontSize: '16px'
            }}
            onClick={onClose}
          >
            Got it, let's start!
          </button>
          <button
            className="btn-secondary"
            style={{ width: '100%', height: '44px' }}
            onClick={() => {
              onLoadSampleData();
              onClose();
            }}
          >
            Load Sample Kirana Data
          </button>
        </div>
      </div>
    </div>
  );
}

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
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px', padding: '20px 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div style={{ fontSize: '30px', marginBottom: '4px' }}>🏪</div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-hero)' }}>
            Welcome to Sopko
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Lightweight stock and sales tracking for kirana stores.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
          {steps.map((s) => (
            <div key={s.num} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  minWidth: '26px',
                  borderRadius: '50%',
                  backgroundColor: '#407A45',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '1px'
                }}
              >
                {s.num}
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {s.title}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
                  {s.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            className="btn-primary"
            style={{
              backgroundColor: 'var(--btn-onboard-bg)',
              width: '100%',
              height: '46px',
              fontSize: '15px'
            }}
            onClick={onClose}
          >
            Got it, let's start!
          </button>
          <button
            className="btn-secondary"
            style={{ width: '100%', height: '42px', fontSize: '14px' }}
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

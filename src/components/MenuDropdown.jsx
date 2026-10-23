import React, { useEffect, useRef } from 'react';
import { Download, RefreshCw, HelpCircle, FileSpreadsheet, Trash2 } from 'lucide-react';

export function MenuDropdown({
  isOpen,
  onClose,
  onExport,
  onLoadSampleData,
  onResetData,
  onOpenGuide
}) {
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      style={{
        position: 'absolute',
        top: '52px',
        right: '16px',
        backgroundColor: 'var(--bg-surface)',
        border: 'var(--border-card)',
        borderRadius: 'var(--radius-card)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
        width: '240px',
        zIndex: 50,
        overflow: 'hidden',
        animation: 'fadeIn 0.15s ease'
      }}
    >
      <div style={{ padding: '8px 14px', fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #ECEAE4' }}>
        Export to Spreadsheet
      </div>

      <button
        className="menu-item-btn"
        onClick={() => {
          onExport('sales');
          onClose();
        }}
      >
        <FileSpreadsheet size={16} color="#2E6F34" />
        <span>Export Sales CSV</span>
      </button>

      <button
        className="menu-item-btn"
        onClick={() => {
          onExport('stockIn');
          onClose();
        }}
      >
        <FileSpreadsheet size={16} color="#2E6F34" />
        <span>Export Stock In CSV</span>
      </button>

      <button
        className="menu-item-btn"
        onClick={() => {
          onExport('inventory');
          onClose();
        }}
      >
        <FileSpreadsheet size={16} color="#2E6F34" />
        <span>Export Current Stock CSV</span>
      </button>

      <div style={{ height: '1px', backgroundColor: '#ECEAE4', margin: '4px 0' }} />

      <button
        className="menu-item-btn"
        onClick={() => {
          onLoadSampleData();
          onClose();
        }}
      >
        <RefreshCw size={16} color="#52606D" />
        <span>Load Sample Data</span>
      </button>

      <button
        className="menu-item-btn"
        style={{ color: '#B91C1C' }}
        onClick={() => {
          onResetData();
          onClose();
        }}
      >
        <Trash2 size={16} color="#B91C1C" />
        <span>Reset all data</span>
      </button>

      <div style={{ height: '1px', backgroundColor: '#ECEAE4', margin: '4px 0' }} />

      <button
        className="menu-item-btn"
        onClick={() => {
          onOpenGuide();
          onClose();
        }}
      >
        <HelpCircle size={16} color="#2B6CB0" />
        <span style={{ color: 'var(--text-link)', textDecoration: 'underline' }}>How it works</span>
      </button>
    </div>
  );
}

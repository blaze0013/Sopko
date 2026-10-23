import React from 'react';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

export function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav className="bottom-nav">
      <button
        className={`nav-tab-btn ${activeTab === 'stock-out' ? 'active' : ''}`}
        onClick={() => onTabChange('stock-out')}
        aria-label="Stock out - Sales"
      >
        <ArrowUpRight strokeWidth={2.5} />
        <span>Stock out</span>
      </button>

      <button
        className={`nav-tab-btn ${activeTab === 'stock-in' ? 'active' : ''}`}
        onClick={() => onTabChange('stock-in')}
        aria-label="Stock in - Receiving"
      >
        <ArrowDownLeft strokeWidth={2.5} />
        <span>Stock in</span>
      </button>
    </nav>
  );
}

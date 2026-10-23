import React from 'react';
import { formatRupees } from '../utils/currency.js';
import { formatHeaderDate, isToday } from '../utils/date.js';

export function Header({ items, sales, onMenuClick }) {
  // Calculate today's sales total
  const todaySalesTotal = sales
    .filter((s) => isToday(s.soldAt))
    .reduce((sum, s) => sum + (s.totalAmount || 0), 0);

  // Count items with low stock (0 < currentStock <= lowStockThreshold)
  const lowStockCount = items.filter(
    (i) => !i.archived && i.currentStock > 0 && i.currentStock <= i.lowStockThreshold
  ).length;

  const outOfStockCount = items.filter(
    (i) => !i.archived && i.currentStock === 0
  ).length;

  return (
    <header className="app-header">
      <div className="header-top-row">
        <div>
          <span className="header-brand">Sopko</span>
          <span style={{ margin: '0 8px', color: '#B0B8B2' }}>•</span>
          <span className="header-date">{formatHeaderDate()}</span>
        </div>
        <button
          className="header-menu-btn"
          aria-label="More options"
          onClick={onMenuClick}
        >
          ⋮
        </button>
      </div>

      <div className="header-metric-row">
        <div>
          <div className="metric-title">Today's Sales</div>
          <div className="metric-value">{formatRupees(todaySalesTotal)}</div>
        </div>

        <div>
          {outOfStockCount > 0 ? (
            <span className="status-pill out-of-stock" style={{ marginRight: '6px' }}>
              {outOfStockCount} out
            </span>
          ) : null}

          {lowStockCount > 0 ? (
            <span className="status-pill low-stock">
              {lowStockCount} low stock
            </span>
          ) : outOfStockCount === 0 ? (
            <span className="status-pill in-stock">
              All stocked
            </span>
          ) : null}
        </div>
      </div>
    </header>
  );
}


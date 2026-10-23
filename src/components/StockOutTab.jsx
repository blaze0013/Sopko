import React, { useState } from 'react';
import { formatRupees } from '../utils/currency.js';

export function StockOutTab({ items, onSelectItem, onLoadSampleData, onGoToStockIn }) {
  const [query, setQuery] = useState('');

  const activeItems = items.filter((i) => !i.archived);
  const filtered = activeItems.filter((i) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      i.name.toLowerCase().includes(q) ||
      (i.code && i.code.toLowerCase().includes(q))
    );
  });

  if (activeItems.length === 0) {
    return (
      <div className="content-area">
        <div className="empty-state-box">
          <div style={{ fontSize: '42px' }}>🏪</div>
          <div className="empty-title">Welcome to Sopko!</div>
          <div className="empty-desc">
            Your stock list is currently empty. You can add items one by one, or load realistic sample items to explore.
          </div>
          <button
            className="btn-primary"
            onClick={onLoadSampleData}
            style={{ width: '100%', maxWidth: '280px', marginTop: '8px' }}
          >
            Load Sample Data
          </button>
          <button
            className="btn-secondary"
            onClick={onGoToStockIn}
            style={{ width: '100%', maxWidth: '280px' }}
          >
            + Add First Item
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="content-area">
      <div className="search-bar-row">
        <input
          type="search"
          className="search-input"
          placeholder="Search items to sell..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="btn-secondary"
          title="Reload sample kirana store data"
          onClick={onLoadSampleData}
        >
          Sample Data
        </button>
      </div>

      <div className="items-list">
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-secondary)' }}>
            No matching items found for "{query}".
          </div>
        ) : (
          filtered.map((item) => {
            const isOutOfStock = item.currentStock === 0;
            const isLowStock = !isOutOfStock && item.currentStock <= item.lowStockThreshold;

            let pillClass = 'status-pill in-stock';
            let pillText = `${item.currentStock} left`;

            if (isOutOfStock) {
              pillClass = 'status-pill out-of-stock';
              pillText = 'Out of stock';
            } else if (isLowStock) {
              pillClass = 'status-pill low-stock';
              pillText = `${item.currentStock} left (Low)`;
            }

            return (
              <div
                key={item.id}
                className={`item-card ${isOutOfStock ? 'is-out' : ''}`}
                onClick={() => onSelectItem(item)}
              >
                <div className="item-info">
                  <div className="item-name">{item.name}</div>
                  <div className="item-meta">
                    {item.unit && <span>{item.unit}</span>}
                    {item.code && <span>• #{item.code}</span>}
                  </div>
                </div>

                <div className="item-pricing">
                  <div className="item-price">{formatRupees(item.sellPrice)}</div>
                  <span className={pillClass}>{pillText}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}


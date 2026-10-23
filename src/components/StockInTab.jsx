import React, { useState } from 'react';
import { formatRupees } from '../utils/currency.js';
import { Plus } from 'lucide-react';

export function StockInTab({ items, onSelectRestock, onOpenNewItemModal }) {
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

  return (
    <div className="content-area">
      <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
        <input
          type="search"
          className="search-input"
          placeholder="Search items to restock..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="btn-primary"
          onClick={onOpenNewItemModal}
          style={{ whiteSpace: 'nowrap' }}
        >
          <Plus size={18} />
          <span>New Item</span>
        </button>
      </div>

      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
        Tap any product below to log arriving stock & cost:
      </div>

      <div className="items-list">
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-secondary)' }}>
            No products found matching "{query}".
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="item-card"
              onClick={() => onSelectRestock(item)}
            >
              <div className="item-info">
                <div className="item-name">{item.name}</div>
                <div className="item-meta">
                  <span>Current: <strong>{item.currentStock} {item.unit || 'units'}</strong></span>
                  {item.code && <span>• #{item.code}</span>}
                </div>
              </div>

              <div className="item-pricing">
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Last Cost:</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  {formatRupees(item.costPrice)}
                </div>
                <span className="status-pill in-stock" style={{ background: '#E0EAE2', color: '#1B4D20' }}>
                  + Restock
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

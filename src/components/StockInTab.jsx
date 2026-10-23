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
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', alignItems: 'center' }}>
        <input
          type="search"
          className="search-input"
          style={{ minWidth: 0, flex: 1 }}
          placeholder="Search items..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="btn-primary"
          onClick={onOpenNewItemModal}
          style={{ whiteSpace: 'nowrap', flexShrink: 0, padding: '0 12px', fontSize: '14px' }}
        >
          <Plus size={16} />
          <span>+ New</span>
        </button>
      </div>

      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
        Tap any product below to log arriving delivery:
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
              style={{ alignItems: 'center', gap: '10px' }}
            >
              <div className="item-info" style={{ minWidth: 0 }}>
                <div className="item-name" style={{ wordBreak: 'break-word' }}>{item.name}</div>
                
                {/* Last cost under item name */}
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Last cost: <strong>{formatRupees(item.costPrice)}</strong>
                </div>

                {/* Stock count and meta line */}
                <div style={{ marginTop: '4px', display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: item.currentStock === 0 ? 'var(--pill-out-text)' : 'var(--text-primary)' }}>
                    {item.currentStock} in stock
                  </span>
                  
                  {(item.unit || item.code) && (
                    <span style={{ fontSize: '12px', color: '#8A918C' }}>
                      {item.unit && <span style={{ whiteSpace: 'nowrap' }}>• {item.unit}</span>}
                      {item.code && <span className="barcode-tag" style={{ marginLeft: '4px' }}>#{item.code}</span>}
                    </span>
                  )}
                </div>
              </div>

              {/* Restock button on the right */}
              <div style={{ flexShrink: 0 }}>
                <span
                  className="status-pill in-stock"
                  style={{
                    backgroundColor: '#E0EAE2',
                    color: '#1B4D20',
                    padding: '6px 14px',
                    fontSize: '13px',
                    fontWeight: 700,
                    display: 'inline-block',
                    whiteSpace: 'nowrap'
                  }}
                >
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

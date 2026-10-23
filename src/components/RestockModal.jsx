import React, { useState } from 'react';
import { paiseToRupees, rupeesToPaise } from '../utils/currency.js';
import { getLocalTodayString } from '../utils/date.js';

export function RestockModal({ item, onClose, onConfirmRestock }) {
  if (!item) return null;

  const [quantity, setQuantity] = useState(10);
  const [costRupees, setCostRupees] = useState(() =>
    paiseToRupees(item.costPrice).toString()
  );
  const [receivedAt, setReceivedAt] = useState(() => getLocalTodayString());

  const handleSubmit = (e) => {
    e.preventDefault();
    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) {
      alert('Please enter a valid quantity received');
      return;
    }

    const unitCostPaise = rupeesToPaise(costRupees);

    onConfirmRestock({
      itemId: item.id,
      quantity: qty,
      unitCost: unitCostPaise,
      receivedAt: new Date(receivedAt).toISOString()
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Restock Item</h2>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Current stock: <strong>{item.currentStock} {item.unit || 'units'}</strong>
            </div>
          </div>
          <button className="sheet-close-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>
              Item Name
            </label>
            <input
              type="text"
              className="search-input"
              value={item.name}
              disabled
              style={{ backgroundColor: '#F2F4F7', color: 'var(--text-secondary)', cursor: 'not-allowed' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>
              Quantity Received *
            </label>
            <input
              type="number"
              className="search-input"
              min="1"
              required
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g. 10"
              autoFocus
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>
              Delivery Cost Price per unit (₹)
            </label>
            <div className="price-input-box" style={{ width: '100%' }}>
              <span>₹</span>
              <input
                type="number"
                step="any"
                className="price-input"
                value={costRupees}
                onChange={(e) => setCostRupees(e.target.value)}
                placeholder="e.g. 24"
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>
              Date Received
            </label>
            <input
              type="date"
              className="search-input"
              value={receivedAt}
              onChange={(e) => setReceivedAt(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button
              type="button"
              className="btn-secondary"
              style={{ flex: 1 }}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              style={{ flex: 2 }}
            >
              Add to Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

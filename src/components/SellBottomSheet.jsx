import React, { useState } from 'react';
import { formatRupees, paiseToRupees, rupeesToPaise } from '../utils/currency.js';

export function SellBottomSheet({ item, onClose, onConfirmSale }) {
  if (!item) return null;

  const maxStock = item.currentStock;
  const [quantity, setQuantity] = useState(1);
  const [customPriceRupees, setCustomPriceRupees] = useState(() =>
    paiseToRupees(item.sellPrice).toString()
  );

  const isAtMaxStock = quantity >= maxStock;
  const priceInPaise = rupeesToPaise(customPriceRupees);
  const totalInPaise = Math.max(0, quantity * priceInPaise);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < maxStock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleQuantityChange = (e) => {
    const rawVal = e.target.value;
    if (rawVal === '') {
      setQuantity(0);
      return;
    }
    const val = parseInt(rawVal, 10);
    if (isNaN(val)) return;

    // Strict boundary: quantity can NEVER exceed current stock
    if (val > maxStock) {
      setQuantity(maxStock);
    } else if (val < 0) {
      setQuantity(0);
    } else {
      setQuantity(val);
    }
  };

  const handleConfirm = () => {
    if (quantity < 1 || quantity > maxStock || priceInPaise <= 0) return;
    onConfirmSale({
      itemId: item.id,
      quantity,
      unitPrice: priceInPaise
    });
  };

  return (
    <div className="bottom-sheet-backdrop" onClick={onClose}>
      <div className="bottom-sheet-panel" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />

        <div className="sheet-header">
          <div style={{ minWidth: 0, flex: 1 }}>
            <div className="sheet-title" style={{ wordBreak: 'break-word' }}>{item.name}</div>
            <div style={{ marginTop: '4px', display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span className="status-pill in-stock">
                {maxStock} available
              </span>
              {item.unit && (
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                  Unit: {item.unit}
                </span>
              )}
            </div>
          </div>
          <button className="sheet-close-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {/* Quantity Stepper Row */}
        <div className="sheet-row" style={{ flexWrap: 'wrap', gap: '8px' }}>
          <span className="sheet-label">Quantity to Sell:</span>
          <div className="stepper-container">
            <button
              type="button"
              className="stepper-btn"
              onClick={handleDecrement}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <input
              type="number"
              className="stepper-input"
              value={quantity === 0 ? '' : quantity}
              min="1"
              max={maxStock}
              onChange={handleQuantityChange}
            />
            <button
              type="button"
              className={`stepper-btn ${isAtMaxStock ? 'is-disabled' : ''}`}
              onClick={handleIncrement}
              disabled={isAtMaxStock}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        {/* Stock-limit amber note when quantity reaches available stock */}
        {isAtMaxStock && (
          <div
            style={{
              backgroundColor: '#F9E3BD',
              color: '#7A4B13',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 700,
              textAlign: 'center',
              marginTop: '-4px'
            }}
          >
            Only {maxStock} left in stock
          </div>
        )}

        {/* Unit Price Row (Pre-filled, editable) */}
        <div className="sheet-row" style={{ flexWrap: 'wrap', gap: '8px' }}>
          <span className="sheet-label">Unit Price (₹):</span>
          <div className="price-input-box">
            <span>₹</span>
            <input
              type="number"
              step="any"
              className="price-input"
              value={customPriceRupees}
              onChange={(e) => setCustomPriceRupees(e.target.value)}
            />
          </div>
        </div>

        {/* Big Action Button */}
        <button
          className="btn-primary"
          style={{ width: '100%', height: '52px', fontSize: '18px', marginTop: '4px' }}
          disabled={quantity < 1 || quantity > maxStock || priceInPaise <= 0}
          onClick={handleConfirm}
        >
          Sell {formatRupees(totalInPaise)}
        </button>
      </div>
    </div>
  );
}

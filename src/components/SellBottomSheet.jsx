import React, { useState } from 'react';
import { formatRupees, paiseToRupees, rupeesToPaise } from '../utils/currency.js';

export function SellBottomSheet({ item, onClose, onConfirmSale }) {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [attemptedOver, setAttemptedOver] = useState(false);
  const [customPriceRupees, setCustomPriceRupees] = useState(() =>
    paiseToRupees(item.sellPrice).toString()
  );

  const maxStock = item.currentStock;
  const isOverselling = quantity > maxStock;
  const priceInPaise = rupeesToPaise(customPriceRupees);
  const totalInPaise = Math.max(0, quantity * priceInPaise);

  const handleDecrement = () => {
    setAttemptedOver(false);
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity >= maxStock) {
      setAttemptedOver(true);
    } else {
      setAttemptedOver(false);
      setQuantity((prev) => prev + 1);
    }
  };

  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) {
      setQuantity(0);
      setAttemptedOver(false);
    } else {
      setQuantity(val);
      if (val >= maxStock) {
        setAttemptedOver(true);
      } else {
        setAttemptedOver(false);
      }
    }
  };

  const handleConfirm = () => {
    if (quantity < 1 || isOverselling || priceInPaise <= 0) return;
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
          <div>
            <div className="sheet-title">{item.name}</div>
            <div style={{ marginTop: '4px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span className="status-pill in-stock">
                {maxStock} available
              </span>
              {item.unit && (
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
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
        <div className="sheet-row">
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
              className="stepper-btn"
              onClick={handleIncrement}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        {/* Short red message directly under stepper */}
        {(isOverselling || (attemptedOver && quantity >= maxStock)) && (
          <div
            style={{
              color: 'var(--pill-out-text)',
              fontSize: '13px',
              fontWeight: 700,
              textAlign: 'right',
              marginTop: '-8px'
            }}
          >
            Only {maxStock} left in stock
          </div>
        )}

        {/* Unit Price Row (Pre-filled, editable) */}
        <div className="sheet-row">
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
          disabled={quantity < 1 || isOverselling || priceInPaise <= 0}
          onClick={handleConfirm}
        >
          {isOverselling
            ? 'Cannot oversell'
            : `Sell ${formatRupees(totalInPaise)}`}
        </button>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { rupeesToPaise } from '../utils/currency.js';

export function NewItemModal({ onClose, onSaveNewItem }) {
  const [name, setName] = useState('');
  const [sellPriceRupees, setSellPriceRupees] = useState('');
  const [costPriceRupees, setCostPriceRupees] = useState('');
  const [startingQuantity, setStartingQuantity] = useState('10');
  const [lowStockThreshold, setLowStockThreshold] = useState('5');
  const [unit, setUnit] = useState('packet');
  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter an item name');
      return;
    }

    const sellPricePaise = rupeesToPaise(sellPriceRupees);
    if (sellPricePaise <= 0) {
      alert('Please enter a valid selling price');
      return;
    }

    const costPricePaise = costPriceRupees ? rupeesToPaise(costPriceRupees) : Math.round(sellPricePaise * 0.8);
    const startQty = parseInt(startingQuantity, 10);
    const threshold = parseInt(lowStockThreshold, 10) || 5;

    onSaveNewItem({
      name: name.trim(),
      code: code.trim(),
      unit: unit.trim(),
      sellPrice: sellPricePaise,
      costPrice: costPricePaise,
      currentStock: isNaN(startQty) ? 0 : Math.max(0, startQty),
      lowStockThreshold: threshold
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '19px', fontWeight: 800 }}>+ Add New Product</h2>
          <button className="sheet-close-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>
              Product Name *
            </label>
            <input
              type="text"
              className="search-input"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Good Day Butter Biscuits"
              autoFocus
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>
                Sell Price (₹) *
              </label>
              <div className="price-input-box" style={{ width: '100%' }}>
                <span>₹</span>
                <input
                  type="number"
                  step="any"
                  required
                  className="price-input"
                  value={sellPriceRupees}
                  onChange={(e) => setSellPriceRupees(e.target.value)}
                  placeholder="30"
                />
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>
                Cost Price (₹)
              </label>
              <div className="price-input-box" style={{ width: '100%' }}>
                <span>₹</span>
                <input
                  type="number"
                  step="any"
                  className="price-input"
                  value={costPriceRupees}
                  onChange={(e) => setCostPriceRupees(e.target.value)}
                  placeholder="24"
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>
                Starting Stock
              </label>
              <input
                type="number"
                min="0"
                className="search-input"
                value={startingQuantity}
                onChange={(e) => setStartingQuantity(e.target.value)}
                placeholder="10"
              />
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>
                Low-Stock Alert
              </label>
              <input
                type="number"
                min="1"
                className="search-input"
                value={lowStockThreshold}
                onChange={(e) => setLowStockThreshold(e.target.value)}
                placeholder="5"
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>
                Unit (Optional)
              </label>
              <input
                type="text"
                className="search-input"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="packet / kg / L"
              />
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>
                Code / SKU (Optional)
              </label>
              <input
                type="text"
                className="search-input"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. 102"
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
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
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

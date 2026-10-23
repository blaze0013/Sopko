import React, { useState } from 'react';
import { loadStore, seedSampleData, recordSale } from './services/storage.js';
import { Header } from './components/Header.jsx';
import { StockOutTab } from './components/StockOutTab.jsx';
import { SellBottomSheet } from './components/SellBottomSheet.jsx';

export function App() {
  const [store, setStore] = useState(() => {
    const existing = loadStore();
    if (existing.items && existing.items.length > 0) {
      return existing;
    }
    return seedSampleData();
  });

  const [activeTab, setActiveTab] = useState('stock-out');
  const [selectedItem, setSelectedItem] = useState(null);

  const handleLoadSampleData = () => {
    if (window.confirm('Load sample kirana data? This will reset items and 7-day sales.')) {
      const fresh = seedSampleData();
      setStore(fresh);
      setSelectedItem(null);
    }
  };

  const handleSelectItem = (item) => {
    if (item.currentStock === 0) {
      alert(`"${item.name}" is out of stock! Switch to Stock In to add inventory.`);
      return;
    }
    setSelectedItem(item);
  };

  const handleConfirmSale = ({ itemId, quantity, unitPrice }) => {
    try {
      const { store: updatedStore } = recordSale({ itemId, quantity, unitPrice });
      setStore({ ...updatedStore });
      setSelectedItem(null);
    } catch (err) {
      alert(err.message || 'Failed to complete sale');
    }
  };

  return (
    <div className="app-container">
      <Header
        items={store.items}
        sales={store.sales}
        onMenuClick={() => alert('Menu (Export CSV & Guide) will be available in Slice 4!')}
      />

      {activeTab === 'stock-out' && (
        <StockOutTab
          items={store.items}
          onSelectItem={handleSelectItem}
          onLoadSampleData={handleLoadSampleData}
          onGoToStockIn={() => setActiveTab('stock-in')}
        />
      )}

      {selectedItem && (
        <SellBottomSheet
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onConfirmSale={handleConfirmSale}
        />
      )}
    </div>
  );
}

export default App;

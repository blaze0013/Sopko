import React, { useState, useEffect } from 'react';
import { loadStore, seedSampleData, saveStore } from './services/storage.js';
import { Header } from './components/Header.jsx';
import { StockOutTab } from './components/StockOutTab.jsx';

export function App() {
  const [store, setStore] = useState(() => {
    const existing = loadStore();
    if (existing.items && existing.items.length > 0) {
      return existing;
    }
    // Auto-seed sample data on first load for testing
    return seedSampleData();
  });

  const [activeTab, setActiveTab] = useState('stock-out');

  const handleLoadSampleData = () => {
    if (window.confirm('Load sample kirana data? This will reset items and 7-day sales.')) {
      const fresh = seedSampleData();
      setStore(fresh);
    }
  };

  const handleSelectItem = (item) => {
    console.log('Selected item for sale:', item);
    // Slice 2 wires the Sell Bottom Sheet!
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
    </div>
  );
}

export default App;

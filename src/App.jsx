import React, { useState } from 'react';
import { loadStore, seedSampleData, recordSale, addStock, addItem } from './services/storage.js';
import { Header } from './components/Header.jsx';
import { StockOutTab } from './components/StockOutTab.jsx';
import { StockInTab } from './components/StockInTab.jsx';
import { SellBottomSheet } from './components/SellBottomSheet.jsx';
import { RestockModal } from './components/RestockModal.jsx';
import { NewItemModal } from './components/NewItemModal.jsx';
import { BottomNav } from './components/BottomNav.jsx';

export function App() {
  const [store, setStore] = useState(() => {
    const existing = loadStore();
    if (existing.items && existing.items.length > 0) {
      return existing;
    }
    return seedSampleData();
  });

  const [activeTab, setActiveTab] = useState('stock-out');
  const [selectedSellItem, setSelectedSellItem] = useState(null);
  const [selectedRestockItem, setSelectedRestockItem] = useState(null);
  const [isNewItemModalOpen, setIsNewItemModalOpen] = useState(false);

  const handleLoadSampleData = () => {
    if (window.confirm('Load sample kirana data? This will reset items and 7-day sales.')) {
      const fresh = seedSampleData();
      setStore(fresh);
      setSelectedSellItem(null);
      setSelectedRestockItem(null);
    }
  };

  const handleSelectSellItem = (item) => {
    if (item.currentStock === 0) {
      alert(`"${item.name}" is out of stock! Switch to Stock In to add inventory.`);
      return;
    }
    setSelectedSellItem(item);
  };

  const handleConfirmSale = ({ itemId, quantity, unitPrice }) => {
    try {
      const { store: updatedStore } = recordSale({ itemId, quantity, unitPrice });
      setStore({ ...updatedStore });
      setSelectedSellItem(null);
    } catch (err) {
      alert(err.message || 'Failed to complete sale');
    }
  };

  const handleConfirmRestock = ({ itemId, quantity, unitCost, receivedAt }) => {
    try {
      const { store: updatedStore } = addStock({ itemId, quantity, unitCost, receivedAt });
      setStore({ ...updatedStore });
      setSelectedRestockItem(null);
    } catch (err) {
      alert(err.message || 'Failed to restock');
    }
  };

  const handleSaveNewItem = (itemData) => {
    try {
      const { store: updatedStore } = addItem(itemData);
      setStore({ ...updatedStore });
      setIsNewItemModalOpen(false);
    } catch (err) {
      alert(err.message || 'Failed to create new item');
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
          onSelectItem={handleSelectSellItem}
          onLoadSampleData={handleLoadSampleData}
          onGoToStockIn={() => setActiveTab('stock-in')}
        />
      )}

      {activeTab === 'stock-in' && (
        <StockInTab
          items={store.items}
          onSelectRestock={(item) => setSelectedRestockItem(item)}
          onOpenNewItemModal={() => setIsNewItemModalOpen(true)}
        />
      )}

      {/* Modals & Sheets */}
      {selectedSellItem && (
        <SellBottomSheet
          item={selectedSellItem}
          onClose={() => setSelectedSellItem(null)}
          onConfirmSale={handleConfirmSale}
        />
      )}

      {selectedRestockItem && (
        <RestockModal
          item={selectedRestockItem}
          onClose={() => setSelectedRestockItem(null)}
          onConfirmRestock={handleConfirmRestock}
        />
      )}

      {isNewItemModalOpen && (
        <NewItemModal
          onClose={() => setIsNewItemModalOpen(false)}
          onSaveNewItem={handleSaveNewItem}
        />
      )}

      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
      />
    </div>
  );
}

export default App;

/**
 * Central Storage & Ledger Service for Sopko
 * Manages all localStorage persistence, atomic ledger updates, and CSV exports.
 */
import { generateSampleData } from './sampleData.js';
import { paiseToRupees } from '../utils/currency.js';
import { formatDateTime } from '../utils/date.js';

const STORAGE_KEY = 'sopko_store_v1';
const ONBOARDED_KEY = 'sopko_onboarded_v1';

/**
 * Returns empty store schema
 * @returns {Object}
 */
export function getEmptyStore() {
  return {
    schemaVersion: 1,
    items: [],
    stockIns: [],
    sales: []
  };
}

/**
 * Loads entire store from localStorage
 * Recovers safely if corrupted or empty
 * @returns {Object} StoreSchema
 */
export function loadStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getEmptyStore();
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.schemaVersion !== 1 || !Array.isArray(parsed.items)) {
      return getEmptyStore();
    }
    return parsed;
  } catch (err) {
    console.error('Error reading from localStorage, resetting store safely:', err);
    return getEmptyStore();
  }
}

/**
 * Persists store to localStorage
 * @param {Object} store
 */
export function saveStore(store) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

/**
 * Seeds store with realistic Indian kirana sample data
 * @returns {Object}
 */
export function seedSampleData() {
  const sample = generateSampleData();
  saveStore(sample);
  return sample;
}

/**
 * Checks whether user has completed first-visit onboarding
 * @returns {boolean}
 */
export function isOnboarded() {
  return localStorage.getItem(ONBOARDED_KEY) === 'true';
}

/**
 * Sets onboarding completion flag
 */
export function setOnboarded() {
  localStorage.setItem(ONBOARDED_KEY, 'true');
}

/**
 * Adds a new item to inventory
 * Writes initial stock-in record if starting quantity > 0
 * @param {Object} itemData
 * @returns {Object} { item, store }
 */
export function addItem({
  name,
  code = '',
  unit = '',
  costPrice = 0,
  sellPrice = 0,
  currentStock = 0,
  lowStockThreshold = 5
}) {
  const store = loadStore();
  const now = new Date().toISOString();
  const id = 'item-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);

  const newItem = {
    id,
    name: name.trim(),
    code: code ? code.trim() : '',
    unit: unit ? unit.trim() : '',
    costPrice: Math.round(costPrice),
    sellPrice: Math.round(sellPrice),
    currentStock: Math.max(0, parseInt(currentStock, 10) || 0),
    lowStockThreshold: Math.max(1, parseInt(lowStockThreshold, 10) || 5),
    archived: false,
    createdAt: now,
    updatedAt: now
  };

  store.items.unshift(newItem);

  // If created with initial stock, log an initial stock-in
  if (newItem.currentStock > 0) {
    store.stockIns.unshift({
      id: 'stockin-' + Date.now(),
      itemId: newItem.id,
      itemName: newItem.name,
      quantity: newItem.currentStock,
      unitCost: newItem.costPrice,
      receivedAt: now
    });
  }

  saveStore(store);
  return { item: newItem, store };
}

/**
 * Restocks existing item
 * Atomically increments stock and writes StockIn record
 * @param {Object} params
 * @returns {Object} { stockIn, store }
 */
export function addStock({ itemId, quantity, unitCost, receivedAt }) {
  const store = loadStore();
  const itemIndex = store.items.findIndex((i) => i.id === itemId);
  if (itemIndex === -1) throw new Error('Item not found');

  const item = store.items[itemIndex];
  const qty = Math.max(1, parseInt(quantity, 10) || 1);
  const cost = unitCost !== undefined ? Math.round(unitCost) : item.costPrice;
  const dateStr = receivedAt || new Date().toISOString();

  item.currentStock += qty;
  item.costPrice = cost; // update to latest cost
  item.updatedAt = new Date().toISOString();

  const newStockIn = {
    id: 'stockin-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5),
    itemId: item.id,
    itemName: item.name,
    quantity: qty,
    unitCost: cost,
    receivedAt: dateStr
  };

  store.stockIns.unshift(newStockIn);
  saveStore(store);
  return { stockIn: newStockIn, store };
}

/**
 * Records a sale transaction
 * Enforces overselling check: throws if quantity > currentStock
 * Updates item stock and logs to sales ledger
 * @param {Object} params
 * @returns {Object} { sale, store }
 */
export function recordSale({ itemId, quantity, unitPrice, soldAt }) {
  const store = loadStore();
  const itemIndex = store.items.findIndex((i) => i.id === itemId);
  if (itemIndex === -1) throw new Error('Item not found');

  const item = store.items[itemIndex];
  const qty = parseInt(quantity, 10);
  if (isNaN(qty) || qty <= 0) throw new Error('Invalid quantity');

  if (item.currentStock < qty) {
    throw new Error(`Only ${item.currentStock} left in stock.`);
  }

  const price = unitPrice !== undefined ? Math.round(unitPrice) : item.sellPrice;
  const dateStr = soldAt || new Date().toISOString();

  item.currentStock -= qty;
  item.updatedAt = new Date().toISOString();

  const newSale = {
    id: 'sale-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5),
    itemId: item.id,
    itemName: item.name,
    quantity: qty,
    unitPrice: price,
    unitCost: item.costPrice,
    totalAmount: qty * price,
    soldAt: dateStr
  };

  store.sales.unshift(newSale);
  saveStore(store);
  return { sale: newSale, store };
}

/**
 * Generates and triggers browser download of CSV with UTF-8 BOM
 * @param {'sales' | 'stockIn' | 'inventory'} type
 */
export function downloadCSV(type) {
  const store = loadStore();
  const BOM = '\uFEFF';
  let csvContent = '';
  let filename = '';

  if (type === 'sales') {
    filename = `sopko-sales-${new Date().toISOString().slice(0, 10)}.csv`;
    const headers = ['Sale ID', 'Date & Time', 'Item Name', 'Quantity', 'Sell Price (₹)', 'Cost Price (₹)', 'Total (₹)'];
    const rows = store.sales.map((s) => [
      `"${s.id}"`,
      `"${formatDateTime(s.soldAt)}"`,
      `"${s.itemName.replace(/"/g, '""')}"`,
      s.quantity,
      paiseToRupees(s.unitPrice).toFixed(2),
      paiseToRupees(s.unitCost).toFixed(2),
      paiseToRupees(s.totalAmount).toFixed(2)
    ]);
    csvContent = BOM + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  } else if (type === 'stockIn') {
    filename = `sopko-stock-in-${new Date().toISOString().slice(0, 10)}.csv`;
    const headers = ['Delivery ID', 'Received Date', 'Item Name', 'Quantity Received', 'Unit Cost (₹)', 'Total Cost (₹)'];
    const rows = store.stockIns.map((st) => [
      `"${st.id}"`,
      `"${formatDateTime(st.receivedAt)}"`,
      `"${st.itemName.replace(/"/g, '""')}"`,
      st.quantity,
      paiseToRupees(st.unitCost).toFixed(2),
      (st.quantity * paiseToRupees(st.unitCost)).toFixed(2)
    ]);
    csvContent = BOM + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  } else if (type === 'inventory') {
    filename = `sopko-current-stock-${new Date().toISOString().slice(0, 10)}.csv`;
    const headers = ['Product Code', 'Item Name', 'Unit', 'Cost Price (₹)', 'Sell Price (₹)', 'Current Stock', 'Low Stock Threshold', 'Status'];
    const rows = store.items
      .filter((i) => !i.archived)
      .map((i) => {
        let status = 'In Stock';
        if (i.currentStock === 0) status = 'Out of Stock';
        else if (i.currentStock <= i.lowStockThreshold) status = 'Low Stock';
        return [
          `"${(i.code || '').replace(/"/g, '""')}"`,
          `"${i.name.replace(/"/g, '""')}"`,
          `"${(i.unit || '').replace(/"/g, '""')}"`,
          paiseToRupees(i.costPrice).toFixed(2),
          paiseToRupees(i.sellPrice).toFixed(2),
          i.currentStock,
          i.lowStockThreshold,
          status
        ];
      });
    csvContent = BOM + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  }

  // Trigger client-side file download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}


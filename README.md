# Sopko 🏪

A tactile, zero-setup stock and sales web app designed for local Indian kirana (grocery) store owners to replace manual notepad and spreadsheet double-entry.

Runs 100% locally in the browser with `localStorage` persistence—no login, no servers, and works without internet once loaded.

---

## Features

- **Countertop-Speed Selling:** Tapping an item opens a thumb-friendly bottom sheet with a `- 1 +` stepper pre-filled with the item's price.
- **Oversell Prevention:** The quantity stepper physically caps at available inventory and displays *"Only N left in stock"* if exceeding stock is attempted. Zero-stock items are disabled with an *"Out of stock"* status badge.
- **Persistent Header Dashboard:** Real-time calculation of **Today's Sales** (in ₹ with Indian numbering format) and instant count of items at or below their low-stock threshold.
- **Delivery Restocking (Stock In):** Searchable item list for rapid delivery check-ins, tracking delivery costs and dates in an immutable ledger, plus a "+ New Item" form for new catalog entries.
- **Excel-Safe CSV Export & Backup:** Export Sales, Stock In deliveries, and Current Stock to clean CSV files formatted with a UTF-8 BOM (`\uFEFF`) so Indian Rupee (₹) symbols open correctly in Microsoft Excel on Windows.
- **Demo Accelerator:** Single-click "Load Sample Data" button populating realistic Indian grocery goods (Atta, Maggi, Parle-G, Tata Salt, Sunflower Oil) and a 7-day sales history.
- **Tactile Light Design System:** Handcrafted CSS design tokens with a warm cream canvas (`#FAF9F5`), forest green actions (`#2E6F34`), and soft pastel status pills.

---

## Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher) and npm

### Installation & Run

```powershell
# 1. Clone the repository
git clone https://github.com/your-username/Sopko.git
cd Sopko

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open your browser at **`http://localhost:5173`**.

> **Tip:** For the best counter experience, open Chrome DevTools and toggle **Device Mode** (e.g., iPhone or Pixel) to experience the mobile-first bottom sheets and navigation.

---

## Tech Stack

- **Framework:** [React 19](https://react.dev/) + [Vite 6](https://vite.dev/)
- **Styling:** Vanilla CSS with custom property tokens (`src/styles/tokens.css`)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Storage:** Client-side `localStorage` with isolated service ledger pattern (`src/services/storage.js`)

---

## 1-Minute Demo Walkthrough

1. Open `http://localhost:5173`.
2. First-time visitors see the **"How it works"** guide. Click **"Load Sample Kirana Data"**.
3. On the **Stock Out** screen, observe the persistent header with Today's Date, Today's Sales (₹4,250), and the low-stock status pill.
4. Tap an item card (e.g., *Parle-G*). Notice the bottom sheet slides up with quantity defaulting to 1.
5. Tap `+` until reaching current stock. Notice the stepper stops and shows *"Only N left in stock"*.
6. Tap **"Sell ₹X"**: watch the bottom sheet close, card quantity drop immediately, and Today's Sales update.
7. Switch to the **Stock In** tab via the bottom navigation bar.
8. Search for an item and tap it to restock 10 units. Verify stock increases.
9. Tap the top-right **`⋮`** menu and select **"Export Sales CSV"** to download the spreadsheet backup.

---

## License

This project is licensed under the [MIT License](LICENSE).

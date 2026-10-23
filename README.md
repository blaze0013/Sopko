# Sopko 🏪

A tactile, mobile-first web app designed for single-owner Indian kirana (grocery) shops to track daily sales, manage inventory, and avoid running out of stock—with zero servers, zero logins, and zero monthly fees.

---

## The Problem Sopko Solves

Many small grocery and kirana shopkeepers scribble items on a paper notepad during customer rushes, then spend late evenings after closing manually entering deductions into an Excel sheet. Because stock is only calculated at night, items often run out during the day without warning.

**Sopko replaces that double-entry with a fast, one-tap mobile workflow:**
1. **Countertop Selling:** Tap an item card behind the counter to log a sale in 2 seconds.
2. **Oversell Prevention:** The quantity stepper physically caps at available inventory and displays *"Only N left in stock"* in amber when the maximum is reached.
3. **Live Counter Dashboard:** Glance at **Today's Sales** in ₹ (with Indian numbering format) and instant low-stock warning pills.
4. **Delivery Restocking:** When delivery crates arrive, quickly search existing items to add incoming stock and delivery cost, or tap **+ New** to register a new product.
5. **Excel-Ready Backup:** Export Sales, Deliveries, and Inventory to CSV files with a UTF-8 Byte Order Mark (`\uFEFF`) so Indian Rupee (₹) symbols open correctly in Microsoft Excel on Windows.

---

## Built with Devpost Learn

Sopko was built using the **Devpost Learn: Build With AI: Basics** curriculum—practicing plan-first, spec-driven development using flipped AI collaboration.

The complete planning artifacts are committed and viewable in the [`devpost/`](./devpost) directory:
- [**`devpost/scope.md`**](./devpost/scope.md) — Concept sharpening, unique kernel, and proof-of-concept boundary.
- [**`devpost/prd.md`**](./devpost/prd.md) — Non-technical product definition, user journey, and design tokens.
- [**`devpost/spec.md`**](./devpost/spec.md) — Technical architecture, component layout, and storage ledger schemas.
- [**`devpost/checklist.md`**](./devpost/checklist.md) — End-to-end working build slices, verification records, and review log.

---

## Tech Stack

- **Frontend:** [React 19](https://react.dev/) + [Vite 6](https://vite.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Styling:** Custom CSS design tokens (`src/styles/tokens.css`) with a warm tactile palette (`#FAF9F5` canvas, `#2E6F34` primary action, pastel status pills).
- **Persistence:** Local browser `localStorage` isolated in a dedicated service ledger (`src/services/storage.js`) with integer paise representation for financial accuracy.
- **Backend:** None (100% client-side, runs offline once loaded).

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher) and npm

### Installation & Local Run

```powershell
# 1. Clone the repository
git clone https://github.com/your-username/Sopko.git
cd Sopko

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open **`http://localhost:5173`** in your browser.

> **Mobile Tip:** Open Chrome DevTools and toggle the **Device Toolbar** (e.g. iPhone 14 or Pixel 7) to try out the mobile-optimized bottom sheet and thumb-friendly navigation.

---

## 1-Minute Demo Walkthrough

1. Open `http://localhost:5173`.
2. First-time visitors see the **"How it works"** guide. Tap **"Load Sample Kirana Data"** (or use the top-right `⋮` menu).
3. On **Stock Out**, view the persistent header showing today's date, Today's Sales (₹4,250), and low-stock count badges.
4. Tap an item card (e.g., *Parle-G*). The sell sheet slides up with quantity defaulting to 1.
5. Tap `+` until reaching maximum stock; note the amber *"Only N left in stock"* notice and disabled `+` button.
6. Tap **"Sell ₹X"**: observe the sheet close, card stock drop immediately, and Today's Sales total increase.
7. Switch to the **Stock In** tab via the bottom bar.
8. Search an item and tap it to restock 10 units. Verify stock increases instantly.
9. Tap the top-right **`⋮`** menu and click **"Export Sales CSV"** to download the clean spreadsheet backup.

---

## License

This project is licensed under the [MIT License](LICENSE).

---
doc: spec
status: approved
---

# Sopko — Technical Spec

## How This Works, In Plain Language
Sopko is a fast, offline-first web app that runs directly in any modern mobile or desktop web browser. It has no server, database, or login screens. 

Everything the shopkeeper does—adding inventory, recording a sale, or checking totals—is handled by three coordinated layers:
1. **The React UI (The Counter):** Renders the big, touch-friendly screens. It listens for taps (like tapping "Sell ₹40"), prevents mistakes (such as trying to sell 5 packets when only 3 exist), and updates the screen immediately without reloading.
2. **The Storage Service (The Shop Ledger):** A single dedicated JavaScript module (`src/services/storage.js`) acts as the store's bookkeeping clerk. When a sale occurs, it doesn't just decrement a number—it writes an immutable record to a sales log, updates the item's current stock, and saves everything to the browser's persistent `localStorage`. Isolating all storage into this one file means we can easily plug in Google Sheets or cloud sync later without rewriting any UI components.
3. **Integer Money Representation:** To prevent floating-point math bugs common in computer calculations (e.g., `0.1 + 0.2 = 0.30000000000000004`), all prices and costs are stored internally as whole integer paise (`₹1 = 100 paise`). They are formatted as clean rupees (`₹4,250`) only when displayed to the user or exported.

## The Core Journey Through the System
Traced step by step from `prd.md > The Core Journey`:
1. **App Load & Initialization:** The browser loads `index.html`. `main.jsx` mounts `App.jsx`, which initializes `storage.js`. `storage.js` reads `localStorage`. If empty, it flags first-visit and triggers `OnboardingModal.jsx`. If existing data is found, it loads items, stock-in history, and sales into React state.
2. **Dashboard Calculation:** `App.jsx` filters `sales[]` using the device's local date (`YYYY-MM-DD`). It sums `totalAmount` (in paise) and formats the hero metric (e.g., `₹4,250`). It checks each item's `currentStock` against `lowStockThreshold` (default 5) to compute the low-stock badge count.
3. **Fast Counter Sale:** On the default `StockOutTab.jsx`, the user taps an item card. `SellBottomSheet.jsx` mounts with quantity = 1 and pre-filled selling price. As the user adjusts quantity, it checks `item.currentStock`. Tapping "Sell ₹X" calls `storage.recordSale({ itemId, quantity, unitPrice, soldAt })`.
4. **Ledger Update & Persistence:** `storage.recordSale` appends the sale to `sales[]`, decrements `item.currentStock`, updates `item.updatedAt`, and writes the entire updated state tree to `localStorage`. `App.jsx` receives the updated state, causing the card stock, header ₹ total, and low-stock pill to re-render in milliseconds.
5. **Restocking Delivery:** The user taps the bottom navigation bar to switch to `StockInTab.jsx`. Tapping an item opens `RestockModal.jsx`. Submitting calls `storage.addStock({ itemId, quantity, unitCost, receivedAt })`, appending a record to `stockIns[]` and incrementing `item.currentStock`.
6. **Data Export & Backup:** From the top-right `⋮` menu (`MenuDropdown.jsx`), the shopkeeper selects one of the 3 export options. The browser compiles the ledger records into a CSV string with a UTF-8 BOM (`\uFEFF`), converts paise to rupees, and triggers a direct browser download.

## Stack
- **Framework & Build Tool:** [Vite](https://vite.dev/) (v6) + [React](https://react.dev/) (v19)
  - *Rationale:* Blazing fast hot module replacement, zero server setup, and clean component architecture.
  - *Tradeoff:* Requires a lightweight build step during development, but produces static files deployable or runnable anywhere.
- **Styling:** Vanilla CSS with CSS Custom Properties (Design Tokens) matching `prd.md > Look and Feel`.
  - *Rationale:* Eliminates heavy UI library bloat (Tailwind/MUI); guarantees 100% precision with the agreed tactile color palette and shadows.
- **Icons:** Inline SVG or [Lucide React](https://lucide.dev/) (v0.400+)
  - *Rationale:* Lightweight, zero-dependency visual clarity for steppers, search, and menu icons.
- **Persistence:** Browser `localStorage` via a dedicated singleton service.
  - *Rationale:* Zero cost, zero login, instant offline-first access.

## Where It Runs and How Someone Tries It
- **Runtime:** Any modern mobile or desktop web browser (Chrome, Safari, Firefox, Edge).
- **Local Dev Command:**
  ```powershell
  npm install
  npm run dev
  ```
  App starts instantly at `http://localhost:5173`.
- **Demo Recording Workflow:**
  1. Open Chrome DevTools and toggle Device Toolbar (e.g., iPhone 14/15 or Pixel 7) to show the tactile mobile experience.
  2. First visit triggers the 4-step "How it works" modal. Tap "Load sample data".
  3. Show the Stock Out screen with pre-loaded realistic kirana goods, today's ₹ sales banner, and low-stock pills.
  4. Tap an item (e.g. Parle-G), show the bottom sheet with stepper capped at available stock, and tap "Sell ₹40". Watch stock drop and header sales increase.
  5. Switch to Stock In tab, search an item, and restock 10 units. Show stock incrementing.
  6. Tap top-right `⋮` menu, click "Export Sales CSV", and show the downloaded CSV file ready for Excel.

## Look and Feel
Carried forward directly from `prd.md > Look and Feel` and defined in `src/styles/tokens.css`:
- **Canvas:** `--bg-app: #FAF9F5` (warm cream)
- **Surfaces:** `--bg-surface: #FFFFFF`, `--border-card: 1px solid #E6E4DD`
- **Dashboard Banner:** `--bg-banner: #E8F3E8`, `--text-hero: #285E2B`
- **Actions:** `--btn-primary-bg: #2E6F34`, `--btn-primary-text: #FFFFFF`, `--btn-onboard-bg: #68A856`
- **Stepper:** `--stepper-bg: #DDE1E6`, `--stepper-border: 1px solid #C4C9D0`, `--stepper-text: #33373B`
- **Status Pills:**
  - In Stock: `--pill-in-bg: #D3EED6`, `--pill-in-text: #215A26`
  - Low Stock: `--pill-low-bg: #F9E3BD`, `--pill-low-text: #7A4B13`
  - Out of Stock: `--pill-out-bg: #FAD2CC`, `--pill-out-text: #8C251D`
- **Typography:** System fonts, minimum 16px body, 44px+ touch targets, Indian currency format (`₹4,250`).

## Components

### Header (`src/components/Header.jsx`)
- Implements `prd.md > 2. Header Banner & Daily Sales Tracking`.
- Displays today's date formatted using device locale, today's total sales in ₹, and low-stock count pill.
- Houses the `⋮` button toggling `MenuDropdown.jsx`.

### MenuDropdown (`src/components/MenuDropdown.jsx`)
- Implements `prd.md > 5. Data Management, Export & Sample Data`.
- Dropdown menu options:
  - Export Sales CSV
  - Export Stock In CSV
  - Export Current Stock CSV
  - Load Sample Data (with overwrite confirmation prompt)
  - How It Works (re-opens onboarding guide)

### OnboardingModal (`src/components/OnboardingModal.jsx`)
- Implements `prd.md > 1. Onboarding Guide ("How it works")`.
- 4-step visual cards with numbered circular badges: Add goods, Record sales, Check your day, Take it with you.
- Includes "Got it" button and "Load sample data" button.

### StockOutTab (`src/components/StockOutTab.jsx`)
- Implements `prd.md > 3. Stock Out & Counter Sales`.
- Renders list of non-archived items with search filter.
- Each item card shows name, unit (if present), price in ₹, and stock badge.
- Tapping card opens `SellBottomSheet.jsx`. Zero-stock cards show "Out of stock" and link to restock.

### SellBottomSheet (`src/components/SellBottomSheet.jsx`)
- Implements `prd.md > 3. Stock Out & Counter Sales`.
- Fixed bottom sheet modal with smooth slide-up animation.
- Displays item name, stock pill, editable selling price, and unified `- 1 +` stepper.
- Enforces stock boundary: `+` is disabled when quantity equals available stock; typed input over stock displays red warning "Only N left in stock".
- Action button: full-width "Sell ₹[Total]" updating dynamically with quantity and price.

### StockInTab (`src/components/StockInTab.jsx`)
- Implements `prd.md > 4. Stock In & Inventory Management`.
- Sticky search bar and "+ New item" button.
- List of items for quick restocking: tapping an item opens `RestockModal.jsx`.

### NewItemModal (`src/components/NewItemModal.jsx`)
- Implements `prd.md > 4. Stock In & Inventory Management`.
- Form for adding brand new products: Name (required), Sell Price (required), Cost Price, Starting Quantity, Low-stock Threshold (defaults to 5), Unit (optional, e.g. kg/packet), Product Code (optional).

### RestockModal (`src/components/RestockModal.jsx`)
- Implements `prd.md > 4. Stock In & Inventory Management`.
- Quick-entry dialog for deliveries: Quantity received, Delivery unit cost (pre-filled with last cost), date (defaults to today).

### BottomNav (`src/components/BottomNav.jsx`)
- Implements `prd.md > Screens and Layout`.
- Fixed thumb-friendly bottom bar with two tabs: "Stock out" (default) and "Stock in".

## Data Model

Stored under the `localStorage` key `'sopko_store_v1'`:

```typescript
interface StoreSchema {
  schemaVersion: 1;
  items: Item[];
  stockIns: StockIn[];
  sales: Sale[];
}

interface Item {
  id: string;              // UUID or timestamp-based ID
  name: string;            // e.g. "Parle-G 250g"
  code?: string;           // Optional barcode / SKU code
  unit?: string;           // Optional: "packet", "kg", "litre"
  costPrice: number;       // In integer paise (₹10.50 -> 1050)
  sellPrice: number;       // In integer paise (₹15.00 -> 1500)
  currentStock: number;    // Cached available units
  lowStockThreshold: number; // Defaults to 5
  archived: boolean;       // Defaults to false
  createdAt: string;       // ISO timestamp
  updatedAt: string;       // ISO timestamp
}

interface StockIn {
  id: string;
  itemId: string;
  itemName: string;
  quantity: number;        // Units received
  unitCost: number;        // Cost in paise per unit for this batch
  receivedAt: string;      // ISO or YYYY-MM-DD date
}

interface Sale {
  id: string;
  itemId: string;
  itemName: string;
  quantity: number;        // Units sold
  unitPrice: number;       // Sale price in paise
  unitCost: number;        // Cost in paise at time of sale (for accurate margin tracking)
  totalAmount: number;     // quantity * unitPrice in paise
  soldAt: string;          // ISO timestamp
}
```

### State Flow & Persistence
- **Storage Module (`src/services/storage.js`):** Singleton providing:
  - `loadStore(): StoreSchema`
  - `addItem(itemData): Item`
  - `addStock(itemId, quantity, unitCost, receivedAt): StockIn`
  - `recordSale(itemId, quantity, unitPrice, soldAt): Sale`
  - `loadSampleData(): StoreSchema`
  - `exportCSV(type: 'sales' | 'stockIn' | 'inventory'): string`
- Every write operation updates the in-memory store and serializes it to `localStorage` synchronously.

## File Structure
```
Sopko/
├── index.html
├── package.json
├── vite.config.js
├── devpost/
│   ├── learner-profile.md
│   ├── scope.md
│   ├── prd.md
│   └── spec.md
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── styles/
│   │   ├── tokens.css       # Design tokens (colors, radii, shadows)
│   │   └── app.css          # Layout and global styling
│   ├── services/
│   │   ├── storage.js       # localStorage CRUD, ledger updates, CSV export
│   │   └── sampleData.js    # Seed data (realistic Indian grocery items + 7-day sales)
│   ├── utils/
│   │   ├── currency.js      # Paise <-> ₹ formatting with Indian grouping
│   │   └── date.js          # Local device date calculations
│   └── components/
│       ├── Header.jsx
│       ├── MenuDropdown.jsx
│       ├── OnboardingModal.jsx
│       ├── BottomNav.jsx
│       ├── StockOutTab.jsx
│       ├── SellBottomSheet.jsx
│       ├── StockInTab.jsx
│       ├── RestockModal.jsx
│       └── NewItemModal.jsx
```

## External Services and Dependencies
- **Zero external APIs or hosted databases.** Sopko is 100% self-contained.
- **Dependencies (`package.json`):**
  - `react`: `^19.0.0` ([docs](https://react.dev/))
  - `react-dom`: `^19.0.0`
  - `lucide-react`: `^0.475.0` ([docs](https://lucide.dev/))
  - `vite`: `^6.0.0` ([docs](https://vite.dev/))
  - `@vitejs/plugin-react`: `^4.3.0`

## Important Failure Modes
1. **Overselling Attempt:** If user attempts to sell more than current stock, the stepper `+` is disabled, input field shows a red warning ("Only N left in stock"), and stock is blocked from dropping below zero.
2. **`localStorage` Corrupted or Cleared:** If `localStorage` data is missing or unparseable, `storage.js` recovers gracefully by re-initializing an empty valid `StoreSchema` rather than crashing.
3. **Excel Character Encoding Glitch:** When opening CSVs in Microsoft Excel on Windows, non-ASCII symbols (like ₹) often garble without a UTF-8 Byte Order Mark. `storage.js` prepends `\uFEFF` to all exported CSV strings, ensuring numbers and symbols open cleanly in Excel.

## What Was Simplified and Why
- **`localStorage` Ledger instead of Cloud Database:** Avoids backend configuration, network timeouts, and hosting costs. Ledger pattern in `storage.js` ensures cloud sync or Google Sheets can be connected later without rewriting UI code.
- **Client-Side CSV Export instead of Server-Generated Excel:** Generates and downloads files instantly in browser using Blob URLs; zero server dependencies.
- **Archiving instead of Hard Deletions:** In v1, items are flagged `archived: true` rather than deleted, ensuring past sales and stock-in history records remain relational and intact.

## Decisions and Open Issues
- **Integer Paise Architecture:** Chosen by learner to eliminate floating-point arithmetic errors in financial calculations.
- **Device-Local Date Calculation:** "Today" is calculated from the phone's local midnight rather than UTC, preventing sales from counting toward the wrong day late at night.
- **Three Distinct CSV Exports:** Sales, Stock In, and Current Inventory are kept as 3 separate downloadable sheets for clean analysis in Excel.
- **7-Day Sample Sales History:** Sample data includes sales distributed over the preceding 7 days, providing instant data for the deferred 7-day chart in v2.
- **Learning Uncertainty Addressed:** The learner wanted to master how plans translate into precise code. The single-storage-module pattern provides a concrete demonstration of isolating state from UI components, making the execution transparent and manageable.
- **Open Questions:** None blocking build. All data shapes, error boundaries, styling variables, and file locations are resolved.


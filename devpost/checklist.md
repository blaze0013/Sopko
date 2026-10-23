---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast

## Slices

- [x] **1. Bootstrap project, design tokens, storage ledger, sample data & Stock Out inventory view**
  Becomes usable: A running mobile-first Vite + React app styled with the exact warm design tokens (`tokens.css`). Renders the persistent header (today's date, ₹0 sales or seeded sales, low-stock count pill), a "Load sample data" button for instant seeding with 7-day sales history, and the Stock Out screen with item cards, prices, and stock pills (`In stock`, `Low stock`, `Out of stock`) loaded from `storage.js`.
  Why now: Bootstraps the application, verifies Vite and React tooling, locks in the tactile visual tokens, and confirms the storage service can seed and render inventory immediately so all subsequent slices have realistic data to test against.
  PRD ref: `prd.md > The Core Journey` (steps 1–2), `prd.md > Look and Feel`, `prd.md > 2. Header Banner & Daily Sales Tracking`, `prd.md > 5. Data Management, Export & Sample Data`
  Spec ref: `spec.md > Stack`, `spec.md > Look and Feel`, `spec.md > Components > Header`, `spec.md > Data Model`
  Build: Initialize Vite + React project, install lucide-react, create CSS design tokens in `src/styles/tokens.css` and layout in `src/styles/app.css`, create currency and date utilities, create `src/services/sampleData.js` with realistic kirana items and 7-day sales, implement `src/services/storage.js` with `loadStore` and `loadSampleData`, implement `Header.jsx`, and render the item card grid on `StockOutTab.jsx` with a prominent "Load sample data" button.
  Verify (mechanical): Run build check to confirm clean compilation without errors; run node verification script to confirm `storage.js` properly initializes and seeds sample data into `localStorage`.
  Learner check: Open `http://localhost:5173` on mobile or in DevTools mobile view; tap "Load sample data", verify the warm cream canvas, top header banner with today's date and ₹ total, and item cards with status pills render smoothly.
  Commit: `Bootstrap Vite app with design tokens, storage ledger, and stock out view`

- [x] **2. Tap-to-sell bottom sheet with oversell protection & live sales tracking**
  Becomes usable: Tapping an in-stock card on Stock Out opens `SellBottomSheet.jsx`. Shopkeeper can adjust quantity with `- 1 +` stepper (which physically caps at current stock and displays "Only N left in stock" if typed over), edit selling price, and tap "Sell ₹X". The sale is appended to `sales[]`, item stock decrements immediately on screen, and today's ₹ total and low-stock pill update in real time.
  Why now: This is the Unique Kernel—countertop-speed sale logging with instant inventory reduction and oversell prevention. Building it here proves the core loop and state mechanics before adding auxiliary screens.
  PRD ref: `prd.md > 3. Stock Out & Counter Sales`
  Spec ref: `spec.md > Components > SellBottomSheet`, `spec.md > Data Model > State Flow & Persistence`, `spec.md > Important Failure Modes > 1. Overselling Attempt`
  Build: Create `SellBottomSheet.jsx` with bottom-sheet slide-up animation, quantity stepper, price override, and total calculation. Wire `storage.recordSale()` to update `currentStock` and append to `sales[]` in `localStorage`. Handle zero-stock cards showing "Out of stock" badge with disabled selling.
  Verify (mechanical): Programmatically test `storage.recordSale()` with an item of stock 5; verify stock drops to 3, total paise matches, and an attempt to sell 6 throws or blocks overselling.
  Learner check: Tap an item card (e.g. Parle-G), test that the `+` stepper stops at available stock, tap "Sell ₹X", and confirm the card's stock decreases and the top header's ₹ total increases immediately.
  Commit: `Add sell bottom sheet with oversell protection and sales ledger updates`

- [x] **3. Bottom navigation & Stock In tab with search, quick restock & new item form**
  Becomes usable: A fixed bottom navigation bar allowing seamless switching between "Stock out" and "Stock in". The Stock In tab features a search bar, quick restock modal (`RestockModal.jsx`) to add quantity and cost to existing items (updating `stockIns[]` ledger), and a "+ New item" modal (`NewItemModal.jsx`) to add new products with low-stock threshold defaulting to 5.
  Why now: Completes the full store cycle (receiving deliveries and creating new goods) so the shopkeeper can manage inventory without manual database manipulation.
  PRD ref: `prd.md > 4. Stock In & Inventory Management`, `prd.md > Screens and Layout > Bottom Navigation Bar`
  Spec ref: `spec.md > Components > BottomNav`, `spec.md > Components > StockInTab`, `spec.md > Components > RestockModal`, `spec.md > Components > NewItemModal`
  Build: Implement `BottomNav.jsx`, `StockInTab.jsx` with real-time text filter, `RestockModal.jsx` calling `storage.addStock()`, and `NewItemModal.jsx` calling `storage.addItem()`.
  Verify (mechanical): Test `storage.addStock()` to verify stock increases and a `stockIn` record is created; test `storage.addItem()` and verify the new item appears in both tabs.
  Learner check: Tap the "Stock in" bottom tab, search for an item, tap to add 10 units of stock, then tap "+ New item" to create a new product and switch back to "Stock out" to verify it is listed.
  Commit: `Add bottom navigation and stock in tab with restock and new item forms`

- [ ] **4. Onboarding guide modal, top-right menu, UTF-8 CSV exports, README & MIT license**
  Becomes usable: Automatic 4-step onboarding modal ("How it works") on empty storage or first launch. Top-right `⋮` menu (`MenuDropdown.jsx`) with "How it works", "Load Sample Data" (with overwrite confirmation), and 3 separate one-tap CSV downloads (Sales, Stock In, Current Stock) with UTF-8 BOM (`\uFEFF`) for perfect display in Excel. Includes project `README.md` and MIT `LICENSE`.
  Why now: Delivers the final polish, user onboarding, demo accelerator, data backup/export, and open-source documentation required for the hackathon proof of concept and submission video.
  PRD ref: `prd.md > 1. Onboarding Guide ("How it works")`, `prd.md > 5. Data Management, Export & Sample Data`
  Spec ref: `spec.md > Components > OnboardingModal`, `spec.md > Components > MenuDropdown`, `spec.md > Important Failure Modes > 3. Excel Character Encoding Glitch`
  Build: Implement `OnboardingModal.jsx` with 4 illustrated steps and "Got it" / "Load sample data" actions. Implement `MenuDropdown.jsx` in the header. Add `exportCSV(type)` to `storage.js` with `\uFEFF` BOM prefix and paise-to-rupee conversion. Create comprehensive `README.md` and MIT `LICENSE`.
  Verify (mechanical): Validate that `storage.exportCSV('sales')`, `storage.exportCSV('stockIn')`, and `storage.exportCSV('inventory')` generate valid UTF-8 CSV strings containing `\uFEFF` and correct header columns. Verify `README.md` and `LICENSE` exist.
  Learner check: Open the `⋮` menu, download the CSV files and confirm they open cleanly, verify "How it works" opens the 4-step guide, and check the documentation.
  Commit: `Add onboarding modal, menu dropdown, UTF-8 BOM CSV exports, README, and LICENSE`

## Hands-on Checkpoints

- [x] Early usable behavior explored — Slice 2 (Sell bottom sheet & kernel sales loop)
- [ ] Final kick-the-tires exploration and feedback completed — Slice 4

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [ ] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: [to be recorded upon completion]
Route and stops: [to be recorded upon completion]
Edit outcome: [to be recorded upon completion]
Reflection: [to be recorded upon completion]
Activity mode: [to be recorded upon completion]

## Revisions

---
doc: prd
status: approved
---

# Sopko — Product Requirements

A tactile, mobile-first web app for single-owner Indian kirana shops to track daily sales, manage inventory, and avoid stockouts without logins or backends.
Source: `scope.md > The Unique Kernel` and `scope.md > Who It's For`.

## The Core Journey
1. **First Arrival:** The shopkeeper opens Sopko on his phone. A clean 4-step onboarding modal ("How it works") explains the core loop. He taps "Load sample data" to explore pre-loaded items, or "Got it" to start clean.
2. **Daily Counter Rush (Default View):** The app opens on the **Stock Out** tab. At the top banner, he glances at today's total revenue (e.g., "₹4,250") and a yellow/red low-stock alert pill (e.g., "3 low stock").
3. **Recording a Sale:** When a customer buys items, he taps the item card. A bottom sheet slides up with the item name, current stock, price, and a quantity stepper (default 1). He taps the large green "Sell ₹X" button.
4. **Immediate Feedback:** The sheet closes, the item card quantity drops immediately, today's sales total updates, and the low-stock counter adjusts.
5. **Stock Arrival / Restocking:** When deliveries arrive, he switches to the **Stock In** tab using the bottom navigation bar. He searches or scrolls his items, taps an existing item to enter quantity received and delivery cost, or taps "+ New item" to add a new product.
6. **Closing & Backup:** At closing, he opens the top-right `⋮` menu and taps "Export CSV" to back up his records and view them in Excel or Google Sheets.

## Screens and Layout
- **Header Banner (Persistent across tabs):** Displays "Today's sales" with today's date, large ₹ total, and the low-stock status pill (e.g., "3 low stock"). Top-right features a `⋮` (More) menu.
- **Top-Right Menu (`⋮`):** Dropdown containing:
  - Export CSV (primary backup and spreadsheet export)
  - Load Sample Data (with confirmation if data exists)
  - How It Works (re-opens the 4-step onboarding guide)
- **Home / Stock Out Screen (Default Tab):** Scrollable list of items rendered as large, thumb-friendly cards showing item name, selling price, and stock status pill.
- **Sell Bottom Sheet (Modal overlay):** Slides up from bottom when an item card is tapped. Displays item title, current stock pill, selling price (pre-filled, editable), unified quantity stepper (`-` `1` `+`) with direct typing support, live-updating total, and full-width green "Sell ₹X" confirmation button.
- **Stock In Screen (Second Tab):** Sticky search bar, "+ New item" button, and list of existing items for fast restock entry. Tapping "+ New item" opens a clean entry form.
- **Bottom Navigation Bar (Fixed):** Two thumb-reachable tabs: "Stock out" (active by default) and "Stock in".

## Look and Feel
Warm, tactile, light-mode, subtle elevation, soft ambient shadows, and muted semantic status pills. No harsh 1px wireframes, no neon colors, no dark mode, no purple gradients.
Implemented via unified CSS variables (design tokens):

### Colors & Surfaces
- Canvas / Primary Background: `#FAF9F5` (warm cream)
- Elevated Card & Bottom Sheet Surface: `#FFFFFF` with `1px solid #E6E4DD`
- Dashboard Header Banner ("Today's sales"): `#E8F3E8`
- Inactive Backdrop / Overlay: `#F2F4F7` surface with `#D0D5DD` skeleton bars

### Typography & Text Colors
- Font Family: System sans-serif (`system-ui`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, sans-serif)
- Base Size: Minimum `16px` body text for effortless legibility under shop lighting
- Primary Text (headings, item names, modal titles): `#181D19`
- Secondary Text (prices, subtitles, descriptions): `#606661`
- Hero Metric (₹ total and header date): `#285E2B`
- Interactive Link ("How it works"): `#2B6CB0` with underline
- Currency Formatting: Indian grouping format (`₹4,250`)

### Buttons & Controls
- Primary Action ("Sell ₹X"): Background `#2E6F34`, text `#FFFFFF`, radius `10px`, shadow `0 2px 5px rgba(46, 111, 52, 0.25)`
- Onboarding Primary ("Got it"): Background `#68A856`, text `#FFFFFF`, radius `10px`
- Secondary / Ghost ("Load sample data"): Background `#F0F2F5`, border `1px solid #CBD2D9`, text `#52606D`, radius `10px`
- Quantity Stepper (`-` `1` `+`): Single unified pill container, background `#DDE1E6`, border `1px solid #C4C9D0`, radius `8px`, text/icons `#33373B`
- Onboarding Step Badges (1–4): Solid circle `28px × 28px`, background `#407A45`, text `#FFFFFF`
- Touch Targets: Minimum `44px × 44px` across all buttons and inputs

### Status Pills (Radius `9999px`, Padding `4px 12px`, pastel fill, high-contrast text)
- In Stock ("12 left"): Background `#D3EED6`, text `#215A26`
- Low Stock ("3 low stock", "4 left"): Background `#F9E3BD`, text `#7A4B13`
- Out of Stock ("Out of stock"): Background `#FAD2CC`, text `#8C251D`

### Elevation & Borders
- Item Cards: Radius `12px`, border `1px solid #E4E2DC`, shadow `0 3px 8px -2px rgba(24, 29, 25, 0.06), 0 2px 4px -1px rgba(24, 29, 25, 0.04)`
- Bottom Navigation Bar: Background `#FAF9F5`, top border `1px solid #E2E0D8`, active tab `#2E6F34`, inactive tab `#5A605D`
- Bottom Sheet: Top radius `20px`, top border `1px solid #E4E2DC`, shadow `0 -4px 16px rgba(0, 0, 0, 0.06)`

## Features and Behavior

### 1. Onboarding Guide ("How it works")
Source: `scope.md > The Core Loop`
- On first visit (or when selected from `⋮` menu), a modal appears with 4 illustrated steps:
  1. **Add goods:** Stock your items and prices.
  2. **Record sales:** One tap during customer rush.
  3. **Check your day:** See today's total ₹ and low-stock alerts.
  4. **Take it with you:** Export CSV anytime to open in Excel or Sheets.
- Action buttons: "Got it" (closes modal and saves first-visit flag) and "Load sample data".
- Acceptance Criteria:
  - [ ] Opening app with empty storage automatically triggers the guide modal.
  - [ ] Clicking "Got it" dismisses the modal and retains dismissal in `localStorage`.
  - [ ] Selecting "How it works" from the `⋮` menu displays the modal at any time.

### 2. Header Banner & Daily Sales Tracking
Source: `scope.md > The Core Loop > step 4`
- Displays "Today's sales", today's date formatted cleanly, and the calculated sum of all sales made today in ₹ (e.g., `₹4,250`).
- Displays a status pill counting all items currently at or below their low-stock threshold (e.g., "3 low stock"). If zero items are low, displays "All stocked" in green.
- Acceptance Criteria:
  - [ ] Daily sales total dynamically sums all sales where timestamp falls on today's calendar date.
  - [ ] Status pill updates immediately whenever an item's stock drops to or below threshold.

### 3. Stock Out & Counter Sales
Source: `scope.md > The Core Loop > step 2`
- Displays items in a responsive grid/list of touch-friendly cards.
- Tapping an in-stock item opens the Sell bottom sheet.
- Stepper defaults quantity to `1`. Tapping `+` increments quantity; `-` decrements (minimum `1`).
- Selling price defaults to the item's configured price, but can be adjusted for that single transaction.
- Oversell Prevention: Stepper `+` disables when quantity equals available stock. If manually typed above available stock, a red warning appears: "Only N left in stock", and the Sell button is disabled or clamped to available quantity.
- Zero Stock Handling: Items with 0 quantity show a red "Out of stock" badge. Tapping does not open the sell sheet; card shows a direct "Add stock" button linking to Stock In.
- Selling Action: Tapping "Sell ₹X" records the transaction (item ID, quantity, unit price, total, timestamp), subtracts quantity from inventory, updates today's sales total, and closes sheet.
- Acceptance Criteria:
  - [ ] Tapping card opens bottom sheet with pre-populated price and quantity = 1.
  - [ ] Quantity cannot exceed available inventory; stock never drops below 0.
  - [ ] Confirming sale decreases item stock immediately and adds amount to today's sales.

### 4. Stock In & Inventory Management
Source: `scope.md > The Core Loop > step 1`
- Includes a live search filter box at the top to quickly find existing items by name or code.
- Restocking Existing Items: Tapping an item opens a quick restock panel/form:
  - Quantity received (number input)
  - Cost price for this delivery (pre-filled with previous cost, editable)
  - Date (defaults to today)
  - "Add to stock" button updates inventory and records restock history.
- Adding New Items: Big "+ New item" button opens form with:
  - Item Name (required)
  - Selling Price (₹, required)
  - Cost Price (₹, optional/recommended)
  - Starting Quantity (required)
  - Low-stock Threshold (defaults to `5`)
  - Product Code (optional)
- Batch Workflow: After adding or restocking an item, user remains on the list so they can immediately restock the next product without reopening menus.
- Acceptance Criteria:
  - [ ] Searching filters items instantly by name or code.
  - [ ] Adding restock quantity increments the item's current stock count immediately.
  - [ ] Creating a new item makes it available immediately in both Stock In and Stock Out.
  - [ ] Low-stock threshold defaults to 5 if left empty.

### 5. Data Management, Export & Sample Data
Source: `scope.md > The POC Boundary`
- **Export CSV:** Generates and downloads a clean, standard `.csv` file directly in the browser containing:
  - Current Inventory (Code, Name, Cost Price, Sell Price, Current Stock, Threshold, Status)
  - Sales Log (Date/Time, Item Name, Quantity Sold, Unit Sell Price, Total ₹)
  - Functions both as spreadsheet integration for Excel/Google Sheets and as a user backup.
- **Load Sample Data:** Populates realistic kirana store inventory (e.g., Aashirvaad Atta 5kg, Tata Salt 1kg, Maggi 2-Min Noodles, Parle-G Biscuits, Amul Butter 100g, Fortune Sunflower Oil 1L) with varying stock levels, including one low-stock item and one out-of-stock item.
  - If existing data is present, prompts user: "This will replace your current data. Continue?"
- Acceptance Criteria:
  - [ ] Tapping "Export CSV" immediately triggers browser download of valid CSV file.
  - [ ] "Load Sample Data" seeds complete set of realistic test items.
  - [ ] Re-loading sample data when records exist prompts for confirmation before overwriting.

## States and Boundaries
- **First Use / Empty State:** With no items in `localStorage`, the onboarding modal appears automatically. The main screen displays a friendly empty state with an icon, message ("No items in stock yet"), and a large "Load sample data" button alongside a "+ Add your first item" shortcut.
- **Normal Operating State:** Multiple items in inventory; Stock Out displays cards with green ("N left") or yellow ("N left - Low stock") badges.
- **Low-Stock State:** When `quantity <= lowStockThreshold` (and `> 0`), card displays yellow pill (`#F9E3BD`) and header badge increments.
- **Out-of-Stock State:** When `quantity == 0`, card displays red pill (`#FAD2CC`), Sell button is disabled, and "Add stock" shortcut is provided.
- **Persistence Boundary:** All items, sales logs, and onboarding state persist entirely in browser `localStorage`. No network connection is required after initial page load.

## Product Decisions
- **Mobile Bottom Navigation with 2 Tabs:** Shopkeepers hold phones with one hand; thumb-accessible tabs for Stock Out and Stock In maximize speed.
- **Modal Instead of 3rd Tab for Guide:** Keeps the daily workspace clutter-free while leaving help accessible via `⋮` menu.
- **Editable Selling Price on Sale:** Kirana owners occasionally discount for regular customers or round change; allowing inline price override prevents workarounds.
- **Optional Product Code:** Small neighborhood shops track goods by visual familiarity and name rather than SKU barcodes.
- **CSV as Export and Backup:** Fulfills both the requirement to analyze numbers in Excel and the need to protect data without cloud servers.

## What We're Building
- Single-page mobile-responsive web application running 100% in browser.
- Design token system adhering strictly to the warm tactile palette.
- Persistent header banner with today's sales total and low-stock count.
- Stock Out counter sales screen with bottom sheet and oversell prevention.
- Stock In inventory screen with search, quick restock, and "+ New item" modal/form.
- Onboarding 4-step modal ("How it works") on first visit and in `⋮` menu.
- `⋮` menu with one-tap CSV export and sample data generator.
- LocalStorage persistence for offline reliability.

## Deferred From the POC
- **7-day sales trend chart:** Deferred to keep v1 build under 2–4 hours; daily total covers counter needs.
- **Voice input with confirmation:** Deferred to v2 to avoid Web Speech API browser compatibility hurdles.
- **Live Google Sheets sync:** Avoids Google OAuth credentials and backend proxies in v1.

## Non-Goals
- User logins, multi-user permissions, or cloud authentication.
- External server, backend database, or cloud hosting dependencies.
- Barcode scanning via device camera.

## Open Questions
- *None blocking spec or build.* All functional behaviors, edge cases, layout dimensions, and design tokens are fully decided.


---
doc: scope
status: approved
---

# KiranaTrack

A lightweight, zero-setup stock and sales web app designed for local Indian kirana store owners to replace manual notepad and spreadsheet tallying.

## The Unique Kernel
Countertop-speed inventory tracking built specifically for single-operator retail: a two-tab (Stock In / Stock Out) mobile workflow that records transactions in seconds, provides immediate low-stock visual cues, and exports directly to CSV—works without internet once loaded, with zero login or server overhead.

## Who It's For
The learner's uncle, who runs a local neighborhood kirana (grocery) store in India. 
- **What he does today:** Scribbles sales items on a paper notepad during customer rushes, then spends late evenings after closing manually entering deductions into an Excel sheet. He frequently only discovers an item is out of stock when a customer asks for it.
- **What he's trying to do:** Log sales with a quick phone tap right as they happen, prevent unexpected stockouts, and eliminate nighttime spreadsheet data entry.

## The Core Loop
1. When receiving goods or stocking shelves, the shopkeeper opens the **Stock In** tab to record products (code, type/name, cost, selling price, quantity, date, optional custom low-stock threshold).
2. During the sales rush, the shopkeeper opens the **Stock Out** tab and taps to log sold items (quantity, sell price, sale date). The app warns or blocks if quantity sold exceeds available stock.
3. Stock decrements immediately. If quantity hits the threshold (default of 5 units, with optional per-item override), a clear **Low-Stock warning** flags the item.
4. At a glance, the shopkeeper sees **Today's Total Sales** revenue.
5. At the end of the day or week, he taps **Export CSV** to back up his records and open his numbers directly in Excel or Google Sheets.

## Inspiration & Identity
- **Vibe & Feel:** Utilitarian, fast, high-contrast, and forgiving.
- **Design Elements:** Large, thumb-friendly tap targets suitable for one-handed phone use behind a busy retail counter. Clean Indian Rupee (₹) formatting and clear visual status badges (green in-stock, yellow/red low-stock).

## Why This Matters to the Learner
A dual-purpose project: solving a genuine, observed daily pain point for their uncle's business while practicing disciplined spec-driven development to master guiding an AI agent from plan to clean execution.

## What "Working" Looks Like
A 1-minute video demo showing:
1. Loading realistic kirana sample items (e.g., Atta, Maggi, Tata Salt, Biscuits) with the single-click **Sample Data** button.
2. Add a new item on Stock In and see it appear in current stock.
3. Switching to the **Stock Out** tab, recording a sale with a quick tap, and watching the stock level drop in real time (and preventing/warning against overselling).
4. Demonstrating the low-stock warning badge triggering when an item reaches or drops below threshold (default 5 or custom).
5. Showing **Today's Total Sales** update immediately.
6. Tapping **Export Data** to download a clean CSV spreadsheet backup ready for Excel or Google Sheets.

## The POC Boundary (Now)
- **Stock In Tab:** Add/restock items with product code, name/type, cost, selling price, quantity, stocking date, and optional low-stock threshold override (defaulting to 5).
- **Stock Out Tab:** Fast tap/selection to record sales with quantity, selling price, and date sold, with validation warning/blocking sales exceeding available stock.
- **Live Inventory View:** Current stock count with visual low-stock warning badges.
- **Daily Sales Metric:** Today's total sales revenue calculation.
- **Data Portability & Backup:** One-tap export to CSV spreadsheet that serves as both spreadsheet integration and data backup.
- **Demo Accelerator:** "Load Sample Data" button to demonstrate the full loop in under 60 seconds without manual typing.
- **Persistence & Connectivity:** Local browser storage (`localStorage`), works without internet once loaded, zero server, zero login.

## Later
1. Voice input with a confirmation step before saving.
2. 7-day sales trend chart.
3. Deeper analytics: top-selling products and slow-moving inventory alerts.
4. Direct live sync to Google Sheets via API.

## Explicitly Cut
- **User Accounts & Authentication:** Unnecessary barrier for a single-owner phone tool; adds login friction.
- **Backend Server & Cloud Database:** Avoids ongoing hosting costs, server maintenance, and offline connection failures; local storage is instant and resilient.
- **Barcode Camera Scanner:** Camera permissions, poor lighting, and wrinkled packet barcodes slow down v1 compared to large, rapid touch buttons.

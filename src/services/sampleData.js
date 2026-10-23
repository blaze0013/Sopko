/**
 * Realistic Indian Kirana store sample data for Sopko
 * Includes inventory with varied stock statuses (In stock, Low stock, Out of stock)
 * and sales history spread across the past 7 days.
 */

export function generateSampleData() {
  const now = new Date();

  // Helper to get ISO timestamp for N days ago at specific hour
  function getDateAgo(daysAgo, hours = 11, minutes = 30) {
    const d = new Date(now);
    d.setDate(d.getDate() - daysAgo);
    d.setHours(hours, minutes, 0, 0);
    return d.toISOString();
  }

  const items = [
    {
      id: 'item-atta-5kg',
      name: 'Aashirvaad Shudh Chakki Atta 5kg',
      code: '890103001',
      unit: '5kg bag',
      costPrice: 22000, // ₹220.00
      sellPrice: 25500, // ₹255.00
      currentStock: 14,
      lowStockThreshold: 5,
      archived: false,
      createdAt: getDateAgo(30),
      updatedAt: getDateAgo(0)
    },
    {
      id: 'item-tata-salt',
      name: 'Tata Salt Vacuum Evaporated 1kg',
      code: '890103002',
      unit: '1kg pouch',
      costPrice: 2200, // ₹22.00
      sellPrice: 2800, // ₹28.00
      currentStock: 28,
      lowStockThreshold: 10,
      archived: false,
      createdAt: getDateAgo(30),
      updatedAt: getDateAgo(0)
    },
    {
      id: 'item-maggi',
      name: 'Maggi 2-Minute Masala Noodles 70g',
      code: '890103003',
      unit: 'packet',
      costPrice: 1100, // ₹11.00
      sellPrice: 1400, // ₹14.00
      currentStock: 4, // LOW STOCK (threshold: 10)
      lowStockThreshold: 10,
      archived: false,
      createdAt: getDateAgo(30),
      updatedAt: getDateAgo(0)
    },
    {
      id: 'item-parle-g',
      name: 'Parle-G Original Glucose Biscuits 250g',
      code: '890103004',
      unit: 'packet',
      costPrice: 2400, // ₹24.00
      sellPrice: 3000, // ₹30.00
      currentStock: 3, // LOW STOCK (threshold: 5)
      lowStockThreshold: 5,
      archived: false,
      createdAt: getDateAgo(30),
      updatedAt: getDateAgo(0)
    },
    {
      id: 'item-amul-butter',
      name: 'Amul Butter Pasteurised 100g',
      code: '890103005',
      unit: 'block',
      costPrice: 5000, // ₹50.00
      sellPrice: 5800, // ₹58.00
      currentStock: 12,
      lowStockThreshold: 5,
      archived: false,
      createdAt: getDateAgo(30),
      updatedAt: getDateAgo(0)
    },
    {
      id: 'item-fortune-oil',
      name: 'Fortune Sunlite Refined Sunflower Oil 1L',
      code: '890103006',
      unit: '1L pouch',
      costPrice: 13000, // ₹130.00
      sellPrice: 15500, // ₹155.00
      currentStock: 0, // OUT OF STOCK
      lowStockThreshold: 5,
      archived: false,
      createdAt: getDateAgo(30),
      updatedAt: getDateAgo(1)
    },
    {
      id: 'item-surf-excel',
      name: 'Surf Excel Quick Wash Detergent 500g',
      code: '890103007',
      unit: 'packet',
      costPrice: 9500, // ₹95.00
      sellPrice: 11500, // ₹115.00
      currentStock: 9,
      lowStockThreshold: 5,
      archived: false,
      createdAt: getDateAgo(30),
      updatedAt: getDateAgo(0)
    },
    {
      id: 'item-taj-tea',
      name: 'Taj Mahal Tea 250g',
      code: '890103008',
      unit: 'carton',
      costPrice: 16500, // ₹165.00
      sellPrice: 19500, // ₹195.00
      currentStock: 2, // LOW STOCK (threshold: 4)
      lowStockThreshold: 4,
      archived: false,
      createdAt: getDateAgo(30),
      updatedAt: getDateAgo(0)
    }
  ];

  const stockIns = [
    {
      id: 'stockin-1',
      itemId: 'item-atta-5kg',
      itemName: 'Aashirvaad Shudh Chakki Atta 5kg',
      quantity: 20,
      unitCost: 22000,
      receivedAt: getDateAgo(7, 10, 0)
    },
    {
      id: 'stockin-2',
      itemId: 'item-tata-salt',
      itemName: 'Tata Salt Vacuum Evaporated 1kg',
      quantity: 35,
      unitCost: 2200,
      receivedAt: getDateAgo(6, 14, 30)
    },
    {
      id: 'stockin-3',
      itemId: 'item-maggi',
      itemName: 'Maggi 2-Minute Masala Noodles 70g',
      quantity: 50,
      unitCost: 1100,
      receivedAt: getDateAgo(5, 11, 0)
    },
    {
      id: 'stockin-4',
      itemId: 'item-parle-g',
      itemName: 'Parle-G Original Glucose Biscuits 250g',
      quantity: 40,
      unitCost: 2400,
      receivedAt: getDateAgo(4, 9, 15)
    },
    {
      id: 'stockin-5',
      itemId: 'item-amul-butter',
      itemName: 'Amul Butter Pasteurised 100g',
      quantity: 20,
      unitCost: 5000,
      receivedAt: getDateAgo(3, 16, 0)
    }
  ];

  const sales = [
    // Today (4 sales totaling ₹4,250)
    {
      id: 'sale-today-1',
      itemId: 'item-atta-5kg',
      itemName: 'Aashirvaad Shudh Chakki Atta 5kg',
      quantity: 10,
      unitPrice: 25500,
      unitCost: 22000,
      totalAmount: 255000, // ₹2,550
      soldAt: getDateAgo(0, 9, 30)
    },
    {
      id: 'sale-today-2',
      itemId: 'item-surf-excel',
      itemName: 'Surf Excel Quick Wash Detergent 500g',
      quantity: 10,
      unitPrice: 11500,
      unitCost: 9500,
      totalAmount: 115000, // ₹1,150
      soldAt: getDateAgo(0, 11, 45)
    },
    {
      id: 'sale-today-3',
      itemId: 'item-parle-g',
      itemName: 'Parle-G Original Glucose Biscuits 250g',
      quantity: 11,
      unitPrice: 3000,
      unitCost: 2400,
      totalAmount: 33000, // ₹330
      soldAt: getDateAgo(0, 14, 15)
    },
    {
      id: 'sale-today-4',
      itemId: 'item-maggi',
      itemName: 'Maggi 2-Minute Masala Noodles 70g',
      quantity: 15,
      unitPrice: 1400,
      unitCost: 1100,
      totalAmount: 21000, // ₹210
      soldAt: getDateAgo(0, 16, 20)
    },

    // 1 day ago
    {
      id: 'sale-d1-1',
      itemId: 'item-amul-butter',
      itemName: 'Amul Butter Pasteurised 100g',
      quantity: 4,
      unitPrice: 5800,
      unitCost: 5000,
      totalAmount: 23200,
      soldAt: getDateAgo(1, 10, 15)
    },
    {
      id: 'sale-d1-2',
      itemId: 'item-fortune-oil',
      itemName: 'Fortune Sunlite Refined Sunflower Oil 1L',
      quantity: 6,
      unitPrice: 15500,
      unitCost: 13000,
      totalAmount: 93000,
      soldAt: getDateAgo(1, 15, 40)
    },

    // 2 days ago
    {
      id: 'sale-d2-1',
      itemId: 'item-atta-5kg',
      itemName: 'Aashirvaad Shudh Chakki Atta 5kg',
      quantity: 3,
      unitPrice: 25500,
      unitCost: 22000,
      totalAmount: 76500,
      soldAt: getDateAgo(2, 11, 10)
    },
    {
      id: 'sale-d2-2',
      itemId: 'item-taj-tea',
      itemName: 'Taj Mahal Tea 250g',
      quantity: 2,
      unitPrice: 19500,
      unitCost: 16500,
      totalAmount: 39000,
      soldAt: getDateAgo(2, 17, 25)
    },

    // 3 days ago
    {
      id: 'sale-d3-1',
      itemId: 'item-tata-salt',
      itemName: 'Tata Salt Vacuum Evaporated 1kg',
      quantity: 5,
      unitPrice: 2800,
      unitCost: 2200,
      totalAmount: 14000,
      soldAt: getDateAgo(3, 12, 0)
    },
    {
      id: 'sale-d3-2',
      itemId: 'item-maggi',
      itemName: 'Maggi 2-Minute Masala Noodles 70g',
      quantity: 12,
      unitPrice: 1400,
      unitCost: 1100,
      totalAmount: 16800,
      soldAt: getDateAgo(3, 18, 30)
    },

    // 4 days ago
    {
      id: 'sale-d4-1',
      itemId: 'item-parle-g',
      itemName: 'Parle-G Original Glucose Biscuits 250g',
      quantity: 8,
      unitPrice: 3000,
      unitCost: 2400,
      totalAmount: 24000,
      soldAt: getDateAgo(4, 13, 20)
    },

    // 5 days ago
    {
      id: 'sale-d5-1',
      itemId: 'item-amul-butter',
      itemName: 'Amul Butter Pasteurised 100g',
      quantity: 3,
      unitPrice: 5800,
      unitCost: 5000,
      totalAmount: 17400,
      soldAt: getDateAgo(5, 15, 0)
    },

    // 6 days ago
    {
      id: 'sale-d6-1',
      itemId: 'item-surf-excel',
      itemName: 'Surf Excel Quick Wash Detergent 500g',
      quantity: 2,
      unitPrice: 11500,
      unitCost: 9500,
      totalAmount: 23000,
      soldAt: getDateAgo(6, 16, 45)
    }
  ];

  return {
    schemaVersion: 1,
    items,
    stockIns,
    sales
  };
}

/**
 * Currency utilities for Sopko
 * All monetary values internally stored as integer paise (1 Rupee = 100 paise)
 */

/**
 * Formats a number using Indian grouping system (e.g., 1,50,000 or 4,250)
 * @param {number} num - whole number part
 * @returns {string}
 */
export function formatIndianNumber(num) {
  const s = Math.abs(num).toString();
  if (s.length <= 3) return s;
  const lastThree = s.substring(s.length - 3);
  const otherNumbers = s.substring(0, s.length - 3);
  const formattedOthers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  return formattedOthers + ',' + lastThree;
}

/**
 * Converts integer paise to formatted Rupee string with Indian grouping
 * Example: 425000 -> "₹4,250"
 * Example: 425050 -> "₹4,250.50"
 * @param {number} paise
 * @returns {string}
 */
export function formatRupees(paise) {
  if (paise === null || paise === undefined || isNaN(paise)) return '₹0';
  const isNegative = paise < 0;
  const absPaise = Math.abs(Math.round(paise));
  const rupees = Math.floor(absPaise / 100);
  const remainingPaise = absPaise % 100;

  const rupeeString = formatIndianNumber(rupees);
  const sign = isNegative ? '-' : '';

  if (remainingPaise === 0) {
    return `${sign}₹${rupeeString}`;
  }
  const paiseString = remainingPaise.toString().padStart(2, '0');
  return `${sign}₹${rupeeString}.${paiseString}`;
}

/**
 * Converts Rupee input (number or string like "40" or "40.50") to integer paise
 * @param {number|string} rupeeInput
 * @returns {number} integer paise
 */
export function rupeesToPaise(rupeeInput) {
  if (!rupeeInput) return 0;
  const cleaned = typeof rupeeInput === 'string' ? rupeeInput.replace(/[^\d.]/g, '') : rupeeInput;
  const floatVal = parseFloat(cleaned);
  if (isNaN(floatVal)) return 0;
  return Math.round(floatVal * 100);
}

/**
 * Converts integer paise to decimal Rupee number (e.g. 1050 -> 10.5)
 * @param {number} paise
 * @returns {number}
 */
export function paiseToRupees(paise) {
  if (!paise) return 0;
  return paise / 100;
}


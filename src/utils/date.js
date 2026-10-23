/**
 * Date utilities for Sopko
 * Computes "today" from device's local date, not UTC
 */

/**
 * Returns today's date string in YYYY-MM-DD format based on local device time
 * @returns {string}
 */
export function getLocalTodayString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Checks if a date/timestamp string occurred on local device "today"
 * @param {string|Date} dateOrIso
 * @returns {boolean}
 */
export function isToday(dateOrIso) {
  if (!dateOrIso) return false;
  const target = new Date(dateOrIso);
  if (isNaN(target.getTime())) return false;

  const now = new Date();
  return (
    target.getFullYear() === now.getFullYear() &&
    target.getMonth() === now.getMonth() &&
    target.getDate() === now.getDate()
  );
}

/**
 * Formats a date for header display (e.g., "Saturday, 24 Oct" or "24 Oct 2026")
 * @param {Date} [date]
 * @returns {string}
 */
export function formatHeaderDate(date = new Date()) {
  const options = { weekday: 'short', day: 'numeric', month: 'short' };
  return date.toLocaleDateString('en-IN', options);
}

/**
 * Formats full date/time for CSV or records
 * @param {string|Date} dateOrIso
 * @returns {string}
 */
export function formatDateTime(dateOrIso) {
  if (!dateOrIso) return '';
  const d = new Date(dateOrIso);
  if (isNaN(d.getTime())) return String(dateOrIso);
  return d.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

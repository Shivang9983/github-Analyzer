/**
 * Formats an ISO date string into a user-friendly format (e.g., "Joined Oct 24, 2014").
 * @param {string} dateString 
 * @returns {string}
 */
export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return `Joined ${date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })}`;
}

/**
 * Compacts large numbers into a readable format (e.g., 1200 -> "1.2k").
 * @param {number} num 
 * @returns {string}
 */
export function formatNumber(num) {
  if (num === null || num === undefined) return '0';
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toString();
}

/**
 * Formats size in KB (GitHub's standard) into KB or MB.
 * @param {number} sizeKb 
 * @returns {string}
 */
export function formatSize(sizeKb) {
  if (sizeKb === null || sizeKb === undefined) return '0 KB';
  if (sizeKb >= 1024) {
    return `${(sizeKb / 1024).toFixed(1).replace(/\.0$/, '')} MB`;
  }
  return `${sizeKb} KB`;
}

/**
 * Sanitizes GitHub usernames to contain only allowed characters (alphanumeric and dashes).
 * @param {string} username 
 * @returns {string}
 */
export function sanitizeUsername(username) {
  if (!username) return '';
  // GitHub usernames can only contain alphanumeric characters or hyphens and cannot start or end with a hyphen.
  return username.trim().replace(/[^a-zA-Z0-9-]/g, '');
}

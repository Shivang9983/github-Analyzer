
export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return `Joined ${date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })}`;
}


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


export function formatSize(sizeKb) {
  if (sizeKb === null || sizeKb === undefined) return '0 KB';
  if (sizeKb >= 1024) {
    return `${(sizeKb / 1024).toFixed(1).replace(/\.0$/, '')} MB`;
  }
  return `${sizeKb} KB`;
}


export function sanitizeUsername(username) {
  if (!username) return '';
  // GitHub usernames can only contain alphanumeric characters or hyphens and cannot start or end with a hyphen.
  return username.trim().replace(/[^a-zA-Z0-9-]/g, '');
}

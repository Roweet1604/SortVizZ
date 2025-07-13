export const parseNumbers = (text) => {
  if (!text || typeof text !== 'string') {
    return [];
  }

  const normalizedText = text
    .toLowerCase()
    .replace(/\s+and\s+/g, ',')
    .replace(/\s+comma\s+/g, ',')
    .replace(/[^\d\s,.-]/g, '') // Keep only digits, spaces, commas, periods, and minus signs
    .replace(/\s+/g, ',')
    .replace(/,+/g, ',')
    .replace(/^,+|,+$/g, '');

  if (!normalizedText) {
    return [];
  }

  const numbers = normalizedText
    .split(',')
    .map(str => str.trim())
    .filter(str => str.length > 0)
    .map(str => {
      const num = parseFloat(str);
      return isNaN(num) ? null : Math.round(num); // Convert to integers
    })
    .filter((num) => num !== null);

  return [...new Set(numbers)]; // Remove duplicates
};

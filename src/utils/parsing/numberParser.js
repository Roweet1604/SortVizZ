export const parseNumbers = (text) => {
  if (!text || typeof text !== 'string') {
    return [];
  }

  // Replace common word separators with commas
  const normalizedText = text
    .toLowerCase()
    .replace(/\s+and\s+/g, ',')
    .replace(/\s+comma\s+/g, ',')
    .replace(/[^\d\s,.-]/g, '') // Keep only digits, spaces, commas, periods, and minus signs
    .replace(/\s+/g, ',') // Replace spaces with commas
    .replace(/,+/g, ',') // Replace multiple commas with single comma
    .replace(/^,+|,+$/g, ''); // Remove leading/trailing commas

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
    .filter((num) => num !== null)
    .filter(num => num >= -1000 && num <= 1000); // Reasonable range

  return [...new Set(numbers)]; // Remove duplicates
};
// getPropertyRate.js
export default function getPropertyRate(property) {
  if (!property?.rates) return 'No rate available';

  const { monthly, weekly, nightly, price } = property.rates;

  let ratesArray = [];

  if (monthly) {
    ratesArray.push(`$${monthly.toLocaleString()}/month`);
  }
  if (weekly) {
    ratesArray.push(`$${weekly.toLocaleString()}/week`);
  }
  if (nightly) {
    ratesArray.push(`$${nightly.toLocaleString()}/night`);
  }
  if (price) {
    ratesArray.push(`$${price.toLocaleString()}`);
  }

  return ratesArray.length > 0 ? ratesArray.join(', ') : 'No rate available';
}

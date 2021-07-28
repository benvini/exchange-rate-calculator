import getUnicodeFlagIcon from 'country-flag-icons/unicode';

export const COIN_SYMBOLS = {
  ils: '₪',
  usd: '$',
  gbp: '£',
  eur: '€',
  thb: '฿',
  inr: '₹',
  aud: '$',
  ars: '$',
};

export const FLAGS = {
  usd: getUnicodeFlagIcon('US'),
  ils: getUnicodeFlagIcon('ILS'),
  eur: getUnicodeFlagIcon('EUR'),
  gbp: getUnicodeFlagIcon('GBP'),
  inr: getUnicodeFlagIcon('INR'),
  aud: getUnicodeFlagIcon('AUD'),
  thb: getUnicodeFlagIcon('THB'),
  ars: getUnicodeFlagIcon('ARS'),
};

export const DECLARATIVE_CURRENCY_NAMES = {
  ils: 'Israeli New Shekels',
  usd: 'US Dollars',
  aud: 'Australian Dollars',
  thb: 'Thai Baht',
  inr: 'Indian Rupees',
  gbp: 'British Pounds',
  ars: 'Argentine Pesos',
  eur: 'Euros',
};

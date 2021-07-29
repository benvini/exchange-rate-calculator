import {Rates} from '../../types/types';
import {COIN_SYMBOLS, DECLARATIVE_CURRENCY_NAMES} from '../../constants/contants';

export const getSymbolByKey = (key: string) => {
  let fetchedSymbol = '';
  switch (key) {
    case 'ars':
      fetchedSymbol = COIN_SYMBOLS.ars;
      break;
    case 'aud':
      fetchedSymbol = COIN_SYMBOLS.aud;
      break;
    case 'eur':
      fetchedSymbol = COIN_SYMBOLS.eur;
      break;
    case 'gbp':
      fetchedSymbol = COIN_SYMBOLS.gbp;
      break;
    case 'ils':
      fetchedSymbol = COIN_SYMBOLS.ils;
      break;
    case 'inr':
      fetchedSymbol = COIN_SYMBOLS.inr;
      break;
    case 'thb':
      fetchedSymbol = COIN_SYMBOLS.thb;
      break;
    case 'usd':
      fetchedSymbol = COIN_SYMBOLS.usd;
      break;
    default:
      break;
  }

  return fetchedSymbol;
};

export const getRateByKey = (key: string, rates: Rates) => {
  let rate = null;
  switch (key) {
    case 'ils':
      rate = rates.ILS;
      break;
    case 'ars':
      rate = rates.ARS;
      break;
    case 'inr':
      rate = rates.INR;
      break;
    case 'aud':
      rate = rates.AUD;
      break;
    case 'usd':
      rate = rates.USD;
      break;
    case 'thb':
      rate = rates.THB;
      break;
    case 'gbp':
      rate = rates.GBP;
      break;
  }

  return rate;
};

export const isNumber = (str: string) => {
  let result = false;
  if (str === '') {
    return false;
  }
  const strToNumber = Number(str);

  if (typeof strToNumber === 'number' && !isNaN(strToNumber)) {
    result = true;
  }

  return result;
};

export const getDeclarativeNameByKey = (key: string) => {
  let declarativeName;
  switch (key) {
    case 'ils':
      declarativeName = DECLARATIVE_CURRENCY_NAMES.ils;
      break;
    case 'ars':
      declarativeName = DECLARATIVE_CURRENCY_NAMES.ars;
      break;
    case 'inr':
      declarativeName = DECLARATIVE_CURRENCY_NAMES.inr;
      break;
    case 'aud':
      declarativeName = DECLARATIVE_CURRENCY_NAMES.aud;
      break;
    case 'usd':
      declarativeName = DECLARATIVE_CURRENCY_NAMES.usd;
      break;
    case 'thb':
      declarativeName = DECLARATIVE_CURRENCY_NAMES.thb;
      break;
    case 'gbp':
      declarativeName = DECLARATIVE_CURRENCY_NAMES.gbp;
      break;
    case 'eur':
      declarativeName = DECLARATIVE_CURRENCY_NAMES.eur;
      break;
  }

  return declarativeName;
};

export const getDestRateByKey = (key: string, rates: Rates) => {
  if (key === 'eur') {
    return 1;
  }
  const destRate = getRateByKey(key, rates);
  return destRate;
};

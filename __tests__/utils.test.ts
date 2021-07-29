import {getSymbolByKey, getDeclarativeNameByKey, isNumber, getDestRateByKey, getRateByKey, convertBaseCurrencyToEur} from '../ts/shared/utils/utils';
import {COIN_SYMBOLS, DECLARATIVE_CURRENCY_NAMES, DECLARATIVE_CURRENCY_NAMES_HE} from '../ts/constants/contants';
import i18next from 'i18next';

//mock rates data
const rates = {
  INR: 2.2,
  USD: 3.4,
  ILS: 4.4,
  GBP: 6.5,
  THB: 1.5,
  ARS: 3.3,
  AUD: 4.4,
};

describe('Testing Utils Functions', () => {
  test('getSymbolByKey - should return the correct symbol', () => {
    expect(getSymbolByKey('ils')).toBe(COIN_SYMBOLS.ils);
  });
  test('getSymbolByKey - given an invalidKey should return empty string', () => {
    expect(getSymbolByKey('ilsss')).toBe('');
  });
  test('getDeclarativeNameByKey - should return the correct declarative name', () => {
    expect(getDeclarativeNameByKey('ils')).toBe(i18next.language === 'en' ? DECLARATIVE_CURRENCY_NAMES.ils : DECLARATIVE_CURRENCY_NAMES_HE.ils);
  });
  test('getDeclarativeNameByKey - given an invalidKey should return undefined declarative name', () => {
    expect(getDeclarativeNameByKey('ilsss')).toBe(undefined);
  });
  test('isNumber - given a string of a valid number, should return true', () => {
    expect(isNumber('4')).toBe(true);
  });
  test('isNumber - given a string of invalid number, should return false', () => {
    expect(isNumber('3h')).toBe(false);
  });
  test('getRateByKey - given a key and rates array, should return the correct rate', () => {
    expect(getRateByKey('ils', rates)).toBe(rates.ILS);
  });
  test('getRateByKey - given an invalid key, should return null', () => {
    expect(getRateByKey('ilsss', rates)).toBe(null);
  });
  test('getDestRateByKey - given a key and rates array, should return the correct rate', () => {
    expect(getDestRateByKey('ils', rates)).toBe(rates.ILS);
  });
  test('getDestRateByKey - given an invalid key, should return null', () => {
    expect(getDestRateByKey('ilsss', rates)).toBe(null);
  });
  test('getDestRateByKey - given euro as a key, should return 1', () => {
    expect(getDestRateByKey('eur', rates)).toBe(1);
  });
  test('convertBaseCurrencyToEur - given euro as base currency, should return passed amount', () => {
    expect(convertBaseCurrencyToEur('eur', 2, rates)).toBe(2);
  });
  test('convertBaseCurrencyToEur - given wrong key as a base currency, should return null', () => {
    expect(convertBaseCurrencyToEur('ilsss', 2, rates)).toBe(null);
  });
  test('convertBaseCurrencyToEur - given a valid key and amount, should return the currency converted to euros', () => {
    expect(convertBaseCurrencyToEur('ils', 2, rates)).toBe(2 / rates.ILS);
  });
});

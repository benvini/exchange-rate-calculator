import {getSymbolByKey, getDeclarativeNameByKey, isNumber, getDestRateByKey, getRateByKey} from '../ts/shared/utils/utils';
import {COIN_SYMBOLS, DECLARATIVE_CURRENCY_NAMES} from '../ts/constants/contants';

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

describe('~~ My Tests ~~', () => {
  test('should return the correct symbol', () => {
    expect(getSymbolByKey('ils')).toBe(COIN_SYMBOLS.ils);
  });
  test('given an invalidKey should return empty string', () => {
    expect(getSymbolByKey('ilsss')).toBe('');
  });
  test('should return the correct declarative name', () => {
    expect(getDeclarativeNameByKey('ils')).toBe(DECLARATIVE_CURRENCY_NAMES.ils);
  });
  test('given an invalidKey should return undefined declarative name', () => {
    expect(getDeclarativeNameByKey('ilsss')).toBe(undefined);
  });
  test('given a string of a valid number, should return true', () => {
    expect(isNumber('4')).toBe(true);
  });
  test('given a string of invalid number, should return false', () => {
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
});

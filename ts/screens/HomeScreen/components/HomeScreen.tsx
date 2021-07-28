import React, {useCallback, useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';

import {getSymbolByText, getRateByKey, isNumber, getDeclarativeNameByKey, getDestRateByKey} from '../../../shared/utils/utils';
import {getExchangeRate} from '../../../shared/utils/api';
import {COIN_SYMBOLS, FLAGS} from '../../../constants/contants';
import {styles} from '../styles/styles';
import {Screen, Typography} from '../../../shared/components';
import Spinner from '../../../shared/components/Spinner';

const ScreenContainer = styled(Screen)`
  align-items: center;
`;

const ErrorContainer = styled(Screen)`
  align-items: center;
  justify-content: center;
`;

const Label = styled(Typography)`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 8px;
`;

const StyledErrorText = styled(Typography)`
  color: red;
  margin-bottom: 8px;
`;

const ReverseContainer = styled.View`
  border: 3px solid ${({theme: {palette}}) => palette.primary};
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

const DropDownContainer = styled.View``;

const StyledIcon = styled(Icon)`
  color: ${({theme: {palette}}) => palette.primary};
`;

const Button = styled.TouchableOpacity`
  padding: 8px;
  border-radius: 4px;
  background-color: ${(props) => (props.disabled ? '#ccc' : ({theme: {palette}}) => palette.primary)};
  align-items: center;
  height: 40px;
  margin: 8px;
`;

const Input = styled.TextInput`
  padding: 8px;
  border: 1px solid #ccc;
  height: 40px;
  width: 200px;
  margin: 10px;
  color: ${({theme: {palette}}) => palette.textColor};
`;

const TouchableOpacity = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  margin: 2px;
  margin-bottom: 12px;
`;

const HomeScreen = () => {
  const [isOriginOpen, setIsOriginOpen] = useState(false);
  const [isDestOpen, setIsDestOpen] = useState(false);
  const [originValue, setOriginValue] = useState('ils');
  const [destValue, setDestValue] = useState('ils');
  const [errorMessage, setErrorMessage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [convertedValue, setConvertedValue] = useState<number | null>(null);
  const [error, setError] = useState(false);
  const [inputText, setInputText] = useState(COIN_SYMBOLS.ils);
  const [items, setItems] = useState([
    {label: 'ILS - Israeli Shekel', value: 'ils', icon: () => <Typography>{FLAGS.ils}</Typography>},
    {label: 'USD - US Dollar', value: 'usd', icon: () => <Typography>{FLAGS.usd}</Typography>},
    {label: 'EURO - Euro', value: 'eur', icon: () => <Typography>{FLAGS.eur}</Typography>},
    {label: 'GBP - British Pound', value: 'gbp', icon: () => <Typography>{FLAGS.gbp}</Typography>},
    {label: 'INR - Indian Rupee', value: 'inr', icon: () => <Typography>{FLAGS.inr}</Typography>},
    {label: 'AUD - Australian Dollar', value: 'aud', icon: () => <Typography>{FLAGS.aud}</Typography>},
    {label: 'THB - Thai Baht', value: 'thb', icon: () => <Typography>{FLAGS.thb}</Typography>},
    {label: 'ARS - Argentine Peso', value: 'ars', icon: () => <Typography>{FLAGS.ars}</Typography>},
  ]);
  const {t} = useTranslation('homeScreen');

  const convertBaseCurrencyToEur = useCallback((originVal, amount, rates) => {
    if (originVal === 'eur') {
      return amount;
    }
    const originRateEuroBased = getRateByKey(originVal, rates);
    return originRateEuroBased ? amount / originRateEuroBased : null;
  }, []);

  const onConvertClicked = useCallback(async () => {
    try {
      const amount = Number(inputText.slice(2));
      setIsLoading(true);
      const response = await getExchangeRate();
      setIsLoading(false);
      const rates = response.rates;
      const euro = convertBaseCurrencyToEur(originValue, amount, rates);
      const destCurrencyRate = getDestRateByKey(destValue, rates);
      if (destCurrencyRate && euro) {
        setConvertedValue(euro * destCurrencyRate);
      }
    } catch (e) {
      setError(true);
    }
  }, [originValue, destValue, inputText, convertBaseCurrencyToEur]);

  const onInputChange = useCallback(
    (text: string) => {
      const inputWithSymbol = `${getSymbolByText(originValue)} ${text.slice(1).trim()}`;
      setInputText(inputWithSymbol);
      setConvertedValue(null);
      const userInputAmount = inputWithSymbol.slice(2);
      if (isNumber(userInputAmount) && Number(userInputAmount) > 0) {
        setErrorMessage(false);
      } else {
        setErrorMessage(true);
      }
    },
    [originValue],
  );

  useEffect(() => {
    setInputText(`${getSymbolByText(originValue)} ${inputText.slice(1).trim()}`);
  }, [originValue, inputText]);

  const onOriginClicked = useCallback(() => {
    setIsDestOpen(false);
    setIsOriginOpen((currIsOpen) => !currIsOpen);
    setConvertedValue(null);
  }, []);

  const onDestClicked = useCallback(() => {
    setIsOriginOpen(false);
    setIsDestOpen((currIsOpen) => !currIsOpen);
    setConvertedValue(null);
  }, []);

  const onReverse = useCallback(() => {
    setOriginValue(destValue);
    setDestValue(originValue);
    setConvertedValue(null);
  }, [destValue, originValue]);

  const getConvertionMessage = useCallback(() => {
    return `${inputText.slice(2)} ${getDeclarativeNameByKey(originValue)} = ${convertedValue?.toFixed(2)} ${getDeclarativeNameByKey(destValue)}`;
  }, [inputText, originValue, convertedValue, destValue]);

  if (error) {
    return (
      <ErrorContainer>
        <Typography>{t('unableConvertCurrency')}</Typography>
      </ErrorContainer>
    );
  }

  return (
    <ScreenContainer>
      <Label>{t('amount')}</Label>
      <Input onChangeText={onInputChange} value={inputText} />
      {errorMessage && <StyledErrorText>{t('invalidAmount')}</StyledErrorText>}
      <Label>{t('from')}</Label>
      <DropDownContainer style={{...(isOriginOpen && {zIndex: 10})}}>
        <DropDownPicker
          containerProps={{style: {...styles.dropDown}}}
          searchable={true}
          open={isOriginOpen}
          value={originValue}
          items={items}
          setOpen={onOriginClicked}
          setValue={setOriginValue}
          setItems={setItems}
        />
      </DropDownContainer>
      <TouchableOpacity onPress={onReverse}>
        <ReverseContainer>
          <StyledIcon name="ios-swap-vertical" size={30} />
        </ReverseContainer>
      </TouchableOpacity>
      <Label>{t('to')}</Label>
      <DropDownContainer style={{...(isDestOpen && {zIndex: 10})}}>
        <DropDownPicker
          containerProps={{style: {...styles.dropDown}}}
          searchable={true}
          open={isDestOpen}
          value={destValue}
          items={items}
          setOpen={onDestClicked}
          setValue={setDestValue}
          setItems={setItems}
        />
      </DropDownContainer>
      <Button onPress={onConvertClicked} disabled={errorMessage || destValue === originValue}>
        <Typography>{t('convert')}</Typography>
      </Button>
      {isLoading && <Spinner />}
      {convertedValue && !isLoading && <Typography>{getConvertionMessage()}</Typography>}
    </ScreenContainer>
  );
};

export default HomeScreen;

import {API_KEY} from '@env';
import axios from 'axios';
import {BASE_URL} from '../../../config';

//base currency is Euro, by default, with the free api plan
export const getExchangeRate = async () => {
  const response = await axios.get(`${BASE_URL}/latest?access_key=${API_KEY}&symbols=USD,AUD,ILS,ARS,THB,INR,GBP`);
  return response.data;
};

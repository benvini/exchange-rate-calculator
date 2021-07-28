import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import ExchangeRateNavigator from './ExchangeRateNavigator';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <ExchangeRateNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;

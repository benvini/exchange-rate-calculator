import React from 'react';
import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen/components/HomeScreen';
import {ROUTES} from './routes';

const defaultNavOptions: StackNavigationOptions = {
  headerShown: false,
};

const opacityTransition: object = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: {
      animation: 'timing',
    },
    close: {
      animation: 'timing',
      config: {
        duration: 600,
      },
    },
  },
  cardStyleInterpolator: ({current}: {current: {progress: number}}) => ({
    cardStyle: {
      opacity: current.progress,
    },
  }),
};

const ExchangeRateStackNavigator = createStackNavigator();

const ExchangeRateNavigator = () => {
  const {home} = ROUTES;
  return (
    <ExchangeRateStackNavigator.Navigator screenOptions={{...defaultNavOptions, ...opacityTransition}}>
      <ExchangeRateStackNavigator.Screen name={home} component={HomeScreen} />
    </ExchangeRateStackNavigator.Navigator>
  );
};

export default ExchangeRateNavigator;

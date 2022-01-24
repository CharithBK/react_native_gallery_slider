import React from 'react';
import User from '../screens/user';
import Home from '../screens/home';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const AppStackNavigator = createStackNavigator();

export const AppDetailsNavigator = () => {
  return (
    <AppStackNavigator.Navigator>
      <AppStackNavigator.Screen name={'Home'} component={Home} options={{headerShown: false}} />
      <AppStackNavigator.Screen name={'User'} component={User} />
    </AppStackNavigator.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AppDetailsNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;

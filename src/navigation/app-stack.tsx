import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ProductDetailsScreen from 'src/screens/product/product-details';
import { AppStackParamList } from './types/app-stack-param-list';

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ProductDetailsScreen">
    <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} />
  </Stack.Navigator>
);

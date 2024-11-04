import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AppStackParamList } from './types/app-stack-param-list';

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="t">
    <Stack.Screen name="t" component={() => <></>} />
  </Stack.Navigator>
);

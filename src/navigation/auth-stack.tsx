import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AppLoadingScreen from 'src/screens/app-loading-screen';
import { AuthStackParamList } from './types/auth-stack-param-list';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="AppLoadingScreen">
    <Stack.Screen name="AppLoadingScreen" component={AppLoadingScreen} />
  </Stack.Navigator>
);

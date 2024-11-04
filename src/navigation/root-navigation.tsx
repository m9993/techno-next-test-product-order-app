import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';
import { AppStack } from './app-stack';
import { AuthStack } from './auth-stack';
import BottomTab from './bottom-tab';
import { RootNavigationParamList } from './types/root-navigation-param-list';

const RootStack = createNativeStackNavigator<RootNavigationParamList>();

export const RootNavigation = () => (
  <RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="AuthStack">
    <RootStack.Screen name="AuthStack" component={AuthStack} />
    <RootStack.Screen name="AppStack" component={AppStack} />
    <RootStack.Screen name="BottomTab" component={BottomTab} />
  </RootStack.Navigator>
);

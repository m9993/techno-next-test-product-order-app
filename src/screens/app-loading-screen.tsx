import { useAppNavigation } from '@navigation';
import { colors } from '@theme';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import ScreenWrapperComponent from 'src/components/wrappers/screen-wraper-component';

const dimensions = Dimensions.get('window');
export default function AppLoadingScreen() {
  const navigation = useAppNavigation();

  useEffect(() => {
    navigation.navigate('BottomTab', { screen: 'HomeScreen' });
  }, []);

  return (
    <ScreenWrapperComponent statusBar={false} scrollable={false} safeAreaView={false}>
      <LinearGradient colors={colors.light.linear} style={{ flex: 1 }}></LinearGradient>
    </ScreenWrapperComponent>
  );
}

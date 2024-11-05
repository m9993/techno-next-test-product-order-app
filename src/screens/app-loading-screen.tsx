import { useAppNavigation } from '@navigation';
import { getCurrentLocation } from '@services';
import { colors } from '@theme';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect } from 'react';
import ScreenWrapperComponent from 'src/components/wrappers/screen-wraper-component';
import { useAppDispatch } from 'src/store/hooks';
import { setCurrentLocation } from 'src/store/slices/app-slice';

export default function AppLoadingScreen() {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await updateLocation();
      navigation.navigate('BottomTab', { screen: 'HomeScreen' });
    })();
  }, []);

  const updateLocation = useCallback(async () => {
    const location = await getCurrentLocation();
    if (location) {
      dispatch(
        setCurrentLocation({
          latitude: location.latitude,
          longitude: location.longitude,
          address: location.address,
        }),
      );
    }
  }, []);

  return (
    <ScreenWrapperComponent statusBar={false} scrollable={false} safeAreaView={false}>
      <LinearGradient colors={colors.light.linear} style={{ flex: 1 }}></LinearGradient>
    </ScreenWrapperComponent>
  );
}

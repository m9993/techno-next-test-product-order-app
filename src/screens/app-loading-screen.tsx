import { useAppNavigation } from '@navigation';
import { getCurrentLocation } from '@services';
import { colors, textStyles } from '@theme';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect } from 'react';
import { Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Logo } from 'src/assets/svg/logo';
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
      <LinearGradient colors={colors.light.linear} style={{ flex: 1 }}>
        <Animatable.View
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite">
          <Logo width={150} height={150} />
        </Animatable.View>
        <Text
          style={[
            textStyles.poppinsRegular14,
            { color: colors.light.grey2, textAlign: 'center', marginBottom: 30 },
          ]}>
          Please wait...
        </Text>
      </LinearGradient>
    </ScreenWrapperComponent>
  );
}

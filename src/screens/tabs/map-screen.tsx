import { useAppNavigation } from '@navigation';
import { getCurrentLocation } from '@services';
import { colors } from '@theme';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import ButtonComponent from 'src/components/common/button-component';
import HeaderComponent from 'src/components/headers/header-component';
import ScreenWrapperComponent from 'src/components/wrappers/screen-wraper-component';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { setCurrentLocation } from 'src/store/slices/app-slice';

export default function MapScreen() {
  const { isDarkTheme, currentLocation } = useAppSelector(s => s.app);
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

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
    <ScreenWrapperComponent scrollable={false}>
      <HeaderComponent title="My Location" />
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: currentLocation.latitude || 39.97343096953564,
            longitude: currentLocation.longitude || -75.12520805829233,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {currentLocation.latitude && currentLocation.longitude && (
            <Marker
              title="Current Location"
              description={currentLocation.address || ''}
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
            />
          )}
        </MapView>
        <ButtonComponent
          title="Sync Location"
          onPress={updateLocation}
          containerStyle={{ marginTop: 20 }}
        />
      </View>
    </ScreenWrapperComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  map: {
    backgroundColor: colors.light.grey4,
    width: '100%',
    height: '75%',
  },
});

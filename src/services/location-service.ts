import * as Location from 'expo-location';
import { flashMessage } from './flash-message-service';

export const getCurrentLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    flashMessage.danger({ message: 'Permission to access location was denied' });
    return;
  }

  const location = await Location.getCurrentPositionAsync({});
  const adrs = await Location.reverseGeocodeAsync({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  });

  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    address: adrs[0].formattedAddress,
  };
};

import NetInfo from '@react-native-community/netinfo';

export async function checkInternetConnection() {
  try {
    const response = await NetInfo.fetch();
    return response.isConnected ?? false;
  } catch (error) {
    return false;
  }
}

import { flashMessage } from '@services';
import { Linking } from 'react-native';

export const openUrl = (url: string) => {
  try {
    Linking.openURL(url);
  } catch (e) {
    flashMessage.warning({ message: 'Failed to open url.' });
  }
};

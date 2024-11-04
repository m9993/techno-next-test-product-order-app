import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from './i18n';

// Function to set the preferred locale and persist it in AsyncStorage
export const setPreferredLocale = async (locale: string) => {
  // locale = 'en'; //TODO: change to 'bn' for 'Bengali' Language
  i18n.locale = locale;
  await AsyncStorage.setItem('preferredLocale', locale);
};

// Function to get the preferred locale and set it in the i18n instance
export const getPreferredLocale = async () => {
  // const locale = 'en'; //TODO: change to 'bn' for 'Bengali' Language
  const locale = await AsyncStorage.getItem('preferredLocale');
  if (locale) {
    i18n.locale = locale;
  } else {
    i18n.locale = 'en';
  }
  return locale;
};

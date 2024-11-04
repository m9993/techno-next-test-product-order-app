import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import bengali from './bengali.json';
import english from './english.json';

translations = {
  en: english,
  bn: bengali,
};
const i18n = new I18n(translations);

i18n.locale = Localization.locale;

i18n.fallbacks = true;

export default i18n;

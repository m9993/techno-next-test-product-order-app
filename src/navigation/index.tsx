import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootNavigationParamList } from './types/root-navigation-param-list';

export const useAppNavigation = () => {
  return useNavigation<NavigationProp<RootNavigationParamList>>();
};

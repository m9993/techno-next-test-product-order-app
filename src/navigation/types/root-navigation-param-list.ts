import { NavigatorScreenParams } from '@react-navigation/native';
import { AppStackParamList } from './app-stack-param-list';
import { AuthStackParamList } from './auth-stack-param-list';
import { BottomTabParamList } from './bottom-tab-param-list';

export type RootNavigationParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  BottomTab: NavigatorScreenParams<BottomTabParamList>;
  AppStack: NavigatorScreenParams<AppStackParamList>;
};

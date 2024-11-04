import { colors } from '@theme';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import React, { memo, ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import { useAppSelector } from 'src/store/hooks';

type PropTypes = {
  statusBar?: boolean;
  statusBarStyle?: 'auto' | 'dark' | 'inverted' | 'light';
  translucent?: boolean;
  scrollable?: boolean;
  keyboard?: boolean;
  safeAreaView?: boolean;
  refreshing?: boolean;
  onRefresh?(): void;
  backgroundColor?: string;
  children: ReactNode;
};

export default memo(function ScreenWrapperComponent({
  statusBar = true,
  statusBarStyle,
  translucent = false,
  scrollable = true,
  keyboard = false,
  safeAreaView = true,
  refreshing = false,
  onRefresh,
  backgroundColor,
  children,
}: PropTypes) {
  const { isDarkTheme } = useAppSelector(state => state.app);
  const bg = backgroundColor
    ? backgroundColor
    : isDarkTheme
      ? colors.dark.background
      : colors.light.background;

  const content = !scrollable ? (
    children
  ) : (
    <ScrollView
      refreshControl={
        onRefresh ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> : <></>
      }>
      {children}
    </ScrollView>
  );

  const keyboardWrap = !keyboard ? (
    content
  ) : (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      {content}
    </KeyboardAvoidingView>
  );

  return (
    <>
      {safeAreaView ? (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: bg,
            paddingTop: !translucent ? Constants.statusBarHeight : 0,
          }}>
          <StatusBar
            style={statusBarStyle ? statusBarStyle : isDarkTheme ? 'light' : 'dark'}
            hidden={!statusBar}
          />
          {keyboardWrap}
        </SafeAreaView>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: bg,
            //paddingTop: !translucent ? Constants.statusBarHeight : 0,
          }}>
          <StatusBar
            style={statusBarStyle ? statusBarStyle : isDarkTheme ? 'light' : 'dark'}
            hidden={!statusBar}
          />
          {keyboardWrap}
        </View>
      )}
    </>
  );
});

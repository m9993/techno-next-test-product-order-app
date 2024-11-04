import { useAppNavigation } from '@navigation';
import React from 'react';
import HeaderComponent from 'src/components/headers/header-component';
import ScreenWrapperComponent from 'src/components/wrappers/screen-wraper-component';
import { useAppSelector } from 'src/store/hooks';

export default function HomeScreen() {
  const { isDarkTheme } = useAppSelector(s => s.app);
  const navigation = useAppNavigation();

  return (
    <ScreenWrapperComponent scrollable={false}>
      <HeaderComponent title="Home" />
    </ScreenWrapperComponent>
  );
}

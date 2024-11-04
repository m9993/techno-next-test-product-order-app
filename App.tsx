import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { store } from '@store';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect } from 'react';
import { LogBox } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { getPreferredLocale } from 'src/languages/localization';
import { RootNavigation } from 'src/navigation/root-navigation';

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

const App = () => {
  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#ffffff',
    },
  };

  const [fontsLoaded] = useFonts({
    'Poppins-Bold': require('src/assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Medium': require('src/assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('src/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('src/assets/fonts/Poppins-SemiBold.ttf'),
  });

  useEffect(() => {
    // Language Local Setup
    (async function a() {
      await getPreferredLocale();
    })();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NavigationContainer onReady={onLayoutRootView} theme={MyTheme}>
          <RootNavigation />
        </NavigationContainer>
        <FlashMessage
          position={'bottom'}
          // titleStyle={textStyles.poppinsMedium14}
          // textStyle={textStyles.poppinsRegular13}
          style={{ marginTop: 30, marginHorizontal: 20, borderRadius: 8 }}
        />
      </Provider>
    </QueryClientProvider>
  );
};

export default App;

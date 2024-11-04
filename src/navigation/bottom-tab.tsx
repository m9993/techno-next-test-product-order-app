import Feather from '@expo/vector-icons/Feather';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, textStyles } from '@theme';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import i18n from 'src/languages/i18n';
import CartScreen from 'src/screens/tabs/cart-screen';
import HistoryScreen from 'src/screens/tabs/history-screen';
import HomeScreen from 'src/screens/tabs/home-screen';
import MapScreen from 'src/screens/tabs/map-screen';
import { useAppSelector } from 'src/store/hooks';

// const dimensions = Dimensions.get('window');
const Tab = createBottomTabNavigator();

export default function BottomTab() {
  interface Iicon {
    focused?: boolean;
    color?: string;
    size?: number;
  }
  const BottomTabList = [
    {
      name: 'HomeScreen',
      component: HomeScreen,
      tabBarLabel: i18n.t('Home'),
      tabBarIcon: ({ color }: Iicon) => <Feather name="home" size={20} color={color} />,
    },
    {
      name: 'MapScreen',
      component: MapScreen,
      tabBarLabel: i18n.t('Map'),
      tabBarIcon: ({ color }: Iicon) => <Feather name="map-pin" size={20} color={color} />,
    },
    // {
    //   name: 'AddScreen',
    //   component: HomeScreen,
    //   tabBarLabel: '',
    //   tabBarIcon: ({ color }: Iicon) => <Add color={color} />,
    // },
    {
      name: 'HistoryScreen',
      component: HistoryScreen,
      tabBarLabel: i18n.t('History'),
      tabBarIcon: ({ color }: Iicon) => <Feather name="clock" size={20} color={color} />,
    },
    {
      name: 'CartScreen',
      component: CartScreen,
      tabBarLabel: i18n.t('Cart'),
      tabBarIcon: ({ color }: Iicon) => <Feather name="shopping-cart" size={20} color={color} />,
    },
  ];

  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}>
      {BottomTabList.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.name}
          component={item.component}
          options={{ tabBarLabel: item.tabBarLabel, tabBarIcon: item.tabBarIcon }}
        />
      ))}
    </Tab.Navigator>
  );
}

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { isDarkTheme } = useAppSelector(s => s.app);

  const bg = isDarkTheme ? colors.dark.black : colors.light.white;
  const activeColor = isDarkTheme ? colors.dark.primary : colors.light.primary;
  const inActiveColor = isDarkTheme ? colors.dark.grey2 : colors.light.grey2;

  return (
    <View style={[styles.wrapper, { backgroundColor: bg }]}>
      <View style={styles.container}>
        {/* <BG color={'red'} style={{ position: 'absolute' }} /> */}
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate('BottomTab', { screen: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          // if (index === 2) {
          //   return (
          //     <TouchableOpacity
          //       key={index}
          //       activeOpacity={0.8}
          //       accessibilityRole="button"
          //       accessibilityState={isFocused ? { selected: true } : {}}
          //       accessibilityLabel={options.tabBarAccessibilityLabel}
          //       testID={options.tabBarTestID}
          //       onPress={() => {
          //         setShowModal(true);
          //       }}
          //       onLongPress={onLongPress}
          //       style={{ position: 'absolute', bottom: 38 }}>
          //       {options.tabBarIcon &&
          //         options.tabBarIcon({
          //           color: activeColor,
          //           focused: true,
          //           size: 0,
          //         })}
          //     </TouchableOpacity>
          //   );
          // } else
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 60,
                height: 44,
                // marginRight: index === 1 ? 40 : 16,
                // marginLeft: index === 3 ? 40 : 16,
              }}>
              {options.tabBarIcon &&
                options.tabBarIcon({
                  color: isFocused ? activeColor : inActiveColor,
                  focused: true,
                  size: 0,
                })}
              <Text
                style={[
                  isFocused ? textStyles.poppinsMedium12 : textStyles.poppinsMedium12,
                  { color: isFocused ? activeColor : inActiveColor },
                ]}>
                {label?.toString()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    paddingTop: 13,
    paddingBottom: Platform.OS === 'ios' ? 30 : 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

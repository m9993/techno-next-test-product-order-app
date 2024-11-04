import Feather from '@expo/vector-icons/Feather';
import { useAppNavigation } from '@navigation';
import { colors, commonStyles, textStyles } from '@theme';
import React, { memo } from 'react';
import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useAppSelector } from 'src/store/hooks';

type PropTypes = {
  containerStyle?: ViewStyle;
  title: string;
  titleStyle?: TextStyle;
  backBtnColor?: string;
  onBackPress?(): void;
};
export default memo(function SubHeaderComponent({
  containerStyle = {},
  title = 'Title',
  titleStyle = {},
  backBtnColor,
  onBackPress,
}: PropTypes) {
  const { isDarkTheme } = useAppSelector(state => state.app);
  const navigation = useAppNavigation();

  return (
    <View style={[commonStyles.rowStart, { padding: 20 }, containerStyle]}>
      <TouchableOpacity onPress={() => (onBackPress ? onBackPress() : navigation.goBack())}>
        <Feather
          name="arrow-left"
          size={24}
          color={backBtnColor ? backBtnColor : isDarkTheme ? colors.dark.grey1 : colors.light.grey1}
        />
      </TouchableOpacity>
      <Text
        style={[
          textStyles.poppinsMedium14,
          {
            color: isDarkTheme ? colors.dark.grey1 : colors.light.grey1,
            flex: 1,
            textAlign: 'center',
            paddingRight: 24,
          },
          titleStyle,
        ]}>
        {title}
      </Text>
    </View>
  );
});

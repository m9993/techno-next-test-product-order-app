import { colors, textStyles } from '@theme';
import React, { memo } from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { useAppSelector } from 'src/store/hooks';
import AvatarComponent from '../common/avatar-component';

type PropTypes = {
  containerStyle?: ViewStyle;
  title: string;
};
export default memo(function HeaderComponent({ containerStyle = {}, title }: PropTypes) {
  const { isDarkTheme } = useAppSelector(s => s.app);

  return (
    <View style={[{ padding: 20 }, containerStyle]}>
      <Text
        style={[
          textStyles.poppinsMedium14,
          {
            color: isDarkTheme ? colors.dark.grey1 : colors.light.grey1,
            textAlign: 'center',
          },
        ]}>
        {title}
      </Text>
      <View style={{ position: 'absolute', right: 20, top: 20 }}>
        <AvatarComponent size={25} name={'Unknown'} onPress={() => alert('Profile')} />
      </View>
    </View>
  );
});

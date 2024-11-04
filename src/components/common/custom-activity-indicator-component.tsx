import { colors } from '@theme';
import React, { memo } from 'react';
import { ActivityIndicator, StyleProp, ViewStyle } from 'react-native';
import { useAppSelector } from 'src/store/hooks';

type PropTypes = {
  color?: string;
  size?: number | 'small' | 'large' | undefined;
  containerStyle?: StyleProp<ViewStyle> | undefined;
};

export default memo(function CustomActivityIndicatorComponent({
  color,
  size = 'small',
  containerStyle,
}: PropTypes) {
  const { isDarkTheme } = useAppSelector(state => state.app);

  return (
    <ActivityIndicator
      size={size}
      color={color ? color : isDarkTheme ? colors.dark.primary : colors.light.primary}
      style={containerStyle}
    />
  );
});

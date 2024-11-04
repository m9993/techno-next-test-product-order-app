import { colors } from '@theme';
import { LinearGradient } from 'expo-linear-gradient';
import React, { memo } from 'react';
import { ViewStyle } from 'react-native';

type PropTypes = {
  containerStyle?: ViewStyle;
  linearColors?: string[];
};
export default memo(function SubHeaderBGComponent({
  containerStyle = {},
  linearColors = colors.light.linear,
}: PropTypes) {
  return (
    <LinearGradient
      colors={linearColors}
      style={[{ height: 140, overflow: 'hidden' }, containerStyle]}>
      <LinearGradient
        colors={['#FFFFFF14', '#FFFFFF00']}
        style={{
          width: 260,
          height: 260,
          borderRadius: 260 / 2,
          position: 'absolute',
          top: -65,
          right: -80,
        }}
      />
      <LinearGradient
        colors={['#FFFFFF0F', '#FFFFFF00']}
        style={{
          width: 260,
          height: 260,
          borderRadius: 260 / 2,
          position: 'absolute',
          top: -28,
          right: -130,
        }}
      />
      <LinearGradient
        colors={['#FFFFFF0A', '#FFFFFF00']}
        style={{
          width: 236,
          height: 236,
          borderRadius: 236 / 2,
          position: 'absolute',
          top: -65,
          right: -150,
        }}
      />
      <LinearGradient
        colors={['#FFFFFF21', '#FFFFFF00']}
        style={{
          width: 253,
          height: 253,
          borderRadius: 253 / 2,
          position: 'absolute',
          top: -145,
          right: -30,
        }}
      />
    </LinearGradient>
  );
});

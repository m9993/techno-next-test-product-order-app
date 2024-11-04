import { colors, textStyles } from '@theme';
import React, { memo } from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import CustomActivityIndicatorComponent from './custom-activity-indicator-component';

type PropTypes = {
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  title: string;
  onPress?(): void;
  isLoading?: boolean;
  disabled?: boolean;
  indicatorColor?: string;
};
export default memo(function ButtonComponent({
  containerStyle = {},
  titleStyle = {},
  title = 'Title',
  onPress,
  isLoading,
  disabled,
  indicatorColor = colors.light.white,
}: PropTypes) {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      activeOpacity={0.8}
      onPress={() => onPress && onPress()}
      disabled={isLoading || disabled}>
      {isLoading ? (
        <CustomActivityIndicatorComponent color={indicatorColor} size={27} />
      ) : (
        <Text style={[textStyles.poppinsMedium16, { color: colors.light.white }, titleStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light.primary,
    borderRadius: 8,
    padding: 13,
    alignItems: 'center',
  },
});

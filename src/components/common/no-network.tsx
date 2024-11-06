import { colors, commonStyles, textStyles } from '@theme';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import CustomActivityIndicatorComponent from './custom-activity-indicator-component';

export default function NoNetwork({ isLoading, onPress }: { isLoading: boolean; onPress(): void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        commonStyles.rowSpaceBetween,
        {
          gap: 10,
          backgroundColor: colors.light.red,
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 6,
          marginHorizontal: 16,
          marginBottom: 20,
        },
      ]}>
      <View>
        <Text style={[textStyles.poppinsMedium13, { color: colors.light.white }]}>
          No Internet Connection!
        </Text>
        <Text style={[textStyles.poppinsRegular10, { color: colors.light.white }]}>
          Tap to reload
        </Text>
      </View>
      {isLoading && <CustomActivityIndicatorComponent size="large" color={colors.light.white} />}
    </TouchableOpacity>
  );
}

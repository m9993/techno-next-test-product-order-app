import Feather from '@expo/vector-icons/Feather';
import { colors, textStyles } from '@theme';
import React, { memo, useRef, useState } from 'react';
import { TextInput, View, ViewStyle } from 'react-native';
import i18n from 'src/languages/i18n';
import { useAppSelector } from 'src/store/hooks';

type PropTypes = {
  onChange(v: string): void;
  placeholder?: string;
  containerStyle?: ViewStyle;
};
export default memo(function SearchInputComponent({
  onChange,
  placeholder = i18n.t('search here'),
  containerStyle,
}: PropTypes) {
  const { isDarkTheme } = useAppSelector(s => s.app);
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<TextInput>(null);

  return (
    <View
      style={[
        {
          height: 42,
          paddingVertical: 6,
          paddingHorizontal: 38,
          borderRadius: 8,
          backgroundColor: isDarkTheme ? colors.dark.black : colors.light.white,
          borderWidth: 1,
          borderColor: isDarkTheme ? colors.dark.grey3 : colors.light.grey3,
        },
        containerStyle,
      ]}>
      <TextInput
        ref={ref}
        onChangeText={v => onChange(v)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor={isDarkTheme ? '#7D818E' : colors.light.grey2}
        style={[
          textStyles.poppinsRegular14,
          {
            color: isDarkTheme ? colors.dark.white : colors.light.black,
          },
        ]}
      />
      <Feather
        name="search"
        size={18}
        color={
          isFocused
            ? isDarkTheme
              ? colors.dark.white
              : colors.light.black
            : isDarkTheme
              ? colors.dark.grey2
              : colors.light.grey2
        }
        style={{ position: 'absolute', top: 12, left: 12 }}
      />
      <Feather
        onPress={() => {
          ref?.current?.clear();
          onChange('');
        }}
        name="x"
        size={18}
        color={isDarkTheme ? colors.dark.grey2 : colors.light.grey2}
        style={{ position: 'absolute', top: 12, right: 12 }}
      />
    </View>
  );
});

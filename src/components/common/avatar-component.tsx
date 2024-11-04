import { colors } from '@theme';
import { getInverseColor, getRandomColor } from '@utils';
import React, { memo } from 'react';
import { Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import { useAppSelector } from 'src/store/hooks';

type PropTypes = {
  radius?: number;
  size?: number;
  name?: string | null;
  uri?: string | null;
  onPress?(): void;
};
const dimentions = Dimensions.get('window');
export default memo(function AvatarComponent({
  radius = dimentions.width / 2,
  size = 40,
  name = '',
  uri,
  onPress,
}: PropTypes) {
  const { isDarkTheme } = useAppSelector(s => s.app);
  const splitedName = name === '' || name === null ? ['Unknown'] : name?.split(' ');
  let firstString = '';
  let lastString = '';

  if (splitedName?.length > 0) firstString = splitedName[0].charAt(0);
  if (splitedName?.length > 1) lastString = splitedName[splitedName.length - 1].charAt(0);

  const bg = isDarkTheme ? colors.dark.grey1 : colors.light.grey3;
  const rc = getRandomColor();
  const tc = getInverseColor(rc);

  return (
    <>
      {uri ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            onPress && onPress();
          }}>
          <Image
            source={{ uri }}
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: bg,
            }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            {
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: rc,
            },
            { padding: 5, justifyContent: 'center', alignItems: 'center' },
          ]}
          onPress={() => {
            onPress && onPress();
          }}>
          <Text
            style={[
              {
                // fontFamily: typography.poppinsSemiBold,
                fontWeight: 'bold',
                fontSize: lastString === '' || lastString === null ? size / 2 : size / 3,
                textAlign: 'center',
                textTransform: 'uppercase',
                color: tc,
              },
            ]}>
            {firstString + lastString}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
});

import { colors, commonStyles, textStyles } from '@theme';
import React, { memo } from 'react';
import { Image, Text, View } from 'react-native';

interface IProps {
  id: string | number;
  title: string;
  price: string | number;
  category: string;
  description: string;
  image: string;
}

export default memo(function ProductCardComponent({
  id,
  title,
  price,
  category,
  description,
  image,
}: IProps) {
  return (
    <View
      style={{
        backgroundColor: colors.light.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#EFEFF6',
        padding: 10,
        paddingBottom: 16,
      }}>
      <Image
        source={{ uri: image }}
        style={{ height: 120, borderRadius: 6, backgroundColor: colors.light.grey5 }}
      />
      <View style={{ paddingTop: 12, paddingHorizontal: 8 }}>
        <Text style={[textStyles.poppinsSemiBold14, { color: colors.light.black }]}>{title}</Text>
        <Text
          style={[textStyles.poppinsRegular12, { color: colors.light.grey2, marginTop: 6 }]}
          numberOfLines={2}>
          {description}
        </Text>
        <View style={[commonStyles.rowSpaceBetween, { marginTop: 12 }]}>
          <Text style={[textStyles.poppinsSemiBold18, { color: colors.light.black }]}>{price}</Text>
          <Text
            style={[
              textStyles.poppinsMedium10,
              {
                color: colors.light.yellow,
                backgroundColor: '#F29C4C33',
                borderRadius: 4,
                paddingHorizontal: 6,
                paddingVertical: 3,
                textTransform: 'uppercase',
              },
            ]}>
            {category}
          </Text>
        </View>
      </View>
    </View>
  );
});

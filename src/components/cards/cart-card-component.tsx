import Feather from '@expo/vector-icons/Feather';
import { colors, commonStyles, textStyles } from '@theme';
import React, { memo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useAppDispatch } from 'src/store/hooks';
import { addToCart, decreaseFromCart, ICartItem } from 'src/store/slices/cart-slice';

export default memo(function CartCardComponent(cartItem: ICartItem) {
  const dispatch = useAppDispatch();
  const {
    id,
    image,
    title,
    description,
    category,
    price,
    rating: { rate, count },
    quantity,
  } = cartItem;

  return (
    <View
      style={{
        backgroundColor: colors.light.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#EFEFF6',
        padding: 10,
        paddingBottom: 16,
        overflow: 'hidden',
      }}>
      <View style={[commonStyles.rowStart, { gap: 10 }]}>
        <Image
          source={{ uri: image }}
          style={{ width: 70, height: 70, borderRadius: 6, backgroundColor: colors.light.grey5 }}
        />
        <View style={{ flex: 1 }}>
          <Text style={[textStyles.poppinsSemiBold12, { color: colors.light.black }]}>{title}</Text>
          <View style={[commonStyles.rowSpaceBetween]}>
            <Text
              style={[textStyles.poppinsSemiBold18, { color: colors.light.black, marginTop: 10 }]}>
              {price * quantity}
            </Text>
            <View style={[commonStyles.rowStart, { gap: 10 }]}>
              <TouchableOpacity
                onPress={() => dispatch(decreaseFromCart(cartItem))}
                activeOpacity={0.8}>
                <Feather
                  name="minus"
                  size={14}
                  color={colors.light.black}
                  style={{ padding: 6, backgroundColor: colors.light.background, borderRadius: 6 }}
                />
              </TouchableOpacity>
              <Text
                style={[
                  textStyles.poppinsSemiBold16,
                  { color: colors.light.black, marginTop: 10 },
                ]}>
                {quantity}
              </Text>
              <TouchableOpacity onPress={() => dispatch(addToCart(cartItem))} activeOpacity={0.8}>
                <Feather
                  name="plus"
                  size={14}
                  color={colors.light.black}
                  style={{ padding: 6, backgroundColor: colors.light.background, borderRadius: 6 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
});

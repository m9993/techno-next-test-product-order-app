import { useAppNavigation } from '@navigation';
import { colors, commonStyles, textStyles } from '@theme';
import React from 'react';
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import CartCardComponent from 'src/components/cards/cart-card-component';
import HeaderComponent from 'src/components/headers/header-component';
import ScreenWrapperComponent from 'src/components/wrappers/screen-wraper-component';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { initCart } from 'src/store/slices/cart-slice';

export default function CartScreen() {
  const { isDarkTheme } = useAppSelector(s => s.app);
  const { cart } = useAppSelector(s => s.cart);
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const sumPrice = cart
    .reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.price,
      0,
    )
    .toFixed(2);

  return (
    <ScreenWrapperComponent scrollable={false}>
      <HeaderComponent title="Cart" />
      <View style={[commonStyles.rowSpaceBetween, { gap: 5, paddingHorizontal: 16 }]}>
        <Text style={[textStyles.poppinsSemiBold14, { color: colors.light.grey2 }]}>
          Total Payable Amount
        </Text>
        <Text style={[textStyles.poppinsSemiBold20, { color: colors.light.red }]}>{sumPrice}</Text>
      </View>
      <FlatList
        data={cart}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              dispatch(initCart());
            }}
          />
        }
        keyExtractor={i => i.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16, marginTop: 10 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListFooterComponent={() => <View style={{ marginBottom: 200 }} />}
        ListEmptyComponent={() => (
          <Text
            style={[
              textStyles.poppinsMedium14,
              { color: colors.light.grey1, textAlign: 'center', marginVertical: 30 },
            ]}>
            Empty Cart
          </Text>
        )}
        renderItem={({ item: cart }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('AppStack', {
                screen: 'ProductDetailsScreen',
                params: { id: cart.id },
              })
            }>
            <CartCardComponent
              id={cart.id}
              image={cart.image}
              title={cart.title}
              description={cart.description}
              category={cart.category}
              price={cart.price}
              rating={{ rate: cart.rating.rate, count: cart.rating.count }}
              quantity={cart.quantity}
            />
          </TouchableOpacity>
        )}
      />
    </ScreenWrapperComponent>
  );
}

import { useAppNavigation } from '@navigation';
import { getProductsByLimitSort } from '@react-query';
import { colors, textStyles } from '@theme';
import React from 'react';
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import ProductCardComponent from 'src/components/cards/product-card-component';
import HeaderComponent from 'src/components/headers/header-component';
import ScreenWrapperComponent from 'src/components/wrappers/screen-wraper-component';
import { useAppSelector } from 'src/store/hooks';

export default function HomeScreen() {
  const { isDarkTheme } = useAppSelector(s => s.app);
  const navigation = useAppNavigation();
  const { data, isLoading, refetch } = getProductsByLimitSort(10, 'asc');

  return (
    <ScreenWrapperComponent scrollable={false}>
      <HeaderComponent title="Home" />
      <View style={{ paddingHorizontal: 16 }}>
        <Text style={[textStyles.poppinsSemiBold24, { color: colors.light.black }]}>Products</Text>
      </View>

      <FlatList
        data={data}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              refetch();
            }}
          />
        }
        keyExtractor={i => i.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListFooterComponent={() => <View style={{ marginBottom: 200 }} />}
        ListEmptyComponent={() => (
          <Text
            style={[
              textStyles.poppinsMedium14,
              { color: colors.light.grey1, textAlign: 'center' },
            ]}>
            No Data Found
          </Text>
        )}
        renderItem={({ item: product }) => (
          <TouchableOpacity activeOpacity={0.8}>
            <ProductCardComponent
              id={product.id}
              title={product.title}
              price={product.price}
              category={product.category}
              description={product.description}
              image={product.image}
            />
          </TouchableOpacity>
        )}
      />
    </ScreenWrapperComponent>
  );
}

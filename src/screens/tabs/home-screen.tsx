import { useAppNavigation } from '@navigation';
import { useNetInfo } from '@react-native-community/netinfo';
import { getProductsByLimitSort } from '@react-query';
import { colors, commonStyles, textStyles } from '@theme';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProductCardComponent from 'src/components/cards/product-card-component';
import NoNetwork from 'src/components/common/no-network';
import HeaderComponent from 'src/components/headers/header-component';
import ScreenWrapperComponent from 'src/components/wrappers/screen-wraper-component';
import { useAppSelector } from 'src/store/hooks';

export default function HomeScreen() {
  const { isDarkTheme } = useAppSelector(s => s.app);
  const navigation = useAppNavigation();
  const [dateTime, setDateTime] = useState(moment().format('MMMM Do YYYY, h:mm:ss a'));
  const [sort, setSort] = useState<'asc' | 'desc'>('asc');
  const { data, isLoading, isFetching, refetch } = getProductsByLimitSort(10, sort);
  const { isConnected } = useNetInfo();

  useEffect(() => {
    const updateTime = setInterval(() => {
      setDateTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
    }, 20000);

    return () => {
      clearInterval(updateTime);
    };
  }, []);

  return (
    <ScreenWrapperComponent scrollable={false}>
      <HeaderComponent title="Home" />
      {!isConnected && <NoNetwork isLoading={isFetching} onPress={refetch} />}

      <Text
        style={[textStyles.poppinsRegular14, { color: colors.light.black, paddingHorizontal: 16 }]}>
        {dateTime}
      </Text>

      <View style={[commonStyles.rowSpaceBetween, { paddingHorizontal: 16 }]}>
        <Text style={[textStyles.poppinsSemiBold24, { color: colors.light.black }]}>Products</Text>
        <View style={[commonStyles.rowStart, { gap: 5 }]}>
          <Text style={[textStyles.poppinsMedium12, { color: colors.light.grey1, marginRight: 5 }]}>
            Sort
          </Text>
          <Text
            onPress={() => setSort('asc')}
            style={[styles.sortByBtn, sort !== 'asc' && styles.inActiveSortByBtn]}>
            ASC
          </Text>
          <Text
            onPress={() => setSort('desc')}
            style={[styles.sortByBtn, sort !== 'desc' && styles.inActiveSortByBtn]}>
            DESC
          </Text>
        </View>
      </View>

      <FlatList
        data={data}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
        keyExtractor={i => i.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListFooterComponent={() => <View style={{ marginBottom: 200 }} />}
        ListEmptyComponent={() =>
          !isLoading && (
            <Text
              style={[
                textStyles.poppinsMedium14,
                { color: colors.light.grey1, textAlign: 'center', marginVertical: 30 },
              ]}>
              No Data Found
            </Text>
          )
        }
        renderItem={({ item: product }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('AppStack', {
                screen: 'ProductDetailsScreen',
                params: { id: product.id },
              })
            }>
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

const styles = StyleSheet.create({
  sortByBtn: {
    ...textStyles.poppinsRegular10,
    color: colors.light.white,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: colors.light.primary,
    width: 50,
    height: 25,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.light.grey4,
  },
  inActiveSortByBtn: {
    color: colors.light.grey1,
    backgroundColor: colors.light.white,
  },
});

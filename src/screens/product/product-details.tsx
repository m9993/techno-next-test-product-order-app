import { RouteProp, useRoute } from '@react-navigation/native';
import { getProductDetailsById } from '@react-query';
import { colors, commonStyles, textStyles } from '@theme';
import React from 'react';
import { Image, RefreshControl, ScrollView, Text, View } from 'react-native';
import CustomActivityIndicatorComponent from 'src/components/common/custom-activity-indicator-component';
import SubHeaderComponent from 'src/components/headers/sub-header-component';
import ScreenWrapperComponent from 'src/components/wrappers/screen-wraper-component';
import { AppStackParamList } from 'src/navigation/types/app-stack-param-list';

export default function ProductDetailsScreen() {
  const { params } = useRoute<RouteProp<AppStackParamList, 'ProductDetailsScreen'>>();
  const { isLoading, data, refetch } = getProductDetailsById(params.id);

  return (
    <ScreenWrapperComponent scrollable={false}>
      <SubHeaderComponent title="Product Details" />
      <Image
        source={{ uri: data.image }}
        style={{
          height: 200,
          borderRadius: 6,
          backgroundColor: colors.light.grey4,
        }}
      />

      {isLoading ? (
        <CustomActivityIndicatorComponent size="large" containerStyle={{ marginTop: 30 }} />
      ) : (
        <ScrollView
          style={{ paddingHorizontal: 16, marginTop: 30 }}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}>
          <Text style={[textStyles.poppinsSemiBold20, { color: colors.light.black }]}>
            {data.title}
          </Text>

          <View style={[commonStyles.rowSpaceBetween]}>
            <Text
              style={[
                textStyles.poppinsMedium10,
                {
                  color: colors.light.yellow,
                  backgroundColor: '#F29C4C33',
                  borderRadius: 4,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  textTransform: 'uppercase',
                },
              ]}>
              {data.category}
            </Text>
            <View style={{ alignItems: 'center' }}>
              <Text style={[textStyles.poppinsMedium12, { color: colors.light.grey1 }]}>
                Rating
              </Text>
              <Text style={[textStyles.poppinsMedium13, { color: colors.light.black }]}>
                {data.rating.rate} ({data.rating.count} reviews)
              </Text>
            </View>
          </View>
          <Text style={[textStyles.poppinsSemiBold30, { color: colors.light.black }]}>
            {data.price}
          </Text>
          <Text style={[textStyles.poppinsMedium12, { color: colors.light.grey1, marginTop: 20 }]}>
            Description
          </Text>
          <Text
            style={[
              textStyles.poppinsRegular13,
              { color: colors.light.black, textAlign: 'justify' },
            ]}>
            {data.description}
          </Text>
        </ScrollView>
      )}
    </ScreenWrapperComponent>
  );
}

import { server } from '@api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo } from '@react-native-community/netinfo';
import { useQuery } from 'react-query';

export const getProductsByLimitSort = (limit: number, sort: 'asc' | 'desc') => {
  const { isConnected } = useNetInfo();

  return useQuery({
    queryKey: ['get-products-by-limit-sort', sort],
    queryFn: async () => {
      let data = [];

      if (isConnected) {
        const res = await server.product.getProductsByLimitSort(limit, sort);
        data = res.data;

        await AsyncStorage.setItem(`products-${sort}`, JSON.stringify(data));
      } else {
        const localData = await AsyncStorage.getItem(`products-${sort}`);
        if (localData) {
          data = JSON.parse(localData);
        }
      }

      return data;
    },
  });
};

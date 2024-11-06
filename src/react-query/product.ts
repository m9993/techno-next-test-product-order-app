import { server } from '@api';
import { useQuery } from 'react-query';

export const getProductsByLimitSort = (limit: number, sort: 'asc' | 'desc') => {
  return useQuery({
    queryKey: ['get-products-by-limit-sort', limit, sort],
    queryFn: async () => {
      // const isConnected = await checkInternetConnection();
      // console.log(isConnected);

      const res = await server.product.getProductsByLimitSort(limit, sort);
      // console.log('______', res.data);
      return res.data;
    },
  });
};

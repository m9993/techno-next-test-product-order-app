import { server } from './axios';

export const product = {
  getProductsByLimitSort: async (limit: number, sort: 'asc' | 'desc') =>
    await server(`/products?limit=${limit}&&sort=${sort}`),
};

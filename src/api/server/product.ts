import { server } from './axios';

export const product = {
  getProductsByLimitSort: async (limit: number, sort: 'asc' | 'desc') =>
    await server.get(`/products?limit=${limit}&&sort=${sort}`),
  getProductDetailsById: async (id: number) => await server.get(`/products/${id}`),
};

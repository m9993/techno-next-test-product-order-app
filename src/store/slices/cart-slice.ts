import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface ICartItem {
  id: number;
  image: string;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: { rate: number; count: number };
  quantity: number;
}
const initialState: { cart: ICartItem[] } = {
  cart: [],
};

export const initCart = createAsyncThunk('init-cart', async () => {
  const localData = await AsyncStorage.getItem('cart');
  const cart: ICartItem[] = localData ? JSON.parse(localData) : [];
  return cart;
});

export const addToCart = createAsyncThunk('add-to-cart', async (cartItem: ICartItem) => {
  const localData = await AsyncStorage.getItem('cart');
  let cart: ICartItem[] = localData ? JSON.parse(localData) : [];

  const index = cart.findIndex(i => i.id === cartItem.id);

  if (index === -1) cart = [...[{ ...cartItem, quantity: 1 }], ...cart];
  else {
    cart[index] = { ...cart[index], quantity: cart[index].quantity + 1 };
  }

  await AsyncStorage.setItem('cart', JSON.stringify(cart));
  return cart;
});

export const decreaseFromCart = createAsyncThunk(
  'decrease-from-cart',
  async (cartItem: ICartItem) => {
    const localData = await AsyncStorage.getItem('cart');
    const cart: ICartItem[] = localData ? JSON.parse(localData) : [];

    const index = cart.findIndex(i => i.id === cartItem.id);

    if (cart[index].quantity === 1) cart.splice(index, 1);
    else cart[index] = { ...cart[index], quantity: cart[index].quantity - 1 };

    await AsyncStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  },
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(initCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    builder.addCase(decreaseFromCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
  },
});

// export const {} = cartSlice.actions;
export default cartSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/app-slice';
import authReducer from './slices/auth-slice';
import cartReducer from './slices/cart-slice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

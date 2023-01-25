import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth';
import shopReducer from './reducers/shop';
import ordersReducer from './reducers/orders';
import cartReducer from './reducers/cart';
import characterReducer from './reducers/characters';
import faqReducer from './reducers/faq';

export default configureStore({
  reducer: {
    cart: cartReducer,
    char: characterReducer,
    faq: faqReducer,
    auth: authReducer,
    shop: shopReducer,
    orders: ordersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serialzableCheck: false,
  }),
});

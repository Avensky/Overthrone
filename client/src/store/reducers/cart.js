import * as actionTypes from '../actions/actionTypes';
import {
  updateObject, findItem, updateArray, getTotalPrice, getTotalItems, copyArray,
  removeItem, storeLocally,
} from '../../utility/utility';

const initialState = {
  items: [],
  item: {},
  cart: [],
  shop: [],
  total: 0.00,
  totalItems: 0,
  totalPrice: 0,
  error: '',
  loading: false,
};

const getItemsStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null,
  });
};

const getItemsFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};

const getItemsSuccess = (state, action) => {
  // const items = action.items;
  // console.log('reducer getItemsSuccess = ', action.items);
  return updateObject(state, {
    items: action.items,
    loading: false,
  });
};

const removeFromCart = (state, action) => {
  const { cart } = state;
  const updatedCart = removeItem(cart, action.id);

  storeLocally('cart', updatedCart);
  const totalPrice = getTotalPrice(updatedCart);
  const totalItems = getTotalItems(updatedCart);

  const { items } = state;
  let shop;
  // console.log('load shop = ' + (items));
  if (items.length > 0) {
    // console.log(`load shop = ${items}`);
    if (updatedCart.length > 0) {
      // console.log(`load shop = ${items}`);
      shop = items.map((obj) => updatedCart.find((item) => item._id === obj._id) || obj);
      // console.log(`load shop with cart = ${JSON.stringify(shop)}`);
    } else {
      shop = items;
      // console.log(`load shop without cart = ${JSON.stringify(shop)}`);
    }
  }

  return updateObject(
    state,
    {
      cart: updatedCart,
      totalPrice,
      totalItems,
      shop,
    },
  );
};

const addQuantity = (state, action) => {
  // get products
  const products = copyArray(state.items);
  // console.log('products = ', products);

  // get product data
  const product = findItem(products, action.id);
  // console.log('product = ', product);

  // get cart
  let cart = [];
  if (state.cart) {
    cart = copyArray(state.cart);
  }

  // console.log('cart = ', cart);

  // search for item in cart
  let cartItem = findItem(cart, action.id);
  // console.log('cartItem: ', cartItem);

  let updatedCart;

  if (cartItem) {
    // if stock allows add to order
    if (cartItem.orderAmt < product.stock) {
      // console.log('cartItem.orderAmt ', cartItem.orderAmt);
      // console.log('product.stock ', product.stock);
      cartItem.orderAmt += 1;
      updatedCart = updateArray(cart, cartItem);
      // console.log('updatedCart = ', updatedCart);
    } else {
      updatedCart = cart;
    }
  }

  // if no such item in cart copy original
  if (!cartItem) {
    cartItem = { ...product };
    // console.log('cartItem: ', cartItem);
    cartItem.orderAmt = 1;
    updatedCart = [...cart, cartItem];
    // console.log('updatedCart = ', updatedCart);
  }

  const { items } = state;
  let shop;
  // console.log('load shop = ' + (items));
  if (items.length > 0) {
    // console.log('load shop = ' + (items));
    if (updatedCart.length > 0) {
      // console.log('load shop = ' + (items))
      shop = items.map((obj) => updatedCart.find((item) => item._id === obj._id) || obj);
      // console.log(`load shop with cart = ${JSON.stringify(shop)}`);
    } else {
      shop = items;
      // console.log(`load shop without cart = ${JSON.stringify(shop)}`);
    }
  }

  storeLocally('cart', updatedCart);
  const totalPrice = getTotalPrice(updatedCart);
  // console.log('total = $', totalPrice);
  const totalItems = getTotalItems(updatedCart);
  // console.log('total items = ', totalItems);

  return updateObject(
    state,
    {
      cart: updatedCart,
      totalPrice,
      totalItems,
      shop,
    },
  );
};

const subQuantity = (state, action) => {
  const cart = copyArray(state.cart);
  const cartItem = findItem(cart, action.id);
  let updatedCart;
  // if the qt == 0 then it should be removed
  if (cartItem && (cartItem.orderAmt > 1)) {
    cartItem.orderAmt -= 1;
    updatedCart = updateArray(cart, cartItem);
  } else {
    updatedCart = removeItem(cart, action.id);
  }
  storeLocally('cart', updatedCart);

  const { items } = state;
  let shop;
  // console.log('load shop = ' + (items));
  if (items.length > 0) {
    // console.log('load shop = ' + (items));
    if (updatedCart.length > 0) {
      // console.log('load shop = ' + (items))
      shop = items.map((obj) => updatedCart.find((item) => item._id === obj._id) || obj);
      // console.log(`load shop with cart = ${JSON.stringify(shop)}`);
    } else {
      shop = items;
      // console.log(`load shop without cart = ${JSON.stringify(shop)}`);
    }
  }

  const totalPrice = getTotalPrice(updatedCart);
  const totalItems = getTotalItems(updatedCart);

  return {
    ...state,
    cart: updatedCart,
    totalPrice,
    totalItems,
    shop,
  };
};
const addShipping = (state, action) => ({
  state,
  total: state.total + 6,
});

const subShipping = (state, action) => ({
  state,
  total: state.total - 6,
});

/* ******************************************************************************
 * Get Cart and update shop
******************************************************************************* */
const loadCart = (state, action) => {
  const { items } = state;
  let { cart } = state;
  let shop = items;

  // get cart from local storage
  const cartString = localStorage.getItem('cart');
  if (cartString) cart = JSON.parse(cartString);
  // console.log('loadCart = ', cart);

  // if items exist setup a shop
  // console.log('loadShop with items = ', items);
  if ((items.length > 0)) {
    // if cart found in browser, load it
    if (cart.length > 0) {
      shop = items.map((obj) => cart.find((item) => item._id === obj._id) || obj);
      // console.log(`load shop with cart = ${JSON.stringify(shop)}`);
    } else {
      shop = items;
    }
  }

  let totalItems = 0;
  let totalPrice = 0;
  if (cart.length > 0) {
    totalItems = getTotalItems(cart);
    totalPrice = getTotalPrice(cart);
  }

  // console.log('shop ', shop);
  // console.log('cart ', cart);
  // console.log('totalItems ', totalItems);
  // console.log('totalPrice ', totalPrice);

  return updateObject(
    state,
    {
      totalItems,
      totalPrice,
      cart,
      shop,
    },
  );
};

const checkoutStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};
const checkoutFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};
const checkoutSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    checkout: action.response,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ITEMS_SUCCESS: return getItemsSuccess(state, action);
    case actionTypes.GET_ITEMS_FAIL: return getItemsFail(state, action);
    case actionTypes.GET_ITEMS_START: return getItemsStart(state, action);

    case actionTypes.REMOVE_FROM_CART: return removeFromCart(state, action);
    case actionTypes.ADD_QUANTITY: return addQuantity(state, action);
    case actionTypes.SUB_QUANTITY: return subQuantity(state, action);

    case actionTypes.ADD_SHIPPING: return addShipping(state, action);
    case actionTypes.SUB_SHIPPING: return subShipping(state, action);

    case actionTypes.LOAD_CART: return loadCart(state, action);
    case actionTypes.CHECKOUT_START: return checkoutStart(state, action);
    case actionTypes.CHECKOUT_FAIL: return checkoutFail(state, action);
    case actionTypes.CHECKOUT_SUCCESS: return checkoutSuccess(state, action);
    default: return state;
  }
};

export default reducer;

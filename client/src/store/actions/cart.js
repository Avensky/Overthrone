import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import * as actionTypes from './actionTypes';

const stripePromise = loadStripe('pk_test_51J8eeGGhmYf08967atQfhNcWSsJpgUNfFCbL49tWBsPRhe30UedjKbYJDGkv1RI2tlRFmL1UbHxzSkOxDYQb0ufO00UU3w8gGA');

/** *****************************************
 * Get all products from database
****************************************** */
export const checkoutStart = () => ({
  type: actionTypes.CHECKOUT_START,
});

export const checkoutSuccess = async (id) => {
  // Get Stripe.js instance
  const stripe = await stripePromise;
  // When the customer clicks on the button, redirect them to Checkout.
  const result = await stripe.redirectToCheckout({ sessionId: id });

  return {
    type: actionTypes.CHECKOUT_SUCCESS,
    // result
  };
};

export const checkoutFail = (error) => ({
  type: actionTypes.CHECKOUT_FAIL,
  error,
});

export const checkout = (cart, user, event) => {
  // console.log('cart ', cart);
  const lineItems = cart.map((item) => {
    const data = {
      price: item.priceid,
      quantity: item.orderAmt,
      // tax_rates   : [keys.taxRates]
    };
    // console.log(`data = ${JSON.stringify(data)}`);
    return data;
  });

  let body;
  user
    ? body = { items: lineItems, userid: user._id }
    : body = { items: lineItems };

  // console.log('body = ', body);

  return (dispatch) => {
    dispatch(checkoutStart());
    // Call your backend to create the Checkout Session
    axios.post('/api/checkout', body)
      .then((res) => {
        const session = res.data;
        // console.log('checkout', session);
        dispatch(checkoutSuccess(session.id));
      })
      .catch((err) => {
        // console.log('err', err);
        dispatch(checkoutFail(err));
      });
  };
};

/** *****************************************
 * Get Items from database
****************************************** */
export function getItemsSuccess(items) {
  return {
    type: actionTypes.GET_ITEMS_SUCCESS,
    items,
  };
}

export function getItemsFail(error) {
  return {
    type: actionTypes.GET_ITEMS_FAIL,
    error,
  };
}

export function getItemsStart() {
  return {
    type: actionTypes.GET_ITEMS_START,
  };
}

export function getItems() {
  return (dispatch) => {
    dispatch(getItemsStart());
    axios.get('/api/items')
      .then((res) => {
        // const result = JSON.stringify(res.data);
        dispatch(getItemsSuccess(res.data));
      })
      .catch((err) => {
        // const error = JSON.stringify(err);
        // console.log(`getItems error = ${JSON.stringify(error)}`);
        dispatch(getItemsFail(err));
      });
  };
}

// add cart action
export const addToCart = (id) => ({
  type: actionTypes.ADD_TO_CART,
  id,
});

// remove item action
export const removeFromCart = (id) => ({
  // console.log(`REMOVE_FROM_CART id = ${id}`);

  type: actionTypes.REMOVE_FROM_CART,
  id,
});

// subtract qt action
export const subQuantity = (id) => ({
  type: actionTypes.SUB_QUANTITY,
  id,
});

// add qt action
export const addQuantity = (id) => ({
  type: actionTypes.ADD_QUANTITY,
  id,
});

export function loadCart() {
  return {
    // local storage
    // console.log('loading cart');
    type: actionTypes.LOAD_CART,
  };
}

import axios from 'axios';
import * as actionTypes from './actionTypes';
import { loadStripe } from '@stripe/stripe-js';
let stripePromise = loadStripe('pk_test_51J8eeGGhmYf08967atQfhNcWSsJpgUNfFCbL49tWBsPRhe30UedjKbYJDGkv1RI2tlRFmL1UbHxzSkOxDYQb0ufO00UU3w8gGA');


/*******************************************
 * Get all products from database
*******************************************/
export const checkoutStart = () => {
  return{
    type: actionTypes.CHECKOUT_START,
  };
};
export const checkoutSuccess = async (id) => {
  // Get Stripe.js instance
  const stripe = await stripePromise;
  // When the customer clicks on the button, redirect them to Checkout.
  const result = await stripe.redirectToCheckout({sessionId: id,});
  
  return{
    type: actionTypes.CHECKOUT_SUCCESS,
    //result
  };
};

export const checkoutFail = (error) => {
  // If `redirectToCheckout` fails due to a browser or network
  // error, display the localized error message to your customer
  // using `result.error.message`.
  console.log(error);
  return {
    type: actionTypes.CHECKOUT_FAIL,
    error
  };
};

export const checkout = (cart, user, event) => {
  console.log('cart ', cart);
  let line_items = cart.map( item => {
      let data = {
          price       : item.priceid,
          quantity    : item.orderAmt,
          //tax_rates   : [keys.taxRates]
      };
      console.log('data = '+JSON.stringify(data));
      return data;
  });
  
  let body; 
  user 
    ? body = {items: line_items,userid: user['_id']}
    : body = {items: line_items};

  console.log('body = ', body);

  return dispatch => {
    dispatch(checkoutStart());
    // Call your backend to create the Checkout Session
    axios.post('/api/checkout', body)
      .then( res => {
        const session = res.data; 
        console.log('checkout', session);
        dispatch(checkoutSuccess(session.id));
      })
      .catch( err => {
        console.log('err', err);
        dispatch(checkoutFail(err));
      });
  };

};


/*******************************************
 * Get Items from database
*******************************************/
export const getItemsSuccess = (items) => {
    return {
        type:  actionTypes.GET_ITEMS_SUCCESS,
        items
    };
};

export const getItemsFail = (error) => {
    return {
        type:  actionTypes.GET_ITEMS_FAIL, 
        error
    };
};

export const getItemsStart = () => {
    return {
        type:  actionTypes.GET_ITEMS_START
    };
};

export const getItems = () => {
    return dispatch => {
        dispatch(getItemsStart());
        axios.get( '/api/items')
        .then( result => {
            //console.log("result"+JSON.stringify(result))
            const items = result.data
                dispatch(getItemsSuccess(items));
            } )
            .catch( error => {
                console.log("getItems error = "+JSON.stringify(error))
                dispatch(getItemsFail(error));
            }
        );
    };
};

//add cart action
export const addToCart= (id)=>{
    return{
        type: actionTypes.ADD_TO_CART,
        id
    };
};

//remove item action
export const removeFromCart=(id)=>{
    console.log('REMOVE_FROM_CART id = '+ id);
    return{
        type: actionTypes.REMOVE_FROM_CART,
        id
    };
};

//subtract qt action
export const subQuantity=(id)=>{
    return{
        type: actionTypes.SUB_QUANTITY,
        id
    };
};

//add qt action
export const addQuantity=(id)=>{
    return{
        type: actionTypes.ADD_QUANTITY,
        id
    };
};

export const loadCart = ( values ) => {
    // local storage
    console.log('loading cart');
    return{
        type: actionTypes.LOAD_CART,
    };
};
//import { response } from 'express'
import axios from 'axios'
import * as actionTypes from './actionTypes'
import { loadStripe } from "@stripe/stripe-js";

// import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING} from './actionTypes/cart'
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

//add cart action
export const addToCart= (addedItems, total, totalItems)=>{
    return{
        type: actionTypes.ADD_TO_CART,
        addedItems, 
        total, 
        totalItems
    }
}
//remove item action
export const removeItem=(id)=>{
    return{
        type: actionTypes.REMOVE_ITEM,
        id
    }
}
//subtract qt action
export const subtractQuantity=(id)=>{
    return{
        type: actionTypes.SUB_QUANTITY,
        id
    }
}
//add qt action
export const addQuantity=(id)=>{
    return{
        type: actionTypes.ADD_QUANTITY,
        id
    }
}

export const loadCart = ( cart ) => {
    //console.log('action cart = '    + cart)
    let stringCart = JSON.stringify(cart).replace(/\\"/g, '"')
    
    //console.log('action cart = '    + stringCart)
    let fixedCart = JSON.parse(stringCart)

    return{
        type: actionTypes.LOAD_CART,
        cart: fixedCart
    }
}

export const checkoutStart = () => {
    return{
        type: actionTypes.CHECKOUT
    }
}
export const checkoutFail = (err) => {
    return {
        type: actionTypes.CHECKOUT_FAIL,
        error: err
    }
}

export const checkoutSuccess = (response) => {
    return {
        type: actionTypes.CHECKOUT_SUCCESS,
        checkout: response
    }
}
export const checkout = (values) => {
    return dispatch => {
        dispatch(checkoutStart())
        const stripe = stripePromise;
        axios.post('api/create-checkout-session', values)
        .post(response => {
            console.log('checkout =' + response)
            dispatch(checkoutSuccess())
        })
        .catch((err) => {
            console.log('checkout error =' + err)
            dispatch(checkoutFail())
        })
    }
}
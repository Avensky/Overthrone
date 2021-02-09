import Item1 from '../images/item1.jpg'
import Item2 from '../images/item2.jpg'
import Item3 from '../images/item3.jpg'
import Item4 from '../images/item4.jpg'
import Item5 from '../images/item6.jpg'
import Item6 from '../images/item6.jpg'
//import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING } from '../actions/actionTypes/cart'
import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../../utility/utility'

const initialState = {
    items: [
        {id:'price_1IFFnkELbEgFNgrjBSXLtJec',title:'Winter body',  desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",   price:110,  img: Item1, quantity: 0 },
        {id:'price_1IFFqOELbEgFNgrjxEAMOVGz',title:'Adidas',       desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",   price:80,   img: Item2, quantity: 0 },
        {id:'price_1IFFqwELbEgFNgrjE4MEjU6R',title:'Vans',         desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",   price:120,  img: Item3, quantity: 0 },
        {id:'price_1IFFrvELbEgFNgrj8zRYYsTi',title:'White',        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",   price:260,  img: Item4, quantity: 0 },
        {id:'price_1IFFsnELbEgFNgrjUUlOQvQR',title:'Cropped-shoe', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",   price:160,  img: Item5, quantity: 0 },
        {id:'price_1IFFtgELbEgFNgrj7Xycyyhu',title:'Blues',        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",   price:90,   img: Item6, quantity: 0 }    
    ],
    addedItems  : [],
    total       : 0.00,
    totalItems  : 0,
    totalPrice  : 0,
    checkout    : null,
    error       : null,
    cart        : null
}

const addToCart= ( state, action ) => {
    return{
        ...state,
        addedItems  : action.addedItems,
        total       : action.total,
        totalItems  : action.totalItems ,
    }
}

const removeItem = ( state, action ) => {

    let itemToRemove        = state.addedItems.find(item=> action.id === item._id)
    let quantityToRemove    = itemToRemove.amount
    let new_items           = state.addedItems.filter(item=> action.id !== item._id)
    let newTotal            = state.total - (itemToRemove.price * itemToRemove.quantity )

    //store in local storage
    let stringNewItems= JSON.stringify(new_items)
    localStorage.setItem("addedItems", stringNewItems)
    return{
        ...state,
        addedItems: new_items,
        total: newTotal,
        totalItems: state.totalItems - quantityToRemove
    }
}

const addQuantity = ( state, action ) => {
    let addedItem = state.addedItems.find(item=> item.id === action.id)
    addedItem.quantity += 1 
    let newTotal = state.total + addedItem.price
    let new_items = state.addedItems.map(obj => [addedItem].find(o => o.id === obj.id) || obj)
    //store in local storage
    let stringNewItems= JSON.stringify(new_items)
    localStorage.setItem("addedItems", stringNewItems)
    return{
        ...state,
        addedItems: new_items,
        total: newTotal,
        totalItems: state.totalItems + 1
    }
}
const subQuantity = ( state, action ) => {
    let addedItem = state.addedItems.find(item=> item.id === action.id) 
    //if the qt == 0 then it should be removed
    if(addedItem.quantity === 1){
        addedItem.quantity -= 1
        let new_items = state.addedItems.filter(item=>item.id !== action.id)
        let newTotal = state.total - addedItem.price
            //store in local storage
        let stringNewItems= JSON.stringify(new_items)
        localStorage.setItem("addedItems", stringNewItems)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal,
            totalItems: state.totalItems -1
        }
    }
    else {
        addedItem.quantity -= 1
        let new_items = state.addedItems.map(obj => [addedItem].find(o => o.id === obj.id) || obj)
        let newTotal = state.total - addedItem.price
        //store in local storage
        let stringNewItems= JSON.stringify(new_items)
        localStorage.setItem("addedItems", stringNewItems)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal,        
            totalItems: state.totalItems -1
        }
    }
}
const addShipping = ( state, action ) => {
    return  { 
        state,
        total: state.total + 6 
    }
}

const subShipping = ( state, action ) => {
    return {
        state,
        total: state.total - 6 
    }
}

const loadCart = ( state, action ) => {
    console.log('reducer cart'+action.cart)
    console.log('reducer stringcart'+JSON.stringify(action.cart))
    return {
        state,
        addedItems: action.cart
    }
}

const checkoutStart = (state, action) => {
    return updateObject (state, {
            error: null,
            loading: true,
        }
    )
}
const checkoutFail = (state, action) => {
    return updateObject(state, {
            loading: false,
            error: action.error
        }
    )
}
const checkoutSuccess = (state, action) => {
    return updateObject(state, {
            loading: false,
            checkout: action.response
        }
    )
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_TO_CART       : return addToCart(state, action);
        case actionTypes.REMOVE_ITEM       : return removeItem(state, action);
        case actionTypes.ADD_QUANTITY      : return addQuantity(state, action);
        case actionTypes.SUB_QUANTITY      : return subQuantity(state, action);
        case actionTypes.ADD_SHIPPING      : return addShipping(state, action);
        case actionTypes.SUB_SHIPPING      : return subShipping(state, action); 
        case actionTypes.LOAD_CART         : return loadCart(state, action);
        case actionTypes.CHECKOUT_START    : return checkoutStart(state, action);
        case actionTypes.CHECKOUT_FAIL     : return checkoutFail(state, action);
        case actionTypes.CHECKOUT_SUCCESS  : return checkoutSuccess(state, action);
        default: return state;
    }
};

export default reducer;

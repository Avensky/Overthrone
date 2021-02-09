import axios from 'axios'
import * as actionTypes from './actionTypes'

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
    console.log('removeItem id = '+ id)
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

export const loadCart = ( values ) => {
    // local storage
    let stringCart = localStorage.getItem("addedItems")
    console.log('stringCart = '+ stringCart)

    //console.log('action cart = '    + stringCart)
    let cart = JSON.parse(stringCart)

    return{
        type: actionTypes.LOAD_CART,
        cart
    }
}
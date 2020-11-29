import * as actionTypes from './actionTypes'
// import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING} from './actionTypes/cart'

//add cart action
export const addToCart= (id)=>{
    return{
        type: actionTypes.ADD_TO_CART,
        id
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

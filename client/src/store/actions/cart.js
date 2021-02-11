import axios from 'axios'
import * as actionTypes from './actionTypes'

/*******************************************
 * Get Items from database
*******************************************/
export const getItemsSuccess = (items) => {
    return {
        type:  actionTypes.GET_ITEMS_SUCCESS,
        items
    }
}
export const getItemsFail = (error) => {
    return {
        type:  actionTypes.GET_ITEMS_FAIL, 
        error
    }
}
export const getItemsStart = () => {
    return {
        type:  actionTypes.GET_ITEMS_START
    }
}
export const getItems = () => {
    return dispatch => {
        dispatch(getItemsStart())
        axios.get( '/api/items')
        .then( result => {
            console.log("result"+JSON.stringify(result))
            const items = result.data
                dispatch(getItemsSuccess(items));
            } )
            .catch( error => {
                console.log("getItems error = "+JSON.stringify(error))
                dispatch(getItemsFail(error));
            } 
        )
    }
}

//add cart action
export const addToCart= (id)=>{
    return{
        type: actionTypes.ADD_TO_CART,
        id
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
    console.log('loading cart')
    return{
        type: actionTypes.LOAD_CART,
    }
}
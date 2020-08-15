import Item1 from '../images/item1.jpg'
import Item2 from '../images/item2.jpg'
import Item3 from '../images/item3.jpg'
import Item4 from '../images/item4.jpg'
import Item5 from '../images/item5.jpg'
import Item6 from '../images/item6.jpg'
//import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING } from '../actions/actionTypes/cart'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    items: [
        {id:1,title:'Winter body',  desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",   price:110,  img: Item1, quantity: 0},
        {id:2,title:'Adidas',       desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",   price:80,   img: Item2, quantity: 0},
        {id:3,title:'Vans',         desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",   price:120,  img: Item3, quantity: 0},
        {id:4,title:'White',        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",   price:260,  img: Item4, quantity: 0},
        {id:5,title:'Cropped-sho',  desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",   price:160,  img: Item5, quantity: 0},
        {id:6,title:'Blues',        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",   price:90,   img: Item6, quantity: 0}
    ],
    addedItems  :[],
    total       : 0,
    totalItems  : 0

}

const addToCart= ( state, action ) => {
 
    let addedItem = state.items.find(item=> item.id === action.id)
    //check if the action id exists in the addedItems
    let existed_item= state.addedItems.find(item=> action.id === item.id)
    if(existed_item)
    {
        addedItem.quantity += 1
        return{
            ...state,
            addedItems: [...state.addedItems, addedItem],
            total: state.total + addedItem.price ,
            totalItems: state.totalItems +1, 
//            items: state.addedItem.quantity +1
        }
    }

   else{
      addedItem.quantity = 1;
      //calculating the total
      let newTotal = state.total + addedItem.price 
      
      return{
          ...state,
          addedItems: [...state.addedItems, addedItem],
          total : newTotal,
          totalItems: state.totalItems +1,
//          items: state.items.quantity +1
      }
      
  }
}

const removeItem = ( state, action ) => {
    let itemToRemove= state.addedItems.find(item=> action.id === item.id)
    let quantityToRemove= itemToRemove.quantity
    let new_items = state.addedItems.filter(item=> action.id !== item.id)
    
    //calculating the total
    let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
    console.log(itemToRemove)
    return{
        ...state,
        addedItems: new_items,
        total: newTotal,
        totalItems: state.totalItems - quantityToRemove
    }
}

const addQuantity = ( state, action ) => {
    let addedItem = state.items.find(item=> item.id === action.id)
    addedItem.quantity += 1 
    let newTotal = state.total + addedItem.price
    return{
        ...state,
        total: newTotal,
        totalItems: state.totalItems + 1
    }
}
const subQuantity = ( state, action ) => {
    let addedItem = state.items.find(item=> item.id === action.id) 
    //if the qt == 0 then it should be removed
    if(addedItem.quantity === 1){
        let new_items = state.addedItems.filter(item=>item.id !== action.id)
        let newTotal = state.total - addedItem.price
        return{
            ...state,
            addedItems: new_items,
            total: newTotal,
            totalItems: state.totalItems -1
        }
    }
    else {
        addedItem.quantity -= 1
        let newTotal = state.total - addedItem.price
        return{
            ...state,
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

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_TO_CART       : return addToCart(state, action);
        case actionTypes.REMOVE_ITEM       : return removeItem(state, action);
        case actionTypes.ADD_QUANTITY      : return addQuantity(state, action);
        case actionTypes.SUB_QUANTITY      : return subQuantity(state, action);
        case actionTypes.ADD_SHIPPING      : return addShipping(state, action);
        case actionTypes.SUB_SHIPPING      : return subShipping(state, action); 
        default: return state;
    }
};

export default reducer;

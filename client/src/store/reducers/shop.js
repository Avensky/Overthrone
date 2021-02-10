import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility/utility';

const initialState = {
    items: [],
    loading: false,
    posted: false,
    itemById: [],
};

const newItemStart = (state, action) => {
    return updateObject( state, { posted: false });}

const newItemFail = (state, action) => {
    return updateObject( state, { 
        loading: false })}
  
const newItemSuccess = (state, action) => {
    const newItem = updateObject(action.itemData, { id: action.itemId })
    return updateObject(state, {
        loading: false,
        items: state.items.concat( newItem ) })}

const getItemByIdStart = (state, action) => {
    return updateObject( state, {
        loading: true})}

const getItemByIdFail = (state, action) => {
    return updateObject( state, {
        loading: false})}

const getItemByIdSuccess = (state, action) => {
    return updateObject( state, {
        itemById: action.itemById,
        loading: false,})}


const deleteItemStart = (state, action) => {
    return updateObject( state, {
        loading: true})}

const deleteItemFail = (state, action) => {
    return updateObject( state, {
        loading: false})}

const deleteItemSuccess = (state, action) => {
    return updateObject( state, {
        loading: false,})}



const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.NEW_ITEM_SUCCESS        : return newItemSuccess(state, action);
        case actionTypes.NEW_ITEM_FAIL           : return newItemFail(state, action);
        case actionTypes.NEW_ITEM_START          : return newItemStart(state, action);
              
        case actionTypes.DELETE_ITEM_SUCCESS     : return deleteItemSuccess(state, action);
        case actionTypes.DELETE_ITEM_FAIL        : return deleteItemFail(state, action);
        case actionTypes.DELETE_ITEM_START       : return deleteItemStart(state, action);
        
        case actionTypes.GET_ITEM_BY_ID_SUCCESS  : return getItemByIdSuccess(state, action);
        case actionTypes.GET_ITEM_BY_ID_FAIL     : return getItemByIdFail(state, action);
        case actionTypes.GET_ITEM_BY_ID_START    : return getItemByIdStart(state, action);
        
        default: return state;
    }
};

export default reducer;

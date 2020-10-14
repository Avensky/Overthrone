import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility/utility';

const initialState = {
    characters: [],
    loading: false,
    posted: false,
    charById: []
};

const newCharacterStart = (state, action) => {
    return updateObject( state, { posted: false });}

const newCharacterFail = (state, action) => {
    return updateObject( state, { 
        loading: false })}
  
const newCharacterSuccess = (state, action) => {
    const newCharacter = updateObject(action.characterData, { id: action.characterId })
    return updateObject(state, {
        loading: false,
        characters: state.characters.concat( newCharacter ) })}


const getCharactersStart = (state, action) => {
    return updateObject( state, { 
        loading: true })}
    
const getCharactersFail = (state, action) => {
    return updateObject( state, { 
        loading: false })}
  
const getCharactersSuccess = (state, action) => {
    return updateObject(state, {
        characters: action.characters,
        loading: false
    })}
        

const getCharByIdStart = (state, action) => {
    return updateObject( state, {
        loading: true})}

const getCharByIdFail = (state, action) => {
    return updateObject( state, {
        loading: false})}

const getCharByIdSuccess = (state, action) => {
    return updateObject( state, {
        charById: action.charById,
        loading: false,})}


const deleteCharStart = (state, action) => {
    return updateObject( state, {
        loading: true})}

const deleteCharFail = (state, action) => {
    return updateObject( state, {
        loading: false})}

const deleteCharSuccess = (state, action) => {
    return updateObject( state, {
        loading: false,})}



const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.NEW_CHARACTER_SUCCESS   : return newCharacterSuccess(state, action);
        case actionTypes.NEW_CHARACTER_FAIL      : return newCharacterFail(state, action);
        case actionTypes.NEW_CHARACTER_START     : return newCharacterStart(state, action);
        
        case actionTypes.GET_CHARACTERS_SUCCESS  : return getCharactersSuccess(state, action);
        case actionTypes.GET_CHARACTERS_FAIL     : return getCharactersFail(state, action);
        case actionTypes.GET_CHARACTERS_START    : return getCharactersStart(state, action);
        
        case actionTypes.DELETE_CHAR_SUCCESS     : return deleteCharSuccess(state, action);
        case actionTypes.DELETE_CHAR_FAIL        : return deleteCharFail(state, action);
        case actionTypes.DELETE_CHAR_START       : return deleteCharStart(state, action);
        
        case actionTypes.GET_CHAR_BY_ID_SUCCESS  : return getCharByIdSuccess(state, action);
        case actionTypes.GET_CHAR_BY_ID_FAIL     : return getCharByIdFail(state, action);
        case actionTypes.GET_CHAR_BY_ID_START    : return getCharByIdStart(state, action);
        
        default: return state;
    }
};

export default reducer;

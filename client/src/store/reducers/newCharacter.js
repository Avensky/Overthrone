import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility/utility';

const initialState = {
    characters: [],
    loading: false,
    posted: false
};

const newCharacterStart = (state, action) => {
    return updateObject( state, { posted: false });}
  
const newCharacterSuccess = (state, action) => {
    const newCharacter = updateObject(action.characterData, { id: action.characterId })
    return updateObject(state, {
        loading: false,
        characters: state.characters.concat( newCharacter )
    })}

const newCharacterFail = (state, action) => {
    return updateObject( state, { 
        loading: false })}

const getCharactersStart = (state, action) => {
    return updateObject( state, { 
        loading: true })}
    
const getCharactersFail = (state, action) => {
    return updateObject( state, { 
        loading: false })}
  
const getCharactersSuccess = (state, action) => {
    return updateObject(state, {
        characters: action.characters })}    

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.NEW_CHARACTER_SUCCESS   : return newCharacterSuccess(state, action);
        case actionTypes.NEW_CHARACTER_FAIL      : return newCharacterFail(state, action);
        case actionTypes.NEW_CHARACTER_START     : return newCharacterStart(state, action);
        case actionTypes.GET_CHARACTERS_SUCCESS  : return getCharactersSuccess(state, action);
        case actionTypes.GET_CHARACTERS_FAIL     : return getCharactersFail(state, action);
        case actionTypes.GET_CHARACTERS_START    : return getCharactersStart(state, action);
        default: return state;
    }
};

export default reducer;

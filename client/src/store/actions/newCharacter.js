import * as actionTypes from './actionTypes'
import axios from 'axios';

export const newCharacterStart  = () =>{
    return{
        type: actionTypes.NEW_CHARACTER_START
    }
}

export const newCharacterFail = (error) => {
    return {
        type: actionTypes.NEW_CHARACTER_FAIL,
        error: error
    }
}

export const newCharacterSuccess = (characterData) => {
    return {
        type: actionTypes.NEW_CHARACTER_SUCCESS,
        characterData: characterData
    }
}

export const newCharacter = (name, age, bio, relatives) => {
    return dispatch => {
        const characterData = {name, age, bio, relatives}
        dispatch(newCharacterStart())
        axios.post('/api/addCharacter', characterData)
            .then(response => {
                console.log(response);
                dispatch(newCharacterSuccess(characterData))
        })
        .catch(error => {
            console.log(error);
            dispatch(newCharacterFail(error))
        })    
    }
}
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

export const newCharacter = (name, age, relatives, bio) => {
    return dispatch => {
        dispatch(newCharacterStart())

        const characterData = {
            name        : name, 
            age         : age, 
            relatives   : relatives,
            bio         : bio, 
        }

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


export const getCharactersSuccess = (characters) => {
    return {
        type:  actionTypes.GET_CHARACTERS_SUCCESS,
        characters: characters
    }
}
export const getCharactersFail = (error) => {
    return {
        type:  actionTypes.GET_CHARACTERS_FAIL, 
        error: error
    }
}
export const getCharactersStart = () => {
    return {
        type:  actionTypes.GET_CHARACTERS_START
    }
}
export const getCharacters = () => {
    return dispatch => {
        dispatch(getCharactersStart());
        axios.get( '/api/characters')
        .then( result => {
            console.log(result)
            const characters = result.data
//            const characters = []
//                for ( let key in posts ) {
//                    characters.push( {
//                        ...result.data[key],
//                        id: key
//                    } );
//                }
                dispatch(getCharactersSuccess(characters));
            } )
            .catch( error => {
                dispatch(getCharactersFail(error));
            } );
    };
}
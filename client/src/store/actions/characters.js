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

            characters.sort(function(a, b){
                if(a.name < b.name) { return -1; }
                if(a.name > b.name) { return 1; }
                return 0;
            })
                dispatch(getCharactersSuccess(characters));
            } )
            .catch( error => {
                dispatch(getCharactersFail(error));
            } );
    };
}




export const getCharByIdSuccess = (charById) => {
    return {
        type:  actionTypes.GET_CHAR_BY_ID_SUCCESS,
        charById: charById,
    }
}
export const getCharByIdFail = (error) => {
    return {
        type:  actionTypes.GET_CHAR_BY_ID_FAIL, 
        error: error
    }
}
export const getCharByIdStart = () => {
    return {
        type:  actionTypes.GET_CHAR_BY_ID_START
    }
}
export const getCharById = (id) => {
    return dispatch => {
        dispatch(getCharByIdStart());
        axios.get( '/api/getcharDetails/' + id)
        .then( result => {
            console.log(result)
            const charById = result.data
//            const fetchedPostsById = {id: id}
//            const obj = {...post, ...fetchedPostsById}
            dispatch(getCharByIdSuccess(charById));
        })
        .catch( error => {
            dispatch(getCharByIdFail(error));
        });
    };
}



export const updateCharStart  = () =>{
    return{
        type: actionTypes.UPDATE_CHAR_START
    }
}

export const updateCharFail = (error) => {
    return {
        type: actionTypes.UPDATE_CHAR_FAIL,
        error: error
    }
}

export const updateCharSuccess = (characterData) => {
    return {
        type: actionTypes.UPDATE_CHAR_SUCCESS,
        characterData: characterData
    }
}
    
export const updateChar = (id, name, age, relatives, bio) => {
    return dispatch => {
        dispatch(updateCharStart())

        const characterData = {
            id          : id,
            name        : name, 
            age         : age, 
            relatives   : relatives,
            bio         : bio, 
        }

        axios.delete('/api/updatechar/'+ characterData)
            .then(response => {
                console.log(response);
                dispatch(updateCharSuccess(characterData))
        })
        .catch(error => {
            console.log(error);
            dispatch(updateCharFail(error))
        })    
    }
}



export const deleteCharStart  = () =>{
    return{
        type: actionTypes.DELETE_CHAR_START
    }
}

export const deleteCharFail = (error) => {
    return {
        type: actionTypes.DELETE_CHAR_FAIL,
        error: error
    }
}

export const deleteCharSuccess = () => {
    return {
        type: actionTypes.DELETE_CHAR_SUCCESS,
    }
}
    
export const deleteChar = (id) => {
    return dispatch => {
        dispatch(deleteCharStart())
        axios.delete('/api/deletechar/'+ id)
            .then(response => {
                console.log(response);
                dispatch(deleteCharSuccess())
        })
        .catch(error => {
            console.log(error);
            dispatch(deleteCharFail(error))
        })    
    }
}




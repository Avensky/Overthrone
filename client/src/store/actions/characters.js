import axios from 'axios';
import * as actionTypes from './actionTypes';

export const newCharacterStart = () => ({
  type: actionTypes.NEW_CHARACTER_START,
});

export const newCharacterFail = (error) => ({
  type: actionTypes.NEW_CHARACTER_FAIL,
  error,
});

export const newCharacterSuccess = (characterData) => ({
  type: actionTypes.NEW_CHARACTER_SUCCESS,
  characterData,
});

export const newCharacter = (name, age, relatives, bio) => (dispatch) => {
  dispatch(newCharacterStart());
  const characterData = {
    name,
    age,
    relatives,
    bio,
  };

  axios.post('/api/addCharacter', characterData)
    .then((response) => {
      // console.log(response);
      dispatch(newCharacterSuccess(characterData));
    })
    .catch((error) => {
      // console.log(error);
      dispatch(newCharacterFail(error));
    });
};

export const getCharactersSuccess = (characters) => ({
  type: actionTypes.GET_CHARACTERS_SUCCESS,
  characters,
});

export const getCharactersFail = (error) => ({
  type: actionTypes.GET_CHARACTERS_FAIL,
  error,
});

export const getCharactersStart = () => ({
  type: actionTypes.GET_CHARACTERS_START,
});

export const getCharacters = () => (dispatch) => {
  dispatch(getCharactersStart());
  axios.get('/api/characters')
    .then((result) => {
      // console.log(result);
      const characters = result.data;
      //            const characters = []
      //                for ( let key in posts ) {
      //                    characters.push( {
      //                        ...result.data[key],
      //                        id: key
      //                    } );
      //                }

      characters.sort((a, b) => {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
      });
      dispatch(getCharactersSuccess(characters));
    })
    .catch((error) => {
      dispatch(getCharactersFail(error));
    });
};

export const getCharByIdSuccess = (charById) => ({
  type: actionTypes.GET_CHAR_BY_ID_SUCCESS,
  charById,
});

export const getCharByIdFail = (error) => ({
  type: actionTypes.GET_CHAR_BY_ID_FAIL,
  error,
});

export const getCharByIdStart = () => ({
  type: actionTypes.GET_CHAR_BY_ID_START,
});

export const getCharById = (id) => (dispatch) => {
  dispatch(getCharByIdStart());
  axios.get(`/api/getcharDetails/${id}`)
    .then((result) => {
      // console.log(result);
      const charById = result.data;
      //            const fetchedPostsById = {id: id}
      //            const obj = {...post, ...fetchedPostsById}
      dispatch(getCharByIdSuccess(charById));
    })
    .catch((error) => {
      dispatch(getCharByIdFail(error));
    });
};

export const updateCharStart = () => ({
  type: actionTypes.UPDATE_CHAR_START,
});

export const updateCharFail = (error) => ({
  type: actionTypes.UPDATE_CHAR_FAIL,
  error,
});

export const updateCharSuccess = (characterData) => ({
  type: actionTypes.UPDATE_CHAR_SUCCESS,
  characterData,
});

export const updateChar = (id, name, age, relatives, bio) => (dispatch) => {
  dispatch(updateCharStart());
  const characterData = {
    id,
    name,
    age,
    relatives,
    bio,
  };

  axios.delete(`/api/updatechar/${characterData}`)
    .then((response) => {
      // console.log(response);
      dispatch(updateCharSuccess(characterData));
    })
    .catch((error) => {
      // console.log(error);
      dispatch(updateCharFail(error));
    });
};

export const deleteCharStart = () => ({
  type: actionTypes.DELETE_CHAR_START,
});

export const deleteCharFail = (error) => ({
  type: actionTypes.DELETE_CHAR_FAIL,
  error,
});

export const deleteCharSuccess = () => ({
  type: actionTypes.DELETE_CHAR_SUCCESS,
});

export const deleteChar = (id) => (dispatch) => {
  dispatch(deleteCharStart());
  axios.delete(`/api/deletechar/${id}`)
    .then((response) => {
      // console.log(response);
      dispatch(deleteCharSuccess());
    })
    .catch((error) => {
      // console.log(error);
      dispatch(deleteCharFail(error));
    });
};

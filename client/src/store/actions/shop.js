import axios from 'axios';
import * as actionTypes from './actionTypes';

export const newItemStart = () => ({
  type: actionTypes.NEW_ITEM_START,
});

export const newItemFail = (error) => ({
  type: actionTypes.NEW_ITEM_FAIL,
  error,
});

export const newItemSuccess = (itemData) => ({
  type: actionTypes.NEW_ITEM_SUCCESS,
  itemData,
});

export const newItem = (values) => (dispatch) => {
  dispatch(newItemStart());

  axios.post('/api/addImage', values)
    .then((response) => {
      // console.log(response);
      const { data } = response;
      // console.log(data);
      dispatch(newItemSuccess(data));
    })
    .catch((error) => {
      // console.log(error);
      dispatch(newItemFail(error));
    });
};

export const getItemByIdSuccess = (charById) => ({
  type: actionTypes.GET_ITEM_BY_ID_SUCCESS,
  charById,
});

export const getItemByIdFail = (error) => ({
  type: actionTypes.GET_ITEM_BY_ID_FAIL,
  error,
});

export const getItemByIdStart = () => ({
  type: actionTypes.GET_ITEM_BY_ID_START,
});

export const getItemById = (id) => (dispatch) => {
  dispatch(getItemByIdStart());
  axios.get(`/api/getitemDetails/${id}`)
    .then((result) => {
      // console.log(result);
      const charById = result.data;
      //            const fetchedPostsById = {id: id}
      //            const obj = {...post, ...fetchedPostsById}
      dispatch(getItemByIdSuccess(charById));
    })
    .catch((error) => {
      dispatch(getItemByIdFail(error));
    });
};

export const updateItemStart = () => ({
  type: actionTypes.UPDATE_ITEM_START,
});

export const updateItemFail = (error) => ({
  type: actionTypes.UPDATE_ITEM_FAIL,
  error,
});

export const updateItemSuccess = (itemData) => ({
  type: actionTypes.UPDATE_ITEM_SUCCESS,
  itemData,
});

export const updateItem = (id, name, age, relatives, bio) => (dispatch) => {
  dispatch(updateItemStart());

  const itemData = {
    id,
    name,
    age,
    relatives,
    bio,
  };

  axios.delete(`/api/updateitem/${itemData}`)
    .then((response) => {
      // console.log(response);
      dispatch(updateItemSuccess(itemData));
    })
    .catch((error) => {
      // console.log(error);
      dispatch(updateItemFail(error));
    });
};

export const deleteItemStart = () => ({
  type: actionTypes.DELETE_ITEM_START,
});

export const deleteItemFail = (error) => ({
  type: actionTypes.DELETE_ITEM_FAIL,
  error,
});

export const deleteItemSuccess = () => ({
  type: actionTypes.DELETE_ITEM_SUCCESS,
});

export const deleteItem = (id) => (dispatch) => {
  dispatch(deleteItemStart());
  axios.delete(`/api/deleteitem/${id}`)
    .then((response) => {
      // console.log(response);
      dispatch(deleteItemSuccess());
    })
    .catch((error) => {
      // console.log(error);
      dispatch(deleteItemFail(error));
    });
};

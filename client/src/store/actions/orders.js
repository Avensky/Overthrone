import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};
export const fetchOrdersSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    payload,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error,
  };
};
export const fetchOrders = (values) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    // console.log('fetchOrdersStart');
    axios.post('/api/orders', values)
      .then((result) => {
        // console.log(result);
        const payload = result.data;
        dispatch(fetchOrdersSuccess(payload));
      })
      .catch((error) => {
        dispatch(fetchOrdersFail(error));
      });
  };
};

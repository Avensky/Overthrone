import axios from 'axios'
import * as actionTypes from './actionTypes'

export const fetchUserStart = () => {
    return {
        type: actionTypes.FETCH_USER_START
    }
};

export const fetchUserSuccess = (payload) => {
    return {
        type: actionTypes.FETCH_USER_SUCCESS,
        payload: payload
        
    }
};

export const fetchUserFail = (error) => {
    return {
        type: actionTypes.FETCH_USER_FAIL,
        error: error
    }
};

export const fetchUser = () => {
    return dispatch => {
        dispatch(fetchUserStart());
        axios.get('/api/fethUser')
        .then( result => {
            console.log(result)
            const payload = result.data
            dispatch(fetchUserSuccess(payload));
        })
        .catch( error => {
                dispatch(fetchUserFail(error));
        });
    }
}
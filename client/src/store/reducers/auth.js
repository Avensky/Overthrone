import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    payload: null,

};

const fetchUserStart = (state, action) => {
    return updateObject(state, {
        error: null, 
        loading:true,
    })
}

const fetchUserSuccess = (state, action) => {
    console.log(action);
    return updateObject(state, {
        payload: action.payload,
        error: null,
        loading: false
    })
}
const fetchUserFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false,
    });
}

const signupStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading:true,
    })
}

const signupSuccess = (state, action) => {
    console.log(action);
    return updateObject(state, {
        payload: action.payload,
        error: null,
        loading: false
    })
}
const signupFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false,
    });
}


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_USER_START: return fetchUserStart(state, action);
        case actionTypes.FETCH_USER_SUCCESS: return fetchUserSuccess(state, action);
        case actionTypes.FETCH_USER_FAIL: return fetchUserFail(state, action);
        case actionTypes.SIGNUP_START: return signupStart(state, action);
        case actionTypes.SIGNUP_SUCCESS: return signupSuccess(state, action);
        case actionTypes.SIGNUP_FAIL: return signupFail(state, action);
        default:
            return state;
    }
};

export default reducer;
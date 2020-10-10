import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    userLoading: false,
    payload: null,
    authRedirectPath: '/profile',
    submitted: false

};

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const authSuccess = (state, action) => {
    return updateObject( state, { 
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
        submitted: true

     } );
};

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const fetchUserStart = (state, action) => {
    return updateObject(state, {
        error: null,
        userLoading: true
    })
}

const fetchUserSuccess = (state, action) => {
    console.log(action);
    return updateObject(state, {
        payload: action.payload,
        error: null,
        loading: false,
        userLoading: false
    })
}
const fetchUserFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false,
        userLoading: false
    });
}

const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_USER_START: return fetchUserStart(state, action);
        case actionTypes.FETCH_USER_SUCCESS: return fetchUserSuccess(state, action);
        case actionTypes.FETCH_USER_FAIL: return fetchUserFail(state, action);
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
     
        default:
            return state;
    }
};

export default reducer;
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
        axios.get('/api/fetchUser')
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


export const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    }
}

export const loginSuccess = (token, userId) => {
    return {
        type: actionTypes.LOGIN_SUCCESS, 
        idToken: token,
        userId: userId
    }
}

export const loginFail = (error) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error: error
    }
}

export const logout = () => {
    axios.get('/auth/logout')
    //localStorage.removeItem('token');
    //localStorage.removeItem('expirationDate');
    //localStorage.removeItem('userId');
    return {
        type: actionTypes.LOGOUT
    }
}

export const checkLoginTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (values, authLogin) => {
    return dispatch => {
        dispatch(authStart());
        // const authData = {
        //     email               : email,
        //     password            : password,
        //     returnSecureToken   : true
        // } 
        let url = '/auth/login';
        if (!authLogin) {
            url = '/auth/signup';
        }       
        axios.post(url, values, {
            proxy: {
                host: "http://localhost",
                port: 5000
            }
        })
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response)) 
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err));
            });
    }
}

export const signupStart  = () =>{
    return{
        type: actionTypes.SIGNUP_START
    }
}

export const signupFail = (error) => {
    return {
        type: actionTypes.SIGNUP_FAIL,
        error: error}}

export const signupSuccess = (userData) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        userData: userData}}
    
export const signup = (email, password) => {
    return dispatch => {
        dispatch(signupStart())
        const userData = {
            email : email, 
            password : password,}
        axios.post('/auth/signup', userData)
            .then(response => {
                console.log(response);
//                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
//                localStorage.setItem('token', response.data.idToken);
//                localStorage.setItem('expirationDate', expirationDate);
//                localStorage.setItem('userId', response.data.localId);
//                dispatch(signupSuccess(response.data.idToken, response.data.localId));
//                dispatch(checkLoginTimeout(response.data.expiresIn));       
                dispatch(signupSuccess(userData))        
            })
        .catch(err => {
            console.log(err);
            dispatch(signupFail(err))})}}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};
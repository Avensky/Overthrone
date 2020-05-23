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


export const signupStart  = () =>{
    return{
        type: actionTypes.SIGNUP_START
    }
}

export const signupFail = (error) => {
    return {
        type: actionTypes.SIGNUP_FAIL,
        error: error
    }
}

export const signupSuccess = (userData) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        userData: userData
    }
}

    
export const signup = (email, password) => {
    return dispatch => {
        dispatch(signupStart())
        const userData = {
            email : email, 
            password : password,
        }
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
            dispatch(signupFail(err))
        })    
    }
}
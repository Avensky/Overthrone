import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchUserStart = () => ({
  type: actionTypes.FETCH_USER_START,
});

export function fetchUserSuccess(data) {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    data,
  };
}

export function fetchUserFail(error) {
  return {
    type: actionTypes.FETCH_USER_FAIL,
    error,
  };
}

export function fetchUser() {
  return (dispatch) => {
    dispatch(fetchUserStart());
    axios.get('/api/fetchUser')
      .then((result) => {
        dispatch(fetchUserSuccess(result.data));
      })
      .catch((error) => {
        // console.log('fetchUser Error = ', error);
        dispatch(fetchUserFail(error));
      });
  };
}

// logout
export const logoutStart = () => ({
  type: actionTypes.LOGOUT_START,
});

export const logoutSuccess = (message) => {
  return {
    type: actionTypes.LOGOUT_SUCCESS,
    message,
  };
};
export const logoutFail = (error) => {
  return {
    type: actionTypes.LOGOUT_FAIL,
    error,
  };
};
export const logout = () => {
  return (dispatch) => {
    dispatch(logoutStart());
    axios.get('/api/logout')
      .then((result) => {
        const { data } = result;
        dispatch(logoutSuccess(data));
      })
      .catch((error) => {
        dispatch(logoutFail(error));
      });
  };
};
export const checkLoginTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
export const authSuccess = (data) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    data,
  };
};
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};
export function auth(values, authType, token) {
  return (dispatch) => {
    dispatch(authStart());
    let url;
    switch (authType) {
      case authType === 'login':
        url = '/api/login';
        break;
      case authType === 'register':
        url = '/api/signup';
        break;
      case authType === 'forgot-password':
        url = '/api/forgotPassword';
        break;
      case authType === 'reset-password':
        url = (`/api/resetPassword/${token}`);
        // console.log('url', url);
        break;
      default:
        url = '/api/login';
    }

    let method;
    authType === 'reset-password'
      ? method = axios.patch
      : method = axios.post;

    axios.post(url, values)
      .then((response) => { dispatch(authSuccess(response.data.info)); })
      .catch((err) => { dispatch(authFail(err)); });
  };
}

export const connectStart = () => {
  return {
    type: actionTypes.CONNECT_START,
  };
};

export const connectSuccess = (token, userId) => {
  return {
    type: actionTypes.CONNECT_SUCCESS,
    idToken: token,
    userId,
  };
};
export const connectFail = (error) => {
  return {
    type: actionTypes.CONNECT_FAIL,
    error,
  };
};
export const fbAuthStart = () => {
  return {
    type: actionTypes.FB_AUTH_START,
  };
};
export const fbAuthSuccess = () => {
  return {
    type: actionTypes.FB_AUTH_SUCCESS,
  };
};
export const fbAuthFail = (error) => {
  return {
    type: actionTypes.FB_AUTH_FAIL,
    error,
  };
};
export const connect = (values) => (dispatch) => {
  dispatch(connectStart());
  const url = '/connect/local';
  axios.post(url, values)
    .then((response) => {
      // console.log('response = '+JSON.stringify(response));
      // console.log('response = '+response);
      dispatch(connectSuccess(response.data));
    })
    .catch((err) => {
      // console.log('err = '+err);
      dispatch(connectFail(err));
    });
};

export const fbAuth = () => (dispatch) => {
  dispatch(fbAuthStart());
  dispatch(fbAuthSuccess());
  // dispatch(fbAuthFail(err));
};

export const newAddressStart = () => ({
  type: actionTypes.NEW_ADDRESS_START,
});

export const newAddressFail = (error) => ({
  type: actionTypes.NEW_ADDRESS_FAIL,
  error,
});

export const newAddressSuccess = (addressData) => ({
  type: actionTypes.NEW_ADDRESS_SUCCESS,
  addressData,
});

export const newAddress = (values) => (dispatch) => {
  dispatch(newAddressStart());
  // console.log('New Address Start');
  axios.post('/api/addAddress', values)
    .then((response) => {
      // console.log('Axios Start');
      // console.log(response);
      const { data } = response;
      // console.log(data);
      dispatch(newAddressSuccess(data));
    })
    .catch((error) => {
      // console.log(error);
      dispatch(newAddressFail(error));
    });
};

export const setAuthRedirectPath = (path) => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path,
});

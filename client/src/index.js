import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './components/app/App';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import * as serviceWorker from './serviceWorker';
import authReducer  from './store/reducers/auth';
import cartReducer  from './store/reducers/cart';
import characterReducer    from './store/reducers/characters';
import faqReducer from './store/reducers/faq';
import shopReducer from './store/reducers/shop';
import ordersReducer from './store/reducers/orders';

// Development only axios helpers!
import axios from 'axios';
window.axios = axios;

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose || compose;
//const composeEnhancers = !__PROD__ ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose

const rootReducer = combineReducers({
    auth        : authReducer,
    cart        : cartReducer,
    char        : characterReducer,
    faq         : faqReducer,
    shop        : shopReducer,
    orders      : ordersReducer
})

const store = createStore(
    rootReducer, 
    composeEnhancers(
        applyMiddleware(thunk)
    )
);
// strict mode for dev only
const app = (
  //<React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
  //</React.StrictMode>
)


ReactDOM.render(app, document.getElementById('root') );
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// console.log('Stripe Key is', process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)
// console.log('Environment Key is', process.env.NODE_ENV)
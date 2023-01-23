import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './components/app/App';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import store from './store/store';

// strict mode for dev only
const app = (
  //<React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
  //</React.StrictMode>
);


ReactDOM.render(app, document.getElementById('root') );
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// console.log('Stripe Key is', process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)
// console.log('Environment Key is', process.env.NODE_ENV)
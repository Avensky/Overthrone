import * as actionTypes from './actionTypes'
//import axios from 'axios';

export const setContacts = (contacts) => {
    return {
        type: actionTypes.SET_CONTACTS,
        payload: contacts
    }
};
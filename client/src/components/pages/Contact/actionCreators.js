import { SET_CONTACTS } from './actions';
const setContacts = (contacts) => {
    return {
        type: SET_CONTACTS,
        payload: contacts
    }
};
export { setContacts };
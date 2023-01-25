import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility/utility';

const initialState = {
  faqs: [],
  loading: false,
  posted: false,
  faqById: [],
};

const newFaqStart = (state, action) => updateObject(state, { posted: false });

const newFaqFail = (state, action) => updateObject(state, {
  loading: false,
});

const newFaqSuccess = (state, action) => {
  const newFaq = updateObject(action.faqData, { id: action.faqId });
  return updateObject(state, {
    loading: false,
    faqs: state.faqs.concat(newFaq),
  });
};

const getFaqsStart = (state, action) => updateObject(state, {
  loading: true,
});

const getFaqsFail = (state, action) => updateObject(state, {
  loading: false,
});

const getFaqsSuccess = (state, action) => updateObject(state, {
  faqs: action.faqs,
  loading: false,
});

const getFaqByIdStart = (state, action) => updateObject(state, {
  loading: true,
});

const getFaqByIdFail = (state, action) => updateObject(state, {
  loading: false,
});

const getFaqByIdSuccess = (state, action) => updateObject(state, {
  faqById: action.faqById,
  loading: false,
});

const deleteFaqStart = (state, action) => updateObject(state, {
  loading: true,
});

const deleteFaqFail = (state, action) => updateObject(state, {
  loading: false,
});

const deleteFaqSuccess = (state, action) => updateObject(state, {
  loading: false,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NEW_FAQ_SUCCESS: return newFaqSuccess(state, action);
    case actionTypes.NEW_FAQ_FAIL: return newFaqFail(state, action);
    case actionTypes.NEW_FAQ_START: return newFaqStart(state, action);

    case actionTypes.GET_FAQS_SUCCESS: return getFaqsSuccess(state, action);
    case actionTypes.GET_FAQS_FAIL: return getFaqsFail(state, action);
    case actionTypes.GET_FAQS_START: return getFaqsStart(state, action);

    case actionTypes.DELETE_FAQ_SUCCESS: return deleteFaqSuccess(state, action);
    case actionTypes.DELETE_FAQ_FAIL: return deleteFaqFail(state, action);
    case actionTypes.DELETE_FAQ_START: return deleteFaqStart(state, action);

    case actionTypes.GET_FAQ_BY_ID_SUCCESS: return getFaqByIdSuccess(state, action);
    case actionTypes.GET_FAQ_BY_ID_FAIL: return getFaqByIdFail(state, action);
    case actionTypes.GET_FAQ_BY_ID_START: return getFaqByIdStart(state, action);

    default: return state;
  }
};

export default reducer;

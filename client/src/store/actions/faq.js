import axios from 'axios';
import * as actionTypes from './actionTypes';

export const newFaqStart = () => ({
  type: actionTypes.NEW_FAQ_START,
});

export const newFaqFail = (error) => ({
  type: actionTypes.NEW_FAQ_FAIL,
  error,
});

export const newFaqSuccess = (faqData) => ({
  type: actionTypes.NEW_FAQ_SUCCESS,
  faqData,
});

export const newFaq = (question, answer) => (dispatch) => {
  dispatch(newFaqStart());

  const faqData = {
    question,
    answer,
  };

  axios.post('/api/addFaq', faqData)
    .then((response) => {
      // console.log(response);
      dispatch(newFaqSuccess(faqData));
    })
    .catch((error) => {
      // console.log(error);
      dispatch(newFaqFail(error));
    });
};

export const getFaqsSuccess = (faqs) => ({
  type: actionTypes.GET_FAQS_SUCCESS,
  faqs,
});

export const getFaqsFail = (error) => ({
  type: actionTypes.GET_FAQS_FAIL,
  error,
});

export const getFaqsStart = () => ({
  type: actionTypes.GET_FAQS_START,
});

export const getFaqs = () => (dispatch) => {
  dispatch(getFaqsStart());
  axios.get('/api/faqs')
    .then((result) => {
      // console.log(result);
      const faqs = result.data;
      dispatch(getFaqsSuccess(faqs));
    })
    .catch((error) => {
      dispatch(getFaqsFail(error));
    });
};

export const getFaqByIdSuccess = (faqById) => ({
  type: actionTypes.GET_FAQ_BY_ID_SUCCESS,
  faqById,
});

export const getFaqByIdFail = (error) => ({
  type: actionTypes.GET_FAQ_BY_ID_FAIL,
  error,
});

export const getFaqByIdStart = () => ({
  type: actionTypes.GET_FAQ_BY_ID_START,
});

export const getFaqById = (id) => (dispatch) => {
  dispatch(getFaqByIdStart());
  axios.get(`/api/getfaqDetails/${id}`)
    .then((result) => {
      // console.log(result);
      const faqById = result.data;
      //            const fetchedPostsById = {id: id}
      //            const obj = {...post, ...fetchedPostsById}
      dispatch(getFaqByIdSuccess(faqById));
    })
    .catch((error) => {
      dispatch(getFaqByIdFail(error));
    });
};

export const updateFaqStart = () => ({
  type: actionTypes.UPDATE_FAQ_START,
});

export const updateFaqFail = (error) => ({
  type: actionTypes.UPDATE_FAQ_FAIL,
  error,
});

export const updateFaqSuccess = (faqData) => ({
  type: actionTypes.UPDATE_FAQ_SUCCESS,
  faqData,
});

export const updateFaq = (question, answer) => (dispatch) => {
  dispatch(updateFaqStart());

  const faqData = {
    question,
    answer,
  };

  axios.delete(`/api/updatefaq/${faqData}`)
    .then((response) => {
      // console.log(response);
      dispatch(updateFaqSuccess(faqData));
    })
    .catch((error) => {
      // console.log(error);
      dispatch(updateFaqFail(error));
    });
};

export const deleteFaqStart = () => ({
  type: actionTypes.DELETE_FAQ_START,
});

export const deleteFaqFail = (error) => ({
  type: actionTypes.DELETE_FAQ_FAIL,
  error,
});

export const deleteFaqSuccess = () => ({
  type: actionTypes.DELETE_FAQ_SUCCESS,
});

export const deleteFaq = (id) => (dispatch) => {
  dispatch(deleteFaqStart());
  axios.delete(`/api/deletefaq/${id}`)
    .then((response) => {
      // console.log(response);
      dispatch(deleteFaqSuccess());
    })
    .catch((error) => {
      // console.log(error);
      dispatch(deleteFaqFail(error));
    });
};

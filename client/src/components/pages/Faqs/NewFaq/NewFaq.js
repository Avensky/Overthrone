import React, { Component, useState } from 'react';
//  import {Redirect} from 'react-router-dom';
// import Layout from '../../Layout/Layout';
// import Header from '../../Layout/Header/Header';
// import Auxiliary from '../../../../hoc/Auxiliary'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classes from '../../Pages.module.scss';
import myClasses from './NewFaq.module.scss';
import * as actions from '../../../../store/actions/index';
// import axios from '../../../axios';

const NewFaq = (props) => {
  const [question, setQuestion] = useState({
    value: '',
    validation: {
      required: true,
    },
  });

  const [answer, setAnswer] = useState({
    value: '',
    validation: {
      required: true,
    },
  });

  const [error, setError] = useState(null);

  const newFaqHandler = (event) => {
    event.preventDefault();
    // props.onSetAuthRedirectPath('/checkout');
    //        props.history.push('/faqs');
    //         const author =  props.payload.username;
    props.onNewFaq(
      question.value,
      answer.value,
    );
  };

  const inputChangedHandler = (event, controlName) => {
    //  const updatedControls = {
    //    ...state.faqForm,
    //    [controlName]: {
    //      ...state.faqForm[controlName],
    //      value: event.target.value,
    //      valid: checkValidity( event.target.value, state.faqForm[controlName].validation ),
    //      touched: true,
    //    },
    //  };
    //  setState({ faqForm: updatedControls });
  };

  let errorMessage = null;
  if (props.error) {
    errorMessage = (
                <p>{props.error.message}</p>
    );
  }

  const form = (
            <form onSubmit={newFaqHandler}>
                <legend>Add a Faq</legend>
                {errorMessage}
                <div className={myClasses.MidLine}>
                    <label className={myClasses.Left}>Question: </label>
                    <input
                        type="text"
                        onChange={(event) => inputChangedHandler(event, 'question')}
                        // placeholder="Name"
                        className={myClasses.Right}
                    />
                </div>

                <div className={myClasses.MidLine}>
                    <label className={myClasses.Left}>Answer: </label>
                    <textarea
                        type="textarea"
                        rows="4"
                        // placeholder="Bio"
                        className={myClasses.Right}
                        onChange={(event) => inputChangedHandler(event, 'answer')}
                    />
                </div>
                <div className={myClasses.MidLine}>
                    <label className={myClasses.Left} />
                    <button className={['auth-btn', classes.btn, myClasses.Right].join(' ')}>Add Faq</button>
                </div>
                           </form>
  );

  return (
            <div className={myClasses.NewFaq}>
                {errorMessage}
                {form}
            </div>
  );
};

const mapStateToProps = (state) => ({
  error: state.char.error,
  isLoggedIn: state.auth.payload !== null,
  payload: state.auth.payload,
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => ({
  onNewFaq: (question, answer) => dispatch(actions.newFaq(question, answer)),
});

NewFaq.propTypes = {
  onNewFaq: PropTypes.func,
  error: PropTypes.any,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewFaq);

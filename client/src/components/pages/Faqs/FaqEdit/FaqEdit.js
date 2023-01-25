import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import Auxiliary from '../../../../hoc/Auxiliary';
import PropTypes from 'prop-types';
import classes from '../../Pages.module.scss';
import myClasses from './FaqEdit.module.scss';
import * as actions from '../../../../store/actions/index';

const FaqEdit = (props) => {
  const [question, setQuestion] = useState({
    // value: props.faq.name,
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
  const [id, setId] = useState(null);
  const [loadedItem, setLoadedItem] = useState(null);

  const loadData = () => {
    if (props.match.params.id) {
      if (!loadedItem || (loadedItem && loadedItem.id !== +props.match.params.id)) {
        const itemId = props.match.params.id;
        props.onGetFaqById(itemId);
        setLoadedItem(props.faq);
        // console.log(`faq: ${props.faq}`);
      }
    }
  };

  useEffect(() => {
    // console.log(props);
    loadData();
    if (!props.faq) {
      props.history.push('/faqs');
    }
  });

  const updateFaqHandler = (event) => {
    //        event.preventDefault();
    // props.onSetAuthRedirectPath('/checkout');
    //        props.history.push('/faqs');
    //         const author =  props.payload.username;
    props.onUpdateFaq(question.value, answer.value);
  };

  const inputChangedHandler = (event, controlName) => {};

  const deleteFaqHandler = () => {
    //  console.log(id);
    props.onDeleteFaq(props.faq._id);
  };

  let form = <p style={{ textAlign: 'center' }}>Please Select a Faq!</p>;

  if (props.match.params.id) {
    form = <p style={{ textAlign: 'center' }}>Loading...!</p>;
  }

  if (loadedItem) {
    form = (
            <form onSubmit={updateFaqHandler}>
                <legend>Update a Faq</legend>
                <div className = {myClasses.Line}>
                    <label className={myClasses.Left}>Name: </label>
                    <input
                        type = "text"
                        name = "name"
                        // value       = {props.faq.name}
                        defaultValue = {props.faq.name}
                        className ={myClasses.Right}
                        onChange = {(event) => inputChangedHandler(event, 'name')}
                    />
                </div>
                <div className = {myClasses.Line}>
                    <label className={myClasses.Left}>Age: </label>
                    <input
                        type ="text"
                        defaultValue = {props.faq.age}
                        className ={myClasses.Right}
                        onChange ={(event) => inputChangedHandler(event, 'age')}

                    />
                </div>
                 <div className = {myClasses.Line}>
                    <label className={myClasses.Left}>Bio: </label>
                    <textarea
                        type ="textarea"
                        defaultValue = {props.faq.bio}
                        className ={myClasses.Right}
                        rows ="4"
                        onChange ={(event) => inputChangedHandler(event, 'bio')}/>
                </div>
                <div className = {myClasses.Line}>
                    <label className={myClasses.Left}>Relatives: </label>
                    <input
                        type = "text"
                        defaultValue = {props.faq.relatives}
                        className ={myClasses.Right}
                        onChange ={(event) => inputChangedHandler(event, 'relatives')}

                    />
                </div>
                <div className="MidLine">
                    <button
                        className={['btn-warning', classes.btn].join(' ')}
                        onClick={() => updateFaqHandler()}
                    >UPDATE</button>
                    <button
                        className={['btn-danger', classes.btn].join(' ')}
                        onClick={() => deleteFaqHandler()}
                    >DELETE</button>
                </div>
            </form>
    );
  }

  return (
    form
  );
};

const mapStateToProps = (state) => ({
  faqs: state.faq.faqs,
  faq: state.faq.faqById,
});

const mapDispatchToProps = (dispatch) => ({
  onGetFaqById: (id) => dispatch(actions.getFaqById(id)),
  onDeleteFaq: (id) => dispatch(actions.deleteFaq(id)),
  onUpdateFaq: (id, name, age, relatives, bio) => {
    dispatch(actions.updateFaq(id, name, age, relatives, bio));
  },
});

FaqEdit.propTypes = {
  onGetFaqById: PropTypes.func,
  faq: PropTypes.any,
  match: PropTypes.any,
  history: PropTypes.any,
  onDeleteFaq: PropTypes.func,
  onUpdateFaq: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(FaqEdit);

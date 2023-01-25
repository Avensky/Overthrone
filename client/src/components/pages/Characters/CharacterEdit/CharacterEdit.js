import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// import Auxiliary from '../../../../hoc/Auxiliary';
import PropTypes from 'prop-types';
import classes from '../../Pages.module.scss';
import myClasses from './CharacterEdit.module.scss';
import * as actions from '../../../../store/actions/index';

const CharacterEdit = (props) => {
  const [name, setName] = useState({
    value: '',
    validation: {
      required: true,
    },
  });
  const [age, setAge] = useState({
    value: '',
    validation: {
      required: true,
    },
  });
  const [bio, setBio] = useState({
    value: '',
    validation: {
      required: true,
    },
  });
  const [relatives, setRelatives] = useState({
    value: '',
    validation: {
      required: false,
    },
  });
  const [error, setError] = useState(null);
  const [id, setId] = useState(null);
  const [loadedItem, setLoadedItem] = useState(null);

  const loadData = () => {
    if (props.match.params.id) {
      if (!loadedItem || (loadedItem && loadedItem.id !== +props.match.params.id)) {
        const itemId = props.match.params.id;
        props.onGetCharById(itemId);
        setLoadedItem(props.char);
        // console.log(`char: ${props.char}`);
      }
    }
  };

  useEffect(() => {
    // console.log(props);
    loadData();
    if (!props.char) {
      props.history.push('/characters');
    }
  });

  const updateCharHandler = (event) => {
    //        event.preventDefault();
    // props.onSetAuthRedirectPath('/checkout');
    //        props.history.push('/characters');
    //         const author =  props.payload.username;
    props.onUpdateChar(
      name.value,
      age.value,
      relatives.value,
      bio.value,
    );
  };

  const inputChangedHandler = (event, controlName) => {
    // const updatedControls = {
    //   ...characterForm,
    //   [controlName]: {
    //     ...characterForm[controlName],
    //     value: event.target.value,
    //     valid: checkValidity( event.target.value,
    //       characterForm[controlName].validation ),
    //     touched: true,
    //   },
    //   date: {
    //     ...characterForm.date,
    //     value: new Date(),
    //   },
    // };
    // setState({ characterForm: updatedControls });
  };

  const deleteCharHandler = () => {
    // console.log(id);
    props.onDeleteChar(props.char.id);
  };

  let form = <p style={{ textAlign: 'center' }}>Please Select a Character!</p>;

  if (props.match.params.id) {
    form = <p style={{ textAlign: 'center' }}>Loading...!</p>;
  }

  if (loadedItem) {
    form = (
        <form onSubmit={updateCharHandler}>
            <legend>Update a Character</legend>
            <div className = {myClasses.Line}>
                <label className={myClasses.Left}>Name: </label>
                <input
                    type = "text"
                    name = "name"
                    // value       = {props.char.name}
                    defaultValue = {props.char.name}
                    className ={myClasses.Right}
                    onChange = {(event) => inputChangedHandler(event, 'name')}
                />
            </div>
            <div className = {myClasses.Line}>
                <label className={myClasses.Left}>Age: </label>
                <input
                    type ="text"
                    defaultValue = {props.char.age}
                    className ={myClasses.Right}
                    onChange ={(event) => inputChangedHandler(event, 'age')}

                />
            </div>
                <div className = {myClasses.Line}>
                <label className={myClasses.Left}>Bio: </label>
                <textarea
                    type ="textarea"
                    defaultValue = {props.char.bio}
                    className ={myClasses.Right}
                    rows ="4"
                    onChange ={(event) => inputChangedHandler(event, 'bio')}/>
            </div>
            <div className = {myClasses.Line}>
                <label className={myClasses.Left}>Relatives: </label>
                <input
                    type = "text"
                    defaultValue = {props.char.relatives}
                    className ={myClasses.Right}
                    onChange ={(event) => inputChangedHandler(event, 'relatives')}

                />
            </div>
            <div className="MidLine">
                <button
                    className={['btn-warning', classes.btn].join(' ')}
                    onClick={() => updateCharHandler()}
                >UPDATE</button>
                <button
                    className={['btn-danger', classes.btn].join(' ')}
                    onClick={() => deleteCharHandler()}
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
  chars: state.char.characters,
  char: state.char.charById,
});

const mapDispatchToProps = (dispatch) => ({
  onGetCharById: (id) => dispatch(actions.getCharById(id)),
  onDeleteChar: (id) => dispatch(actions.deleteChar(id)),
  onUpdateChar: (id, name, age, relatives, bio) => {
    dispatch(actions.updateChar(id, name, age, relatives, bio));
  },
});

CharacterEdit.propTypes = {
  char: PropTypes.any,
  history: PropTypes.any,
  match: PropTypes.any,
  onGetCharById: PropTypes.func,
  onDeleteChar: PropTypes.func,
  onUpdateChar: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(CharacterEdit);

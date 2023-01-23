import React, { useState } from 'react';
//  import {Redirect} from 'react-router-dom';
// import Layout from '../../Layout/Layout';
// import Header from '../../Layout/Header/Header';
// import Auxiliary from '../../../../hoc/Auxiliary'
import classes from '../../Pages.module.scss';
import myClasses from './NewCharacter.module.scss';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/index';
// import axios from '../../../axios';
import PropTypes from 'prop-types';

const NewCharacter =(props)=>{
    const [name, setName] = useState({
            value: '',
            validation: {
                required: true,
            }
        });
    const [age, setAge]= useState( {
            value: '',
            validation: {
                required: true,
            }
        });
    const [bio, setBio]= useState( {
            value: '',
            validation: {
                required: true,
            }
        });
    const [relatives, setRelatives] = useState( {
            value: '',
            validation: {
                required: false,
            }
        });
    const [error, setError] = useState (null);


    newCharacterHandler = (event) => {
        event.preventDefault();
        //props.onSetAuthRedirectPath('/checkout');
        //        props.history.push('/characters');
        //         const author =  props.payload.username;
        props.onNewCharacter(
            name.value, 
            age.value, 
            relatives.value, 
            bio.value
        );
    };

    inputChangedHandler = ( event, controlName ) => {
    const updatedControls = {
        ...state.characterForm,
        [controlName]: {
            ...state.characterForm[controlName],
            value: event.target.value,
    //                valid: checkValidity( event.target.value, state.characterForm[controlName].validation ),
            touched: true
        },
        date: {
            ...date,
            value: new Date()
        }
    };
    setState( { characterForm: updatedControls } );
    };


    let errorMessage = null;
    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        );
    }

    let form = (
        <form onSubmit={newCharacterHandler}>
            <legend>Add a Character</legend>
            {errorMessage}
            <div className={myClasses.MidLine}>
                <label className={myClasses.Left}>Name: </label> 
                <input 
                    type="text" 
                    onChange={(event) => inputChangedHandler( event, "name")}
                    //placeholder="Name"
                    className={myClasses.Right}
                />
            </div>
            <div className={myClasses.MidLine}>
                <label className={myClasses.Left}>Age: </label>
                <input 
                        type="text" 
                        onChange={(event) => inputChangedHandler( event, "age")}
                        //placeholder="Age"
                        className={myClasses.Right}
                    />                    
            </div>
            <div className={myClasses.MidLine}>
                <label className={myClasses.Left}>Relatives: </label>
                <input 
                    type="text" 
                    onChange={(event) => inputChangedHandler( event, "relatives")}
                    //placeholder="Relatives"
                    className={myClasses.Right}
                />
            </div>
            <div className={myClasses.MidLine}>
                <label className={myClasses.Left}>Bio: </label>
                <textarea
                    type="textarea"
                    rows="4" 
                    //placeholder="Bio"
                    className={myClasses.Right}
                    onChange={(event) => inputChangedHandler( event, "bio")}
                />
            </div>
            <div className={myClasses.MidLine}>
                <label className={myClasses.Left} />
                <button className={["auth-btn", classes.btn, myClasses.Right].join(' ')}>Add Character</button>
            </div>
                        </form>
    );

    return (
        <div className={myClasses.NewCharacter}>
            {errorMessage}
            {form}                
        </div>     
    );

};

const mapStateToProps = state => {
    return {
        error       : state.char.error,
        isLoggedIn  : state.auth.payload !== null,
        payload     : state.auth.payload,
        userId  : state.auth.userId,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onNewCharacter: (name, age, relatives, bio) => dispatch(actions.newCharacter(name, age, relatives, bio)),
    };
};

NewCharacter.propTypes={
    onNewCharacter: PropTypes.func,
    error: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCharacter);
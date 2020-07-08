import React, { Component } from 'react';
//  import {Redirect} from 'react-router-dom';
// import Layout from '../../Layout/Layout';
// import Header from '../../Layout/Header/Header';
// import Auxiliary from '../../../../hoc/Auxiliary'
import classes from '../../Pages.module.scss';
import myClasses from './NewCharacter.module.scss'
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/index';
// import axios from '../../../axios';

class NewCharacter extends Component {
    state = {
        characterForm:{
            name: {
                value: '',
                validation: {
                    required: true,
                }
            },
            age: {
                value: '',
                validation: {
                    required: true,
                }
            },
            bio: {
                value: '',
                validation: {
                    required: true,
                }
            },
            relatives: {
                value: '',
                validation: {
                    required: true,
                }
            }
        },
        error: null
    }

    componentDidMount () {
        console.log(this.props);
    }

    newCharacterHandler = (event) => {
        event.preventDefault();
        //this.props.onSetAuthRedirectPath('/checkout');
//        this.props.history.push('/characters');
//         const author =  this.props.payload.username;
        this.props.onNewCharacter(
            this.state.characterForm.name.value, 
            this.state.characterForm.age.value, 
            this.state.characterForm.relatives.value, 
            this.state.characterForm.bio.value
        );
    }

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = {
            ...this.state.characterForm,
            [controlName]: {
                ...this.state.characterForm[controlName],
                value: event.target.value,
//                valid: this.checkValidity( event.target.value, this.state.characterForm[controlName].validation ),
                touched: true
            },
            date: {
                ...this.state.characterForm.date,
                value: new Date()
            }
        };
        this.setState( { characterForm: updatedControls } );
    }

    render () {
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let form = (
            <form onSubmit={this.newCharacterHandler}>
                <legend>Add a Character</legend>
                {errorMessage}
                <label>Name</label>
                <input 
                    type="text" 
                    onChange={(event) => this.inputChangedHandler( event, "name")}
               
                />
                <label>Age</label>
                <input 
                    type="text" 
                    onChange={(event) => this.inputChangedHandler( event, "age")}
             
                />
                <label>Relatives</label>
                <input 
                    type="text" 
                    onChange={(event) => this.inputChangedHandler( event, "relatives")}
                
                />
                <label>Bio</label>
                <textarea
                    type="textarea"
                    rows="4" 
                    onChange={(event) => this.inputChangedHandler( event, "bio")}/>
                <button className={classes.btn}>Add Character</button>
            </form>
        )
        
        return (
            <div className={myClasses.NewCharacter}>
                {errorMessage}
                {form}                
            </div>     
        );
    }
}

const mapStateToProps = state => {
    return {
        //error: state.newCharacter.error,
        isLoggedIn: state.auth.payload !== null,
        payload: state.auth.payload,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onNewCharacter: (name, age, bio, relatives) => dispatch(actions.newCharacter(name, age, bio, relatives)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewCharacter);
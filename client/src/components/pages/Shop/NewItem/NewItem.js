import React, { Component } from 'react';
//  import {Redirect} from 'react-router-dom';
// import Layout from '../../Layout/Layout';
// import Header from '../../Layout/Header/Header';
// import Auxiliary from '../../../../hoc/Auxiliary'
import classes from '../../Pages.module.scss';
import myClasses from './NewItem.module.scss'
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/index';
// import axios from '../../../axios';

class NewItem extends Component {
    state = {
        itemForm:{
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
                    required: false,
                }
            }
        },
        error: null
    }

    componentDidMount () {
        console.log(this.props);
    }

    newItemHandler = (event) => {
        event.preventDefault();
        //this.props.onSetAuthRedirectPath('/checkout');
//        this.props.history.push('/items');
//         const author =  this.props.payload.username;
        this.props.onNewItem(
            this.state.itemForm.name.value, 
            this.state.itemForm.age.value, 
            this.state.itemForm.relatives.value, 
            this.state.itemForm.bio.value
        );
    }

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = {
            ...this.state.itemForm,
            [controlName]: {
                ...this.state.itemForm[controlName],
                value: event.target.value,
//                valid: this.checkValidity( event.target.value, this.state.itemForm[controlName].validation ),
                touched: true
            },
            date: {
                ...this.state.itemForm.date,
                value: new Date()
            }
        };
        this.setState( { itemForm: updatedControls } );
    }

    render () {
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let form = (
            <form onSubmit={this.newItemHandler}>
                <legend>Add a Item</legend>
                {errorMessage}
                <div className={myClasses.MidLine}>
                    <label className={myClasses.Left}>Name: </label> 
                    <input 
                        type="text" 
                        onChange={(event) => this.inputChangedHandler( event, "name")}
                        //placeholder="Name"
                        className={myClasses.Right}
                    />
                </div>
                <div className={myClasses.MidLine}>
                    <label className={myClasses.Left}>Age: </label>
                    <input 
                            type="text" 
                            onChange={(event) => this.inputChangedHandler( event, "age")}
                            //placeholder="Age"
                            className={myClasses.Right}
                        />                    
                </div>
                <div className={myClasses.MidLine}>
                    <label className={myClasses.Left}>Relatives: </label>
                    <input 
                        type="text" 
                        onChange={(event) => this.inputChangedHandler( event, "relatives")}
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
                        onChange={(event) => this.inputChangedHandler( event, "bio")}
                    />
                </div>
                <div className={myClasses.MidLine}>
                    <label className={myClasses.Left} />
                    <button className={["auth-btn", classes.btn, myClasses.Right].join(' ')}>Add Item</button>
                </div>
                           </form>
        )
        
        return (
            <div className={myClasses.NewItem}>
                {errorMessage}
                {form}                
            </div>     
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.char.error,
        isLoggedIn: state.auth.payload !== null,
        payload: state.auth.payload,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onNewItem: (name, age, relatives, bio) => dispatch(actions.newItem(name, age, relatives, bio)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewItem);
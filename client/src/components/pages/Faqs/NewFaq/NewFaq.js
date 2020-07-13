import React, { Component } from 'react';
//  import {Redirect} from 'react-router-dom';
// import Layout from '../../Layout/Layout';
// import Header from '../../Layout/Header/Header';
// import Auxiliary from '../../../../hoc/Auxiliary'
import classes from '../../Pages.module.scss';
import myClasses from './NewFaq.module.scss'
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/index';
// import axios from '../../../axios';

class NewFaq extends Component {
    state = {
        faqForm:{
            question: {
                value: '',
                validation: {
                    required: true,
                }
            },
            answer: {
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

    newFaqHandler = (event) => {
        event.preventDefault();
        //this.props.onSetAuthRedirectPath('/checkout');
//        this.props.history.push('/faqs');
//         const author =  this.props.payload.username;
        this.props.onNewFaq(
            this.state.faqForm.question.value, 
            this.state.faqForm.answer.value, 
        );
    }

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = {
            ...this.state.faqForm,
            [controlName]: {
                ...this.state.faqForm[controlName],
                value: event.target.value,
//                valid: this.checkValidity( event.target.value, this.state.faqForm[controlName].validation ),
                touched: true
            }
        };
        this.setState( { faqForm: updatedControls } );
    }

    render () {
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let form = (
            <form onSubmit={this.newFaqHandler}>
                <legend>Add a Faq</legend>
                {errorMessage}
                <div className={myClasses.MidLine}>
                    <label className={myClasses.Left}>Question: </label> 
                    <input 
                        type="text" 
                        onChange={(event) => this.inputChangedHandler( event, "questions")}
                        //placeholder="Name"
                        className={myClasses.Right}
                    />
                </div>

                <div className={myClasses.MidLine}>
                    <label className={myClasses.Left}>Answer: </label>
                    <textarea
                        type="textarea"
                        rows="4" 
                        //placeholder="Bio"
                        className={myClasses.Right}
                        onChange={(event) => this.inputChangedHandler( event, "answer")}
                    />
                </div>
                <div className={myClasses.MidLine}>
                    <label className={myClasses.Left} />
                    <button className={["auth-btn", classes.btn, myClasses.Right].join(' ')}>Add Faq</button>
                </div>
                           </form>
        )
        
        return (
            <div className={myClasses.NewFaq}>
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
        onNewFaq: (name, age, relatives, bio) => dispatch(actions.newFaq(name, age, relatives, bio)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewFaq);
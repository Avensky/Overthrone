import React, { Component } from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../../../hoc/Auxiliary';
// import { updateObject, checkValidity } from '../../../utility/utility';
import * as actions from '../../../store/actions/index';

class Login extends Component {
    state = {
        controls: {
            email: {
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            confirmPassword: {
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        }
    }

    signupHandler = ( event ) => {
        event.preventDefault();
        this.props.onSignup( 
            this.state.controls.email.value, 
            this.state.controls.password.value
        )
    }

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
//                valid: this.checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            }
        };
        this.setState( { controls: updatedControls } );
    }


    render () {
        let form = (
            <form action="/auth/signup" method="post">
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="text"
                        className="form-control" 
                        name="email"
                        //onChange={(event) => this.inputChangedHandler( event, "email")}
                        placeholder="Enter Email"
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        name="password"
                        //onChange={(event) => this.inputChangedHandler( event, "password")}
                        className="form-control" 
                        placeholder="Enter Password"
                        />
                </div>

                <button  type="submit" className="btn btn-warning btn-lg">Signup</button>
            </form>
        )

        return(
            <Auxiliary>
                <div className="container">
                    <div className="col-sm-6 col-sm-offset-3">
                        <h1><span className="fa fa-sign-in"></span> Signup</h1>
                        {form}
                        <hr />
                        <p>Already have an account? <a href="/login">Login</a></p>
                        <p>Or go <a href="/">home</a>.</p>
                    </div>
                </div>
            </Auxiliary>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isLoggedIn: state.auth.user,
        loginRedirectPath: state.auth.loginRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignup: (email, password) => dispatch( actions.signup(actions.signup(email, password)))
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Login);
import React, { Component } from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../../../hoc/Auxiliary';
import classes from './Login.module.css';


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
            },
        }
    }

    loginHandler = ( event ) => {
        event.preventDefault();
        this.props.onLogin( 
            this.state.controls.email.value, 
            this.state.controls.password.value
        );
    }

    render () {
        let form = (
            <form action="/auth/login" method="post">
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" name="email" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" />
                </div>

                <button type="submit" className="btn btn-warning btn-lg">Login</button>
            </form>
        )

        return(
            <Auxiliary>
                <div className={classes.Container}>
                    <div className="col-sm-6 col-sm-offset-3">
                        <h4><span className="fa fa-sign-in"></span> Login</h4>
                            {form}
                            <hr />
                        <p>Need an account? <a href="/signup">Signup</a></p>
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

    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Login);
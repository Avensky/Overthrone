import React, { Component } from 'react';
import {connect} from 'react-redux';
import classes from '../Pages.module.css';
import myClasses from './Auth.module.css';
import Auxiliary from '../../../hoc/Auxiliary';

class Auth extends Component {
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
        },
        authLogin: true
    }

    componentDidUpdate() {
        console.log("Auth Login: " + this.state.authLogin)
    }

    loginToggleHandler = () => {
        this.setState(prevState => {
            return {authLogin: true};
        });
    }

    registerToggleHandler = () => {
        this.setState(prevState => {
            return {authLogin: false};
        });
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
        let btnClasses = ['btn', myClasses.AuthBtn ].join(' ')
        let form = (
            <form action="/auth/login" method="post">
                <input 
                    type="email"
                    name="email"
                    onChange={(event) => this.inputChangedHandler( event, "email")}
                    placeholder="Email Address"
                    className={myClasses.AuthInput}
                />
                <input 
                    type="password"
                    name="password"
                    onChange={(event) => this.inputChangedHandler( event, "password")}
                    placeholder="Password"
                    className={myClasses.AuthInput}
                />
            
            <p className="text-right">Forgot Password?</p>
                    <button className={btnClasses}><span className="fa fa-user"></span> Sign In</button>
            </form>
        )    

        if (!this.state.authLogin){
            form = (
                <Auxiliary>
                    <form  action="/auth/signup" method="post">
                        <input 
                            type="email"
                            name="Email"
                            onChange={(event) => this.inputChangedHandler( event, "email")}
                            placeholder="Email Address"
                            className={myClasses.AuthInput}
                        />
                        <input 
                            type="Password"
                            name="Password"
                            onChange={(event) => this.inputChangedHandler( event, "password")}
                            placeholder="Password"
                            className={myClasses.AuthInput}
                        />
                        <input 
                            type="Password"
                            name="Confirm Password"
                            onChange={(event) => this.inputChangedHandler( event, "confirmPassword")}
                            placeholder="Confirm Password"
                            className={myClasses.AuthInput}
                        />
                        <button className={btnClasses}><span className="fa fa-user">       </span> Sign Up</button>
                    </form>
                </Auxiliary>
            )
        }

        let body = (
            <div className="container">
                <div className="page-header text-center">
                    <h1><span className="fa fa-lock"></span> Authentication</h1>
                </div>
            </div>
        )
        let selected, unselected = myClasses.AuthToggle;
        if  ( this.state.authLogin === false){
            selected = myClasses.AuthToggle
            unselected = [myClasses.AuthToggle, myClasses.AuthSelected].join(' ')
        }
        if  ( this.state.authLogin === true){
            selected = [myClasses.AuthToggle, myClasses.AuthSelected].join(' ')
            unselected = myClasses.AuthToggle

        }

        let auth = (
            <div className={classes.Auth}>
                
                <button 
                    onClick={this.loginToggleHandler}
                    className={selected}
                ><h2><i className="fa fa-sign-in"></i> Login</h2>
                </button>

                <button 
                    onClick={this.registerToggleHandler}
                    className={unselected}
                ><h2><i className="fa fa-user-plus"></i> Signup</h2>
                </button>               
                {form}
                <div className={classes.CardTitle}>Or continue with:</div>
                <a href="/auth/facebook"    className="btn btn-primary"><span className="fa fa-facebook">   </span> Facebook</a>
                <a href="/auth/twitter"     className="btn btn-info"   ><span className="fa fa-twitter">    </span> Twitter</a>
                <a href="/auth/google"      className="btn btn-danger" ><span className="fa fa-google-plus"></span> Google+</a>
            </div>
        )

        let assignedClasses = [classes.Card, myClasses.Auth].join(' ')
        return(
            <Auxiliary>
            {body}
            <div className={assignedClasses}>
            {auth}
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
    };
};

export default connect (mapStateToProps)(Auth);
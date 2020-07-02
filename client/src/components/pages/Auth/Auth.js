import React, { Component } from 'react';
import {connect} from 'react-redux';
import classes from '../Pages.module.scss';
import myClasses from './Auth.module.scss';
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
            
            <p className="text-left">Forgot Password?</p>
            
                <button className={[myClasses.Btn, myClasses.AuthBtn ].join(' ')}>
                    <div className={myClasses.BtnDiv}>
                        <span className="fa fa-user"></span> Sign In
                    </div>
                </button>
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
                        <button className={[myClasses.Btn, myClasses.AuthBtn ].join(' ')}>
                            <div className={myClasses.BtnDiv}>
                                <span className="fa fa-user"></span> Sign Up
                            </div>
                        </button>
                    </form>
                </Auxiliary>
            )
        }

        let selected, unselected = myClasses.AuthToggle;
        if  ( this.state.authLogin === false){
            selected = myClasses.AuthToggle
            unselected = [myClasses.AuthToggle, myClasses.AuthSelected].join(' ')
        }
        if  ( this.state.authLogin === true){
            selected = [myClasses.AuthToggle, myClasses.AuthSelected].join(' ')
            unselected = myClasses.AuthToggle

        }

        return(
            <Auxiliary>
                <div className='container'>
                    <div className={['page-header', 'text-center'].join(' ')}>
                        <a href='/shop' ><h2>Join the Team!</h2></a>
                    </div>
                </div>
                <div className={[classes.Card, myClasses.Auth].join(' ')}>
                    <div className={myClasses.AuthNav}>
                        <button 
                            onClick={this.loginToggleHandler}
                            className={selected}
                        ><h2><span className="fa fa-sign-in" /> Login</h2>
                        </button>

                        <button 
                            onClick={this.registerToggleHandler}
                            className={unselected}
                        ><h2><span className="fa fa-user" /> Signup</h2>
                        </button>   
                    </div>            
                    {form}
                    <div className={classes.CardTitle}>Or continue with:</div>
                    <button className={[myClasses.Btn, "btn-primary"].join(' ')}>
                        <a href="/auth/facebook"><span className="fa fa-facebook" /> Facebook</a>
                    </button>
                    <button className={[myClasses.Btn, "btn-info"].join(' ')}>
                        <a href="/auth/twitter"><span className="fa fa-twitter" /> Twitter</a>
                    </button>
                    <button className={[myClasses.Btn, "btn-danger"].join(' ')}>
                        <a href="/auth/google"><span className="fa fa-google-plus" /> Google+</a>
                    </button>
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
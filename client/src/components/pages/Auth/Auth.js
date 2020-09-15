import React, { Component } from 'react';
import { validate } from 'indicative/validator';
import { sanitize } from 'indicative/sanitizer'
import {connect} from 'react-redux';
import classes from '../Pages.module.scss';
import myClasses from './Auth.module.scss';
import Auxiliary from '../../../hoc/Auxiliary';
// import SimpleReactValidator from 'simple-react-validator';
import * as actions from '../../../store/actions/index';
import {updateObject, checkValidity} from '../../../utility/utility';
import Input from '../../UI/Input/Input';
import Spinner from '../../UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';


class Auth extends Component {
    state = {
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                name: 'email',
                placeholder: 'Email Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                name: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6,
            },
            valid: false,
            touched: false
        },
        confirmPassword: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder:"Confirm Password"
            },
            value: '',
            validation: {
                required: false,
                minLength: 6
            },
            valid: false,
            touched: false
            
        },
        authLogin: true
    }
//    state = {
//        controls: {
//            email: {
//                elementType: 'input',
//                elementConfig: {
//                    type: 'email',
//                    name: 'email',
//                    placeholder: 'Email Address'
//                },
//                value: '',
//                validation: {
//                    required: true,
//                    isEmail: true
//                },
//                valid: false,
//                touched: false
//            },
//            password: {
//                elementType: 'input',
//                elementConfig: {
//                    type: 'password',
//                    name: 'password',
//                    placeholder: 'Password'
//                },
//                value: '',
//                validation: {
//                    required: true,
//                    minLength: 6,
//                },
//                valid: false,
//                touched: false
//            },
//            confirmPassword: {
//                elementType: 'input',
//                elementConfig: {
//                    type: 'password',
//                    placeholder:"Confirm Password"
//                },
//                value: '',
//                validation: {
//                    required: false,
//                    minLength: 6
//                },
//                valid: false,
//                touched: false
//            }
//        },
//        authLogin: true
//    }
    
    componentDidMount () {
        if ( this.props.authRedirectPath !== '/' ) {
            this.props.onSetAuthRedirectPath();
        }
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
        const updatedControls = updateObject( this.state.controls, {
            [controlName]: updateObject( 
                this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            } )
        } );
        this.setState( { controls: updatedControls } );
    }

    inputChangeHandler = ( event ) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    submitHandler = ( event ) => {
        event.preventDefault();
        //this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, this.state.authLogin);
        console.log(this.state);
        
        //validating user using indicatice package
        //take the input data from state
        const data = this.state;
        const schema = {
            name: 'required|string',
            email: 'required|email',
            password: 'required|string|min:6|confirmed' //confirmed will check for the password confirmation
        }
        const messages = {
            required            : 'This {{ field }} is required.',
            'email.email'       : 'The email is invalid.',
            'password.min': 'Password is too short',
            'password.confirmed': 'The password does not match'
        }
        
        validate( data, schema, messages )
            .then(()=> {
            console.log('success')
            })
        //    .catch(console.error)
             .catch(errors => {
             console.log(errors);
             //show errors to user
             const formattedErrors = {}
             errors.forEach( error => formattedErrors[error.field] = error.message )
             this.setState({ errors: formattedErrors })
         })
    }

    render () {
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }
        // let form = formElementsArray.map( formElement => 
        //     <Input
        //         names={formElement.config.name}
        //         type={formElement.config.type}
        //         key={formElement.id}
        //         elementType={formElement.config.elementType}
        //         elementConfig={formElement.config.elementConfig}
        //         value={formElement.config.value}
        //         invalid={!formElement.config.valid}
        //         shouldValidate={formElement.config.validation}
        //         touched={formElement.config.touched}
        //         placeholder={formElement.config.placeholder}
        //         className={myClasses.AuthInput}
        //         changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        // )

        
        let form = (
            <Auxiliary>
                <input 
                    type="text"
                    name="email"    
                    onChange={(event) => this.inputChangeHandler( event, "email")}
                    placeholder="Email Address"
                    className={myClasses.AuthInput}
                />
                <input 
                    type="password"
                    name="password"
                    onChange={(event) => this.inputChangeHandler( event, "password")}
                    placeholder="Password"
                    className={myClasses.AuthInput}
                />
            </Auxiliary>
        )
        if(!this.state.authLogin) form = (
            <Auxiliary>
                <div className="form-group">
                    <input 
                        type="text"
                        name="email"    
                        onChange={(event) => this.inputChangeHandler( event, "email")}
                        placeholder="Email Address"
                        //className={["form-control", myClasses.AuthInput].join(' ')}
                        className="form-control"
                    />                    
                </div>
                <div className="form-group">
                    <input 
                        type="password"
                        name="password"
                        onChange={(event) => this.inputChangeHandler( event, "password")}
                        placeholder="Password"
                        //className={["form-control", myClasses.AuthInput].join(' ')}
                        className="form-control"
                    />                    
                </div>
                <div className="form-group">
                    <input 
                        type="password"
                        name="password_confirmation"
                        onChange={(event) => this.inputChangeHandler( event, "password")}
                        placeholder="Confirm Password"
                        //className={["form-control", myClasses.AuthInput].join(' ')}
                        className="form-control"
                    />                    
                </div>
            </Auxiliary>
        )

        if ( this.props.loading ) {
            form = <Spinner />
        }

        let errorMessage = null;

        if ( this.props.error ) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if ( this.props.isAuthenticated ) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
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
        
        let act = 'login';
        if (! this.state.authLogin) {
            act = 'signup'
        }
        return(
            <Auxiliary>
                <div className='container'>
                    <div className={['page-header', 'text-center'].join(' ')}>
                        <a href='/shop' ><h2>Join the Team!</h2></a>
                    </div>
                </div>
                <div className={[classes.Card, myClasses.Auth].join(' ')}>
                {authRedirect}
                {errorMessage}
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
                    
                <form 
                    className="form-type-material"
                    action={"/auth/" + act} 
                    method="post"
                        onSubmit={this.submitHandler}
                    >                    
                        {form}
                        <p className="text-left">Forgot Password?</p>
            
                    <button 
                        onClick={this.loginHandler} 
                        className={[myClasses.Btn, myClasses.AuthBtn, 'auth-btn' ].join(' ')}
                        type="submit"
                    >
                        <div className={myClasses.BtnDiv}>
                            <span className={[this.state.authLogin ? 'fa fa-sign-in' : 'fa fa-user'].join(' ')}></span> {this.state.authLogin ? 'Sign In' : 'Sign Up'}
                        </div>
                    </button>
                    </form>
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
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, authLogin) => dispatch(actions.auth(email, password, authLogin)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
        onNewUser: (username, givenName, familyName, email, password, picture) => dispatch(actions.signup(username, givenName, familyName, email, password, picture))
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Auth);
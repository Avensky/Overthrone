import React, { Component } from 'react';
//import { useForm } from "react-hook-form";
import {connect} from 'react-redux';
import classes from '../Pages.module.scss';
import myClasses from './Auth.module.scss';
import Auxiliary from '../../../hoc/Auxiliary';
import * as actions from '../../../store/actions/index';
import {updateObject, checkValidity} from '../../../utility/utility';
//import Input from '../../UI/Input/Input';
import Spinner from '../../UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

import { Formik, Form, Field, ErrorMessage } from 'formik';


class Auth extends Component {
    state = {
        controls: {
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
            }
        },
        authLogin: true,
    }
    
    componentDidMount () {
        if ( this.props.authRedirectPath !== '/' ) {
            this.props.onSetAuthRedirectPath();
        }
    }
    componentDidUpdate() {
        console.log("Auth Login: " + this.state.authLogin)
        //console.log("errors", this.state.myErrors)
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
        console.log(this.state);
        this.props.onAuth( this.state.email.value, this.state.password.value, this.state.authLogin);
    }


    render () {
        // const formElementsArray = [];
        // for ( let key in this.state.controls ) {
        //     formElementsArray.push( {
        //         id: key,
        //         config: this.state.controls[key]
        //     } );
        // }
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
        
        //const { register, handleSubmit, watch, errors } = useForm();
        //const onSubmit = data => console.log(data);

        // let error = this.state.myErrors
        let act = 'login';
        if (! this.state.authLogin) {
            act = 'signup'
        }
        let formik =(
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                        errors.email = 'Required';
                        } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                        errors.email = 'Invalid email address';
                        }
                        return errors;
                    }}
                    //action={"/auth/" + act} 
                    //method="post"
                    onSubmit={ ( values, { setSubmitting }) => {
                        setTimeout(() => {
                            console.log(this.state);
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                        this.props.onAuth(values.email, values.password, this.state.authLogin)
                    }}
                    >
                    {({ isSubmitting }) => (

                        <Form 
                            onSubmit={formik.handleSubmit}
                        >
                            <Field 
                                type="email" 
                                name="email" 
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.email}
                                placeholder="Email Address"
                                className={myClasses.AuthInput}
                            />
                            <ErrorMessage name="email" component="div" />
                            <Field 
                                type="password" 
                                name="password" 
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.password}
                                placeholder="Password"
                                className={myClasses.AuthInput}
                            />
                            <ErrorMessage name="password" component="div" />
                            <button  
                                //onClick={this.loginHandler} 
                                className={[myClasses.Btn, myClasses.AuthBtn, 'auth-btn' ].join(' ')}
                                type="submit"
                                disabled={isSubmitting}
                            >
                                <div className={myClasses.BtnDiv}>
                                    <span className={[this.state.authLogin ? 'fa fa-sign-in' : 'fa fa-user'].join(' ')}></span> {this.state.authLogin ? 'Sign In' : 'Sign Up'}
                                </div>
                            </button>
                        </Form>
                    )}
                </Formik>)
        // let form = (
        //     <Auxiliary>
        //         <input 
        //             type="text"
        //             name="email"    
        //             onChange={(event) => this.inputChangeHandler( event, "email"
        //             )}
        //             placeholder="Email Address"
        //             className={myClasses.AuthInput}
        //             //ref={register({ required: true })}
        //         />
        //         {/*errors.email && <span>This field is required</span>*/}
        //         <input 
        //             type="password"
        //             name="password"
        //             onChange={(event) => this.inputChangeHandler( event, "password"
        //             )}
        //             placeholder="Password"
        //             className={myClasses.AuthInput}
        //             //ref= m{register({ required: true })}
        //         />
        //         {/*errors.password && <span>This field is required</span>*/}  
        //         <div className={myClasses.AuthInput2}>
        //             <p className="text-left">Forgot Password?</p>
        //         </div>
        //     </Auxiliary>
        // )
        
        //if(!this.state.authLogin) form = (
        //    <Auxiliary>
        //        <input 
        //            type="text"
        //            name="email"    
        //            onChange={(event) => this.inputChangeHandler( event, "email")}
        //            placeholder="Email Address"
        //            className={myClasses.AuthInput}
        //            //className="form-control"
        //            //ref={register({ required: true })}
        //        />
        //        {/*errors.email && <span>This field is required</span>*/}              
//
        //        <input 
        //            type="password"
        //            name="password"
        //            onChange={(event) => this.inputChangeHandler( event, "password")}
        //            placeholder="Password"
        //            className={myClasses.AuthInput}
        //            //className="form-control"
        //            //ref={register({ required: true })}
        //        />  
        //        {/*errors.password && <span>This field is required</span>*/}                
//
        //        <input 
        //            type="password"
        //            name="password_confirmation"
        //            onChange={(event) => this.inputChangeHandler( event, "password")}
        //            placeholder="Confirm Password"
        //            className={myClasses.AuthInput}
        //            //className="form-control"
        //            //ref={register({ required: true })}
        //        />   
        //        {/*errors.password_confirmation && <span>This field is required</span*/}             
        //    </Auxiliary>
        //)

        if ( this.props.loading ) {
            //form = <Spinner />
            formik = <Spinner />

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
                    
                    {formik}

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
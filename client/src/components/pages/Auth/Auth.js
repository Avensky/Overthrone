import React, { useState, useEffect } from 'react';
// import { useForm } from "react-hook-form";
import {connect} from 'react-redux';
import classes from '../Pages.module.scss';
import myClasses from './Auth.module.scss';
import Auxiliary from '../../../hoc/Auxiliary';
import * as actions from '../../../store/actions/index';
import {updateObject, checkValidity} from '../../../utility/utility';
// import Input from '../../UI/Input/Input';
import Spinner from '../../UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

import { Formik, Form, Field, ErrorMessage } from 'formik';


const Auth = props => {
    const [authForm, setAuthForm] = useState({
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
    })

    const [authLogin, setAuthLogin] = useState(true)

    const { authRedirectPath, onSetAuthRedirectPath } = props;

    useEffect(() => {
        if ( props.authRedirectPath !== '/' ) {
            onSetAuthRedirectPath();
        }
    }, [authRedirectPath, onSetAuthRedirectPath])

    const loginToggleHandler = () => {
        setAuthLogin(true)
    }

    const registerToggleHandler = () => {
        setAuthLogin(false)
    }

    //const inputChangeHandler = ( event ) => {
    //    setAuthForm({
    //        [event.target.name]: event.target.value
    //    })
    //}
    //
      
    const inputChangedHandler = ( event, controlName ) => {	
        const updatedControls = updateObject( authForm, {	
            [controlName]: updateObject( 	
                authForm[controlName], {	
                value: event.target.value,	
                valid: checkValidity( 
                    event.target.value, 
                    authForm[controlName].validation ),	
                touched: true	
            } )	
        } );	
        setAuthForm( updatedControls );	
    }

    const submitHandler = ( values, event ) => {
        event.preventDefault();
        // console.log(state);
       // props.onLogin( authForm.email.value, authForm.password.value, authLogin)
         props.onAuth( values.email, values.password, authLogin)
        // props.onAuth( values, state.authLogin)
    }

        let act = 'login';
        if (!authLogin) {
            act = 'signup'
        }
        let formik =(
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';} 
        
                        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email = 'Invalid email address'}
        
                        return errors;}}
        
                    onSubmit={ async ( values, { setSubmitting }) => {
                        //props.onAuth( values.email, values.password, state.authLogin);
                        //submitHandler(values)
                        props.onAuth( values, authLogin)
                        setTimeout(() => {
                            //console.log('values= ' + values.email);
                            alert(JSON.stringify(values, null, 2));
                            // props.onAuth( values, state.authLogin)
                            setSubmitting(false);
                        }, 400);
                    }}
                    
                    >
                    {({ isSubmitting }) => (
        
                        <Form 
                            // onSubmit={formik.handleSubmit}
                            // action={"/auth/" + act} 
                            // method="post"
                        >
                            <Field 
                                type="email" 
                                name="email" 
                                placeholder="Email Address"
                                className={myClasses.AuthInput}
                            />
                            <ErrorMessage name="email" component="div" />
                            <Field 
                                type="password" 
                                name="password" 
                                placeholder="Password"
                                className={myClasses.AuthInput}
                            />
                            <ErrorMessage name="password" component="div" />
                            <button  
                                //onClick={loginHandler} 
                                className={[myClasses.Btn, myClasses.AuthBtn, 'auth-btn' ].join(' ')}
                                type="submit"
                                disabled={isSubmitting}
                            >
                                <div className={myClasses.BtnDiv}>
                                    <span className={[authLogin ? 'fa fa-sign-in' : 'fa fa-user'].join(' ')}></span> {authLogin ? 'Sign In' : 'Sign Up'}
                                </div>
                            </button>
                        </Form>
                    )}
                </Formik>)

         let form = (
             <Auxiliary>
                 <form 
                    //method='post' 
                    // action={"/auth/" + act} 
                    
                    onSubmit={submitHandler}
                >
                    <input 
                        type="text"
                        name="email"    
                        onChange={event => inputChangedHandler( event, "email")}
                        placeholder="Email Address"
                        className={myClasses.AuthInput}
                        //ref={register({ required: true })}
                    />
                    {/*errors.email && <span>This field is required</span>*/}
                    <input 
                        type="password"
                        name="password"
                        onChange={(event) => inputChangedHandler( event, "password")}
                        placeholder="Password"
                        className={myClasses.AuthInput}
                        //ref= m{register({ required: true })}
                    />
                    {/*errors.password && <span>This field is required</span>*/}  
                    <div className={myClasses.AuthInput2}>
                        <p className="text-left">Forgot Password?</p>
                    </div>

                    <button  
                        className={[myClasses.Btn, myClasses.AuthBtn, 'auth-btn' ].join(' ')}
                        type="submit">
                        <div className={myClasses.BtnDiv}>
                            <span className={[authLogin ? 'fa fa-sign-in' : 'fa fa-user'].join(' ')}></span> {authLogin ? 'Sign In' : 'Sign Up'}
                        </div>
                    </button>

                 </form>
             </Auxiliary>
         )


        if(!authLogin) form = (
            <Auxiliary>
                <form 
                    // method='post' action={"/auth/" + act}
                    onSubmit={submitHandler}
                >
                    <input 
                        type="text"
                        name="email"    
                        onChange={event => inputChangedHandler( event, "email")}
                        placeholder="Email Address"
                        className={myClasses.AuthInput}
                        //className="form-control"
                        //ref={register({ required: true })}
                    />
                    {/*errors.email && <span>This field is required</span>*/}              

                    <input 
                        type="password"
                        name="password"
                        onChange={event => inputChangedHandler( event, "password")}
                        placeholder="Password"
                        className={myClasses.AuthInput}
                        //className="form-control"
                        //ref={register({ required: true })}
                    />  
                    {/*errors.password && <span>This field is required</span>*/}                

                    <input 
                        type="password"
                        name="password_confirmation"
                        onChange={event => inputChangedHandler( event, "password")}
                        placeholder="Confirm Password"
                        className={myClasses.AuthInput}
                        //className="form-control"
                        //ref={register({ required: true })}
                    />   
                    {/*errors.password_confirmation && <span>This field is required</span*/}

                    <button  
                        className={[myClasses.Btn, myClasses.AuthBtn, 'auth-btn' ].join(' ')}
                        type="submit">
                        <div className={myClasses.BtnDiv}>
                            <span className={[authLogin ? 'fa fa-sign-in' : 'fa fa-user'].join(' ')}></span> {authLogin ? 'Sign In' : 'Sign Up'}
                        </div>
                    </button>  

                </form>     
            </Auxiliary>
        )

        if ( props.loading ) {
            //form = <Spinner />
            formik = <Spinner />

        }

        let errorMessage = null;

        if ( props.error ) {
            errorMessage = (
                <p>{props.error.message}</p>
            );
        }

        let authRedirect = null;
        if ( props.isAuthenticated ) {
            authRedirect = <Redirect to={props.authRedirectPath} />
        }

        let selected, unselected = myClasses.AuthToggle;
        if  ( authLogin === false){
            selected = myClasses.AuthToggle
            unselected = [myClasses.AuthToggle, myClasses.AuthSelected].join(' ')
        }
        if  ( authLogin === true){
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
                            onClick={loginToggleHandler}
                            className={selected}
                        ><h2><span className="fa fa-sign-in" /> Login</h2>
                        </button>

                        <button 
                            onClick={registerToggleHandler}
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
        onAuth: (values, authLogin) => dispatch(actions.auth(values, authLogin)),
        onLogin: (email, password, authLogin) => dispatch(actions.login(email, password, authLogin)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
        onNewUser: (username, givenName, familyName, email, password, picture) => dispatch(actions.signup(username, givenName, familyName, email, password, picture))
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Auth);
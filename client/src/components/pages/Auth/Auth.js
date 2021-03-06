import React, { useState, useEffect } from 'react';
// import { useForm } from "react-hook-form";
import {connect} from 'react-redux';
import classes from '../Pages.module.scss';
import myClasses from './Auth.module.scss';
import Auxiliary from '../../../hoc/Auxiliary';
import * as actions from '../../../store/actions/index';
// import {updateObject, checkValidity} from '../../../utility/utility';
// import Input from '../../UI/Input/Input';
import Spinner from '../../UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
//import { Persist } from 'formik-persist'
import * as Yup from 'yup'

const Auth = props => {
    //const { authRedirectPath, onSetAuthRedirectPath, submitted, isAuthenticated, isLoggedIn } = props
    const [auth, setAuth] = useState('login')
    console.log('auth',auth)
    const [token, setToken] = useState(props.match.params.token)
    console.log('token',token)
    // const [socialLogin, setSocialLogin] = useState(false)

    //const socialAuthHandler = () => {
    //    setSocialLogin(true)
    //    props.onFbAuth()
    //}


    useEffect(() => {
        if (props.match.params.token){
            setAuth('reset-password')
        } else {
            setAuth('login')
        }
    },[props.match.params])
// 
    // const getProfile = () => {
    //     //const { handle, postId } = props.match.params; // <-- component props object!!
    //     console.log('props', props)
    // }

    const loginToggleHandler    = () => {setAuth('login')}
    const registerToggleHandler = () => {setAuth('register')}
    const forgotPasswordHandler = () => {setAuth('forgot-password')}
    const resetPasswordHandler  = () => {setAuth('reset-password')}

    const submitHandler = ( values, submitProps ) => {
        //console.log('Form data', values)
        //console.log('submitProps', submitProps)
        props.onAuth( values, auth, token)
        submitProps.setSubmitting(false)
        submitProps.resetForm()
    }

    useEffect(()=> {
        const fetchData = async () => {props.onFetchUser()}
          if ( !props.fetchedUser){fetchData()}
        }, [props.fetchedUser, props.authRedirectPath])

    // let act = 'login';
    // if (!auth) {
    //     act = 'signup'
    // }
    // const [formValues, setFormValues] = useState(null)

    let initialValues, validationSchema, selected, unselected, form, button, authSelector, socialAuth

    switch (auth) {
        case 'login': 
            initialValues = {
                email: '', 
                password: ''
            };
            validationSchema = Yup.object({
                email: Yup.string()
                    .email("Invalid email format")
                    .required("Required!"),
                password: Yup.string()
                    .min(8, "Minimum 8 characters")
                    .max(15, "Maximum 15 characters")
                    .required("Required!")
            });

            selected = [myClasses.AuthToggle, myClasses.AuthSelected].join(' ')
            unselected = myClasses.AuthToggle
            authSelector = <div className={myClasses.AuthNav}>
                <button 
                    onClick={loginToggleHandler}
                    className={selected}
                ><h1><span className="fa fa-sign-in" /> Login</h1>
                </button>

                <button 
                    onClick={registerToggleHandler}
                    className={unselected}
                ><h1><span className="fa fa-user" /> Signup</h1>
                </button>   
            </div>
            form = (
                <Auxiliary>
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
                    <a onClick={forgotPasswordHandler} className='text-right pointer'>Forgot Password?</a>                    
                </Auxiliary>
            );
            button = <div className={myClasses.BtnDiv}><span className={['fa fa-sign-in'].join(' ')}></span>Sign In</div>
            socialAuth = <Auxiliary>
                <div className={classes.CardTitle}>Or continue with:</div>
                <button type='submit' className={[myClasses.Btn, "btn-primary"].join(' ')}>
                    <a  
                        href="/auth/facebook"
                        //onClick={socialAuthHandler}
                    ><div className={myClasses.BtnDiv}><span className="fa fa-facebook" /> Facebook</div></a>
                </button>
                <button className={[myClasses.Btn, "btn-info"].join(' ')}>
                    <a href="/auth/twitter"><div className={myClasses.BtnDiv}><span className="fa fa-twitter" /> Twitter</div></a>
                </button>
                <button className={[myClasses.Btn, "btn-danger"].join(' ')}>
                    <a href="/auth/google"><div className={myClasses.BtnDiv}><span className="fa fa-google-plus" /> Google+</div></a>
                </button>
            </Auxiliary>
            break
        case 'register': 
            initialValues = {
                email: '', 
                password: '',
                confirm_password: ''
            };
            validationSchema = Yup.object({
                email: Yup.string()
                    .email("Invalid email format")
                    .required("Required!"),
                password: Yup.string()
                    .min(8, "Minimum 8 characters")
                    .max(15, "Maximum 15 characters")
                    .required("Password is required!")  
                    .matches(
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                    ),                       
                confirm_password: Yup.string()
                    .oneOf([Yup.ref("password")], "Passwords  must match")
                    .required("Password confirm is required!")
            });
            selected = myClasses.AuthToggle
            unselected = [myClasses.AuthToggle, myClasses.AuthSelected].join(' ')
            authSelector = <div className={myClasses.AuthNav}>
                <button 
                    onClick={loginToggleHandler}
                    className={selected}
                ><h1><span className="fa fa-sign-in" /> Login</h1>
                </button>

                <button 
                    onClick={registerToggleHandler}
                    className={unselected}
                ><h1><span className="fa fa-user" /> Signup</h1>
                </button>   
            </div>
            form = <Auxiliary>
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
                <Field 
                    type="password" 
                    name="confirm_password" 
                    placeholder="Confirm Password"
                    className={myClasses.AuthInput}
                />
                <ErrorMessage name="confirm_password" component="div" />
            </Auxiliary>
            button = <div className={myClasses.BtnDiv}><span className={['fa fa-user'].join(' ')}></span>Sign Up</div>
            break
        case 'forgot-password': 
            initialValues = {
                email: ''
            };
            validationSchema = Yup.object({
                email: Yup.string()
                    .email("Invalid email format")
                    .required("Required!")
            });
            selected = [myClasses.AuthToggle].join(' ')
            unselected = myClasses.AuthToggle
            authSelector = <h2>Enter an email address to reset password.</h2>
            form = <Auxiliary>
                <Field 
                    type="email" 
                    name="email" 
                    placeholder="Email Address"
                    className={myClasses.AuthInput}
                />
                <ErrorMessage name="email" component="div" />
            </Auxiliary>
            button = <div className={myClasses.BtnDiv}><span className={['fa fa-user'].join(' ')}></span>Forgot Password</div>
            break
        case 'reset-password': 
            initialValues = {
                password: '',
                confirm_password: ''
            };
            validationSchema = Yup.object({
                password: Yup.string()
                    .min(8, "Minimum 8 characters")
                    .max(15, "Maximum 15 characters")
                    .required("Password is required!")  
                    .matches(
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                    ),                       
                confirm_password: Yup.string()
                    .oneOf([Yup.ref("password")], "Passwords  must match")
                    .required("Password confirm is required!")
            });
            selected = myClasses.AuthToggle
            unselected = myClasses.AuthToggle
            authSelector = <Auxiliary>
                <h2>Create a new password!</h2>
            </Auxiliary>
            form = <Auxiliary>
                <Field 
                    type="password" 
                    name="password" 
                    placeholder="Password"
                    className={myClasses.AuthInput}
                />
                <ErrorMessage name="password" component="div" />
                <Field 
                    type="password" 
                    name="confirm_password" 
                    placeholder="Confirm Password"
                    className={myClasses.AuthInput}
                />
                <ErrorMessage name="confirm_password" component="div" />
            </Auxiliary>
            button = <div className={myClasses.BtnDiv}><span className={['fa fa-user'].join(' ')}></span>Reset Password</div>    
            break
    }

    let loader
    if ( props.loading || (props.submitted && props.userLoading)) {
        //form = <Spinner />
        loader = <Spinner />

    }

    // let errorMessage = null;
// 
    // if ( props.error ) {
    //     errorMessage = (
    //         <p>{props.error.message}</p>
    //     );
    // }
    
    let message = false;
    if ( props.token ) {
        message = <p>{props.token.message}</p>
    }

    let authRedirect = null;
    if ( props.isAuthenticated ) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return(
       <div className={[classes.Card, myClasses.Auth].join(' ')}>
            {authRedirect}
            {authSelector}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submitHandler}
                enableReinitialize> 
                { formik => 
                <Form>
                    {message}
                    {form}
                    <button  
                        className={[myClasses.Btn, myClasses.AuthBtn, 'auth-btn' ].join(' ')}
                        type='submit'
                        disabled={!formik.isValid || formik.isSubmitting }
                    >
                        {button}
                    </button>
                </Form>}
            </Formik>
            {socialAuth}
        </div> 
    )
    
}

const mapStateToProps = state => {
    return {
        loading             : state.auth.loading,
        userLoading         : state.auth.userLoading,
        submitted           : state.auth.submitted,
        error               : state.auth.error,
        isLoggedIn          : state.auth.user,
        isAuthenticated     : state.auth.payload,
        authRedirectPath    : state.auth.authRedirectPath,
        token               : state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchUser             : ()                    => dispatch(actions.fetchUser()),
        onAuth                  : (values, auth, token) => dispatch(actions.auth(values, auth, token)),
        onFbAuth                : ()                    => dispatch(actions.fbAuth()),
        onSetAuthRedirectPath   : ()                    => dispatch(actions.setAuthRedirectPath('/profile')),
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Auth);
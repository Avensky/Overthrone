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
    const [authLogin, setAuthLogin] = useState(true)
    // const [socialLogin, setSocialLogin] = useState(false)

    //const socialAuthHandler = () => {
    //    setSocialLogin(true)
    //    props.onFbAuth()
    //}

    const loginToggleHandler = () => {setAuthLogin(true)}

    const registerToggleHandler = () => {setAuthLogin(false)}

    const submitHandler = ( values, submitProps ) => {
        //console.log('Form data', values)
        //console.log('submitProps', submitProps)
        props.onAuth( values, authLogin)
        submitProps.setSubmitting(false)
        submitProps.resetForm()
    }

    useEffect(()=> {
        const fetchData = async () => {props.onFetchUser()}
          if ( !props.fetchedUser){fetchData()}
        }, [props.fetchedUser, props.authRedirectPath])

    // let act = 'login';
    // if (!authLogin) {
    //     act = 'signup'
    // }
    // const [formValues, setFormValues] = useState(null)

    const initialValues = {
        email: '', 
        password: '',
        confirm_password: '',
    }
    let validationSchema
    if (authLogin === true) {    
        validationSchema = Yup.object({
            email: Yup.string()
                .email("Invalid email format")
                .required("Required!"),
            password: Yup.string()
                .min(8, "Minimum 8 characters")
                .max(15, "Maximum 15 characters")
                .required("Required!")
        })
    } else {
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
        })
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

    let selected, unselected = myClasses.AuthToggle;
    if  ( authLogin === false){
        selected = myClasses.AuthToggle
        unselected = [myClasses.AuthToggle, myClasses.AuthSelected].join(' ')
    }
    if  ( authLogin === true){
        selected = [myClasses.AuthToggle, myClasses.AuthSelected].join(' ')
        unselected = myClasses.AuthToggle

    }

    let form 
    if (authLogin === true) {    
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
            </Auxiliary>
        )
    } else {
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
                <Field 
                    type="password" 
                    name="confirm_password" 
                    placeholder="Confirm Password"
                    className={myClasses.AuthInput}
                />
                <ErrorMessage name="confirm_password" component="div" />
            </Auxiliary>
        )
    }
    
    return(
       <div className={[classes.Card, myClasses.Auth].join(' ')}>
            {authRedirect}
            <div className={myClasses.AuthNav}>
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
                        <div className={myClasses.BtnDiv}>
                            <span className={[authLogin ? 'fa fa-sign-in' : 'fa fa-user'].join(' ')}></span> {authLogin ? 'Sign In' : 'Sign Up'}
                        </div>
                    </button>
                </Form>}
            </Formik>
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
        onAuth                  : (values, authLogin)   => dispatch(actions.auth(values, authLogin)),
        onFbAuth                : ()                    => dispatch(actions.fbAuth()),
        onSetAuthRedirectPath   : ()                    => dispatch(actions.setAuthRedirectPath('/profile')),
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Auth);
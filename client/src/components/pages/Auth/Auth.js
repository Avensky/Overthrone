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
import * as Yup from 'yup'

const Auth = props => {
    //const { authRedirectPath, onSetAuthRedirectPath, submitted, isAuthenticated, isLoggedIn } = props
    const [authLogin, setAuthLogin] = useState(true)

    // useEffect(()=> {
    //     if (!isLoggedIn){
    //         props.onFetchUser();
    //     }

    //     if ( authRedirectPath !== '/profile' ) {
    //         onSetAuthRedirectPath()
    //     }
    // }, [authRedirectPath, onSetAuthRedirectPath, submitted])



    const loginToggleHandler = () => {
        setAuthLogin(true)
    }

    const registerToggleHandler = () => {
        setAuthLogin(false)
    }

    const submitHandler = ( values, submitProps ) => {
        console.log('Form data', values)
        console.log('submitProps', submitProps)
        props.onAuth( values, authLogin)
        submitProps.setSubmitting(false)
        submitProps.resetForm()
    }

    let act = 'login';
    if (!authLogin) {
        act = 'signup'
    }
    // const [formValues, setFormValues] = useState(null)

    const initialValues = {
        email: '', 
        password: ''
    }
    const validationSchema = Yup.object({
        email: Yup.string().required('Required')
      })
    
    let loader = null;

    if ( props.loading || (props.submitted && props.userLoading) ) {
        //form = <Spinner />
        loader = <Spinner />

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
                {loader}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={submitHandler}
                    enableReinitialize
                >   
                    {formik => {
                        console.log('Formik props', formik)
                        return (
                            <Form>
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
                                    className={[myClasses.Btn, myClasses.AuthBtn, 'auth-btn' ].join(' ')}
                                    type='submit'
                                    disabled={!formik.isValid || formik.isSubmitting}
                                >
                                    <div className={myClasses.BtnDiv}>
                                        <span className={[authLogin ? 'fa fa-sign-in' : 'fa fa-user'].join(' ')}></span> {authLogin ? 'Sign In' : 'Sign Up'}
                                    </div>
                                </button>
                            </Form>
                        )}
                    }
                </Formik>

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
        userLoading: state.auth.userLoading,
        submitted: state.auth.submitted,
        error: state.auth.error,
        isLoggedIn: state.auth.user,
        isAuthenticated: state.auth.payload,
        authRedirectPath: state.auth.authRedirectPath
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchUser             : ()                    => dispatch(actions.fetchUser()),
        onAuth                  : (values, authLogin)   => dispatch(actions.auth(values, authLogin)),
        onSetAuthRedirectPath   : ()                    => dispatch(actions.setAuthRedirectPath('/profile')),
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Auth);
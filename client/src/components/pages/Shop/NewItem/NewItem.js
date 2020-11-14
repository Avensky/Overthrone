import React, { useEffect } from 'react';
//  import {Redirect} from 'react-router-dom';
// import Layout from '../../Layout/Layout';
// import Header from '../../Layout/Header/Header';
// import Auxiliary from '../../../../hoc/Auxiliary'
import classes from '../../Pages.module.scss';
import myClasses from './NewItem.module.scss'
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/index';
// import axios from '../../../axios';

import Spinner from '../../../UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Persist } from 'formik-persist'
import * as Yup from 'yup'

const NewItem = props => {

    const submitHandler = ( values, submitProps ) => {
        console.log('Form data', values)
        console.log('submitProps', submitProps)
        props.onNewItem( values)
        submitProps.setSubmitting(false)
        submitProps.resetForm()
    }

    const initialValues = {
        name: '',
        desc: '',
        price: '', 
        image: '',
        quantity: ''
    }
    const validationSchema = Yup.object({
        email: Yup.string().required('Required')
      })
    
    let loader = null;

    if ( props.loading || (props.submitted && props.userLoading && !props.token.message)) {
        //form = <Spinner />
        loader = <Spinner />

    }
    
    let flash = false;
    if ( props.token ) {
        flash = <p>{props.token.message}</p>
    }

    let authRedirect = null;
    if ( props.isAuthenticated ) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    let errorMessage = null;
    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        );
    }
        
    useEffect(() => {
        console.log(props);
    }, [])

    return (
        <div className={myClasses.NewItem}>
            {errorMessage}
            {loader}
                {flash}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={submitHandler}
                    enableReinitialize
                    render = { formik => 
                    <Form>
                        <Field 
                            type="text" 
                            name="name" 
                            placeholder="name"
                            className={myClasses.AuthInput}
                        />
                        <ErrorMessage name="name" component="div" />
                        <Field 
                            type="text" 
                            name="desc" 
                            placeholder="desc"
                            className={myClasses.AuthInput}
                        />
                        <ErrorMessage name="desc" component="div" />
                        <Field 
                            type="text" 
                            name="price" 
                            placeholder="price"
                            className={myClasses.AuthInput}
                        />
                        <ErrorMessage name="price" component="div" />
                        <Field 
                            type="image" 
                            name="image" 
                            placeholder="image"
                            className={myClasses.AuthInput}
                        />
                        <ErrorMessage name="image" component="div" />
                        <Field 
                            type="text" 
                            name="quantity" 
                            placeholder="quantity"
                            className={myClasses.AuthInput}
                        />
                        <ErrorMessage name="quantity" component="div" />
                        <button  
                            className={[myClasses.Btn, myClasses.AuthBtn, 'auth-btn' ].join(' ')}
                            type='submit'
                            disabled={!formik.isValid || formik.isSubmitting }
                        >
                            <div className={myClasses.BtnDiv}>Add new item</div>
                        </button>
                        <Persist name="item-form" />
                    </Form>}
                />
                
        </div>     
    );
}


const mapStateToProps = state => {
    return {
        error       : state.char.error,
        isLoggedIn  : state.auth.payload !== null,
        payload     : state.auth.payload,
        userId      : state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onNewItem: (values) => dispatch(actions.newItem(values)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewItem);
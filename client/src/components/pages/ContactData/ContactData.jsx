import React, { useState } from 'react';
import myClasses from './ContactData.module.scss';
import classes from '../Pages.module.scss';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import Auxiliary from '../../../hoc/Auxiliary';
import * as actions from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Persist } from 'formik-persist'
import * as Yup from 'yup'
import Recipe from './Recipe/Recipe'


const ContactData = props => {
    const reducer = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue.quantity * currentValue.price);

    let total
    let array = props.items
    if ( array != ''){
        total = array.reduce(reducer, 0)
        console.log("total = " + array.reduce(reducer, 0))
    }

    const submitHandler = ( values, submitProps ) => {
        console.log('Form data', values)
        console.log('submitProps', submitProps)
        props.onContactData( values)
        submitProps.setSubmitting(false)
        submitProps.resetForm()
    }

    const initialValues = {
        name: '', 
        street: '',
        zipCode: '',
        country: '',
        email: '',
        deliveryMethod: 'normal'
    }
    const validationSchema = Yup.object({
        email: Yup.string().required('Required')
    })

    return (
        <Auxiliary>
            <div className={[classes.Card, myClasses.ContactData].join(' ')}>
            <div className="container">
                <div className="page-header text-center">
                    <h1>Enter Delivery Info</h1>
                </div>
            </div>
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
                            placeholder="Full Name"
                            className={myClasses.ContactDataInput}
                        />
                        <Field 
                            type="text" 
                            name="street" 
                            placeholder="Street Address"
                            className={myClasses.ContactDataInput}
                        />
                        <Field 
                            type="text" 
                            name="zipCode" 
                            placeholder="Zip Code"
                            className={myClasses.ContactDataInput}
                        />
                        <Field 
                            type="email" 
                            name="email" 
                            placeholder="Email Address"
                            className={myClasses.ContactDataInput}
                        />
                        <Field 
                            type="text" 
                            name="country" 
                            placeholder="Country"
                            className={myClasses.ContactDataInput}
                        />
                        <ErrorMessage name="email" component="div" />
                        <Field 
                            //defaultChecked="normal"
                            type="radio" 
                            name="DeliveryMethod" 
                            value="normal" 
                            className={myClasses.ContactDataRadio}
                        /><label htmlFor="radioOne">normal</label>
                        <Field 
                            type="radio" 
                            name="DeliveryMethod" 
                            value="fastest" 
                            className={myClasses.ContactDataRadio}
                        /><label htmlFor="radioTwo" >fastest</label>
                        <ErrorMessage name="password" component="div" />
                        
                        <button  
                            className={[myClasses.Btn, myClasses.ContactDataBtn, 'auth-btn' ].join(' ')}
                            type='submit'
                            disabled={!formik.isValid || formik.isSubmitting }
                        >
                            <div className={myClasses.BtnDiv}>
                               <h3>Continue to Payment</h3>
                            </div>
                        </button>
                        <Recipe items={array} total={total}/>
                        <Persist name="auth-form" />
                    </Form>}
                />
            </div>
        </Auxiliary>
    )
    
}

const mapStateToProps = state => {
    return {
        items: state.cart.addedItems,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
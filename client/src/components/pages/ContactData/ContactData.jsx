import React, { useState } from 'react';
import myClasses from './ContactData.module.scss';
import classes from '../Pages.module.scss';
//import Spinner from '../../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import Auxiliary from '../../../hoc/Auxiliary';
import * as actions from '../../../store/actions/index';
//import { Redirect } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Persist } from 'formik-persist'
import * as Yup from 'yup'
//import Recipe from './Recipe/Recipe'

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
        props.onNewAddress(values)
        submitProps.setSubmitting(false)
        submitProps.resetForm()
    }

    let userId 
    if (props.user) {
        userId = props.user['_id']
        console.log('id = '+ userId)
    }
    const initialValues = {
        // country: 'United States',
        id: userId,
        name: '',
        phone: '', 
        address: '',
        address2: '',
        city: '',
        state: '',
        zipCode: '',
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
                    <h1>Enter Your Address</h1>
                </div>
            </div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={submitHandler}
                    enableReinitialize
                    render = { formik => 
                    <Form>
                        <label htmlFor="country">Country/Region</label>
                        <Field 
                            type="button" 
                            name="country" 
                            value="United States only."
                            className={myClasses.ContactDataInput}
                        />
                        <label htmlFor="name">Full name</label>
                        <Field 
                            type="text" 
                            name="name" 
                            // placeholder="Full Name"
                            className={myClasses.ContactDataInput}
                        />
                        <label htmlFor="phone">Phone number</label>
                        <Field 
                            type="tel" 
                            name="phone" 
                            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                            maxLength="12"
                            placeholder="123-4567-8901"
                            className={myClasses.ContactDataInput}
                        />
                        <label htmlFor="address">Address</label>
                        <Field 
                            type="text" 
                            name="address" 
                            placeholder="Street Address or P.O. Box"
                            className={myClasses.ContactDataInput}
                        />
                        <Field 
                            type="text" 
                            name="address2" 
                            placeholder="Apt, suite, unit, building, floor, etc."
                            className={myClasses.ContactDataInput}
                        />
                        <label htmlFor="city">City</label>
                        <Field 
                            type="text" 
                            name="city" 
                            placeholder="City"
                            className={myClasses.ContactDataInput}
                        />
                        <label htmlFor="state">State</label>
                        <Field
                            as='select'
                            name="state" 
                            className={myClasses.ContactDataInput}
                        >
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </Field>
                        <label htmlFor="zipCode">ZIP Code</label>
                        <Field 
                            type="text" 
                            name="zipCode" 
                            placeholder="ZIP Code"
                            className={myClasses.ContactDataInput}
                        />
                        <label htmlFor="email">Email Address</label>
                        <Field 
                            type="email" 
                            name="email" 
                            placeholder="Email Address"
                            className={myClasses.ContactDataInput}
                        />
                        <ErrorMessage name="email" component="div" />                    
                        <button  
                            className={[myClasses.Btn, myClasses.ContactDataBtn, 'auth-btn' ].join(' ')}
                            type='submit'
                            disabled={!formik.isValid || formik.isSubmitting }
                        >
                            <div className={myClasses.BtnDiv}>
                               <h3>Shipping Details</h3>
                            </div>
                        </button>
                        <Persist name="address-form" />
                    </Form>}
                />
                
            </div>
        </Auxiliary>
    )
    
}

const mapStateToProps = state => {
    return {
        items: state.cart.addedItems,
        user: state.auth.payload,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onNewAddress : (values) => dispatch(actions.newAddress(values))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
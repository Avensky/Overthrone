import React, { useEffect, useState } from 'react';
import myClasses from './ContactData.module.scss';
import classes from '../Pages.module.scss';
//import Spinner from '../../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import Auxiliary from '../../../hoc/Auxiliary';
import OrderSummary from './OrderSummary/OrderSummary'
import Modal from '../../UI/Modal/Modal'
import { useHistory } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
//import { Redirect } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Persist } from 'formik-persist'
import * as Yup from 'yup'
//import Recipe from './Recipe/Recipe'
import Address from '../profile/Address/Address'
//import {useHistory} from 'react-router-dom'

import Item1 from '../Shop/images/Image1.jpg'
import Item2 from '../Shop/images/Image2.jpg'
import Item3 from '../Shop/images/Image3.jpg'
import Item4 from '../Shop/images/Image4.jpg'
import Item5 from '../Shop/images/Image6.jpg'
import Item6 from '../Shop/images/Image6.jpg'


import { loadStripe } from '@stripe/stripe-js';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_v4y6jC0D3v8NiKZpKLfjru4300g9fG6D5X');



const ContactData = props => {

    let [localCart, setLocalCart] = useState(localStorage.getItem("cart"))
    let [localAddedItems, setLocalAddedItems] = useState(localStorage.getItem("addedItems"))
    
        // console.log('Cart found in local storage ' + localCart)
    let [items, setItems ]= useState([
        {id:'price_1IFFnkELbEgFNgrjBSXLtJec',title:'Winter body',  desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",   price:110,  img: Item1, quantity: 0 },
        {id:'price_1IFFqOELbEgFNgrjxEAMOVGz',title:'Adidas',       desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",   price:80,   img: Item2, quantity: 0 },
        {id:'price_1IFFqwELbEgFNgrjE4MEjU6R',title:'Vans',         desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",   price:120,  img: Item3, quantity: 0 },
        {id:'price_1IFFrvELbEgFNgrj8zRYYsTi',title:'White',        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",   price:260,  img: Item4, quantity: 0 },
        {id:'price_1IFFsnELbEgFNgrjUUlOQvQR',title:'Cropped-shoe', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",   price:160,  img: Item5, quantity: 0 },
        {id:'price_1IFFtgELbEgFNgrj7Xycyyhu',title:'Blues',        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",   price:90,   img: Item6, quantity: 0 }
    ])
    let stringItems = JSON.stringify(items)
    // console.log('items = '+ stringItems)

    let [ addedItems, setAddedItems ] = useState(props.addedItems)
    let stringAddedItems = JSON.stringify(addedItems)
    console.log('addedItems = '+ stringAddedItems)

    let new_items = items.map( obj => addedItems.find(item => item.id === obj.id) || obj)
    let [cart, setCart]= useState(new_items)
    //let stringCart = JSON.stringify(cart)
    //console.log('Cart = '+ stringCart)
     // const reducer = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue.quantity * currentValue.price);
    // let [ total, setTotal] = useState(props.items.reduce(reducer, 0))
    //console.log('total = '+ total)

    let [ totalItems, setTotalItems] = useState(props.totalItems)
    console.log('totalItems = '+ totalItems)

    let [ totalPrice, setTotalPrice ] = useState(0)
    console.log('totalPrice = '+ totalPrice)






    const [showForm, setShowForm]       = useState(false)
    const [purchasing, setPurchasing]   = useState(false);
    const history = useHistory()
    const reducer = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue.quantity * currentValue.price);
    let total
    let array = props.items
    if ( array != '') {
        total = array.reduce(reducer, 0)
        console.log("total = " + array.reduce(reducer, 0))
    }
    
    const purchaseHandler = () => {
        if (props.isAuth) {
            setPurchasing(true)
        } else {
//            this.props.onSetAuthRedirectPath('/checkout');
            history.push('/authentication');
        }
    }
    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }

    const purchaseContinueHandler = async (event) => {
        // Get Stripe.js instance
        const stripe = await stripePromise;

        let line_items = addedItems.map( item => {
            let data = {
                    price: item.id,
                    quantity : item.quantity,
                    tax_rates: ['txr_1IFmGYELbEgFNgrjLX2kMXq6']
            }
        
            return (
                data
            )
        })

        // Call your backend to create the Checkout Session
        const response = await fetch('/api/checkout', { 
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            body: JSON.stringify({
              items: line_items,
              address: user.addresses,
              userid: props.user['_id']
            })
        })

        const session = await response.json()
        console.log(session);
        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe.redirectToCheckout({
        sessionId: session.id,
        });

        if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
        }
    };

    let orderSummary = null
    if (props.items) {
        orderSummary = <OrderSummary 
            items={props.items}
            total={total}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
        />;
    }

//    const [authRedirectPath, onSetAuthRedirectPath] = useState('/')

//    const reducer = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue.quantity * currentValue.price);
//    const history = useHistory()
//    let total
//    let array = props.items
//    if ( array != ''){
//        total = array.reduce(reducer, 0)
//        console.log("total = " + array.reduce(reducer, 0))
//    }

    const showFormHanldler = () => {
        if (showForm === false){
            setShowForm(true)
        } else {
            setShowForm(false)
        }
    }

    const submitHandler = ( values, submitProps ) => {
        console.log('Form data', values)
        console.log('submitProps', submitProps)
        props.onNewAddress(values)
        submitProps.setSubmitting(false)
        submitProps.resetForm()
        setShowForm(false)
        //history.push('/contactData');
    }
    let userId 
    let user
    let initialValues = {
        // country: 'United States',
        id: '',
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

    if (props.user) {
        user = props.user
        userId = props.user['_id']
        console.log('id = '+ userId)
        initialValues = {
            // country: 'United States',
            id: '',
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
    }

    useEffect(() => { user = props.user},[props.user])
    useEffect(() => {
        let localCartCopy = '[]'
        if (localCart) { localCartCopy = [localAddedItems] }
        // console.log('local storage cart = ' + localCartCopy)

        // parse 
        let parseLocalCart = JSON.parse(localCartCopy)
        // console.log('local storage parseLocalCart = ' + parseLocalCart)
        let itemsCopy = items

        let updatedItems = itemsCopy.map( obj => parseLocalCart.find(item => item.id === obj.id) || obj)
        let stringUpdatedItems= JSON.stringify(updatedItems)
        // console.log('Cart Items cross reference local = ' + stringUpdatedItems)
        setCart(updatedItems)

        let localAddedItemsCopy = addedItems
        let localAddedItemsCopyString =  JSON.stringify(localAddedItemsCopy)
        if (localAddedItems) { 
            localAddedItemsCopy = [localAddedItems] 
            // parse 
            localAddedItemsCopy = JSON.parse(localAddedItemsCopy)
            setAddedItems(localAddedItemsCopy)
            //localAddedItemsCopyString = JSON.stringify(localAddedItemsCopy)
            //console.log('local storage added to addedItems= ' + localAddedItemsCopyString)
            props.addToCart(localAddedItemsCopy)
        }
        // console.log('local storage parseLocalCart = ' + parseLocalCart)
        // let updatedAddedItems = addedItemsCopy.map( obj => parseLocalAddedItems.find(item => item.id === obj.id) || obj)
        // localAddedItemsCopy= JSON.stringify(localAddedItemsCopy)
        setAddedItems(localAddedItemsCopy)
        console.log('local storage added to addedItems= ' + localAddedItemsCopyString)

        let totalItemsQuantity = localAddedItemsCopy.map(item => item.quantity).reduce((prev, curr) => prev + curr, 0);
        console.log('totalItemQuantity = ' + totalItemsQuantity)
        setTotalItems(totalItemsQuantity)

        let totalItemsPrice = localAddedItemsCopy.map(item => item.price*item.quantity).reduce((prev, curr) => prev + curr, 0);
        console.log('totalItemPrice = ' + totalItemsPrice)
        setTotalPrice(totalItemsPrice)
    }, []) //only run once

    
    const validationSchema = Yup.object({
        email: Yup.string().required('Required')
    })

    let addressForm
    if (user.addresses) {
        if(showForm){
            addressForm = (
                <Formik
                    initialValues={{ 
                        id: userId,
                        name: user.addresses.name,
                        phone: user.addresses.phone, 
                        address: user.addresses.address1,
                        address2: user.addresses.address2,
                        city: user.addresses.city,
                        state: user.addresses.state,
                        zipCode: user.addresses.zipCode,
                        email: user.addresses.email,
                        deliveryMethod: 'normal'
                    }}
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
                            //placeholder={user.addresses.name ? user.addresses.name : null}
                            className={myClasses.ContactDataInput}
                        />
                        <label htmlFor="phone">Phone number</label>
                        <Field 
                            type="tel" 
                            name="phone" 
                            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                            maxLength="12"
                            //placeholder={user.addresses.phone ? user.addresses.phone: "123-4567-8901"}

                            className={myClasses.ContactDataInput}
                        />
                        <label htmlFor="address">Address</label>
                        <Field 
                            type="text" 
                            name="address" 
                            //placeholder={user.addresses.address1 ? user.addresses.address1: "Street Address or P.O. Box"}
                            className={myClasses.ContactDataInput}
                        />
                        <Field 
                            type="text" 
                            name="address2"
                            //placeholder={user.addresses.address2 ? user.addresses.address2: "Apt, suite, unit, building, floor, etc."}
                            className={myClasses.ContactDataInput}
                        />
                        <div className="flex">
                            <div className='margin-side'>
                                <label htmlFor="city">City</label>
                                <Field 
                                    type="text" 
                                    name="city" 
                                    //placeholder={user.addresses.city ? user.addresses.city: "City"}
                                    className={myClasses.ContactDataInput}
                                />                             
                            </div>
                            <div className='margin-side'>
                                <label htmlFor="state">State</label>
                                <Field
                                    as='select'
                                    name="state"
                                    //placeholder={user.addresses.state ? user.addresses.state : user.addresses.state}
                                    className={myClasses.ContactDataInput}>
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
                            </div>
                            <div className='margin-side'>
                                <label htmlFor="zipCode">ZIP Code</label>
                                <Field 
                                    type="text" 
                                    name="zipCode" 
                                    //placeholder={user.addresses.zipCode ? user.addresses.zipCode: "ZIP Code"}
                                    className={myClasses.ContactDataInput}
                                />
                            </div>
                            
                        </div>
                        <label htmlFor="email">Email Address</label>
                        <Field 
                            type="email" 
                            name="email" 
                            //placeholder={user.addresses.email ? user.addresses.email: "Email Address"}
                            className={myClasses.ContactDataInput}
                        />
                        <ErrorMessage name="email" component="div" />                    
                        <button  
                            className={[myClasses.Btn, myClasses.ContactDataBtn, 'auth-btn' ].join(' ')}
                            type='submit'
                            disabled={!formik.isValid || formik.isSubmitting }>
                            <div className={myClasses.BtnDiv}>
                                <h3>Save Details</h3>
                            </div>
                        </button>
                        <Persist name="address-form" />
                    </Form>} 
                />
            )

        } else {
            addressForm = (
                    <Address 
                        link="Shipping Address"
                        userLink = {true}
                        name     = {user.addresses.name}
                        phone    = {user.addresses.phone}
                        address  = {user.addresses.address1}
                        address2 = {user.addresses.address2}
                        city     = {user.addresses.city}
                        state    = {user.addresses.state}
                        zipCode  = {user.addresses.zipCode}
                        email    = {user.addresses.email}
                    />
            )
        }
    } else {
        addressForm = (
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
                        className={myClasses.ContactDataInput}>
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
                        disabled={!formik.isValid || formik.isSubmitting }>
                        <div className={myClasses.BtnDiv}>
                            <h3>Shipping Details</h3>
                        </div>
                    </button>
                    <Persist name="address-form" />
                </Form>} 
            />
        )
    }

    return (
        <Auxiliary>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}> 
                {orderSummary}
            </Modal>
            <div className={[classes.Card, myClasses.ContactData].join(' ')}>
                <div className="container">
                    <div className="page-header text-center">
                        <h1>Shipping Address</h1>
                    </div>
                    <button  
                        className={[myClasses.Btn, myClasses.ContactDataBtn, 'auth-btn' ].join(' ')}
                        type='submit'
                        onClick={showFormHanldler}>
                        <div className={myClasses.BtnDiv}>
                            <h3>Show Form</h3>
                        </div>
                    </button>
                    {addressForm}
                    <button 
                        className='btn-primary btn'
                        // disabled={!props.purchaseable}
                        type="button" role="link"
                        onClick={purchaseHandler}>{
                            props.isAuth 
                                ? 'CONTINUE TO CHECKOUT' 
                                : 'SIGN IN TO ORDER'}
                    </button>
                </div>
            </div>
        </Auxiliary>
    )
    
}

const mapStateToProps = state => {
    return {
        items: state.cart.addedItems,
        addedItems  : state.cart.addedItems,
        user: state.auth.payload,
        loading: state.auth.loading,
        data: state.auth.addressData,
        isAuth: state.auth.payload
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart           : (addedItems, total, totalItems)  =>{ dispatch(actions.addToCart(addedItems, total, totalItems))},
        onNewAddress        : (values) => dispatch(actions.newAddress(values)),
        onFetchUser         : () => dispatch(actions.fetchUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
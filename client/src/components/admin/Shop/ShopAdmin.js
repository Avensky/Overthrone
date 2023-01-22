import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import classes from '../../pages/Pages.module.scss';
import myClasses from './Shop.module.scss';
import Item from './Items/Item/Item'
import * as actions from '../../../store/actions/index';
import NewItem from './NewItem/NewItem'
import {useHistory} from 'react-router-dom'
import CheckoutHeader from '../Checkout/CheckoutHeader/CheckoutHeader'
//import {purchaseContinueHandler} from '../../../utility/stripe'
import OrderSummary from '../OrderSummary/OrderSummary'
import Modal from '../../UI/Modal/Modal'


import { loadStripe } from '@stripe/stripe-js';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_v4y6jC0D3v8NiKZpKLfjru4300g9fG6D5X');


const Purchase = props => { 
    
    
    const purchaseContinueHandler = async (addedItems, isAuth, event) => {
        console.log('checkout start')        // Get Stripe.js instance
        const stripe = await stripePromise;
    
        let line_items = addedItems.map( item => {
            let data = {
                //currency    : 'usd',
                price       : item.priceid,
                //amount      : item.price*100,
                quantity    : item.amount,
                //name        : item.name,
                tax_rates: ['txr_1IFmGYELbEgFNgrjLX2kMXq6']
            }
    //        console.log('data = '+JSON.stringify(data))
            return data
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
                //currency: 'usd',
                items: line_items,
                userid: isAuth['_id']
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
        console.log(result.error.message)
        }
    };
    
    const [purchasing, setPurchasing] = useState(false);
    const history = useHistory()
    const addToCart = (id) => {props.addToCart(id)}
    const purchaseHandler = () => {
        props.isAuth ? setPurchasing(true) :history.push('/authentication')
    }
    const purchaseCancelHandler = () => {setPurchasing(false)}
    const viewCartHandler = () => {history.push('/cart')}
    let orderSummary = null
    if (props.addedItems) {
        orderSummary = <OrderSummary 
            items={props.addedItems}
            total={props.total}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={() => purchaseContinueHandler(props.addedItems, props.isAuth)}
        />;
    }
    let myShop 
    if(props.shop){
        myShop = props.shop.map( item => {
        return( 
            <Item
                image       = {item.imageData}
                key         = {item._id}
                id          = {item._id}
                alt         = {item.title}
                title       = {item.title}
                link        = {"/shop/"}
                to          = "/"
                clicked     = {() => addToCart(item._id)}
                desc        = {item.desc}
                price       = {item.price}
                quantity    = {item.amount||0}
                add         = {true}
            />
        )}
    )}
    
    useEffect(() => {
        const getItems = async () => { props.getItems() }
        if ( props.items.length === 0){ 
            console.log('Fetching Items')
            getItems() 
        }
    }, [])

    return(
        <div className={[classes.Card, myClasses.Shop].join(' ')}>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}> 
                {orderSummary}
            </Modal>
            {/* Title */}
            <div className="container">
                <div className="page-header text-center border-bottom">
                    <h1><a href='/shop'>Shop Admin</a></h1>
                </div>
            </div>
            <NewItem />
            {/*
                <NewItem />
                
            */}
            {/*
            <div className='container'>
                <div className={['page-header', 'text-center'].join(' ')}>
                    <a href='/shop' ><h1>Shop</h1></a>
                </div>
            </div>
            <div className={classes.spread}>
            */}
                {/* <input className={myClasses.Search} type='text' placeholder="search the store" /> */}
            {/*
                <div className={myClasses.dropdown}>
                    <button className={myClasses.dropbtn}>OrderBy: </button>
                    <div className={myClasses.dropdownContent}>
                        <a href="/">Price</a>
                        <a href="/">Most recent</a>
                        <a href="/">Most Popular</a>
                    </div>
                </div>
            </div>
            <div className={myClasses.filter}>
                <label><p>All</p></label>
                <label><p>Books</p></label>
                <label><p>Apparel</p></label>
                <label><p>Hats</p></label>
                <label><p>Misc</p></label>
            </div>
            */}
            <div className={myClasses.Items}>
                <div className={['box', myClasses.Items ].join(' ')}>
                    <CheckoutHeader
                        totalItems={props.totalItems}
                        total={props.total}
                        viewTitle='View Cart'
                        view={viewCartHandler}
                        checkout={purchaseHandler}
                        isAuth={props.isAuth}
                    />
                    {myShop}
                    <button 
                        className='btn-primary btn'
                        type="button" role="link"
                        onClick={purchaseHandler}>{
                            props.isAuth 
                                ? 'CONTINUE TO CHECKOUT' 
                                : 'SIGN IN TO ORDER'}
                    </button>
                </div>
            </div>
        </div>
    )
} 

const mapStateToProps = state => {
    return {
        addedItems  : state.cart.addedItems,
        totalItems  : state.cart.totalItems,
        items       : state.cart.items,
        total       : state.cart.total,
        shop        : state.cart.shop,
        isAuth      : state.auth.payload
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addToCart           : (id)   =>{ dispatch(actions.addQuantity(id))},
        getItems            : ()     =>{ dispatch(actions.getItems())},
        loadCart            : (cart) =>{ dispatch(actions.loadCart(cart))},
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Purchase);
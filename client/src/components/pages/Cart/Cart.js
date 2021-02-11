import React, {useState} from 'react';
import { connect } from 'react-redux'
import classes from '../Pages.module.scss'
import myClasses from './Cart.module.scss'
//import Item from '../Shop/Items/Item/Item'
import Auxiliary from '../../../hoc/Auxiliary'
import OrderSummary from '../OrderSummary/OrderSummary'
import Modal from '../../UI/Modal/Modal'
import { useHistory } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import CheckoutHeader from '../Checkout/CheckoutHeader/CheckoutHeader';
import { loadStripe } from '@stripe/stripe-js';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_v4y6jC0D3v8NiKZpKLfjru4300g9fG6D5X');

const Cart = props => {
    const [purchasing, setPurchasing] = useState(false);
    const history = useHistory()
    const handleRemove              = (id)=>{ props.removeItem(id)}
    const addToCart                 = (id)=>{ props.addToCart(id)}
    const handleSubtractQuantity    = (id)=>{ props.subtractQuantity(id);}

    const viewCartHandler = () => {history.push('/shop')}
    const checkoutHandler = () => {history.push('/')}

    const purchaseHandler = () => {
        props.isAuth ? setPurchasing(true) :history.push('/authentication')
    }
    const purchaseCancelHandler = () => {setPurchasing(false)}
    const purchaseContinueHandler = async (event) => {
        console.log('checkout start')        // Get Stripe.js instance
        const stripe = await stripePromise;

        let line_items = props.addedItems.map( item => {
            let data = {
                currency    : 'usd',
                price       : item.priceid,
                amount      : item.price*100,
                quantity    : item.amount,
                name        : item.name,
                tax_rates: ['txr_1IFmGYELbEgFNgrjLX2kMXq6']
            }
            console.log('data = '+JSON.stringify(data))
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
                userid: props.isAuth['_id']
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
    if (props.addedItems) {
        orderSummary = <OrderSummary 
            items={props.addedItems}
            total={props.total}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
        />;
    }

    let cartList = props.addedItems;
    //console.log("cartList"+cartList)
    let addedItems = cartList.length ?
        (  
            cartList.map(item=>{
                return(
                    <div className={myClasses.Cart} key={item._id}>
                        {/* Product */}
                        <div className={myClasses.Item}>
                            {/* Remove */}
                            <div className={myClasses.Remove}>
                                <i className="material-icons" onClick={()=>{handleRemove(item._id)}}>clear</i>
                            </div>

                            {/* Image */}
                            <div className={myClasses.CardThumbnail}>
                                <img src={'http://localhost:5000/'+item.imageData} alt={item.alt} />
                            </div>
                            
                            {/* Description */}
                            <div className={myClasses.CardDescription}>
                                <b><span className="title">{item.title}</span></b>
                                <p>{item.desc}</p>
                            </div>

                            {/* Quantity */}
                            <div className={myClasses.CardQuantity}>
                                <i className={["material-icons", myClasses.MaterialIcons, classes.noselect].join(' ')} onClick={()=>{handleSubtractQuantity(item._id)}}>arrow_drop_down</i>
                                <p><b>{item.amount}</b></p>
                                <i className={["material-icons", myClasses.MaterialIcons, classes.noselect].join(' ')} onClick={()=>{addToCart(item._id)}}>arrow_drop_up</i>                                   
                            </div>

                            {/* Price */}
                            <div className={myClasses.CardPrice}><b> ${item.price}</b></div>
                        </div>
                    </div>
                )
            })
        )
        :<p>Nothing.</p>
        return(
            <Auxiliary>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}> 
                    {orderSummary}
                </Modal>
                <div className={[classes.Card, myClasses.Shop].join(' ')}>
                    <div className={myClasses.Cart}>
                        {/* Title */}
                        <div className={myClasses.Title}>
                            <h1><a href="/cart">Shopping Cart</a></h1>
                        </div>
                        <CheckoutHeader
                            totalItems={props.totalItems}
                            total={props.total}
                            viewTitle='View Shop'
                            view={viewCartHandler}
                            checkout={purchaseHandler}
                            isAuth={props.isAuth}
                        />
                        <div className={myClasses.Collection}>
                            {addedItems}
                            {props.total ? <h3>Total = ${props.total}</h3> : null}
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
            </Auxiliary>
       )
    }



const mapStateToProps = (state)=>{
    return{
        addedItems   : state.cart.addedItems,
        total        : state.cart.total,
        totalItems   : state.cart.totalItems,
        isAuth       : state.auth.payload
        //addedItems: state.addedItems
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        loadCart         : (cart)   =>{ dispatch(actions.loadCart(cart))},
        removeItem       : (id)     =>{ dispatch(actions.removeItem(id))},
        addToCart        : (id)     =>{ dispatch(actions.addToCart(id))},
        subtractQuantity : (id)     =>{ dispatch(actions.subtractQuantity(id))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart)
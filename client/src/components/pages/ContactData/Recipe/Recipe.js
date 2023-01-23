import React from 'react';
import { connect } from 'react-redux';
import myClasses from './Recipe.module.scss';
//import { addShipping } from './actions/cartActions'

import StripeCheckout from 'react-stripe-checkout';
import PropTypes from 'prop-types';

const Recipe = props => {
    let array = props.addedItems;
    console.log('array = ' + array);
    const reducer = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue.quantity * currentValue.price);
    let total;
    if ( array !== ''){
        total = array.reduce(reducer, 0);
        console.log("total = " + array.reduce(reducer, 0));
    }
    return(
        <div className={myClasses.Recipe}>
            <div className={myClasses.Collection}>
            {/* 
                <label className="collection-item">
                    <input type="checkbox" ref="shipping" onChange= {handleChecked} />
                    <span>+Shipping($6)</span>
                </label>
            */} 
                <div className="collection-item"><b>Total: ${total}</b></div>
            </div>
            <div className="checkout">
                {/* <button className="waves-effect waves-light btn">Checkout</button> */}       
                <StripeCheckout 
                    // className="waves-effect waves-light btn" 
                    amount={total*100}
                    token={token => console.log(token)}
                    stripeKey = {process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
                />
            </div>
        </div>
    );

};

const mapStateToProps = (state)=>{
    return{
        addedItems: state.cart.addedItems,
        total: state.cart.total
    };
};

const mapDispatchToProps = (dispatch)=>{
    return{
        addShipping: ()=>{dispatch({type: 'ADD_SHIPPING'});},
        substractShipping: ()=>{dispatch({type: 'SUB_SHIPPING'});}
    };
};

Recipe.propTypes = {
    addedItems: PropTypes.array,
};

export default connect(mapStateToProps,mapDispatchToProps)(Recipe);

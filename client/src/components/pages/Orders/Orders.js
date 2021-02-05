import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import Order from './Order/Order';
import classes from '../Pages.module.scss';
import myClasses from './Orders.module.scss';
//import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import Spinner from '../../UI/Spinner/Spinner';

const Orders = (props) => {
    useEffect(() => {
        props.onFetchOrders(props.user);
        console.log('userid = ' + props.user._id)
    }, [])

    let orders = <Spinner />;
    if ( !props.loading ) {
        orders = props.orders.map( order => {
            let line_items = order.line_items
            return <Order
                key             = {order.sessionid}
                date            = {order.date}
                amount_total    = {order.amount_total}
                sessionid       = {order.sessionid}
                shipping        = {order.shipping}
                items           = {line_items}
                name            = {order.shipping.name}
                phone           = {order.shipping.address.phone}
                line1           = {order.shipping.address.line1}
                line2           = {order.shipping.address.line2}
                city            = {order.shipping.address.city}
                state           = {order.shipping.address.state}
                postal_code     = {order.shipping.address.postal_code}
                email           = {order.customer_details.email}
                amount_total    = {order.amount_total}
                amount_subtotal = {order.amount_subtotal}
            />
        })
    }
    return (
        <div>            
            <div className={[classes.Card, myClasses.Profile].join(' ')}>
                <div className="container">
                    <div className="page-header text-center">
                        <h1>Order History Page</h1>
                    </div>
                </div>
            {orders}
            </div>
        </div>
    );

}

const mapStateToProps = state => {
    return {
        orders            : state.orders.orders,
        loading           : state.orders.loading,
        user              : state.auth.payload,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (user) => dispatch( actions.fetchOrders(user) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Orders);
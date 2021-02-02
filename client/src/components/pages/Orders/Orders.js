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
        orders = props.orders.map( order => (
            <Order
                key={order.sessionid}
                date={order.date}
                amount_total={order.amount_total}
                sessionid={order.sessionid}
                shipping={order.shipping}
                items={order.items}

                name     = {order.shipping.name}
                phone    = {order.shipping.phone}
                address  = {order.shipping.address1}
                address2 = {order.shipping.address2}
                city     = {order.shipping.city}
                state    = {order.shipping.state}
                zipCode  = {order.shipping.zipCode}
                email    = {order.shipping.email}

                amount_total = {order.amount_total}
                amount_subtotal = {order.amount_subtotal}

            />
        ) )
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
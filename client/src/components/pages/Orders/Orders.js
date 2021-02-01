import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import Order from './Order/Order';
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
                date={order.date} />
        ) )
    }
    return (
        <div>
            {orders}
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
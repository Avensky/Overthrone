import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Order from './Order/Order';
import classes from '../Pages.module.scss';
import myClasses from './Orders.module.scss';
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import Spinner from '../../UI/Spinner/Spinner';

const Orders = (props) => {
  useEffect(() => {
    const fetchData = async () => {
      props.onFetchOrders(props.user._id);
    };
    if (props.orders.length === 0) {
      fetchData();
    }
    // console.log('userid = ' + props.user._id)
  }, []);

  let orders = <Spinner />;
  if (!props.loading && (props.orders.length > 0)) {
    orders = props.orders.map((order) => {
      return <Order
        key={order.sessionid}
        order = {order}
        date = {order.date}
        amount_total = {order.amount_total}
        sessionid = {order.sessionid}
        shipping = {order.shipping}
        items = {order.line_items}
        name = {order.shipping.name}
        phone = {order.shipping.address.phone}
        line1 = {order.shipping.address.line1}
        line2 = {order.shipping.address.line2}
        city = {order.shipping.address.city}
        state = {order.shipping.address.state}
        postal_code = {order.shipping.address.postal_code}
        email = {order.customer_details.email}
        amount_subtotal = {order.amount_subtotal}
      />;
    });
  }

  return (
    <div>
        <div className={[classes.Card, myClasses.Orders].join(' ')}>
            <div className="container">
                <div className="page-header text-center">
                    <h1>Order History Page</h1>
                </div>
            </div>
          {orders}
        </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  orders: state.orders.orders,
  loading: state.orders.loading,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchOrders: (id) => dispatch(actions.fetchOrders(id)),
});

Orders.propTypes = {
  onFetchOrders: PropTypes.func,
  user: PropTypes.any,
  orders: PropTypes.any,
  loading: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);

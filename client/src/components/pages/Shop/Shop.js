import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from '../Pages.module.scss';
import myClasses from './Shop.module.scss';
import Item from './Items/Item/Item';
import * as actions from '../../../store/actions/index';
// import NewItem from './NewItem/NewItem'
import CheckoutHeader from '../Checkout/CheckoutHeader/CheckoutHeader';
// import {purchaseContinueHandler} from '../../../utility/stripe'
import OrderSummary from '../OrderSummary/OrderSummary';
import Modal from '../../UI/Modal/Modal';

const Purchase = (props) => {
  const [purchasing, setPurchasing] = useState(false);
  const history = useHistory();
  const addToCart = (id) => { props.addToCart(id); };

  const purchaseHandler = () => {
    props.isAuth ? setPurchasing(true) : history.push('/authentication');
  };

  const purchaseCancelHandler = () => { setPurchasing(false); };
  const viewCartHandler = () => { history.push('/cart'); };

  let orderSummary = null;
  if (props.cart) {
    orderSummary = <OrderSummary
      items={props.cart}
      total={props.totalPrice}
      purchaseCancelled={purchaseCancelHandler}
      purchaseContinued={() => props.checkout(props.cart, props.isAuth)}
      isAuth={props.isAuth}
    />;
  }

  let myShop;
  // console.log('props.shop = ', (props.shop));
  if (props.shop) {
    // console.log('props.shop = ', props.shop);
    myShop = props.shop.map((item) => (
      <Item
        image = {item.imageData}
        key = {item._id}
        id = {item._id}
        alt = {item.title}
        title = {item.title}
        link = {'/shop/'}
        to = "/"
        clicked = {() => addToCart(item._id)}
        desc = {item.desc}
        price = {item.price}
        quantity = {item.orderAmt || 0}
        add = {true}
      />
    ));
  }

  let view;
  props.totalItems > 0
    ? view = viewCartHandler
    : view = null;

  let checkout;
  props.totalItems > 0
    ? checkout = purchaseHandler
    : checkout = null;

  return (
    <div className={[classes.Card, myClasses.Shop].join(' ')}>
        <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
            {orderSummary}
        </Modal>
        {/* Title */}
        <div className="container">
            <div className="page-header text-center">
                <h1><a href='/shop'>Shop</a></h1>
            </div>
        </div>
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
            {/* <input className={myClasses.Search}
            type='text' placeholder="search the store" /> */}
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
            <div className={['box', myClasses.Items].join(' ')}>
                <CheckoutHeader
                    totalItems={props.totalItems}
                    total={props.totalPrice}
                    viewTitle='View Cart'
                    view={view}
                    checkout={checkout}
                    isAuth={props.isAuth}
                />
                {myShop}
                {props.totalItems > 0
                  ? (<button
                            className='btn-primary btn'
                            type="button" role="link"
                            onClick={purchaseHandler}>{
                                props.isAuth !== null
                                  ? 'CONTINUE TO CHECKOUT'
                                  : 'SIGN IN TO ORDER'}
                        </button>)
                  : null
                }
            </div>
        </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  totalItems: state.cart.totalItems,
  items: state.cart.items,
  total: state.cart.total,
  shop: state.cart.shop,
  isAuth: state.auth.user,
  totalPrice: state.cart.totalPrice,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (id) => { dispatch(actions.addQuantity(id)); },
  getItems: () => { dispatch(actions.getItems()); },
  loadCart: () => { dispatch(actions.loadCart()); },
  checkout: (cart, user) => { dispatch(actions.checkout(cart, user)); },
});

Purchase.propTypes = {
  addToCart: PropTypes.func,
  isAuth: PropTypes.any,
  shop: PropTypes.array,
  cart: PropTypes.array,
  totalPrice: PropTypes.number,
  totalItems: PropTypes.number,
  checkout: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Purchase);

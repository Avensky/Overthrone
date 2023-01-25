import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from '../Pages.module.scss';
import myClasses from './Cart.module.scss';
// import Item from '../Shop/Items/Item/Item';
import Auxiliary from '../../../hoc/Auxiliary';
import OrderSummary from '../OrderSummary/OrderSummary';
import Modal from '../../UI/Modal/Modal';
import * as actions from '../../../store/actions/index';
import CheckoutHeader from '../Checkout/CheckoutHeader/CheckoutHeader';

const Cart = (props) => {
  const [purchasing, setPurchasing] = useState(false);
  const url = 'https://caring-vegan.s3.us-west-2.amazonaws.com/';
  const history = useHistory();
  const handleRemove = (id) => { props.removeItem(id); };
  const addToCart = (id) => { props.addQuantity(id); };
  const handleSubtractQuantity = (id) => { props.subQuantity(id); };
  const viewCartHandler = () => { history.push('/shop'); };
  const purchaseHandler = () => {
    props.isAuth !== null ? setPurchasing(true) : history.push('/authentication');
  };
  const purchaseCancelHandler = () => { setPurchasing(false); };

  let orderSummary = null;
  if (props.addedItems) {
    orderSummary = <OrderSummary
            items={props.addedItems}
            total={props.total}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={() => props.checkout(props.cart, props.isAuth)}
            isAuth={props.isAuth}
        />;
  }

  const cartList = props.addedItems;
  // console.log("cartList"+cartList)
  const addedItems = cartList.length
    ? (
      cartList.map((item) => (
                    <div className={myClasses.Cart} key={item._id}>
                        {/* Product */}
                        <div className={myClasses.Item}>
                            {/* Remove */}
                            <div className={myClasses.Remove}>
                                <i className="material-icons" onClick={() => { handleRemove(item._id); }}>clear</i>
                            </div>

                            {/* Image */}
                            <div className={myClasses.CardThumbnail}>
                                <img src={url + item.imageData} alt={item.alt} />
                            </div>

                            {/* Description */}
                            <div className={myClasses.CardDescription}>
                                <b><span className="title">{item.title}</span></b>
                                <p>{item.desc}</p>
                            </div>

                            {/* Quantity */}
                            <div className={myClasses.CardQuantity}>
                                <i className={['material-icons', myClasses.MaterialIcons, classes.noselect].join(' ')} onClick={() => { handleSubtractQuantity(item._id); }}>arrow_drop_down</i>
                                <p><b>{item.orderAmt}</b></p>
                                <i className={['material-icons', myClasses.MaterialIcons, classes.noselect].join(' ')} onClick={() => { addToCart(item._id); }}>arrow_drop_up</i>
                            </div>

                            {/* Price */}
                            <div className={myClasses.CardPrice}><b> ${item.price}</b></div>
                        </div>
                    </div>
      ))
    )
    : null;

  return (
            <Auxiliary>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <div className={[classes.Card, myClasses.Shop].join(' ')}>
                    <div className={myClasses.Cart}>
                        {/* Title */}
                        <div className={['page-header text-center'].join(' ')}>
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
                            {props.total ? <h3>Subtotal = ${props.total}</h3> : null}
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
            </Auxiliary>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  addedItems: state.cart.cart,
  total: state.cart.total,
  totalItems: state.cart.totalItems,
  isAuth: state.auth.user,
  // addedItems: state.addedItems
});
const mapDispatchToProps = (dispatch) => ({
  loadCart: (cart) => { dispatch(actions.loadCart(cart)); },
  removeItem: (id) => { dispatch(actions.removeFromCart(id)); },
  addQuantity: (id) => { dispatch(actions.addQuantity(id)); },
  subQuantity: (id) => { dispatch(actions.subQuantity(id)); },
  checkout: (cart, user) => { dispatch(actions.checkout(cart, user)); },
});

Cart.propTypes = {
  removeItem: PropTypes.func,
  loadCart: PropTypes.func,
  addQuantity: PropTypes.func,
  subQuantity: PropTypes.func,
  checkout: PropTypes.func,
  isAuth: PropTypes.any,
  addedItems: PropTypes.array,
  cart: PropTypes.array,
  total: PropTypes.number,
  totalItems: PropTypes.number,
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Wrapper.module.scss';
import Navbar from '../Navigation/Navbar/Navbar';
import Sidebar from '../Navigation/Sidebar/Sidebar';
import Background from './Background/Background';
import * as actions from '../../store/actions/index';

const Wrapper = (props) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const closeSidebarHandler = () => { setShowSidebar(false); };
  // set state in a clean way by depending on a previous state
  const sidebarToggleHandler = () => { setShowSidebar(!showSidebar); };
  const logout = async () => { await props.logout(); };
  useEffect(() => {
    const getItems = async () => { props.getItems(); };
    if (props.items.length === 0) {
      // console.log('Fetching Items');
      getItems();
    }
  }, []);

  useEffect(() => {
    const fetchCart = async () => { props.loadCart(); };
    if (props.items.length > 0) {
      // console.log('Fetching Cart');
      fetchCart();
    }
  }, [props.items]);

  return (
        <Auxiliary>
            <div className = {classes.Layout}>
                <Background />
                <Navbar
                    isAuth={props.isAuth}
                    sidebarToggleClicked={sidebarToggleHandler}
                    // items = {props.totalItems}
                    cart={props.totalItems}
                    logout={logout}
                />
                <Sidebar
                    isAuth={props.isAuth}
                    open={showSidebar}
                    closed={closeSidebarHandler}
                    // cart={totalItems}
                    logout={logout}
                />
                <main className={classes.Wrapper}>
                    {props.children}
                </main>

            </div>
        </Auxiliary>
  );
};

const mapStateToProps = (state) => ({
  items: state.cart.items,
  shop: state.cart.shop,
  addedItems: state.cart.addedItems,
  cart: state.cart.cart,
  total: state.cart.total,
  totalItems: state.cart.totalItems,
  isAuth: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  getItems: () => { dispatch(actions.getItems()); },
  loadCart: (cart) => { dispatch(actions.loadCart(cart)); },
  logout: () => { dispatch(actions.logout()); },
});

Wrapper.propTypes = {
  loadCart: PropTypes.any,
  items: PropTypes.any,
  isAuth: PropTypes.any,
  totalItems: PropTypes.any,
  children: PropTypes.any,
  getItems: PropTypes.any,
  logout: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);

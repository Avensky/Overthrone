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
  const getItems = async () => { await props.getItems(); };
  const fetchCart = async () => { await props.loadCart(); };
  const fetchData = async () => { await props.onFetchUser(); };
  useEffect(() => {
    // console.log('useEffect');
    if (props.items.length > 0) {
      // console.log('Fetching Cart');
      fetchCart();
    }

    if (props.items.length === 0) {
      // console.log('Fetching Items');
      getItems();
    }
  }, [props.items]);

  useEffect(() => {
    if (!props.isAuth) { fetchData(); }
  }, [props.isAuth]);

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
  // addedItems: state.cart.addedItems,
  // cart: state.cart.cart,
  total: state.cart.total,
  totalItems: state.cart.totalItems,
  isAuth: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  getItems: () => { dispatch(actions.getItems()); },
  loadCart: () => { dispatch(actions.loadCart()); },
  logout: () => { dispatch(actions.logout()); },
  onFetchUser: () => dispatch(actions.fetchUser()),
});

Wrapper.propTypes = {
  loadCart: PropTypes.func,
  items: PropTypes.array,
  shop: PropTypes.array,
  isAuth: PropTypes.any,
  totalItems: PropTypes.number,
  children: PropTypes.any,
  getItems: PropTypes.func,
  logout: PropTypes.func,
  onFetchUser: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);

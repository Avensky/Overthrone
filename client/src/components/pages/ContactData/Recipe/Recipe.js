import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import myClasses from './Recipe.module.scss';
import * as actions from '../../../../store/actions/index';

const Recipe = (props) => {
  <div className={myClasses.Recipe}>
    <div className={myClasses.Collection}>
      {/*
      <label className="collection-item">
      <input type="checkbox" ref="shipping" onChange= {handleChecked} />
      <span>+Shipping($6)</span>
      </label>
      */}
      <div className="collection-item"><b>Total: ${props.total}</b></div>
    </div>
    <div className="checkout" >
        {/* <button className="waves-effect waves-light btn">Checkout
        </button> */}
    </div>
  </div>;
};

const mapStateToProps = (state) => ({
  addedItems: state.cart.addedItems,
  total: state.cart.total,
});

const mapDispatchToProps = (dispatch) => ({
  addShipping: () => { dispatch({ type: 'ADD_SHIPPING' }); },
  substractShipping: () => { dispatch({ type: 'SUB_SHIPPING' }); },
  checkout: (values, auth) => { dispatch(actions.checkout(values, auth)); },
});

Recipe.propTypes = {
  addedItems: PropTypes.array,
  checkout: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);

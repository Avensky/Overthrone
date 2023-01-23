import React from 'react';
import myClasses from './CheckoutHeader.module.scss';
import PropTypes from 'prop-types';

const CheckoutHeader = (props) => {
    let itemString = 'item';
    if (props.totalItems !== 1) {itemString = 'items';}
    let totalItems = props.totalItems || 0;
    let total = props.total || 0;
    const header = (
        <div className={myClasses.dualGrid}>
            <div className={[myClasses.dualBtn, myClasses.dualLeft].join(' ')}>
                {props.totalItems
                    ? <p className='one-line'>Cart Subtotal ({totalItems} {itemString}): ${total}</p>
                    : null
                }
                
                {/*<p className='one-line'>Add $5.21 to get FREE U.S. Shipping</p>*/}
            </div>
            <div className={[myClasses.dualBtn, myClasses.dualRight].join(' ')}>
                {props.view
                    ? <button  className='btn-primary btn one-line' onClick={props.view}>{props.viewTitle}</button>
                    : null
                }
                {props.totalItems 
                    ?<button  className='btn-primary btn one-line' onClick={props.checkout}>{
                        props.isAuth !== null
                        ? 'Checkout'
                        :'Sign in to Order'}
                    </button>
                    :null
                }
            </div>
        </div>
    );
    return header;
};

CheckoutHeader.propTypes={
    totalItems: PropTypes.number,
    total: PropTypes.number,
    view: PropTypes.any,
    viewTitle: PropTypes.any,
    checkout: PropTypes.func,
    isAuth: PropTypes.any,
};

export default CheckoutHeader;
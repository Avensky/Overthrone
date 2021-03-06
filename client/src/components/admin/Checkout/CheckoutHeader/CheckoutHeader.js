import React from 'react'
import myClasses from './CheckoutHeader.module.scss'
const CheckoutHeader = (props) => {
    let itemString = 'item'
    if (props.totalItems>1) {itemString = 'items'}

    const header = (
        <div className={myClasses.dualGrid}>
            <div className={[myClasses.dualBtn, myClasses.dualLeft].join(' ')}>
                <p className='one-line'>Cart Subtotal ({props.totalItems} {itemString}): ${props.total}</p>
                <p className='one-line'>Add $5.21 to get FREE U.S. Shipping</p>
            </div>
            <div className={[myClasses.dualBtn, myClasses.dualRight].join(' ')}>
                <button  className='btn-primary btn one-line' onClick={props.view}>{props.viewTitle}</button>
                <button  className='btn-primary btn one-line' onClick={props.checkout}>{props.isAuth? 'Checkout':'Sign in to Order'}</button>
            </div>
        </div>
    )
    return header
}

export default CheckoutHeader
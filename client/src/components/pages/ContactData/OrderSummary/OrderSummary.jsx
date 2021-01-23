import React from 'react';
import Auxiliary from '../../../../hoc/Auxiliary'
import Button from '../../../UI/Button/Button';


const orderSummary = (props) => {
    const itemsSummary = props.items.map(item=>{
        return (
            <li key={item.id}>
                * <span>{item.title}</span> x {item.quantity}
            </li>);
    });

    return (
        <Auxiliary>
            <h3>Checkout Summary</h3>
            <p>Is this order correct?</p>
            <ul>
                {itemsSummary}
            </ul> 
            <p><strong>Total Price: ${props.total}</strong></p>
            <p>Continue to Checkout?</p>
            <div className="spread">
            <button 
                className={["auth-btn btn"].join(' ')}
                onClick={props.purchaseCancelled}
            >CANCEL</button>
            <button 
                className={["btn-primary btn"].join(' ')}
                onClick={props.purchaseContinued}
            >CONTINUE</button>
            </div>
        </Auxiliary>
    )

};

export default orderSummary;
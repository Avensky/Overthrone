import React, { useState }  from 'react';
import myClasses from './Summary.module.scss';
import Modal from  '../../../UI/Modal/Modal';
// import classes from '../../Pages.module.scss'
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';

const Summary = props => {
    const [unlink, setUnlink] = useState(false);

    const unlinkHandler = () => { setUnlink(true); };

    const cancelHandler = () => { setUnlink(false); };
    const history = useHistory();
    
    // const continueHandler = () => {
    //     const href = props.providerUnlink;
    // }

    return (
        <div className={[myClasses.Card, myClasses.Link].join(' ')}>
            <h3>
                <span> {props.link}</span>
            </h3>
            <div>
                {props.amount_subtotal ? <p>Item(s) Subtotal: {props.amount_subtotal }</p>:null}
                {props.shippingHandling ? <p>Shipping N Handling: {props.shippingHandling }</p>:null}
                {props.tax? <p>Estimated Tax: {props.tax }</p>:null}
                {props.amount_total? <p>Total: {props.amount_total }</p>:null}
      
                { props.name        ? <p>   {props.name}</p>     : null }
                { props.phone       ? <p>Phone:</p>    : null }
                { props.phone       ? <p>   {props.phone}</p>    : null }
                { props.address     ? <p>   {props.address}</p>  : null }
                { props.address2    ? <p>   {props.address2}</p> : null }
                <div className="flex">
                    { props.city        ? <p>{props.city},&nbsp;  </p>    : null }
                    { props.state       ? <p>{props.state}&nbsp;  </p>    : null }
                    { props.zipCode     ? <p>{props.zipCode}&nbsp;</p>  : null }
                </div>
                { props.email       ? <p>   {props.email}</p>    : null }
            </div>
            <br />
        </div>
    );
};

Summary.propTypes = {
    link : PropTypes.string,
    amount_subtotal : PropTypes.string,
    shippingHandling : PropTypes.string,
    tax : PropTypes.string,
    amount_total : PropTypes.string,
    name : PropTypes.string,
    phone : PropTypes.string,
    address : PropTypes.string,
    address2 : PropTypes.string,
    city : PropTypes.string,
    state : PropTypes.string,
    zipCode : PropTypes.string,
    email : PropTypes.string,
};

export default Summary;
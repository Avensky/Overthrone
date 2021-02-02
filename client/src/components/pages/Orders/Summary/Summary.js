import React, { useState }  from 'react';
import myClasses from './Summary.module.scss';
import Modal from  '../../../UI/Modal/Modal';
// import classes from '../../Pages.module.scss'
import {useHistory} from 'react-router-dom'

const Summary = props => {
    const [unlink, setUnlink] = useState(false)

    const unlinkHandler = () => { setUnlink(true) }

    const cancelHandler = () => { setUnlink(false) }
    const history = useHistory()
    
    // const continueHandler = () => {
    //     const href = props.providerUnlink;
    // }

    return (
        <div className={[myClasses.Card, myClasses.Link].join(' ')}>
            <h3>
                <span className={["fa", props.icon, 'my-' + props.mystyle].join(' ')} />
                <span> {props.link}</span>
            </h3>
            <div>
                {props.amount_subtotal ? <p>Item(s) Subtotal: {props.amount_subtotal }<br /></p>:null}
                {props.shippingHandling ? <p>Shipping N Handling: {props.shippingHandling }<br /></p>:null}
                {props.tax? <p>Estimated Tax: {props.tax }<br /></p>:null}
                {props.amount_total? <p>Total: {props.amount_total }<br /></p>:null}
      
                { props.name        ? <p>   {props.name}<br /></p>     : null }
                { props.phone       ? <p>Phone:</p>    : null }
                { props.phone       ? <p>   {props.phone}<br /></p>    : null }
                { props.address     ? <p>   {props.address}<br /></p>  : null }
                { props.address2    ? <p>   {props.address2}<br /></p> : null }
                <div className="flex">
                    { props.city        ? <p>{props.city},&nbsp;  <br /></p>    : null }
                    { props.state       ? <p>{props.state}&nbsp;  <br /></p>    : null }
                    { props.zipCode     ? <p>{props.zipCode}&nbsp;<br /></p>  : null }
                </div>
                { props.email       ? <p>   {props.email}<br /></p>    : null }
            </div>
            <br />
        </div>
    )
}

export default Summary;
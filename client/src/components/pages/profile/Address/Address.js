import React, { useState }  from 'react';
import myClasses from './Address.module.scss';
import Modal from  '../../../UI/Modal/Modal';
// import classes from '../../Pages.module.scss'

const Address = props => {
    const [unlink, setUnlink] = useState(false)

    const unlinkHandler = () => { setUnlink(true) }

    const cancelHandler = () => { setUnlink(false) }

    // const continueHandler = () => {
    //     const href = props.providerUnlink;
    // }

    return (
        <div className={[myClasses.Card, myClasses.Link].join(' ')}>
            <h3>
                <span className={["fa", props.icon, 'my-' + props.mystyle].join(' ')} />
                <span> {props.link}</span>
            </h3>
            <p>
                { props.name        ? <strong>Name:             {props.name}<br /></strong>     : null }
                { props.phone       ? <strong>Phone:            {props.phone}<br /></strong>    : null }
                { props.address     ? <strong>Address:          {props.address}<br /></strong>  : null }
                { props.address2    ? <strong>Address Line 2:   {props.address2}<br /></strong> : null }
                { props.city        ? <strong>City:             {props.city}<br /></strong>     : null }
                { props.state       ? <strong>State:            {props.state}<br /></strong>    : null }
                { props.zipCode     ? <strong>Zip Code:         {props.zipCode}<br /></strong>  : null }
                { props.email       ? <strong>Email:            {props.email}<br /></strong>    : null }
            </p>
            <Modal show={unlink} modalClosed={cancelHandler}>
                <div>
                    <h1>Unlink Account</h1>
                    <p>Are you sure you want to unlink your account?</p>
                    <div className="spread">
                        <a href={props.providerUnlink} className="btn btn-default">Unlink</a>
                        <a onClick={cancelHandler} className="btn btn-danger">Cancel</a>
                    </div>
                </div>
            </Modal>            
        { props.userLink
                ? <a href={props.provider} className={["btn", props.mystyle].join(' ')}>Connect {props.link}</a> 
                : <a onClick={unlinkHandler} className="btn btn-default">Unlink</a>
            }
        </div>
        
    )
}

export default Address;
import React, { useState }  from 'react';
import myClasses from './Address.module.scss';
import Modal from  '../../../UI/Modal/Modal';
// import classes from '../../Pages.module.scss'
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';

const Address = props => {
    const [unlink, setUnlink] = useState(false);

    const unlinkHandler = () => { setUnlink(true); };

    const cancelHandler = () => { setUnlink(false); };
    const history = useHistory();
    const editHandler = () => {
        history.push('/contactData');
    };

    // const continueHandler = () => {
    //     const href = props.providerUnlink;
    // }

    return (
        <div className={[myClasses.Card, myClasses.Link].join(' ')}>
            <h3>
                <span> {props.link}</span>
            </h3>
            <div>
                { props.name        ? <strong>   {props.name}<br /></strong>     : null }
                { props.phone       ? <strong>Phone:</strong>    : null }
                { props.phone       ? <strong>   {props.phone}<br /></strong>    : null }
                { props.address     ? <strong>   {props.address}<br /></strong>  : null }
                { props.address2    ? <strong>   {props.address2}<br /></strong> : null }
                <div className="flex">
                    { props.city        ? <strong>{props.city},&nbsp;  <br /></strong>    : null }
                    { props.state       ? <strong>{props.state}&nbsp;  <br /></strong>    : null }
                    { props.postal_code     ? <strong>{props.postal_code}&nbsp;<br /></strong>  : null }
                </div>
                { props.email       ? <strong>   {props.email}<br /></strong>    : null }
            </div>
            <br />
            <Modal show={unlink} modalClosed={cancelHandler}>
                <div>
                    <h1>Unlink Account</h1>
                    <p>Are you sure you want to unlink your account?</p>
                    <div className="spread">
                        <a onClick={editHandler}href={props.providerUnlink} className="btn btn-default">Edit</a>
                        <a onClick={cancelHandler} className="btn btn-danger">Cancel</a>
                    </div>
                </div>
            </Modal>            
        { props.provider ? <a className={["btn", props.mystyle].join(' ')} onClick={editHandler}>Update {props.link}</a>:null}
        { props.providerUnlink ? <a onClick={unlinkHandler} className="btn btn-default">Edit</a> :null}
        </div>
        
    );
};

Address.propTypes={
    link:PropTypes.string,
    name:PropTypes.string,
    phone:PropTypes.string,
    address:PropTypes.string,
    address2:PropTypes.string,
    city:PropTypes.string,
    state:PropTypes.string,
    postal_code:PropTypes.string,
    email:PropTypes.string,
    providerUnlink:PropTypes.string,
    provider:PropTypes.string,
    mystyle:PropTypes.string,
};

export default Address;
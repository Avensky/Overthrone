import React, { useState } from 'react';
import PropTypes from 'prop-types';
import myClasses from './Link.module.scss';
import Modal from '../../../UI/Modal/Modal';
// import classes from '../../Pages.module.scss'

const Link = (props) => {
  const [unlink, setUnlink] = useState(false);
  const unlinkHandler = () => { setUnlink(true); };
  const cancelHandler = () => { setUnlink(false); };
  // const continueHandler = () => {
  //     const href = props.providerUnlink;
  // }

  return (
    <div className={[myClasses.Card, myClasses.Link].join(' ')}>
      <h3>
        <span className={['fa', props.icon, `my-${props.mystyle}`].join(' ')} />
        <span> {props.link}</span>
      </h3>
      <p>
        { props.name ? <strong>Name:          {props.name}<br /></strong> : null }
        { props.displayName
          ? <strong>Display Name:  {props.displayName}<br /></strong>
          : null }
        { props.username ? <strong>Username:      {props.username}<br /></strong> : null }
        { props.id ? <strong>Id:            {props.id}<br /></strong> : null }
        { props.email ? <strong>Email:         {props.email}<br /></strong> : null }
        { props.token ? <strong>Token:         {props.token}<br /></strong> : null }
        { props.password ? <strong>Password:      {props.password}<br /></strong> : null }
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
      { // props.userLink
      //     ? <a href={props.provider} className={["btn", props.mystyle].join(' ')}>
      // Connect {props.link}</a>
      //     : <a onClick={unlinkHandler} className="btn btn-default">Unlink</a>
      }
    </div>
  );
};

Link.propTypes = {
  icon: PropTypes.any,
  mystyle: PropTypes.any,
  link: PropTypes.any,
  name: PropTypes.any,
  displayName: PropTypes.any,
  username: PropTypes.any,
  id: PropTypes.any,
  email: PropTypes.any,
  token: PropTypes.any,
  password: PropTypes.any,
  providerUnlink: PropTypes.any,
};

export default Link;

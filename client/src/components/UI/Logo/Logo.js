import React from 'react';

import myLogo from '../../../assets/images/logo.png';
import classes from './Logo.module.scss';

const logo = (props) => (
    <div className={classes.Logo} style={{ height: props.height }}>
        <img src={myLogo} alt="logo" />
    </div>
);

export default logo;

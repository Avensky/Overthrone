import React from 'react';

import classes from './SidebarToggle.module.css';

const barToggle = (props) => (
    <div className={classes.BarToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default barToggle;
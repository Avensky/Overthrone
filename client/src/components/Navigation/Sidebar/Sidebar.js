import React from 'react';

import Logo from '../../UI/Logo/Logo';
import NavItems from '../NavItems/NavItems';
import classes from './Sidebar.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary';

const sidebar = ( props ) => {
    let attachedClasses = [classes.Sidebar, classes.Close];
    if (props.open) {
        attachedClasses = [classes.Sidebar, classes.Open];
    }
    return (
        <Auxiliary>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div
                className={attachedClasses.join(' ')} 
                onClick={props.closed}
            >
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </Auxiliary>
    );
};

export default sidebar;
import React from 'react';

import classes from './Navbar.module.css';
import Logo from '../../UI/Logo/Logo';
import NavItems from '../NavItems/NavItems';
import SidebarToggle from '../Sidebar/SidebarToggle/SidebarToggle';
import { NavLink } from 'react-router-dom';

const navbar = ( props ) => (
    <div className={classes.Navbar}>
        <SidebarToggle clicked={props.sidebarToggleClicked} />   
        <div className={[classes.Logo, classes.Mobile].join(' ')}>
            <NavLink  to="/">
                <Logo />    
            </NavLink >
        </div>
        <div className={[classes.MobileLinks, classes.Mobile].join(' ')}>
            <h4>            
                <NavLink  to="/shop/cart">
                    <span className={["fa", "fa-shopping-cart", classes.left].join(' ')}/>    
                </NavLink >
                <NavLink  to="/authentication">
                    <span className={["fa", classes.fa, "fa-user", classes.left].join(' ')}/> 
                </NavLink >
            </h4>
        </div>
        <div className={classes.DesktopOnly}>
            <NavItems isAuthenticated={props.isAuth} />
        </div>
    </div>
);

export default navbar;
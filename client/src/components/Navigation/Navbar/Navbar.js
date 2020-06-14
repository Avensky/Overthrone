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
        <div className= {classes.DesktopOnly}>
            <h1>Overthrone</h1>
        </div>
        <div className={[classes.MobileLinks, classes.Mobile].join(' ')}>
            <h1>            
                <NavLink  to="/shop/cart">
                    <span className={["fa", "fa-shopping-cart", classes.left].join(' ')}/>    
                </NavLink >
                <NavLink  to="/authentication">
                    <span className={["fa", "fa-user", classes.left].join(' ')}/> 
                </NavLink >
            </h1>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavItems isAuthenticated={props.isAuth} />
        </nav>
    </div>
);

export default navbar;
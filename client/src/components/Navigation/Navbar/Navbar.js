import React from 'react';

import classes from './Navbar.module.css';
import Logo from '../../UI/Logo/Logo';
import NavItems from '../NavItems/NavItems';
import SidebarToggle from '../Sidebar/SidebarToggle/SidebarToggle';
import { Link } from 'react-router-dom';

const navbar = ( props ) => (
    <div className={classes.Navbar}>
        <SidebarToggle clicked={props.sidebarToggleClicked} />
        <div className={classes.Logo}>
            <Link to="/">
                <Logo height="100%"/>    
            </Link>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavItems isAuthenticated={props.isAuth} />
        </nav>
    </div>
);

export default navbar;
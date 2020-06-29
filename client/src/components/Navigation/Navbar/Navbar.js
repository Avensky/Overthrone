import React from 'react';
import { connect } from 'react-redux';
import classes from './Navbar.module.css';
import Logo from '../../UI/Logo/Logo';
import NavItems from '../NavItems/NavItems';
import SidebarToggle from '../Sidebar/SidebarToggle/SidebarToggle';
import { NavLink } from 'react-router-dom';

const navbar = ( props ) => (
    <div className={classes.Navbar}>
        <SidebarToggle clicked={props.sidebarToggleClicked} />   
        <div className={[classes.MobileLinks, classes.Mobile].join(' ')}>
            <h2>            
                <NavLink  to="/shop/cart">
                    <span className={["fa", "fa-shopping-cart", classes.left].join(' ')}/> ({props.items.length})
                </NavLink >
                <NavLink  to="/authentication">
                    <span className={["fa", classes.fa, "fa-user", classes.left].join(' ')}/> 
                </NavLink >
            </h2>
            <div className={[classes.Logo, classes.Mobile].join(' ')}>
            <NavLink  to="/">
                <Logo />    
            </NavLink >
        </div>
        </div>
        <div className={classes.DesktopOnly}>
            <NavItems isAuthenticated={props.isAuth} />
        </div>
    </div>
);

const mapStateToProps = state => {
    return {
        addedItems: state.addedItems,
        items: state.cart.addedItems,
    };
};


export default  connect (mapStateToProps, null)(navbar);
import React from 'react';
import myClasses from './Navbar.module.scss';
import classes from '../../pages/Pages.module.scss';
import Logo from '../../UI/Logo/Logo';
import NavItems from '../NavItems/NavItems';
import SidebarToggle from '../Sidebar/SidebarToggle/SidebarToggle';
import { NavLink } from 'react-router-dom';


const navbar = ( props ) => {
    let cart;         
    if (props.items.length>0) {
        cart = (
            <NavLink  to="/cart" className={classes.line}> 
                <span className={["fa", "fa-shopping-cart", classes.left, classes.inline].join(' ')}/>
                <h3 className={classes.inline}>({props.totalItems})</h3>
            </NavLink > 
        )
    }
    return (
        <div className={myClasses.Navbar}>
            <SidebarToggle clicked={props.sidebarToggleClicked} />   
            <div className={[myClasses.MobileLinks, myClasses.Mobile].join(' ')}>
                <h2 className={classes.line}>          
                    {cart}
                    <NavLink  to="/authentication">
                        <span className={["fa", myClasses.fa, "fa-user", myClasses.left].join(' ')}/> 
                    </NavLink >
                </h2>
                <div className={[myClasses.Logo, myClasses.Mobile].join(' ')}>
                <NavLink  to="/">
                    <div className={myClasses.Logo}>
                        <Logo />
                    </div>  
            
                </NavLink >
            </div>
            </div>
            <div className={myClasses.DesktopOnly}>
                <NavItems isAuthenticated={props.isAuth} cart={props.cart}/>
            </div>
        </div>
    )
}


export default navbar;
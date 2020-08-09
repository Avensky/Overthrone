import React from 'react';
import myClasses from './NavItems.module.scss'
import NavItem from './NavItem/NavItem';
import classes from '../../pages/Pages.module.scss';
const navItems = ( props ) => (
    <ul className={myClasses.NavItems}>
        <NavItem link="/books"          exact>Books</NavItem>
        <NavItem link="/authors"        exact>Authors</NavItem>
        <NavItem link="/characters"     exact>Characters</NavItem>
        <NavItem link="/sovereinty"     exact>The Sovereignty</NavItem>
        <NavItem link="/faqs"           exact>FAQs</NavItem>
        <NavItem link="/shop"           exact>Purchase</NavItem>
        {/* <NavItem link="/profile"        exact>Profile</NavItem> */}
        {props.isAuthenticated 
            ? <NavItem link="/profile"          >Profile</NavItem> : null}
        {!props.isAuthenticated
            ? <NavItem link="/authentication"   >Cotact <span>&#8713;</span> Sign-Up</NavItem>
            : <NavItem link="/logout"           >Logout</NavItem>}
        
        {props.cart > 0 
            ? <NavItem  link="/shop/cart" myClass={classes.line}>
                <span className={["fa", myClasses.fa, "fa-shopping-cart", classes.inline].join(' ')}/>
                <p className={classes.inline}>({props.cart})</p>
                </NavItem > : null
        }
        

    </ul>
);

export default navItems;
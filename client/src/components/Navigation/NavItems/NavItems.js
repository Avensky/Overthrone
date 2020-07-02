import React from 'react';
import classes from './NavItems.module.scss'
import NavItem from './NavItem/NavItem';

const navItems = ( props ) => (
    <ul className={classes.NavItems}>
        <NavItem link="/books"          exact>Books</NavItem>
        <NavItem link="/authors"        exact>Authors</NavItem>
        <NavItem link="/characters"     exact>Characters</NavItem>
        <NavItem link="/sovereinty"     exact>The Sovereignty</NavItem>
        <NavItem link="/faqs"           exact>FAQs</NavItem>
        <NavItem link="/shop"           exact>Purchase</NavItem>
        <NavItem link="/profile"        exact>Profile</NavItem>
        {props.isAuthenticated 
            ? <NavItem link="/profile"          >Profile</NavItem> : null}
        {!props.isAuthenticated
            ? <NavItem link="/authentication"   >Cotact <span>&#8713;</span> Sign-Up</NavItem>
            : <NavItem link="/logout"           >Logout</NavItem>}
        <NavItem  link="/shop/cart">
            <span className={["fa", classes.fa, "fa-shopping-cart", classes.left].join(' ')}/>
        </NavItem >

    </ul>
);

export default navItems;
import React from 'react';

import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';

const navItems = ( props ) => (
    <ul className={classes.NavItems}>
        <NavItem link="/books" exact>Books</NavItem>
        <NavItem link="/authors" exact>Authors</NavItem>
        <NavItem link="/characters" exact>Characters</NavItem>
        <NavItem link="/sovereinty" exact>The Sovereinty</NavItem>
        <NavItem link="/faqs" exact>FAQs</NavItem>
        <NavItem link="/purchase" exact>Purchase</NavItem>
        {props.isAuthenticated ? <NavItem link="/profile">Profile</NavItem> : null}
        {!props.isAuthenticated
            ? <NavItem link="/authentication">Authenticate</NavItem>
            : <NavItem link="/logout">Logout</NavItem>}
    </ul>
);

export default navItems;
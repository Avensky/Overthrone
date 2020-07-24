import React, { Component }  from 'react';
import { connect } from 'react-redux';
import classes from './Navbar.module.scss';
import Logo from '../../UI/Logo/Logo';
import NavItems from '../NavItems/NavItems';
import SidebarToggle from '../Sidebar/SidebarToggle/SidebarToggle';
import { NavLink } from 'react-router-dom';

class navbar extends Component {
    render () {
        let cart;
            if (this.props.items.length>0) {
                cart = (
                    <NavLink  to="/shop/cart">
                        <span className={["fa", "fa-shopping-cart", classes.left].join(' ')}/>
                    </NavLink >
                )
            }
        return (
            <div className={classes.Navbar}>
                <SidebarToggle clicked={this.props.sidebarToggleClicked} />   
                <div className={[classes.MobileLinks, classes.Mobile].join(' ')}>
                    <h2>          
                        {cart}
                        <NavLink  to="/authentication">
                            <span className={["fa", classes.fa, "fa-user", classes.left].join(' ')}/> 
                        </NavLink >
                    </h2>
                    <div className={[classes.Logo, classes.Mobile].join(' ')}>
                    <NavLink  to="/">
                        <div className={classes.Logo}>
                            <Logo />
                        </div>  
                    </NavLink >
                </div>
                </div>
                <div className={classes.DesktopOnly}>
                    <NavItems isAuthenticated={this.props.isAuth} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        addedItems: state.addedItems,
        items: state.cart.addedItems,
    };
};


export default  connect (mapStateToProps, null)(navbar);
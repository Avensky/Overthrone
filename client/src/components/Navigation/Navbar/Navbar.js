import React, { Component }  from 'react';
import { connect } from 'react-redux';
import myClasses from './Navbar.module.scss';
import classes from '../../pages/Pages.module.scss';
import Logo from '../../UI/Logo/Logo';
import NavItems from '../NavItems/NavItems';
import SidebarToggle from '../Sidebar/SidebarToggle/SidebarToggle';
import { NavLink } from 'react-router-dom';

class navbar extends Component {
    render () {
        let cart;         
        if (this.props.items.length>0) {
            cart = (
                <NavLink  to="/cart" className={classes.line}> 
                    <span className={["fa", "fa-shopping-cart", classes.left, classes.inline].join(' ')}/>
                    <h3 className={classes.inline}>({this.props.totalItems})</h3>
                </NavLink > 
            )
        }
        return (
            <div className={myClasses.Navbar}>
                <SidebarToggle clicked={this.props.sidebarToggleClicked} />   
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
                    <NavItems isAuthenticated={this.props.isAuth} cart={this.props.totalItems}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        addedItems: state.addedItems,
        items: state.cart.addedItems,
        totalItems: state.cart.totalItems,
        isAuth: state.auth.payload
    };
};


export default  connect (mapStateToProps, null)(navbar);
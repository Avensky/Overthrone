import React from 'react';
import { NavLink } from 'react-router-dom';
import myClasses from './Navbar.module.scss';
import classes from '../../pages/Pages.module.scss';
import Logo from '../../UI/Logo/Logo';
import NavItems from '../NavItems/NavItems';
import SidebarToggle from '../Sidebar/SidebarToggle/SidebarToggle';

const navbar = (props) => {
  let cart;
  if (props.cart) {
    cart = (
            <NavLink to="/cart" className={classes.line}>
                <span className={['fa', 'fa-shopping-cart', classes.left, classes.inline].join(' ')}/>
                <h3 className={classes.inline}>({props.cart})</h3>
            </NavLink >
    );
  }
  // let auth;
  // console.log(props.isAuth)
  // if (props.isAuth !== null) {
  //     auth = <div className={myClasses.NavLink}><a  href="/auth/logout">Logout</a></div>
  // } else {
  //     auth = <NavLink  to="/authentication">
  // <span className={["fa", myClasses.fa, "fa-user", myClasses.left].join(' ')}/> </NavLink >
  // }

  return (
        <div className={myClasses.Navbar}>
            <SidebarToggle clicked={props.sidebarToggleClicked} />
            <div className={[myClasses.MobileLinks, myClasses.Mobile].join(' ')}>
                <h2 className={classes.line}>
                    {props.isAuth !== null
                      ? <div className={myClasses.NavItem} onClick={props.logout}>Logout </div>
                      : null}
                    {cart}
                    {props.isAuth !== null
                      ? <NavLink to="/profile" ><h2><span className="fa fa-user" /></h2></NavLink>
                      : <NavLink exact to="/authentication" ><h2><span className="fa fa-sign-in" /></h2></NavLink>}
                </h2>
                <div className={[myClasses.Logo, myClasses.Mobile].join(' ')}>
                    <NavLink to="/">
                        <div className={myClasses.Logo}>
                            <Logo />
                        </div>

                    </NavLink >
                </div>
            </div>
            <div className={myClasses.DesktopOnly}>
                <NavItems isAuthenticated={props.isAuth} cart={props.cart} logout={props.logout}/>
            </div>
        </div>
  );
};

export default navbar;

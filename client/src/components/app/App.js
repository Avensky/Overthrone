import React, { useEffect, Suspense,/*, useCallback, useState*/ 
useState} from 'react';
import { Route, Switch, withRouter} from 'react-router-dom';
import * as actions   from '../../store/actions/index';
import { connect }    from 'react-redux';
import ConnectLocal   from '../pages/connectLocal/connectLocal';
import Profile        from '../pages/profile/Profile';
import Wrapper        from '../Wrapper/Wrapper';
import Books          from '../pages/Books/Books';
import Connect        from '../pages/Connect/Connect';
import Authors        from '../pages/Authors/Authors';
import Characters     from '../pages/Characters/Characters';
import Sovereignty    from '../pages/Sovereignty/Sovereignty';
import Shop           from '../pages/Shop/Shop';
import Details        from '../pages/Shop/Details/Details';
import Cart           from '../pages/Cart/Cart';
import Checkout       from '../pages/Checkout/Success';
import Home           from '../pages/Home/Home';
import Faqs           from '../pages/Faqs/Faqs';
import ContactData    from '../pages/ContactData/ContactData';
import Orders         from '../pages/Orders/Orders';
import './App.scss';
import Auth from  '../pages/Auth/Auth';
import PropTypes      from 'prop-types';

const App = props => {
  const [authRedirectPath, onSetAuthRedirectPath] = useState('/');
  const { shop, data, fetchedUser, loading, submitted, isLoggedIn /*, loading, userLoading*/ } = props;

useEffect(()=> {
  const fetchData = async () => {
    console.log('fetching users...');
    props.onFetchUser();
  };
    if ( !fetchedUser){fetchData();}
  }, [fetchedUser]);

  // useEffect(()=> {
  //     if ( isLoggedIn && (authRedirectPath !== '/profile') ) {
  //         onSetAuthRedirectPath()
  //     }
  // }, [authRedirectPath, onSetAuthRedirectPath, submitted])

  let routes = (
    <Switch>
      <Route path="/checkout"             component={Checkout} />
      <Route exact path="/authentication"       render={props => <Auth {...props} />} />
      <Route exact path="/authentication/api/v1/users/resetPassword/:token"       
                                          render={props => <Auth {...props} />} />
      <Route path="/books"                component={Books} />
      <Route path="/authors"              component={Authors} />
      <Route path="/characters"           component={Characters} />
      <Route path="/sovereignty"          component={Sovereignty} />
      <Route path="/faqs"                 component={Faqs} />
      <Route path="/shop"                 component={Shop} />
      <Route path="/home"                 component={Home} />          
      <Route path="/cart"                 component={Cart} />                
      <Route path='/details/:id'    exact component={Details} />
      <Route path="/"                     component={Books}  />                
    </Switch>
  );

  if (props.fetchedUser) {
    if (props.fetchedUser.role === 'admin') {
      routes = (
        <Switch>
          <Route path="/orders"               component={Orders} />
          <Route path="/checkout"             component={Checkout} />
          <Route path="/authentication"       render={props => <Auth {...props} />} />
          <Route path="/authentication/api/v1/users/resetPassword/:token"       render={props => <Auth {...props} />} />
          <Route path="/contactData"          component={ContactData} />
          <Route path="/books"                component={Books} />
          <Route path="/authors"              component={Authors} />
          <Route path="/characters"           component={Characters} />
          <Route path="/sovereignty"          component={Sovereignty} />
          <Route path="/faqs"                 component={Faqs} />
          <Route path="/shop"                 component={Shop} />
          <Route path="/home"                 component={Home} />          
          <Route path="/cart"                 component={Cart} />                
          <Route path='/details/:id'    exact component={Details} />
          <Route path="/profile/"             component={Profile} />
          <Route path="/connect"              component={Connect} />
          <Route path="/connectLocal"         component={ConnectLocal} />
          <Route path="/"                     component={Books} />             
        </Switch>
      );
    } else {

    routes = (
      <Switch>
        <Route path="/orders"               component={Orders} />
        <Route path="/checkout"             component={Checkout} />
        <Route path="/authentication"       render={props => <Auth {...props} />} />
        <Route path="/contactData"          component={ContactData} />
        <Route path="/books"                component={Books} />
        <Route path="/authors"              component={Authors} />
        <Route path="/characters"           component={Characters} />
        <Route path="/sovereignty"          component={Sovereignty} />
        <Route path="/faqs"                 component={Faqs} />
        <Route path="/shop"                 component={Shop} />
        <Route path="/home"                 component={Home} />          
        <Route path="/cart"                 component={Cart} />                
        <Route path='/details/:id'    exact component={Details} />
        <Route path="/profile/"             component={Profile} />
        <Route path="/connect"              component={Connect} />
        <Route path="/connectLocal"         component={ConnectLocal} />
        <Route path="/"                     component={Books} />             
      </Switch>
    );
    }
  }

  return( 
    <Wrapper><Suspense fallback={<p>Loading...</p>}>{routes}</Suspense></Wrapper>
  );
};

const mapStateToProps = state => {
  return {
    isLoggedIn        : state.auth.user,
    loading           : state.auth.loading,
    userLoading       : state.auth.userLoading,
    fetchedUser       : state.auth.user,
    submitted         : state.auth.submitted,
    data              : state.auth.addressData,
    error              : state.auth.error,
    authRedirectPath  : state.auth.authRedirectPath,
    shop              : state.shop.items,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addQuantity         : (id)  =>{ dispatch(actions.addQuantity(id));},
    onFetchUser           : () => dispatch(actions.fetchUser()),
    onSetAuthRedirectPath : () => dispatch(actions.setAuthRedirectPath('/profile')),
    getItems              : ()  =>{ dispatch(actions.getItems());},
  };
};

App.propTypes = {
  shop: PropTypes.array,
  data: PropTypes.any,
  fetchedUser: PropTypes.any,
  loading: PropTypes.bool,
  submitted: PropTypes.bool,
  isLoggedIn: PropTypes.any,
  onFetchUser: PropTypes.func,
};

export default withRouter( 
  connect( 
    mapStateToProps, 
    mapDispatchToProps 
  )(App) 
);

import React, { useEffect, Suspense,/*, useCallback, useState*/ 
useState} from 'react'
import { Route, Switch, withRouter} from 'react-router-dom'
import * as actions   from '../../store/actions/index'
import { connect }    from 'react-redux'
import ConnectLocal   from '../pages/connectLocal/connectLocal'
import Profile        from '../pages/profile/Profile'
import Signup         from '../pages/signup/Signup'
import Wrapper        from '../Wrapper/Wrapper'
import Books          from '../pages/Books/Books'
import Connect        from '../pages/Connect/Connect'
import Authors        from '../pages/Authors/Authors'
import Characters     from '../pages/Characters/Characters'
import Sovereignty    from '../pages/Sovereignty/Sovereignty'
import Shop           from '../pages/Shop/Shop'
import ShopAdmin      from '../admin/Shop/ShopAdmin'
import Details        from '../pages/Shop/Details/Details'
import Cart           from '../pages/Cart/Cart'
import Checkout       from '../pages/Checkout/Success'
import Home           from '../pages/Home/Home'
import Faqs           from '../pages/Faqs/Faqs'
import CharacterList  from '../pages/Characters/CharacterList/CharacterList'
import ContactData   from '../pages/ContactData/ContactData'
import Orders         from '../pages/Orders/Orders'
import './App.scss'

// const Auth = React.lazy(() => {
//   return import('../pages/Auth/Auth');
// });
// <Route path="/authentication"      render={props => <Auth {...props} />} />

import Auth from  '../pages/Auth/Auth'

const App = props => {
  const [authRedirectPath, onSetAuthRedirectPath] = useState('/')
  const { shop, data, fetchedUser, loading, submitted, isLoggedIn /*, loading, userLoading*/ } = props

useEffect(()=> {
  const fetchData = async () => {props.onFetchUser()}
    if ( !fetchedUser){fetchData()}
  }, [fetchedUser])

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
      <Route path="/signup"               component={Signup} />
      <Route path="/books"                component={Books} />
      <Route path="/authors"              component={Authors} />
      <Route path="/characters"           component={Characters} />
      <Route path="/sovereignty"          component={Sovereignty} />
      <Route path="/faqs"                 component={Faqs} />
      <Route path="/shop"                 component={Shop} />
      <Route path="/home"                 component={Home} />          
      <Route path="/cart"                 component={Cart} />                
      <Route path='/details/:id'    exact component={Details} />
      <Route path='/CharacterList/' exact component={CharacterList} />   
      <Route path="/"                     component={Books}  />                
    </Switch>
  )

  if (props.fetchedUser) {
    if (props.fetchedUser.role === 'admin') {
      routes = (
        <Switch>
          <Route path="/orders"               component={Orders} />
          <Route path="/checkout"             component={Checkout} />
          <Route path="/authentication"       render={props => <Auth {...props} />} />
          <Route path="/authentication/api/v1/users/resetPassword/:token"       render={props => <Auth {...props} />} />
          <Route path="/contactData"          component={ContactData} />
          <Route path="/signup"               component={Signup} />
          <Route path="/books"                component={Books} />
          <Route path="/authors"              component={Authors} />
          <Route path="/characters"           component={Characters} />
          <Route path="/sovereignty"          component={Sovereignty} />
          <Route path="/faqs"                 component={Faqs} />
          <Route path="/shop"                 component={Shop} />
          <Route path="/shopAdmin"            component={ShopAdmin} />
          <Route path="/home"                 component={Home} />          
          <Route path="/cart"                 component={Cart} />                
          <Route path='/details/:id'    exact component={Details} />
          <Route path='/CharacterList/' exact component={CharacterList} />
          <Route path="/profile/"             component={Profile} />
          <Route path="/connect"              component={Connect} />
          <Route path="/connectLocal"         component={ConnectLocal} />
          <Route path="/"                     component={Books} />             
        </Switch>
      )
    } else {

    routes = (
      <Switch>
        <Route path="/orders"               component={Orders} />
        <Route path="/checkout"             component={Checkout} />
        <Route path="/authentication"       render={props => <Auth {...props} />} />
        <Route path="/contactData"          component={ContactData} />
        <Route path="/signup"               component={Signup} />
        <Route path="/books"                component={Books} />
        <Route path="/authors"              component={Authors} />
        <Route path="/characters"           component={Characters} />
        <Route path="/sovereignty"          component={Sovereignty} />
        <Route path="/faqs"                 component={Faqs} />
        <Route path="/shop"                 component={Shop} />
        <Route path="/home"                 component={Home} />          
        <Route path="/cart"                 component={Cart} />                
        <Route path='/details/:id'    exact component={Details} />
        <Route path='/CharacterList/' exact component={CharacterList} />
        <Route path="/profile/"             component={Profile} />
        <Route path="/connect"              component={Connect} />
        <Route path="/connectLocal"         component={ConnectLocal} />
        <Route path="/"                     component={Books} />             
      </Switch>
    )
    }
  }

  return( 
    <Wrapper><Suspense fallback={<p>Loading...</p>}>{routes}</Suspense></Wrapper>
  )
}

const mapStateToProps = state => {
  return {
    isLoggedIn        : state.auth.user,
    loading           : state.auth.loading,
    userLoading       : state.auth.userLoading,
    fetchedUser       : state.auth.payload,
    submitted         : state.auth.submitted,
    data              : state.auth.addressData,
    error              : state.auth.error,
    authRedirectPath  : state.auth.authRedirectPath,
    shop              : state.shop.items,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddToCart         : (addedItems, total, totalItems)  =>{ dispatch(actions.addToCart(addedItems, total, totalItems))},
    onFetchUser           : () => dispatch(actions.fetchUser()),
    onSetAuthRedirectPath : () => dispatch(actions.setAuthRedirectPath('/profile')),
    getItems              : ()  =>{ dispatch(actions.getItems())},
  };
};

export default withRouter( 
  connect( 
    mapStateToProps, 
    mapDispatchToProps 
  )(App) 
);

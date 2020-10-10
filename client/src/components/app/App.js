import React, { useEffect, Suspense } from 'react'
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
import Details        from '../pages/Shop/Details/Details'
import Cart           from '../pages/Cart/Cart'
import Home           from '../pages/Home/Home'
import Faqs           from '../pages/Faqs/Faqs'
import CharacterList  from '../pages/Characters/CharacterList/CharacterList'
import './App.scss'

// const Auth = React.lazy(() => {
//   return import('../pages/Auth/Auth');
// });
// <Route path="/authentication"      render={props => <Auth {...props} />} />

import Auth from  '../pages/Auth/Auth'
const App = props => {
  const { authRedirectPath, onSetAuthRedirectPath, submitted, isLoggedIn } = props
  useEffect(()=> {
    if (!isLoggedIn && submitted){
        props.onFetchUser();
    }
  }, [authRedirectPath, onSetAuthRedirectPath, submitted])

  useEffect(()=> {
      if ( authRedirectPath !== '/profile' ) {
          onSetAuthRedirectPath()
      }
  }, [authRedirectPath, onSetAuthRedirectPath])
    


  let routes = (
    <Switch>
      <Route path="/authentication"       component={Auth} />
      <Route path="/connectLocal"         component={ConnectLocal} />
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
    routes = (
      <Switch>
        <Route path="/authentication"      render={props => <Auth {...props} />} />
        
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
        <Route path="/connectlocal"         component={Connect} />
        <Route path="/"                     component={Books} />             
      </Switch>
    )
  }

  return( 
    <Wrapper><Suspense fallback={<p>Loading...</p>}>{routes}</Suspense></Wrapper>
  )
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.user,
    fetchedUser: state.auth.payload,
    submitted: state.auth.submitted,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchUser     : () => dispatch(actions.fetchUser()),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
  };
};

export default withRouter( 
  connect( 
    mapStateToProps, 
    mapDispatchToProps 
  )(App) 
);

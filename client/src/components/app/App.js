import React, { useEffect, Suspense, useCallback, useState } from 'react'
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
import useHttp        from '../../hooks/http'
import axios          from 'axios'
import * as actionTypes from '../../store/actions/actionTypes'

// const Auth = React.lazy(() => {
//   return import('../pages/Auth/Auth');
// });
// <Route path="/authentication"      render={props => <Auth {...props} />} />

import Auth from  '../pages/Auth/Auth'
const App = props => {
  
  const { authRedirectPath, onSetAuthRedirectPath, submitted, isLoggedIn, loading, userLoading, fetchedUser } = props
  const [data, setData] 
  = useState({ hits: [] });
  // const {isLoading, error, data, sendRequest, reqExtra, reqIdentifier, clear } = useHttp();

//  useEffect(()=> {
//    const fetchData = async () => {
//      const result = await axios('/api/fetchUser')
//      .then( res => {
//          console.log(res)
//          setData(res.data);
//      })
//      .catch( error => {
//        console.log(error)
//        setData(error.data);
//      });
//    };
//    fetchData()
//  }, [])
  useEffect(()=> {
    const fetchData = async () => {
      props.onFetchUser()
    };
    if ( !isLoggedIn  ){
      fetchData()
    }
  }, [submitted])
  
  useEffect(()=> {
      if ( isLoggedIn && (authRedirectPath !== '/profile') ) {
          onSetAuthRedirectPath()
      }
  }, [authRedirectPath, onSetAuthRedirectPath, submitted])
    
  // const fetchUserHandler = useCallback( () => {
  //   sendRequest(
  //     '/api/fetchUser',
  //     'GET',
  //   );
  // }, [sendRequest]);

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
    isLoggedIn        : state.auth.user,
    loading           : state.auth.loading,
    userLoading       : state.auth.userLoading,
    fetchedUser       : state.auth.payload,
    submitted         : state.auth.submitted,
    authRedirectPath  : state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchUser     : () => dispatch(actions.fetchUser()),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/profile')),
  };
};

export default withRouter( 
  connect( 
    mapStateToProps, 
    mapDispatchToProps 
  )(App) 
);

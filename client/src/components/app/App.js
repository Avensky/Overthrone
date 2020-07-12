import React, { Component } from 'react';
import './App.scss';
import { Route, Switch, withRouter} from 'react-router-dom';
import * as actions   from '../../store/actions/index';
import { connect }    from 'react-redux';
import ConnectLocal   from '../pages/connectLocal/connectLocal';
import Auth           from '../pages/Auth/Auth';
// import Login          from '../pages/login/Login';
import Profile        from '../pages/profile/Profile';
import Signup         from '../pages/signup/Signup';
import Wrapper        from '../Wrapper/Wrapper';
import Layout         from '../Layout/Layout';
import Books          from '../pages/Books/Books';
import Authors        from '../pages/Authors/Authors';
import Characters     from '../pages/Characters/Characters';
import Sovereinty     from '../pages/Sovereinty/Sovereinty';
import Faqs           from '../pages/Faqs/Faqs';
import Shop           from '../pages/Shop/Shop';
//import ItemFull       from '../pages/Shop/ItemFull/ItemFull';
import Details        from '../pages/Shop/Details/Details';
// import Items          from '../pages/Shop/Items/Items';
import Cart           from '../pages/Cart/Cart';
import Home           from '../pages/Home/Home';
// import CharacterEdit  from '../pages/Characters/CharacterEdit/CharacterEdit';
import CharacterList from '../pages/Characters/CharacterList/CharacterList';

class App extends Component {
  state = {
    loggedIn: false,
    username: null
  }

  componentDidMount () {
      this.props.onFetchUser();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/connectLocal"         component={ConnectLocal} />
        <Route path="/authentication"       component={Auth} />
        <Route path="/signup"               component={Signup} />
        <Route path="/books"                component={Books} />
        <Route path="/authors"              component={Authors} />
        <Route path="/characters"           component={Characters} />
        <Route path="/sovereinty"           component={Sovereinty} />
        <Route path="/faqs"                 component={Faqs} />
        <Route path="/shop"                 component={Shop} />
        <Route path="/home"                 component={Home} />          
        <Route path="/cart"                 component={Cart} />                
        <Route path="/profile"              component={Profile} />
        <Route path='/details/:id'          exact component={Details} />
        <Route path='/CharacterList/'    exact component={CharacterList} />
        <Route path="/"                 component={Home}  />      
        {/* <Redirect to="/home" />  */}              
      </Switch>
    );

    // if (this.props.fetchedUser) {
    //   routes = (
    //     <Swi/tch>
    //       <Route path="/connect-local"    component={connect-local} />
    //       <Route path="/index"            component={index}  />
    //       <Route path="/logout"           component={Login} />
    //       <Route path="/profile"          component={profile}  />
    //       <Route path="/signup"           component={signup} />
    //       <Route path="/"                 component={index}  />
    //       {/* <Redirect to="/home" /> */}              
    //     </Switch>
    //   )

    return( 
      <Wrapper>
        <Layout>
          {routes}
        </Layout>
      </Wrapper>
    )
    
  }
}


const mapStateToProps = state => {
  return {
    fetchedUser: state.auth.payload
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetCharacters : () => dispatch( actions.getCharacters()),
    onFetchUser     : () => dispatch(actions.fetchUser()),
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );

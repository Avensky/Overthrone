import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Auxiliary from '../../../hoc/Auxiliary';
import classes from '../Pages.module.css';
import myClasses from './Shop.module.css';
import Items from './Items/Items';
import ItemFull from './ItemFull/ItemFull';
import Cart from '../Cart/Cart';
import * as actions from '../../../store/actions/index';
// import Details from './Details/Details';

class Purchase extends Component {
    render () {

        return(
            <Auxiliary>
                <div className="container">
                    <div className={['page-header', 'text-center', classes.spread].join(' ')}>
                        <a href='/shop' ><h1>Shop</h1></a>
                    </div>
                </div>   
                <div className={[classes.Card, myClasses.Shop].join(' ')}>
                    {this.props.children}
                <Switch>
                    <Route path="/shop" exact component={Items} />
                    <Route path="/shop/cart" exact component={Cart} />
                    <Route path="/shop/itemfull/:id"   exact   component={ItemFull} />
                    <Route render={() => <h1>Not found</h1>}/>
                    {/* <Redirect from="/" to="/posts" /> */}
                    {/* <Route path="/" component={Posts} /> */}
                </Switch>
                </div>
            </Auxiliary>
        )
    }
}

const mapStateToProps = state => {
    return {
//        items: state.cart.items
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addToCart: ( id ) => { dispatch( actions.addToCart( id ) ) }
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Purchase);
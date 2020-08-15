import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Route, Switch } from 'react-router-dom';
import Auxiliary from '../../../hoc/Auxiliary';
import classes from '../Pages.module.scss';
import myClasses from './Shop.module.scss';
//import Items from './Items/Items'
import Item from './Items/Item/Item'
//import ItemFull from './ItemFull/ItemFull';
//import Cart from '../Cart/Cart';
import * as actions from '../../../store/actions/index';
// import Details from './Details/Details';
import Search from '../../Search/Search';

class Purchase extends Component {
    state = {
        items : []
    }

    componentDidMount () {
        //console.log( this.props );
        //const items = this.props.items.slice( 0, 4 );
        //const updatedItems = items.map( item => {
        //    return {
        //        ...item,
        //    }
        //} );
        //this.setState({ items: updatedItems })
        //console.log( this.state.items );
    }

    componentDidUpdate () {

    }

    handleClick = ( id ) => {
        this.props.addToCart(id); 
//        this.props.history.push('/shop/itemfull/' + id);
    }

    render () {
        let items = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
        if ( !this.state.error ) {
            //items = this.props.items.slice( 0, 4 );
            items = this.props.items.slice( 0, 4 ).map( item => {
                return(
                    <Item
                        img         = {item.img}
                        id          = {item.id}
                        key         = {item.id}
                        alt         = {item.title}
                        title       = {item.title}
                        link        = {"/shop/"}
                        to          = "/"
                        clicked     = {() => this.handleClick(item.id)}
                        desc        = {item.desc}
                        price       = {item.price}
                        quantity    = {item.quantity}
                    />
                )
            })
        }

        return(
            <Auxiliary>
                <div className='container'>
                    <div className={['page-header', 'text-center'].join(' ')}>
                        <a href='/shop' ><h2>Shop</h2></a>
                    </div>
                </div>

                <div className={[classes.Card, myClasses.Shop].join(' ')}>
                <div className={classes.spread}>
                    {/* <input className={myClasses.Search} type='text' placeholder="search the store" /> */}
                    <Search />
                    <div className={myClasses.dropdown}>
                        <button className={myClasses.dropbtn}>OrderBy: </button>
                        <div className={myClasses.dropdownContent}>
                            <a href="/price">Price</a>
                            <a href="/date">Most recent</a>
                            <a href="/popular">Most Popular</a>
                        </div>
                    </div>
                </div>
                <div className={myClasses.filter}>
                    <label><p>All</p></label>
                    <label><p>Books</p></label>
                    <label><p>Apparel</p></label>
                    <label><p>Hats</p></label>
                    <label><p>Misc</p></label>
                </div>
                <div className={myClasses.Items}>
                    <div className={['box', myClasses.Items ].join(' ')}>
                        {items}
                    </div>
                </div>


                    
                    {/*
                    {this.props.children}
                    <Switch>
                        <Route path="/shop" exact component={Items} />
                        <Route path="/shop/cart" exact component={Cart} />
                        <Route path="/shop/itemfull/:id"   exact component={ItemFull} />
                        <Route render={() => <h1>Not found</h1>}/>
                        <Redirect from="/" to="/posts" />
                        <Route path="/" component={Posts} />
                    </Switch>
                    */}
                </div>
            </Auxiliary>
        )
    }
}

const mapStateToProps = state => {
    return {
        items       : state.cart.items,
        addedItems  : state.cart.addedItems,
        totalItems  : state.cart.totalItems
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addToCart: ( id ) => { dispatch( actions.addToCart( id ) ) }
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Purchase);
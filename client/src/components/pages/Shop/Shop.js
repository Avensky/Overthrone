import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// import { Route, Switch } from 'react-router-dom';
// import Auxiliary from '../../../hoc/Auxiliary';
import classes from '../Pages.module.scss';
import myClasses from './Shop.module.scss';
// import Items from './Items/Items'
import Item from './Items/Item/Item'
// import ItemFull from './ItemFull/ItemFull';
// import Cart from '../Cart/Cart';
import * as actions from '../../../store/actions/index';
// import Details from './Details/Details'

const Purchase = props => {
    let [cart, setCart] = useState([])
    let localCart = localStorage.getItem("cart")
    
    const handleClick = ( id ) => {
        props.addToCart(id); 
//        props.history.push('/shop/itemfull/' + id);
    }

    let items = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
    if ( props.items ) {
        //items = props.items.slice( 0, 4 );
        items = props.items.slice( 0, 4 ).map( item => {
            return(
                <Item
                    img         = {item.img}
                    id          = {item.id}
                    key         = {item.id}
                    alt         = {item.title}
                    title       = {item.title}
                    link        = {"/shop/"}
                    to          = "/"
                    clicked     = {() => handleClick(item.id)}
                    desc        = {item.desc}
                    price       = {item.price}
                    quantity    = {item.quantity}
                />
            )
        })
    }

    useEffect(() => {
        //turn into js
        localCart = JSON.parse(localCart);
        //load persisted cart ino state if it exists
        if (localCart) localStorage.setItem("cart", localCart)
    }, []) //only run once
    return(
        <div className={[classes.Card, myClasses.Shop].join(' ')}>
            <div className='container'>
                <div className={['page-header', 'text-center'].join(' ')}>
                    <a href='/shop' ><h1>Shop</h1></a>
                </div>
            </div>
        <div className={classes.spread}>
            {/* <input className={myClasses.Search} type='text' placeholder="search the store" /> */}
            <div className={myClasses.dropdown}>
                <button className={myClasses.dropbtn}>OrderBy: </button>
                <div className={myClasses.dropdownContent}>
                    <a href="/">Price</a>
                    <a href="/">Most recent</a>
                    <a href="/">Most Popular</a>
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
        </div>
    )
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
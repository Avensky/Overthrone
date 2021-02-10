import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// import Auxiliary from '../../../hoc/Auxiliary';
import classes from '../Pages.module.scss';
import myClasses from './Shop.module.scss';
import Item from './Items/Item/Item'
import * as actions from '../../../store/actions/index';
// import NewItem from './NewItem/NewItem'
import {useHistory} from 'react-router-dom'

const Purchase = props => {
    useEffect(() => {
        const getItems = async () => { props.getItems() }
        if ( props.items.length === 0){ 
            console.log('Fetching Items')
            getItems() 
        }
    }, [])

    const addToCart = (id) => {props.addToCart(id)}
    let myShop 
    if(props.shop){ 
        myShop = props.shop.map( item => {
        return( 
            <Item
                image       = {item.imageData}
                key         = {item._id}
                id          = {item._id}
                alt         = {item.title}
                title       = {item.title}
                link        = {"/shop/"}
                to          = "/"
                clicked     = {() => addToCart(item._id)}
                desc        = {item.desc}
                price       = {item.price}
                quantity    = {item.amount||0}
                add         = {true}
            />
        )
    })}
      

    const history = useHistory()
    const purchaseHandler = () => {
        (props.isAuth) ? history.push('/cart') : history.push('/authentication')
    }

    const viewCartHandler = () => {history.push('/cart')}
    const checkoutHandler = () => {history.push('/')}
    let addedItems = props.addedItems
    let itemString = 'item'
    if (addedItems.length>1) {
        itemString = 'items'
    }
    let button
    if (addedItems.length > 0){
        button = (
            props.isAuth 
                ? (
                <div className={myClasses.dualGrid}>
                    <div className={[myClasses.dualBtn, myClasses.dualLeft].join(' ')}>
                        <p className='one-line'>Cart Subtotal ({props.totalItems} {itemString}): ${props.total}</p>
                        <p className='one-line'>Add $5.21 to get FREE U.S. Shipping</p>
                    </div>
                    <div className={[myClasses.dualBtn, myClasses.dualRight].join(' ')}>
                        <button  className='btn-primary btn one-line' onClick={viewCartHandler}>View Cart</button>
                        <button  className='btn-primary btn one-line' onClick={checkoutHandler}>Checkout</button>
                    </div>
                </div>
                )
                : (
                <div className={myClasses.dualGrid}>
                    <div className={[myClasses.dualBtn, myClasses.dualLeft].join(' ')}>
                        <p className='one-line'>Cart Subtotal ({props.totalItems} {itemString}): ${props.total}</p>
                        <p className='one-line'>Add $5.21 to get FREE U.S. Shipping</p>
                    </div>
                    <div className={[myClasses.dualBtn, myClasses.dualRight].join(' ')}>
                        <button  className='btn-primary btn one-line' onClick={viewCartHandler}>View Cart</button>
                        <button  className='btn-primary btn one-line' onClick={purchaseHandler}>Sign in to Order</button>
                    </div>
                </div>
                ) 
        )
    }   
    return(
        <div className={[classes.Card, myClasses.Shop].join(' ')}>
            {/* Title */}
            <div className="container">
                <div className="page-header text-center">
                    <h1><a href='/shop'>Shop</a></h1>
                </div>
            </div>
            {/*
                <NewItem />
                
            */}
            {/*
            <div className='container'>
                <div className={['page-header', 'text-center'].join(' ')}>
                    <a href='/shop' ><h1>Shop</h1></a>
                </div>
            </div>
            <div className={classes.spread}>
            */}
                {/* <input className={myClasses.Search} type='text' placeholder="search the store" /> */}
            {/*
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
            */}
            <div className={myClasses.Items}>
                <div className={['box', myClasses.Items ].join(' ')}>
                    {myShop}
                    {button}
                </div>
            </div>
        </div>
    )
} 


const mapStateToProps = state => {
    return {
        addedItems  : state.cart.addedItems,
        totalItems  : state.cart.totalItems,
        items       : state.cart.items,
        total       : state.cart.total,
        shop        : state.cart.shop,
        isAuth      : state.auth.payload
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addToCart           : (id)   =>{ dispatch(actions.addToCart(id))},
        getItems            : ()     =>{ dispatch(actions.getItems())},
        loadCart            : (cart) =>{ dispatch(actions.loadCart(cart))},
        // getItems            : ()     =>{ dispatch(actions.getItems())},
        // removeItem          : (id)=>{dispatch(actions.removeItem(id))},
        // addQuantity         : (id)=>{dispatch(actions.addQuantity(id))},
        // subtractQuantity    : (id)=>{dispatch(actions.subtractQuantity(id))}
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Purchase);
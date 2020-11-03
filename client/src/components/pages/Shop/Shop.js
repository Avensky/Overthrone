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

    const handleAddToCart = ( id ) => {
        props.addToCart(id); 
    }
    
    const handleClick = ( id ) => {
        props.addToCart(id);
        //look for item in cart array
        let item = props.items.find(item => item.id === id);
        addItem(item)
//        props.history.push('/shop/itemfull/' + id);
    }

    const addItem = (item) => {
        //create a copy of our cart state, avoid overwritting existing state
        let cartCopy = [...cart];
        
        //assuming we have an ID field in our item
        let {ID} = item;
        
        //look for item in cart array
        let existingItem = cartCopy.find(cartItem => cartItem.id == ID);
        
        //if item already exists
        if (existingItem) {
            existingItem.quantity += item.quantity //update item
        } else { //if item doesn't exist, simply add it
          cartCopy.push(item)
        }
        
        //update app state
        setCart(cartCopy)
        
        //make cart a string and store in local space
        let stringCart = JSON.stringify(cartCopy);
        localStorage.setItem("cart", stringCart)
    }

    const editItem = (itemID, amount) => {
        let cartCopy = [...cart]
        
        //find if item exists, just in case
        let existentItem = cartCopy.find(item => item.ID == itemID);
        
        //if it doesnt exist simply return
        if (!existentItem) return
        
        //continue and update quantity
        existentItem.quantity += amount;
        
        //validate result
        if (existentItem.quantity <= 0) {
          //remove item  by filtering it from cart array
          cartCopy = cartCopy.filter(item => item.ID != itemID)
        }
        
        //again, update state and localState
        setCart(cartCopy);
        
        let cartString = JSON.stringify(cartCopy);
        localStorage.setItem('cart', cartString);
    }

    const removeItem = (itemID) => {
        //create cartCopy
        let cartCopy = [...cart]
        
        cartCopy = cartCopy.filter(item => item.ID != itemID);
        
        //update state and local
        setCart(cartCopy);
        
        let cartString = JSON.stringify(cartCopy)
        localStorage.setItem('cart', cartString)
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
        addToCart           : (id)=>{dispatch(actions.addToCart(id))},
        removeItem          : (id)=>{dispatch(actions.removeItem(id))},
        addQuantity         : (id)=>{dispatch(actions.addQuantity(id))},
        subtractQuantity    : (id)=>{dispatch(actions.subtractQuantity(id))}
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Purchase);
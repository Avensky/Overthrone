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
import NewItem from './NewItem/NewItem'

const Purchase = props => {
    let [cart, setCart] = useState([])
    let localCart = localStorage.getItem("cart");
    let items = props.items
    
    console.log('Cart found in local storage ' + localCart)

    useEffect(() => {
        // update initial state for cart reducer
        let cartCopy = '[]'
        if (localCart) { cartCopy = [localCart] }

        console.log('local storage cart = ' + cartCopy)
        
        // parse 
        let parseCart = JSON.parse(cartCopy)
        console.log('local storage parseCart = ' + cartCopy)

        let updatedItems 
        let itemsCopy = items

        let stringInitItems = JSON.stringify(items)
        console.log('inital cart in reducer = ' + stringInitItems)
        // console.log('inital items state = ' + items)

        //items = props.items.slice( 0, 4 );
        updatedItems = itemsCopy.map( obj => parseCart.find(item => item.id === obj.id) || obj)
        
        
        // props.loadCart(initCart)
        // let stringItems = JSON.stringify(updatedItems)
        // console.log('update the inital items state = ' + stringItems)
        // 
        // let parseUpdatedItems = JSON.parse(stringItems)

        props.loadCart(updatedItems)

    }, []) //only run once

    const handleClick = ( id ) => {
        props.addToCart(id);
        //look for item in cart array
        //console.log(props.items)

        let item = props.items.find(item => item.id === id);
        //console.log(item)
        addItem(item)
//        props.history.push('/shop/itemfull/' + id);
    }

    const addItem = (item) => {
        //create a copy of our cart state, avoid overwritting existing state
        let cartCopy = [...cart];
        //console.log("cart = " + JSON.stringify(cartCopy))
        
        //assuming we have an ID field in our item
        let ID = item.id;
        
        //look for item in cart array
        let existingItem = cartCopy.find(cartItem => cartItem.id == ID);
        
        //if item already exists
        if (existingItem) {
            console.log('prev existingItem.quantity = ' + existingItem.quantity)
            // existingItem.quantity++ //update item
            console.log('new existingItem.quantity = ' + existingItem.quantity)
        } else { 
            //if item doesn't exist, simply add it
            cartCopy.push(item)
            console.log('adding new item')
        }
        
        //update app state
        setCart(cartCopy)
        
        //make cart a string and store in local space
        let stringCart = JSON.stringify(cartCopy);
        localStorage.setItem("cart", stringCart)
        console.log('setting local storage= ' + stringCart)
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
        
        // let cartString = JSON.stringify(cartCopy);
        // localStorage.setItem('cart', cartString);
        localStorage.setItem('cart', cartCopy);
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

        //items = props.items.slice( 0, 4 );
        let shop = items.map( item => {
            let cartCopy = '[]'
            let localQuantity = 0;

            if (localCart) {
                cartCopy = [localCart]
            }

            // parse 
            let parseCart = JSON.parse(cartCopy)

            //look for item in cart array
            let localItem = parseCart.find(cartItem => cartItem.id == item.id)

            let stringItem = JSON.stringify(localItem)
            //console.log('stringItem = ' + stringItem)

            if (localItem) {
                localQuantity = localItem.quantity
                //console.log('localQuantity' + localQuantity)
            } 

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
                    quantity    = {localQuantity}
                />
            )
        })
    

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
                <NewItem />
                <div className={['box', myClasses.Items ].join(' ')}>
                    {shop}
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
        loadCart            : (cart)=>{dispatch(actions.loadCart(cart))},
        // removeItem          : (id)=>{dispatch(actions.removeItem(id))},
        // addQuantity         : (id)=>{dispatch(actions.addQuantity(id))},
        // subtractQuantity    : (id)=>{dispatch(actions.subtractQuantity(id))}
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Purchase);
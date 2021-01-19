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
// import NewItem from './NewItem/NewItem'
import Item1 from './images/item1.jpg'
import Item2 from './images/item2.jpg'
import Item3 from './images/item3.jpg'
import Item4 from './images/item4.jpg'
import Item5 from './images/item6.jpg'
import Item6 from './images/item6.jpg'
import {useHistory} from 'react-router-dom'
const Purchase = props => {
    let [localCart, setLocalCart] = useState(localStorage.getItem("cart"))
    let [localAddedItems, setLocalAddedItems] = useState(localStorage.getItem("addedItems"))
    
        // console.log('Cart found in local storage ' + localCart)
    let [items, setItems ]= useState([
        {id:1,title:'Winter body',  desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",   price:110,  img: Item1, quantity: 0 },
        {id:2,title:'Adidas',       desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",   price:80,   img: Item2, quantity: 0 },
        {id:3,title:'Vans',         desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",   price:120,  img: Item3, quantity: 0 },
        {id:4,title:'White',        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",   price:260,  img: Item4, quantity: 0 },
        {id:5,title:'Cropped-sho',  desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",   price:160,  img: Item5, quantity: 0 },
        {id:6,title:'Blues',        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",   price:90,   img: Item6, quantity: 0 }
    ])
    let stringItems = JSON.stringify(items)
    // console.log('items = '+ stringItems)

    let [ addedItems, setAddedItems ] = useState(props.addedItems)
    let stringAddedItems = JSON.stringify(addedItems)
    console.log('addedItems = '+ stringAddedItems)

    let new_items = items.map( obj => addedItems.find(item => item.id === obj.id) || obj)
    let [cart, setCart]= useState(new_items)
    //let stringCart = JSON.stringify(cart)
    //console.log('Cart = '+ stringCart)
    const reducer = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue.quantity * currentValue.price);
    let [ total, setTotal] = useState(props.items.reduce(reducer, 0))
    console.log('total = '+ total)

    let [ totalItems, setTotalItems] = useState(props.totalItems)
    console.log('totalItems = '+ totalItems)

    let [ totalPrice, setTotalPrice ] = useState(0)
    console.log('totalPrice = '+ totalPrice)

    let shop = cart.map( item => {
        return(
            <Item
                img         = {item.img}
                id          = {item.id}
                key         = {item.id}
                alt         = {item.title}
                title       = {item.title}
                link        = {"/shop/"}
                to          = "/"
                clicked     = {() => addToCart(item.id)}
                desc        = {item.desc}
                price       = {item.price}
                quantity    = {item.quantity}
            />
        )
    })

    useEffect(() => {
        let localCartCopy = '[]'
        if (localCart) { localCartCopy = [localAddedItems] }
        // console.log('local storage cart = ' + localCartCopy)

        // parse 
        let parseLocalCart = JSON.parse(localCartCopy)
        // console.log('local storage parseLocalCart = ' + parseLocalCart)
        let itemsCopy = items

        let updatedItems = itemsCopy.map( obj => parseLocalCart.find(item => item.id === obj.id) || obj)
        let stringUpdatedItems= JSON.stringify(updatedItems)
        // console.log('Cart Items cross reference local = ' + stringUpdatedItems)
        setCart(updatedItems)

        let localAddedItemsCopy = addedItems
        let localAddedItemsCopyString =  JSON.stringify(localAddedItemsCopy)
        if (localAddedItems) { 
            localAddedItemsCopy = [localAddedItems] 
            // parse 
            localAddedItemsCopy = JSON.parse(localAddedItemsCopy)
            setAddedItems(localAddedItemsCopy)
            //localAddedItemsCopyString = JSON.stringify(localAddedItemsCopy)
            //console.log('local storage added to addedItems= ' + localAddedItemsCopyString)
            props.addToCart(localAddedItemsCopy)
        }
        // console.log('local storage parseLocalCart = ' + parseLocalCart)
        // let updatedAddedItems = addedItemsCopy.map( obj => parseLocalAddedItems.find(item => item.id === obj.id) || obj)
        // localAddedItemsCopy= JSON.stringify(localAddedItemsCopy)
        setAddedItems(localAddedItemsCopy)
        console.log('local storage added to addedItems= ' + localAddedItemsCopyString)

        let totalItemsQuantity = localAddedItemsCopy.map(item => item.quantity).reduce((prev, curr) => prev + curr, 0);
        console.log('totalItemQuantity = ' + totalItemsQuantity)
        setTotalItems(totalItemsQuantity)

        let totalItemsPrice = localAddedItemsCopy.map(item => item.price*item.quantity).reduce((prev, curr) => prev + curr, 0);
        console.log('totalItemPrice = ' + totalItemsPrice)
        setTotalPrice(totalItemsPrice)
    }, []) //only run once


    const history = useHistory()

    const purchaseHandler = () => {
        if (props.isAuth) {
//            setPurchasing(true)
            history.push('/cart')
        } else {
//            this.props.onSetAuthRedirectPath('/checkout');
            history.push('/authentication');
        }
    }

    const viewCartHandler = () => {
        history.push('/cart')
    }
    const checkoutHandler = () => {
        history.push('/checkout')
    }


    const addToCart= ( id ) => {
        let itemsCopy = cart
        stringItems = JSON.stringify(itemsCopy)
        console.log('stringItems = ' + stringItems)
        console.log('item.id = ' + id)
        let addedItem = itemsCopy.find(item=> item.id === id)
        //check if the action id exists in the addedItems
        //let parseCart = JSON.parse(cartCopy)
        let existed_item= addedItems.find(item=> id === item.id)
        // console.log('local storage parseCart = ' + cartCopy)
        let updatedItems 
        // let stringInitItems = JSON.stringify(items)
        // console.log('inital cart in reducer = ' + stringInitItems)
        // console.log('inital items state = ' + items)
             
        if (existed_item) {
            addedItem.quantity += 1
            let stringAddedItem = JSON.stringify(addedItem)
            console.log('string addedItem = ' + stringAddedItem)
            // updatedItems = itemsCopy.map(obj => [addedItem].find(o => o.id === obj.id) || obj)
            updatedItems = addedItems.map(obj => [addedItem].find(o => o.id === obj.id) || obj)

            //filter 
            let stringUpdatedItems= JSON.stringify(updatedItems)
            console.log('string updatedItems = ' + stringUpdatedItems)
            let myAddedItems = [...addedItems, addedItem]
            let stringMyAddedItems = JSON.stringify(myAddedItems)
            console.log('string MyAddedItems = ' + stringMyAddedItems)
            let myTotal = total + addedItem.price
            setAddedItems(updatedItems)
            //make cart a string and store in local space
            localStorage.setItem("addedItems", stringUpdatedItems)
            // setCart(updatedItems)
            //make cart a string and store in local space
            localStorage.setItem("cart", stringUpdatedItems)
            setTotal(myTotal)

            let totalItemsPrice = updatedItems.map(item => item.price*item.quantity).reduce((prev, curr) => prev + curr, 0);
            console.log('totalItemPrice = ' + totalItemsPrice)
            setTotalPrice(totalItemsPrice)

            let totalItemsQuantity = updatedItems.map(item => item.quantity).reduce((prev, curr) => prev + curr, 0);
            console.log('totalItemQuantity = ' + totalItemsQuantity)
            setTotalItems(totalItemsQuantity)
            props.addToCart(updatedItems, totalItemsPrice, totalItemsQuantity)
        } else {
            addedItem.quantity = 1;
            let stringAddedItem = JSON.stringify(addedItem)
            console.log('string addedItem = ' + stringAddedItem)
            updatedItems = itemsCopy.map(obj => [addedItem].find(o => o.id === obj.id) || obj)
            let stringUpdatedItems= JSON.stringify(updatedItems)
            console.log('string updatedItems = ' + stringUpdatedItems)
            let myAddedItems = [...addedItems, addedItem]
            let stringMyAddedItems = JSON.stringify(myAddedItems)
            console.log('string MyAddedItems = ' + stringMyAddedItems)
            let myTotal = total + addedItem.price
            setAddedItems(myAddedItems)
            //make cart a string and store in local space
            localStorage.setItem("addedItems", stringMyAddedItems)
            setCart(updatedItems)
            //make cart a string and store in local space
            localStorage.setItem("cart", stringUpdatedItems)
            setTotal(myTotal)

            let totalItemsPrice = updatedItems.map(item => item.price*item.quantity).reduce((prev, curr) => prev + curr, 0);
            console.log('totalItemPrice = ' + totalItemsPrice)
            setTotalPrice(totalItemsPrice)

            let totalItemsQuantity = updatedItems.map(item => item.quantity).reduce((prev, curr) => prev + curr, 0);
            console.log('totalItemQuantity = ' + totalItemsQuantity)
            setTotalItems(totalItemsQuantity)
            props.addToCart(myAddedItems, totalItemsPrice, totalItemsQuantity)
        } 
    }
        
    let button = null
    let itemString = 'item'
    if (props.addedItems.length>1) {
        itemString = 'items'
    }
    if (props.addedItems.length > 0){
        button = (
            props.isAuth 
                ? (
                <div className={myClasses.dualGrid}>
                    <div className={myClasses.dualLeft}>
                        <p className='one-line'>Cart Subtotal ({totalItems} {itemString}): ${totalPrice}</p>
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
                    <div className={myClasses.dualLeft}>
                        <p className='one-line'>Cart Subtotal ({totalItems} {itemString}): ${totalPrice}</p>
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
                <div className="page-header text-center border-bottom">
                    <h1>Shop</h1>
                </div>
            </div>
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
                    {button}
                    {shop}
                    {button}
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        items       : state.cart.items,
        addedItems  : state.cart.addedItems,
        totalItems  : state.cart.totalItems,
        shop       : state.shop.items,
        isAuth      : state.auth.payload
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addToCart           : (addedItems, total, totalItems)  =>{ dispatch(actions.addToCart(addedItems, total, totalItems))},
        loadCart            : (cart)                           =>{ dispatch(actions.loadCart(cart))},
        getItems            : ()                               =>{ dispatch(actions.getItems())},
        // removeItem          : (id)=>{dispatch(actions.removeItem(id))},
        // addQuantity         : (id)=>{dispatch(actions.addQuantity(id))},
        // subtractQuantity    : (id)=>{dispatch(actions.subtractQuantity(id))}
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Purchase);
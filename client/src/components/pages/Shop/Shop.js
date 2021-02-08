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
    const { shop } = props
    // local storage
    let [localAddedItems, setLocalAddedItems] = useState(localStorage.getItem("addedItems"))
    console.log('localAddedItems = '+ localAddedItems)
    
    // addedItems
    let [ addedItems, setAddedItems ] = useState(JSON.parse(localAddedItems)||[])
    //if ( localAddedItems && !addedItems ) { setAddedItems(JSON.parse(localAddedItems)) }
  
    let stringAddedItems = JSON.stringify(addedItems)
    console.log('addedItems = '+ stringAddedItems)

    // items
    let [ items, setItems ]= useState([])

    let stringItems = JSON.stringify(items)
    console.log('items = '+ stringItems)

    //let new_items = items.map( obj => addedItems.find(item => item.id === obj.id) || obj)
    //let [cart, setCart]= useState()
    //let stringCart = JSON.stringify(cart)
    //console.log('Cart = '+ stringCart)
    const reducer = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue.quantity * currentValue.price);
    //let [ total, setTotal] = useState(props.items.reduce(reducer, 0))
    let [ total, setTotal] = useState()
    console.log('total = '+ total)

    //let [ totalItems, setTotalItems] = useState(props.totalItems)
    //let [ totalItems, setTotalItems] = useState()
    //console.log('totalItems = '+ totalItems)
    //
    //let [ totalPrice, setTotalPrice ] = useState()
    //console.log('totalPrice = '+ totalPrice)
    //console.log('shop = ' + JSON.stringify(props.shop))

    let myShop 
    if(items){ 
        myShop = items.map( item => {
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
 
    useEffect(() => {
        const fetchData = async () => { props.getItems() }
        if ( items.length === 0){ 
            console.log('fetchingData')
            fetchData() 
        }
    }, [])

    useEffect(()=> {
        let updatedItems, totalItems 
        if (shop) {
            if(addedItems){
                updatedItems = shop.map( obj => addedItems.find(item => item._id === obj._id) || obj)
                console.log('useEffect = ' + updatedItems)

                let myTotal = updatedItems.map(item => item.price*item.quantity).reduce((prev, curr) => prev + curr, 0);
                console.log('totalItemPrice = ' + myTotal)
                setTotal(myTotal)

                totalItems = props.addedItems.reduce((a, b) => a + b.amount, 0)
                console.log('totalItems = '+ totalItems)
                props.onAddToCart(addedItems, myTotal, totalItems)
                return setItems(updatedItems)
            } else {
                return setItems(shop)
            }
        }
    }, [shop])
      
//    useEffect(() => {
//        let localCartCopy = '[]'
//        if (localCart) { localCartCopy = [localAddedItems] }
//        // console.log('local storage cart = ' + localCartCopy)
//
//        // parse 
//        let parseLocalCart = JSON.parse(localCartCopy)
//        // console.log('local storage parseLocalCart = ' + parseLocalCart)
//        let itemsCopy = items
//
//        let updatedItems = itemsCopy.map( obj => parseLocalCart.find(item => item.id === obj.id) || obj)
//        let stringUpdatedItems= JSON.stringify(updatedItems)
//        // console.log('Cart Items cross reference local = ' + stringUpdatedItems)
//        setCart(updatedItems)
//
//        let localAddedItemsCopy = addedItems
//        let localAddedItemsCopyString =  JSON.stringify(localAddedItemsCopy)
//        if (localAddedItems) { 
//            localAddedItemsCopy = [localAddedItems] 
//            // parse 
//            localAddedItemsCopy = JSON.parse(localAddedItemsCopy)
//            setAddedItems(localAddedItemsCopy)
//            //localAddedItemsCopyString = JSON.stringify(localAddedItemsCopy)
//            //console.log('local storage added to addedItems= ' + localAddedItemsCopyString)
//            props.addToCart(localAddedItemsCopy)
//        }
//        // console.log('local storage parseLocalCart = ' + parseLocalCart)
//        // let updatedAddedItems = addedItemsCopy.map( obj => parseLocalAddedItems.find(item => item.id === obj.id) || obj)
//        // localAddedItemsCopy= JSON.stringify(localAddedItemsCopy)
//        setAddedItems(localAddedItemsCopy)
//        console.log('local storage added to addedItems= ' + localAddedItemsCopyString)
//
//        let totalItemsQuantity = localAddedItemsCopy.map(item => item.quantity).reduce((prev, curr) => prev + curr, 0);
//        console.log('totalItemQuantity = ' + totalItemsQuantity)
//        setTotalItems(totalItemsQuantity)
//
//        let totalItemsPrice = localAddedItemsCopy.map(item => item.price*item.quantity).reduce((prev, curr) => prev + curr, 0);
//        console.log('totalItemPrice = ' + totalItemsPrice)
//        setTotalPrice(totalItemsPrice)
//    }, []) //only run once
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
        history.push('/contactData')
    }

    const addToCart= ( id ) => {
        let addedItem = items.find(item=> item._id === id)
        let existed_item = addedItems.find(item=> id === item._id)
        let updatedItems, stringMyAddedItems, cart
        if (existed_item) {
            addedItem.amount += 1
            updatedItems = addedItems.map( obj => [addedItem].find(item => item._id === obj._id) || obj)
            setAddedItems(updatedItems)
            //make cart a string and store in local space
            stringMyAddedItems = JSON.stringify(updatedItems)
            localStorage.setItem("addedItems", stringMyAddedItems)

            let myTotal = updatedItems.map(item => item.price*item.quantity).reduce((prev, curr) => prev + curr, 0);
            console.log('totalItemPrice = ' + myTotal)
            setTotal(myTotal)
            
            // let totalItemsQuantity = updatedItems.map(item => item.quantity).reduce((prev, curr) => prev + curr, 0);
            // console.log('totalItemQuantity = ' + totalItemsQuantity)
            // setTotalItems(totalItemsQuantity)
            // props.addToCart(updatedItems, totalItemsPrice, totalItemsQuantity)
            
            cart = addedItems.reduce((a, b) => a + b.amount, 0)
            props.onAddToCart(updatedItems, myTotal, cart)
        } else {
            addedItem.amount = 1;
            if (addedItems) {
                updatedItems = [...addedItems, addedItem]
                setAddedItems(updatedItems)
            } else {
                updatedItems = [addedItem]
                setAddedItems(updatedItems)
            }
            stringMyAddedItems = JSON.stringify(updatedItems)
            console.log('string MyAddedItems = ' + stringMyAddedItems)
            
            //make cart a string and store in local space
            localStorage.setItem("addedItems", stringMyAddedItems)

            let myTotal = updatedItems.map(item => item.price*item.quantity).reduce((prev, curr) => prev + curr, 0);
            console.log('totalItemPrice = ' + myTotal)
            setTotal(myTotal)

            // let totalItemsQuantity = updatedItems.map(item => item.quantity).reduce((prev, curr) => prev + curr, 0);
            // console.log('totalItemQuantity = ' + totalItemsQuantity)
            // setTotalItems(totalItemsQuantity)
            //props.addToCart(myAddedItems, totalItemsPrice, totalItemsQuantity)
            cart = updatedItems.reduce((a, b) => a + b.amount, 0)
            props.onAddToCart(addedItems, myTotal, cart)
        } 
    }
        
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
                    <h1>Shop</h1>
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
                    {button}
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
        total       : state.cart.total,
        shop        : state.shop.items,
        isAuth      : state.auth.payload
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddToCart         : (addedItems, total, totalItems)  =>{ dispatch(actions.addToCart(addedItems, total, totalItems))},
        loadCart            : (cart)                           =>{ dispatch(actions.loadCart(cart))},
        getItems            : ()                               =>{ dispatch(actions.getItems())},
        // removeItem          : (id)=>{dispatch(actions.removeItem(id))},
        // addQuantity         : (id)=>{dispatch(actions.addQuantity(id))},
        // subtractQuantity    : (id)=>{dispatch(actions.subtractQuantity(id))}
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Purchase);
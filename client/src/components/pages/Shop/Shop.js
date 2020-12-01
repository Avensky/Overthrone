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

    let [cart, setCart]= useState(items )
    let stringCart = JSON.stringify(cart)
    console.log('Cart = '+ stringCart)

    let [ addedItems, setAddedItems ] = useState([])
    let stringAddedItems = JSON.stringify(addedItems)
    console.log('addedItems = '+ stringAddedItems)

    let [ total, setTotal] = useState(0.00)
    console.log('total = '+ total)

    let [ totalItems, setTotalItems] = useState(0)
    console.log('totalItems = '+ totalItems)

    let [ totalPrice, setTotalPrice ] = useState(0)
    console.log('totalPrice = '+ totalPrice)

    let shop = cart.map( item => {
        // let cartCopy = '[]'
        // let localQuantity = 0;

        // if (localCart) {
        //     cartCopy = [localCart]
        // }
        // 
        // // parse 
        // let parseCart = JSON.parse(cartCopy)
        // 
        // //look for item in cart array
        // let localItem = parseCart.find(cartItem => cartItem.id == item.id)
        // 
        // let stringItem = JSON.stringify(localItem)
        // //// console.log('stringItem = ' + stringItem)
        // 
        // if (localItem) {
        //     localQuantity = localItem.quantity
        //     //// console.log('localQuantity' + localQuantity)
        // } 

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
        if (localCart) { localCartCopy = [localCart] }
        console.log('local storage cart = ' + localCartCopy)

        // parse 
        let parseLocalCart = JSON.parse(localCartCopy)
        // console.log('local storage parseLocalCart = ' + parseLocalCart)
        let itemsCopy = items

        let updatedItems = itemsCopy.map( obj => parseLocalCart.find(item => item.id === obj.id) || obj)
        let stringUpdatedItems= JSON.stringify(updatedItems)
        console.log('Cart Items cross reference local = ' + stringUpdatedItems)
        setCart(updatedItems)
    }, []) //only run once

    useEffect(() => {
        let localAddedItemsCopy = addedItems
        let localAddedItemsCopyString = localAddedItemsCopy

        if (localAddedItems) { 
            localAddedItemsCopy = [localAddedItems] 
            // parse 
            localAddedItemsCopy = JSON.parse(localAddedItemsCopy)
        }
        console.log('local storage added Items= ' + localAddedItemsCopyString)

        // console.log('local storage parseLocalCart = ' + parseLocalCart)

        // let updatedAddedItems = addedItemsCopy.map( obj => parseLocalAddedItems.find(item => item.id === obj.id) || obj)
        // localAddedItemsCopy= JSON.stringify(localAddedItemsCopy)

        setAddedItems(localAddedItemsCopy)
        console.log('added Items cross reference local = ' + localAddedItemsCopy)

        props.addToCart(localAddedItemsCopy)

    }, []) //only run once

    //const handleClick = ( id ) => {
    //    props.addToCart(id);
    //    //look for item in cart array
    //    //// console.log(props.items)
    //
    //    let item = props.items.find(item => item.id === id);
    //    //// console.log(item)
    //    addItem(item)
    //      props.history.push('/shop/itemfull/' + id);
    //}

    // const addItem = (item) => {
    //     //create a copy of our cart state, avoid overwritting existing state
    //     let cartCopy = [...cart];
    //     //// console.log("cart = " + JSON.stringify(cartCopy))
    //     
    //     //assuming we have an ID field in our item
    //     let ID = item.id;
    //     
    //     //look for item in cart array
    //     let existingItem = cartCopy.find(cartItem => cartItem.id === ID);
    //     
    //     //if item already exists
    //     if (existingItem) {
    //         // console.log('prev existingItem.quantity = ' + existingItem.quantity)
    //         // existingItem.quantity++ //update item
    //         // console.log('new existingItem.quantity = ' + existingItem.quantity)
    //     } else { 
    //         //if item doesn't exist, simply add it
    //         cartCopy.push(item)
    //         // console.log('adding new item')
    //     }
    //     
    //     //update app state
    //     setCart(cartCopy)
    //     
    //     //make cart a string and store in local space
    //     let stringCart = JSON.stringify(cartCopy);
    //     localStorage.setItem("cart", stringCart)
    //     // console.log('setting local storage= ' + stringCart)
    // }

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
            setTotalItems(totalItems + 1) 
            props.addToCart(myAddedItems, myTotal, totalItems)
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
            setTotalItems(totalItems + 1)
            props.addToCart(myAddedItems, myTotal, totalItems)
        } 
    }
    

    // const editItem = (itemID, amount) => {
    //     let cartCopy = [...cart]
    //     
    //     //find if item exists, just in case
    //     let existentItem = cartCopy.find(item => item.ID === itemID);
    //     
    //     //if it doesnt exist simply return
    //     if (!existentItem) return
    //     
    //     //continue and update quantity
    //     existentItem.quantity += amount;
    //     
    //     //validate result
    //     if (existentItem.quantity <= 0) {
    //       //remove item  by filtering it from cart array
    //       cartCopy = cartCopy.filter(item => item.ID !== itemID)
    //     }
    //     
    //     //again, update state and localState
    //     setCart(cartCopy);
    //     
    //     // let cartString = JSON.stringify(cartCopy);
    //     // localStorage.setItem('cart', cartString);
    //     localStorage.setItem('cart', cartCopy);
    // }
    // 
    // const removeItem = (itemID) => {
    //     //create cartCopy
    //     let cartCopy = [...cart]
    //     
    //     cartCopy = cartCopy.filter(item => item.ID !== itemID);
    //     
    //     //update state and local
    //     setCart(cartCopy);
    //     
    //     let cartString = JSON.stringify(cartCopy)
    //     localStorage.setItem('cart', cartString)
    // }

        //items = props.items.slice( 0, 4 );
    

    return(
        <div className={[classes.Card, myClasses.Shop].join(' ')}>
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
        totalItems  : state.cart.totalItems,
        shop       : state.shop.items
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
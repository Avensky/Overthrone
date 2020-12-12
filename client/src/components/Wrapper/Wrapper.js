import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Wrapper.module.scss';
import Navbar from '../Navigation/Navbar/Navbar';
import Sidebar from '../Navigation/Sidebar/Sidebar';
import Background from './Background/Background';
import * as actions from '../../store/actions/index';
import item from '../pages/Shop/Items/Item/Item';


const Wrapper = props => {
    let [localAddedItems, setLocalAddedItems] = useState(localStorage.getItem("addedItems"))
    let [ addedItems, setAddedItems ] = useState([])
    let stringAddedItems = JSON.stringify(addedItems)
    console.log('addedItems = '+ stringAddedItems)

    //let [ totalItems, setTotalItems] = useState(0)
    //let totalItems = props.addedItems.length
    let totalItems = props.addedItems.map(item => item.quantity).reduce((prev, curr) => prev + curr, 0);
    console.log('totalItems = '+ totalItems)
    
    const [showSidebar, setShowSidebar] = useState(false)
    const closeSidebarHandler = () => {
        setShowSidebar(false)
    }
    
    // best practice to set state in a clean way when it depends on a previous state
    const sidebarToggleHandler = () => {
        setShowSidebar(!showSidebar);
    }

    //let totalCounter = 0
    //let totalItems = addedItems.map( (item) => totalCounter += item.quantity)
    // let totalItems = addedItems.map(item => item.quantity).reduce((prev, curr) => prev + curr, 0);

    //const calculateSum = (obj, field) => obj.map(items => items.attributes[field]).reduce((prev, curr) => prev + curr, 0);

    useEffect(() => {
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
        //console.log('added Items cross reference local = ' + localAddedItemsCopy)
        props.addToCart(localAddedItemsCopy,null,)

       // let totalItemsQuantity = localAddedItemsCopy.map(item => item.quantity).reduce((prev, curr) => prev + curr, 0);
       // console.log('totalItemQuantity = ' + totalItemsQuantity)
        //setTotalItems(totalItemsQuantity)
        //setTotalItems(localAddedItemsCopy.length)
    }, [])


    if (!addedItems) {
        setAddedItems([])
    }
    // console.log( 'prop items to nav = ' + addedItems)


    
    return (    
        <Auxiliary>
            <div className = {classes.Layout}>
                <Background />
                <Navbar 
                    isAuth={props.isAuth}
                    sidebarToggleClicked={sidebarToggleHandler}
                    items = {addedItems}
                    cart={totalItems}
                />
                <Sidebar 
                    isAuth={props.isAuth}
                    open={showSidebar} 
                    closed={closeSidebarHandler} 
                    cart={totalItems}
                />
                <main className={classes.Wrapper}>
                    {props.children}
                </main>

            </div>
        </Auxiliary>
    )
}

const mapStateToProps = state => {
    return {
        addedItems  : state.cart.addedItems,
        totalItems  : state.cart.totalItems,
        isAuth      : state.auth.payload
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart           : (addedItems, total, totalItems)  =>{ dispatch(actions.addToCart(addedItems, total, totalItems))},
        getItems            : ()                               =>{ dispatch(actions.getItems())},
    }
}


export default connect ( mapStateToProps, mapDispatchToProps )( Wrapper )
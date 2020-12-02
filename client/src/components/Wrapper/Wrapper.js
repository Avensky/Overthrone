import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Wrapper.module.scss';
import Navbar from '../Navigation/Navbar/Navbar';
import Sidebar from '../Navigation/Sidebar/Sidebar';
import Background from './Background/Background';
import * as actions from '../../store/actions/index';


const Wrapper = props => {
    let [localAddedItems, setLocalAddedItems] = useState(localStorage.getItem("addedItems"))

    let [ addedItems, setAddedItems ] = useState([])
    let stringAddedItems = JSON.stringify(addedItems)
    console.log('addedItems = '+ stringAddedItems)

    const [showSidebar, setShowSidebar] = useState(false)
    const closeSidebarHandler = () => {
        setShowSidebar(false)
    }
    
    // best practice to set state in a clean way when it depends on a previous state
    const sidebarToggleHandler = () => {
        setShowSidebar(!showSidebar);
    }

    let totalItems = props.addedItems.length

    if (!addedItems) {
        addedItems = [] 
    }
    // console.log( 'prop items to nav = ' + addedItems)

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
    }, [])
    
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
        addedItems: state.cart.addedItems,
        totalItems: state.cart.totalItems,
        isAuth: state.auth.payload
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart           : (addedItems, total, totalItems)  =>{ dispatch(actions.addToCart(addedItems, total, totalItems))},
        getItems            : ()                               =>{ dispatch(actions.getItems())},
    }
}


export default connect ( mapStateToProps, mapDispatchToProps )( Wrapper )
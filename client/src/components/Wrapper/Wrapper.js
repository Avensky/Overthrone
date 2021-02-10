import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Wrapper.module.scss';
import Navbar from '../Navigation/Navbar/Navbar';
import Sidebar from '../Navigation/Sidebar/Sidebar';
import Background from './Background/Background';
import * as actions from '../../store/actions/index';

const Wrapper = props => {
    const [showSidebar, setShowSidebar] = useState(false)
    const closeSidebarHandler = () => {setShowSidebar(false)}
    // set state in a clean way by depending on a previous state
    const sidebarToggleHandler = () => {setShowSidebar(!showSidebar);}

    useEffect(() => {
        const getItems = async () => { props.getItems() }
        if ( props.items.length === 0){ 
            console.log('Fetching Items')
            getItems() 
        }
    }, [])

    useEffect(() => {
        // let stringLocalAddedItems = localStorage.getItem("addedItems")
        // console.log('loadCart stringLocalAddedItems = ' + stringLocalAddedItems)
        const fetchCart = async () => { props.loadCart() }
        //console.log('props.items = ' + props.items)
        if ( props.items.length>0){ 
            console.log('Fetching Cart')
            fetchCart() 
        }
    }, [props.items])

    return (    
        <Auxiliary>
            <div className = {classes.Layout}>
                <Background />
                <Navbar 
                    isAuth={props.isAuth}
                    sidebarToggleClicked={sidebarToggleHandler}
                    //items = {props.totalItems}
                    cart={props.totalItems}
                />
                <Sidebar 
                    isAuth={props.isAuth}
                    open={showSidebar} 
                    closed={closeSidebarHandler} 
                    //cart={totalItems}
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
        items             : state.cart.items,
        shop              : state.cart.shop,
        addedItems        : state.cart.addedItems,
        total             : state.cart.total,
        totalItems        : state.cart.totalItems,
        isAuth            : state.auth.payload
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart           : (addedItems, total, totalItems)  =>{ dispatch(actions.addToCart(addedItems, total, totalItems))},
        getItems            : ()                               =>{ dispatch(actions.getItems())},
        loadCart            : (cart)                           =>{ dispatch(actions.loadCart(cart))},
    }
}


export default connect ( mapStateToProps, mapDispatchToProps )( Wrapper )
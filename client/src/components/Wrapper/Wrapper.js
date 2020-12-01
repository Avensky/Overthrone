import React, { useState } from 'react';
import { connect } from 'react-redux';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Wrapper.module.scss';
import Navbar from '../Navigation/Navbar/Navbar';
import Sidebar from '../Navigation/Sidebar/Sidebar';
import Background from './Background/Background';


const Wrapper = props => {
    const [showSidebar, setShowSidebar] = useState(false)

    const closeSidebarHandler = () => {
        setShowSidebar(false)
    }
    
    // best practice to set state in a clean way when it depends on a previous state
    const sidebarToggleHandler = () => {
        setShowSidebar(!showSidebar);
    }

    let addedItems = props.addedItems
    let totalItems = props.addedItems.length

    if (!addedItems) {
        addedItems = [] 
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
        addedItems: state.cart.addedItems,
        totalItems: state.cart.totalItems,
        isAuth: state.auth.payload
    }
}


export default connect ( mapStateToProps, null )( Wrapper )
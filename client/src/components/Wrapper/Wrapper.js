import React, { Component } from 'react';
import { connect } from 'react-redux';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Wrapper.module.scss';
import Navbar from '../Navigation/Navbar/Navbar';
import Sidebar from '../Navigation/Sidebar/Sidebar';
import Background from '../UI/Background/Background';


class Wrapper extends Component {
    state = {
        showSidebar: false
    }

    sidebarClosedHandler = () => {
        this.setState({showSidebar: false})
    }
// best practice to set state in a clean way when it depends on a previous state
    sidebarToggleHandler = () => {
        this.setState(( prevState ) => {
            return {showSidebar: !prevState.showSidebar};
        });
    }

    render () {
        return (    
            <Auxiliary>
                <Background />
                <Navbar 
                    isAuth={this.props.isAuth}
                    sidebarToggleClicked={this.sidebarToggleHandler}
                    items = {this.props.items}
                    cart={this.props.totalItems}
                />
                <Sidebar 
                    isAuth={this.props.isAuth}
                    open={this.state.showSidebar} 
                    closed={this.sidebarClosedHandler} 
                />
                <main className={classes.Wrapper}>
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
}

const mapStateToProps = state => {
    return {
        addedItems: state.addedItems,
        items: state.cart.addedItems,
        totalItems: state.cart.totalItems,
        isAuth: state.auth.payload
    };
};


export default  connect (mapStateToProps, null)(Wrapper);
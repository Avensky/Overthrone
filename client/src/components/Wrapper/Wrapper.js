import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Wrapper.module.css';
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
                    isLogged={this.props.isLoggedIn}
                    sidebarToggleClicked={this.sidebarToggleHandler} 
                />
                <Sidebar 
                    isLogged={this.state.isLoggedIn}
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


export default Wrapper;
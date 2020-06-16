import React, { Component } from 'react';
import {connect} from 'react-redux';
// import { Route } from 'react-router-dom';
import Auxiliary from '../../../../hoc/Auxiliary';
import classes from '../../Pages.module.css';
import myClasses from '../Shop.module.css';
import Item from './Item/Item';
import * as actions from '../../../../store/actions/index';
// import Details from '../Details/Details';
// import { Link } from 'react-router-dom';
class Items extends Component {
    state = {
        items : []
    }

    componentDidMount () {
        console.log( this.props );
        const items = this.props.items.slice( 0, 4 );
        const updatedItems = items.map( item => {
            return {
                ...item,
            }
        } );
        this.setState({ items: updatedItems })
        console.log( this.state.items );
    }


    
    handleClick = ( id ) => {
        this.props.addToCart(id); 
//        this.props.history.push('/shop/itemfull/' + id);
    }
    render () {
        let items = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
        if ( !this.state.error ) {
            items = this.state.items.map( item => {
                return(
                    <Item
                        img     = {item.img}
                        id      = {item.id}
                        key     = {item.id}
                        alt     = {item.title}
                        title   = {item.title}
                        to      = "/"
                        clicked = {() => this.handleClick(item.id)}
                        desc    = {item.desc}
                        price   = {item.price}
                    />
                )
            })
        }
        return(
            <Auxiliary>
                <div className={classes.spread}>
                    <input className={myClasses.Search} type='text' placeholder="search the store" />
                    
                    <div className={myClasses.dropdown}>
                        <button className={myClasses.dropbtn}>OrderBy: </button>
                        <div className={myClasses.dropdownContent}>
                            <a href="/price">Price</a>
                            <a href="/date">Most recent</a>
                            <a href="/popular">Most Popular</a>
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
                <div className="container">
                    <h3 className="center">Our items</h3>
                    <div className={['box', /*myClasses.Items*/ ].join(' ')}>
                        {items}
                    </div>
                </div>

            </Auxiliary>
        )
    }
}

const mapStateToProps = state => {
    return {
        items: state.cart.items
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addToCart: ( id ) => { dispatch( actions.addToCart( id ) ) }
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Items);
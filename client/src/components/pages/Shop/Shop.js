import React from 'react';
import { connect } from 'react-redux';
//import { Route, Switch } from 'react-router-dom';
import Auxiliary from '../../../hoc/Auxiliary';
import classes from '../Pages.module.scss';
import myClasses from './Shop.module.scss';
//import Items from './Items/Items'
import Item from './Items/Item/Item'
//import ItemFull from './ItemFull/ItemFull';
//import Cart from '../Cart/Cart';
import * as actions from '../../../store/actions/index';
// import Details from './Details/Details'

const Purchase = props => {
    const handleClick = ( id ) => {
        props.addToCart(id); 
//        props.history.push('/shop/itemfull/' + id);
    }
        let items = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
        if ( props.items ) {
            //items = props.items.slice( 0, 4 );
            items = props.items.slice( 0, 4 ).map( item => {
                return(
                    <Item
                        img         = {item.img}
                        id          = {item.id}
                        key         = {item.id}
                        alt         = {item.title}
                        title       = {item.title}
                        link        = {"/shop/"}
                        to          = "/"
                        clicked     = {() => handleClick(item.id)}
                        desc        = {item.desc}
                        price       = {item.price}
                        quantity    = {item.quantity}
                    />
                )
            })
        }

        return(
            <Auxiliary>
                <div className='container'>
                    <div className={['page-header', 'text-center'].join(' ')}>
                        <a href='/shop' ><h2>Shop</h2></a>
                    </div>
                </div>

                <div className={[classes.Card, myClasses.Shop].join(' ')}>
                <div className={classes.spread}>
                    {/* <input className={myClasses.Search} type='text' placeholder="search the store" /> */}
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
                <div className={myClasses.Items}>
                    <div className={['box', myClasses.Items ].join(' ')}>
                        {items}
                    </div>
                </div>
                </div>
            </Auxiliary>
        )
    }


const mapStateToProps = state => {
    return {
        items       : state.cart.items,
        addedItems  : state.cart.addedItems,
        totalItems  : state.cart.totalItems
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addToCart: ( id ) => { dispatch( actions.addToCart( id ) ) }
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Purchase);
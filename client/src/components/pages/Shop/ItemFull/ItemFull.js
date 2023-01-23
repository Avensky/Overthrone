import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
//import { Route, Switch } from 'react-router-dom';
import Auxiliary from '../../../../hoc/Auxiliary';
//import classes from '../../Pages.module.scss';
import myClasses from './ItemFull.module.scss';
import * as actions from '../../../../store/actions/index';
//import Details from '../Details/Details';
import Item from '../Items/Item/Item';
import PropTypes from 'prop-types';

const ItemFull =(props)=> {
        const [id,setId]= useState(null);
        const [loadedItem,setLoadedItem] =useState(null);

    useEffect(()=> {
        console.log(props);
        loadData();
    },[]);

    const loadData=()=> {
        if ( props.match.params.id ) {
            if ( !state.loadedItem || (state.loadedItem && state.loadedItem.id !== +props.match.params.id) ) {
                const itemId = props.match.params.id;
                setLoadedItem( props.items[itemId]);
            }
        }
    };

    handleClick = (id)=>{
        props.addToCart(id); 
    };

        let details = <p style={{textAlign: 'center'}}>Please select an item!</p>;
        
        if ( props.match.params.id ) {
            details = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        }

        if ( state.loadedItem) {
            details = <Item
                class   = 'myClasses.DetailsItem'
                img     = {state.loadedItem.img}
                id      = {state.loadedItem.id}
                key     = {state.loadedItem.id}
                alt     = {state.loadedItem.title}
                title   = {state.loadedItem.title}
                link    = {"/shop/itemfull/" + state.loadedItem.id}
                to      = "/"
                clicked = {() => handleClick(state.loadedItem.id)}
                desc    = {state.loadedItem.desc}
                price   = {state.loadedItem.price}
                className="Delete"
            />;
        }
        return(
            <Auxiliary>
                <div className={myClasses.Item}>
                    {details}
                </div>
            </Auxiliary>
        );
    
};

const mapStateToProps = state => {
    return {
        items: state.cart.items
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addToCart: ( id ) => { dispatch( actions.addToCart( id ) ); }
    };
};

ItemFull.propTypes={
    match:PropTypes.any,
    items:PropTypes.array,
    addToCart:PropTypes.func,
};

export default connect (mapStateToProps, mapDispatchToProps)(ItemFull);
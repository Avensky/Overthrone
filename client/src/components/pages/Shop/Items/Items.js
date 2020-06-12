import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Route } from 'react-router-dom';
import Auxiliary from '../../../../hoc/Auxiliary';
// import classes from '../Pages.module.css';
import myClasses from '../Shop.module.css';
import Item from './Item/Item';
import * as actions from '../../../../store/actions/index';
import Details from '../Details/Details';
import { Link } from 'react-router-dom';
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
//        this.props.addToCart(id); 
        this.props.history.push('/itemfull/' + id);
    }
    render () {
        let items = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
        if ( !this.state.error ) {
            items = this.state.items.map( item => {
                return(
                    <Link to={'/itemfull/' + item.id} key={item.id}>
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
                    </Link>
                )
            })
        }
        return(
            <Auxiliary>
                <div className={myClasses.Items}>
                    {items}
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
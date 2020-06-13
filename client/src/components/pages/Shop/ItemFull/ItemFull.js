import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Auxiliary from '../../../../hoc/Auxiliary';
import classes from '../../Pages.module.css';
import myClasses from './ItemFull.module.css';
import * as actions from '../../../../store/actions/index';
import Details from '../Details/Details';
import Item from '../Items/Item/Item'

class ItemFull extends Component {

    state = {
        id: null,
        loadedItem: null
    }

    componentDidMount () {
        console.log(this.props);
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    loadData () {
        if ( this.props.match.params.id ) {
            if ( !this.state.loadedItem || (this.state.loadedItem && this.state.loadedItem.id !== +this.props.match.params.id) ) {
                const itemId = this.props.match.params.id - 1;
                this.setState({ loadedItem: this.props.items[itemId]});
            }
        }
    }

    render () {
        let details = <p style={{textAlign: 'center'}}>Please select an item!</p>;
        
        if ( this.props.match.params.id ) {
            details = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        }

        if ( this.state.loadedItem) {
            details = <Item
                class   = 'myClasses.DetailsItem'
                img     = {this.state.loadedItem.img}
                id      = {this.state.loadedItem.id}
                key     = {this.state.loadedItem.id}
                alt     = {this.state.loadedItem.title}
                title   = {this.state.loadedItem.title}
                to      = "/"
                clicked = {() => this.handleClick(this.state.loadedItem.id)}
                desc    = {this.state.loadedItem.desc}
                price   = {this.state.loadedItem.price}
                className="Delete"
            />
        }
        return(
            <Auxiliary>
                <div className="container">
                    <div className={['page-header', 'text-center', classes.spread].join(' ')}>
                        <a href='/shop' ><h1>Shop</h1></a>
                        <h1>
                            <a href='/cart'>
                                <span className={["fa", "fa-shopping-cart", classes.left].join(' ')}/>
                            </a>
                            <span className={["fa", "fa-shopping-cart", classes.left].join(' ')}/>
                            <a href='/authentication' >
                                <span className={["fa", "fa-user", classes.left].join(' ')}/>
                            </a>
                        </h1>
                    </div>
                </div>   
                <div className={[classes.Card, myClasses.Shop].join(' ')}>
                <div className={myClasses.Item}>
                    {details}
                </div>
                <Switch>
                    <Route path="/ItemFull" component={Details} />
                    <Route render={() => <h1>Not found</h1>}/>
                    {/* <Redirect from="/" to="/posts" /> */}
                    {/* <Route path="/" component={Posts} /> */}
                </Switch>
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

export default connect (mapStateToProps, mapDispatchToProps)(ItemFull);
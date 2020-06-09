import React, { Component } from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Item from '../Item/Item';
import myClasses from './Details.module.css';
// import classes from '../../Pages.module.css';
import * as actions from '../../../../store/actions/index';

class Details extends Component {

    state = {
        id: null,
        loadedItem: null
    }

    componentDidMount () {
        console.log(this.props);
        this.loadData();
    }

//    componentDidUpdate() {
//        this.loadData();
//    }

    loadData () {
        if ( this.props.match.params.id ) {
            if ( !this.state.LoadedItem || (this.state.LoadedItem && this.state.LoadedItem.id !== +this.props.match.params.id) ) {
                this.setState({ LoadedItem: this.props.items[this.props.match.params.id]})
            }
        }
    }

//    deletePostHandler = () => {
//        axios.delete('/posts/' + this.props.match.params.id)
//            .then(response => {
//                console.log(response);
//            });
//    }

    render (){
        let details = <p style={{textAlign: 'center'}}>Please select an item!</p>;
        
        if ( this.props.match.params.id ) {
            details = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        }

        if ( this.state.loadedPost) {
            details = <Item
                class   = 'myClasses.DetailsItem'
                img     = {this.state.loadedPost.img}
                id      = {this.state.loadedPost.id}
                key     = {this.state.loadedPost.id}
                alt     = {this.state.loadedPost.title}
                title   = {this.state.loadedPost.title}
                to      = "/"
                clicked = {() => this.handleClick(this.state.loadedPost.id)}
                desc    = {this.state.loadedPost.desc}
                price   = {this.state.loadedPost.price}
                className="Delete"
            />
        }
        return (
            <div className={myClasses.Item}>
                {details}
            </div>
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

export default withRouter ( connect ( mapStateToProps, mapDispatchToProps ) ( Details ) );
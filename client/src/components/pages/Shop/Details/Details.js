import React, {Component } from 'react';
import {connect} from 'react-redux';
import Item from '../Item/Item';
import myClasses from './Details.module.css';
import classes from '../../Pages.module.css';
import * as actions from '../../../../store/actions/index';

class Details extends Component {

    componentDidUpdate() {
  
    }

    deletePostHandler = () => {

    }

    render (){
        let details = <p style={{textAlign: 'center'}}>Please select an item!</p>;
        
        if (this.props.match.params.id) {
            details = <p style={{textAlign: 'center'}}>Loading...!</p>;
        }

        let item = this.props.items
        console.log(item);

        if (item) {
            details = <Item
                class   = 'myClasses.DetailsItem'
                img     = {item[0].img}
                id      = {item[0].id}
                key     = {item[0].id}
                alt     = {item[0].title}
                title   = {item[0].title}
                to      = "/"
                clicked = {() => this.handleClick(item.id)}
                desc    = {item[0].desc}
                price   = {item[0].price}
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

export default connect (mapStateToProps, mapDispatchToProps) (Details);
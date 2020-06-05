import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Item from '../Item/Item';
import myClasses from './Details.module.css';
// import classes from '../../Pages.module.css';
import * as actions from '../../../../store/actions/index';

class Details extends Component {
    state = {
        id: null,
        loading: false
    }

    componentDidMount() {
        if (this.props.match.params) {
            try {
                const id = this.props.match.params.id;
                console.log(this.props.match.params.key);
                this.setState({ id, loading: false })
            } catch (err) {
                this.setState({ loading: false, error: true })
            }
        }
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
                img     = {item.img}
                id      = {item.id}
                key     = {item.id}
                alt     = {item.title}
                title   = {item.title}
                to      = "/"
                clicked = {() => this.handleClick(item.id)}
                desc    = {item.desc}
                price   = {item.price}
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
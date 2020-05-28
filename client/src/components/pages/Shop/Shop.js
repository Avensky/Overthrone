import React, { Component } from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../../../hoc/Auxiliary';
import classes from '../Pages.module.css';
import myClasses from './Shop.module.css';
import myImg from '../../../assets/images/hat.jpg';
import myBag from '../../../assets/images/bag.jpg';
import myMug from '../../../assets/images/mug.jpg';
import myShirt from '../../../assets/images/shirt.jpg';
import Item from './Store/Item';

class Purchase extends Component {
    render () {
        let body = (
            <div className="container">
                <div className={'page-header text-right'}>
                    <h1>
                        <i class="fa fa-shopping-cart"></i>
                        <i class="fa fa-user"></i>
                    </h1>
                </div>
            </div>   
        )

        let form = (
            <input type='textbox' placeholder="search the store" />
        )
     
        return(
                <div className={[myClasses.Shop].join(' ')}>
                    {body}
                    <div className={[classes.Card, myClasses.Store].join(' ')}>
                        {form}
                        <div className={myClasses.filter}>
                            <label>All</label>
                            <label>Books</label>
                            <label>Apparel</label>
                            <label>Hats</label>
                            <label>Misc</label>
                        </div>
                        <div className={myClasses.Items}>
                            <Item
                                img={myImg}
                                title="Overthrown"
                                content="$26.99 US"
                            />
                            <Item
                                img={myBag}
                                title="Overthrown"
                                content="$26.99 US"
                            />
                            <Item
                                img={myMug}
                                title="Overthrown"
                                content="$26.99 US"
                            />
                            <Item
                                img={myShirt}
                                title="Overthrown"
                                content="$26.99 US"
                            />
                        </div>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Purchase);
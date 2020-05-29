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
        return(
            <Auxiliary>
                <div className="container">
                    <div className={['page-header', 'text-center', classes.spread].join(' ')}>
                        <h1>Shop</h1>
                        <h1>
                            <span className={["fa", "fa-shopping-cart", classes.left].join(' ')}/>
                            <span className={["fa", "fa-user", classes.left].join(' ')}/>
                        </h1>
                    </div>
                </div>   
                <div className={[classes.Card, myClasses.Shop].join(' ')}>
                    <div className={classes.spread}>
                        <input className={myClasses.Search} type='text' placeholder="search the store" />
                        
                        <div className={myClasses.dropdown}>
                            <button className={myClasses.dropbtn}>OrderBy: </button>
                            <div className={myClasses.dropdownContent}>
                                <a href="#">Price</a>
                                <a href="#">Most recent</a>
                                <a href="#">Most Popular</a>
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
            </Auxiliary>
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
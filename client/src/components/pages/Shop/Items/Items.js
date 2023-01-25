import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Auxiliary from '../../../../hoc/Auxiliary';
import classes from '../../Pages.module.scss';
import myClasses from '../Shop.module.scss';
import Item from './Item/Item';
import * as actions from '../../../../store/actions/index';
// import Details from '../Details/Details';
// import { Link } from 'react-router-dom';
// import Search from '../../../Search/Search';

const Items = (props) => {
  // componentDidMount () {
  //     console.log( props );
  //     const items = props.items.slice( 0, 4 );
  //     const updatedItems = items.map( item => {
  //         return {
  //             ...item,
  //         }
  //     } );
  //     setState({ items: updatedItems })
  //     console.log( state.items );
  // }

  const handleClick = (id) => {
    props.addToCart(id);
    //        props.history.push('/shop/itemfull/' + id);
  };
  let items = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
  if (!props.items) {
    items = props.items.map((item) => (
                    <Item
                        img = {item.img}
                        id = {item.id}
                        key = {item.id}
                        alt = {item.title}
                        title = {item.title}
                        link = {'/shop/'}
                        to = "/"
                        clicked = {() => handleClick(item.id)}
                        desc = {item.desc}
                        price = {item.price}
                    />
    ));
  }
  return (
            <Auxiliary>
                <div className={classes.spread}>
                    {/* <input className={myClasses.Search}
                    type='text' placeholder="search the store" /> */}
                    {/* <Search /> */}
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
                <div className={myClasses.Items}>
                    <h3 className="center">Our items</h3>
                    <div className={['box', myClasses.Items].join(' ')}>
                        {items}
                    </div>
                </div>

            </Auxiliary>
  );
};

const mapStateToProps = (state) => ({
  items: state.cart.items,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (id) => { dispatch(actions.addToCart(id)); },
});

Items.propTypes = {
  addToCart: PropTypes.func,
  items: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Items);

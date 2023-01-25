import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Auxiliary from '../../../../hoc/Auxiliary';
// import classes from '../../Pages.module.scss';
import myClasses from './ItemFull.module.scss';
import * as actions from '../../../../store/actions/index';
// import Details from '../Details/Details';
import Item from '../Items/Item/Item';

const ItemFull = (props) => {
  const [loadedItem, setLoadedItem] = useState(null);

  const loadData = () => {
    if (props.match.params.id) {
      if (!loadedItem
        || (loadedItem && loadedItem.id !== +props.match.params.id)) {
        const itemId = props.match.params.id;
        setLoadedItem(props.items[itemId]);
      }
    }
  };

  useEffect(() => {
    // console.log(props);
    loadData();
  }, []);

  const handleClick = (id) => {
    props.addToCart(id);
  };

  let details = <p style={{ textAlign: 'center' }}>Please select an item!</p>;

  if (props.match.params.id) {
    details = <p style={{ textAlign: 'center' }}>Loading...!</p>;
  }

  if (loadedItem) {
    details = <Item
                class = 'myClasses.DetailsItem'
                img = {loadedItem.img}
                id = {loadedItem.id}
                key = {loadedItem.id}
                alt = {loadedItem.title}
                title = {loadedItem.title}
                link = {`/shop/itemfull/${loadedItem.id}`}
                to = "/"
                clicked = {() => handleClick(loadedItem.id)}
                desc = {loadedItem.desc}
                price = {loadedItem.price}
                className="Delete"
            />;
  }
  return (
            <Auxiliary>
                <div className={myClasses.Item}>
                    {details}
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

ItemFull.propTypes = {
  match: PropTypes.any,
  items: PropTypes.array,
  addToCart: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemFull);

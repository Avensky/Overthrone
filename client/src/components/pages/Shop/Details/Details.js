import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Item from '../Items/Item/Item';
import myClasses from './Details.module.scss';
// import classes from '../../Pages.module.scss';
// import * as actions from '../../../../store/actions/index';

const Details = (props) => {
  const [id, setID] = useState(null);
  const [loadedItem, setLoadedItem] = useState(null);

  const loadData = () => {
    if (props.match.params.id) {
      if (!loadedItem || (loadedItem && loadedItem.id !== +props.match.params.id)) {
        const itemId = props.match.params.id - 1;
        setLoadedItem(props.items[itemId]);
      }
    }
  };

  useEffect(() => {
    // console.log(props);
    loadData();
  }, []);

  //    deletePostHandler = () => {
  //        axios.delete('/posts/' + props.match.params.id)
  //            .then(response => {
  //                console.log(response);
  //            });
  //    }

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
      to = "/"
      clicked = {() => {}}
      desc = {loadedItem.desc}
      price = {loadedItem.price}
      className="Delete"
  />;
  }
  return (
            <div className={myClasses.Item}>
                {details}
            </div>
  );
};

const mapStateToProps = (state) => ({
  items: state.cart.items,
});

Details.propTypes = {
  match: PropTypes.any,
  items: PropTypes.array,
};

export default connect(mapStateToProps)(Details);

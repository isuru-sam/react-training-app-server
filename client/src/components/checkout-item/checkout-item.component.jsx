import React from 'react';
import { connect } from 'react-redux';

import {
  clearItem,
  addItem,
  removeItem
} from '../../redux/cart/cart.actions';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
  //const { name, imageUrl, price, quantity } = cartItem;
  return (
    <div className='checkout-item'>
      <div className='image-container'>
        <img src={cartItem.courseData.imageUrl} alt='item' />
      </div>
      <span className='name'>{cartItem.courseData.course}</span>
      <span className='name'>{cartItem.date}</span>
      <span className='name'>{cartItem.fromTime}</span>
      <span className='name'>{cartItem.toTime}</span>
     
      <span className='name'>{cartItem.hours}hrs{cartItem.mins}mins</span>
      <span className='price'>${Math.floor(cartItem.totalmins*cartItem.courseData.hourlyRate/60)}</span>
      <div className='remove-button' onClick={() => clearItem(cartItem.id)}>
        &#10005;
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  clearItem: item => dispatch(clearItem(item)),
 // addItem: item => dispatch(addItem(item)),
 // removeItem: item => dispatch(removeItem(item))
});

export default connect(
  null,
  mapDispatchToProps
)(CheckoutItem);
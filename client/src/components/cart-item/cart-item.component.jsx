import React from 'react';
import { connect } from 'react-redux';
import './cart-item.styles.scss';
import { clearItem } from '../../redux/cart/cart.actions.js';

const CartItem = ({ item,clearItem }) => (
 
  <div className='cart-item'>
    <img src={item.courseData.imageUrl} alt='item' />
    <div className='item-details'>
      <span className='name'>{item.courseData.course}</span>
      <span className='name'>{item.hours}hrs{item.mins}mins</span>
      
      <span className='price'>${Math.floor(item.totalmins*item.courseData.hourlyRate/60)}</span>
      
    </div>
    <div className='remove-button' onClick={() => clearItem(item.id)}>
    &#10005;
      </div>
  </div>
);
const mapDispatchToProps=(dispatch)=>({
 // toggleCartHidden:()=>dispatch(toggleCartHidden())
  clearItem: item => dispatch(clearItem(item)),
})
export default  connect(null,mapDispatchToProps)(CartItem);
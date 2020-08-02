 
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

//import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selector';
import { toggleCartHidden,clearItem } from '../../redux/cart/cart.actions.js';

import './cart-dropdown.styles.scss';
import Button from '@material-ui/core/Button';


const CartDropdown = ({ cartItems, history, clearItem,dispatch,toggleCartHidden ,currentUser}) => (

  
  <div className='cart-dropdown'>
    <div className='cart-items'>
    {cartItems.length ? (
        cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className='empty-message'>Your cart is empty.Add items to proceed.</span>
      )}
    </div>
    <Button type="submit" variant="contained" color="primary"  onClick={(event) => {toggleCartHidden();currentUser?history.push("/checkout"):history.push({pathname:'/signInRegister',customNameData:{msg:'Please login/register to checkout',open:true}})}}>Checkout</Button>
  </div>
);



const mapStateToProps=(state)=>({
  cartItems:selectCartItems(state),
  currentUser:selectCurrentUser(state)
})
const mapDispatchToProps=(dispatch)=>({
  toggleCartHidden:()=>dispatch(toggleCartHidden())
  //clearItem: item => dispatch(clearItem(item)),
})
export default connect(mapStateToProps,mapDispatchToProps)(withRouter((CartDropdown)));
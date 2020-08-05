import React from 'react';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selector';
import {clearCart} from '../../redux/cart/cart.actions.js'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'
import Button from "@material-ui/core/Button";
import {withRouter} from "react-router-dom"
import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect';
import {addCollectionData} from '../firebase/firebase.utils.js'
import { v4 as uuidv4 } from 'uuid';
const StripeCheckoutButton = ({ price,cartItems,currentUser,clearCart,history }) => {
  const priceForStripe = price * 100;
 // const publishableKey = 'pk_test_WBqax2FWVzS9QlpJScO07iuL';
const publishableKey='pk_test_51HAfK5ADrPvZgTNOPXq535T7z56sdWI2BZPxVA30kz89qczkzSXT7qkaQqOhmT17f72IL50rtoofVaDeBMmA0Ep600VZIXpmDd';
 

const saveSchedule= event=>{
  event.preventDefault();
  var schedules=[]
  var id=Math.floor(Math.random() * 10000);
cartItems.forEach(cartItem=>{
schedules.push({
date:cartItem.date,
  fromTime:cartItem.fromTime,
  toTime:cartItem.toTime,
  mins:cartItem.mins,
  totalmins:cartItem.totalmins,
  price:price,
  status:'Saved',
  id:id,
  createdDate:new Date(),
  email:currentUser.email,
  course:cartItem.courseData.course
});

})
addCollectionData("schedules",schedules)

axios({
  url: '/api/save',
  method: 'post',
  data: {
    amount: priceForStripe,
  //  token: token,
    schedules:schedules
  }
})
  .then(response => {
    //addCollectionData("schedules",schedules)
    clearCart()
   // history.push('/schedules')
    alert('Your schedule is saved and emailed the bank account details');
  })
  .catch(error => {
    console.log('Save Error: ', error);
    alert(
      'Schdule did not saved.Please try again'
    );
  });

}

const onToken = token => {
    var schedules=[]
    var id=Math.floor(Math.random() * 10000);
cartItems.forEach(cartItem=>{
  schedules.push({
  date:cartItem.date,
    fromTime:cartItem.fromTime,
    toTime:cartItem.toTime,
    mins:cartItem.mins,
    totalmins:cartItem.totalmins,
    price:price,
    status:'Paid',
    id:id,
    createdDate:new Date(),
    email:currentUser.email,
    course:cartItem.courseData.course
});

})



    axios({
      url: '/api/payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token: token,
        schedules:schedules
      }
    })
      .then(response => {
        addCollectionData("schedules",schedules)
        clearCart()
        history.push('/schedules')
        alert('succesful payment');
      })
      .catch(error => {
        console.log('Payment Error: ', error);
        alert(
          'There was an issue with your payment! Please make sure you use the provided credit card.'
        );
      });
  };
 
  return (<div>
    <StripeCheckout
      label='Pay Online Now'
      name='Test Ltd.'
      billingAddress
      shippingAddress
      image='https://a2ztechacademy.herokuapp.com/a2zlogo.png'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Online Now'
      token={onToken}
      stripeKey={publishableKey}
    /><br/><br/>
    <Button type="submit" variant="contained" color="primary"  onClick={(event) => saveSchedule(event)}>Save and Pay to Bank Later</Button>
    </div>
  );
};


const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  currentUser: selectCurrentUser,

});

const mapDispatchToProps=dispatch=>({
  clearCart:()=>dispatch(clearCart())
})
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(StripeCheckoutButton));
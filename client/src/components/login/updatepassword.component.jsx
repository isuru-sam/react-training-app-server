import React from "react";
import './updatepassword.styles.scss'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
//import courseData from './courseList.data.js'
import {auth,createUserProfileDocument} from '../firebase/firebase.utils.js'

class  UpdatePassword extends React.Component
{
constructor(){
    super();
  
  }


render() {
    const style = {
        margin: 15,
      };
return <div className="update">

<h1>Update Password</h1>
  To update password please send an email to the administrator.
 <b> a2ztechacademy@gmail.com</b>
 <br/><p>Please refer help page for more details</p>
</div>
}
}
export default UpdatePassword;
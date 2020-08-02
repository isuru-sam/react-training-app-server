import React from "react";
import './register.component.scss'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
//import courseData from './courseList.data.js'
import {auth,createUserProfileDocument} from '../firebase/firebase.utils.js'

class  Register extends React.Component
{
constructor(){
    super();
  //  this.state={courseData:courseData};
  this.state={
    displayName:'',
    last_name:'',
    email:'',
    password:'',
    confirmPassword:''
  }
}
handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };
handleClick=async event => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });

      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error(error);
    }
  };
render() {
    const style = {
        margin: 15,
      };
return <div className="signin-register">

<h1>Register</h1>

<TextField name="displayName"
             placeholder="Enter your First Name"
            // floatingLabelText="First Name" 
            label="FirstName"
             onChange = {this.handleChange}
             />
           <br/>
          
        <TextField name="email"
             placeholder="Enter your Email"
             type="email"
             label="Email"
            // floatingLabelText="Email"
             onChange = {this.handleChange}
             />
           <br/>
         <TextField name="password"
             type = "password"
             label="Password"
             placeholder="Enter your Password"
            // floatingLabelText="Password"
             onChange = {this.handleChange}
             />
           <br/>
           <TextField name="confirmPassword"
             type = "password"
             label="Confirm Password"
             placeholder="Enter your Password"
            // floatingLabelText="Password"
             onChange ={this.handleChange}
             />
           <br/>
           <Button type="submit" variant="contained" color="primary" style={style} onClick={(event) => this.handleClick(event)}>Register</Button>

</div>
}
}
export default Register;
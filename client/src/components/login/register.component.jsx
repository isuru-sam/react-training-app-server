import React from "react";
import './register.component.scss'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
//import courseData from './courseList.data.js'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {auth,createUserProfileDocument} from '../firebase/firebase.utils.js'
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class  Register extends React.Component
{
constructor(){
    super();
  //  this.state={courseData:courseData};
  this.state={ error:false,message:'',
    displayName:'',
    last_name:'',
    email:'',
    password:'',
    confirmPassword:''
  }
}
handleCloseError = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  this.setState({
      error:false
  })
};
handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };
handleClick=async event => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

if(displayName==null || displayName=='') {
  this.setState({
    error:true,
    message:'Display name cannot be empty'
  })
  return;
}

if(email==null || email=='') {
  this.setState({
    error:true,
    message:'Email cannot be empty'
  })
  return;
}

var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

if (!pattern.test(email) ){
  this.setState({
    error:true,
    message:'Email format is not correct'
  })
  return;
  

}


    if (password==''|| password==null || (password !== confirmPassword)) {
      this.setState({
        error:true,
        message:'Passwords wont match or password is empty'
      })
      return;
    }

    if (password.length<6) {
      this.setState({
        error:true,
        message:'Passwords length should be at least 6'
      })
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
      this.setState({
        error:true,
        message:'User already exists or Unknown error occured from server.Please try different email'
      })
      return;
    }
  };
render() {
    const style = {
        margin: 15,
      };

      const {error,message}=this.state;
return <div className="signin-register">

<h1>Register</h1>

<TextField name="displayName"
             placeholder="Enter your First Name"
            // floatingLabelText="First Name" 
            label="Display Name"
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
           
           <Snackbar open={error} autoHideDuration={5000}   anchorOrigin={{ vertical: 'top', horizontal: 'center'}} onClose={(event) => this.handleCloseError(event)}>
        <Alert onClose={(event) => this.handleCloseError(event)} severity="error" >
       {message}
          
        </Alert>
      </Snackbar>
</div>
}
}
export default Register;
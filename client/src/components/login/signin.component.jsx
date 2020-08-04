import React from "react";
import './signin.component.scss'
import {signInWithGoogle,auth} from '../firebase/firebase.utils.js'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import {withRouter} from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
//import { auth } from "firebase";
//import courseData from './courseList.data.js'
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class  SignIn extends React.Component
{
constructor(){
    super();
    this.state={
        email:'',
        password:''
        ,
        error:false,message:'',
        }
}

handleChange = event => {
  const { value, name } = event.target;

  this.setState({ [name]: value });
  console.log(value);
};
handleCloseError = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  this.setState({
      error:false
  })
};
handleClick= async event=>{
  event.preventDefault();
const {email,password}=this.state;
console.log(email);
console.log(password);
try{
await auth.signInWithEmailAndPassword(email,password);
console.log('loggedin')
}catch(e){
  this.setState({
    error:true,
    message:'UserNameor Password is incorrect.Please try again'
  })
  
}


    this.setState({ email: '', password: '' });
}

//https://medium.com/technoetics/create-basic-login-forms-using-create-react-app-module-in-reactjs-511b9790dede
render() {
    const style = {
        margin: 15,
       };
       const {email,password,error,message}=this.state;
   
return <div className="signin-register">
<h1>Login</h1>
<TextField name="email"  value={email} autoComplete="off"
             placeholder="Enter your Username"  label="UserName"
             //floatingLabelText="Username"
             onChange = {this.handleChange}
             />
           <br/>
             <TextField name="password" value={password} autoComplete="off"
               type="password" label="Password"
               placeholder="Enter your Password"
               //floatingLabelText="Password"
               onChange =  {this.handleChange}
               />
             <br/>
             <Button variant="contained" color="primary" style={style} onClick={(event) => this.handleClick(event)}>Login</Button>
             <Button variant="contained" color="primary" style={style} onClick={signInWithGoogle}>LoginWithGoogle</Button>
             <br/>
             <Link href="#"  style={style} onClick={()=>this.props.history.push('/updatepassword')}>
        Reset/Forgot Password
      </Link>
      <Snackbar open={error} autoHideDuration={5000}   anchorOrigin={{ vertical: 'top', horizontal: 'center'}} onClose={(event) => this.handleCloseError(event)}>
        <Alert onClose={(event) => this.handleCloseError(event)} severity="error" >
       {message}
          
        </Alert>
      </Snackbar>
</div>
}
}
export default withRouter(SignIn);
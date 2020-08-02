import React from "react";
import SignIn from "../../components/login/signin.component";
import Register from "../../components/login/register.component";
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {useLocation} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }

class  SignInRegister extends React.Component
{
constructor(){
    super();
    this.state={msg:'',open:false}
   // this.state={courseData:courseData};
}
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
        open:false
    })
  };

  componentDidMount(){
      //  const location = useLocation() 
      //console.log('ll'+this.props.location.customNameData)
          console.log((this.props.location.customNameData)?this.props.location.customNameData.msg:'')
          this.props.location.customNameData? this.setState({
                 open:this.props.location.customNameData.open,msg:this.props.location.customNameData.msg
            })  :this.setState({  })
  }
componentWillUnmount(){
        this.setState({
                open:false
            })  
}
render() {
        const {open,msg}=this.state;
       // const {msg}=this.props.location.state;
return <div className="signin-register" style={{align:'center',marginleft:'50'}}>
<Grid container spacing={3}>
        <Grid item xs>
        <SignIn/>
        </Grid>
        <Grid item xs>
          
<Register/>
        </Grid>
       </Grid>
       <Snackbar open={open} autoHideDuration={10000}  anchorOrigin={{ vertical: 'top', horizontal: 'center'}} onClose={(event) => this.handleClose(event)}>
        <Alert onClose={(event) => this.handleClose(event)} severity="success">
          {msg}}
        </Alert>
      </Snackbar>
</div>
}
}
export default withRouter(SignInRegister);
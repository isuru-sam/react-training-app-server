import { AppBar, Toolbar, Typography } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from "@material-ui/core/styles";
import {ReactComponent as Logo} from '../../../assets/images/a2zlogo.svg';
import React from "react";
import {withRouter} from 'react-router-dom'
import {auth} from '../../firebase/firebase.utils.js'
import {connect} from 'react-redux'
// import Link from '@material-ui/core/Link';
// import LangSwithcher from '../languageSwitcher';
//import styles from "./styles";
import './topMenuBar.scss';
import CartIcon from '../../cart-icon/cart-icon.component.jsx'
import CartDropdown from '../../cart-dropdown/cart-dropdown.component.jsx'
import { createStructuredSelector } from 'reselect';
import Box from '@material-ui/core/Box';


import { selectCartHidden } from '../../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../../redux/user/user.selector';
//import { makeStyles } from '@material-ui/core/styles';
class TopMenuBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            anchorEl2:null
          
        }
    }

    componentDidMount() {
      
    }

  

     handleClick = (event) => {
        this.setState({anchorEl:event.currentTarget});
      };

      handleClick2 = (event) => {
        this.setState({anchorEl2:event.currentTarget});
      };
    
       handleClose = () => {
        this.setState({anchorEl:null});
      };
      handleClose2 = () => {
        this.setState({anchorEl2:null});
      };
      handleCloseSchedules =() => {
        this.setState({anchorEl:null});
          this.props.history.push("/schedules")
      
     };

     handleCloseLogOut =() => {
        auth.signOut();
        this.props.history.push('/')
        //this.props.history.push("/schedules")
     this.setState({anchorEl:null});
   };

   handleCloseAbout =() => {
   // console.log('about')
      this.props.history.push("/about");
      this.setState({anchorEl2:null});
  
 };

 handleCloseHelp =() => {
//console.log('help')
    this.props.history.push("/help");
    this.setState({anchorEl2:null});

};
   
    render() {
       
          const {history}=this.props;
     //   const classes = useStyles();
     const {anchorEl,anchorEl2}=this.state;
const {currentUser,hidden} = this.props;
        return (

            <AppBar position="static">
            <Toolbar >
            <Box display='flex'  flexGrow={1}>
                <Logo className="logo"/>
              
           </Box>
              <Button color="inherit" onClick={()=>history.push("/")}>Home</Button>
              <Button aria-controls="about-menu" color="inherit"  aria-haspopup="true" onClick={this.handleClick2}>
       About
      </Button>

      <Menu
        id="about-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={this.handleClose2}
      >
        <MenuItem onClick={this.handleCloseAbout}>About</MenuItem>

        <MenuItem onClick={this.handleCloseHelp}>Help</MenuItem>
      </Menu>
              <Button   color="inherit"  onClick={(event) => {currentUser?history.push("/checkout"):history.push({pathname:'/signInRegister',customNameData:{msg:'Please login/register to checkout',open:true}})}}>Checkout</Button>
         
            {
              currentUser ? '' : <Button color="inherit" onClick={()=>history.push("/signInRegister")}>Login</Button>
            }
               
            <CartIcon/>
            {

            currentUser ?<Button aria-controls="simple-menu" color="inherit"  aria-haspopup="true" onClick={this.handleClick}>
       My Account
      </Button>:''
            }
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={this.handleClose}
      >
        <MenuItem onClick={this.handleCloseSchedules}>Schedules</MenuItem>

        <MenuItem onClick={this.handleCloseLogOut}>Logout</MenuItem>
      </Menu>

     
     
            <div>{
            hidden?null:<CartDropdown/>
            }
            </div>
              </Toolbar>
          </AppBar>
        
        );
    }
}


//const TopMenuBarStyles = withStyles(styles)(TopMenuBar);


/*
const mapStateToProps=(state)=>({
    currentUser:state.user.currentUser,
    hidden:state.cart.hidden
})*/

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
  });
  

export default connect(mapStateToProps)(withRouter(((TopMenuBar))));
//export default connect(mapStateToProps, { signOut })(withTranslation('translations')(TopMenuBarStyles));
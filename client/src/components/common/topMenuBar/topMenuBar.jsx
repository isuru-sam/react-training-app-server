import { AppBar, Toolbar, Typography } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from "@material-ui/core/styles";
import {ReactComponent as Logo} from '../../../assets/images/a2z.svg';
import React from "react";
import {withRouter} from 'react-router-dom'
import {auth} from '../../firebase/firebase.utils.js'
import {connect} from 'react-redux'
// import Link from '@material-ui/core/Link';
// import LangSwithcher from '../languageSwitcher';
import styles from "./styles";
import './topMenuBar.scss';
import CartIcon from '../../cart-icon/cart-icon.component.jsx'
import CartDropdown from '../../cart-dropdown/cart-dropdown.component.jsx'
import { createStructuredSelector } from 'reselect';


import { selectCartHidden } from '../../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../../redux/user/user.selector';
//import { makeStyles } from '@material-ui/core/styles';
class TopMenuBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            language: 'en',
            lang: false
        }
    }

    componentDidMount() {
        const user = localStorage.getItem('user');
        if (user) {
            this.setState({
                user: JSON.parse(user)
            });
        }
    }

  

    handleLanguage = event => {
        let newLang = event.target.value;
        this.setState({ language: newLang })
        this.props.i18n.changeLanguage(newLang);
    }

    handleMenu = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    openLangSelector = () => {
        // this.setState({ lang: true });
    }

    render() {
       
          const {history}=this.props;
     //   const classes = useStyles();
const {currentUser,hidden} = this.props;
        return (

            <AppBar position="static">
            <Toolbar >
                <Logo className="logo"/>
              <IconButton edge="start" className="classes.menuButton" color="inherit" aria-label="menu"  style={{ flex: 1 }}>
              { //<MenuIcon />
              }
              </IconButton>
              <Typography variant="h6" className="classes.title">
                News
              </Typography>
              <Button  color="inherit"  onClick={(event) => {currentUser?history.push("/checkout"):history.push({pathname:'/signInRegister',customNameData:{msg:'Please login/register to checkout',open:true}})}}>Checkout</Button>
              <Button color="inherit" onClick={()=>history.push("/")}>Home</Button>
            {
              currentUser ? <Button color="inherit" onClick={()=>auth.signOut()}>LogOut</Button> : <Button color="inherit" onClick={()=>history.push("/signInRegister")}>Login</Button>
            }
            <CartIcon/>
            
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
  

export default connect(mapStateToProps)(withRouter((withStyles(styles)(TopMenuBar))));
//export default connect(mapStateToProps, { signOut })(withTranslation('translations')(TopMenuBarStyles));
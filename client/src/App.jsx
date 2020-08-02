import React,{lazy,Suspense} from "react";
import {Route,Switch,Redirect} from "react-router-dom"
//import ItemListPage from "./views/itemList/itemList.jsx";
import CourseDescription from "./components/courseDescription/courseDescription.component.jsx";
import SignInRegister from "./views/signin-register/signin-register.jsx";
import {auth,createUserProfileDocument,addCollectionData} from './components/firebase/firebase.utils.js'
import TopNavBar from "./components/common/topMenuBar/topMenuBar";
import Schedules from "./components/schedules/schedules.component";
import Footer from "./components/common/footer/footerBar";
import {connect} from 'react-redux'
import './App.css'
import setCurrentUser from './redux/user/user.actions.js'
import CheckoutPage from './views/checkout/checkout.component.jsx'
import courseData from './components/courseList/courseList.data'
const ItemListPage = lazy(()=>import('./views/itemList/itemList.jsx'))
class  App extends React.Component{

unsubscribeFromAuth=null;
componentDidMount(){
  const {setCurrentUser}=this.props;
  this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    if (userAuth) {
      const userRef = await createUserProfileDocument(userAuth);

      userRef.onSnapshot(snapShot => {
        setCurrentUser({
         
            id: snapShot.id,
            ...snapShot.data()
          
        });

        console.log(this.state);
      });
    }

    setCurrentUser( userAuth );
    //addCollectionData('courses',courseData)
  });
}
componentWillUnmount(){
   this.unsubscribeFromAuth=null;
}
// currentUser={this.state.currentUser}

render(){ return <div>
    <TopNavBar />
<Switch>
  <Suspense fallback={<div>...Loading</div>}>
  <Route exact path="/" component={ItemListPage}/>
  
  <Route exact path="/courseDescription/:id" component={CourseDescription}/>
  <Route exact path="/checkout" component={CheckoutPage}/>
  <Route exact path="/schedules" component={Schedules}/>
  <Route exact path="/signInRegister"  render={()=>this.props.currentUser?(<Redirect to="/"/>):<SignInRegister/>}/>
  </Suspense>
</Switch>
<Footer/>
</div>

}
}
const mapStateToProps=(state)=>({
  currentUser:state.user.currentUser
})

const mapDispatchToProps=dispatch=>({
  setCurrentUser:user=>dispatch(setCurrentUser(user))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {firestore} from '../firebase/firebase.utils'
import { selectCurrentUser } from '../../redux/user/user.selector';
import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect';
class  Schedules extends React.Component
{
constructor(){
    super();
this.state={schedules:[]}
this.mounted=false;
this.unsub=null;
}
componentWillUnmount() {
    this.mounted = false;
  }
componentDidMount(){
    this.mounted = true;
    const courseCollectionref=  firestore.collection('schedules').where("email", "==", this.props.currentUser.email)
    var schedulestmp = [];
    var i=0;
    this.unsub=courseCollectionref.onSnapshot(snapshot=> {
        
        snapshot.forEach(doc=> {
            //console.log(doc.data())
            var tmp={
         
                key: i++,
                ...doc.data()
              
            }
            schedulestmp.push(tmp);
        });
        if(this.mounted){
       this.setState({schedules:schedulestmp})
        }
       // console.log("Current cities in CA: ", cities.join(", "));
    })

   // console.log('date'+date)
}
componentWillMount(){
this.unsub=null;
}
render() {
    const {schedules}=this.state;
return <div className="schedule-list">
    <h1 align="center">My Schedule</h1>
<TableContainer component={Paper}>
      <Table className="table" size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>CourseTitle</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">From</TableCell>
            <TableCell align="right">To</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schedules.map((row) => (
            <TableRow key={row.key}>
              <TableCell  component="th" scope="row"> {row.course} </TableCell>
             
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.fromTime}</TableCell>
              <TableCell align="right">{row.toTime}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

</div>

}


}
const mapStateToProps = createStructuredSelector({
   
    currentUser: selectCurrentUser
  
  });
  
export default connect(mapStateToProps)(Schedules)
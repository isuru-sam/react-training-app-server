
import React from "react";
import {withRouter} from "react-router-dom"
import './courseDescription.styles.scss'
import Button from "@material-ui/core/Button";
//import courseData from '../courseList/courseList.data.js'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import 'date-fns';
import TextField from '@material-ui/core/TextField';
import moment from 'moment'
import {firestore} from '../firebase/firebase.utils'
import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect';
import {addItem} from '../../redux/cart/cart.actions.js'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import nextId from "react-id-generator";
import CourseRequirements from './courseRequirements'

import {selectCourses} from '../../redux/course/course.selectors'
import {selectCartItems} from '../../redux/cart/cart.selectors'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
//const { uuidv4 } = require('uuidv4');
import { v4 as uuidv4 } from 'uuid';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
class  CourseDescription extends React.Component
{
constructor(){
    super();
    this.htmlId = nextId();
    const dateNow = new Date(); // Creating a new date object with the current date and time
const year = dateNow.getFullYear(); // Getting current year from the created Date object
const monthWithOffset = dateNow.getUTCMonth() + 1; // January is 0 by default in JS. Offsetting +1 to fix date for calendar.
const month = // Setting current Month number from current Date object
  monthWithOffset.toString().length < 2 // Checking if month is < 10 and pre-prending 0 to adjust for date input.
    ? `0${monthWithOffset}`
    : monthWithOffset;
const date =
  dateNow.getUTCDate().toString().length < 2 // Checking if date is < 10 and pre-prending 0 if not to adjust for date input.
    ? `0${dateNow.getUTCDate()}`
    : dateNow.getUTCDate();

const materialDateInput = `${year}-${month}-${date}`; 



    this.state={courseData:[],open:false,error:false,date:materialDateInput,selectedDate:materialDateInput,fromTime:'07:00',toTime:'09:00'};
    
//this.course=courseData.filter((c) => task.duration >= 120 );
}

validateSchedule=async event=>{
  event.preventDefault();
  const {selectedDate,fromTime,toTime,courseData}=this.state;

 console.log('date is'+selectedDate)
  let dateTimeA = moment(selectedDate + ' ' + fromTime, 'YYYY-MM-DD HH:mm');
  let dateTimeB = moment(selectedDate + ' ' + toTime, 'YYYY-MM-DD HH:mm');
  if(dateTimeA>=dateTimeB){
    this.setState({
      message:'From Time is greater than  to Time',
      error:true
    })
    return;
  }
  const courseCollectionref=  firestore.collection('schedules').where("date", "==", selectedDate)
  var schedulestmp = [];
  var i=0;
  this.unsub=courseCollectionref.onSnapshot(snapshot=> {
    let overlap=false
      snapshot.forEach(doc=> {
          //console.log(doc.data())
          var tmp={
       
             
              ...doc.data()
            

          }
          let dateTimeAD= moment(tmp.date + ' ' + tmp.fromTime, 'YYYY-MM-DD HH:mm');
          let dateTimeBD = moment(tmp.date + ' ' + tmp.toTime, 'YYYY-MM-DD HH:mm');
         
          if(dateTimeA>dateTimeAD && dateTimeA<dateTimeBD){
          overlap=true
          }
          if(dateTimeB>dateTimeAD && dateTimeB<dateTimeBD){
            overlap=true
            }
            if(dateTimeA<=dateTimeAD && dateTimeB>=dateTimeBD){
              overlap=true
              }
              if(overlap) {
         // console.log(tmp.date)
         // schedulestmp.push(tmp);
              }

             

      });
//let overlapc=false;
this.props.cartItems.forEach(cartItem=>{
  let dateTimeAC= moment(cartItem.date + ' ' + cartItem.fromTime, 'YYYY-MM-DD HH:mm');
  let dateTimeBC = moment(cartItem.date + ' ' + cartItem.toTime, 'YYYY-MM-DD HH:mm');
  if(dateTimeA>dateTimeAC && dateTimeA<dateTimeBC){
    //console.log(1)
    overlap=true
    }
    if(dateTimeB>dateTimeAC && dateTimeB<dateTimeBC){
     // console.log(2)
      overlap=true
      }
      if(dateTimeA<=dateTimeAC && dateTimeB>=dateTimeBC){
        //console.log(3)
        overlap=true
        }
})


      if(overlap){
        this.setState({
          error:true,
          message:'Selected schdule overlaps with existing schedule',
        })
        return;
      }
let valid=true;
      const day = dateTimeA.isoWeekday() ; // Monday ... Sunday
      //console.log('da'+day)
      const isWeekend = (day === 6 || day === 0);  
      if(isWeekend){
      //  console.log('weekend')
      if(fromTime<'08:00' || fromTime>'23:00' || toTime<'08:00' || toTime>'23:00'){
     valid=false;
      }
      } else {
        if(fromTime<'18:00' || fromTime>'23:00' || toTime<'18:00' || toTime>'23:00'){
          valid=false;
           }
      }



      if(!valid){
        this.setState({
          error:true,
          message:'Week Days 6PM-11PM and WeenEnds 8AM to 11PM only '
        })
        return;
      }
//=======================normal flow
let datetimeC = dateTimeB.diff(dateTimeA, 'minutes');
let hours =(Math.floor((datetimeC)/60))
let mins= (datetimeC)%60
let totalmins=datetimeC
let item={
    id:uuidv4(),
    date:selectedDate,
    fromTime:fromTime,
    toTime:toTime,
    mins:mins,
    totalmins:totalmins,
    courseData:courseData,
    hours:hours
}
this.props.addItem(item)
    


    //const {courseData,date,fromTime,toTime,hours,minutes,totalMinutes}=this.state;
console.log(item);
this.setState({
  open:true
})

//=================


    })
//console.log('here'+schedulestmp.length)
    
}
handleClick=async event => {
    event.preventDefault();
  
   console.log('here')

   const {date,fromTime,toTime,courseData}=this.state;

 
   let dateTimeA = moment(date + ' ' + fromTime, 'YYYY-MM-DD HH:mm');
   let dateTimeB = moment(date + ' ' + toTime, 'YYYY-MM-DD HH:mm');
 
let datetimeC = dateTimeB.diff(dateTimeA, 'minutes');
let hours =(Math.floor((datetimeC)/60))
let mins= (datetimeC)%60
let totalmins=datetimeC
let item={
    id:uuidv4(),
    date:date,
    fromTime:fromTime,
    toTime:toTime,
    mins:mins,
    totalmins:totalmins,
    courseData:courseData,
    hours:hours
}
this.props.addItem(item)
    


    //const {courseData,date,fromTime,toTime,hours,minutes,totalMinutes}=this.state;
console.log(item);
this.setState({
  open:true
})
}


componentDidMount(){
    let id =this.props.match.params.id
    console.log(this.props.courses)
    let result = this.props.courses.find(c => (c.id == id  ));
    console.log('result is'+result)
   this.setState({courseData:result})
}

 handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
        open:false
    })
  };

  handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
        error:false
    })
  };
  calculateTimes(){
    //this.state = {startDate:1519026163000, timeEnd:1519126755000} // example

    const {date,fromTime,toTime}=this.state;
    let dateTimeA = moment(date + ' ' + fromTime, 'YYYY-MM-DD HH:mm');
    let dateTimeB = moment(date + ' ' + toTime, 'YYYY-MM-DD HH:mm');
  
let datetimeC = dateTimeB.diff(dateTimeA, 'minutes');
this.setState({
    hours:(datetimeC+60)/60,
    minutes:(datetimeC+60)%60,
    totalMinutes:(datetimeC+60)
})
console.log(datetimeC);
  }

   handleDateChange = (date) => {
    console.log(date.target.value)
   this.setState({
       selectedDate:date.target.value
   })
  };
  handleFromTimeChange = (time) => {
      console.log(time.target.value)
    this.setState({
        fromTime:time.target.value
    })
   };

   handleToTimeChange = (time) => {
    console.log(time.target.value)
   // this.calculateTimes(time.target.value)
    this.setState({
        toTime:time.target.value
    })

   

   };
render() {
  
    const {history}=this.props
    const { match: { params } } = this.props;
    console.log(params.id);
    const {message,error,open,selectedDate,courseData}=this.state;
    
    return <div className="coursetitle-list">
      <Grid container spacing={3}>
      <Grid item xs>
      <h1>{courseData.course}</h1>
    <div className="diectory-menu">
     <ul>
      {
      courseData.subSections?courseData.subSections.map(section=>(
       
    
       <li key={section.id}>{section.title}</li>)):''
    
      
    }
      </ul>
    
    </div>
    <div> <br/>
      <h3>Pick a date and time to schedule</h3>
      <Grid container spacing={3}>
      <Grid item xs>
    <TextField
    id="date"
    label="Date"
    type="date"
    defaultValue={selectedDate}
    onChange={e=>this.handleDateChange(e)}
//value={selectedDate}
    //className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
  />
 </Grid>
 <Grid item xs>
   <TextField
    id="time"
    label="From"
    type="time"
    defaultValue="07:00"
  //  className={classes.textField}
  onChange={e=>this.handleFromTimeChange(e)}
    InputLabelProps={{
      shrink: true,
    }}
    inputProps={{
      step: 300, // 5 min
    }}
  />
  </Grid>
  <Grid item xs>
   <TextField
    id="time"
    label="To"
    type="time"
    defaultValue="09:00"
    onChange={e=>this.handleToTimeChange(e)}
    //className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
    inputProps={{
      step: 300, // 5 min
    }}
  />
  </Grid>
  </Grid>
  </div>
  <div><br/>
    <Button type="submit" variant="contained" color="primary"  onClick={(event) => this.validateSchedule(event)}>Add To Cart</Button>
    
    <Snackbar open={open} autoHideDuration={3000}  anchorOrigin={{ vertical: 'top', horizontal: 'center'}} onClose={(event) => this.handleClose(event)}>
        <Alert onClose={(event) => this.handleClose(event)} severity="success">
          Item added succesfully
        </Alert>
      </Snackbar>

      <Snackbar open={error} autoHideDuration={10000}   anchorOrigin={{ vertical: 'top', horizontal: 'center'}} onClose={(event) => this.handleCloseError(event)}>
        <Alert onClose={(event) => this.handleCloseError(event)} severity="error" >
       {message}
          
        </Alert>
      </Snackbar>

    </div>
    </Grid>
    <Grid  item xs>
<CourseRequirements hourlyRate={courseData.hourlyRate+"USD"}/>
    </Grid>
    </Grid>
    </div>
    }
    }
    
const mapDispatchToProps=dispatch=>({
    addItem:item=>dispatch(addItem(item))
})

const mapStateToProps = createStructuredSelector({
  courses: selectCourses,
  cartItems: selectCartItems
});

export default connect(mapStateToProps,mapDispatchToProps) (withRouter(CourseDescription));
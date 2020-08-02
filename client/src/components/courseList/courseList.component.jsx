import React from "react";
import './courseList.styles.scss'
import courseData from './courseList.data.js'
import CourseItem from "../courseItem/courseItem.component";
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux'
import {firestore} from '../firebase/firebase.utils.js'
import {fetchCoursesStart} from '../../redux/course/course.actions'
import { createStructuredSelector } from 'reselect';
import {selectCourses} from '../../redux/course/course.selectors'

class  CourseList extends React.Component
{
    unsub=null;
constructor(){
    super();
    this.state={loading:true};
}
componentDidMount(){
    var cdata=[];
  /*  const courseCollectionref= firestore.collection('courses')
  this.unsub=  courseCollectionref.onSnapshot(async course => {
       course.docs.map(doc=>{cdata.push(doc.data())})
      
        this.setState({courseData:cdata});*/
        this.props.fetchCoursesStart()
        //this.setState({loading:false})
  //  })
  //  console.log(cdata)
}
componentWillUnmount(){
//this.unsub.uns
}
render() {
return <div className="course-list">
<div className="diectory-menu">
<Grid container spacing={3}>
{
    
    this.props.courses.map(({course,desc,imageUrl,id,subSections})=>
    (<Grid item xs={4} key={id}>
        <CourseItem key={id} title={course} desc={desc} imageUrl={imageUrl} id={id} subSections={subSections}/>
        </Grid>))

}
</Grid>
</div>
</div>

}
}
const mapDispatchToProps=(dispatch)=>({
    fetchCoursesStart:()=>dispatch(fetchCoursesStart())
});

const mapStateToProps = createStructuredSelector({
    courses: selectCourses
  
  });
export default connect(mapStateToProps,mapDispatchToProps)(CourseList);
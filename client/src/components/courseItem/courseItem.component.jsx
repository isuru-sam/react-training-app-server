

import React from "react";
import {Link} from 'react-router-dom'
import './courseItem.styles.scss'
const CourseItem=({title,hourlyRate,desc,imageUrl,id, subSections})=>(


<div style={{
    backgroundImage:`url(${imageUrl})`
 }} 
className="course-item">
<div className="content">
    <h1 className="course"><Link to={`/courseDescription/${id}`} >{title}</Link></h1>
    <span className="desc">{hourlyRate}USD/hr</span>
</div>
</div>


)

export default CourseItem;
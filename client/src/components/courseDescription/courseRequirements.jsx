import React from "react";
const CourseRequirements = ({hourlyRate}) => {
    //const greeting = 'Hello Function Component!';
   
    return <div>
<h1>Course Requirements and Conditions</h1>

<div>
<h3>Nature of the course</h3>
<ul>
    <li>This is a distance learning course</li>
    <li>Hourly Rate {hourlyRate}</li>
    <li>No of hours will vary based on student</li>
    <li>Hours can be scheduled based on availability of slots</li>
    <li>Multiple slots for same course or different courses can be schduled in a single checkout</li>
<li>Individual subscription preferred for a session</li>
<li>Maximum of 2 subscribers for a session</li>
<li>Payments can be done via online or deposit to bank later</li>
</ul>
</div>

<div>
<h3>Software/Hardware Requirements</h3>
<ul><li>Laptop/PC</li>
<li>Internet Connection</li>
<li>Zoom or Slack</li>
<li>HeadPhone/Mic</li>
</ul>
</div>


<div>
<h3>Lectuerer Profile</h3>
<ul>
<li>Bsc Moratuwa Computer Science</li>
<li>Oracle certified Java Architect</li>
<li>AWS certified Cloud Architect</li>
<li>PMP certified from PMI</li>
<li>PMI-ACP certified from PMI</li>
</ul>
</div>
<div>
<h3>Support or Questions</h3>
<ul>

<li>Email:a2ztechacademy@gmail.com</li>
<li>Skype:a2ztechacademy</li>

</ul>
</div>



    </div>;
  };
   
  
   
  export default CourseRequirements;
import CourseActionTypes from './course.types'
export const updateCourses=(courses)=>({
type:CourseActionTypes.UPDATE_COURSES,
payload:courses
})

export const fetchCoursesStart = () => ({
    type: CourseActionTypes.FETCH_COURSES_START
  });


  
export const fetchCoursesSuccess = courses => ({
    type: CourseActionTypes.FETCH_COURSES_SUCCESS,
    payload: courses
  });
  
  export const fetchCoursesFailure = errorMessage => ({
    type: CourseActionTypes.FETCH_COURSES_FAILURE,
    payload: errorMessage
  });
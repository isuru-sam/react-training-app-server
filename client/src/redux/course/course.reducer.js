import CourseActionTypes from './course.types';


const INITIAL_STATE={
    hidden:true,
    courses:[]
}

const courseReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case CourseActionTypes.UPDATE_COURSES:
        return {
            ...state,courses:action.payload
        }; 
        case CourseActionTypes.FETCH_COURSES_SUCCESS:
          return {
            ...state,
            isFetching: false,
            courses: action.payload
          };
        case CourseActionTypes.FETCH_COURSES_FAILURE:
          return {
            ...state,
            isFetching: false,
            errorMessage: action.payload
          };
          default:
        return state;
    }
  };
  
  export default courseReducer;
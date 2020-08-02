import {createContext} from 'react'
import courseData from './courseList.data'

const CoursesContext=createContext(courseData)

export default CoursesContext
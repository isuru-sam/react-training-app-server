import { createSelector } from 'reselect';

const selectCourse = state => state.course;

export const selectCourses = createSelector(
  [selectCourse],
  course => course.courses
);


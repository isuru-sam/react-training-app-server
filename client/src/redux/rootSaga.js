import { all, call } from 'redux-saga/effects';
import {fetchCoursesStart} from './course/course.saga'
//import { onFetchCollectionsStart } from './shop/shop.sagas';

export default function* rootSaga() {
  yield all([call(fetchCoursesStart)]);
}
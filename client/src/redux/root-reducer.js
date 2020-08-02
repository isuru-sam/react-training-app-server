import {combineReducers} from'redux'
import {persistReducer} from 'redux-persist'
import storage from'redux-persist/lib/storage'
import userReducer from './user/user.reducer.js'
import cartReducer from './cart/cart.reducer.js'
import courseReducer from './course/course.reducer.js'

const persistConfig={
    key:'root',
    storage,
    whiteList:['cart','course']
}
const rootReducer =  combineReducers({
    user:userReducer,
    cart:cartReducer,
    course:courseReducer
})

export default persistReducer(persistConfig,rootReducer)
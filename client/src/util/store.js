import React from "react";
import {applyMiddleware, createStore, compose} from "redux";
import {Provider} from "react-redux";
import RootReducer from "../_reducers";
import thunk from "redux-thunk";

const initialstate = {
   
};
const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(RootReducer , initialstate, composeEnhancers(applyMiddleware(...middleware)));


export function StoreProvider(props){
return <Provider store={store}>{props.children}</Provider>
}
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';



import theme from "./styles/theme";
import { MuiThemeProvider } from "@material-ui/core";
import { PersistGate} from 'redux-persist/integration/react'
import {store,persistor} from './redux/store.js'
import App  from "./App.jsx";
import {BrowserRouter} from "react-router-dom"
ReactDOM.render(
  
     <MuiThemeProvider theme={theme}>
       <Provider store={store}>
       <BrowserRouter>
                      <PersistGate persistor={persistor}>
                        <App/>
                        </PersistGate>
                     </BrowserRouter>
                     </Provider>
                    </MuiThemeProvider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

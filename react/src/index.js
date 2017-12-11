import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import store from "./actions/store"
import App from './App';
import {Router} from 'react-router-dom';


ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'));

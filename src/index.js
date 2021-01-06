import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {fetchCategories} from "./store/category";
import store from "./store";
import {initialState} from "./store/authen";
import jwtDecode from "jwt-decode";

require('dotenv').config()
ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
store.dispatch(fetchCategories())

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

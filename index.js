import React from 'react';
import { BrowserRouter } from "react-router-dom";
import reactDom from "react-dom";
import 'antd/dist/antd.css';
import './index.css';

import App from './App';


reactDom.render(
  <BrowserRouter>
      <App />
  </BrowserRouter>
  , document.querySelector('#root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


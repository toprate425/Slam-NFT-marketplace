import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import './assets/css/main.css'
import "bootstrap/dist/css/bootstrap.css";
import "./index.scss"
import App from './App'
import {HeaderContextProvider} from './context'
ReactDOM.render(
  <React.StrictMode>
    <HeaderContextProvider>
    <App />
    </HeaderContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

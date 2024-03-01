import ReactDOM from 'react-dom/client'
import React from "react";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'
import {BrowserRouter as Router} from "react-router-dom";
import axios from "axios";

// axios.defaults.baseURL ='http://192.168.202.41:8081/api/observatory';
axios.defaults.baseURL ='https://192.168.202.3:8443/api/observatory';

const root = ReactDOM.createRoot(
    document.getElementById('root')
);
root.render(
    <Router>
        <App/>
    </Router>
);



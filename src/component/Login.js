import React, {useState} from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import Logo from "../images/markaz.png"
import "../styles/login.css"

function Login(props) {


    function userLogin(e) {
        e.preventDefault();
        let username=e.target.username.value;
        let password=e.target.password.value;


        let newObj={
            username:username,
            password:password,
        };

        // axios.post(`http://192.168.202.41:8081/api/observatory/auth/login`,newObj,{
        axios.post(`https://www.observator.uz:8443/api/observatory/auth/login`,newObj,{
            // headers:{
            //     'Content-Type': 'application/x-www-form-urlencoded',
            //     'Accept': 'application/json'
            // }
        }).then((res)=>{
            toast.success('Foydalanuvchi tasdiqlandi');
            // console.log(res.data)
            localStorage.setItem('token',res.data.object);
            props.history.push('/adminPanel');
        }).catch((e)=>{
            toast.error('Foydalanuvchi tasdiqlanmadi')
        })
    }
    return (
        <div id="loginBody">
            <div className="container">
                <div className="row" id='rowLogin'>
                    <div className="col-xl-3 col-md-6 col-sm-8 col-12" id="divCard">
                        <div className="card border-0" id="cardStyle">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-xl- col-md-4 col-sm-4 offset-4 col-4 mb-3">
                                        <img src={Logo} className="my-3 w-100"/>
                                    </div>
                                </div>
                                <form onSubmit={userLogin}>
                                    <label id="inputTopText" htmlFor="username">Login</label>
                                    <input
                                        required={true}
                                        className="form-control mb-5"
                                        name="username"
                                        id="username"
                                        type="text"/>

                                    <label id="inputTopText" htmlFor="password">Parol</label>
                                    <input
                                        required={true}
                                        className="form-control mb-5"
                                        name="password"
                                        id="password"
                                        type="password"/>
                                    <button id="submitButton"  type="submit" className="btn mb-3 w-100"><b>KIRISH</b></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Login;



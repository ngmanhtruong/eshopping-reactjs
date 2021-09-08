import React, { Component,useState,useEffect } from 'react';
import { useHistory } from 'react-router';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

export default function Login(props){
    const users ={
        username: "admin",
        password: "123456"
    }
    const [user,setUser] = useState({username: "",password:""});
    const [error, setError] = useState('');
    const [loggedIn,setLoggedIn] = useState('');
    const [userDetails,setUserDetails] = useState({username:"",password:""});
    let history = useHistory();

    const Login = details=>{
        console.log(details);
        setLoggedIn('Logged In');
        localStorage.setItem("accessToken", true);
    }

    const Logout = ()=>{
        setUser({username: '', password:''});
        localStorage.removeItem("accessToken");
    }
    const submitHandler = e =>{
        e.preventDefault();

        Login(userDetails);
        if (userDetails.username == users.username && userDetails.password == users.password){
            setUser({
                username: userDetails.username,
                password: userDetails.password
            })
            setError("");
            alert("You're logged in! Moving back to home page...");
            history.replace("/");
        }
        else{
            console.log("Username or PW doest not match");
            setError("Username or PW doest not match");
            setLoggedIn("");
        }
            
    }
    const addUser = e =>{
        e.preventDefault();

    }
      
    return (
    <section id="form">
        {/* <!--form--> */}
        <div class="container">
            <div class="row">
                <div class="col-sm-4 col-sm-offset-1">
                    {/* <!--login form--> */}
                    <div class="login-form">
                        <h2>Login to your account</h2>
                        {(loggedIn!="") ? (<div className="logged-in">{loggedIn}</div>) : ""}
                        {(error!="") ? (<div className="error">{error}</div>) : ""}
                        <form action="#" onSubmit = {submitHandler}>
                            <input type="text" placeholder="Username" onChange={e=>setUserDetails({...userDetails,username:e.target.value})} value = {userDetails.username}/>
                            <input type="password" placeholder="Password" onChange={e=>setUserDetails({...userDetails,password:e.target.value})} value = {userDetails.password}/>
                            <span>
                                <input type="checkbox" class="checkbox"/> 
                                Keep me signed in
                            </span>
                            <button type="submit" class="btn btn-default">Login</button>
                        </form>
                    </div>
                    {/* <!--/login form--> */}
                </div>
                <div class="col-sm-1">
                    <h2 class="or">OR</h2>
                </div>
                <div class="col-sm-4">
                    {/* <!--sign up form--> */}
                    <div class="signup-form">
                        <h2>New User Signup!</h2>
                        <form action="#" onSubmit = {submitHandler}>
                            <input type="text" placeholder="Username" onChange={e=>setUserDetails({...userDetails,username:e.target.value})} value = {userDetails.username}/>
                            <input type="text" placeholder="Email Address"/>
                            <input type="password" placeholder="Password"/>
                            <button type="submit" class="btn btn-default">Signup</button>
                        </form>
                    </div>
                    {/* <!--/sign up form--> */}
                </div>
            </div>
        </div>
    </section>
    );
}

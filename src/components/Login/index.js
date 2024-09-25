import React from "react";
import './index.css';
import { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

const Signup=()=>{
    return(
        <div>
            <h3 className="signup-heading">Sign up</h3>
            <button className="oneClickBtn"><FaFacebook/>    Signup with Facebook</button>
            <br/>
            <button className="oneClickBtn"><FaGoogle/>      Signup with Google</button>
            <p className="hr-text">OR</p>
            <form>
                {/* <label for="firstname">First name</label> */}
                <input type='name'id='firstname'className="name-input" placeholder="First Name"/>
                {/* <label for="secondname">Second name</label> */}
        
                <input type='name' id='secondname'className="name-input" placeholder="Last Name"/>
                <br/>
                <input type='name' id='emailinput'className="email-input" placeholder="Email"/>
                <br/>
                <button type='submit' className="submit-btn" >Sign up</button>
            </form>
        </div>
    )
}

const LoginFields=()=>{
    return(
        <div>
            <form>
            <input type='name' id='email-input'className="email-input" placeholder="Email"/>
            <br/>
            <input type='name' id='password-input'className="email-input" placeholder="Password"/>
            <br/>
            <button type='submit' className="submit-btn" >Login</button>
            </form>
            </div>
    )
}

const Login=(props)=>{
    const [isSignupSelected,setisSignUpSelected]=useState(true)
    const signupselected=isSignupSelected?'selected':''
    const loginselected=isSignupSelected?'':'selected'
    return(
        <div className="bg">
            <div className="card">
            <h1>StaySpot</h1>
            <div className="input-select">
                <button id="signup-btn" className={`input-selection-btn ${signupselected}`} onClick={()=>setisSignUpSelected(true)}>Sign up</button>
                <button  id="login-btn" className={`input-selection-btn ${loginselected}`}onClick={()=>setisSignUpSelected(false)}>Login</button>
            </div>
            <div className="container">
            {isSignupSelected?
            <Signup/>:<LoginFields/>
            }
            </div>
            </div>
        </div>
    )
}

export default Login;
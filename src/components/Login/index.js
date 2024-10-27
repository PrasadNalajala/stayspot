import React,{useEffect} from "react";
import './index.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import axios from 'axios'
import { toast } from "react-toastify";

const Signup=()=>{
    
    const [firstName,setFirstname]=useState('')
    const [lastName,setLastname]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()
    const fecthSignUp=async()=>{
                    const data={
                        name:firstName+lastName,
                        email:email,
                        password:password
                    }
                    try {
                        const response = await axios.post('http://localhost:3000/register', data);
                        if (response.status === 201) {
                            const { token } = response.data;
                            localStorage.setItem('token', token);
                            toast.success('Registration Successful');
                            navigate('/'); 
                            console.log(response.data);
                        }
                    } catch (error) {
                        if (error.response) {
                            if (error.response.status === 400) {
                                toast.error(error.response.data.error || 'Email is already in use.');
                            } else {
                                toast.warning(error.response.data.error || 'An error occurred. Please try again.')
                            }
                        } else {
                            toast.warning('Network error. Please check your connection.');
                        }
                        console.error('Error during signup:', error);
                    }
            
    }
    const onClickSignUp=(event)=>{
        event.preventDefault()
            if (firstName&& lastName&& email&& password.length>7){
                fecthSignUp()
            }else{
                alert("Enter all the fields and Password Must be 8 Chars")
            }
    }
    return(
        <div>
            <h3 className="signup-heading">Sign up</h3>
            <button className="oneClickBtn"><FaFacebook style={{ color: '#3b5998',fontSize:'25px' }}/>    Signup with Facebook</button>
            <br/>
            <button className="oneClickBtn"><FaGoogle style={{ color: '#db4437',fontSize:'25px' }}/>      Signup with Google</button>
            <p className="hr-text">OR</p>
            <form>
                <input type='name'id='firstname'className="name-input" placeholder="First Name" onChange={(e)=>setFirstname(e.target.value)}/>
        
                <input type='name' id='secondname'className="name-input" placeholder="Last Name" onChange={(e)=>setLastname(e.target.value)}/>
                <br/>
                <input type='email' id='emailinput'className="email-input" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                <br/>
                <input type='password' id='passwordinput'className="email-input" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                <br/>
                <button type='submit' className="submit-btn" onClick={onClickSignUp}>Sign up</button>
            </form>
        </div>
    )
}

const LoginFields=()=>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('') 
    const navigate=useNavigate()
    const fecthLogin=async()=>{
        const credentials={
            email:email,
            password:password
        }
        try{
        const response=await axios.post('http://localhost:3000/login',credentials)
        if (response.status===200){
            const { token } = response.data;
            localStorage.setItem('token', token);
            toast.success("Login success")
            navigate('/')
        }
        
        }
        catch(error){
            if (error.response) {
                if (error.response.status === 400) {
                    toast.error(error.response.data.error );
                } else {
                    toast.warning(error.response.data.error )
                }
            } else {
                toast.warning('Network error. Please check your connection.');
            }
            console.error('Error during signup:', error);
        }
    }
    const onClickLogin=(e)=>{
        e.preventDefault()
        if (email && password){
            fecthLogin()
         }
         else{
            toast.warning('Enter All Fields')
         }
    }
    return(
        <div>
            <h3 className="signup-heading">Login</h3>
            <form>
            <input type='email' id='email-input'className="email-input" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
            <br/>
            <input type='password' id='password-input'className="email-input" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
            <br/>
            <button type='submit' className="submit-btn" onClick={onClickLogin}>Login</button>
            </form>
            </div>
    )
}

const Login=(props)=>{
    const [isSignupSelected,setisSignUpSelected]=useState(true)
    const signupselected=!isSignupSelected?'selected':''
    const loginselected=!isSignupSelected?'':'selected'
    const navigate=useNavigate()
    useEffect(()=>{
        const token=localStorage.getItem('token');
        if (token){
            navigate('/');
        }
    },[])
    return(
        <div className="bg">
            <div className="card">
            <h1 style={{color:'#20c755'}}>StaySpot</h1>
            <div className="input-select">
                <button id="signup-btn" className={`input-selection-btn ${signupselected}`} onClick={()=>setisSignUpSelected(true)}>Sign Up</button>
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
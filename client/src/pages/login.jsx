import React,{useState,useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link,useNavigate } from 'react-router-dom';
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { loginRoute } from '../utils/APIRoutes';
import '../styles/login.css'
export default function Login() {
  const navigate=useNavigate();
  const [values,setValues]=useState({
    username:"",
    password:"",
  });
  const toastOptions={
    position: "bottom-right",
    autoClose: 800000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  }
  useEffect(()=>{
    if(localStorage.getItem('chat-app-user'))
    {
      navigate("/");
    }
  },[])
  const handleSubmit= async (event)=>{
    console.log("submitted",loginRoute);
    event.preventDefault();
    if(handleValidation())
    {
      const {username,password} = values;
      const {data} = await axios.post(loginRoute,{
        username,
        password,
      });
      if(data.status===false)
      {
        toast.error(data.message,toastOptions);
      }
      if(data.status===true)
      {
        localStorage.setItem('chat-app-user',JSON.stringify(data))
        navigate("/");
      }
    }
  }
  
  const handleValidation=()=>{
    const {username,password}=values;
    if(password==="" && username==="")
    {
      toast.error("username and password required",toastOptions);
      return false;
    }
    else if(password==="")
    {
      toast.error("password required",toastOptions);
      return false;
    }
    else if(username==="")
    {
      toast.error("username required",toastOptions);
      return false;
    }
    
    return true;
  }
  const handleChange=(event)=>{
      setValues({...values,[event.target.name]:event.target.value})
  }
  return (
    <div className='container'>
      <div className='login-brand'>
          <img src='' alt=''></img>
          <h1>Chit-Chat</h1>
        </div>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <div className='inputs'>
        <input type='text' 
        placeholder='Username' 
        name='username' 
        onChange={(e)=>handleChange(e)}/>
        
        <input type='password' 
        placeholder='Password' 
        name='password' 
        onChange={(e)=>handleChange(e)}/>
        </div>
        <div >
        <button className='loginButton' type='submit'>Login</button>
        </div>
        <div className='registerLink'>
        <span>Don't have an account?<Link to="/register">Register</Link></span>
        </div>
      </form>
      

      <ToastContainer/>
    </div>
  )
}

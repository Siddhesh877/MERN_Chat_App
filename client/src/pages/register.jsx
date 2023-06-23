import React,{useState,useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link,useNavigate } from 'react-router-dom';
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { registerRoute } from '../utils/APIRoutes';
export default function Register() {
  const navigate=useNavigate();
  const [values,setValues]=useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:"",
  });
  const toastOptions={
  position:"bottom-right",
  autoClose:8000,
  draggable: true,
  theam:"dark",
  }
  const handleSubmit= async (event)=>{
    console.log("submitted",registerRoute);
    event.preventDefault();
    if(handleValidation())
    {
      const {username,email,password} = values;
      const {data} = await axios.post(registerRoute,{
        username,
        email,
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
    const {username,email,password,confirmPassword}=values;
    if(password!==confirmPassword)
    {
      toast.error("password and confirm password should be same",toastOptions);
      return false;
    }
    else if(password.length < 8)
    {
      toast.error("password should be greater than or equal to 8 characters",toastOptions);
      return false;
    }
    else if(email==="")
    {
      toast.error("email required",toastOptions);
      return false;
    }
    
    return true;
  }
  const handleChange=(event)=>{
      setValues({...values,[event.target.name]:event.target.value})
  }
  return (
    <>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <div className='brand'>
          <img src='' alt=''></img>
          <h1>Chit-Chat</h1>
        </div>
        <input type='text' 
        placeholder='Username' 
        name='username' 
        onChange={(e)=>handleChange(e)}/>
        <input type='email' 
        placeholder='Email' 
        name='email' 
        onChange={(e)=>handleChange(e)}/>
        <input type='password' 
        placeholder='Password' 
        name='password' 
        onChange={(e)=>handleChange(e)}/>
        <input type='password' 
        placeholder='Conform Password' 
        name='confirmPassword' 
        onChange={(e)=>handleChange(e)}/>
        <button type='submit'>Create User</button>
        <span>Already have an account?<Link to="/login">Login</Link></span>
      </form>
      

      <ToastContainer/>
    </>
  )
}

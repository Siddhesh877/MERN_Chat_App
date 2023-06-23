import React,{useState,useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link,useNavigate } from 'react-router-dom';
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { loginRoute } from '../utils/APIRoutes';
export default function Login() {
  const navigate=useNavigate();
  const [values,setValues]=useState({
    username:"",
    password:"",
  });
  const toastOptions={
  position:"bottom-right",
  autoClose:8000,
  draggable: true,
  theam:"dark",
  }
  // useEffect(()=>{
  //   if(localStorage.getItem('chat-app-user'))
  //   {
  //     navigate("/");
  //   }
  // },[])
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
        
        <input type='password' 
        placeholder='Password' 
        name='password' 
        onChange={(e)=>handleChange(e)}/>
        
        <button type='submit'>Login</button>
        <span>Don't have an account?<Link to="/register">Register</Link></span>
      </form>
      

      <ToastContainer/>
    </>
  )
}

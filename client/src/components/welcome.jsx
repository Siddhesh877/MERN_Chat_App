import React,{useEffect,useState} from 'react';
import Gif from '../props/chatGif.gif';
import '../styles/welcome.css';
export default function Welcome({currentUser}) {
  
  return (
    <>{
    currentUser && (
    <div className='welcome-container'>
      {/* <img className='welcome-gif' src={Gif} alt='animation'/> */}
      <div className='welcome'>
      <h3 className='welcomeH'>
        Welcome, <span className='welcome-span'>{currentUser.enteredUser.username}</span>
      </h3>
      </div>
      <div className='welcome-line'>
      <h5 className='welcomeh'>
        Please select a chat to Start Messaging
      </h5>
      </div>
    </div>)

}</>
  )
}

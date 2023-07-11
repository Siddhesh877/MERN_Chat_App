import React,{useState,useEffect,useRef} from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { allUserRoute,host } from '../utils/APIRoutes';
import Contacts from '../components/contacts';
import '../styles/chat.css';
import Welcome from '../components/welcome';
import ChatContainer from '../components/chatContainer';
import {io} from "socket.io-client";
function Chat() {
  const socket=useRef();
  const navigate=useNavigate();
  const [contacts,setContacts]=useState([]);
  const [currentUser,setCurrentUser]=useState(JSON.parse(localStorage.getItem("chat-app-user")));
  const [currentChat,setCurrentChat]=useState(undefined);
  const [isLoaded,setIsLoaded]=useState(false);
  useEffect(()=>{
    async function fetchData(){
    if(!localStorage.getItem("chat-app-user")){
      navigate("/login");
    }
    else
    {
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      console.log(currentUser)
      setIsLoaded(true);
    }
  }
  fetchData();
  },[])
  useEffect(()=>{
    if(currentUser)
    {
      socket.current=io(host);
      socket.current.emit("add-user",currentUser.enteredUser._id)
    }
  },[currentUser])
  useEffect(()=>{
    async function fetchData(){
      if(currentUser)
      {
        if(currentUser.enteredUser.isAvatarImageSet){
          const data=await axios.get(`${allUserRoute}/${currentUser.enteredUser._id}`);
          setContacts(data.data);
          console.log(data.data);

        }
        else
        { 
          navigate("/setAvatar");
        }
      }
    }
    fetchData();
  },[currentUser]);
  const handleChatChange=(chat)=>{
    setCurrentChat(chat);
  }
  return (
      <div className='ChatContainer'>
      <div className='chat-container'>
        <Contacts contacts={contacts} currentUser={currentUser.enteredUser} changeChat={handleChatChange}/>
        {
         isLoaded &&  currentChat===undefined?(<Welcome currentUser={currentUser}/>):
          (<ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>)
        }
        
      </div>
      </div>
  )
}

export default Chat

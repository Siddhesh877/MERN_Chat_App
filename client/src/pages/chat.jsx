import React,{useState,useEffect} from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { allUserRoute } from '../utils/APIRoutes';
import Contacts from '../components/contacts';
import '../styles/chat.css';
function Chat() {
  const navigate=useNavigate();
  const [contacts,setContacts]=useState([]);
  const [currentUser,setCurrentUser]=useState(JSON.parse(localStorage.getItem("chat-app-user")));
  useEffect(()=>{
    async function fetchData(){
    if(!localStorage.getItem("chat-app-user")){
      navigate("/login");
    }
    else
    {
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      console.log(currentUser)
    }
  }
  fetchData();
  },[])
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
  },[])
  return (
    
      // <div className='container'>
        <Contacts contacts={contacts} currentUser={currentUser.enteredUser}/>
      // </div>
  )
}

export default Chat

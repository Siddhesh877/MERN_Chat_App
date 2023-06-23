import React,{useState,useEffect} from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { allUserRoute } from '../utils/APIRoutes';
import Contacts from '../components/contacts';
function Chat() {
  const navigate=useNavigate();
  const [contacts,setContacts]=useState([]);
  const [currentUser,setCurrentUser]=useState(undefined);
  useEffect(()=>{
    async function fetchData(){
    if(!localStorage.getItem("chat-app-user")){
      navigate("/login");
    }
    else
    {
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
    }
  }
  fetchData();
  },[])
  useEffect(()=>{
    async function fetchData(){
      if(currentUser)
      {
        if(currentUser.isAvatarImageSet){
          const data=await axios.get(`${allUserRoute}/${currentUser.enteredUser._id}`);
          setContacts(data.data);
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
    <>
      <div className='container'>
        <Contacts contacts={contacts} currentUser={currentUser}/>
      </div>
    </>
  )
}

export default Chat

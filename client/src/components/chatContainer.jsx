import React,{useEffect,useState} from 'react'
import '../styles/chatContainer.css';
import Logout from './Logout';
import ChatInput from './chatInput';
import axios from 'axios';
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';
export default function ChatContainer({currentChat,currentUser}) {
    const [messages,setMessages]=useState([]);
    console.log(currentChat)
    useEffect(()=>{
        async function fun(){
            // console.log(currentUser.enteredUser._id,currentChat._id);
            const response=await axios.post(getAllMessagesRoute,{
                from:currentUser.enteredUser._id,
                to:currentChat._id,
            });
            setMessages(response.data);
        }
         if(currentChat)
         {
            fun();
            console.log("inside useEffect");
         } 
    },[currentChat,currentUser.enteredUser._id]);
    
    const handleSendMsg=async(msg)=>{
         await axios.post(sendMessageRoute,{
            from:currentUser.enteredUser._id,
            to:currentChat._id,
            message:msg,
         })
    };
  return (
        <>
        {
        currentChat &&(
        <div className='chatContainer-container'>
        <div className="ChatContainer-chat-header">
            <div className="ChatContainer-userDetails">
                <div className="ChatContainer-avatar">
                 <img className='ChatContainer-avatar-image' src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar" />
                    <div >
                        <h4 className="ChatContainer-username">
                            {currentChat.username}
                        </h4>
                    </div>
                </div>
            <Logout/>
            </div>
        </div>
        
        <div className="chat-Messages">
            {   
                messages.map((message)=>{
                    return(
                        <div>
                            <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
                                <div className="content">
                                    <p>
                                        {message.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            {console.log(messages)}
        </div>
        <ChatInput handleSendMsg={handleSendMsg}/>
        
   </div>)}
    </>
  )
}

import React,{useEffect,useState,useRef} from 'react'
import '../styles/chatContainer.css';
import Logout from './Logout';
import ChatInput from './chatInput';
import axios from 'axios';
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';
import {v4 as uuidv4} from "uuid";
export default function ChatContainer({currentChat,currentUser,socket}) {
    const [messages,setMessages]=useState([]);
    const [arrivalMessage,setArrivalMessage]=useState([null]);
    const scrollRef=useRef();
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
         } 
    },[currentChat]);
    
    const handleSendMsg=async(msg)=>{
         await axios.post(sendMessageRoute,{
            from:currentUser.enteredUser._id,
            to:currentChat._id,
            message:msg,
         });
         socket.current.emit("send-msg",{
            to: currentChat._id,
            from: currentUser.enteredUser._id,
            message:msg,
         });
         const msgs=[...messages];
         msgs.push({fromSelf:true,message:msg});
         setMessages(msgs);
    };
    useEffect(()=>{
        if(socket.current){
            socket.current.on("msg-recieve",(msg)=>{
                setArrivalMessage({fromSelf:false,message:msg});
            })
        }
    },[]);
    useEffect(()=>{
        arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage]);
    },[arrivalMessage]);
    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    },[messages]);
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
                        <div ref={scrollRef} key={uuidv4}>
                            <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
                                <div className="content">
                                    <p className='message-line'>
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

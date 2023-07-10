import React from 'react'
import '../styles/chatContainer.css';
import Logout from './Logout';
import ChatInput from './chatInput';
import Messages from './Messages';
export default function ChatContainer({currentChat}) {
    const handleSendMsg=async(msg)=>{
         
    }
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
        
        <Messages/>
        <ChatInput handleSendMsg={handleSendMsg}/>
        
   </div>)}
    </>
  )
}

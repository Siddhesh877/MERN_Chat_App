import React,{useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import {IoMdSend} from 'react-icons/io';
import {BsEmojiSmileFill} from 'react-icons/bs'
export default function ChatInput({handleSendMsg}) {
    const [showEmojiPicker,setShowEmojiPicker]=useState(false);
    const [msg,setMsg]=useState("");
    const handleEmojiPickerHideShow=()=>{
        setShowEmojiPicker(!showEmojiPicker);
    }
    const handleEmojiClick=(emoji,event)=>{
        console.log(emoji);
        let message=msg;
        message+=emoji.emoji;
        setMsg(message)
    }
    const sendChat=(event)=>{
        event.preventDefault();
        if(msg.length>0){
            handleSendMsg(msg);
            setMsg("");
        }
    }
  return (
    <div className='chatInput-container'>
      <div className="chatInput-button-container">
        <div className="chatInput-emoji">
            <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
            {
                showEmojiPicker && <EmojiPicker height={400} width={300} onEmojiClick={handleEmojiClick}/>
            }
        </div>
      </div>
      <form className='chatInput-inputContainer' onSubmit={(event)=>{sendChat(event)}}>
        <input className="chatInput-input"  placeholder='  your message here' value={msg} onChange={(e)=>{setMsg(e.target.value)}}/>
        <button className='chatInput-submit'>
            <IoMdSend/>
        </button>
      </form>
    </div>
  )
}

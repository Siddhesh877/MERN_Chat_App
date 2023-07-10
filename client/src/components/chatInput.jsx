import React,{useState } from 'react';
import Picker from 'emoji-picker-react';
import {IoMdSend} from 'react-icons/io';
import {BsEmojiSmileFill} from 'react-icons/bs'
export default function ChatInput() {
  return (
    <div className='chatInput-container'>
      <div className="chatInput-button-container">
        <div className="chatInput-emoji">
            <BsEmojiSmileFill/>
        </div>
      </div>
      <form className='chatInput-inputContainer'>
        <input className="chatInput-input"  placeholder='  your message here'/>
        <button className='chatInput-submit'>
            <IoMdSend/>
        </button>
      </form>
    </div>
  )
}

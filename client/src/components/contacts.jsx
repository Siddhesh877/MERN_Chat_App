import React,{useState,useEffect} from 'react';
import '../styles/contact.css';
import Logo from '../props/chat.png';

export default function Contacts({contacts,currentUser,changeChat}) {

const [currentUserName,setCurrentUserName]=useState(undefined);
const [currentUserImage,setCurrentUserImage]=useState(undefined);
const [currentSelected,setCurrentSelected]=useState(undefined);

  useEffect(()=>{
    console.log(contacts);
    if(currentUser)
    {
        setCurrentUserImage(currentUser.enteredUser.avatarImage);
        setCurrentUserName(currentUser.enteredUser.username);
    }

  },[currentUser]);
const changeCurrrentChat =(index,contact)=>{
    setCurrentSelected(index);
    changeChat(contact);
}
return (
    <>
      {
         currentUserImage && currentUserName && (
            <div className='contacts-container'>
                <div className='brand'>
                    <img className='brand-image' src={Logo} alt='logo'/>
                    <h4 className='brand-heading'>Buzz</h4>
                </div>
                <div className='contacts'>
                    {
                        contacts.map((contact,index)=>{
                    return(      <div className={`contact ${index===currentSelected ? "selected":""}`} key={index} onClick={()=>{changeCurrrentChat(index,contact)}}>
                                <div className='avatar'>
                                    <img className='avatar-image' src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
                                </div>
                                <div className='username'>
                                    <h3>{contact.username}</h3>
                                </div>
                            </div>
                        );
                        })
                        
                    }
                </div>
                <div className='current-user'>
                <div className='current-avatar'>
                    <img className='current-avatar-image' src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
                </div>
                <div className='username'>
                    <h3 className='username-text'>{currentUser.enteredUser.username}</h3>
                </div>
                </div>
            </div>
         ) 
       } 
    </>
)
}

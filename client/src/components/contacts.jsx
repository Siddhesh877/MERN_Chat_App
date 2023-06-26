import React,{useState,useEffect} from 'react';
import '../styles/contact.css';

export default function Contacts({contacts,currentUser}) {

const [currentUserName,setCurrentUserName]=useState(undefined);
const [currentUserImage,setCurrentUserImage]=useState(undefined);
const [currentSelected,setCurrentSelected]=useState(undefined);

  useEffect(()=>{
    console.log(contacts);
    if(currentUser)
    {
        setCurrentUserImage(currentUser.avatarImage);
        setCurrentUserName(currentUser.username);
    }

  },[currentUser]);
const changeCurrrentChat =(index,contact)=>{}
return (
    // <>
    //   {/* { */}
        // {/* // currentUserImage && currentUserName && ( */}
            <div className='container'>
                <div className='brand'>
                    <img src='' alt='logo'/>
                    <h3>chit-chat</h3>
                </div>
                <div className='contacts'>
                    {
                        contacts.map((contact,index)=>{
                            <div className={`contact ${index===currentSelected ? "selected":""}`} key={index}>
                                <div className='avatar'>
                                    <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
                                </div>
                                <div className='username'>
                                    <h3>{contact.username}</h3>
                                </div>
                            </div>
                        })
                    }
                </div>
                <div className='current-user'>
                <div className='avatar'>
                    <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
                </div>
                <div className='username'>
                    <h3>{currentUser.username}</h3>
                </div>
                </div>
            </div>
        // {/* // ) */}
    //   {/* } */}
    // </>
)
}

import React,{useState,useEffect} from 'react';
import {useNavigate } from 'react-router-dom';
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {Buffer} from "buffer";
import { setAvatarRoute } from '../utils/APIRoutes';

export default function SetAvatar() {
    const api="https://api.multiavatar.com";
    const navigate=useNavigate();
    const [avatars,setAvatars] =useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const [selectedAvatar,setSelectedAvatar]=useState(undefined);
    const toastOptions={
        position:"bottom-right",
        autoClose:8000,
        draggable: true,
        theam:"dark",
    };
    useEffect(async()=>{
        if(!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
        {
            navigate("/login");
        }

    },[]);
    const setProfilePicture=async()=>{
        console.log("in setProfilePicture");
        if(selectedAvatar===undefined)
        {
            toast.error("please select an avatar",toastOptions);
        }
        else
        {
            const user =await JSON.parse(localStorage.getItem("chat-app-user"));
            const {data} =await axios.post(`${setAvatarRoute}/${user.enteredUser._id}`,{
                image: avatars[selectedAvatar]
            });
            if(data.isSet){
                user.isAvatarImageSet=true;
                user.avatarImage=data.image;
                localStorage.setItem("chat-app-user",JSON.stringify(user));
                navigate("/");
            }
            else{
                console.log("in else2");
                toast.error("Error setting avatar. Please try again",toastOptions);
            }
        }
    };
    useEffect(()=>{
        async function fetchData(){
        const data=[];
        for(let i=0;i<4;i++){
            const image=await axios.get(`${api}/${Math.round(Math.random()*1000)}`);
            const buffer=new Buffer(image.data);
            data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        setIsLoading(false);
        }
        fetchData();
    },[]);
  return (
    <>
        <div className='title-container'>
            <h1>pick your avatar</h1>
        </div>
        <div className='avatars'>
            {
               avatars.map((avatar,index)=>{
                    return(
                        <div key={index} className={`avatar ${selectedAvatar===index ? "selected" :""}`}>
                            <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={()=>{setSelectedAvatar(index)}}/>
                        </div>
                    )
               } )
            }
        </div>
        <button className='submit-btn' onClick={setProfilePicture}>Set as Profile Picture</button>
        <ToastContainer/>
    </>
    
  )
}

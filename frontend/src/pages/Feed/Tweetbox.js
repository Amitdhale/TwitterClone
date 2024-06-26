import React, { useState } from 'react'
import {Avatar,Button} from '@mui/material';
import './Tweetbox.css';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from 'axios';
import useLoggedInuser from '../../hooks/useLoggedInuser';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import useFetchpost from '../../hooks/useFetchpost';


export default function Tweetbox() {
    const [post,setpost] = useState("");
    const [imageUrl,setimageUrl] = useState("");
    const [name,setName] = useState("");
    const [username,setUsername] = useState("");
    const [isLoading,setisLoading] = useState('');
    const [loggedInUser] = useLoggedInuser();
    const user = useAuthState(auth);
    const email = user[0]?.email;
    const {fetchpost} = useFetchpost();

    const userProfilePic = loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage:'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';

    const handleuploadimage = (e)=>{
        setisLoading(true);
        const image = e.target.files[0];

        const formData = new FormData();
        formData.set('image',image);

        axios.post('https://api.imgbb.com/1/upload?key=f61ae3f3dd2cb31784384ce097495c3c',formData)
        .then(res=>{
            console.log(res.data.data.display_url);
            setimageUrl(res.data.data.display_url);
            setisLoading(false);
        }).catch(error=>{
            console.log(error);
            setisLoading(false); 
        })

    }

    const handleTweet = (e)=>{
        e.preventDefault();
        
        let name1;
        const maketweet = ()=>{
            if(name1){
                if(imageUrl){
                    const userPost = {
                        profilePhoto:userProfilePic,
                        post:post,
                        photo:imageUrl,
                        username,
                        name:name,
                        email:email,
                    }
                    fetch("http://localhost:5000/post",{
                        method:"POST",
                        headers:{
                            'Content-Type': 'application/json',
                        },
                        body:JSON.stringify(userPost)
                    }).then(res => res.json()).then(data =>{
                        setimageUrl("");
                        setpost("");
                        fetchpost();
                    })
                }
            }

        }
        if(user[0].providerData[0].providerId === "password"){
            fetch(`http://localhost:5000/loggedInUser?email=${email}`)
            .then(res=>res.json())
            .then(data =>{
                name1 = data[0]?.name;
                setName(data[0]?.name);
                setUsername(data[0]?.username);
                maketweet();
            })
        }else{
            name1 = user[0]?.displayName;
            setName(user[0]?.displayName);
            setUsername(email?.split('@')[0]);
            maketweet();
        }
       
        
        
        
    }
  return (
    <div className='tweetBox'>
        <form onSubmit={handleTweet}>
            <div className='tweetBox_input'>
                <Avatar src={userProfilePic}/>
                <input type='text' placeholder="What's happening" onChange={(e)=>{
                    setpost(e.target.value);}} value={post} required/>
            </div>

            <div className='imageIcon_tweetButton'>
                <label htmlFor='image' className='imageIcon'>
                    {
                        isLoading ? <p>Uploading image</p>:<p>{imageUrl ? 'image uploaded' : <AddPhotoAlternateIcon />}</p>
                    }
                </label>
                <input type='file' id='image' className='imageInput' onChange={handleuploadimage}/>
                <Button className='tweetBox_tweetButton' type='submit'>
                    Tweet
                </Button>
            </div>
        </form>
        <p className='notice'>Make a post per day</p>
    </div>
  )
}

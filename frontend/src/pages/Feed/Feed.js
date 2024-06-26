import React, { useEffect, useState } from 'react';
import '../page.css';
import Tweetbox from './Tweetbox';
import axios from 'axios';
import Post from './Post/Post';
import useFetchpost from '../../hooks/useFetchpost';

export default function Feed() {
  // const [posts,setposts] = useState([]);
  const {posts,fetchpost} = useFetchpost();

  useEffect(()=>{
    fetchpost();
  },[])

  return (
    <div className='feedpage'>
      <h5 className='pageTitle'>Home</h5>
      <Tweetbox/>
      {
        posts.map(p =>{
          return <Post key={p._id} p ={p}/>
        })
      }
    </div>
  )
}

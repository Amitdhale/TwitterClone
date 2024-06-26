import React, { useState } from 'react'

export default function useFetchpost() {
  const [posts,setposts] = useState([]);
  const fetchpost = async ()=>{
    const res = await fetch("http://localhost:5000/post")
    const data = await res.json();
    setposts(data);
  }
  return {posts,fetchpost};
}

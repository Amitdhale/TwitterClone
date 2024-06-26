import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../firebase.init'
import {useEffect, useState} from 'react';

export default function useLoggedInuser() {
    const user = useAuthState(auth);
    const email = user[0]?.email;
  const [loggedInUser,setloggedInUser] = useState([]);

  useEffect(()=>{
    fetch(`http://localhost:5000/loggedInUser?email=${email}`).then(res=>res.json())
    .then(data =>{
        console.log(data);
        setloggedInUser(data);
    })
  },[email]);

  return [loggedInUser,setloggedInUser];
}

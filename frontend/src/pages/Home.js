import React from 'react'
import Sidebar from './Sidebar/Sidebar';
import Feed from './Feed/Feed';
import Widgets from './Widgets/Widgets';
import auth from '../firebase.init';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth'
import {Outlet} from 'react-router-dom';
import useLoggedInuser from '../hooks/useLoggedInuser';


function Home() {
  const user = useAuthState(auth);
  // const [loggedInUser] = useLoggedInuser();
  const handlelogout=()=>{
    signOut(auth);
  }
  return (
    <div className='app'>
      <Sidebar handlelogout={handlelogout} user={user}/>
      <Outlet/>
      <Widgets/>
    </div>
  )
}

export default Home
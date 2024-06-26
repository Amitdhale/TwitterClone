import React from 'react'
import '../page.css';
import MainPage from './MainPage/MainPage';
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../../firebase.init';


export default function Profile() {
  const user = useAuthState(auth);
  return (
    <div className='profilepage' >
      <MainPage user={user}/>
    </div>
  )
}

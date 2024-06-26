import React,{useEffect,useState} from 'react'
import './MainPage.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from 'react-router-dom';
import useLoggedInuser from '../../../hooks/useLoggedInuser';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import AddLinkIcon from '@mui/icons-material/AddLink';
import useFetchpost from '../../../hooks/useFetchpost';
import Post from '../../Feed/Post/Post';
import axios from 'axios';
import LockResetIcon from '@mui/icons-material/LockReset';
import EditProfile from '../EditPage/EditProfile';


export default function MainPage({user}) {
  const navigate = useNavigate();
  const [loggedInUser] = useLoggedInuser();
  const username = user[0]?.email?.split('@')[0];
  // const {posts,fetchpost} = useFetchpost();
  const [posts,setposts] = useState([]);
  const [isLoading,setisLoading] = useState('');
  const [imageUrl,setimageUrl] = useState("");



  useEffect(()=>{
    fetch(`http://localhost:5000/userPost?email=${user[0]?.email}`)
    .then(res => res.json())
    .then(data =>{
      setposts(data);
    })
    
  },[user])
  const handleuploadCoverimage = (e)=>{
    setisLoading(true);
        const image = e.target.files[0];

        const formData = new FormData();
        formData.set('image',image);

        axios.post('https://api.imgbb.com/1/upload?key=f61ae3f3dd2cb31784384ce097495c3c',formData)
        .then(res=>{
            // console.log(res.data.data.display_url);
            const url = res.data.data.display_url;
            const userCoverImage = {
              email:user?.email,
              coverImage:url,
            }
            // setimageUrl(res.data.data.display_url);
            const email = user[0]?.email;
            if(url){
              axios.patch(`http://localhost:5000/userUpdates/${email}`,userCoverImage);
            }
            setisLoading(false);
        }).catch(error=>{
            console.log(error);
            setisLoading(false); 
        })
    
  }
  const handleuploadProfileimage = (e)=>{
    setisLoading(true);
        const image = e.target.files[0];

        const formData = new FormData();
        formData.set('image',image);

        axios.post('https://api.imgbb.com/1/upload?key=f61ae3f3dd2cb31784384ce097495c3c',formData)
        .then(res=>{
            const url = res.data.data.display_url;
            const userProfileImage = {
              email:user?.email,
              profileImage:url,
            }
            // setimageUrl(res.data.data.display_url);
            const email = user[0]?.email;
            if(url){
              axios.patch(`http://localhost:5000/userUpdates/${email}`,userProfileImage);
            }
            setisLoading(false);
        }).catch(error=>{
            console.log(error);
            setisLoading(false); 
        })
  }

  return (
    <div>
      <ArrowBackIcon className='arrow-icon' onClick={() => navigate('/')} />
      <h4 className='heading-4'>{username}</h4>
      <div className='mainprofile' >
        {/* <h1 className='heading-1' style={{ color: "white" }}>Building of profile page Tweets </h1> */}
        <div className='profile-bio'>
          {
            <div >
              <div className='coverImageContainer'>
                <img src={loggedInUser[0]?.coverImage ? loggedInUser[0]?.coverImage : 'https://www.proactivechannel.com/Files/BrandImages/Default.jpg'} alt="" className='coverImage' />
                <div className='hoverCoverImage'>
                  <div className="imageIcon_tweetButton">
                    <label htmlFor='image' className="imageIcon">
                      {
                        isLoading ?
                          <LockResetIcon className='photoIcon photoIconDisabled ' />
                          :
                          <CenterFocusWeakIcon className='photoIcon' />
                      }
                    </label>
                    <input
                      type="file"
                      id='image'
                      className="imageInput"
                      onChange={handleuploadCoverimage}
                    />
                  </div>
                </div>
              </div>
              <div className='avatar-img'>
                <div className='avatarContainer'>
                  <img src={loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} className="avatar" alt='' />
                  <div className='hoverAvatarImage'>
                    <div className="imageIcon_tweetButton">
                      <label htmlFor='profileImage' className="imageIcon">
                        {
                          isLoading ?
                            <LockResetIcon className='photoIcon photoIconDisabled ' />
                            :
                            <CenterFocusWeakIcon className='photoIcon' />
                        }
                      </label>
                      <input
                        type="file"
                        id='profileImage'
                        className="imageInput"
                        onChange={handleuploadProfileimage}
                      />
                    </div>
                  </div>
                </div>
                <div className='userInfo'>
                  <div>
                    <h3 className='heading-3'>
                      {loggedInUser[0]?.name ? loggedInUser[0].name : user && user[0].displayName}
                    </h3>
                    <p className='usernameSection'>@{username}</p>
                  </div>
                  <EditProfile user={user} loggedInUser={loggedInUser} />
                </div>
                <div className='infoContainer'>
                  {loggedInUser[0]?.bio ? <p>{loggedInUser[0].bio}</p> : ''}
                  <div className='locationAndLink'>
                    {loggedInUser[0]?.location ? <p className='subInfo'><MyLocationIcon /> {loggedInUser[0].location}</p> : ''}
                    {loggedInUser[0]?.website ? <p className='subInfo link'><AddLinkIcon /> {loggedInUser[0].website}</p> : ''}
                  </div>
                </div>
                <h4 className='tweetsText'>Tweets</h4>
                <hr />
              </div>
              {
                posts.map(p => <Post p={p} key={p._id}/>)
              }
            </div>
          }
        </div>
      </div>
    </div>
  )
}
    // <div>
    //   <ArrowBackIcon className='arrow_icon' onClick={()=>{navigate("/")}} />
    //     <h4>@{username}</h4>
    //     <div className='mainProfile'>
    //       <div className='profile-bio'>
    //         {
    //           <div>
    //             <div className='coverImageContaier'>
    //               <img src={loggedInUser[0]?.coverImage ? loggedInUser[0]?.coverImage : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} className='coverImage'/>
    //               <div className='hoverCoverImage'>
    //                 <div className='imageIcon_tweetButton'>
    //                   <label htmlFor='image' className='imageIcon'>
    //                     <CenterFocusWeakIcon/>
    //                   </label>
    //                   <input type='file' id='image'  className='imageInput' onChange={handleuploadCoverimage}/>
    //                 </div>
    //               </div>
    //             </div>

    //             <div className='avatar_img'>
    //                 <div className='avatarContainer'>
    //                   <img src={loggedInUser[0]?.coverImage ? loggedInUser[0]?.coverImage : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} className='coverImage'/>
    //                 </div>
    //                 <div className='imageIcon_tweetButton'>
    //                   <label htmlFor='profileImage' className='ImageIcon'>
    //                     <CenterFocusWeakIcon className='photoIcon'/>
    //                   </label>
    //                   <div className='imageIcon_tweetButton'>
    //                     <input type='file' id='profileImage' className='imageInput' onChange={handleuploadProfileimage}/>

    //                   </div>
    //                 </div>
    //             </div>
    //             <div className='userInfo'>
    //               <div>
    //                 <h3 className='heading-3'>
    //                   {loggedInUser[0]?.name ? loggedInUser[0]?.name : user && user?.displayName}
    //                 </h3>
    //                 <p className='usernameSection'>@{username}</p>
    //               </div>
    //               <div className='infoContainer'>
    //                 {loggedInUser[0]?.bio ? loggedInUser[0]?.bio : ""}
    //                 <div className='locationandLink'>
    //                   {loggedInUser[0]?.location ? <p className='subInfo'> <MyLocationIcon/>loggedInUser[0]?.location</p> : ""}
    //                   {loggedInUser[0]?.website ? <p className='subInfo'> <AddLinkIcon/>loggedInUser[0]?.location</p> : ""}
    //                 </div>
    //               </div>
    //               <h4 className='tweetsText'>Tweets</h4>
    //               <hr/>
    //               <div>
    //                 {
    //                   posts.map(p=> <Post id={p._id} p={p}/>)
    //                 }
    //               </div>
    //             </div>
    //           </div>
    //         }
    //       </div>
    //     </div>
    // </div>

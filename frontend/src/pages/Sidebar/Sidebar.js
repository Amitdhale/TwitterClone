import React, { useState } from 'react';
import './Sidebar.css';
import TwitterIcon from '@mui/icons-material/Twitter';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import SidebarOptions from './SidebarOptions';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DoneIcon from '@mui/icons-material/Done';
import CustomeLink from './CustomeLink';
// import ListItemIcon from '@mui/icons-material/ListItemIcon';
import {Link} from 'react-router-dom';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import { Avatar, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import useLoggedInuser from '../../hooks/useLoggedInuser';


export default function Sidebar({handlelogout,user}) {
  const [anchoreEl,setAnchoreEl] = useState(null);
  const openMenu = Boolean(anchoreEl);
  const [loggedInUser] = useLoggedInuser();
  console.log(user);

  const userProfilePic = loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage:'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';

  const handleclick = e =>{
    setAnchoreEl(e.currentTarget);
  }

  const handleclose = e =>{
    setAnchoreEl(null);
  }

  const result = user[0]?.email.split("@")[0];

  return (
    <div className='sidebar'>
      <TwitterIcon className='sidebar_twitterIcon'/>
      <CustomeLink to={'/home/feed'}>
        <SidebarOptions active={true} Icon={HomeIcon} text={"Home"}/>
      </CustomeLink>

      <CustomeLink to={'/home/explore'}>
        <SidebarOptions active={true} Icon={SearchIcon} text={"Explore"}/>
      </CustomeLink>
      
      <CustomeLink to={'/home/notifications'}>
        <SidebarOptions active={true} Icon={NotificationsIcon} text={"Notifications"}/>
      </CustomeLink>

      <CustomeLink to={'/home/messages'}>
        <SidebarOptions active={true} Icon={MailOutlineOutlinedIcon} text={"Messages"}/>
      </CustomeLink>

      <CustomeLink to={'/home/bookmarks'}>
        <SidebarOptions active={true} Icon={BookmarkBorderIcon} text={"Bookmarks"}/>
      </CustomeLink>

      <CustomeLink to={'/home/lists'}>
        <SidebarOptions active={true} Icon={ListAltIcon} text={"List"}/>
      </CustomeLink>

      <CustomeLink to={'/home/profile'}>
        <SidebarOptions active={true} Icon={PermIdentityIcon} text={"Profile"}/>
      </CustomeLink>

      <CustomeLink to={'/home/more'}>
        <SidebarOptions active={true} Icon={MoreHorizIcon} text={"More"}/>
      </CustomeLink>
      <Button variant='outlined' className='sidebar_tweet'>
        Tweet
      </Button>
      <CustomeLink to={'/premium'}>
        <Button variant='outlined' className='sidebar_premium'>
        Premium
        </Button>
      </CustomeLink>

      <div className='profile_info'>
        <Avatar src={userProfilePic}/>
        <div className='user_info'>
          <h4>{
            loggedInUser[0]?.name ? loggedInUser[0].name : user && user[0]?.displayName
        }</h4>
          <h5>@{result}</h5>
        </div>
        <IconButton 
          size='small' sx={{ml:2}} 
          aria-controls={openMenu ? 'basic-menu':undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? "true":undefined}
          onClick={handleclick}

        >
          <MoreHorizIcon/>
        </IconButton>

        <Menu id='basic-menu' anchorEl={anchoreEl} open={openMenu} onClose={handleclose}>
          <MenuItem className='profile_info' >
          <Avatar src={userProfilePic}/>
            <div className='user_info subUser_info'>
              <div className='user_info'>
              <h4>{
                loggedInUser[0]?.name ? loggedInUser[0].name : user && user[0]?.displayName
              }</h4>
          <h5>@{result}</h5>
              </div>
              <ListItemIcon className='done_icon'><DoneIcon/></ListItemIcon>
            </div>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleclose}>Add an existing account</MenuItem>
          <MenuItem onClick={handlelogout}>Logout as @{result}</MenuItem>
        </Menu>
      </div>
    </div>
  )
}

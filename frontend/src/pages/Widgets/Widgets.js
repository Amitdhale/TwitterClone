import React from 'react';
import './Widgets.css';
import SearchIcon from '@mui/icons-material/Search';
import {TwitterTimelineEmbed, TwitterTweetEmbed} from 'react-twitter-embed';

export default function Widgets() {
  return (
    <div className='widgets'>
      <div className='widget_input'>
        <SearchIcon className='widgets_searchIcon'/>
        <input type='text' placeholder='SearchTwitter'/>
      </div>
      <div className='widgets_widgetsContainer'>
        <h2>What's happening</h2>
      </div>
      <div style={{marginLeft:'20px'}}>
          <TwitterTweetEmbed
            tweetId={'933354946111705097'}
          />
          <TwitterTimelineEmbed 
            sourceType='profile'
            screenName='elonmusk'
            options={{height:400}}
          />

      </div>
    </div>
  )
}

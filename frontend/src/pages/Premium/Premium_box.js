import React from 'react'
import './Premium_box.css';
import DoneIcon from '@mui/icons-material/Done';

export default function Premium_box({plan,isselectedplan,setselectedplan}) {
  return (
    <div className={isselectedplan ? 'box selected' : 'box'} onClick={()=>{setselectedplan(plan)}}>
        <h3>{plan.title}</h3>
        <div className='plan_price'>
            <h2>₹{plan.price}</h2>
            <span>/{plan.duration}</span>
        </div>
        <div className='description'>
            <div className='single_description'>
                <DoneIcon/>
                <p>{plan.no_of_post} post per day</p>
            </div>
            <div className='single_description'>
                <DoneIcon/>
                <p>Largest reply boost</p>
            </div>
            <div className='single_description'>
                <DoneIcon/>
                <p>Write Articles</p>
            </div>
        
        </div>

    </div>
  )
}

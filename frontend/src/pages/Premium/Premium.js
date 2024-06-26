import React, { useEffect, useState } from 'react'
import TwitterIcon from '@mui/icons-material/Twitter';
import './Premium.css';
import Premium_box from './Premium_box';
import { Button } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import StripeCheckout from 'react-stripe-checkout';




export default function Premium() {
    const [plans,setplans] = useState([]);
    const [selectedplan,setselectedplan] = useState(null);
    const user = useAuthState(auth);
    const email = user[0]?.email;

    const handlecheckout = async ()=>{
        const response = await fetch('http://localhost:5000/create-checkout-session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ planId: selectedplan,email}),
          });
      
          const data = await response.json();
          if (data.url) {
            window.location.href = data.url; // Redirect to Stripe checkout
          } else {
            console.error('Error creating checkout session:', data);
          }

    }

    const makepayment = token =>{
      return fetch("http://localhost:5000/payment",{
        method:"POST",
        headers:{
          'Content-Type' : "application/json",
        },
        body: JSON.stringify({planid : selectedplan._id,email,token})
        
      }).then(result => console.log(result));
    }
    
    useEffect(()=>{
        fetch("http://localhost:5000/preminum").then(result => result.json()).then((data)=>setplans(data));
    },[])
  return (
    <div className='premium_container'>
        <TwitterIcon className='sidebar_twitterIcon'/>
        <h1>Upgrade to Premium</h1>
        <p className='details'>Enjoy an enhanced experience, exclusive creator tools, top-tier verification and security.</p>
        <div className='premium_box'>
           { plans.map((plan)=>{
                return (
                    <Premium_box plan = {plan} key={plan?._id} isselectedplan={selectedplan?._id === plan?._id} setselectedplan={setselectedplan}/>
                )
            })}
        </div>
        <div className='premium_button'>
            <StripeCheckout stripeKey='pk_test_51PSsvjKPj8Vp4D5Azh0jshM3jsacBEDfJzD0aLAEjFvOtE50kEWBVeamaXioj3bomU38ogOUaQvmHKiS2w1QHg3g00xW6EaG5Y'
              token={makepayment}
              name='Buy premium'
              amount={selectedplan.price * 100}
            >
              <Button variant='outlined' disabled={selectedplan ? false : true} className='permium_button-1'>Buy</Button>
            </StripeCheckout>
        </div>
        {!selectedplan && <p className='notice'>select a plan to procced further</p>}
    </div>
  )
}

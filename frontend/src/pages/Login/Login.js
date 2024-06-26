import React, { useState } from 'react'
import twitterImage from '../../assets/images/twitter.jpeg';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useSignInWithEmailAndPassword,useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import GoogleButton from 'react-google-button';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css"


function Login() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    // const [error,setError] = useState("");
    const navigate = useNavigate();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

    const [signInWithGoogle, googleuser, googleloading, googleerror] = useSignInWithGoogle(auth);

    if(user || googleuser){
        console.log(user);
        console.log(googleuser);
        navigate("/");
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        
        signInWithEmailAndPassword(email,password);
    }

    const handleGooglesignup = ()=>{
        signInWithGoogle();
    }
  return (
    <div className="login-container">
                <div className="image-container">
                    <img className=" image" src={twitterImage} alt="twitterImage" />
                </div>

                <div className="form-container">
                    <div className="form-box" >
                        <TwitterIcon style={{ color: "skyblue" }} />
                        <h2 className="heading">Happening now</h2>
                        <div className="d-flex align-items-sm-center">
                            <h3 className="heading1"> What happening today </h3>
                        </div>

                        {error && <p>{error.message}</p>}
                        <form onSubmit={handleSubmit}>

                            <input
                                type="email" className="email"
                                placeholder="Email address"
                                onChange={(e) => setEmail(e.target.value)}
                            />



                            <input className="password"
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />


                            <div className="btn-login">
                                <button type="submit" className="btn" >Log In</button>
                            </div>
                        </form>
                        <hr />
                        <div>
                            <GoogleButton

                                className="g-btn"
                                type="light"
                                onClick={handleGooglesignup}
                            />


                        </div>
                    </div>
                    <div>
                        Don't have an account?
                        <Link
                            to="/signup"
                            style={{
                                textDecoration: 'none',
                                color: 'var(--twitter-color)',
                                fontWeight: '600',
                                marginLeft: '5px'
                            }}
                        >
                            Sign up
                        </Link>
                    </div>

                </div>


            </div>
  )
}

export default Login
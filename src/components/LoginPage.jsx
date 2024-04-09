import React, { useState } from 'react';
import './login.css'; // Import your CSS file here
import { useNavigate } from 'react-router-dom';
import { loginAuth } from '../apis/authController';
import { Snackbar } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import Button from './Home/Button';

function LoginForm() {
    const navigate=useNavigate()
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("")
    const [successMessage,setSuccessMessage]=useState("")
    const [openSuccess,setOpenSuccess]=useState(false)
    const [vertical,setVertical]=useState("top")
    const [horizontal,setHorizontal]=useState("right")
    const {login,userDetails}=useAuth()

    const handleHome=()=>{
     navigate("/")
    }

    const handleCloseSnack=()=>{
        setSuccessMessage("")
        setOpenSuccess(false)
      }
    const handleSubmit=async(e)=>{
        e.preventDefault()
   const response=await loginAuth(email,password)
   if(response.responseCode === 200){
    const token=response.data.token;
    const userData=response.data.data
    
    login(token)
    userDetails(JSON.stringify(userData))
    // localStorage.setItem('authkey',token );
    navigate("/dashboard")
   }else{
    setSuccessMessage(response.responseDescription)
    setOpenSuccess(true)
   }
    }

    
    return (
    <>
        <Snackbar
  anchorOrigin={{ vertical, horizontal }}
  open={openSuccess}
  autoHideDuration={5000}
  onClose={handleCloseSnack}
  message={successMessage?successMessage:"Please Try Again with corrte data"}
/>
<div className="container" id="container">
            <div className="form-container sign-up">
                <form>
                    <h1>Create Account</h1>
                    <div className="social-icons">
                        <a href="#" className="icon"><i className="fab fa-google-plus-g"></i></a>
                        <a href="#" className="icon"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="icon"><i className="fab fa-github"></i></a>
                        <a href="#" className="icon"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your email for registration</span>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button>Home</button>
                </form>
            </div>
            <div className="form-container sign-in">
                <form>
                    <h1>Sign In</h1>
                    <div className="social-icons">
                        <a href="#" className="icon"><i className="fab fa-google-plus-g"></i></a>
                        <a href="#" className="icon"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="icon"><i className="fab fa-github"></i></a>
                        <a href="#" className="icon"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your email password</span>
                    <input 
                    type="email"
                     placeholder="Email" 
                     value={email}
                     required
                     onChange={(e)=>setEmail(e.target.value)}
                     />
                    <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    required
                    onChange={(e)=>setPassword(e.target.value)}
                     />
                    <a href="#">Forget Your Password?</a>
                    <button onClick={(e)=>handleSubmit(e)}>Sign In</button>
                </form>
            </div>
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all of site features</p>
                        <button className="hidden" id="login">Sign In</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Hello,</h1>
                        <p>Only Authorized user allowed to login</p>
                        <Button blue text="Home"   className="hidden" id="register" onClick={handleHome}/>
                    </div>
                </div>
            </div>
        </div>
    </>
        
    );
}

export default LoginForm;

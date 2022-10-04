import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css";
import Navbar from './Navbar';

const Login = () => {
   // Declaring variables
   // eslint-disable-next-line
   const [loginValue, setLoginValue] = useState({
      email:"",
      password:""
   })
   const emailRef = useRef();
   const passwordRef = useRef();
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
   const getValue = localStorage.getItem('key');
   const auth = {"token":getValue}

   const handleLogin = e => {
      /**Handles the login function when the login button is pressed */
      e.preventDefault();
      setLoading(true);
      console.log(loading)
      if (emailRef.current.value === loginValue.email && passwordRef.current.value === loginValue.password) {
         localStorage.setItem('key', 'true');
         navigate("/hem")
      } else {
         console.log("Enter username and password")
      }
      setLoading(false);
      console.log(loading)
   }

   const handleLogout = e => {
      /**Handles the logout function when the login button is pressed */
      e.preventDefault();
      localStorage.removeItem('key');
      navigate("/")
      window.location.reload(false)
   }

  return (
   // Returns the right html if logged in or not
   <div>
      {auth.token ? (
         <>
            <Navbar loginValue={loginValue} handleLogout={handleLogout} />
         </>
      ) : (
         <>
            <div className='navbar'>
               <div className='loginForm'>
                  <input ref={emailRef} type="email" placeholder='Användarnamn' className='userInput' />
                  <input ref={passwordRef} type="password" placeholder='Lösenord' className='userInput' />
                  <button className='login-btn' disabled={ loading } onClick={handleLogin}>Logga in</button>
               </div>
            </div>
         </>
      )}
   </div>
  )
}

export default Login
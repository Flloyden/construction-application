import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
      // Checks the inputs to be right values
      if (emailRef.current.value === loginValue.email && passwordRef.current.value === loginValue.password) {
         // Sets a key in localstorage
         localStorage.setItem('key', 'true');
         // Navigates to homepage
         navigate("/")
         // Promts user to enter username and password if not correct
      } else {
         console.log("Enter username and password")
      }
      setLoading(false);
      console.log(loading)
   }

   const handleLogout = e => {
      /**Handles the logout function when the login button is pressed */
      e.preventDefault();
      // Removes the key from localstorage
      localStorage.removeItem('key');
      // Navigates back to login
      navigate("/login")
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
            <div className='absolute w-screen h-screen bg-slate-700 bg-opacity-70 top-0 left-0'>
               <div className='bg-white fixed inset-0 items-center justify-center w-1/4 h-max m-auto rounded-lg p-4'>
                  <h1 className='text-2xl'>Thomas Erikssons byggnadsservice</h1>
                  <div className='mt-4'>
                     <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700">Användarnamn:</label>
                     <input ref={emailRef} type="email" placeholder='Användarnamn' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                  <div className='mt-4'>
                     <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700">Lösenord:</label>
                     <input ref={passwordRef} type="password" placeholder='Lösenord' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                  <div className='mt-4 w-full'>
                     <button className="bg-blue-600 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center text-white w-full" disabled={ loading } onClick={handleLogin}>Logga in</button>
                  </div>
               </div>
            </div>
         </>
      )}
      </div>
  )
}

export default Login
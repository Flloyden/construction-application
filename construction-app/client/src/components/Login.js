import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { BrowserView, MobileView } from "react-device-detect";
import Logout from "./Logout";
import { isMobile } from "react-device-detect";

const Login = () => {
  // Declaring variables
  // eslint-disable-next-line
  const [loginValue, setLoginValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const getValue = localStorage.getItem('accessToken');
  const auth = { token: getValue };
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  async function loginUser(credentials) {
    console.log(JSON.stringify(credentials))
    return fetch('https://www.mecallapi.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

  const handleLogin = async e => {
    /**Handles the login function when the login button is pressed */
    e.preventDefault();
    setLoading(true);
    const response = await loginUser({
      username,
      password
    });
    if ('accessToken' in response) {
      console.log("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      })
        localStorage.setItem('accessToken', response['accessToken']);
        localStorage.setItem('user', JSON.stringify(response['user']));
        if (isMobile) {
          navigate("/kalender");
        } else {
        }
    } else {
      alert("Failed", response.message, "error");
      console.log("Failed", response.message, "error");
    }
    setLoading(false);
    console.log(loading);
  };

  const handleLogout = (e) => {
    /**Handles the logout function when the login button is pressed */
    e.preventDefault();
    // Removes the key from localstorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    // Navigates back to login
    navigate("/login");
    window.location.reload(false);
  };

  return (
    // Returns the right html if logged in or not
    <div className="h-full">
      {auth.token ? (
        <div className="h-full">
          <BrowserView>
            <Navbar loginValue={loginValue} handleLogout={handleLogout} />
          </BrowserView>
          <MobileView>
            <Logout loginValue={loginValue} handleLogout={handleLogout} />
          </MobileView>
        </div>
      ) : (
        <>
          <div className="absolute w-screen h-full bg-slate-700 bg-opacity-70 top-0 left-0">
            <div className={isMobile ? "bg-white fixed inset-0 items-center justify-center w-11/12 h-max m-auto rounded-lg p-4" : "bg-white fixed inset-0 items-center justify-center w-1/4 h-max m-auto rounded-lg p-4"}>
              <h1 className="text-2xl">Thomas Erikssons byggnadsservice</h1>
              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Användarnamn:
                </label>
                <input
                  onChange={e => setUserName(e.target.value)}
                  type="email"
                  placeholder="Användarnamn"
                  className="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Lösenord:
                </label>
                <input
                onChange={e => setPassword(e.target.value)}
                  type="password"
                  placeholder="Lösenord"
                  className="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mt-4 w-full">
                <button
                  className="bg-blue-600 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center text-white w-full"
                  disabled={loading}
                  onClick={handleLogin}
                >
                  Logga in
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;

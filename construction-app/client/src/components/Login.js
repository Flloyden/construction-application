import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { BrowserView, MobileView } from "react-device-detect";
import Logout from "./Logout";
import { isMobile } from "react-device-detect";
import ForgotPassword from "./ForgotPassword";

const Login = () => {
  if (
    localStorage.theme === "true" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  // Declaring variables
  // eslint-disable-next-line
  const [loginValue, setLoginValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const getValue = localStorage.getItem('accessToken');
  const getTheme = localStorage.getItem("theme");
  const auth = { token: getValue };
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  async function loginUser(credentials) {
    console.log(JSON.stringify(credentials))
    return fetch('http://localhost:8080/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

  const handleSubmit = async e => {
    /**Handles the login function when the login button is pressed */
    e.preventDefault();
    setLoading(true);
    const response = await loginUser({
      username,
      password
    });
    console.log(response)
    if ('accessToken' in response) {
      console.log("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      })
        localStorage.setItem('accessToken', response['accessToken']);
        localStorage.setItem('user', JSON.stringify(response['user']));
        localStorage.setItem('active', 0);
        if (getTheme === null) {
          localStorage.setItem("theme", false);
        } else {
          
        }
        if (isMobile) {
          navigate("/kalender");
        } else {
          window.location.href = "/"
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
    localStorage.removeItem("active");
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
          <div className="absolute w-screen h-full bg-gray-500 bg-opacity-70 top-0 left-0">
            <div className={isMobile ? "bg-white fixed inset-0 items-center justify-center w-max h-max m-auto rounded p-4" : "bg-white fixed inset-0 items-center justify-center w-max h-max m-auto rounded p-4"}>
            <form onSubmit={handleSubmit} className="bg-white fixed inset-0 items-center justify-center w-max h-max m-auto rounded p-6">
              <h1 className="text-2xl">Thomas Erikssons byggnadsservice</h1>
              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Användarnamn:
                </label>
                <input
                  onChange={e => setUserName(e.target.value)}
                  type="text"
                  placeholder="Användarnamn"
                  className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
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
                  className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
              <div className="flex justify-end w-full mt-1">
                <h1 className="w-max text-blue-600 hover:cursor-pointer hover:text-blue-400" onClick={() => {
                        setIsChangePasswordOpen(true);
                      }}>Glömt lösenord?</h1>
              </div>
              <div className="mt-4 w-full">
                <button
                  className="bg-blue-600 rounded text-white hover:bg-blue-500 font-bold py-2 px-4 w-full duration-300"
                  disabled={loading}
                  type="submit"
                >
                  Logga in
                </button>
              </div>
              </form>
            </div>
          </div>
        </>
      )}
      {isChangePasswordOpen && (
        <ForgotPassword
        setIsChangePasswordOpen={setIsChangePasswordOpen}
        />
      )}
    </div>
  );
};

export default Login;

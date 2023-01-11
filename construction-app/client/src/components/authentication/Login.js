import React, { useState } from "react";
import { BrowserView, isMobile, MobileView } from "react-device-detect";
import { useNavigate } from "react-router-dom";
import image from "../../BiTs-logo.png";
import ForgotPassword from "../authentication/ForgotPassword";
import Logout from "../authentication/Logout";
import Navbar from "../navigation/Navbar";

const Login = () => {
  document.title = "BiTs | Thomas Erikssons byggnadsserice";
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
  const loginValue = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const getValue = localStorage.getItem("accessToken");
  const getTheme = localStorage.getItem("theme");
  const auth = { token: getValue };
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [showWrongLogin, setShowWrongLogin] = useState(false);

  async function loginUser(credentials) {
    //Tries to login the user with given cridentials
    try {
      return await fetch("http://localhost:8080/api/v1/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
    } catch (error) {
      console.error("An error occured", error);
    }
  }

  const handleSubmit = async (e) => {
    /**Handles the login function when the login button is pressed */
    e.preventDefault();
    setLoading(true);
    const response = await loginUser({
      email,
      password,
    });

    if (response.ok) {
      const accessToken = response.headers.get("Authorization");
      const refreshToken = response.headers.get("RefreshToken");

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("active", 0);

      if (getTheme === null) {
        localStorage.setItem("theme", false);
      } else {
      }
      if (isMobile) {
        navigate("/kalender");
      } else {
        window.location.href = "/";
      }

      setLoading(false);
    } else {
      console.error("Authentication failed");
      setShowWrongLogin((showWrongInput) => !showWrongInput);
      setTimeout(() => {
        setShowWrongLogin(false);
        setLoading(false);
      }, 3000);
    }
  };

  const handleLogout = (e) => {
    /**Handles the logout function when the logout button is pressed */
    e.preventDefault();
    // Removes the keys from localstorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
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
          <div className="w-screen h-screen bg-gray-500 bg-opacity-70 fixed top-0 left-0 z-10" />
      <div className="bg-gray-500 bg-opacity-70 top-0 left-0 fixed w-screen h-screen justify-center items-center flex flex-row rounded z-20">
              <form
                onSubmit={handleSubmit}
                className={isMobile ? "bg-white fixed inset-0 items-center justify-center w-fit max-w-sm h-max my-auto rounded mx-auto p-6" : "bg-white fixed inset-0 items-center justify-center w-fit h-max my-auto rounded p-4 mx-auto"}
              >
                <img
                  src={image}
                  alt="logo"
                  width={"30%"}
                  className="mx-auto pb-2"
                />
                <h1 className={"text-xl"}>Thomas Erikssons byggnadsservice</h1>
                <div className="mt-2">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Email:
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="Email"
                    className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  />
                </div>
                <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Lösenord:
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Lösenord"
                    className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  />
                </div>
                <div className="flex justify-between w-full mt-2">
                  <div
                    className={
                      showWrongLogin
                        ? "bg-red-500 px-4 rounded text-white py-1 duration-200 visible"
                        : "invisible duration-200"
                    }
                  >
                    <p className={showWrongLogin ? "visible" : "invisible"}>
                      Felaktig inloggning
                    </p>
                  </div>
                  <h1
                    className="w-max py-1 text-blue-600 hover:cursor-pointer hover:text-blue-400"
                    onClick={() => {
                      setIsChangePasswordOpen(true);
                    }}
                  >
                    Glömt lösenord?
                  </h1>
                </div>
                <div className="mt-2 w-full">
                  <button
                    className="bg-blue-600 rounded text-white hover:bg-blue-500 font-semibold py-2 px-4 w-full duration-300"
                    disabled={loading}
                    type="submit"
                  >
                    Logga in
                  </button>
                </div>
              </form>
          </div>
        </>
      )}
      {isChangePasswordOpen && (
        <ForgotPassword setIsChangePasswordOpen={setIsChangePasswordOpen} />
      )}
    </div>
  );
};

export default Login;

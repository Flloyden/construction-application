import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { MdOutlineExitToApp } from "react-icons/md"
import ApiConnector from "../services/ApiConnector";

export default function Logout(props) {
  if (
    localStorage.theme === "true" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    // Gets all the warrenties on page load and runs only once
    const fetchData = async () => {
      setLoading(true);
      // Tries to get data from api
      try {
        const response = await ApiConnector.getUser(1);
        setUserInfo(response.data);
        // Logs error if api cal not successful
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  function checkNav() {
    const getItem = localStorage.getItem("nav")
    if (getItem === "true") {
      return (
        <MdOutlineExitToApp className="text-4xl mx-auto rotate-180" />
      )
    } else {
      return (
        <p>Logga ut</p>
      )
    }
  }
  
  return (
    <>
    {!loading && (
    <div className={isMobile ? "fixed inset-x-0 bottom-0 w-full z-50" : "absolute inset-x-0 bottom-0 w-full"}>
      <p className={isMobile ? "hidden" : "font-normal text-black dark:text-white py-2 text-base text-center"}>
        Inloggad som: {userInfo.username}
      </p>
      <button
        className={isMobile ? "bg-blue-600 text-white hover:bg-blue-500 font-bold py-2 px-4 w-full duration-300" : "bg-blue-600 rounded text-white hover:bg-blue-500 font-bold py-2 w-full duration-300"}
        onClick={props.handleLogout}
      >
        {checkNav()}
      </button>
    </div>
    )}
    </>
  );
}

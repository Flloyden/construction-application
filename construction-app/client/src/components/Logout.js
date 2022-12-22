import React from "react";
import { isMobile } from "react-device-detect";

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
  
  return (
    <div className={isMobile ? "fixed inset-x-0 bottom-0 w-full z-50" : "absolute inset-x-0 bottom-0 w-full"}>
      <p className={isMobile ? "hidden" : "font-normal text-black dark:text-white py-2 text-base text-center"}>
        Inloggad som: admin{props.loginValue.email}
      </p>
      <button
        className={isMobile ? "bg-blue-600 text-white hover:bg-blue-500 font-bold py-2 px-4 w-full duration-300" : "bg-blue-600 rounded text-white hover:bg-blue-500 font-bold py-2 w-full duration-300"}
        onClick={props.handleLogout}
      >
        Logga ut
      </button>
    </div>
  );
}

import React from "react";
import { isMobile } from "react-device-detect";

export default function Logout(props) {
  return (
    <div className={isMobile ? "fixed inset-x-0 bottom-0 w-full z-50" : "absolute inset-x-0 bottom-0 w-full"}>
      <p className={isMobile ? "hidden" : "font-light text-white py-2 text-base text-center"}>
        Inloggad som: admin{props.loginValue.email}
      </p>
      <button
        className={isMobile ? "bg-blue-500 text-white hover:bg-slate-700 font-bold py-2 px-4 w-full duration-300" : "bg-blue-500 text-white hover:bg-slate-700 font-bold py-2 px-4 rounded w-full duration-300"}
        onClick={props.handleLogout}
      >
        Logga ut
      </button>
    </div>
  );
}

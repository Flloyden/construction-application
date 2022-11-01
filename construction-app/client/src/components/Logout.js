import React from "react";

export default function Logout(props) {
  return (
    <div className="absolute inset-x-0 bottom-0 w-full">
      <p className="font-light text-white py-2 text-base text-center">
        Inloggad som: admin{props.loginValue.email}
      </p>
      <button
        className="bg-blue-500 text-white hover:bg-slate-700 font-bold py-2 px-4 rounded w-full duration-300"
        onClick={props.handleLogout}
      >
        Logga ut
      </button>
    </div>
  );
}

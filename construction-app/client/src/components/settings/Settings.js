import React, { useState } from "react";
import SettingsCalendar from "./SettingsCalendar";
import SettingsPassword from "./SettingsPassword";
import SettingsProfile from "./SettingsProfile";
import SettingsVisual from "./SettingsVisual";

export default function Settings() {
  if (
    localStorage.theme === "true" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  const [active, setActive] = useState(0);
  const [showVisual, setShowVisual] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showProfile, setShowProfile] = useState(true)
  const [showPassword, setShowPassword,] = useState(false)
  const list = [
    { option: "Profil" },
    { option: "Lösenord" },
    { option: "Utseende" },
    { option: "Kalender" },
    
  ];

  function changeOption(e) {
    setShowVisual(false)
    setShowCalendar(false)
    setShowProfile(false)
    setShowPassword(false)
    if(e === 0) {
      setShowProfile(true)
    } if(e === 1) {
      setShowPassword(true)
    } if(e === 2) {
      setShowVisual(true)
    } if(e === 3) {
      setShowCalendar(true)
    }
  }

  return (
    <div className="p-7 text 2x1 font-semibold flex-1 h-full bg-blue-50 dark:bg-white dark:text-white">
      <div className="rounded-lg w-full h-full">
      <div className="w-full h-fit bg-white dark:bg-gray-800 p-6 rounded shadow border">
      <ul className="flex justify-between gap-6 text-center">
            {list.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    setActive(index);
                    changeOption(index)
                  }}
                  className={
                    active === index
                      ? "hover:cursor-pointer bg-gray-200 w-full py-2 rounded border-b-4 border-blue-600 dark:bg-gray-700"
                      : "hover:cursor-pointer bg-gray-200 hover:border-b-4 w-full py-2 rounded border-blue-600 dark:bg-gray-700"
                  }
                >
                  {item.option}
                </li>
              );
            })}
          </ul>
          {showVisual && (
            <SettingsVisual />
          )}
          {showCalendar && (
            <SettingsCalendar />
          )}
          {showProfile && (
            <SettingsProfile />
          )}
          {showPassword && (
            <SettingsPassword />
          )}
        </div>
      </div>
    </div>
  );
}

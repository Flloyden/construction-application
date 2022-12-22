import React, { useState } from "react";
import SettingsCalendar from "./SettingsCalendar";
import SettingsExtra from "./SettingsExtra";
import SettingsGeneral from "./SettingsGeneral";
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
  const [showGeneral, setShowGeneral] = useState(true)
  const [showVisual, setShowVisual] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showPassword, setShowPassword,] = useState(false)
  const [showExtra, setShowExtra] = useState(false)
  const list = [
    { test: "Generellt" },
    { test: "Utseende" },
    { test: "Kalender" },
    { test: "Profil" },
    { test: "Lösenord" },
    { test: "Annat" },
  ];

  function test(e) {
    setShowGeneral(false)
    setShowVisual(false)
    setShowCalendar(false)
    setShowProfile(false)
    setShowPassword(false)
    setShowExtra(false)
    if(e === 0) {
      setShowGeneral(true)
    } if(e === 1) {
      setShowVisual(true)
    } if(e === 2) {
      setShowCalendar(true)
    } if(e === 3) {
      setShowProfile(true)
    } if(e === 4) {
      setShowPassword(true)
    } if(e === 5) {
      setShowExtra(true)
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
                    test(index)
                  }}
                  className={
                    active === index
                      ? "hover:cursor-pointer bg-gray-200 w-full py-2 rounded border-b-4 border-blue-600 dark:bg-gray-700"
                      : "hover:cursor-pointer bg-gray-200 hover:border-b-4 w-full py-2 rounded border-blue-600 dark:bg-gray-700"
                  }
                >
                  {item.test}
                </li>
              );
            })}
          </ul>
          {showGeneral && (
            <SettingsGeneral />
          )}
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
          {showExtra && (
            <SettingsExtra />
          )}
        </div>
      </div>
    </div>
  );
}

import React from "react";
import DarkMode from "./DarkMode";
import Password from "./Password";
import SettingsCalendar from "./SettingsCalendar";

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

  return (
    <div className="p-7 text 2x1 font-semibold flex-1 h-full bg-blue-50 dark:bg-white dark:text-white">
        <div className="rounded-lg w-full h-full">
          <h1 className="text-4xl dark:text-black">Inställningar</h1>
          <div className="w-full h-fit bg-white dark:bg-gray-800 mt-4 p-4 rounded shadow border">
            <h1 className="text-2xl">Generellt</h1>
            <DarkMode />
          </div>
          <div className="w-full h-fit bg-white dark:bg-gray-800 mt-4 p-4 rounded shadow border">
            <h1 className="text-2xl">Konto</h1>
            <Password />
          </div>
          <div className="w-full h-fit bg-white dark:bg-gray-800 mt-4 p-4 rounded shadow border">
            <h1>Översikt</h1>
          </div>
          <div className="w-full h-fit bg-white dark:bg-gray-800 mt-4 p-4 rounded shadow border">
            <h1>Kunder</h1>
          </div>
          <div className="w-full h-fit bg-white dark:bg-gray-800 mt-4 p-4 rounded shadow border">
            <h1 className="text-2xl">Kalender</h1>
            <SettingsCalendar />
          </div>
          <div className="w-full h-fit bg-white dark:bg-gray-800 mt-4 p-4 rounded shadow border">
            <h1>Garantier</h1>
          </div>
        </div>
    </div>
  );
}

import React from "react";
import About from "./About";
import CookiePolicy from "./CookiePolicy";
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
    <div className="p-7 text 2x1 font-semibold flex-1 h-min bg-blue-50 dark:bg-white dark:text-white">
      <div className="rounded-lg w-full h-full">
        <h1 className="text-4xl dark:text-black">Inställningar</h1>
        <div className="grid-cols-2 grid gap-4 mb-6">
          <div className="w-full h-fit bg-white dark:bg-gray-800 mt-4 p-6 rounded shadow border">
            <h1 className="text-2xl">Generellt</h1>
            <DarkMode />
            <SettingsCalendar />
            <Password />
          </div>
          <div className="w-full h-fit bg-white dark:bg-gray-800 mt-4 p-6 rounded shadow border">
            <h1 className="text-2xl">Om</h1>
            <About />
            <CookiePolicy />
          </div>
        </div>
      </div>
    </div>
  );
}

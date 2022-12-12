import React, { useEffect, useState } from "react";

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

  const [darkToggle, setDarkToggle] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getValue = localStorage.getItem("theme");
    // Gets all the clients on page load once per load
    setLoading(true);
    if (getValue === null) {
      setDarkToggle(true);
    } else if (getValue === "true") {
      setDarkToggle(true);
    } else {
      setDarkToggle(false);
    }
    setLoading(false);
  }, [darkToggle]);

  const setDarkMode = () => {
    setDarkToggle(!darkToggle);
    localStorage.setItem("theme", !darkToggle);
  };

  return (
    <div className="p-7 text 2x1 font-semibold flex-1 h-full bg-blue-50 dark:bg-white dark:text-white">
      {!loading && (
        <div className="rounded-lg w-full h-full">
          <h1 className="text-4xl dark:text-black">Inställningar</h1>
          <div className="w-full h-fit bg-white dark:bg-gray-800 mt-4 p-4 rounded shadow border">
            <h1>Generellt</h1>
            <div className="flex align-middle justify-start items-center pt-4">
              <span className="text-sm font-medium pr-2">
                Mörkt läge
              </span>
              <label className="inline-flex relative items-center cursor-pointer toggleDarkBtn">
                <input
                  type="checkbox"
                  value=""
                  defaultChecked={darkToggle}
                  className="sr-only peer"
                  onChange={() => setDarkMode()}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
          <div className="w-full h-fit bg-white dark:bg-gray-800 mt-4 p-4 rounded shadow border">
            <h1>Konto</h1>
          </div>
          <div className="w-full h-fit bg-white dark:bg-gray-800 mt-4 p-4 rounded shadow border">
            <h1>Översikt</h1>
          </div>
          <div className="w-full h-fit bg-white dark:bg-gray-800 mt-4 p-4 rounded shadow border">
            <h1>Kunder</h1>
          </div>
          <div className="w-full h-fit bg-white dark:bg-gray-800 mt-4 p-4 rounded shadow border">
            <h1>Kalender</h1>
          </div>
          <div className="w-full h-fit bg-white dark:bg-gray-800 mt-4 p-4 rounded shadow border">
            <h1>Garantier</h1>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import HelpCalendar from "./HelpCalendar";
import HelpCustomer from "./HelpCustomer";
import HelpHome from "./HelpHome";
import HelpSettings from "./HelpSettings";
import HelpWarranty from "./HelpWarranty";

export default function Help() {
  const list = [
    { option: "Översikt" },
    { option: "Kunder" },
    { option: "Kalender" },
    { option: "Garantier" },
    { option: "Inställningar" },
  ];
  const [active, setActive] = useState(0);
  const [showHome, setShowHome] = useState(true)
  const [showCustomer, setShowCustomer] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showWarranty, setShowWarranty] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  function option(e) {
    setShowHome(false)
    setShowCustomer(false)
    setShowCalendar(false)
    setShowWarranty(false)
    setShowSettings(false)
    if(e === 0) {
      setShowHome(true)
    } if(e === 1) {
      setShowCustomer(true)
    } if(e === 2) {
      setShowCalendar(true)
    } if(e === 3) {
      setShowWarranty(true)
    } if(e === 4) {
      setShowSettings(true)
    }
  }

  return (
    <div className="p-7 text 2x1 font-semibold flex-1 h-fit bg-blue-50 dark:bg-white dark:text-white">
      <div className="rounded-lg w-full h-full">
        <div className="w-full h-fit bg-white dark:bg-gray-800 p-6 rounded shadow border">
          <ul className="flex justify-between gap-6 text-center">
            {list.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    setActive(index);
                    option(index)
                  }}
                  className={
                    active === index
                      ? "hover:cursor-pointer bg-gray-200 w-full dark:bg-gray-700 py-2 rounded border-b-4 border-blue-600"
                      : "hover:cursor-pointer bg-gray-200 hover:border-b-4 w-full dark:bg-gray-700 py-2 rounded border-blue-600"
                  }
                >
                  {item.option}
                </li>
              );
            })}
          </ul>
          {showHome && (
            <HelpHome />
          )}
          {showCustomer && (
            <HelpCustomer />
          )}
          {showCalendar && (
            <HelpCalendar />
          )}
          {showWarranty && (
            <HelpWarranty />
          )}
          {showSettings && (
            <HelpSettings />
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import HelpCalendar from "./HelpCalendar";
import HelpCustomer from "./HelpCustomer";
import HelpExtra from "./HelpExtra";
import HelpHome from "./HelpHome";
import HelpSettings from "./HelpSettings";
import HelpWarranty from "./HelpWarranty";

export default function Help() {
  const list = [
    { test: "Översikt" },
    { test: "Kunder" },
    { test: "Kalender" },
    { test: "Garantier" },
    { test: "Inställningar" },
    { test: "Annat" },
  ];
  const [active, setActive] = useState(0);
  const [showHome, setShowHome] = useState(true)
  const [showCustomer, setShowCustomer] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showWarranty, setShowWarranty] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showExtra, setShowExtra] = useState(false)

  function test(e) {
    setShowHome(false)
    setShowCustomer(false)
    setShowCalendar(false)
    setShowWarranty(false)
    setShowSettings(false)
    setShowExtra(false)
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
                      ? "hover:cursor-pointer bg-gray-200 w-full dark:bg-gray-700 py-2 rounded border-b-4 border-blue-600"
                      : "hover:cursor-pointer bg-gray-200 hover:border-b-4 w-full dark:bg-gray-700 py-2 rounded border-blue-600"
                  }
                >
                  {item.test}
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
          {showExtra && (
            <HelpExtra />
          )}
        </div>
      </div>
    </div>
  );
}

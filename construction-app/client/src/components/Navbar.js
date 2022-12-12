import React, { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import { FiUsers, FiSettings } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import Logout from "./Logout";

export default function Navbar(props) {
  if (
    localStorage.theme === "true" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  // Declaring variables
  const [pageTitle, setPageTitle] = useState("Meny");
  const [active, setActive] = useState();
  let currentLocation = useLocation();
  // Menus
  const Menus = [
    { title: "Översikt", src: <AiOutlineHome />, link: "/"},
    { title: "Kunder", src: <FiUsers />, link: "/kunder"},
    { title: "Kalender", src: <BiCalendar />, link: "/kalender"},
    { title: "Garantier", src: <HiOutlineDocumentText />, link: "/garantier"},
    { title: "Inställningar", src: <FiSettings />, link: "/settings"},
  ];

  // Checks the endpoint and changes the page tilte and header
  useEffect(() => {
    const titleMap = [
      { path: "/", title: "Översikt" },
      { path: "/kunder", title: "Kundregister" },
      { path: "/kalender", title: "Kalender" },
      { path: "/garantier", title: "Garantier" },
      { path: "/settings", title: "Inställningar" },
    ];
    const currentTitle = titleMap.find(
      (item) => item.path === currentLocation.pathname
    );
    if (currentTitle && currentTitle.title) {
      setPageTitle(currentTitle.title);
      document.title = currentTitle.title;
    }
  }, [currentLocation]);

  const setLocal = (e) => {
    setActive(e)
    localStorage.setItem('active', e);
  }

  const getActive = () => {
    const getValue = localStorage.getItem('active');
    return parseInt(getValue)
  }

  return (
    <div className={`w-72 h-full bg-white border-r-2 dark:bg-gray-800`}>
      <div className="w-72 h-full fixed p-5 pt-8 bg-white border-r-2 shadow-xl dark:bg-gray-800">
        <div className="flex-none gap-x-4 items-center w-full h-full relative text-black dark:text-white">
          <p className="font-bold text-2xl text-center pb-4">{pageTitle}</p>
          <ul
            className={`text-gray-700 dark:text-white origin-left font-medium text-xl w-full pt-4`}
          >
            {Menus.map((menu, index) => (
              <li
                onClick={() => {
                  // Condition for toggling the lists.
                  // If current list is selected
                    setLocal(index)
                }}
                className={
                  getActive() === index ? "bg-gray-200 dark:bg-gray-700 dark:text-white text-black rounded border-l-8 mt-4 border-blue-600" : "block mt-4 w-full dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white hover:text-black rounded border-l-8 border-white hover:border-gray-200"
                }
                key={index}
              >
                <Link
                  className="flex w-full px-4 py-4 align-middle"
                  to={menu.link}
                >
                  <span className="text-3xl w-100">{menu.src}</span>
                  <span className="pl-4 w-100">{menu.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Logout
            loginValue={props.loginValue}
            handleLogout={props.handleLogout}
          />
        </div>
      </div>
    </div>
  );
}

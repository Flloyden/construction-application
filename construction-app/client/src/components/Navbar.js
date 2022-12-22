import React, { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import { FiUsers, FiSettings } from "react-icons/fi";
import { FcExpand } from "react-icons/fc";
import { HiOutlineDocumentText } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { BsQuestionCircle, BsInfoSquare } from "react-icons/bs";
import Logout from "./Logout";
import image from "../BiTs-logo.png";
import logo from "../favicon.png";

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
  let currentLocation = useLocation();
  
  const [navToggle, setNavToggle] = useState(true);
  // Menus
  const Menus = [
    { title: "Översikt", src: <AiOutlineHome />, link: "/" },
    { title: "Kunder", src: <FiUsers />, link: "/kunder" },
    { title: "Kalender", src: <BiCalendar />, link: "/kalender" },
    { title: "Garantier", src: <HiOutlineDocumentText />, link: "/garantier" },
    { title: "Om BiTs", src: <BsInfoSquare />, link: "/om" },
    { title: "Hjälp", src: <BsQuestionCircle />, link: "/help" },
    { title: "Inställningar", src: <FiSettings />, link: "/settings" },
  ];

  useEffect(() => {
    const titleMap = [
      { path: "/", title: "BiTs | Översikt" },
      { path: "/kunder", title: "BiTs | Kundregister" },
      { path: "/kalender", title: "BiTs | Kalender" },
      { path: "/garantier", title: "BiTs | Garantier" },
      { path: "/om", title: "BiTs | Om" },
      { path: "/help", title: "BiTs | Hjälp" },
      { path: "/settings", title: "BiTs | Inställningar" },
    ];
    if (localStorage.nav === "true") {
      setNavToggle(false)
    } else {
      setNavToggle(true)
    }
    const currentTitle = titleMap.find(
      (item) => item.path === currentLocation.pathname
    );
    if (currentTitle && currentTitle.title) {
      document.title = currentTitle.title;
    }
  }, [currentLocation]);

  if (currentLocation.pathname.includes("/kunder/")) {
    localStorage.setItem("active", 1);
  } else if (currentLocation.pathname.includes("/garantier/")) {
    localStorage.setItem("active", 2);
  }

  const setLocal = (e) => {
    localStorage.setItem("active", e);
  };

  const getActive = () => {
    const getValue = localStorage.getItem("active");
    return parseInt(getValue);
  };

  function toggleNav() {
    setNavToggle(!navToggle)
    localStorage.setItem("nav", navToggle);
  }

  function checkNav() {
    if (navToggle) {
      return (
        <img src={image} alt="logo" width={"60%"} className="mx-auto" />
      )
    } else {
      return (
        <img src={logo} alt="logo" className="mx-auto" />
      )
    }
  }

  return (
    <div className={navToggle ? `w-72 h-full bg-white border-r-2 dark:bg-gray-800 duration-200` : `w-32 h-full bg-white border-r-2 dark:bg-gray-800 duration-200`}>
      <div className={navToggle ? "w-72 h-full fixed p-5 pt-8 bg-white border-r-2 shadow-xl dark:bg-gray-800 duration-200" : "w-32 h-full fixed p-5 pt-8 bg-white border-r-2 shadow-xl dark:bg-gray-800 duration-200"}>
      <button className="p-2 text-2xl bg-white shadow rounded border border-slate-400 mt-3 absolute -right-5 dark:bg-gray-800 dark:border-gray-600" type="submit" onClick={() => { toggleNav() }}><FcExpand className={navToggle ? "rotate-[90deg] duration-200" : "rotate-[270deg] duration-200"} /></button>
        <div className="flex-none gap-x-4 items-center w-full h-full relative text-black dark:text-white">
          {checkNav()}
          <ul
            className={`text-gray-700 dark:text-white origin-left font-medium text-xl w-full pt-4`}
          >
            {Menus.map((menu, index) => (
              <li
                onClick={() => {
                  setLocal(index);
                }}
                className={
                  getActive() === index
                    ? "bg-gray-200 dark:bg-gray-700 dark:text-white text-black rounded border-l-8 mt-4 border-blue-600"
                    : "block mt-4 w-full dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white hover:text-black rounded border-l-8 border-white hover:border-gray-200"
                }
                key={index}
              >
                <Link
                  className="flex w-full px-4 py-4 align-middle"
                  to={menu.link}
                >
                  <span className="text-3xl w-100">{menu.src}</span>
                  <span className={navToggle ? "pl-4 w-100" : "hidden"}>{menu.title}</span>
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

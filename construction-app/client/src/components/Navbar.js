import React, { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import Logout from "./Logout";

export default function Navbar(props) {
  // Declaring variables
  const [pageTitle, setPageTitle] = useState("Meny");
  let currentLocation = useLocation();
  // Menus
  const Menus = [
    {
      title: "Översikt",
      src: <AiOutlineHome />,
      link: "/",
      activeClassName: "active [&.active]:bg-blue-400 bg-red-400",
    },
    { title: "Kunder", src: <FiUsers />, link: "/kunder" },
    { title: "Kalender", src: <BiCalendar />, link: "/kalender" },
    { title: "Garantier", src: <HiOutlineDocumentText />, link: "/garantier" }
  ];

  // Checks the endpoint and changes the page tilte and header
  useEffect(() => {
    const titleMap = [
      { path: "/", title: "Översikt" },
      { path: "/kunder", title: "Kundregister" },
      { path: "/kalender", title: "Kalender" },
      { path: "/garantier", title: "Garantier" },
      { path: "/random", title: "Random" },
    ];
    const currentTitle = titleMap.find(
      (item) => item.path === currentLocation.pathname
    );
    if (currentTitle && currentTitle.title) {
      setPageTitle(currentTitle.title);
      document.title = currentTitle.title;
    }
  }, [currentLocation]);

  return (
    <div className={`w-72 h-full bg-gray-800`}>
      <div className="w-72 h-full fixed p-5 pt-8 bg-gray-800">
        <div className="flex-none gap-x-4 items-center w-full h-full relative text-white">
          <p className="font-bold text-2xl text-center pb-4">{pageTitle}</p>
          <ul
            className={`text-white origin-left font-medium text-xl w-full pt-4`}
          >
            {Menus.map((menu, index) => (
              <li
                className="block mt-4 w-full hover:bg-slate-50 hover:bg-opacity-20 rounded-lg"
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
          <Logout loginValue={props.loginValue} handleLogout={props.handleLogout}/>
        </div>
      </div>
    </div>
  );
}

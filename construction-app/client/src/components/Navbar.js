import React, { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { TbNotebook } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";

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
    { title: "Bokföring", src: <HiOutlineDocumentText />, link: "/garantier" },
    { title: "Random", src: <TbNotebook />, link: "/random" },
  ];

  // Checks the endpoint and changes the page tilte and header
  useEffect(() => {
    const titleMap = [
      { path: "/", title: "Översikt" },
      { path: "/kunder", title: "Kundregister" },
      { path: "/kalender", title: "Kalender" },
      { path: "/garantier", title: "Bokföring" },
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
    <div className={`w-72 h-full bg-blue-700 dark:bg-gray-800`}>
      <div className="w-72 h-full fixed p-5 bg-blue-700 pt-8 h-screen dark:bg-gray-800">
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
          <div className="absolute inset-x-0 bottom-0">
            <p className="font-light text-white py-2 text-base text-center">
              Inloggad som: admin{props.loginValue.email}
            </p>
            <button
              className="bg-blue-500 hover:bg-slate-700 font-bold py-2 px-4 rounded w-full duration-300"
              onClick={props.handleLogout}
            >
              Logga ut
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

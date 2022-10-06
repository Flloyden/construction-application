import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { BiCalendar } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { TbNotebook } from "react-icons/tb";
import "../styles/Navbar.css";

export default function Navbar(props) {
    // Declaring variables
    const [pageTitle, setPageTitle] = useState('Meny');
    let currentLocation = useLocation();

    // Checks the endpoint and changes the page tilte and header
    useEffect(() => {
        const titleMap = [
            {path: '/', title:'Översikt'},
            {path: '/kunder', title:'Kundregister'},
            {path: '/kalender', title:'Kalender'},
            {path: '/bokföring', title:'Bokföring'},
            {path: '/random', title:'Random'}
          ]
        const currentTitle = titleMap.find(item => item.path === currentLocation.pathname)
        if(currentTitle && currentTitle.title){
          setPageTitle(currentTitle.title)
          document.title = currentTitle.title
        }
      }, [currentLocation])

  return (
    <div className='navbar'>
        <p className='pageTitle'>{pageTitle}</p>
        <NavLink end to='/' className='nav-btn'><span className='navIcon'><AiOutlineHome /></span>Hem</NavLink>
        <NavLink to='/kunder' className='nav-btn'><span className='navIcon'><FiUsers /></span>Kundregister</NavLink>
        <NavLink to='/kalender' className='nav-btn'><span className='navIcon'><BiCalendar /></span>Kalender</NavLink>
        <NavLink to='/bokföring' className='nav-btn'><span className='navIcon'><HiOutlineDocumentText /></span>Bokföring</NavLink>
        <NavLink to='/random' className='nav-btn'><span className='navIcon'><TbNotebook /></span>Något annat</NavLink>
        <div className='currentUser'>
            <p className='curerntUserText'>Inloggad som: admin{props.loginValue.email}</p>
            <button className='login-btn' onClick={props.handleLogout}>Logga ut</button>
        </div>
    </div>
  )
}

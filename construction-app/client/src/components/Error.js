import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Error() {
   
  return (
    <div className='container'>
      <h1>Error! Sidan du söker finns inte eller så behöver du logga in för att få åtkomst till den.</h1>
      <NavLink to='/'>Hem</NavLink>
    </div>
  )
}
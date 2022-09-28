import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate();

  return (
    <div className='container'>
        <h1>Hem</h1>
        <button id='big' onClick={() => navigate("/kundregister")}>Kundregister</button>
        <button id='big' onClick={() => navigate("/kalender")}>Kalender</button>
        <button id='big' onClick={() => navigate("/bokföring")}>Bokföring</button>
        <button id='big' onClick={() => navigate("/random")}>Något annat</button>
    </div>
  )
}

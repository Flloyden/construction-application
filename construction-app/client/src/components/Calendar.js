import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Calendar() {
    const navigate = useNavigate();

  return (
    <div>
        <h1>Kalender</h1>
        <button onClick={() => navigate("/")}>Hem</button>
    </div>
  )
}
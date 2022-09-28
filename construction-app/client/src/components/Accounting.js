import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Accounting() {
    const navigate = useNavigate();

  return (
    <div>
        <h1>Bokföring</h1>
        <button onClick={() => navigate("/")}>Hem</button>
    </div>
  )
}

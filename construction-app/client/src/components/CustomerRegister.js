import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ApiConnector from '../services/ApiConnector';

const CustomerRegister = () => {
    const navigate = useNavigate();
    const [kunder, setKunder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetData = async () => {
            setLoading(true);
            try {
                const response = await ApiConnector.getKund();
                setKunder(response.data)
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
        fetData();
    }, []);

  return (
    <div>
        <br />
        <button onClick={() => navigate("/")}>Hem</button>
        <h1>Kundregister</h1>
        <button onClick={() => navigate("/skapakund")}>Lägg till kund</button>
        {!loading && (
            <div>
            {kunder.map((kunder) => (
                <h4 key={kunder.id}>{kunder.name}</h4>
            ))}
            </div>
        )}
    </div>
  )
}

export default CustomerRegister
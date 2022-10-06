import React, { useEffect, useState } from 'react'
import ApiConnector from '../services/ApiConnector';
import {useLocation, useNavigate} from 'react-router-dom';

export default function Client() {
    const navigate = useNavigate();
    const location = useLocation();
    const [kunder, setKunder] = useState(null);
    const [loading, setLoading] = useState(true);
    var url = location.pathname;
    var res = url.split("/");
    var pos = res.indexOf('kunder');
    var result = res[pos+1];

    useEffect(() => {
        // Gets all the clients on page load
        const fetData = async () => {
            setLoading(true);
            try {
                const response = await ApiConnector.getKund(result);
                if (response.data === null) {
                    navigate("/error")
                } else {
                    setKunder(response.data)
                }
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
        fetData();
    }, [result, navigate]);

  return (
    <div className='container'>
        <div className='content'>
        <table className="styled-table">
            <thead>
                <tr>
                    <th>Namn</th>
                    <th>Adress</th>
                    <th>Kommentar</th>
                    <th>Skapad</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            {!loading && (
                <tbody>
                    <tr>
                            <td>{kunder.name}</td>
                            <td>{kunder.address}</td>
                            <td>Fönster</td>
                            <td>2022-10-04</td>
                        </tr>
                </tbody>
            )}
        </table>
        </div>
    </div>
  )
}

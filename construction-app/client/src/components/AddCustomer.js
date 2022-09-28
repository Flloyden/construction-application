import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ApiConnector from '../services/ApiConnector';

const AddCustomer = () => {
    const navigate = useNavigate();
    const [kund, setKund] = useState ({
        id: "",
        name: ""
    });

const handleChange = (e) => {
    const value = e.target.value;
    setKund({...kund, [e.target.name]: value});
}

const saveKund = (e) => {
    e.preventDefault();
    ApiConnector.saveKund(kund).then((response) => {
        console.log(response)
        navigate("/kundregister")
    }).catch((error) => {
        console.log(error);
    })
};
         
  return (
    <div>
        <br />
        <button onClick={() => navigate("/")}>Hem</button>
        <br />
        <br />
        <label>Namn: </label>
        <input type="text" name='name' value={kund.name} onChange={(e) => handleChange(e)}></input>
        <button onClick={saveKund}>Spara</button>
    </div>
  )
}

export default AddCustomer
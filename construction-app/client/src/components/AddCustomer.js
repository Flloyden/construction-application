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
    setKund({...kund, [e.target.name]: value},
        {...kund,[e.target.phonenumber]:value},
        {...kund,[e.target.address]:value},
        {...kund,[e.target.fastighetsbeteckning]:value},
        {...kund,[e.target.phonenumber]:value});
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

        <label>Adress: </label>
        <input type="text" name='address' value={kund.address} onChange={(e) => handleChange(e)}></input>

        <label>Telefonnummer: </label>
        <input type="text" name='phonenumber' value={kund.phonenumber} onChange={(e) => handleChange(e)}></input>

        <label>fastighetsbeteckning: </label>
        <input type="text" name='fastighetsbeteckning' value={kund.fastighetsbeteckning} onChange={(e) => handleChange(e)}></input>

        <label>Personnummer: </label>
        <input type="text" name='personnr' value={kund.personnr} onChange={(e) => handleChange(e)}></input>
        
        <button onClick={saveKund}>Spara</button>
    </div>
  )
}

export default AddCustomer
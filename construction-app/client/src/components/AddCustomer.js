import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiConnector from "../services/ApiConnector";
import "../styles/AddCustomer.css";

const AddCustomer = () => {
  // Declare variables
  const navigate = useNavigate();
  const [kund, setKund] = useState({
    id: "",
    name: "",
    address: "",
    phoneNumber: "",
    propertyDesignation: "",
    socialSecurityNumber: "",
  });

  const handleChange = (e) => {
    /**Gets the current input every keystroke */
    const value = e.target.value;
    setKund({
      ...kund,
      [e.target.name]: value,
      [e.target.address]: value,
      [e.target.phoneNumber]: value,
      [e.target.propertyDesignation]: value,
      [e.target.socialSecurityNumber]: value,
    });
  };

  const saveKund = (e) => {
    /**Saves the "kund" and navigates back to the register */
    e.preventDefault();
    // Check if all input fields are ok
    if (
      kund.name.length > 1 &&
      kund.address.length > 1 &&
      kund.phoneNumber.length > 1 &&
      kund.propertyDesignation.length > 0 &&
      kund.socialSecurityNumber.length > 1
    ) {
      ApiConnector.saveKund(kund)
        .then((response) => {
          console.log(response);
          navigate("/kundregister");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Fyll i alla fält");
    }
  };

  const clearInputs = () => {
    /**Empties the input fields */
    setKund({
      id: "",
      name: "",
      address: "",
      phoneNumber: "",
      propertyDesignation: "",
      socialSecurityNumber: "",
    });
  };

  return (
    <div className="container">
      <h1>Skapa en ny kund</h1>
      <div className="addInfo">
        <div className="inputs">
          <label>Namn: </label>
          <input
            className="input"
            type="text"
            name="name"
            required
            value={kund.name}
            onChange={(e) => handleChange(e)}
          ></input>

          <label>Adress: </label>
          <input
            className="input"
            type="text"
            name="address"
            value={kund.address}
            onChange={(e) => handleChange(e)}
          ></input>

          <label>Telefonnummer: </label>
          <input
            className="input"
            type="text"
            name="phoneNumber"
            value={kund.phoneNumber}
            onChange={(e) => handleChange(e)}
          ></input>

          <label>fastighetsbeteckning: </label>
          <input
            className="input"
            type="text"
            name="propertyDesignation"
            value={kund.propertyDesignation}
            onChange={(e) => handleChange(e)}
          ></input>

          <label>Personnummer: </label>
          <input
            className="input"
            type="number"
            name="socialSecurityNumber"
            value={kund.socialSecurityNumber}
            onChange={(e) => handleChange(e)}
          ></input>
          <div className="buttons">
            <button className="save" onClick={saveKund}>
              Spara
            </button>
            <button className="redo" onClick={clearInputs}>
              Rensa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;

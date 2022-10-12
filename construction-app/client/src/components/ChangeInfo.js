import { useState } from 'react';
import ApiConnector from '../services/ApiConnector';

const ChangeInfo = ({currentClientName, currentClientId, currentClientAddress, currentClientPhone, currentClientProperty, currentClientSSN }) => {
    const [kund, setKund] = useState({
        id: currentClientId,
        name: currentClientName,
        address: currentClientAddress,
        phoneNumber: currentClientPhone,
        propertyDesignation: currentClientProperty,
        socialSecurityNumber: currentClientSSN,
        workList: [],
        customerNotes: [],
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
          });
      };
    
      const test = (e) => {
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
              window.location.reload(false);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          alert("Fyll i alla fält");
        }
      };
  
    return (
    <>
    <h1>Ändra information</h1>
      <div className="addInfo">
        <div className="inputs">
        
          <label>Namn: </label>
          <input
            className="input"
            type="text"
            name="name"
            required
            value={kund.name}
            placeholder={currentClientName}
            onChange={(e) => handleChange(e)}
          ></input>

          <label>Adress: </label>
          <input
            className="input"
            type="text"
            name="address"
            value={kund.address}
            placeholder={currentClientAddress}
            onChange={(e) => handleChange(e)}
          ></input>

          <label>Telefonnummer: </label>
          <input
            className="input"
            type="text"
            name="phoneNumber"
            value={kund.phoneNumber}
            placeholder={currentClientPhone}
            onChange={(e) => handleChange(e)}
          ></input>

          <label>fastighetsbeteckning: </label>
          <input
            className="input"
            type="text"
            name="propertyDesignation"
            value={kund.propertyDesignation}
            placeholder={currentClientProperty}
            onChange={(e) => handleChange(e)}
          ></input>
          <label>Personnummer: </label>
          <input
            className="input"
            type="text"
            name="socialSecurityNumber"
            value={kund.socialSecurityNumber}
            placeholder={currentClientId}
            onChange={(e) => handleChange(e)}
          ></input>
          </div>
          <button className="save" onClick={test}>
              Spara
            </button>
          </div>
    </>
  );
};

export default ChangeInfo;
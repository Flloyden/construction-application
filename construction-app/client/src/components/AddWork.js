import { useState } from 'react';
import ApiConnector from '../services/ApiConnector';

const AddWork = ({currentClientName, currentClientId, currentClientAddress, currentClientPhone, currentClientProperty, currentClientSSN }) => {
    const [kund, setKund] = useState({
        id: currentClientId,
        name: currentClientName,
        address: currentClientAddress,
        phoneNumber: currentClientPhone,
        propertyDesignation: currentClientProperty,
        socialSecurityNumber: currentClientSSN,
        workList: [{
            id: "",
            materialNote: "",
            offer: null,
            workStatus: "COMPLETED",
            calendar: [],
        }],
        customerNotes: [],
      });
    
      const handleChange = (e) => {
        /**Gets the current input every keystroke */
        const value = e.target.value;
        console.log(kund.workList[0])
        setKund({
            ...kund,
            [e.target.workList.materialNote]: value,
          });
      };
    
      const test = (e) => {
        /**Saves the "kund" and navigates back to the register */
        e.preventDefault();
        // Check if all input fields are ok
        
          ApiConnector.saveKund(kund)
            .then((response) => {
              console.log(response);
              window.location.reload(false);
            })
            .catch((error) => {
              console.log(error);
            });
      };
  
    return (
    <>
    <h1>Lägg till jobb</h1>
      <div className="addInfo">
        <div className="inputs">
        
          <label>materialNote: </label>
          <input
            className="input"
            type="text"
            name="materialNote"
            required
            value={kund.workList}
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

export default AddWork;
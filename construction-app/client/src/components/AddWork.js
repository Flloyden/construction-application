import { useState } from "react";
import ApiConnector from "../services/ApiConnector";
import "../styles/AddWork.css";

const AddWork = ({
  setIsWorkOpen,
  currentClientName,
  currentClientId,
  currentClientAddress,
  currentClientPhone,
  currentClientProperty,
  currentClientSSN,
}) => {
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

    if (kund.workList.length < 1) {
      kund.workList.push({
        id: "",
        materialNote: e.target.value,
        offer: null,
        workStatus: "COMPLETED",
        calendar: [],
      });
    } else {
      kund.workList[0].materialNote = e.target.value;
    }

    console.log(kund);
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
      <div className="darkBG" onClick={() => setIsWorkOpen(false)} />
      <div className="centered">
        <div className="model">
          <div className="addInfo">
            <div className="inputs">
              <h1>Lägg till jobb</h1>
              <label>Material: </label>
              <input
                className="input"
                type="text"
                name="materialNote"
                required
                value={kund.workList.materialNote}
                onChange={(e) => handleChange(e)}
              ></input>

              <label>Offert: </label>
              <input
                className="input"
                type="file"
                name="offer"
                accept=".pdf"
                value={kund.workList.offer}
                onChange={(e) => handleChange(e)}
              ></input>
              <div className="styleButtons">
                <button className="save" onClick={test}>
                  Spara
                </button>
                <button className="cancel" onClick={() => setIsWorkOpen(false)}>
                  Avbryt
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddWork;

import { useRef, useState } from "react";
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
  currentClientWorkList,
}) => {
  const [kund, setKund] = useState({
    id: currentClientId,
    name: currentClientName,
    address: currentClientAddress,
    phoneNumber: currentClientPhone,
    propertyDesignation: currentClientProperty,
    socialSecurityNumber: currentClientSSN,
    workList: currentClientWorkList,
    customerNotes: [],
  });
  const nameRef = useRef();
  const materialNoteRef = useRef();
  const offer = useRef();
  const [newList, setNewList] = useState();

  const handleChange = (e) => {
    /**Gets the current input every keystroke */

    setNewList({
      id: "",
      name: nameRef.current.value,
      materialNote: materialNoteRef.current.value,
      offer: offer.current.value,
      workStatus: "NOTSTARTED",
      calendar: [],
    });

    console.log(offer.current.file)
  };

  const test = (e) => {
    /**Saves the "kund" and navigates back to the register */
    e.preventDefault();
    // Check if all input fields are ok

    console.log(offer.current.file)

    kund.workList.push(newList);

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
              <label>Namn: </label>
              <input
                ref={nameRef}
                className="input"
                type="text"
                name="name"
                required
                onChange={(e) => handleChange(e)}
              ></input>

              <label>Material: </label>
              <input
                ref={materialNoteRef}
                className="input"
                type="text"
                name="materialNote"
                required
                onChange={(e) => handleChange(e)}
              ></input>

              <label>Offert: </label>
              <input
              ref={offer}
                className="input"
                type="file"
                name="offer"
                accept="image/png, image/jpg, image/jpeg"
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

import { useRef, useState } from "react";
import ApiConnector from "../services/ApiConnector";
import "../styles/AddWork.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

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
  const [image, setImage] = useState("");
  let [startDate, setStartDate] = useState(new Date());
  let [endDate, setEndDate] = useState(new Date());
  let [countDays, setCountDays] = useState(1);

  const handleChange = (e) => {
    /**Gets the current input every keystroke */

    const startDateMoment = moment(startDate, "YYYY-MM-DD").unix();
    const endDateMoment = moment(endDate, "YYYY-MM-DD").unix();
    const dayCount = (endDateMoment - startDateMoment) / 86400 + 1;
    setCountDays(dayCount);

    setNewList({
      id: "",
      name: nameRef.current.value,
      numberOfDays: dayCount,
      materialNote: materialNoteRef.current.value,
      offer: image,
      startDate: startDate,
      workStatus: "NOTSTARTED",
      calendar: [],
    });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImage(base64);
  };

  const test = (e) => {
    /**Saves the "kund" and navigates back to the register */
    e.preventDefault();
    // Check if all input fields are ok

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
              <label className="label">Namn på jobb: </label>
              <input
                ref={nameRef}
                className="input"
                type="text"
                name="name"
                required
                onChange={(e) => handleChange(e)}
              ></input>

              <label className="label">Offert: </label>
              <input
                ref={offer}
                className="input"
                type="file"
                name="offer"
                accept="image/png, image/jpg, image/jpeg"
                onChange={(e) => handleFile(e)}
              ></input>

              <label className="label">Arbetsdatum: </label>
              <div className="dates">
                <p>Startdatum:</p>
                <label onClick={handleChange}>
                  <DatePicker
                    className="dateInput"
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      handleChange(date);
                    }}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                  />
                </label>
                <p>Slutdatum:</p>
                <label onClick={handleChange}>
                  <DatePicker
                    className="dateInput"
                    selected={endDate}
                    onChange={(date) => {
                      setEndDate(date);
                      handleChange(date);
                    }}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                  />
                </label>
              </div>
              <p>Antal dagar: {countDays}</p>

              <label className="label">Material: </label>
              <input
                ref={materialNoteRef}
                className="input"
                type="text"
                name="materialNote"
                required
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

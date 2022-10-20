import { useRef, useState } from "react";
import ApiConnector from "../services/ApiConnector";
import "../styles/AddWork.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const addWarranty = () =>{

const nameRef = useRef();
const receiptRef = useRef();
const registration_numberRef = useRef();
const [image, setImage] = useState("");
let [startDate, setStartDate] = useState(new Date());
let [endDate, setEndDate] = useState(new Date());
let [countDays, setCountDays] = useState(1);

const startDateMoment = moment(startDate, new Date().toLocaleString() + "").unix();
    const endDateMoment = moment(endDate, "YYYY-MM-DD").unix();
    const dayCount = (endDateMoment - startDateMoment) / 86400 + 1;
    setCountDays(dayCount);

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
    
    
        ApiConnector.saveWarranty(warranty)
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
          <div className="darkBG"/>
          <div className="centered">
            <div className="model">
              <div className="addInfo">
                <div className="inputs">
                  <h1>Lägg till garanti</h1>
                  <label className="label">Namn på garanti: </label>
                  <input
                    ref={nameRef}
                    className="input"
                    type="text"
                    name="name"
                    required
                    onChange={(e) => handleChange(e)}
                  ></input>

               
                  <label className="label">Kvitto: </label>
                  <input
                    ref={receiptRef}
                    className="input"
                    type="file"
                    name="receipt"
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={(e) => handleFile(e)}
                  ></input>

                <label className="label">Registreringsnummer: </label>
                  <input
                    ref={registration_numberRef}
                    className="input"
                    type="text"
                    name="name"
                    required
                    onChange={(e) => handleChange(e)}
                  ></input>
    
                  <label className="label">Utgångsdatum för kvitto: </label>
                  <div className="dates">
                   
                    <p>Slutdatum för kvitto:</p>
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
                    }

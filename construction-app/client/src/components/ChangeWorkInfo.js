import { useRef, useState } from "react";
import ApiConnector from "../services/ApiConnector";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ChangeWorkInfo = ({
  currentCustomerId,
  setIsChangeOpen,
  currentWorkId,
  currentWorkName,
  currentOffer,
  currentWorkDays,
  currentWorkMaterial,
  currentStartDate
}) => {
  const [work] = useState({
    id: currentWorkId,
    name: currentWorkName,
    offer: currentOffer,
    startDate: currentStartDate,
    materialNote: currentWorkMaterial
  });
  const nameRef = useRef();
  const materialNoteRef = useRef();
  const offer = useRef();
  const [newList, setNewList] = useState();
  const [image, setImage] = useState(currentOffer);
  let [countDays, setCountDays] = useState(1);
  const currentEndDateMoment = moment(currentStartDate, "YYYY-MM-DD").add('days', currentWorkDays).format('YYYY-MM-DD');
  let [startDate, setStartDate] = useState(new Date(currentStartDate));
  let [endDate, setEndDate] = useState(new Date(currentEndDateMoment));

  const handleChange = (e) => {
    /**Gets the current input every keystroke */

    // Gets the startdate, enddate and calculates amount of days
    const startDateMoment = moment(startDate, "YYYY-MM-DD").unix();
    const endDateMoment = moment(endDate, "YYYY-MM-DD").unix();
    const dayCount = (endDateMoment - startDateMoment) / 86400 + 1;
    setCountDays(dayCount);
    console.log(image)

    setNewList({
      id: currentWorkId,
      name: nameRef.current.value,
      numberOfDays: dayCount,
      materialNote: materialNoteRef.current.value,
      offer: image,
      startDate: startDate,
      workStatus: "NOTSTARTED",
      calendar: [],
    });
    console.log(newList)
  };

  const convertToBase64 = (file) => {
    /**Converts file int base64 */
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
    /**Gets the file from input and makes it into base64 and saves it */
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImage(base64);
  };

  const saveChanges = (e) => {
    /**Saves the "kund" and navigates back to the register */
    e.preventDefault();
      // Makes the change with the help of api call
      ApiConnector.changeWork(currentCustomerId, newList)
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
      <div
        className="w-screen h-screen bg-slate-700 bg-opacity-70 fixed top-0 left-0"
        onClick={() => setIsChangeOpen(false)}
      />
      <div className="bg-white fixed inset-0 flex items-center justify-center w-2/4 h-max m-auto rounded-lg p-4">
      <div className="w-full">
          <h1 className="text-4xl">Ändra jobbinformation</h1>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Namn på jobb: </label>
            <input
              ref={nameRef}
              className="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              type="text"
              name="name"
              required
              placeholder={work.name}
              onChange={(e) => handleChange(e)}
            ></input>
          </div>

          <div className="mt-4"></div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Offert: </label>
          <input
            ref={offer}
            className="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            type="file"
            name="offer"
            accept="image/png, image/jpg, image/jpeg, application/pdf"
            onChange={(e) => handleFile(e)}
          ></input>

          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Arbetsdatum: </label>
            <div className="flex gap-2">
              <label onClick={handleChange}>
              <p className="block mb-2 text-sm font-medium text-gray-700">Startdatum:</p>
                <DatePicker
                  className="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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
              
              <label onClick={handleChange}>
              <p className="block mb-2 text-sm font-medium text-gray-700">Slutdatum:</p>
                <DatePicker
                  className="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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
          </div>
          <p className="mt-4 block mb-2 text-sm font-medium text-gray-700">Antal dagar: {countDays}</p>

          
          <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Material: </label>
          <input
            ref={materialNoteRef}
            className="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="materialNote"
            placeholder={currentWorkMaterial}
            required
            onChange={(e) => handleChange(e)}
          ></input>
          </div>
          <div className="flex w-full gap-2 mt-10 justify-end inset-x-0 bottom-4 mx-auto text-white">
          <button className="bg-red-500 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center w-2/4" onClick={() => setIsChangeOpen(false)}>
                Avbryt
              </button>
              <button
                className="bg-green-500 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center w-2/4"
                onClick={saveChanges}
              >
                Spara
              </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeWorkInfo;

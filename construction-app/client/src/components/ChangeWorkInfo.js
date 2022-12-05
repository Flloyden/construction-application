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
  currentStartDate,
  currentWorkStatus
}) => {
  const [work] = useState({
    id: currentWorkId,
    name: currentWorkName,
    offer: currentOffer,
    startDate: currentStartDate,
    workStatus: currentWorkStatus,
    materialNote: currentWorkMaterial,
  });
  const nameRef = useRef();
  const materialNoteRef = useRef();
  const offer = useRef();
  const [newList, setNewList] = useState();
  const [image, setImage] = useState(currentOffer);
  const currentEndDateMoment = moment(currentStartDate, "YYYY-MM-DD")
    .add("days", currentWorkDays)
    .format("YYYY-MM-DD");
  let [startDate, setStartDate] = useState(new Date(currentStartDate));
  let [endDate, setEndDate] = useState(new Date(currentEndDateMoment));
  const [selected, setSelected] = useState(currentWorkStatus);
  const dayCountRef = useRef();

  const handleChange = (e) => {
    /**Gets the current input every keystroke */

    // Gets the startdate, enddate and calculates amount of days
    const startDateMoment = moment(startDate, "YYYY-MM-DD").unix();
    const endDateMoment = moment(endDate, "YYYY-MM-DD").unix();
    const dayCount = (endDateMoment - startDateMoment) / 86400 + 1;
    console.log(image);

    setNewList({
      id: currentWorkId,
      name: nameRef.current.value,
      numberOfDays: dayCountRef.current.value,
      materialNote: materialNoteRef.current.value,
      offer: image,
      startDate: startDate,
      workStatus: selected,
      calendar: [],
    });
    console.log(newList);
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

  function changeWorkStatus(e) {
    console.log(e.target.value);
    setSelected(e.target.value);
  }

  return (
    <>
      <div
        className="w-screen h-screen bg-slate-700 bg-opacity-70 fixed top-0 left-0 z-10"
        onClick={() => setIsChangeOpen(false)}
      />
      <div className="bg-white fixed inset-0 flex items-center justify-center w-2/4 h-max m-auto rounded-lg p-4 z-20">
        <div className="w-full">
          <h1 className="text-4xl">Ändra jobbinformation</h1>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Namn på jobb:{" "}
            </label>
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
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Offert:{" "}
          </label>
          <input
            ref={offer}
            className="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            type="file"
            name="offer"
            accept="image/png, image/jpg, image/jpeg, application/pdf"
            onChange={(e) => handleFile(e)}
          ></input>

          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Arbetsdatum:{" "}
            </label>
            <div className="flex gap-2">
              <label onClick={handleChange}>
                <p className="block mb-2 text-sm font-medium text-gray-700">
                  Startdatum:
                </p>
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
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Antal dagar:
                </label>
                <input
                  ref={dayCountRef}
                  className="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  type="text"
                  name="materialNote"
                  required
                  onChange={(e) => handleChange(e)}
                ></input>
              </label>
            </div>
          </div>
          <p className="mt-4 block text-sm font-medium text-gray-700">
            Jobbstatus:
          </p>
          <div className="flex gap-4">
            <div className="w-1/3">
              <input
                type="radio"
                id="NOTSTARTED"
                name="choose"
                value="NOTSTARTED"
                checked={selected === "NOTSTARTED"}
                onChange={changeWorkStatus}
                className="peer hidden"
              />
              <label
                htmlFor="NOTSTARTED"
                className="block hover:bg-gray-500 bg-gray-700 cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold text-white duration-200"
              >
                Ej påbörjat
              </label>
            </div>

            <div className="w-1/3">
              <input
                type="radio"
                id="STARTED"
                name="choose"
                value="STARTED"
                onChange={changeWorkStatus}
                checked={selected === "STARTED"}
                className="peer hidden"
              />
              <label
                htmlFor="STARTED"
                className="block hover:bg-gray-500 bg-gray-700 cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold text-white duration-200"
              >
                Pågående
              </label>
            </div>

            <div className="w-1/3">
              <input
                type="radio"
                id="COMPLETED"
                name="choose"
                value="COMPLETED"
                onChange={changeWorkStatus}
                checked={selected === "COMPLETED"}
                className="peer hidden"
              />
              <label
                htmlFor="COMPLETED"
                className="block hover:bg-gray-500 bg-gray-700 cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold text-white duration-200"
              >
                Slutfört
              </label>
            </div>
          </div>

          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Material:{" "}
            </label>
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
            <button
              className="bg-red-500 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center w-2/4"
              onClick={() => setIsChangeOpen(false)}
            >
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

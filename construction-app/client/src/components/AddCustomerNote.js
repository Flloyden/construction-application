import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ApiConnector from "../services/ApiConnector";

const AddCustomerNote = () => {

  const [note, setNote] = useState({
    id: "",
    date: "",
    jobb: "",
    time_spent: "",
    distance_driven: "",
    hired_time: "",
  });

  let [startDate, setStartDate] = useState(new Date());
  let endDate = new Date();


  const isWeekday = (date) => {
    const day = date.getDay;
    return day !== 0 && day !== 6;
  };


  const handleChange = (e) => {
    /**Gets the current input every keystroke
     * and sets values to the custumer
     */
    const value = e.target.value;
    setNote({
      ...note,
      [e.target.date]: startDate,
      [e.target.jobb]: value,
      [e.target.time_spent]: value,
      [e.target.distance_driven]: value,
      [e.target.hired_time]: value,
    });
  };



  return (
    <div className="w-full bg-gray-700 rounded-md p-4">
      <h1 className="text-2xl w-full text-white">Lägg till ny anteckning</h1>

      <div className="w-full flex gap-2">
        <div className="mt-4 w-1/4">
        <label onClick={handleChange}>
          <p className="mb-2 text-sm font-medium text-white">Datum:</p>
            <DatePicker
                  className="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    handleChange(date);
                  }}
                  filterDate={isWeekday}
                  placeholderText="Select a weekday"
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                />
                </label>
        </div>

        <div className="mt-4 w-1/4">
          <label className="mb-2 text-sm font-medium text-white">Jobb: </label>
          <input
            className="rounded-lg block w-full p-2.5 bg-white border-white placeholder-gray-400 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="address"
          ></input>
        </div>

        <div className="mt-4 w-1/4">
          <label className="mb-2 text-sm font-medium text-white">Tid: </label>
          <input
            className="rounded-lg block w-full p-2.5 bg-white border-white placeholder-gray-400 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="time_spent"
            value={note.time_spent}
            onChange={(e) => handleChange(e)}
          ></input>
        </div>

        <div className="mt-4 w-1/4">
          <label className="mb-2 text-sm font-medium text-white">
            Körning:{" "}
          </label>
          <input
            className="rounded-lg w-full p-2.5 bg-white border-white placeholder-gray-400 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="distance_driven"
            value={note.distance_driven}
            onChange={(e) => handleChange(e)}
          ></input>
        </div>

        <div className="mt-4 w-1/4">
          <label className="mb-2 text-sm font-medium text-white">
            Anställd tid:{" "}
          </label>
          <input
            className="rounded-lg w-full p-2.5 bg-white border-white placeholder-gray-400 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="hired_time"
            value={note.hired_time}
            onChange={(e) => handleChange(e)}
          ></input>
        </div>

        <div className="flex w-min gap-2 mt-10 justify-end inset-x-0 bottom-4 mx-auto">
          <button className="bg-green-500 hover:opacity-50 font-bold py-2 px-4 rounded duration-300 text-center w-full text-white">
            Spara
          </button>
        </div>
      </div>
    </div>
  );
  };
  export default AddCustomerNote();

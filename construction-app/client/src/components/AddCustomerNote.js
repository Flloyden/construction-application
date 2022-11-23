import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ApiConnector from "../services/ApiConnector";

const AddCustomerNote = () => {
  const [note, setNote] = useState({
    id: "",
    date_posted: "",
    km_driven: "",
    note: "",
    time_employee: "",
    time_spend: "",
    customer_id: "",
    work_id: "",
  });

  const kmRef = useRef();
  const noteRef = useRef();
  const employeeRef = useRef();
  const timeRef = useRef();
  const customerRef = useRef();
  const workRef = useRef();
  const [newList, setNewList] = useState();
  let [startDate, setStartDate] = useState(new Date());
  let endDate = new Date();

  const [workId, setWorkId] = useState(1);

  const isWeekday = (date) => {
    const day = date.getDay;
    return day !== 0 && day !== 6;
  };

  const handleChange = (e) => {
    /**Gets the current input every keystroke */
    console.log(kmRef.current.value)
    setNewList({
      id: "",
      date_posted: startDate,
      km_driven: kmRef.current.value,
      note: "",
      time_employee: employeeRef.current.value,
      time_spend: timeRef.current.value,
      customer_id: 1,
      work_id: 1,
    });
    console.log(newList);
  };

  const saveNote = (e) => {
    /**Saves the work and navigates back to the register */
    e.preventDefault();
    setNote(newList);
    ApiConnector.saveNote(note, workId)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full bg-gray-700 rounded-md p-4">
      <h1 className="text-2xl w-full text-white">Lägg till ny anteckning</h1>

      <div className="w-full flex gap-2">
        <div className="mt-4 w-1/4">
            <p className="mb-1 text-sm font-medium text-white">Datum:</p>
            <DatePicker
              className="rounded-lg block w-full p-2.5 bg-white border-white placeholder-gray-400 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
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
        </div>

        <div className="mt-4 w-1/4">
          <label className="mb-2 text-sm font-medium text-white">Jobb: </label>
          <input
            className="rounded-lg block w-full p-2.5 bg-white border-white placeholder-gray-400 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="address"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>

        <div className="mt-4 w-1/4">
          <label className="mb-2 text-sm font-medium text-white">Tid: </label>
          <input
            className="rounded-lg block w-full p-2.5 bg-white border-white placeholder-gray-400 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="time_spent"
            ref={timeRef}
            onChange={(e) => handleChange(e)}
          ></input>
        </div>

        <div className="mt-4 w-1/4">
          <label className="mb-2 text-sm font-medium text-white">
            Körning:{" "}
          </label>
          <input
            ref={kmRef}
            className="rounded-lg w-full p-2.5 bg-white border-white placeholder-gray-400 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="name"
            required
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
            ref={employeeRef}
            onChange={(e) => handleChange(e)}
          ></input>
        </div>

        <div className="flex w-min gap-2 mt-10 justify-end inset-x-0 bottom-4 mx-auto">
          <button
            className="bg-green-500 hover:opacity-50 font-bold py-2 px-4 rounded duration-300 text-center w-full text-white"
            onClick={saveNote}
          >
            Spara
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerNote;
import React, { useState } from "react";
import ApiConnector from "../../services/ApiConnector";
import DatePicker from "react-datepicker";
import { RiCloseLine } from "react-icons/ri";

export default function Semester({ setIsSemesterOpen }) {
  let [startDate, setStartDate] = useState(new Date());
  const [semester, setSemester] = useState({
    id: "",
    name: "",
    startDate: startDate,
    numberOfDays: "",
  });

  const handleChange = (e) => {
    let value = e.target.value;
    setSemester({
      ...semester,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    /**Saves the work and navigates back to the register */
    e.preventDefault();
    console.log(semester);
    // Adds work to user with api call
    ApiConnector.saveSemester(semester)
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
      <div className="w-screen h-screen bg-gray-500 bg-opacity-70 fixed top-0 left-0 z-10" />
      <div className="bg-gray-500 bg-opacity-70 top-0 left-0 fixed w-screen h-screen justify-center items-center flex flex-row rounded z-20">
        <form onSubmit={handleSubmit} className="bg-white rounded">
          <div className="flex border-b-2 px-6 py-3 items-center justify-center">
            <div className="w-10/12">
              <h1 className="font-bold">Semester</h1>
            </div>
            <div className="w-2/12 text-right flex justify-end">
              <button
                className="text-3xl opacity-70 hover:opacity-100 duration-300"
                onClick={() => setIsSemesterOpen(false)}
              >
                <RiCloseLine />
              </button>
            </div>
          </div>
          <div className="w-fit shadow-lg rounded-md p-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Namn: <span className="text-red-700 font-black">*</span>
            </label>
            <input
              onChange={handleChange}
              name="name"
              value={semester.name}
              required
              className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
            <div className="flex gap-2 mt-4">
              <div className="w-1/2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Startdatum: <span className="text-red-700 font-black">*</span>
                </label>
                <DatePicker
                  className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  name="startDate"
                  selected={startDate}
                  onChange={(date) => {
                    setSemester({
                      ...semester,
                      startDate: new Date(date),
                    });
                    setStartDate(date);
                  }}
                  selectsStart
                  startDate={startDate}
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Antal dagar:{" "}
                  <span className="text-red-700 font-black">*</span>
                </label>
                <input
                  name="numberOfDays"
                  value={semester.numberOfDays}
                  required
                  onChange={handleChange}
                  className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>
            <div className="flex w-full gap-2 mt-10 justify-end inset-x-0 bottom-4 mx-auto text-white">
              <button
                className="bg-gray-600 hover:bg-gray-500 font-bold py-2 px-4 rounded duration-300 text-center w-2/4"
                onClick={() => setIsSemesterOpen(false)}
              >
                Avbryt
              </button>
              <button
                type="sumbit"
                className="bg-blue-600 rounded text-white hover:bg-blue-500 font-bold py-2 px-4 w-2/4 duration-300"
              >
                Spara
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

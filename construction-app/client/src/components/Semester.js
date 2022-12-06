import React, { useState } from "react";
import ApiConnector from "../services/ApiConnector";
import DatePicker from "react-datepicker";

export default function Semester({ setIsSemesterOpen }) {
  let [startDate, setStartDate] = useState(new Date());
  const [semester, setSemester] = useState({
    id: "",
    name: "",
    startDate: startDate,
    numberOfDays: "",
  });

  const handleChange = e => {
    let value = e.target.value;
    setSemester({
      ...semester,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    /**Saves the work and navigates back to the register */
    e.preventDefault();
    console.log(semester)
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
      <div
        className="w-screen h-screen bg-slate-700 bg-opacity-70 fixed top-0 left-0"
        onClick={() => setIsSemesterOpen(false)}
      />
      <div className="bg-white fixed inset-0 flex items-center justify-center w-1/5 p-4 h-max m-auto rounded-lg">
        <div className="w-full">
          <form onSubmit={handleSubmit}>
            <h1 className="text-4xl">Lägg till semester</h1>
            <div className="mt-4">
              <div className="p-2 shadow-md border-2 border-gray-400 rounded-md mb-2">
                <p className="text-sm font-medium text-gray-700 mt-2 w-10/12">
                  Namn
                </p>
                <input
                  onChange={handleChange}
                  name="name"
                  value={semester.name}
                  required
                  className="mt-0 mb-2 w-full flex-none rounded-lg block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="flex"></div>
                <div className="flex gap-2">
                  <div className="w-1/2">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Startdatum:{" "}
                    </label>
                    <DatePicker
                      className="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      name="startDate"
                      selected={startDate}
                      onChange={(date) => {
                        setSemester({
                          ...semester,
                          startDate: new Date(date),
                        });
                        setStartDate(date)
                      }}
                      selectsStart
                      startDate={startDate}
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Antal dagar:{" "}
                    </label>
                    <input
                      name="numberOfDays"
                      value={semester.numberOfDays}
                      required
                      onChange={handleChange}
                      className="mt-0 w-full rounded-lg block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full gap-2 mt-10 justify-end inset-x-0 bottom-4 mx-auto text-white">
              <button
                className="bg-red-500 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center w-2/4"
                onClick={() => setIsSemesterOpen(false)}
              >
                Avbryt
              </button>
              <button
                type="sumbit"
                className="bg-green-500 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center w-2/4"
              >
                Spara
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

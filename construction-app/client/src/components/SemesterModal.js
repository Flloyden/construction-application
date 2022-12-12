import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import DatePicker from "react-datepicker";
import ApiConnector from "../services/ApiConnector";

const SemesterModal = (props) => {
  let [startDate, setStartDate] = useState(new Date(props.semesterStartDate));
  const [semester, setSemester] = useState({
    id: props.currentId,
    name: props.currentName,
    startDate: startDate,
    numberOfDays: props.currentSemesterDays,
  });

  const handleChange = (e) => {
    let value = e.target.value;
    setSemester({
      ...semester,
      [e.target.name]: value,
    });
    console.log(semester);
  };

  const editSemester = async () => {
    // Deletes a client with given id and updates the id
    try {
      await ApiConnector.editSemester(props.currentId, semester);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
    props.setIsModalOpen(false);
  };

  const deleteSemester = async () => {
    // Deletes a client with given id and updates the id
    try {
      await ApiConnector.deleteSemester(props.currentId);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
    props.setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="w-screen h-screen bg-slate-700 bg-opacity-70 fixed top-0 left-0 z-10"
        onClick={() => props.setIsModalOpen(false)}
      />
      <div className="bg-slate-700 top-1/4 left-1/3 fixed ml-36 rounded-lg z-20">
        <div className="w-96 bg-white rounded-lg">
          <button
            className="absolute -top-3 -right-3 text-4xl bg-white rounded-lg shadow-md hover:text-red-500 duration-200"
            onClick={() => props.setIsModalOpen(false)}
          >
            <RiCloseLine />
          </button>
          <div className="text-black p-4 text-2xl text-center flex items-center h-full">
            <p className="mx-auto text-center font-bold">{props.currentName}</p>
          </div>
          <div className="w-full px-4 mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Namn:{" "}
              </label>
              <input
                name="name"
                value={semester.name}
                required
                onChange={handleChange}
                className="mt-0 w-full rounded-lg block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          <div className="flex px-4 mb-4 gap-2">
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
                  setStartDate(date);
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
          <div className="flex px-4 gap-2   mx-auto text-white">
            <button
              className="bg-green-500 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center w-2/4"
              onClick={() => editSemester(props.currentId)}
            >
              Ändra
            </button>
            <button
              className="bg-red-500 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center w-2/4"
              onClick={() => deleteSemester(props.currentId)}
            >
              Ta bort
            </button>
          </div>
          <div className="px-4 mx-auto">
            <button
              className="bg-blue-500 hover:bg-slate-700 text-white font-bold py-2 rounded duration-300 text-center w-full my-2"
              onClick={() => props.setIsModalOpen(false)}
            >
              Avbryt
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SemesterModal;

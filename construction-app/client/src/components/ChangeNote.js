import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import ApiConnector from "../services/ApiConnector";

export default function ChangeNote(props) {
  const [date] = useState(props.currentDate);
  const [work] = useState(props.currentName);
  const [time, setTime] = useState(props.currentTime);
  const [km, setKm] = useState(props.currentKm);
  const [employee, setEmployee] = useState(props.currentEmployee);
  const [note, setNote] = useState(props.currentNote);

  console.log(props);

  const handleSubmit = (e) => {
    /**Saves the work and navigates back to the register */
    e.preventDefault();
    // Adds work to user with api call
    ApiConnector.editNote()
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
              <h1 className="font-bold">Ändra anteckning</h1>
            </div>
            <div className="w-2/12 text-right flex justify-end">
              <button
                className="text-3xl opacity-70 hover:opacity-100 duration-300"
                onClick={() => props.setIsChangeOpen(false)}
              >
                <RiCloseLine />
              </button>
            </div>
          </div>
          <div className="w-min shadow-lg rounded-md p-6">
            <div className="flex gap-2">
              <div className="mt-0">
                <label className="block mt-1 text-sm font-medium text-gray-700">
                  Jobb:{" "}
                </label>
                <input required disabled value={work}></input>
              </div>
              <div className="mt-0">
                <label className="block mt-1 text-sm font-medium text-gray-700">
                  Datum:{" "}
                </label>
                <input required disabled value={date}></input>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="mt-4">
                <label className="block mt-1 text-sm font-medium text-gray-700">
                  Tid: <span className="text-red-700 font-black">*</span>{" "}
                </label>
                <input
                  className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  type="text"
                  name="name"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                ></input>
              </div>
              <div className="mt-4">
                <label className="block mt-1 text-sm font-medium text-gray-700">
                  Körning: <span className="text-red-700 font-black">*</span>{" "}
                </label>
                <input
                  className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  type="text"
                  name="name"
                  required
                  value={km}
                  onChange={(e) => setKm(e.target.value)}
                ></input>
              </div>
              <div className="mt-4">
                <label className="block mt-1 text-sm font-medium text-gray-700">
                  Anställd tid:{" "}
                  <span className="text-red-700 font-black">*</span>{" "}
                </label>
                <input
                  className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  type="text"
                  name="name"
                  required
                  value={employee}
                  onChange={(e) => setEmployee(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="mt-4">
              <label className="block mt-1 text-sm font-medium text-gray-700">
                Kommentar: <span className="text-red-700 font-black">*</span>{" "}
              </label>
              <input
                className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                type="text"
                name="name"
                required
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></input>
            </div>
            <div className="flex w-full gap-2 mt-5 justify-end inset-x-0 bottom-4 mx-auto text-white">
              <button
                className="bg-blue-500 rounded text-white hover:bg-blue-600 font-bold py-2 px-4 w-full duration-300"
                type="submit"
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

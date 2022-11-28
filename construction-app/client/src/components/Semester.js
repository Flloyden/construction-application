import React, { useRef, useState } from "react";
import ApiConnector from "../services/ApiConnector";
import { GrAddCircle } from "react-icons/gr";

export default function Semester({ setIsSemesterOpen }) {

  const [state, setState] = React.useState({});
  const dayCountRef = useRef();
  const [val, setVal] = useState([{}]);
  const handleAdd = () => {
    const abc = [...val, []];
    setVal(abc);
  };

  const handleChange = (onChangeValue, i) => {
    const inputData = [...val];
    const value = onChangeValue.target.value;
    inputData[i] = {
      [onChangeValue.target.name]: value,
      numberOfDays: dayCountRef.current.value,
    };
    setState({
      ...state,
      id: "",
      [onChangeValue.target.name]: value,
      numberOfDays: dayCountRef.current.value,
      vacationCalendar: []
    });
    inputData[i] = state;
    setVal(inputData);
  };

  const handleDelete = (i) => {
    const deleteVal = [...val];
    deleteVal.splice(i);
    setVal(deleteVal);
  };

  const saveSemester = (e) => {
    /**Saves the work and navigates back to the register */
    e.preventDefault();
    // Adds work to user with api call
    ApiConnector.saveSemester(state)
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
          <h1 className="text-4xl">Lägg till semester</h1>
          <div className="mt-4">
            {val.map((data, i) => {
              return (
                <div key={i} className="p-2 shadow-md border-2 border-gray-400 rounded-md mb-2">
                  <p className="text-sm font-medium text-gray-700 mt-2 w-10/12">
                      Namn
                    </p>
                    <input
                      onChange={(e) => handleChange(e, i)}
                      name="name"
                      className="mt-0 mb-2 w-full flex-none rounded-lg block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="flex">
                    <p className="text-sm font-medium text-gray-700 w-10/12">
                      Datum: (YYYY-MM-DD)
                    </p>
                    <p className="text-sm font-medium text-gray-700 w-6/12">
                      Antal dagar
                    </p>
                  </div>
                    <div className="flex gap-2">
                      <input
                        onChange={(e) => handleChange(e, i)}
                        name="startDate"
                        className="mt-0 w-10/12 rounded-lg block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        ref={dayCountRef}
                        name="numberOfDays"
                        onChange={(e) => handleChange(e, i)}
                        className="mt-0 w-4/12 rounded-lg block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                      className="w-2/12 bg-red-500 rounded-md text-white hover:bg-slate-700 duration-200"
                      onClick={() => handleDelete(i)}
                    >
                      X
                    </button>
                    </div>
                </div>
              );
            })}
            <button className="mt-4 py-1 flex w-full h-min items-center justify-center cursor-default">
              <GrAddCircle
                className="text-4xl ml-2 cursor-pointer hover:rotate-90 hover:opacity-100 duration-500 opacity-50 hidden"
                onClick={() => handleAdd()}
              />
            </button>
          </div>
          <div className="flex w-full gap-2 mt-10 justify-end inset-x-0 bottom-4 mx-auto text-white">
            <button
              className="bg-red-500 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center w-2/4"
              onClick={() => setIsSemesterOpen(false)}
            >
              Avbryt
            </button>
            <button
              className="bg-green-500 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center w-2/4"
              onClick={saveSemester}
            >
              Spara
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

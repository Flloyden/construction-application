import React from "react";
import { RiCloseLine } from "react-icons/ri";

const CalendarModal = (props) => {

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
          <div className="text-black p-8 text-2xl text-center flex items-center h-full">
            <p className="mx-auto text-center font-bold">Finns ingenting på det valda datumet!</p>
          </div>
          <div className="flex px-4 mb-4 gap-2">
          </div>
          <div className="px-4 mx-auto">
            <button
              className="bg-red-500 hover:bg-slate-700 text-white font-bold py-2 rounded duration-300 text-center w-full my-2"
              onClick={() => props.setIsModalOpen(false)}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarModal;

import React from "react";
import { RiCloseLine } from "react-icons/ri";

const NoteModal = ({
  setIsOpen,
  deleteThis,
  currentId,
}) => {
  return (
    <>
      <div
        className="w-screen h-screen bg-slate-700 bg-opacity-70 fixed top-0 left-0 z-20"
        onClick={() => setIsOpen(false)}
      />
      <div className="bg-slate-700 top-1/4 left-1/3 fixed ml-36 rounded-lg z-30">
        <div className="w-96 bg-white h-80 rounded-lg z-30">
          <div className="text-center text-4xl p-4 text-red-600">
            <h5>Varning</h5>
          </div>
          <button
            className="absolute -top-3 -right-3 text-4xl bg-white rounded-lg shadow-md hover:text-red-500 duration-200"
            onClick={() => setIsOpen(false)}
          >
            <RiCloseLine />
          </button>
          <div className="text-black p-4 text-2xl text-center">
            Är du säker du vill ta bort anteckningen?
          </div>
          <div className="flex w-9/12 gap-2 justify-end absolute inset-x-0 bottom-4 mx-auto text-white">
            <button
              className="bg-red-500 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center w-2/4"
              onClick={() => setIsOpen(false)}
            >
              Avbryt
            </button>
            <button
              className="bg-green-500 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center w-2/4"
              onClick={() => deleteThis(currentId)}
            >
              Ta bort
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteModal;

import React from "react";
import { RiCloseLine } from "react-icons/ri";

const Modal = ({
  setIsOpen,
  deleteThis,
  currentName,
  currentId,
}) => {
  return (
    <>
     <div className="w-screen h-screen bg-gray-500 bg-opacity-70 fixed top-0 left-0 z-10" />
      <div className="bg-gray-500 bg-opacity-70 top-0 left-0 fixed w-screen h-screen justify-center items-center flex flex-row rounded z-20">
      <div className="bg-white rounded w-fit shadow-lg p-6">
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
            Är du säker du vill ta bort <br></br> <b>{currentName}</b>
            <br></br>från kundregistret?
          </div>
          <div className="flex w-full gap-2 mt-10 justify-end inset-x-0 bottom-4 mx-auto text-white">
            <button
              className="bg-gray-500 hover:bg-gray-600 py-2 px-4 rounded duration-300 text-center w-2/4"
              onClick={() => setIsOpen(false)}
            >
              Avbryt
            </button>
            <button
               className="bg-blue-500 rounded text-white hover:bg-blue-600 py-2 px-4 w-2/4 duration-300"
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

export default Modal;

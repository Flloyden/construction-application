import React from "react";

const NavigateModal = ({
  setIsModalOpen,
  allowNavigate,
  currentName,
  currentId,
}) => {
  return (
    <>
      <div className="w-screen h-screen bg-gray-500 bg-opacity-70 fixed top-0 left-0 z-10" />
      <div className="bg-gray-500 bg-opacity-70 top-0 left-0 fixed w-screen h-screen justify-center items-center flex flex-row rounded z-20">
        <div className="bg-white rounded w-fit shadow-lg p-6">
          <div className="text-black p-4 text-2xl text-center flex items-center h-full">
            <p className="pb-0 mx-10 text-center">
              Är du säker du vill gå till <br></br> <b>{currentName}</b>?
            </p>
          </div>
          <div className="flex w-full gap-2 mt-10 justify-end inset-x-0 bottom-4 mx-auto text-white">
            <button
              className="bg-gray-500 hover:bg-gray-600 font-semibold py-2 px-4 rounded duration-300 text-center w-2/4"
              onClick={() => setIsModalOpen(false)}
            >
              Avbryt
            </button>
            <button
              className="bg-blue-500 rounded text-white font-semibold hover:bg-blue-600 py-2 px-4 w-2/4 duration-300"
              onClick={() => allowNavigate(currentId)}
            >
              Ja
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigateModal;

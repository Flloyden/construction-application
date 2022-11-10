import React, { useState } from "react";
import ApiConnector from "../services/ApiConnector";
import ChangeWorkInfo from "./ChangeWorkInfo";
import WorkModal from "./WorkModal";

const Work = (props) => {
  const [open, setOPen] = useState(false);
  const toggle = () => {
    setOPen(!open);
  };
  const [showOffer, setShowOffer] = useState(false);
  const toggleOffer = () => {
    setShowOffer(!showOffer);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isChangeOpen, setIsChangeOpen] = useState(false);

  const deleteThis = async () => {
    // Deletes a client with given id and updates the id
    try {
      await ApiConnector.deleteWork(props.currentCustomerId, props.workName.id);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
    setIsOpen(false);
  };

  return (
    <div>
      <h1 className="p-4 cursor-pointer" onClick={toggle}>
        {props.label}
      </h1>
      {open && (
        <div className={open ? "content-show" : "content-parent"}>
          <div className="p-4">
            <div className="flex px-4 py-4 border-b-2">
              <div className="flex">
                <p className="text-2xl font-bold">Material:</p>
              </div>
              <span className="text-1xl ml-4 my-auto">
                {props.workName.materialNote}
              </span>
            </div>
            <div className="flex px-4 py-4 border-b-2">
              <div className="flex">
                <p className="text-2xl font-bold">Jobbstatus:</p>
              </div>
              <span className="text-1xl ml-4 my-auto">
                {props.workName.workStatus}
              </span>
            </div>
            <div className="flex px-4 py-4 border-b-2">
              <div className="flex">
                <p className="text-2xl font-bold">Startdatum:</p>
              </div>
              <span className="text-1xl ml-4 my-auto">
                {props.workName.startDate}
              </span>
            </div>
            <div className="flex px-4 py-4 border-b-2">
              <div className="flex">
                <p className="text-2xl font-bold">Antal dagar:</p>
              </div>
              <span className="text-1xl ml-4 my-auto">
                {props.workName.numberOfDays}
              </span>
            </div>
            <div className="flex px-4 py-4">
              <div className="flex">
                <button
                  onClick={toggleOffer}
                  className="bg-slate-700 hover:bg-slate-800 py-2 px-4 rounded duration-300 text-center text-1xl text-white w-48 h-12"
                >
                  {showOffer ? "Stäng" : "Visa offert"}
                </button>
                <div
                  className={
                    showOffer
                      ? "w-screen h-screen bg-slate-700 bg-opacity-70 fixed top-0 left-0"
                      : "content-parent"
                  }
                  onClick={() => setShowOffer(false)}
                >
                  {showOffer && (
                    <embed
                      className="w-full mx-auto"
                      src={props.workName.offer}
                      alt="offer"
                      style={{ height: "100%", width: "50%" }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex w-full gap-2">
              <button
                className="bg-red-600 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center text-white w-2/4"
                data-modal-toggle="defaultModal"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                Ta bort
              </button>
              <button
                className="bg-blue-600 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center text-white w-2/4"
                onClick={() => {
                  setIsChangeOpen(true);
                }}
              >
                Ändra
              </button>
            </div>
          </div>
        </div>
      )}
      {isOpen && (
        <WorkModal
          setIsOpen={setIsOpen}
          deleteThis={deleteThis}
          currentName={props.label}
          currentId={props.workName.id}
        />
      )}
      {isChangeOpen && (
        <ChangeWorkInfo
          currentCustomerId={props.currentCustomerId}
          setIsChangeOpen={setIsChangeOpen}
          currentWorkId={props.workName.id}
          currentWorkName={props.label}
          currentOffer={props.workName.offer}
          currentWorkDays={props.workName.numberOfDays}
          currentStartDate={props.workName.startDate}
          currentWorkMaterial={props.workName.materialNote}
        />
      )}
    </div>
  );
};
export default Work;

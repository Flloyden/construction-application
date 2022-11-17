import React, { useState } from "react";
import ApiConnector from "../services/ApiConnector";
import ChangeWorkInfo from "./ChangeWorkInfo";
import WorkModal from "./WorkModal";
import { RiCloseLine } from "react-icons/ri";
import { RiPencilFill } from "react-icons/ri";

const Work = (props) => {
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

  function checkWorkStatus() {
    if (props.workName.workStatus === "NOTSTARTED") {
      return "opacity-100 relative h-full";
    } else if (props.workName.workStatus === "STARTED") {
      return "opacity-100 relative h-full";
    } else if (props.workName.workStatus === "COMPLETED") {
      return "opacity-10 relative h-full hover:opacity-100 duration-300";
    }
  }

  function checkWorkName() {
    if (props.workName.workStatus === "NOTSTARTED") {
      return "Ej påbörjat";
    } else if (props.workName.workStatus === "STARTED") {
      return "Pågående";
    } else if (props.workName.workStatus === "COMPLETED") {
      return "Slutfört";
    }
  }

  return (
    <div className={checkWorkStatus()}>
      <div className="flex w-full justify-between bg-gray-800 rounded-t-md align-middle items-center">
        <h1 className="p-4 text-white">{props.label}</h1>
        <div className="flex justify-end">
          <button
            className="text-2xl bg-white rounded-md border shadow-md px-1 py-1 mt-2 text-blue-600 h-fit hover:bg-slate-200"
            onClick={() => {
              setIsChangeOpen(true);
            }}
          >
            <RiPencilFill />
          </button>
          <button
            className="text-2xl bg-white rounded-md border shadow-md px-1 py-1 m-2 text-red-600 h-fit hover:bg-slate-200"
            data-modal-toggle="defaultModal"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <RiCloseLine />
          </button>
        </div>
      </div>
      <div className="py-2">
        <div className="flex border-b-2 pb-2 px-2">
          <div className="">
            <p>
              <b className="text-1xl font-bold">Startdatum:</b>{" "}
              {props.workName.startDate}
            </p>
            <p>
              <b className="text-1xl font-bold">Antal dagar:</b>{" "}
              {props.workName.numberOfDays}
            </p>
          </div>
        </div>
        <div className="flex border-b-2 pb-2 px-2 py-2">
          <p>
            <b className="text-1xl font-bold">Jobbstatus:</b> {checkWorkName()}
          </p>
        </div>
        <div className="flex border-b-2 pb-2 px-2 py-2">
          <p>
            <b className="text-1xl font-bold">Material:</b>{" "}
            {props.workName.materialNote}
          </p>
        </div>
      </div>
      <div className="flex justify-center pb-2 px-2 py-2">
        <button
          onClick={toggleOffer}
          className="bg-slate-700 hover:bg-slate-800 py-2 px-4 rounded duration-300 text-center text-1xl text-white w-48 h-10"
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
          currentWorkStatus={props.workName.workStatus}
        />
      )}
    </div>
  );
};
export default Work;

import React, { useState } from "react";
import ApiConnector from "../services/ApiConnector";
import ChangeWorkInfo from "./ChangeWorkInfo";
import WorkModal from "./WorkModal";
import { RiCloseLine } from "react-icons/ri";
import { RiPencilFill } from "react-icons/ri";

const Work = (props) => {
  if (
    localStorage.theme === "true" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
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
      <div className="flex w-full justify-between bg-gray-300 dark:bg-gray-800 bg-opacity-90 rounded-t align-middle items-center">
        <h1 className="p-4 text-black dark:text-white font-bold">{props.label}</h1>
        <div className="flex justify-end">
          <button
            className="text-2xl bg-white rounded border shadow-md px-1 py-1 mt-2 text-blue-600 h-fit hover:bg-slate-200"
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
      <div className="pt-2 dark:text-white">
          <div className="flex border-b-2 pb-2 px-2">
            <p>
              <b className="text-1xl font-bold">Startdatum:</b>{" "}
              {props.workName.startDate}
            </p>
          </div>
          <div className="flex border-b-2 pb-2 px-2 py-2">
            <p>
              <b className="text-1xl font-bold">Antal dagar:</b>{" "}
              {props.workName.numberOfDays}
            </p>
          </div>
        <div className="flex border-b-2 pb-2 px-2 py-2">
          <p>
            <b className="text-1xl font-bold">Jobbstatus:</b> {checkWorkName()}
          </p>
        </div>
        <div
          className={
            props.workName.offer.length > 1
              ? "flex border-b-2 pb-2 px-2 py-2"
              : "flex pb-2 px-2 py-2"
          }
        >
          <p>
            <b className="text-1xl font-bold">Material:</b>{" "}
            {props.workName.materialNote}
          </p>
        </div>
      </div>
      <div
        className={
          props.workName.offer.length > 1
            ? "flex justify-center pb-2 px-2 py-2"
            : "hidden"
        }
      >
        <button
          onClick={toggleOffer}
          className="bg-blue-600 rounded text-white hover:bg-blue-500 py-2 px-4 duration-300 text-center text-1xl w-48 h-10"
        >
          {showOffer ? "Stäng" : "Visa offert"}
        </button>
        <div
          className={
            showOffer
              ? "bg-gray-500 bg-opacity-70 top-0 left-0 fixed w-screen h-screen justify-center items-center flex flex-row rounded z-20"
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

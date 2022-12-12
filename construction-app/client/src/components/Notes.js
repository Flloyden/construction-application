import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { RiPencilFill } from "react-icons/ri";
import ApiConnector from "../services/ApiConnector";
import NoteModal from "./NoteModal";

export default function Notes(props) {
  if (
    localStorage.theme === "true" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  const copy = [...props.currentCustomer.customerNotes];
  const [isOpen, setIsOpen] = useState(false);
  const [currentId, setCurrentId] = useState();
  const resultSum = copy.filter((item) => item.noteStatus === "SUMMARIZED");
  const resultReg = copy.filter((item) => item.noteStatus === "NOTSUMMARIZED");
  const selectedOnes = resultSum.map((item) => {
    return item.workNumber;
  });
  const result = resultReg.filter((col) => {
    return !selectedOnes.find((selected) => selected === col.workNumber);
  });

  console.log(copy)

  const deleteThis = async () => {
    // Deletes a client with given id and updates the id
    try {
      await ApiConnector.deleteNote(currentId);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
    setIsOpen(false);
  };

  if (props.currentCustomer.customerNotes.length < 1) {
    return <div></div>;
  }
  if (copy.length > 0) {
    return (
      <div>
        <h2 className="text-2xl pt-10 pb-2">Anteckningar</h2>
        <div className="bg-white pt-1 rounded-md dark:bg-gray-800">
          <table className="w-full text-sm text-left bg-white dark:bg-gray-800 text-gray-00 shadow-md rounded">
            <thead className="text-xs uppercase  text-gray-500  rounded border-b-2 border-gray-300">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Datum
                </th>
                <th scope="col" className="py-3 px-6">
                  Jobb
                </th>
                <th scope="col" className="py-3 px-6">
                  Tid
                </th>
                <th scope="col" className="py-3 px-6">
                  Körning
                </th>
                <th scope="col" className="py-3 px-6">
                  Antälld tid
                </th>
                <th scope="col" className="py-3 px-6">
                  Kommentar
                </th>
                <th scope="col" className="max-w-fit text-center">
                  Åtgärd
                </th>
              </tr>
            </thead>
            <tbody className="rounded hover:bg-gray-900">
              {result.map((item, i) => {
                console.log(item)
                return (
                  <tr
                  className="bg-white dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 border-b-2 border-gray-300 cursor-pointer hover:bg-opacity-90 duration-200"
                    key={i}
                  >
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium whitespace-nowrap text-white cursor-pointer"
                    >
                      {item.datePosted}
                    </th>
                    <td className="py-4 px-6">{item.workName}</td>
                    <td className="py-4 px-6">{item.timeSpend}</td>
                    <td className="py-4 px-6">{item.kmDriven}</td>
                    <td className="py-4 px-6">{item.timeEmployee}</td>
                    <td className="py-4 px-6">{item.note}</td>
                    <td className="flex justify-around py-2 items-end">
                      <div className="flex justify-end">
                        <button className="text-2xl bg-white rounded-md border shadow-md px-1 py-1 mr-2 text-blue-600 h-fit hover:bg-slate-200">
                          <RiPencilFill />
                        </button>
                        <button className="text-2xl bg-white rounded-md border shadow-md px-1 py-1 text-red-600 h-fit hover:bg-slate-200"
                        onClick={() => {
                          setCurrentId(item.id)
                          setIsOpen(true);
                        }}>
                          <RiCloseLine />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <h2 className={resultSum.length > 0 ? "text-black text-2xl pt-10" : "hidden"}>Summerade</h2>
        <div className={resultSum.length > 0 ? "w-full bg-gray-700 py-1 rounded-md" : "hidden"}>
          <table className="w-full text-sm text-left bg-white text-gray-00 rounded shadow-md">
          <thead className="text-xs uppercase  text-gray-500 rounded border-b-2 border-gray-300">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Datum
                </th>
                <th scope="col" className="py-3 px-6">
                  Jobb
                </th>
                <th scope="col" className="py-3 px-6">
                  Tid
                </th>
                <th scope="col" className="py-3 px-6">
                  Körning
                </th>
                <th scope="col" className="py-3 px-6">
                  Antälld tid
                </th>
                <th scope="col" className="py-3 px-6">
                  Kommentar
                </th>
                <th scope="col" className="max-w-fit text-center">
                  Åtgärd
                </th>
              </tr>
            </thead>
            <tbody className="text-white">
              {resultSum.map((item, i) => {
                return (
                  <tr
                    className="border-b bg-red-900 border-gray-700 cursor-pointer hover:bg-opacity-90 duration-200"
                    key={i}
                  >
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium whitespace-nowrap text-white cursor-pointer"
                    >
                      {item.datePosted}
                    </th>
                    <td className="py-4 px-6">{item.workName}</td>
                    <td className="py-4 px-6">{item.timeSpend}</td>
                    <td className="py-4 px-6">{item.kmDriven}</td>
                    <td className="py-4 px-6">{item.timeEmployee}</td>
                    <td className="py-4 px-6">{item.note}</td>
                    <td className="flex justify-around py-2 items-end">
                      <div className="flex justify-end">
                        <button className="text-2xl bg-white rounded-md border shadow-md px-1 py-1 mr-2 text-blue-600 h-fit hover:bg-slate-200">
                          <RiPencilFill />
                        </button>
                        <button className="text-2xl bg-white rounded-md border shadow-md px-1 py-1 text-red-600 h-fit hover:bg-slate-200">
                          <RiCloseLine />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="w-full flex justify-center items-center align-middle mt-14">
          <button
            className={resultReg.length > 0 && resultSum.length > 0 ? "bg-blue-500 text-white hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300": "hidden"}
            onClick={props.showOldNotes}
          >
            {props.oldNotesToggle ? "Dölj gamla anteckningar" : "Visa gamla anteckningar"}
          </button>
        </div>
        {props.oldNotesToggle && (
          <div>
            <h2 className="text-black text-2xl pt-5">Arkiv</h2>
            <div className="w-full bg-gray-700 py-1 rounded-md">
              <table className="w-full text-left">
                <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Datum
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Jobb
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Tid
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Körning
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Antälld tid
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Kommentar
                    </th>
                    <th scope="col" className="max-w-fit text-center">
                      Åtgärd
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  {resultReg.map((item, i) => {
                    return (
                      <tr
                        className="border-b bg-gray-500 border-gray-700 cursor-pointer hover:bg-opacity-90 duration-200"
                        key={i}
                      >
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium whitespace-nowrap text-white cursor-pointer"
                        >
                          {item.datePosted}
                        </th>
                        <td className="py-4 px-6">{item.workName}</td>
                        <td className="py-4 px-6">{item.timeSpend}</td>
                        <td className="py-4 px-6">{item.kmDriven}</td>
                        <td className="py-4 px-6">{item.timeEmployee}</td>
                        <td className="py-4 px-6">{item.note}</td>
                        <td className="flex justify-around py-2 items-end">
                          <div className="flex justify-end">
                            <button className="text-2xl bg-white rounded-md border shadow-md px-1 py-1 mr-2 text-blue-600 h-fit hover:bg-slate-200">
                              <RiPencilFill />
                            </button>
                            <button className="text-2xl bg-white rounded-md border shadow-md px-1 py-1 text-red-600 h-fit hover:bg-slate-200">
                              <RiCloseLine />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {isOpen && (
        <NoteModal
          setIsOpen={setIsOpen}
          deleteThis={deleteThis}
          currentId={currentId}
        />
      )}
      </div>
    );
  }
}

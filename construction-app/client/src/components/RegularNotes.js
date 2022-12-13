import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { RiPencilFill } from "react-icons/ri";
import ApiConnector from "../services/ApiConnector";
import ChangeNote from "./ChangeNote";
import NoteModal from "./NoteModal";

export default function RegularNotes(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isChangeOpen, setIsChangeOpen] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const [currentNote, setCurrentNote] = useState();
  const [currentDate, setCurrentDate] = useState('');
  const [currentName, setCurrentName] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [currentEmployee, setCurrentEmployee] = useState('');
  const [currentKm, setCurrentKm] = useState('');
  
  console.log(currentNote)
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

  console.log(props.notes)

  if (props.notes.length < 1) {
    return <div></div>;
  } else {
    return (
      <div className="mt-6">
        <h1>Anteckningar</h1>
        <table className="w-full text-sm text-left bg-white dark:bg-gray-800 text-gray-00 shadow-md rounded mt-2">
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
            {props.notes.map((item, i) => {
              return (
                <tr
                  className="bg-white dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 border-b-2 border-gray-300 duration-200"
                  key={i}
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium whitespace-nowrap"
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
                      <button className="text-2xl bg-white rounded-md border shadow-md px-1 py-1 mr-2 text-blue-600 h-fit hover:bg-slate-200" onClick={() => {
                          setCurrentId(item.id);
                          setCurrentDate(item.datePosted)
                          setCurrentTime(item.timeSpend)
                          setCurrentName(item.workName)
                          setCurrentKm(item.kmDriven)
                          setCurrentEmployee(item.timeEmployee)
                          setCurrentNote(item.note)
                          setIsChangeOpen(true);
                        }}>
                        <RiPencilFill />
                      </button>
                      <button
                        className="text-2xl bg-white rounded-md border shadow-md px-1 py-1 text-red-600 h-fit hover:bg-slate-200"
                        onClick={() => {
                          setCurrentId(item.id);
                          setIsOpen(true);
                        }}
                      >
                        <RiCloseLine />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {isOpen && (
          <NoteModal
            setIsOpen={setIsOpen}
            deleteThis={deleteThis}
            currentId={currentId}
          />
        )}
        {isChangeOpen && (
          <ChangeNote
            currentDate={currentDate}
            currentName={currentName}
            currentTime={currentTime}
            currentEmployee={currentEmployee}
            currentKm={currentKm}
            setIsChangeOpen={setIsChangeOpen}
            currentId={currentId}
            currentNote={currentNote}
          />
        )}
      </div>
    );
  }
}

import React, { useRef, useState } from "react";
import ApiConnector from "../services/ApiConnector";

export default function AddCustomerNote(
  currentCustomerName,
  currentCustomerId,
  currentCustomerAddress,
  currentCustomerPhone,
  currentCustomerProperty,
  currentCustomerSSN,
  currentCustomerWorkList,
  currentCustomerNotes
) {
  const [customer] = useState({
    id: currentCustomerId,
    name: currentCustomerName,
    address: currentCustomerAddress,
    phoneNumber: currentCustomerPhone,
    propertyDesignation: currentCustomerProperty,
    socialSecurityNumber: currentCustomerSSN,
    workList: currentCustomerWorkList,
    customerNotes: currentCustomerNotes,
  });

  const [newList, setNewList] = useState();
  const [noteStatus, setNoteStatus] = useState("");
  const [selectValue, setSelectValue] = useState(0);
  const [workId, setWorkId] = useState("");
  const [workName, setWorkName] = useState("");
  const dateRef = useRef();
  const kmRef = useRef();
  const employeeRef = useRef();
  const timeRef = useRef();
  const noteRef = useRef();

  const onChange = (event) => {
    const value = event.target.value;
    if (event.target.name === "select") {
      setSelectValue(value);
      setWorkName(value.split(','))
      console.log(selectValue)
      setWorkId(value.slice(-1))
    } else if (event.target.name === "selectStatus") {
      setNoteStatus(value)
      console.log(value)
      console.log(noteStatus)
    } else {
      console.log(value)
      console.log(workName)
    }
    setNewList({
      id: "",
      datePosted: dateRef.current.value,
      kmDriven: kmRef.current.value,
      note: noteRef.current.value,
      timeEmployee: employeeRef.current.value,
      timeSpend: timeRef.current.value,
      workName: workName[0],
      workNumber: workId,
      noteStatus: noteStatus,
    })
    console.log(newList)
  };

  console.log(customer.name)

  const saveNote = (e) => {
    /**Saves the work and navigates back to the register */
    e.preventDefault();
    // Pushes the new list into current lists
    console.log(newList)
    // Adds work to user with api call
    ApiConnector.saveNote(workId, newList)
      .then((response) => {
        console.log(response);
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full bg-gray-700 rounded-md p-4">
      <h1 className="text-2xl w-full text-white">Lägg till ny anteckning</h1>

      <div className="w-full flex gap-2">
        <div className="mt-4 w-1/4">
          <label className="mb-2 text-sm font-medium text-white">Datum: </label>
          <input
            className="rounded-lg block w-full p-2.5 bg-white border-white placeholder-gray-400 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="name"
            required
            ref={dateRef}
            onChange={onChange}
          ></input>
        </div>

        <div className="mt-4 w-1/4">
          <label className="mb-2 text-sm font-medium text-white">Jobb: </label>
          <select
            name="select"
            onChange={onChange}
            className="form-select rounded-lg block w-full p-2.5 bg-white border-white placeholder-gray-400 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
          >
            <option defaultValue>
              Välj jobb
            </option>
            {customer.name.currentCustomerWorkList.slice(0).reverse().map((item, i) => {return (<option key={item.id} value={[item.name, item.id]}>{item.name}</option>)})}
          </select>
        </div>

        <div className="mt-4 w-1/4">
          <label className="mb-2 text-sm font-medium text-white">Tid: </label>
          <input
            className="rounded-lg block w-full p-2.5 bg-white border-white placeholder-gray-400 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="phoneNumber"
            ref={timeRef}
            onChange={onChange}
          ></input>
        </div>

        <div className="mt-4 w-1/4">
          <label className="mb-2 text-sm font-medium text-white">
            Körning:{" "}
          </label>
          <input
            ref={kmRef}
            className="rounded-lg w-full p-2.5 bg-white border-white placeholder-gray-400 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="propertyDesignation"
            onChange={onChange}
          ></input>
        </div>

        <div className="mt-4 w-1/4">
          <label className="mb-2 text-sm font-medium text-white">
            Anställd tid:{" "}
          </label>
          <input
            className="rounded-lg w-full p-2.5 bg-white border-white placeholder-gray-400 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="socialSecurityNumber"
            ref={employeeRef}
            onChange={onChange}
          ></input>
        </div>
      </div>
      <div className="flex w-full gap-2">
        <div className="mt-2 w-8/12">
          <label className="mb-2 text-sm font-medium text-white">
            Kommentar:{" "}
          </label>
          <input
            className="rounded-lg w-full p-2.5 bg-white border-white placeholder-gray-400 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="socialSecurityNumber"
            ref={noteRef}
            onChange={onChange}
          ></input>
        </div>
        <div className="flex w-2/12 gap-2 mt-8 justify-end inset-x-0 bottom-4 mx-auto">
        <select
            name="selectStatus"
            onChange={onChange}
            className="form-select rounded-lg block w-full p-2.5 bg-white border-white placeholder-gray-400 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={0}>Vanlig</option>
            <option value={1}>Summering</option>
          </select>
          </div>
        <div className="flex w-2/12 gap-2 mt-8 justify-end inset-x-0 bottom-4 mx-auto">
          <button className="bg-green-500 hover:opacity-50 font-bold py-2 px-4 rounded duration-300 text-center w-full text-white" onClick={saveNote}>
            Spara
          </button>
        </div>
        </div>
    </div>
  );
};

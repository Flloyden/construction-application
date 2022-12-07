import React, { useState } from "react";
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
  
  const [currentWork, setCurrentWork] = useState("");
  const [addNoteInfo, setAddNoteInfo] = useState({
    id: "",
    datePosted: "",
    kmDriven: "",
    note: "",
    timeEmployee: "",
    timeSpend: "",
    workName: "",
    workNumber: "",
    noteStatus: 0,
  });

  const handleChange = e => {
    let value = e.target.value;
    console.log(value)
    if (e.target.name === "select") {
      value = value.split(',')
      setAddNoteInfo({
        ...addNoteInfo,
        workName: value[0],
        workNumber: value[1]
      });
    } else {
      setAddNoteInfo({
        ...addNoteInfo,
        [e.target.name]: value
      });
    }
    console.log(addNoteInfo)
  };

  const handleSubmit = e => {
    /**Saves the work and navigates back to the register */
    e.preventDefault();
    // Adds work to user with api call
    ApiConnector.saveNote(addNoteInfo.workNumber, addNoteInfo)
      .then((response) => {
        console.log(response);
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="w-full bg-gray-700 rounded-md p-4">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl w-full text-white">Lägg till ny anteckning</h1>
        <div className="w-full flex gap-2">

          <div className="mt-4 w-4/12">
            <label className="mb-2 text-sm font-medium text-white">
              Jobb:{" "}
            </label>
            <select
              type="select"
              name="select"
              value={currentWork}
              required
              onChange={(item) => {setCurrentWork(item.value); handleChange(item)}}
              className="form-select rounded-lg block w-full p-2.5 bg-white border-white placeholder-gray-400 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            >
              <option defaultValue>Välj jobb</option>
              {customer.name.currentCustomerWorkList
                .slice(0)
                .reverse()
                .map((item, i) => {
                  return (
                    <option key={item.id} value={[item.name, item.id]}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="mt-4 w-2/12">
            <label className="mb-2 text-sm font-medium text-white">Tid: </label>
            <input
              className="rounded-lg block w-full p-2.5 bg-white border-white placeholder-gray-400 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
              type="text"
              name="timeSpend"
              value={addNoteInfo.timeSpend}
              required
              onChange={handleChange}
            ></input>
          </div>

          <div className="mt-4 w-2/12">
            <label className="mb-2 text-sm font-medium text-white">
              Körning:{" "}
            </label>
            <input
              className="rounded-lg w-full p-2.5 bg-white border-white placeholder-gray-400 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
              type="text"
              name="kmDriven"
              value={addNoteInfo.kmDriven}
              required
              onChange={handleChange}
            ></input>
          </div>

          <div className="mt-4 w-2/12">
            <label className="mb-2 text-sm font-medium text-white">
              Anställd tid:{" "}
            </label>
            <input
              className="rounded-lg w-full p-2.5 bg-white border-white placeholder-gray-400 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
              type="text"
              name="timeEmployee"
              value={addNoteInfo.timeEmployee}
              required
              onChange={handleChange}
            ></input>
          </div>
        </div>
        <div className="flex w-full gap-2">
          <div className="mt-2 w-10/12">
            <label className="mb-2 text-sm font-medium text-white">
              Kommentar:{" "}
            </label>
            <input
              className="rounded-lg w-full p-2.5 bg-white border-white placeholder-gray-400 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
              type="text"
              name="note"
              value={addNoteInfo.note}
              onChange={handleChange}
            ></input>
          </div>
          <div className="flex w-2/12 gap-2 mt-8 justify-end inset-x-0 bottom-4 mx-auto">
            <button
              type="submit"
              className="bg-green-500 hover:opacity-50 font-bold py-2 px-4 rounded duration-300 text-center w-full text-white"
            >
              Spara
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

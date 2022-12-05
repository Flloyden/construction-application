import React, { useState } from "react";
import ApiConnector from "../services/ApiConnector";
import "react-datepicker/dist/react-datepicker.css";

export default function SumCustomerNote(
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

  const [sumNoteInfo, setSumNoteInfo] = useState({
    id: "",
    month: "",
    monthId: "",
    workName: "",
    workId: "", 
  });

  const months = [
    { id: 1, name: "Januari" },
    { id: 2, name: "Februari" },
    { id: 3, name: "Mars" },
    { id: 4, name: "April" },
    { id: 5, name: "Maj" },
    { id: 6, name: "Juni" },
    { id: 7, name: "Juli" },
    { id: 8, name: "Augusti" },
    { id: 9, name: "September" },
    { id: 10, name: "Oktober" },
    { id: 11, name: "November" },
    { id: 12, name: "December" },
  ];

  const [currentMonth, setCurrentMonth] = useState("");
  const [currentWork, setCurrentWork] = useState("");

  const handleChange = e => {
    let value = e.target.value;
    console.log(value)
    if (e.target.name === "work") {
      value = value.split(',')
      setSumNoteInfo({
        ...sumNoteInfo,
        workName: value[0],
        workId: value[1]
      });
    } else {
      value = value.split(',')
      setSumNoteInfo({
        ...sumNoteInfo,
        month: value[0],
        monthId: value[1]
      });
    }
    console.log(sumNoteInfo)
  };

  const handleSubmit = e => {
    /**Saves the work and navigates back to the register */
    e.preventDefault();
    // Adds work to user with api call
    ApiConnector.saveNote(sumNoteInfo.workNumber, sumNoteInfo)
      .then((response) => {
        console.log(response);
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="w-full bg-gray-700 rounded-md p-4 pb-5">
      <form onSubmit={handleSubmit}>
      <h1 className="text-2xl w-full text-white">Summera</h1>

      <div className="w-full flex gap-2">
        <div className="mt-4 w-6/12">
          <label className="mb-2 text-sm font-medium text-white">Jobb: </label>
          <select
            type="select"
            name="work"
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
        <div className="mt-4 w-6/12">
          <label className="mb-2 text-sm font-medium text-white">Månad: </label>
          <select
            value={currentMonth}
            required
            onChange={(item) => {setCurrentMonth(item.value); handleChange(item)}}
            className="form-select rounded-lg block w-full p-2.5 bg-white border-white placeholder-gray-400 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
          >
            <option defaultValue>Välj månad</option>
            {months.map((item, i) => {
              return (
                <option key={item.id} value={[item.name, item.id]}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="flex w-full gap-2">
        <div className="flex w-full gap-2 mt-8 justify-end inset-x-0 bottom-4 mx-auto">
          <button
            type="submit"
            className="bg-green-500 hover:opacity-50 font-bold py-2 px-4 rounded duration-300 text-center w-full text-white"
          >
            Summera
          </button>
        </div>
      </div>
      </form>
    </div>
  );
}

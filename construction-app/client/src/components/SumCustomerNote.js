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
  if (
    localStorage.theme === "true" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
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

  const [showWrongInput, setShowWrongInput] = useState(false);
  const [sumNoteInfo, setSumNoteInfo] = useState({
    id: "",
    datePostedSum: "",
    month: "",
    timeSpendSum: "",
    kmDrivenSum: "",
    timeEmployeeSum: "",
    workName: "",
    workNumber: "",
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
  const [Id, setId] = useState("");

  const copy = [...customer.name.currentCustomerWorkList];
  const filteredList = copy.filter((item) => item.workStatus !== "COMPLETED" && item.workStatus !== "NOTSTARTED");

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "work") {
      value = value.split(",");
      setId(value[1])
    } else {
      value = value.split(",");
      setSumNoteInfo({
        ...sumNoteInfo,
        month: value[1],
      });
    }
  };

  const handleSubmit = (e) => {
    /**Saves the work and navigates back to the register */
    e.preventDefault();
    // Adds work to user with api call
    ApiConnector.sumNote(Id, sumNoteInfo)
      .then((response) => {
        ApiConnector.findWorkAndUpdateToCompleted();
        console.log(response);
        if(response.data.datePostedSum === null) {
          setShowWrongInput((showWrongInput) => !showWrongInput);
        } else {
          window.location.reload(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
    <div className="w-full bg-white dark:bg-gray-800 rounded p-4 shadow">
      <form onSubmit={handleSubmit}>
        <div className="w-10/12">
          <h1 className="font-bold dark:text-white">Summera</h1>
        </div>
        <div className="w-full flex gap-2">
          <div className="mt-4 w-6/12">
            <label className="mb-2 text-sm font-medium text-white">
              Jobb:{" "}
            </label>
            <select
              type="select"
              name="work"
              value={currentWork}
              required
              onChange={(item) => {
                setCurrentWork(item.value);
                handleChange(item);
              }}
              className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            >
              <option defaultValue>Välj jobb</option>
              {filteredList
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
            <label className="mb-2 text-sm font-medium text-white">
              Månad:{" "}
            </label>
            <select
              value={currentMonth}
              required
              onChange={(item) => {
                setCurrentMonth(item.value);
                handleChange(item);
              }}
              className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
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
        <div className="flex w-full gap-2 mt-8 justify-end inset-x-0 bottom-4 mx-auto">
            <button
              type="submit"
              className="bg-blue-600 rounded text-white hover:bg-blue-500 font-bold py-2 px-4 w-full duration-300"
            >
              Spara
            </button>
        </div>
      </form>
    </div>
    {showWrongInput && (
      <div className="bg-red-600 px-4 w-full rounded mt-1 flex items-center align-middle justify-center text-white py-2">
        <p className="">Kolla så att rätt månad är angiven</p>
      </div>
    )}
  </div>
  );
}

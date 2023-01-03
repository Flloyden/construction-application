import React, { useState } from "react";
import ApiConnector from "../../services/ApiConnector";

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

  const [showWrongInput, setShowWrongInput] = useState(false);
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

  const copy = [...customer.name.currentCustomerWorkList];
  const filteredList = copy.filter(
    (item) =>
      item.workStatus !== "COMPLETED" && item.workStatus !== "NOTSTARTED"
  );

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "select") {
      value = value.split(",");
      setAddNoteInfo({
        ...addNoteInfo,
        workName: value[0],
        workNumber: value[1],
      });
    } else {
      setAddNoteInfo({
        ...addNoteInfo,
        [e.target.name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    /**Saves the work and navigates back to the register */
    e.preventDefault();
    // Adds work to user with api call
    ApiConnector.saveNote(addNoteInfo.workNumber, addNoteInfo)
      .then((response) => {
        console.log(response);
        if (response.data.length < 1) {
          setShowWrongInput((showWrongInput) => !showWrongInput);
          setTimeout(() => {
            setShowWrongInput(false);
          }, 3000);
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
      <div className="w-full bg-white dark:bg-gray-800 dark:text-white rounded p-4 shadow">
        <form onSubmit={handleSubmit}>
          <div className="w-10/12">
            <h1 className="font-bold">Ny anteckning</h1>
          </div>
          <div className="w-full flex gap-2">
            <div className="mt-4 w-4/12">
              <label className="mb-2 text-sm font-medium text-black dark:text-white">
                Jobb:{" "}
              </label>
              <select
                type="select"
                name="select"
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

            <div className="mt-4 w-3/12">
              <label className="mb-2 text-sm font-medium">Tid (h): </label>
              <input
                className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                type="number"
                min={0}
                name="timeSpend"
                value={addNoteInfo.timeSpend}
                required
                onChange={handleChange}
              ></input>
            </div>

            <div className="mt-4 w-3/12">
              <label className="mb-2 text-sm font-medium">Körning (km): </label>
              <input
                className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                type="number"
                min={0}
                name="kmDriven"
                value={addNoteInfo.kmDriven}
                required
                onChange={handleChange}
              ></input>
            </div>

            <div className="mt-4 w-3/12">
              <label className="mb-2 text-sm font-medium">Anställd tid (h): </label>
              <input
                className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                type="number"
                min={0}
                name="timeEmployee"
                value={addNoteInfo.timeEmployee}
                required
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="flex w-full gap-2">
            <div className="mt-2 w-10/12">
              <label className="mb-2 text-sm font-medium">Kommentar: </label>
              <input
                className="rounded block w-full p-1.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                type="text"
                name="note"
                value={addNoteInfo.note}
                onChange={handleChange}
              ></input>
            </div>
            <div className="flex w-2/12 gap-2 mt-8 justify-end inset-x-0 bottom-4 mx-auto">
              <button
                type="submit"
                className="bg-blue-600 rounded text-white hover:bg-blue-500 font-bold py-2 px-4 w-full duration-300"
              >
                Spara
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className={showWrongInput ? "bg-red-600 px-4 w-full rounded mt-1 flex items-center align-middle justify-center text-white py-2 duration-200 visible" : "invisible duration-200"}>
          <p className={showWrongInput ? "visible" : "invisible"}>Går ej att lägga till fler anteckningar än det finns jobbdagar!</p>
        </div>
    </div>
  );
}

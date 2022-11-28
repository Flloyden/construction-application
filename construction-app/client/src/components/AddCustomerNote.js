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

  const [selectValue, setSelectValue] = useState("");
  const [lastItem, setLastItem] = useState("");
  const dateRef = useRef();
  const kmRef = useRef();
  const employeeRef = useRef();
  const timeRef = useRef();

  const onChange = (event) => {
    const value = event.target.value;
    if (event.target.name === "select") {
      setSelectValue(value);
      setLastItem(value.slice(-1))
    } else {
      console.log(value)
    }
    setNewList({
      id: "",
      date_posted: dateRef.current.value,
      km_driven: kmRef.current.value,
      note: "",
      time_employee: employeeRef.current.value,
      time_spend: timeRef.current.value,
      customer_id: "",
      work_id: lastItem,
    })
    console.log(newList)
  };

  const saveNote = (e) => {
    /**Saves the work and navigates back to the register */
    e.preventDefault();
    // Pushes the new list into current lists
    console.log(customer.name.currentCustomerNotes)
    customer.name.currentCustomerNotes.push(newList);
    console.log(customer.name.currentCustomerNotes)
    // Adds work to user with api call
    ApiConnector.saveNote(customer)
      .then((response) => {
        console.log(response);
        //window.location.reload(false);
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
            ref={kmRef}
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

        <div className="flex w-min gap-2 mt-10 justify-end inset-x-0 bottom-4 mx-auto">
          <button className="bg-green-500 hover:opacity-50 font-bold py-2 px-4 rounded duration-300 text-center w-full text-white" onClick={saveNote}>
            Spara
          </button>
        </div>
      </div>
    </div>
  );
};

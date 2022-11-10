import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiConnector from "../services/ApiConnector";

const AddCustomer = () => {
  // Declare variables
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    id: "",
    name: "",
    address: "",
    phoneNumber: "",
    propertyDesignation: "",
    socialSecurityNumber: "",
    workList: [],
    customerNotes: [],
  });

  const handleChange = (e) => {
    /**Gets the current input every keystroke
     * and sets values to the custumer
     */
    const value = e.target.value;
    setCustomer({
      ...customer,
      [e.target.name]: value,
      [e.target.address]: value,
      [e.target.phoneNumber]: value,
      [e.target.propertyDesignation]: value,
      [e.target.socialSecurityNumber]: value,
    });
  };

  const saveCustomer = (e) => {
    /**Saves the "kund" and navigates back to the customer register */
    e.preventDefault();
    // Check if all input fields are ok
    if (
      customer.name.length > 1 &&
      customer.address.length > 1 &&
      customer.phoneNumber.length > 1 &&
      customer.propertyDesignation.length > 0 &&
      customer.socialSecurityNumber.length > 1
    ) {
      // Sends the data to the backend
      ApiConnector.saveCustomer(customer)
        .then((response) => {
          console.log(response);
          navigate("/kunder");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // Alerts the user if not all fields are filled
      alert("Fyll i alla fält");
    }
  };

  return (
    <div className="p-7 text 2x1 font-semibold flex-1 h-screen">
      <h1 className="text-4xl">Skapa en ny kund</h1>
      <div className="w-full">
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Namn:{" "}
          </label>
          <input
            className="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="name"
            required
            value={customer.name}
            onChange={(e) => handleChange(e)}
          ></input>
        </div>

        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Adress:{" "}
          </label>
          <input
            className="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="address"
            value={customer.address}
            onChange={(e) => handleChange(e)}
          ></input>
        </div>

        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Telefonnummer:{" "}
          </label>
          <input
            className="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="phoneNumber"
            value={customer.phoneNumber}
            onChange={(e) => handleChange(e)}
          ></input>
        </div>

        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            fastighetsbeteckning:{" "}
          </label>
          <input
            className="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="propertyDesignation"
            value={customer.propertyDesignation}
            onChange={(e) => handleChange(e)}
          ></input>
        </div>

        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Personnummer:{" "}
          </label>
          <input
            className="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="socialSecurityNumber"
            value={customer.socialSecurityNumber}
            onChange={(e) => handleChange(e)}
          ></input>
        </div>

        <div className="flex w-full gap-2 mt-10 justify-end inset-x-0 bottom-4 mx-auto text-white">
          <button
            className="bg-red-500 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center w-2/4"
            onClick={() => navigate("/kunder")}
          >
            Avbryt
          </button>
          <button
            className="bg-green-500 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center w-2/4"
            onClick={saveCustomer}
          >
            Spara
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;

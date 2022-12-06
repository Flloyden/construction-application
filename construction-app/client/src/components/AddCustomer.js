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
    mail: "",
    phoneNumber: "",
    city: "",
    zip: "",
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
        [e.target.name]: value
      });
    console.log(customer)
  };

  const handleSubmit = (e) => {
    /**Saves the "kund" and navigates back to the customer register */
    e.preventDefault();
    // Sends the data to the backend
    ApiConnector.saveCustomer(customer)
      .then((response) => {
        console.log(response);
        navigate("/kunder");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="p-7 text 2x1 font-semibold flex-1 h-screen">
      <form onSubmit={handleSubmit}>
        <h1 className="text-4xl">Skapa en ny kund</h1>
        <div className=" w-fit mt-10 border-2 shadow-lg p-4 rounded-md">
          <p>
            Namn <span className="text-red-700 font-black">*</span>
          </p>
          <div className="flex w-full gap-2 text-white">
            <div className="mt-4 w-full">
              <label className="block mt-1 text-sm font-medium text-gray-700">
                För och efternamn: <span className="text-red-700 font-black">*</span>{" "}
              </label>
              <input
                className="rounded-md block w-full p-2.5 border-2 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
                type="text"
                name="name"
                required
                value={customer.name}
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
          </div>
          <div className="flex w-full gap-2 text-white">
          <div className="mt-4 w-1/2">
              <label className="block mt-1 whitespace-nowrap text-sm font-medium text-gray-700">
              Pers.nr: (ÅÅÅÅMMDD-XXXX) <span className="text-red-700 font-black">*</span>{" "}
              </label>
              <input
                className="rounded-md block w-full p-2.5 border-2 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
                type="text"
                name="socialSecurityNumber"
                required
                value={customer.socialSecurityNumber}
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
            <div className="mt-4 w-1/2">
              <label className="block mt-1 text-sm font-medium text-gray-700">
                Telefonnummer: {" "}
              </label>
              <input
                className="rounded-md block w-full p-2.5 border-2 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
                type="text"
                name="phoneNumber"
                required
                value={customer.phoneNumber}
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
          </div>
          <div className="mt-4 w-full">
            <label className="block mt-1 text-sm font-medium text-gray-700">
              E-post:{" "}
            </label>
            <input
              className="rounded-md block w-full p-2.5 border-2 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
              type="text"
              name="mail"
              required
              value={customer.mail}
              onChange={(e) => handleChange(e)}
            ></input>
          </div>

          <p className="mt-10">
            Adress <span className="text-red-700 font-black">*</span>
          </p>
          <div className="mt-4 w-full">
            <label className="block mt-1 text-sm font-medium text-gray-700">
              Gatuadress: <span className="text-red-700 font-black">*</span>{" "}
            </label>
            <input
              className="rounded-md block w-full p-2.5 border-2 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
              type="text"
              name="address"
              required
              value={customer.address}
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <div className="flex w-full gap-2 justify-end inset-x-0 bottom-4 mx-auto text-white">
            <div className="mt-4 w-1/2"> 
            <label className="block mt-1 text-sm font-medium text-gray-700">
                Stad: <span className="text-red-700 font-black">*</span>{" "}
              </label>
              <input
                className="rounded-md block w-full p-2.5 border-2 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
                type="text"
                name="city"
                required
                value={customer.city}
                onChange={(e) => handleChange(e)}
              ></input>
             
            </div>
            <div className="mt-4 w-1/2">
              <label className="block mt-1 text-sm font-medium text-gray-700">
                Postnummer: <span className="text-red-700 font-black">*</span>{" "}
              </label>
              <input
                className="rounded-md block w-full p-2.5 border-2 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
                type="text"
                name="zip"
                required
                value={customer.zip}
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
          </div>

          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              fastighetsbeteckning: <span className="text-red-700 font-black">*</span>{" "}
            </label>
            <input
              className="rounded-md block w-full p-2.5 border-2 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
              type="text"
              name="propertyDesignation"
              required
              value={customer.propertyDesignation}
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
              type="submit"
              className="bg-green-500 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center w-2/4"
            >
              Spara
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;

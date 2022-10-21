import { useState } from "react";
import ApiConnector from "../services/ApiConnector";

const ChangeCustomerInfo = ({
  setIsChangeOpen,
  currentCustomerName,
  currentCustomerId,
  currentCustomerAddress,
  currentCustomerPhone,
  currentCustomerProperty,
  currentCustomerSSN,
}) => {
  const [customer, setCustomer] = useState({
    id: currentCustomerId,
    name: currentCustomerName,
    address: currentCustomerAddress,
    phoneNumber: currentCustomerPhone,
    propertyDesignation: currentCustomerProperty,
    socialSecurityNumber: currentCustomerSSN,
    workList: [],
    customerNotes: [],
  });

  const handleChange = (e) => {
    /**Gets the current input every keystroke
     * and sets the values to customer
     */
    const value = e.target.value;
    setCustomer({
      ...customer,
      [e.target.name]: value,
      [e.target.address]: value,
      [e.target.phoneNumber]: value,
      [e.target.propertyDesignation]: value,
    });
  };

  const saveChanges = (e) => {
    /**Saves the "kund" and navigates back to the register */
    e.preventDefault();
    // Check if all input fields are ok
    if (
      customer.name.length > 1 &&
      customer.address.length > 1 &&
      customer.phoneNumber.length > 1 &&
      customer.propertyDesignation.length > 0 &&
      customer.socialSecurityNumber.length > 1
    ) {
      // Makes the change with the help of api call
      ApiConnector.saveCustomer(customer)
        .then((response) => {
          console.log(response);
          window.location.reload(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Fyll i alla fält");
    }
  };

  return (
    <>
      <div
        className="w-screen h-screen bg-slate-700 bg-opacity-70 fixed top-0 left-0"
        onClick={() => setIsChangeOpen(false)}
      />
      <div className="bg-white fixed inset-0 flex items-center justify-center w-2/4 h-max m-auto rounded-lg p-4">
        <div className="w-full">
          <h1 className="text-4xl">Ändra kundinformation</h1>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700">Namn: </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="name"
              required
              value={customer.name}
              placeholder={currentCustomerName}
              onChange={(e) => handleChange(e)}
            ></input>
          </div>

          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700">Adress: </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="address"
              value={customer.address}
              placeholder={currentCustomerAddress}
              onChange={(e) => handleChange(e)}
            ></input>
          </div>

          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700">Telefonnummer: </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="phoneNumber"
              value={customer.phoneNumber}
              placeholder={currentCustomerPhone}
              onChange={(e) => handleChange(e)}
            ></input>
          </div>

          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700">fastighetsbeteckning: </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="propertyDesignation"
              value={customer.propertyDesignation}
              placeholder={currentCustomerProperty}
              onChange={(e) => handleChange(e)}
            ></input>
          </div>

          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700">Personnummer: </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="socialSecurityNumber"
              value={customer.socialSecurityNumber}
              placeholder={currentCustomerId}
              onChange={(e) => handleChange(e)}
            ></input>
          </div>

          <div className="flex w-full gap-2 mt-10 justify-end inset-x-0 bottom-4 mx-auto text-white">
          <button className="bg-red-500 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center w-2/4"  onClick={() => setIsChangeOpen(false)}>
                Avbryt
              </button>
              <button
                className="bg-green-500 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center w-2/4"
                onClick={saveChanges}
              >
                Spara
              </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeCustomerInfo;

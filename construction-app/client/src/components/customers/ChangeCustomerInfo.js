import { useState } from "react";
import ApiConnector from "../../services/ApiConnector";
import { RiCloseLine } from "react-icons/ri";

const ChangeCustomerInfo = ({
  setIsChangeOpen,
  currentCustomerName,
  currentCustomerId,
  currentCustomerAddress,
  currentCustomerPhone,
  currentCustomerProperty,
  currentCustomerSSN,
  currentCustomerWorkList,
  currentCustomerNotes,
  currentCustomerMail,
  currentCustomerCity,
  currentCustomerZip,
  currentCreationDate
}) => {
  const [customer, setCustomer] = useState({
    id: currentCustomerId,
    name: currentCustomerName,
    address: currentCustomerAddress,
    phoneNumber: currentCustomerPhone,
    mail: currentCustomerMail,
    city: currentCustomerCity,
    zip: currentCustomerZip,
    propertyDesignation: currentCustomerProperty,
    socialSecurityNumber: currentCustomerSSN,
    workList: currentCustomerWorkList,
    customerNotes: currentCustomerNotes,
    creationDate: currentCreationDate
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
      workList: currentCustomerWorkList,
      [e.target.propertyDesignation]: value,
    });
  };

  const handleSubmit = (e) => {
    /**Saves the customer and refresh the page */
    e.preventDefault();
    // Makes the change with the help of api call
    ApiConnector.saveCustomer(customer)
      .then((response) => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="w-screen h-screen bg-gray-500 bg-opacity-70 fixed top-0 left-0 z-10" />
      <div className="bg-gray-500 bg-opacity-70 top-0 left-0 fixed w-screen h-screen justify-center items-center flex flex-row rounded z-20">
        <form onSubmit={handleSubmit} className="bg-white rounded">
          <div className="flex border-b-2 px-6 py-3 items-center justify-center">
            <div className="w-10/12">
              <h1 className="font-bold">Ändra kundinformation</h1>
            </div>
            <div className="w-2/12 text-right flex justify-end">
              <button
                className="text-3xl opacity-70 hover:opacity-100 duration-300"
                onClick={() => setIsChangeOpen(false)}
              >
                <RiCloseLine />
              </button>
            </div>
          </div>
          <div className="w-fit shadow-lg rounded-md p-6">
            <div className="mt-4">
              <label className="block mt-1 text-sm font-medium text-gray-700">
                För och efternamn:{" "}
                <span className="text-red-700 font-black">*</span>{" "}
              </label>
              <input
                className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                type="text"
                name="name"
                required
                value={customer.name}
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
            <div className="flex w-full gap-2 text-white">
              <div className="mt-4">
                <label className="block mt-1 whitespace-nowrap text-sm font-medium text-gray-700">
                  Pers.nr: (ÅÅÅÅMMDD-XXXX){" "}
                  <span className="text-red-700 font-black">*</span>{" "}
                </label>
                <input
                  className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  type="text"
                  name="socialSecurityNumber"
                  required
                  maxLength={13}
                  minLength={13}
                  value={customer.socialSecurityNumber}
                  onChange={(e) => handleChange(e)}
                ></input>
              </div>
              <div className="mt-4">
                <label className="block mt-1 text-sm font-medium text-gray-700">
                  Telefonnummer:{" "}
                </label>
                <input
                  className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  type="text"
                  name="phoneNumber"
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
                className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                type="text"
                name="mail"
                value={customer.mail}
                onChange={(e) => handleChange(e)}
              ></input>
            </div>

            <div className="mt-4">
              <label className="block mt-1 text-sm font-medium text-gray-700">
                Gatuadress: <span className="text-red-700 font-black">*</span>{" "}
              </label>
              <input
                className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                type="text"
                name="address"
                required
                value={customer.address}
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
            <div className="flex w-full gap-2 justify-end inset-x-0 bottom-4 mx-auto text-white">
              <div className="mt-4 w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Stad: <span className="text-red-700 font-black">*</span>{" "}
                </label>
                <input
                  className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  type="text"
                  required
                  name="city"
                  value={customer.city}
                  onChange={(e) => handleChange(e)}
                ></input>
              </div>
              <div className="mt-4 w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Postnummer: <span className="text-red-700 font-black">*</span>{" "}
                </label>
                <input
                  className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  type="text"
                  required
                  name="zip"
                  value={customer.zip}
                  onChange={(e) => handleChange(e)}
                ></input>
              </div>
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                fastighetsbeteckning:{" "}
                <span className="text-red-700 font-black">*</span>{" "}
              </label>
              <input
                className="rounded block w-full p-2.5 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                type="text"
                required
                name="propertyDesignation"
                value={customer.propertyDesignation}
                onChange={(e) => handleChange(e)}
              ></input>
            </div>

            <div className="flex w-full gap-2 mt-10 justify-end inset-x-0 bottom-4 mx-auto text-white">
              <button
                className="bg-gray-500 hover:bg-gray-600 py-2 px-4 rounded duration-300 text-center w-2/4"
                onClick={() => setIsChangeOpen(false)}
              >
                Avbryt
              </button>
              <button
                type="submit"
                className="bg-blue-500 rounded text-white hover:bg-blue-600 py-2 px-4 w-2/4 duration-300"
              >
                Spara
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangeCustomerInfo;

import React, { useEffect, useState } from "react";
import ApiConnector from "../../services/ApiConnector";
import AddWaranty from "./AddWarranty";
import ChangeWarrantyInfo from "./ChangeWarrantyInfo";
import WarrantyModal from "../modals/WarrantyModal";

const Accounting = () => {
  if (
    localStorage.theme === "true" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  // Declaring variables
  const [warranties, setWarranties] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [currentWarrantyId, setCurrentWarrantyId] = useState("");
  const [currentWarrantyImage, setCurrentWarrantyImage] = useState("");
  const [currentWarrantyName, setCurrentWarrantyName] = useState("");
  const [currentWarrantyReg, setCurrentWarrantyReg] = useState("");
  const [currentWarrantyDate, setCurrentWarrantyDate] = useState("");
  const [currentWarrantyReceipt, setCurrentWarrantyReceipt] = useState("");
  const [name, setName] = useState("");
  const [foundWarrenties, setFoundWarrenties] = useState(warranties);
  const [newWarrantyModalOpen, setNewWarrantyModalOpen] = useState(false);
  const [isChangeWarrantyOpen, setIsChangeWarrantyOpen] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [currentIndex, setCurrentIndex] = useState();

  useEffect(() => {
    // Gets all the warrenties on page load and runs only once
    const fetchData = async () => {
      setLoading(true);
      // Tries to get data from api
      try {
        const response = await ApiConnector.getWarranties();
        let test = response.data.filter((item) => item.status === 0);
        let sorted = test.sort(
          (a, b) =>
            Date.parse(
              new Date(a.warranty_date.split("/").reverse().join("-"))
            ) -
            Date.parse(new Date(b.warranty_date.split("/").reverse().join("-")))
        );
        setWarranties(sorted);
        // Logs error if api cal not successful
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const deleteWarranty = async () => {
    // Deletes a warranty with given id and updates the id
    setLoading(true);
    // Tries to delete object with given id from database if exists
    try {
      await ApiConnector.deleteWarranty(currentWarrantyId);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
    setIsOpen(false);
    setLoading(false);
  };

  const filter = (e) => {
    // Function to sort warranties by search input
    const keyword = e.target.value;
    // If input is not empty
    if (keyword !== "") {
      const results = warranties.filter((warranty) => {
        // Use the toLowerCase() method to make it case-insensitive
        return warranty.name.toLowerCase().startsWith(keyword.toLowerCase());
      });
      // Sets found warrienties to result
      setFoundWarrenties(results);
    } else {
      // If the text field is empty, show all users
      setFoundWarrenties(warranties);
    }
    setName(keyword);
  };

  return (
    <div className="p-7 text 2x1 font-semibold flex-1 h-full bg-blue-50 dark:bg-white">
      <div className="overflow-visible relative">
        <div className="flex pb-4 justify-between gap-4 rounded">
          <input
            className="rounded block w-full p-2.5 bg-white dark:bg-gray-800 dark:text-white placeholder-gray-500 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            placeholder="Sök garanti efter namn.."
            title="Type in a name"
            type="search"
            value={name}
            onChange={filter}
          ></input>
          <button
            className="bg-blue-600 rounded text-white hover:bg-blue-500 font-bold py-2 px-4 duration-300 text-center w-48"
            onClick={() => setNewWarrantyModalOpen(true)}
          >
            <span className="text-center">
              <p>Ny garanti</p>
            </span>
          </button>
        </div>
        <table className="w-full text-sm text-left bg-white dark:bg-gray-800 text-gray-00 dark:text-white shadow rounded">
          <thead className="text-xs uppercase  text-gray-500 shadow rounded border-b-2 border-gray-300">
            <tr>
              <th scope="col" className="py-3 px-6">
                Id
              </th>
              <th scope="col" className="py-3 px-6 w-fit">
                Namn
              </th>
              <th scope="col" className="py-3 px-6 w-fit">
                Registreringsnummer
              </th>
              <th scope="col" className="py-3 px-6 w-fit">
                Diarienummer
              </th>
              <th scope="col" className="py-3 px-6">
                Utgångsdatum
              </th>
              <th scope="col" className="py-3 px-6 text-center">
                Kvitto
              </th>
              <th scope="col" className="py-3 px-6 float-right">
                Åtgärd
              </th>
            </tr>
            <tr></tr>
          </thead>
          {!loading && (
            <tbody className="shadow rounded hover:bg-gray-900 text-black dark:text-white">
              {foundWarrenties && foundWarrenties.length > 0
                ? foundWarrenties.map((warranty, index) => (
                    <tr
                      key={index}
                      className="bg-white dark:bg-gray-800 border-b-2 border-gray-300 hover:bg-opacity-90 duration-200 dark:hover:bg-gray-700"
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium whitespace-nowrap"
                      >
                        {warranty.id}
                      </th>
                      <td className="py-4 px-6 whitespace-nowrap">
                        {warranty.name}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        {warranty.registration_number}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        {warranty.registration_number}
                      </td>
                      <td className="py-4 px-6 w-full">
                        {warranty.warranty_date}
                      </td>
                      <td className="px-6 w-full">
                        <div
                          className={
                            warranty.receipt.length > 1
                              ? "flex justify-end"
                              : "hidden"
                          }
                          onClick={() => {
                            setCurrentWarrantyImage(warranty.receipt);
                            setShowReceipt(!showReceipt);
                          }}
                        >
                          <p className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded h-fit font-normal cursor-pointer whitespace-nowrap">
                            Visa kvitto
                          </p>
                          <div
                            className={
                              showReceipt
                                ? "bg-gray-500 bg-opacity-70 top-0 left-0 fixed w-screen h-screen justify-center items-center flex flex-row rounded z-20"
                                : "content-parent"
                            }
                            onClick={() => {
                              setShowReceipt(!showReceipt);
                            }}
                          >
                            {showReceipt && (
                              <img
                                className="w-full mx-auto"
                                src={currentWarrantyImage}
                                alt="receipt"
                                style={{ width: "50%" }}
                              />
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="flex justify-around items-stretch py-4">
                        <button
                          onClick={() => {
                            setCurrentIndex(index);
                            setShowOptions(!showOptions);
                          }}
                          className="items-center text-sm font-medium text-center text-gray-900 rounded-lg duration-200 dark:hover:bg-gray-700 dark:text-white dark:bg-gray-800"
                          type="button"
                        >
                          <svg
                            className="w-6 h-6"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                          </svg>
                        </button>
                        <div
                          className={
                            currentIndex === index && showOptions
                              ? "absolute z-10 w-min whitespace-nowrap mt-6 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                              : "hidden"
                          }
                        >
                          <ul
                            className="border rounded text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownMenuIconButton"
                          >
                            <li className="hover:cursor-pointer">
                              <p
                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => {
                                  setCurrentWarrantyId(warranty.id);
                                  setCurrentWarrantyName(warranty.name);
                                  setCurrentWarrantyReg(
                                    warranty.registration_number
                                  );
                                  setCurrentWarrantyDate(
                                    warranty.warranty_date
                                  );
                                  setCurrentWarrantyReceipt(warranty.receipt);
                                  setIsChangeWarrantyOpen(true);
                                }}
                              >
                                Ändra
                              </p>
                            </li>
                            <li className="hover:cursor-pointer border-t">
                              <p
                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => {
                                  setIsOpen(true);
                                  setCurrentWarrantyId(warranty.id);
                                  setCurrentWarrantyName(warranty.name);
                                  setCurrentIndex(index);
                                  setShowOptions(!showOptions);
                                }}
                              >
                                Ta bort
                              </p>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))
                : warranties.map((warranties, index) => (
                    <tr
                      key={index}
                      className="bg-white dark:bg-gray-800 border-b-2 border-gray-300 hover:bg-opacity-90 duration-200 dark:hover:bg-gray-700"
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium whitespace-nowrap"
                      >
                        {warranties.id}
                      </th>
                      <td className="py-4 px-6 whitespace-nowrap">
                        {warranties.name}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        {warranties.registration_number}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        {warranties.registration_number}
                      </td>
                      <td className="py-4 px-6 w-full">
                        {warranties.warranty_date}
                      </td>
                      <td className="px-6 w-full">
                        <div
                          className={
                            warranties.receipt.length > 1
                              ? "flex justify-end"
                              : "hidden"
                          }
                          onClick={() => {
                            setCurrentWarrantyImage(warranties.receipt);
                            setShowReceipt(!showReceipt);
                          }}
                        >
                          <p className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded h-fit font-normal cursor-pointer whitespace-nowrap">
                            Visa kvitto
                          </p>
                          <div
                            className={
                              showReceipt
                                ? "bg-gray-500 bg-opacity-70 top-0 left-0 fixed w-screen h-screen justify-center items-center flex flex-row rounded z-20"
                                : "content-parent"
                            }
                            onClick={() => {
                              setShowReceipt(!showReceipt);
                            }}
                          >
                            {showReceipt && (
                              <img
                                className="w-full mx-auto"
                                src={currentWarrantyImage}
                                alt="receipt"
                                style={{ width: "50%" }}
                              />
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="flex justify-around items-stretch py-4">
                        <button
                          onClick={() => {
                            setCurrentIndex(index);
                            setShowOptions(!showOptions);
                          }}
                          className="items-center text-sm font-medium text-center text-gray-900 rounded-lg duration-200 dark:hover:bg-gray-700 dark:text-white dark:bg-gray-800"
                          type="button"
                        >
                          <svg
                            className="w-6 h-6"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                          </svg>
                        </button>
                        <div
                          className={
                            currentIndex === index && showOptions
                              ? "absolute z-10 w-min whitespace-nowrap mt-6 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                              : "hidden"
                          }
                        >
                          <ul
                            className="border rounded text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownMenuIconButton"
                          >
                            <li className="hover:cursor-pointer">
                              <p
                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => {
                                  setCurrentWarrantyId(warranties.id);
                                  setCurrentWarrantyName(warranties.name);
                                  setCurrentWarrantyReg(
                                    warranties.registration_number
                                  );
                                  setCurrentWarrantyDate(
                                    warranties.warranty_date
                                  );
                                  setCurrentWarrantyReceipt(warranties.receipt);
                                  setIsChangeWarrantyOpen(true);
                                }}
                              >
                                Ändra
                              </p>
                            </li>
                            <li className="hover:cursor-pointer border-t">
                              <p
                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => {
                                  setIsOpen(true);
                                  setCurrentWarrantyId(warranties.id);
                                  setCurrentWarrantyName(warranties.name);
                                  setCurrentIndex(index);
                                  setShowOptions(!showOptions);
                                }}
                              >
                                Ta bort
                              </p>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          )}
        </table>
      </div>
      {isOpen && (
        <WarrantyModal
          setIsOpen={setIsOpen}
          deleteWarranty={deleteWarranty}
          currentWarrantyName={currentWarrantyName}
          currentWarrantyId={currentWarrantyId}
        />
      )}
      {newWarrantyModalOpen && (
        <AddWaranty setIsModalOpen={setNewWarrantyModalOpen} />
      )}
      {isChangeWarrantyOpen && (
        <ChangeWarrantyInfo
          setIsChangeWarrantyOpen={setIsChangeWarrantyOpen}
          currentWarrantyId={currentWarrantyId}
          currentWarrantyName={currentWarrantyName}
          currentWarrantyReg={currentWarrantyReg}
          currentWarrantyDate={currentWarrantyDate}
          currentWarrantyReceipt={currentWarrantyReceipt}
        />
      )}
    </div>
  );
};

export default Accounting;

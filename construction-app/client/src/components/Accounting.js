import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiConnector from "../services/ApiConnector";
import AddWaranty from "./AddWarranty";
import WarrantyModal from "./WarrantyModal";
import { FaTrash } from "react-icons/fa";

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
  const navigate = useNavigate();
  const [warranties, setWarranties] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [currentWarrantyId, setCurrentWarrantyId] = useState("");
  const [currentWarrantyName, setCurrentWarrantyName] = useState("");
  const [name, setName] = useState("");
  const [foundWarrenties, setFoundWarrenties] = useState(warranties);
  const [newWarrantyModalOpen, setNewWarrantyModalOpen] = useState(false);

  useEffect(() => {
    // Gets all the warrenties on page load and runs only once
    const fetchData = async () => {
      setLoading(true);
      // Tries to get data from api
      try {
        const response = await ApiConnector.getWarranties();
        setWarranties(response.data);
        // Logs error if api cal not successful
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const passId = (e) => {
    // Passes the right id to the warranty url
    navigate(`/garantier/${e}`, { state: { accountingId: e } });
  };

  const deleteWarranty = async () => {
    // Deletes a warranty with given id and updates the id
    setLoading(true);
    // Tries to delete object with given id from database if exists
    try {
      await ApiConnector.deleteWarranty(currentWarrantyId);
      const newList = await ApiConnector.getWarranties();
      setWarranties(newList.data);
      // Logs error of not successful
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
      <div className="overflow-x-auto relative">
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
        <table className="w-full text-sm text-left bg-white dark:bg-gray-800 text-gray-00 dark:text-white shadow-xl rounded">
        <thead className="text-xs uppercase  text-gray-500 shadow-md rounded border-b-2 border-gray-300">
            <tr>
              <th scope="col" className="py-3 px-6">
                Id
              </th>
              <th scope="col" className="py-3 px-6 w-fit">
                Namn
              </th>
              <th scope="col" className="py-3 px-6">
                Utgångsdatum
              </th>
              <th scope="col" className="py-3 px-6 float-right">
                Åtgärd
              </th>
            </tr>
            <tr></tr>
          </thead>
          {!loading && (
            <tbody className="shadow-xl rounded hover:bg-gray-900 text-black dark:text-white">
              {foundWarrenties && foundWarrenties.length > 0
                ? foundWarrenties.map((warranty) => (
                    <tr
                      key={warranty.id}
                      className="bg-white dark:bg-gray-800 border-b-2 border-gray-300 cursor-pointer hover:bg-opacity-90 duration-200 dark:hover:bg-gray-700"
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium whitespace-nowrap cursor-pointer"
                        onClick={(e) => passId(warranty.id)}
                      >
                        {warranty.id}
                      </th>
                      <td
                        className="py-4 px-6 whitespace-nowrap"
                        onClick={(e) => passId(warranty.id)}
                      >
                        {warranty.name}
                      </td>
                      <td
                        className="py-4 px-6 w-full"
                        onClick={(e) => passId(warranty.id)}
                      >
                        {warranty.warranty_date}
                      </td>
                      <td className="flex justify-around items-stretch py-4 border-l-2">
                        <FaTrash
                          data-modal-toggle="defaultModal"
                          className="text-2xl hover:text-red-500"
                          onClick={() => {
                            setIsOpen(true);
                            setCurrentWarrantyId(warranties.id);
                            setCurrentWarrantyName(warranties.name);
                          }}
                        />
                      </td>
                    </tr>
                  ))
                : warranties.map((warranties) => (
                    <tr
                      key={warranties.id}
                      className="bg-white dark:bg-gray-800 border-b-2 border-gray-300 cursor-pointer hover:bg-opacity-90 duration-200 dark:hover:bg-gray-700"
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium whitespace-nowrap cursor-pointer"
                        onClick={(e) => passId(warranties.id)}
                      >
                        {warranties.id}
                      </th>
                      <td
                        className="py-4 px-6 whitespace-nowrap"
                        onClick={(e) => passId(warranties.id)}
                      >
                        {warranties.name}
                      </td>
                      <td
                        className="py-4 px-6 w-full"
                        onClick={(e) => passId(warranties.id)}
                      >
                        {warranties.warranty_date}
                      </td>
                      <td className="flex justify-around items-stretch py-4 border-l-2">
                        <FaTrash
                          data-modal-toggle="defaultModal"
                          className="text-2xl hover:text-red-500"
                          onClick={() => {
                            setIsOpen(true);
                            setCurrentWarrantyId(warranties.id);
                            setCurrentWarrantyName(warranties.name);
                          }}
                        />
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
    </div>
  );
};

export default Accounting;

import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ApiConnector from "../services/ApiConnector";
import AddCustomer from "./AddCustomer";
import Modal from "./Modal";

const CustomerRegister = () => {
  if (
    localStorage.theme === "true" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  const navigate = useNavigate();
  const [customers, setCustomers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [currentCustomerId, setCurrentCustomerId] = useState("");
  const [currentCustomerName, setCurrentCustomerName] = useState("");
  const [name, setName] = useState("");
  const [foundUsers, setFoundUsers] = useState(customers);
  const [newCustomerModalOpen, setNewCustomerModalOpen] = useState(false);

  useEffect(() => {
    // Gets all the clients on page load once per load
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await ApiConnector.getCustomers();
        setCustomers(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const passId = (e) => {
    // Passes the right id to the customer url
    navigate(`/kunder/${e}`, { state: { clientId: e } });
  };

  const deleteThis = async () => {
    // Deletes a client with given id and updates the id
    setLoading(true);
    try {
      await ApiConnector.deleteCustomer(currentCustomerId);
      const newList = await ApiConnector.getCustomers();
      setCustomers(newList.data);
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
      const results = customers.filter((user) => {
        // Use the toLowerCase() method to make it case-insensitive
        return user.name.toLowerCase().startsWith(keyword.toLowerCase());
      });
      // Sets found warrienties to result
      setFoundUsers(results);
    } else {
      // If the text field is empty, show all users
      setFoundUsers(customers);
    }
    setName(keyword);
  };

  function checkWorkList(e) {
    if (e.length > 0) {
      if (e.map((item) => {return (item.workStatus)}).includes("STARTED") || e.map((item) => {return (item.workStatus)}).includes("COMPLETED")) {
        return "hidden"
      } else {
        return "text-2xl hover:text-red-500"
      }
    } else {
      return "text-2xl hover:text-red-500"
    }
  }

  return (
    <div className="p-7 text 2x1 font-semibold flex-1 h-full bg-blue-50 dark:bg-white">
      <div className="overflow-x-auto relative">
        <div className="flex pb-4 justify-between gap-4 rounded">
          <input
            className="rounded block w-full p-2.5 bg-white dark:bg-gray-800 dark:text-white placeholder-gray-500 border-gray-500 border text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            placeholder="Sök kund efter namn.."
            title="Type in a name"
            type="search"
            value={name}
            onChange={filter}
          ></input>
          <button
            className="bg-blue-600 rounded text-white hover:bg-blue-500 font-bold py-2 px-4 duration-300 text-center w-48"
            onClick={() => setNewCustomerModalOpen(true)}
          >
            <span className="text-center">
              <p>Ny kund</p>
            </span>
          </button>
        </div>
        <table className="w-full text-sm text-left bg-white text-gray-00 shadow-xl rounded dark:bg-gray-800 dark:text-white">
          <thead className="text-xs uppercase  text-gray-500 shadow-md rounded border-b-2 border-gray-300">
            <tr>
              <th scope="col" className="py-3 px-6">
                Id
              </th>
              <th scope="col" className="py-3 px-6">
                Namn
              </th>
              <th scope="col" className="py-3 px-6">
                Adress
              </th>
              <th scope="col" className="py-3 px-6">
                Skapad
              </th>
              <th scope="col" className="max-w-fit text-center">
                Åtgärd
              </th>
            </tr>
          </thead>
          {!loading && (
            <tbody className="shadow-xl rounded hover:bg-gray-900 text-black dark:text-white">
              {foundUsers && foundUsers.length > 0
                ? foundUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="bg-white border-b-2 border-gray-300 cursor-pointer hover:bg-opacity-90 duration-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium whitespace-nowrap cursor-pointer"
                        onClick={(e) => passId(user.id)}
                      >
                        {user.id}
                      </th>
                      <td
                        className="py-4 px-6"
                        onClick={(e) => passId(user.id)}
                      >
                        {user.name}
                      </td>
                      <td
                        className="py-4 px-6"
                        onClick={(e) => passId(user.id)}
                      >
                        {user.address}
                      </td>
                      <td
                        className="py-4 px-6"
                        onClick={(e) => passId(user.id)}
                      >
                        {user.creationDate}
                      </td>
                      <td className="flex justify-around items-stretch py-4">
                        <FaTrash
                          data-modal-toggle="defaultModal"
                          className={checkWorkList(user.workList)}
                          onClick={() => {
                            setIsOpen(true);
                            setCurrentCustomerId(user.id);
                            setCurrentCustomerName(user.name);
                          }}
                        />
                      </td>
                    </tr>
                  ))
                : customers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="bg-white border-b-2 border-gray-300 cursor-pointer hover:bg-opacity-90 duration-200 text-black dark:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium whitespace-nowrap cursor-pointer"
                        onClick={(e) => passId(customer.id)}
                      >
                        {customer.id}
                      </th>
                      <td
                        className="py-4 px-6"
                        onClick={(e) => passId(customer.id)}
                      >
                        {customer.name}
                      </td>
                      <td
                        className="py-4 px-6"
                        onClick={(e) => passId(customer.id)}
                      >
                        {customer.address}
                      </td>
                      <td
                        className="py-4 px-6"
                        onClick={(e) => passId(customer.id)}
                      >
                        {customer.creationDate}
                      </td>
                      <td className="flex justify-around items-stretch py-4">
                        <FaTrash
                          data-modal-toggle="defaultModal"
                          className={checkWorkList(customer.workList)}
                          onClick={() => {
                            setIsOpen(true);
                            setCurrentCustomerId(customer.id);
                            setCurrentCustomerName(customer.name);
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
        <Modal
          setIsOpen={setIsOpen}
          deleteThis={deleteThis}
          currentName={currentCustomerName}
          currentId={currentCustomerId}
        />
      )}
      {newCustomerModalOpen && (
        <AddCustomer setIsModalOpen={setNewCustomerModalOpen} />
      )}
    </div>
  );
};

export default CustomerRegister;

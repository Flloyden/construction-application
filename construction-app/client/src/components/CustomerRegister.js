import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import ApiConnector from "../services/ApiConnector";
import Modal from "./Modal";

const CustomerRegister = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [currentCustomerId, setCurrentCustomerId] = useState("");
  const [currentCustomerName, setCurrentCustomerName] = useState("");
  const [name, setName] = useState("");
  const [foundUsers, setFoundUsers] = useState(customers);

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

  const deleteClient = async () => {
    // Deletes a client with given id and updates the id
    setLoading(true);
    try {
      await ApiConnector.deleteKund(currentCustomerId);
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

  return (
    <div className="p-7 text 2x1 font-semibold flex-1 h-screen">
      <div className="overflow-x-auto relative">
        <div className="flex pb-4 justify-between gap-4">
          <input
            className="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Sök kund efter namn.."
            title="Type in a name"
            type="search"
            value={name}
            onChange={filter}
          ></input>
          <button
            className="bg-blue-600 hover:bg-slate-700 font-bold py-2 px-4 rounded duration-300 text-center text-white w-48"
            onClick={() => navigate("/skapakund")}
          >
            <span className="text-center">
              <p>Ny kund</p>
            </span>
          </button>
        </div>
        <table className="w-full text-sm text-left text-gray-500 text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 bg-gray-700 text-gray-400">
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
              <th scope="col" className="py-3 px-6 float-right">
                Åtgärd
              </th>
            </tr>
          </thead>
          {!loading && (
            <tbody>
              {foundUsers && foundUsers.length > 0
                ? foundUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="bg-white border-b bg-gray-800 border-gray-700 cursor-pointer hover:bg-opacity-90 duration-200"
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap text-white cursor-pointer"
                        onClick={(e) => passId(user.id)}
                      >
                        {user.id}
                      </th>
                      <td className="py-4 px-6 text-white">{user.name}</td>
                      <td className="py-4 px-6">{user.address}</td>
                      <td className="py-4 px-6">{user.creationDate}</td>
                      <td className="py-4 pr-10 flex space-x-4 float-right">
                        <ImCross
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
                      className="bg-white border-b bg-gray-800 border-gray-700 cursor-pointer hover:bg-opacity-90 duration-200"
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap text-white cursor-pointer"
                        onClick={(e) => passId(customer.id)}
                      >
                        {customer.id}
                      </th>
                      <td className="py-4 px-6 text-white">
                        {customer.name}
                      </td>
                      <td className="py-4 px-6">{customer.address}</td>
                      <td className="py-4 px-6">{customer.creationDate}</td>
                      <td className="py-4 px-9">
                        <ImCross
                          data-modal-toggle="defaultModal"
                          className="text-2xl float-right hover:text-red-500"
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
          deleteClient={deleteClient}
          currentCustomerName={currentCustomerName}
          currentCustomerId={currentCustomerId}
        />
      )}
    </div>
  );
};

export default CustomerRegister;

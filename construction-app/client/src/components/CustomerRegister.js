import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiConnector from "../services/ApiConnector";
import "../styles/CustomerRegister.css";
import { FaPen } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { BsPerson } from "react-icons/bs";
import Modal from "./Modal";

const CustomerRegister = () => {
  // Declaring variables
  const navigate = useNavigate();
  const [kunder, setKunder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [currentClientId, setCurrentClientId] = useState("");
  const [currentClientName, setCurrentClientName] = useState("");
  const [name, setName] = useState('');
  const [foundUsers, setFoundUsers] = useState(kunder);

  useEffect(() => {
    // Gets all the clients on page load
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await ApiConnector.getKunder();
        setKunder(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const passId = (e) => {
    // Passes the right id to the kund url
    navigate(`/kunder/${e}`, { state: { clientId: e } });
  };

  const deleteClient = async () => {
    // Deletes a client with given id and updates the id
    setLoading(true);
    try {
      await ApiConnector.deleteKund(currentClientId);
      const newList = await ApiConnector.getKunder();
      setKunder(newList.data);
    } catch (error) {
      console.log(error);
    }
    setIsOpen(false);
    setLoading(false);
  };

  const filter = (e) => {
    const keyword = e.target.value;
    if (keyword !== '') {
      const results = kunder.filter((user) => {
        return user.name.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundUsers(results);
    } else {
      setFoundUsers(kunder);
      // If the text field is empty, show all users
    }
    setName(keyword);
  };

  return (
    <div className="container">
      <div className="content">
        <div className="topContent">
          <input
            className="myInput"
            placeholder="Sök kund efter namn.."
            title="Type in a name"
            type="search"
            value={name}
            onChange={filter}
          ></input>
          <button className="addClient" onClick={() => navigate("/skapakund")}>
            <span className="newClientIcon">
              <BsPerson />
            </span>{" "}
            Ny kund
          </button>
        </div>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Namn</th>
              <th>Adress</th>
              <th>Skapad</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          {!loading && (
            <tbody>
              {foundUsers && foundUsers.length > 0 ? (
                foundUsers.map((user) => (
                  <tr key={user.id}>
                  <td onClick={(e) => passId(user.id)}>{user.name}</td>
                  <td>{user.address}</td>
                  <td>{kunder.creationDate}</td>
                  <td className="icons">
                    <FaPen className="editIcon" />
                  </td>
                  <td className="icons">
                    <ImCross
                      className="removeIcon"
                      onClick={() => {
                        setIsOpen(true);
                        setCurrentClientId(user.id);
                        setCurrentClientName(user.name);
                      }}
                    />
                  </td>
                </tr>
                  ))
              ) : (
                kunder.map((kunder) => (
                  <tr key={kunder.id}>
                    <td onClick={(e) => passId(kunder.id)}>{kunder.name}</td>
                    <td>{kunder.address}</td>
                    <td>{kunder.creationDate}</td>
                    <td className="icons">
                      <FaPen className="editIcon" />
                    </td>
                    <td className="icons">
                    <ImCross
                        className="removeIcon"
                        onClick={() => {
                          setIsOpen(true);
                          setCurrentClientId(kunder.id);
                          setCurrentClientName(kunder.name);
                        }}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          )}
        </table>
      </div>
      {isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          deleteClient={deleteClient}
          currentClientName={currentClientName}
          currentClientId={currentClientId}
        />
      )}
    </div>
  );
};

export default CustomerRegister;

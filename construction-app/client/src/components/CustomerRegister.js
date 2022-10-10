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
    console.log(e);
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
    setIsOpen(false)
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="content">
        <div className="topContent">
          <input
            type="text"
            className="myInput"
            placeholder="Sök efter namn.."
            title="Type in a name"
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
              <th>Kommentar</th>
              <th>Skapad</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          {!loading && (
            <tbody>
              {kunder.map((kunder) => (
                <tr key={kunder.id}>
                  <td onClick={(e) => passId(kunder.id)}>{kunder.name}</td>
                  <td>{kunder.address}</td>
                  <td>Fönster</td>
                  <td>2022-10-04</td>
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
              ))}
            </tbody>
          )}
        </table>
      </div>
      {isOpen && <Modal setIsOpen={setIsOpen} deleteClient={deleteClient} currentClientName={currentClientName} currentClientId={currentClientId} />}
    </div>
  );
};

export default CustomerRegister;

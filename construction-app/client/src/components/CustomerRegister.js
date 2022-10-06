import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiConnector from "../services/ApiConnector";
import "../styles/CustomerRegister.css";
import { FaPen } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { BsPerson } from "react-icons/bs";

const CustomerRegister = () => {
  // Declaring variables
  const navigate = useNavigate();
  const [kunder, setKunder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gets all the clients on page load
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await ApiConnector.getKund();
        setKunder(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

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
                  <td>{kunder.name}</td>
                  <td>{kunder.address}</td>
                  <td>Fönster</td>
                  <td>2022-10-04</td>
                  <td className="icons">
                    <FaPen className="editIcon" />
                  </td>
                  <td className="icons">
                    <ImCross className="removeIcon" />
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default CustomerRegister;

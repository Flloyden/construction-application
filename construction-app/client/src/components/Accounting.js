import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiConnector from "../services/ApiConnector";
import "../styles/Accounting.css";
import { FaPen } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { BsPerson } from "react-icons/bs";
import Modal from "./Modal";

const Accounting = () => {
  // Declaring variables
  const navigate = useNavigate();
  const [warranties, setWarranties] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [currentWarrantyId, setCurrentWarrantyId] = useState("");
  const [currentWarrantyName, setCurrentWarrantyName] = useState("");
  const [currentWarrantyRegistrationNumber,setCurrentWarrantyRegistrationNumber] = useState("")
  const [currentWarrantyDate,setCurrentWarrantyDate] = useState("");
  const [name, setName] = useState('');
  const [foundWarrenties, setFoundWarrenties] = useState(warranties);

  useEffect(() => {
    // Gets all the clients on page load
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await ApiConnector.getWarranties();
        setWarranties(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const passId = (e) => {
    // Passes the right id to the accounting url
    navigate(`/bokföring/${e}`, { state: { accountingId: e } });
  };

  const deleteWarranty = async () => {
    // Deletes a warranty with given id and updates the id
    setLoading(true);
    try {
      await ApiConnector.deleteWarranty(currentWarrantyId);
      const newList = await ApiConnector.getWarranties;
      setWarranties(newList.data);
    } catch (error) {
      console.log(error);
    }
    setIsOpen(false);
    setLoading(false);
  };

  const filter = (e) => {
    const keyword = e.target.value;
    if (keyword !== '') {
      const results = warranties.filter((warranty) => {
        return warranty.name.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundWarrenties(results);
    } else {
      setFoundWarrenties(warranties);
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
            placeholder="Sök garanti efter namn.."
            title="Type in a name"
            type="search"
            value={name}
            onChange={filter}
          ></input>
          <button className="addWarranty" onClick={() => navigate("/bokföring")}>
            <span className="newWarrantyIcon">
              <BsPerson />
            </span>{" "}
            Ny garanti
          </button>
        </div>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Namn</th>
              <th>Registreringsnummer</th>
              <th>Garanti-Datum</th>
              <th className="optionsField"></th>
              <th className="optionsField"></th>
            </tr>
          </thead>
          {!loading && (
            <tbody>
              {foundWarrenties && foundWarrenties.length > 0 ? (
                foundWarrenties.map((warranty) => (
                  <tr key={warranty.id}>
                  <td onClick={(e) => passId(warranty.id)}>{warranty.name}</td>
                  <td>{warranty.registration_number}</td>
                  <td>{warranty.warranty_date}</td>
                  <td className="icons">
                    <FaPen className="editIcon" />
                  </td>
                  <td className="icons">
                    <ImCross
                      className="removeIcon"
                      onClick={() => {
                        setIsOpen(true);
                        setCurrentWarrantyId(warranty.id);
                        setCurrentWarrantyName(warranty.name);
                        setCurrentWarrantyRegistrationNumber(warranty.registration_number);
                        setCurrentWarrantyDate(warranty.warranty_date);
                      }}
                    />
                  </td>
                </tr>
                  ))
              ) : (
                warranties.map((warranties) => (
                  <tr key={warranties.id}>
                    <td onClick={(e) => passId(warranties.id)}>{warranties.name}</td>
                    <td>{warranties.registration_number}</td>
                    <td>{warranties.warranty_date}</td>
                    <td className="icons">
                      <FaPen className="editIcon" />
                    </td>
                    <td className="icons">
                    <ImCross
                        className="removeIcon"
                        onClick={() => {
                          setIsOpen(true);
                          setCurrentWarrantyId(warranties.id);
                          setCurrentWarrantyName(warranties.name);
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
          deleteWarranty={deleteWarranty}
          currentWarrantyName={currentWarrantyName}
          currentWarrantyId={currentWarrantyId}
          currentWarrantyDate={currentWarrantyDate}
          currentWarrantyRegistrationNumber={currentWarrantyRegistrationNumber}
        />
      )}
    </div>
  );
}

export default Accounting;
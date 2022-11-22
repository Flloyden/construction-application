import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiConnector from "../services/ApiConnector";

export default function CheckWarranties() {
  const [loading, setLoading] = useState(true);
  const [warranties, setWarranties] = useState(null);
  const navigate = useNavigate();

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

  function getWarranty() {
    /**Gets the warranty with nearest expiring date by sorting the array */
    let sortedDates = warranties.sort(
      (a, b) =>
        new Date(...a.warranty_date.split("/").reverse()) -
        new Date(...b.warranty_date.split("/").reverse())
    );
    return sortedDates[0].name + " - " + sortedDates[0].warranty_date;
  }

  function getId() {
    /**Gets the warranty id with nearest expiring date by sorting the array */
    let sortedDates = warranties.sort(
      (a, b) =>
        new Date(...a.warranty_date.split("/").reverse()) -
        new Date(...b.warranty_date.split("/").reverse())
    );
    return sortedDates[0].id;
  }

  const passId = (e) => {
    // Passes the right id to the warranty url
    if (warranties.length < 1) {
      alert("FINNS INGEN GARANTI");
    } else {
      navigate(`/garantier/${e}`, { state: { accountingId: e } });
    }
  };

  return (
    <div className="w-full h-full">
      {!loading && (
        <div className="w-full h-full">
          {warranties.length < 1 ? (
            <p className="align-center justify-center items-center flex w-full h-full">Finns ingen</p>
          ) : (
            <div
              className="align-center justify-center items-center flex w-full h-full hover:bg-gray-800 duration-300 hover:cursor-pointer hover:text-white"
              onClick={(e) => passId(getId())}
            >
              <div>
                <p className="border-b-2 py-2">Utgående garanti</p>
                <p className="mt-2">{getWarranty()}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

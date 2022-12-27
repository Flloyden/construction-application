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
    return (
      <div className="font-normal">
        <p>{sortedDates[0].name}</p>
        <p>{sortedDates[0].warranty_date}</p>
      </div>
    );
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
      navigate(`/garantier`);
    }
  };

  return (
    <>
      {!loading && (
        <div className="w-full mt-8 mx-auto">
          {warranties.length < 1 ? (
            <div className="border-2 rounded p-2 shadow">
              <div className="flex justify-between">
                <h1 className="whitespace-nowrap">Utgående garanti</h1>
                <h1 className="text-emerald-500 font-medium hover:cursor-pointer whitespace-nowrap">
                  {" "}
                </h1>
              </div>
              <p className="font-normal pb-6">Finns ingen garanti</p>
            </div>
          ) : (
            <div className="border-2 rounded p-2 shadow">
              <div className="flex justify-between">
                <h1 className="whitespace-nowrap">Utgående garanti</h1>
                <h1
                  className="text-emerald-500 font-medium hover:cursor-pointer whitespace-nowrap"
                  onClick={(e) => passId(getId())}
                >
                  Gå till garantier {">"}{" "}
                </h1>
              </div>
              {getWarranty()}
            </div>
          )}
        </div>
      )}
    </>
  );
}

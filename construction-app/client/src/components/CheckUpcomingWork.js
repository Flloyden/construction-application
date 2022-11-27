import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiConnector from "../services/ApiConnector";

export default function CheckUpcomingWork() {
  const [loading, setLoading] = useState(true);
  const [work, setWork] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Gets all the upcoming work on page load and runs only once
    const fetchData = async () => {
      setLoading(true);
      // Tries to get data from api
      try {
        const response = await ApiConnector.getUpcomingWork();
        setWork(response.data);
        // Logs error if api cal not successful
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  function getUpcomingWork() {
    /**Gets upcoming work within ten days of today's date */
    let sortedDates = work.sort(
      (a, b) =>
        new Date(...a.start_date.split("/").reverse()) -
        new Date(...b.start_date.split("/").reverse())
    );
    return sortedDates[0].name + " - " + sortedDates[0].start_date;
  }

  function getCustomerId() {
    /**Gets the warranty id with nearest expiring date by sorting the array */
    let sortedDates = work.sort(
      (a, b) =>
        new Date(...a.start_date.split("/").reverse()) -
        new Date(...b.start_date.split("/").reverse())
    );
    return sortedDates[0].customer_id;
  }

  const passId = (e) => {
    // Passes the right id to the warranty url
    if (work.length < 1) {
      alert("FINNS INGEN KUND");
    } else {
      navigate(`/customer/${e}`, { state: { customerId: e } });
    }
  };

  return (
    <div className="w-full h-full">
      {!loading && (
        <div className="w-full h-full">
          {work.length < 1 ? (
            <p className="align-center justify-center items-center flex w-full h-full">Finns inga garantier</p>
          ) : (
            <div
              className="align-center justify-center items-center flex w-full h-full hover:bg-gray-800 duration-300 hover:cursor-pointer hover:text-white"
              onClick={(e) => passId(getCustomerId())}
            >
              <div>
                <p className="border-b-2 py-2">Kommande jobb</p>
                <p className="mt-2">{getUpcomingWork()}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

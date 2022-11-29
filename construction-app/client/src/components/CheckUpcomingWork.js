import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiConnector from "../services/ApiConnector";

export default function CheckUpcomingupcomingWork() {
  const [loading, setLoading] = useState(true);
  const [upcomingWork, setUpcomingWork] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Gets all the upcoming upcomingWork on page load and runs only once
    const fetchData = async () => {
      setLoading(true);
      // Tries to get data from api
      try {
        const response = await ApiConnector.getUpcomingupcomingWork();
        setUpcomingWork(response.data);
        // Logs error if api cal not successful
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  function getUpcomingupcomingWork() {
    /**Gets upcoming upcomingWork within ten days of today's date */
    let sortedDates = upcomingWork.sort(
      (a, b) =>
        new Date(...a.startDate.split("/").reverse()) -
        new Date(...b.startDate.split("/").reverse())
    );
    return sortedDates[0].name + " - " + sortedDates[0].startDate;
  }

  function getCustomerId() {
    /**Gets the customer id with nearest expiring date by sorting the array */
    let sortedDates = upcomingWork.sort(
      (a, b) =>
        new Date(...a.startDate.split("/").reverse()) -
        new Date(...b.startDate.split("/").reverse())
    );
    return sortedDates[0].id;
  }

  const passId = (e) => {
    // Passes the right id to the customer url
    if (upcomingWork.length < 1) {
      alert("FINNS INGEN KUND");
    } else {
      navigate(`/kunder/${e}`, { state: { clientId: e } });
    }
  };

  return (
    <div className="w-full h-full">
      {!loading && (
        <div className="w-full h-full">
          {upcomingWork.length < 1 ? (
            <p className="align-center justify-center items-center flex w-full h-full">Finns inga kommande jobb</p>
          ) : (
            <div
              className="align-center justify-center items-center flex w-full h-full hover:bg-gray-800 duration-300 hover:cursor-pointer hover:text-white"
              onClick={(e) => passId(getCustomerId())}
            >
              <div>
                <p className="border-b-2 py-2">Kommande jobb</p>
                <p className="mt-2">{getUpcomingupcomingWork()}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
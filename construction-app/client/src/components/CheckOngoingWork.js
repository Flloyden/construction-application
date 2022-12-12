import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiConnector from "../services/ApiConnector";

export default function CheckOngoingWork() {
  const [loading, setLoading] = useState(true);
  const [ongoingWork, setOngoingWork] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Gets all the upcoming ongoingWork on page load and runs only once
    const fetchData = async () => {
      setLoading(true);
      // Tries to get data from api
      try {
        const response = await ApiConnector.getOngoingWork();
        const testData = await ApiConnector.getOngoingWorkTest();
        setOngoingWork(testData.data);
        console.log(testData.data);
        // Logs error if api cal not successful
      } catch (error) {
        console.log(error);
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  function getOngoingWork() {
    /*Gets upcoming ongoingWork within ten days of today's date*/
    if(ongoingWork == null)
  {
    return "";
  }
    let sortedDates = ongoingWork.sort(
      (a, b) =>
        new Date(...a.startDate.split("/").reverse()) -
        new Date(...b.startDate.split("/").reverse())
    );

    let sortedDatesLength = sortedDates[0].workList.length;
    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0];

    for(let i = 0; i<sortedDatesLength;i++)
    {
      for(let j = 0; i<sortedDates[i].workList[i].calendar.length;j++)
      {
        if(sortedDates[i].workList[i].calendar[j].date == formattedDate) //Om worklisten har datum(date) som matchar dagens datum
        {
          return sortedDates[0].workList[i].name + " - " + sortedDates[i].address; //retunerar den worklistens namn och adress
        }
      }
    }
    return "";
  }

  function getCustomerId() {
    /**Gets the customer id with nearest expiring date by sorting the array */
    let sortedDates = ongoingWork.sort(
      (a, b) =>
        new Date(...a.startDate.split("/").reverse()) -
        new Date(...b.startDate.split("/").reverse())
    );
    return sortedDates[0].id;
  }

  const passId = (e) => {
    // Passes the right id to the customer url
    if (ongoingWork.length < 1) {
      alert("FINNS INGEN KUND");
    } else {
      navigate(`/kunder/${e}`, { state: { clientId: e } });
    }
  };

  return (
    <div className="w-full h-full">
      {!loading && (
        <div className="w-full h-full">
          {ongoingWork.length < 1 ? (
            <p className="align-center justify-center items-center flex w-full h-full">Finns inga pågående jobb</p>
          ) : (
            <div
              className="align-center justify-center items-center flex w-full h-full hover:bg-gray-800 duration-300 hover:cursor-pointer hover:text-white"
              onClick={(e) => passId(getCustomerId())}
            >
              <div>
                <p className="border-b-2 py-2">Pågående jobb</p>
                <p className="mt-2">{getOngoingWork()}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

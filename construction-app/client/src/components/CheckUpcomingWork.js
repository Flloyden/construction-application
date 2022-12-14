import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiConnector from "../services/ApiConnector";
import { activeId } from './CheckOngoingWork';

export default function CheckUpcomingWork() {
  const [loading, setLoading] = useState(true);
  const [upcomingWork, setUpcomingWork] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Gets all the upcoming upcomingWork on page load and runs only once
    const fetchData = async () => {
      setLoading(true);
      // Tries to get data from api
      try {
        const response = await ApiConnector.getUpcomingWork();
        setUpcomingWork(response.data);   
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  function getUpcomingWork() { 
  if(upcomingWork == null)
  {
    return "";
  }

  let sortedDates = upcomingWork.sort(
    (a, b) =>
      new Date(...a.startDate.split("/").reverse()) -
      new Date(...b.startDate.split("/").reverse())
  );
 
  let calendarLength = sortedDates[0].calendar.length;  
  if(calendarLength != 0)
  {
    return sortedDates[0].name + " | " + sortedDates[0].calendar[0].date + " - " + sortedDates[0].calendar[calendarLength-1].date;
  } else{
    return "Finns inget jobb inom 10 dagar";
  }
  }

  function getCustomerId() {
    /*Gets the customer id with nearest expiring date by sorting the array*/
    if(upcomingWork == null)
    {
      return "";
    }
   
    return upcomingWork[0].id;
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
                <p className="mt-2">{getUpcomingWork()}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

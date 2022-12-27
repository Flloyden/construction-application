import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiConnector from "../services/ApiConnector";

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
  
    if(upcomingWork[0].calendar.length !== 0)
    {
      return <div className="font-normal">
          <p>{upcomingWork[1].name + " - " + upcomingWork[0].name}</p>
          <p>
            {upcomingWork[0].calendar[0].date +
              " - " +
              upcomingWork[0].calendar[upcomingWork[0].calendar.length - 1].date}
          </p>
        </div>

    } else{
      return "Finns inget jobb inom 10 dagar";
    }
    }
  
    function getCustomerId() {
      /*Gets the customer id with nearest expiring date by sorting the array*/
  
      return upcomingWork[1].id;
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
    <>
      {!loading && (
        <div className="mt-6">
          {upcomingWork.length < 1 ? (
            <div className="border-2 rounded p-2 shadow mt-6">
              <div className="flex justify-between gap-52">
                <h1 className="whitespace-nowrap">Kommande jobb</h1>
                <h1 className="text-emerald-500 font-medium hover:cursor-pointer whitespace-nowrap">
                </h1>
              </div>
              <p className="font-normal pb-6">Finns inga kommande jobb inom 30 dagar</p>
            </div>
          ) : (
            <div className="border-2 rounded p-2 shadow">
              <div className="flex justify-between gap-52">
                <h1 className="whitespace-nowrap">Kommande jobb inom 30 dagar</h1>
                <h1
                  className="text-emerald-500 font-medium hover:cursor-pointer whitespace-nowrap"
                  onClick={(e) => passId(getCustomerId())}
                >
                  Gå till kund {">"}{" "}
                </h1>
              </div>
              {getUpcomingWork()}
            </div>
          )}
        </div>
      )}
    </>
  );
}

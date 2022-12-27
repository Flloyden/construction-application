import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiConnector from "../services/ApiConnector";

let activeId;

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
        setOngoingWork(response.data);
        console.log(response.data);
        // Logs error if api cal not successful
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  function getOngoingWork() { 
    if(ongoingWork == null)
    {
      return "";
    }
  
    if(ongoingWork[0].calendar.length !== 0)
    {
      return <div className="font-normal">
          <p>{ongoingWork[1].name + " - " + ongoingWork[0].name}</p>
          <p>{ongoingWork[0].calendar[0].date +
              " - " +
              ongoingWork[0].calendar[ongoingWork[0].calendar.length - 1].date}
          </p>
        </div>

    } else{
      return "Finns inget jobb inom 10 dagar";
    }
    }

  function getCustomerId() {
    /**Gets the customer id with nearest expiring date by sorting the array */
    return ongoingWork[1].id;
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
    <>
      {!loading && (
        <div>
          {ongoingWork.length < 1 ? (
            <div className="border-2 rounded p-2 shadow">
              <div className="flex justify-between gap-52">
                <h1 className="whitespace-nowrap">Pågående jobb</h1>
                <h1 className="text-emerald-500 font-medium hover:cursor-pointer whitespace-nowrap">
                  
                </h1>
              </div>
              <p className="font-normal pb-6">Finns inget pågående jobb</p>
            </div>
          ) : (
            <div className="border-2 rounded p-2 shadow">
              <div className="flex justify-between gap-52">
                <h1 className="whitespace-nowrap">Pågående jobb</h1>
                <h1
                  className="text-emerald-500 font-medium hover:cursor-pointer whitespace-nowrap"
                  onClick={(e) => passId(getCustomerId())}
                >
                  Gå till kund {">"}{" "}
                </h1>
              </div>
              {getOngoingWork()}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export { activeId };

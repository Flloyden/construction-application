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
        // Logs error if api cal not successful
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  function getOngoingWork() {
    /*Gets upcoming ongoingWork within ten days of today's date*/
    let sortedDates = ongoingWork.sort(
      (a, b) =>
        new Date(...a.startDate.split("/").reverse()) -
        new Date(...b.startDate.split("/").reverse())
    );
 
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    
    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${year}-${month}-${day}`;
    let calendarLength = ongoingWork[0].workList[0].calendar.length;
    let workListLength = ongoingWork[0].workList.length;
    let activeWorkListIndex;
    const currentDateString = new Date().toISOString().slice(0,10);
     // Skapa en for loop som kollar igenom worklist och varje calendar array och kollar vilket work som innehåller dagens datum
    // Gör sedan det aktiva jobbets id till activeId;
    for(let i = 0;i<workListLength;i++)
    {
      for(let j = 0;j<ongoingWork[0].workList[i].calendar.length;j++)
      {
        if(ongoingWork[0].workList[i].calendar[j].date == currentDateString);
        activeId = ongoingWork[0].workList[i].id;
        activeWorkListIndex = i;
        break;
      }
    }
    //console.log(ongoingWork[0].workList[0].calendar[1].date);
    //if(currentDateString==ongoingWork[0].workList[1].calendar[3].date)
    //{
      //console.log("true");
    //}else{
      //console.log("false");
    //}

    if (calendarLength !== 0) {
      return (
        <div className="font-normal">
          <p>{ongoingWork[0].name + " - " + ongoingWork[0].workList[activeWorkListIndex].name}</p>
          <p>
            {ongoingWork[0].workList[activeWorkListIndex].calendar[0].date +
              " - " +
              ongoingWork[0].workList[activeWorkListIndex].calendar[calendarLength - 1].date}
          </p>
        </div>
      );
    } else {
      return "Finns inget pågående jobb";
    }
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
    <>
      {!loading && (
        <div>
          {ongoingWork.length < 1 ? (
            <div className="border-2 rounded p-2 shadow">
              <div className="flex justify-between gap-52">
                <h1 className="whitespace-nowrap">Pågånde jobb</h1>
                <h1 className="text-emerald-500 font-medium hover:cursor-pointer whitespace-nowrap">
                  
                </h1>
              </div>
              <p className="font-normal pb-6">Finns inget pågående jobb</p>
            </div>
          ) : (
            <div className="border-2 rounded p-2 shadow">
              <div className="flex justify-between gap-52">
                <h1 className="whitespace-nowrap">Pågånde jobb</h1>
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

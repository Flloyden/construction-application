import React, { useState } from "react";
import { useEffect } from "react";
import ApiConnector from "../services/ApiConnector";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import listPlugin from '@fullcalendar/list';

export default function Calendar() {
  const [loading, setLoading] = useState(true);
  const [calendarInfo, setCalendarInfo] = useState(null);

  useEffect(() => {
    // Gets all the warrenties on page load and runs only once
    const fetchData = async () => {
      setLoading(true);
      // Tries to get data from api
      try {
        const response = await ApiConnector.getCalendar();
        setCalendarInfo(response.data);
        console.log(JSON.stringify(response.data, null, 2))
        // Logs error if api cal not successful
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="p-7 text 2x1 font-semibold flex-1 h-screen">
      {!loading && (
        <div className="h-full">
        <FullCalendar
            plugins={[ dayGridPlugin, listPlugin ]}
            initialView="listYear"
            events={calendarInfo}
            height="100%"
            locale="sv"
            firstDay={1}
            eventColor="#FF0000"
          />
          </div>
      )}
    </div>
  );
}

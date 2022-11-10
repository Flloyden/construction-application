import React, { useState } from "react";
import { useEffect } from "react";
import ApiConnector from "../services/ApiConnector";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { BrowserView, MobileView } from "react-device-detect";

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
        // Logs error if api cal not successful
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="w-full h-full">
      <BrowserView>
        <div className="p-7 text 2x1 font-semibold flex-1 h-screen">
          {!loading && (
            <div className="h-full">
              <FullCalendar
                plugins={[
                  dayGridPlugin,
                  listPlugin,
                  timeGridPlugin,
                  resourceTimelinePlugin,
                ]}
                initialView="timeline"
                duration={{ days: 1 }}
                events={calendarInfo}
                height="auto"
                locale="sv"
                firstDay={1}
                headerToolbar={{
                  left: "prev",
                  center: "title",
                  right: "next",
                }}
                views={{
                  timeline: {
                    type: "timeline",
                    duration: { months: 6 },
                    slotDuration: { months: 1 },
                  },
                }}
                schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
              />
            </div>
          )}
        </div>
      </BrowserView>
      <MobileView>
        <div className="p-7 text 2x1 font-semibold h-full">
          {!loading && (
            <div className="h-full">
              <FullCalendar
                plugins={[
                  dayGridPlugin,
                  listPlugin,
                  timeGridPlugin,
                  resourceTimelinePlugin,
                ]}
                initialView="timeline"
                duration={{ days: 1 }}
                events={calendarInfo}
                height="auto"
                locale="sv"
                firstDay={1}
                headerToolbar={{
                  left: "prev",
                  center: "title",
                  right: "next",
                }}
                views={{
                  timeline: {
                    type: "timeline",
                    duration: { months: 1 },
                    slotDuration: { months: 1 },
                  },
                }}
                schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
              />
            </div>
          )}
        </div>
      </MobileView>
    </div>
  );
}

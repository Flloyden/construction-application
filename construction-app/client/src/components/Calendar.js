import React, { useState } from "react";
import { useEffect } from "react";
import ApiConnector from "../services/ApiConnector";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { BrowserView, MobileView } from "react-device-detect";
import moment from "moment";
import Holidays from "date-holidays";
import { useNavigate } from "react-router-dom";
import NavigateModal from "./NavigateModal";

export default function Calendar() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [calendarInfo, setCalendarInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCustomerName, setCurrentCustomerName] = useState("");
  const [currentCustomerId, setCurrentCustomerId] = useState("");
  const hd = new Holidays('SE');
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();
  var holiday = hd.getHolidays(date);
  var nextYear = hd.getHolidays(new Date(year + 1, month, day));
  var nextNextYear = hd.getHolidays(new Date(year + 2, month, day));
  
  const listDate = [];
  var plusOne = new Date(year + 2, month, day);
  const startDate = moment(new Date()).format('YYYY-MM-DD');
  const endDate = moment(plusOne).format('YYYY-MM-DD');
  const dateMove = new Date(startDate);
  let strDate = startDate;

  while (strDate < endDate) {
    strDate = dateMove.toISOString().slice(0, 10);
    listDate.push({date: strDate});
    dateMove.setDate(dateMove.getDate() + 1);
  };

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

  const kl = holiday.map((item => {return (moment(new Date(item.date)).format('YYYY-MM-DD'))}));
  const kl2 = nextYear.map((item => {return (moment(new Date(item.date)).format('YYYY-MM-DD'))}));
  const kl3 = nextNextYear.map((item => {return (moment(new Date(item.date)).format('YYYY-MM-DD'))}));

  const allowNavigate = () => {
    navigate(`/kunder/${currentCustomerId}`, { state: { clientId: currentCustomerId } });
    setIsModalOpen(false);
  };

  const checkDay = (e) => {
    console.log(e)
    var givenDate = new Date(e);
    var day = givenDate.getDay();
    var isWeekend = (day === 6) || (day === 0) ? '#7C2D7E': '#fff';
    return isWeekend
  }

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
                eventClick={
                  function(arg){
                    if ((arg.event.id).length < 1) {
                      alert("Finns ingen kund på den valda kolumnen!")
                    } else {
                      setCurrentCustomerName(arg.event.extendedProps.description);
                      setCurrentCustomerId(arg.event.id);
                      setIsModalOpen(true);
                    }
                  }
                }
                eventSources={[
                  calendarInfo.map((item) => {
                    return {title: moment(item.date).format('DD') + ": " + item.customerName + " - " + item.workName, start: item.date, color: item.color, id: item.customerId, description: item.customerName, borderColor: '#000', allDay: false}
                  }),
                  holiday.map((item) => {
                    return {title: moment(item.date).format('DD') + ": " + item.name, start: item.start, borderColor: '#000', allDay: false}
                  }),
                  nextYear.map((item) => {
                    return {title: moment(item.date).format('DD') + ": " + item.name, start: item.start, borderColor: '#000', allDay: false}
                  }),
                  nextNextYear.map((item) => {
                    return {title: moment(item.date).format('DD') + ": " + item.name, start: item.start, borderColor: '#000', allDay: false}
                  }),
                  listDate.filter(({ date }) => !kl.includes(date) && !kl2.includes(date) && !kl3.includes(date) && !calendarInfo.map((item) => {return item.date}).includes(date)).map((item) => {
                    return {title: moment(item.date).format('DD'), start: item.date, color: checkDay(item.date), textColor: '#000', borderColor: '#000', allDay: false}
                  }),
                ]}
                
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
      {isModalOpen && (
        <NavigateModal
        setIsModalOpen={setIsModalOpen}
        allowNavigate={allowNavigate}
        currentName={currentCustomerName}
        currentId={currentCustomerId}
      />
      )}
    </div>
  );
}

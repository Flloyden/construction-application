import React, { useState } from "react";
import { useEffect } from "react";
import ApiConnector from "../../services/ApiConnector";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { BrowserView, MobileView } from "react-device-detect";
import moment from "moment";
import Holidays from "date-holidays";
import { useNavigate } from "react-router-dom";
import NavigateModal from "../modals/NavigateModal";
import SemesterModal from "../modals/SemesterModal";
import CalendarModal from "../modals/CalendarModal";

export default function Calendar() {
  if (
    localStorage.theme === "true" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  //Declating variables
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [calendarInfo, setCalendarInfo] = useState(null);
  const [semesterInfo, setSemesterInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSemesterModalOpen, setIsSemesterModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [currentSemesterName, setCurrentSemesterName] = useState("");
  const [semesterStartDate, setSemesterStartDate] = useState("");
  const [currentSemesterId, setCurrentSemesterId] = useState("");
  const [currentCustomerName, setCurrentCustomerName] = useState("");
  const [currentCustomerId, setCurrentCustomerId] = useState("");
  const [currentSemesterDays, setCurrentSemesterDays] = useState("");
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
  const startDate = moment(new Date()).format('YYYY-MM');
  const endDate = moment(plusOne).format('YYYY-MM-DD');
  const dateMove = new Date(startDate);
  let strDate = startDate;

  const [colors, setColors] = useState({
    workColor: "",
    vacationColor: "",
    weekendsColor: "",
  });

  while (strDate < endDate) {
    strDate = dateMove.toISOString().slice(0, 10);
    listDate.push({ date: strDate });
    dateMove.setDate(dateMove.getDate() + 1);
  };

  useEffect(() => {
    // Gets all the data on page load and runs only once
    const fetchData = async () => {
      setLoading(true);
      // Tries to get data from api
      try {
        const response = await ApiConnector.getCalendar();
        const res = await ApiConnector.getSemester();
        const col = await ApiConnector.getColors();
        setCalendarInfo(response.data);
        setSemesterInfo(res.data)
        setColors(col.data)
        // Logs error if api call not successful
      } catch (error) {
        console.log(error);
      }
      setLoading(false);

    };
    fetchData();
  }, []);

  const kl = holiday.map((item => { return (moment(new Date(item.date)).format('YYYY-MM-DD')) }));
  const kl2 = nextYear.map((item => { return (moment(new Date(item.date)).format('YYYY-MM-DD')) }));
  const kl3 = nextNextYear.map((item => { return (moment(new Date(item.date)).format('YYYY-MM-DD')) }));

  const allowNavigate = () => {
    //Navigates to given customer
    navigate(`/kunder/${currentCustomerId}`, { state: { clientId: currentCustomerId } });
    setIsModalOpen(false);
  };

  const checkDay = (e) => {
    //Checks what day it is and gives the right color
    var givenDate = new Date(e);
    var day = givenDate.getDay();
    var isWeekend = (day === 6) || (day === 0) ? colors.weekendsColor : '#fff';
    return isWeekend
  }

  const checkDayText = (e) => {
    //Checks if it is weekend
    var givenDate = new Date(e);
    var day = givenDate.getDay();
    var isWeekend = (day === 6) || (day === 0) ? '#fff' : '#000';
    return isWeekend
  }

  const deleteSemester = (e) => {
    /**Deletes a semester and refresh the page*/
    e.preventDefault();
    ApiConnector.saveSemester(e)
      .then((response) => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full h-min bg-blue-50 dark:bg-white">
      <BrowserView>
        <div className="p-7 text 2x1 font-semibold flex-1 h-full pb-30">
          {!loading && (
            <div className="h-full">
              <div className="flex gap-4 pb-4">
                <p className="flex gap-1 items-center"><span className="w-3 h-3 bg-red-600 m-0 rounded-md"></span>Helgdagar</p>
                <p className="flex gap-1 items-center"><span className="w-3 h-3 bg-emerald-500 m-0 rounded-md"></span>Semesterdagar</p>
                <p className="flex gap-1 items-center"><span className="w-3 h-3 bg-sky-600 m-0 rounded-md"></span>Jobb</p>
              </div>
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
                  function (arg) {
                    if (arg.event._def.ui.backgroundColor === "#10B981") {
                      setCurrentSemesterName(arg.event.extendedProps.description.name);
                      setCurrentSemesterId(arg.event.id);
                      setSemesterStartDate(arg.event.extendedProps.description.start)
                      setCurrentSemesterDays(arg.event.extendedProps.description.length)
                      setIsSemesterModalOpen(true);
                    }
                    else if ((arg.event.id).length < 1) {
                      setIsCalendarModalOpen(true)
                    } else {
                      setCurrentCustomerName(arg.event.extendedProps.description);
                      setCurrentCustomerId(arg.event.id);
                      setIsModalOpen(true);
                    }
                  }
                }
                eventSources={[
                  calendarInfo.map((item) => {
                    var locked
                  
                    if (item.lockedInCalendar) {
                      locked = " (låst)"
                    } else {
                      locked = ""
                    }

                    return {
                      title: moment(item.date).format('DD') + ": " + item.customerName + " - " + item.workName + locked, start: item.date, color: colors.workColor, id: item.customerId, description: item.customerName, borderColor: '#000', allDay: false
                    }
                  }),
                  semesterInfo.map((item) => {
                    return { title: moment(item.date).format('DD') + ": " + item.vacationName, start: item.date, color: colors.vacationColor, id: item.vacationId, description: { name: item.vacationName, start: item.startDate, length: item.numberOfDays }, borderColor: '#000', allDay: false }
                  }),
                  holiday.map((item) => {
                    return { title: moment(item.date).format('DD') + ": " + item.name, start: item.start, color: colors.weekendsColor, borderColor: '#000', allDay: false }
                  }),
                  nextYear.map((item) => {
                    return { title: moment(item.date).format('DD') + ": " + item.name, start: item.start, color: colors.weekendsColor, borderColor: '#000', allDay: false }
                  }),
                  nextNextYear.map((item) => {
                    return { title: moment(item.date).format('DD') + ": " + item.name, start: item.start, color: colors.weekendsColor, borderColor: '#000', allDay: false }
                  }),
                  listDate.filter(({ date }) => !kl.includes(date) && !kl2.includes(date) && !kl3.includes(date) && !semesterInfo.map((item) => { return item.date }).includes(date) && !calendarInfo.map((item) => { return item.date }).includes(date)).map((item) => {
                    return { title: moment(item.date).format('DD'), start: item.date, color: checkDay(item.date), textColor: checkDayText(item.date), borderColor: '#000', allDay: false }
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
        <div className="p-4 text 2x1 font-semibold h-full">
          {!loading && (
            <div className="h-full pb-10">
              <div className="flex justify-between gap-4 pb-4">
                <p className="flex gap-1 items-center"><span className="w-3 h-3 bg-red-600 m-0 rounded-md"></span>Helgdagar</p>
                <p className="flex gap-1 items-center"><span className="w-3 h-3 bg-emerald-500 m-0 rounded-md"></span>Semesterdagar</p>
                <p className="flex gap-1 items-center"><span className="w-3 h-3 bg-sky-600 m-0 rounded-md"></span>Jobb</p>
              </div>
              <FullCalendar
                plugins={[
                  dayGridPlugin,
                  listPlugin,
                  timeGridPlugin,
                  resourceTimelinePlugin,
                ]}
                initialView="timeline"
                duration={{ days: 1 }}
                eventSources={[
                  calendarInfo.map((item) => {
                    return { title: moment(item.date).format('DD') + ": " + item.customerName + " - " + item.workName, start: item.date, color: colors.workColor, id: item.customerId, description: item.customerName, borderColor: '#000', allDay: false }
                  }),
                  semesterInfo.map((item) => {
                    return { title: moment(item.date).format('DD') + ": " + item.vacationName, start: item.date, color: colors.vacationColor, id: item.vacationId, description: { name: item.vacationName, start: item.startDate, length: item.numberOfDays }, borderColor: '#000', allDay: false }
                  }),
                  holiday.map((item) => {
                    return { title: moment(item.date).format('DD') + ": " + item.name, start: item.start, color: colors.weekendsColor, borderColor: '#000', allDay: false }
                  }),
                  nextYear.map((item) => {
                    return { title: moment(item.date).format('DD') + ": " + item.name, start: item.start, color: colors.weekendsColor, borderColor: '#000', allDay: false }
                  }),
                  nextNextYear.map((item) => {
                    return { title: moment(item.date).format('DD') + ": " + item.name, start: item.start, color: colors.weekendsColor, borderColor: '#000', allDay: false }
                  }),
                  listDate.filter(({ date }) => !kl.includes(date) && !kl2.includes(date) && !kl3.includes(date) && !semesterInfo.map((item) => { return item.date }).includes(date) && !calendarInfo.map((item) => { return item.date }).includes(date)).map((item) => {
                    return { title: moment(item.date).format('DD'), start: item.date, color: checkDay(item.date), textColor: checkDayText(item.date), borderColor: '#000', allDay: false }
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
      {isSemesterModalOpen && (
        <SemesterModal
          setIsModalOpen={setIsSemesterModalOpen}
          semesterStartDate={semesterStartDate}
          currentName={currentSemesterName}
          currentId={currentSemesterId}
          currentSemesterDays={currentSemesterDays}
          deleteSemester={deleteSemester}
        />
      )}
      {isCalendarModalOpen && (
        <CalendarModal
          setIsModalOpen={setIsCalendarModalOpen}
        />
      )}
    </div>
  );
}

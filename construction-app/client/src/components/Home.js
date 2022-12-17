import FullCalendar from "@fullcalendar/react"; // must go before plugins
import listPlugin from "@fullcalendar/list";
import moment from "moment";
import { useState } from "react";
import NavigateModal from "./NavigateModal";
import SemesterModal from "./SemesterModal";
import CalendarModal from "./CalendarModal";
import ApiConnector from "../services/ApiConnector";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import Holidays from "date-holidays";
import BarChart from "./BarChart";
import CircleChart from "./CircleChart";
import Semester from "./Semester";
import AddCustomer from "./AddCustomer";
import AddWaranty from "./AddWarranty";
import WarrantyHomePage from "./WarrantyHomePage";
import CheckOngoingWork from "./CheckOngoingWork";
import CheckUpcomingWork from "./CheckUpcomingWork";
import CheckWarranties from "./CheckWarranties";

export default function Home() {
  if (
    localStorage.theme === "true" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  const [isSemesterOpen, setIsSemesterOpen] = useState(false);
  const [newCustomerModalOpen, setNewCustomerModalOpen] = useState(false);
  const [newWarrantyModalOpen, setNewWarrantyModalOpen] = useState(false);
  const [currentSemesterName, setCurrentSemesterName] = useState("");
  const [semesterStartDate, setSemesterStartDate] = useState("");
  const [currentSemesterId, setCurrentSemesterId] = useState("");
  const [currentCustomerName, setCurrentCustomerName] = useState("");
  const [currentCustomerId, setCurrentCustomerId] = useState("");
  const [currentSemesterDays, setCurrentSemesterDays] = useState("");
  const [isSemesterModalOpen, setIsSemesterModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [calendarInfo, setCalendarInfo] = useState(null);
  const [semesterInfo, setSemesterInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const IdagButton = { today: "Idag" };
  const navigate = useNavigate();
  const hd = new Holidays("SE");
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();
  var holiday = hd.getHolidays(date);
  var nextYear = hd.getHolidays(new Date(year + 1, month, day));
  var nextNextYear = hd.getHolidays(new Date(year + 2, month, day));
  const listDate = [];
  var plusOne = new Date(year + 2, month, day);
  const startDate = moment(new Date()).format("YYYY-MM-DD");
  const endDate = moment(plusOne).format("YYYY-MM-DD");
  const dateMove = new Date(startDate);
  let strDate = startDate;

  while (strDate < endDate) {
    strDate = dateMove.toISOString().slice(0, 10);
    listDate.push({ date: strDate });
    dateMove.setDate(dateMove.getDate() + 1);
  }

  useEffect(() => {
    // Gets all the warrenties on page load and runs only once
    const fetchData = async () => {
      setLoading(true);
      // Tries to get data from api
      try {
        const response = await ApiConnector.getCalendar();
        const res = await ApiConnector.getSemester();
        setCalendarInfo(response.data);
        setSemesterInfo(res.data);
        // Logs error if api cal not successful
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const kl = holiday.map((item) => {
    return moment(new Date(item.date)).format("YYYY-MM-DD");
  });
  const kl2 = nextYear.map((item) => {
    return moment(new Date(item.date)).format("YYYY-MM-DD");
  });
  const kl3 = nextNextYear.map((item) => {
    return moment(new Date(item.date)).format("YYYY-MM-DD");
  });

  const deleteSemester = (e) => {
    /**Saves the work and navigates back to the register */
    e.preventDefault();
    // Adds work to user with api call
    ApiConnector.saveSemester(e)
      .then((response) => {
        console.log(response);
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const allowNavigate = () => {
    navigate(`/kunder/${currentCustomerId}`, {
      state: { clientId: currentCustomerId },
    });
    setIsModalOpen(false);
  };

  const checkDay = (e) => {
    var givenDate = new Date(e);
    var day = givenDate.getDay();
    var isWeekend = day === 6 || day === 0 ? "#dc2626" : "#fff";
    return isWeekend;
  };

  const checkDayText = (e) => {
    var givenDate = new Date(e);
    var day = givenDate.getDay();
    var isWeekend = day === 6 || day === 0 ? "#fff" : "#000";
    return isWeekend;
  };

  function checkDarkMode() {
    const getValue = localStorage.getItem("theme");
    if (getValue === "true") {
      return "bg-white dark:bg-gray-800 w-1/4 rounded shadow border-l-2 pt-4 darkMode";
    } else {
      return "bg-white dark:bg-gray-800 w-1/4 rounded shadow border-l-2 pt-4 newHome";
    }
  }

  return (
    <div className="p-7 text 2x1 font-semibold flex-1 h-min bg-blue-50 dark:bg-white dark:text-white">
      <div className="flex gap-4 rounded">
        <div className="w-3/4 rounded">
          <div className="bg-white dark:bg-gray-800 shadow rounded border-2 p-4">
            <div className="text-2xl font-bold">Översikt</div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="rounded-full p-6 w-20 h-20 bg-blue-600 flex align-middle justify-center items-center">
                  <h1 className="text-4xl font-normal tracking-wider">TE</h1>
                </div>
                <div className="ml-4">
                  <div className="text-2xl">
                    <h1>
                      Hej, <span className="font-bold">Thomas</span>
                    </h1>
                  </div>
                  <div className="mt-2">
                    <p className="font-normal">
                      Utforksa dina aktiviteter en stund.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 justify-end flex gap-4 text-white h-1/4">
                <button
                  className="bg-blue-600 rounded-md w-max p-4 hover:opacity-80 duration-200 whitespace-nowrap"
                  onClick={() => {
                    setIsSemesterOpen(true);
                  }}
                >
                  Lägg in semester
                </button>
                <button
                  className="bg-blue-600 rounded-md w-max p-4 hover:opacity-80 duration-200 whitespace-nowrap"
                  onClick={() => setNewCustomerModalOpen(true)}
                >
                  Skapa ny kund
                </button>
                <button
                  className="bg-blue-600 rounded-md w-max p-4 hover:opacity-80 duration-200 whitespace-nowrap"
                  onClick={() => setNewWarrantyModalOpen(true)}
                >
                  Skapa ny garanti
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow border-2 mt-4 rounded">
            <div className="p-6">
              <div className="flex gap-10 justify-between">
                <div className="w-1/2 pr-4">
                  <div className="pb-6">
                    <h1>Jobböversikt</h1>
                    <p className="font-normal">December 2022 - Juli 2023</p>
                  </div>
                  <CheckOngoingWork />
                  <CheckUpcomingWork />
                </div>
                <div className="w-1/2">
                  <BarChart />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <div className="bg-white dark:bg-gray-800 w-1/2 p-6 rounded border-2 shadow">
              <div className="">
                <h1>Garantier</h1>
              </div>
              <WarrantyHomePage />
              <CheckWarranties />
            </div>

            <div className="bg-white dark:bg-gray-800 w-1/2 rounded border-2 shadow">
              <div className="p-6">
                <h1>Jobb & Semester</h1>
                <CircleChart />
              </div>
            </div>
          </div>
        </div>
        <div className={checkDarkMode()}>
          {!loading && (
            <FullCalendar
              plugins={[listPlugin]}
              locale="sv"
              firstDay={1}
              buttonText={IdagButton}
              displayEventTime={false}
              height="100%"
              initialView="listWeek"
              eventClick={function (arg) {
                console.log(arg.event);
                if (arg.event._def.ui.backgroundColor === "#10b981") {
                  setCurrentSemesterName(
                    arg.event.extendedProps.description.name
                  );
                  setCurrentSemesterId(arg.event.id);
                  setSemesterStartDate(
                    arg.event.extendedProps.description.start
                  );
                  setCurrentSemesterDays(
                    arg.event.extendedProps.description.length
                  );
                  setIsSemesterModalOpen(true);
                } else if (arg.event.id.length < 1) {
                  setIsCalendarModalOpen(true);
                } else {
                  setCurrentCustomerName(arg.event.extendedProps.description);
                  setCurrentCustomerId(arg.event.id);
                  setIsModalOpen(true);
                }
              }}
              eventSources={[
                calendarInfo.map((item) => {
                  return {
                    title: item.customerName + " - " + item.workName,
                    start: item.date,
                    borderColor: "#3b82f6",
                    id: item.customerId,
                    description: item.customerName,
                    allDay: false,
                  };
                }),
                semesterInfo.map((item) => {
                  return {
                    title: item.vacationName,
                    start: item.date,
                    color: "#10b981",
                    id: item.vacationId,
                    description: {
                      name: item.vacationName,
                      start: item.startDate,
                      length: item.numberOfDays,
                    },
                    borderColor: "#10b981",
                    allDay: false,
                  };
                }),
                holiday.map((item) => {
                  return {
                    title: item.name,
                    start: item.start,
                    borderColor: "#dc2626",
                    allDay: false,
                  };
                }),
                nextYear.map((item) => {
                  return {
                    title: item.name,
                    start: item.start,
                    borderColor: "#dc2626",
                    allDay: false,
                  };
                }),
                nextNextYear.map((item) => {
                  return {
                    title: item.name,
                    start: item.start,
                    borderColor: "#dc2626",
                    allDay: false,
                  };
                }),
                listDate
                  .filter(
                    ({ date }) =>
                      !kl.includes(date) &&
                      !kl2.includes(date) &&
                      !kl3.includes(date) &&
                      !semesterInfo
                        .map((item) => {
                          return item.date;
                        })
                        .includes(date) &&
                      !calendarInfo
                        .map((item) => {
                          return item.date;
                        })
                        .includes(date)
                  )
                  .map((item) => {
                    return {
                      title: "",
                      start: item.date,
                      color: checkDay(item.date),
                      textColor: checkDayText(item.date),
                      borderColor: "#000",
                      allDay: false,
                    };
                  }),
              ]}
            />
          )}
        </div>
      </div>
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
        <CalendarModal setIsModalOpen={setIsCalendarModalOpen} />
      )}
      {isSemesterOpen && <Semester setIsSemesterOpen={setIsSemesterOpen} />}
      {newCustomerModalOpen && (
        <AddCustomer setIsModalOpen={setNewCustomerModalOpen} />
      )}
      {newWarrantyModalOpen && (
        <AddWaranty setIsModalOpen={setNewWarrantyModalOpen} />
      )}
    </div>
  );
}

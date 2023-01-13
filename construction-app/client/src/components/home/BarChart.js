import React, { useEffect, useState } from "react";
import ApiConnector from "../../services/ApiConnector";
import moment from "moment";

export default function BarChart() {
  const [loading, setLoading] = useState(true);
  const [calendarInfo, setCalendarInfo] = useState(null);
  const today = new Date();
  const todayYear = moment(today).format("YYYY")
  const todayMonth = moment(today).format("MM")
  const nextMonth = moment(today).add(1, 'M').format("MM")
  const nextNextMonth = moment(today).add(2, 'M').format("MM")
  const nextNextNextMonth = moment(today).add(3, 'M').format("MM")
  const nextNextNextNextMonth = moment(today).add(4, 'M').format("MM")
  const endYear = moment(today).add(5, 'M').format("YYYY")
  const endMonth = moment(today).add(5, 'M').format("MM")

  const thisMonth = moment(today).format("YYYY-MM");
  const secondMonth = moment(today).add(1, 'M').format("YYYY-MM");
  const thirdMonth = moment(today).add(2, 'M').format("YYYY-MM");
  const fourthMonth = moment(today).add(3, 'M').format("YYYY-MM");
  const fifthMonth = moment(today).add(4, 'M').format("YYYY-MM");
  const sixMonth = moment(today).add(5, 'M').format("YYYY-MM");

  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('sv-SE', { month: 'long' });
  }

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

  function checkMonthlyWork(e) {
    if (calendarInfo.length > 0) {
      if (e === thisMonth) {
        const check1 = calendarInfo.filter((item) => moment(item.date).format("YYYY-MM") === thisMonth)
        return check1.length.toString()
      } else if (e === secondMonth) {
        const check2 = calendarInfo.filter((item) => moment(item.date).format("YYYY-MM") === secondMonth)
        return check2.length.toString()
      } else if (e === thirdMonth) {
        const check3 = calendarInfo.filter((item) => moment(item.date).format("YYYY-MM") === thirdMonth)
        return check3.length.toString()
      } else if (e === fourthMonth) {
        const check4 = calendarInfo.filter((item) => moment(item.date).format("YYYY-MM") === fourthMonth)
        return check4.length.toString()
      } else if (e === fifthMonth) {
        const check5 = calendarInfo.filter((item) => moment(item.date).format("YYYY-MM") === fifthMonth)
        return check5.length.toString()
      } else if (e === sixMonth) {
        const check6 = calendarInfo.filter((item) => moment(item.date).format("YYYY-MM") === sixMonth)
        return check6.length.toString()
      } else {
        return "0";
      }
    } else {
      return "0";
    }
  }

  function checkMonthlyHeight(e) {
    if (calendarInfo.length >= 0) {
      if (e === thisMonth) {
        const check1 = calendarInfo.filter((item) => moment(item.date).format("YYYY-MM") === thisMonth)
        return {height: check1.length * 7}
      } else if (e === secondMonth) {
        const check2 = calendarInfo.filter((item) => moment(item.date).format("YYYY-MM") === secondMonth)
        return {height: check2.length * 7}
      } else if (e === thirdMonth) {
        const check3 = calendarInfo.filter((item) => moment(item.date).format("YYYY-MM") === thirdMonth)
        return {height: check3.length * 7}
      } else if (e === fourthMonth) {
        const check4 = calendarInfo.filter((item) => moment(item.date).format("YYYY-MM") === fourthMonth)
        return {height: check4.length * 7}
      } else if (e === fifthMonth) {
        const check5 = calendarInfo.filter((item) => moment(item.date).format("YYYY-MM") === fifthMonth)
        return {height: check5.length * 7}
      } else if (e === sixMonth) {
        const check6 = calendarInfo.filter((item) => moment(item.date).format("YYYY-MM") === sixMonth)
        return {height: check6.length * 7}
      } else {
        return "0";
      }
    } else {
      return "0";
    }
  }

  return (
    <>
    {!loading && (
    <div className="flex flex-col items-center w-full h-full">
      <h1>Arbetsdagar</h1>
      <span className="text-sm font-semibold text-gray-500">{getMonthName(todayMonth)} {todayYear} - {getMonthName(endMonth)} {endYear}</span>
      <div className="flex items-end flex-grow w-full pt-7 space-x-2 sm:space-x-3">
        <div className="relative flex flex-col items-center flex-grow pb-5 group">
          <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
            {checkMonthlyWork(thisMonth)}
          </span>
          <div className={"relative flex justify-center w-full bg-gradient-to-b from-cyan-500 to-blue-500"} style={checkMonthlyHeight(thisMonth)}></div>
          <span className="absolute bottom-0 text-xs font-bold">{getMonthName(todayMonth)}</span>
        </div>
        <div className="relative flex flex-col items-center flex-grow pb-5 group">
          <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
          {checkMonthlyWork(secondMonth)}
          </span>
          <div className={"relative flex justify-center w-full bg-gradient-to-b from-cyan-500 to-blue-500"} style={checkMonthlyHeight(secondMonth)}></div>
          <span className="absolute bottom-0 text-xs font-bold">{getMonthName(nextMonth)}</span>
        </div>
        <div className="relative flex flex-col items-center flex-grow pb-5 group">
          <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
          {checkMonthlyWork(thirdMonth)}
          </span>
          <div className={"relative flex justify-center w-full bg-gradient-to-b from-cyan-500 to-blue-500"} style={checkMonthlyHeight(thirdMonth)}></div>
          <span className="absolute bottom-0 text-xs font-bold">{getMonthName(nextNextMonth)}</span>
        </div>
        <div className="relative flex flex-col items-center flex-grow pb-5 group">
          <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
          {checkMonthlyWork(fourthMonth)}
          </span>
          <div className={"relative flex justify-center w-full bg-gradient-to-b from-cyan-500 to-blue-500"} style={checkMonthlyHeight(fourthMonth)}></div>
          <span className="absolute bottom-0 text-xs font-bold">{getMonthName(nextNextNextMonth)}</span>
        </div>
        <div className="relative flex flex-col items-center flex-grow pb-5 group">
          <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
          {checkMonthlyWork(fifthMonth)}
          </span>
          <div className={"relative flex justify-center w-full bg-gradient-to-b from-cyan-500 to-blue-500"} style={checkMonthlyHeight(fifthMonth)}></div>
          <span className="absolute bottom-0 text-xs font-bold">{getMonthName(nextNextNextNextMonth)}</span>
        </div>
        <div className="relative flex flex-col items-center flex-grow pb-5 group">
          <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
          {checkMonthlyWork(sixMonth)}
          </span>
          <div className={"relative flex justify-center w-full bg-gradient-to-b from-cyan-500 to-blue-500"} style={checkMonthlyHeight(sixMonth)}></div>
          <span className="absolute bottom-0 text-xs font-bold">{getMonthName(endMonth)}</span>
        </div>
      </div>
    </div>
    )}
    </>
  );
}
